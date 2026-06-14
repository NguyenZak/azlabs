"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ImageIcon, Loader2, CheckCircle2, AlertCircle, FileText, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "@/lib/actions/cms";

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (result: any) => void;
}

interface FileStatus {
  id: string;
  file: File;
  preview: string;
  status: "idle" | "uploading" | "success" | "error";
  progress: number;
}

export default function MediaUploadModal({ isOpen, onClose, onUploadSuccess }: MediaUploadModalProps) {
  const [files, setFiles] = useState<FileStatus[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (selectedFiles: FileList) => {
    const newFiles: FileStatus[] = Array.from(selectedFiles).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: "idle",
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      addFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const filtered = prev.filter((f) => f.id !== id);
      const removed = prev.find((f) => f.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  const compressImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Max dimensions (e.g., 2000px)
          const MAX_WIDTH = 2000;
          const MAX_HEIGHT = 2000;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject(new Error("Canvas toBlob failed"));
            },
            "image/webp",
            0.8 // Quality: 80%
          );
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    let successCount = 0;
    
    try {
      for (const fileStatus of files) {
        if (fileStatus.status === "success") continue;

        setFiles(prev => prev.map(f => f.id === fileStatus.id ? { ...f, status: "uploading" } : f));

        try {
          // Compress and convert to WebP at Client
          const compressedBlob = await compressImage(fileStatus.file);
          const compressedFile = new File([compressedBlob], fileStatus.file.name.replace(/\.[^/.]+$/, "") + ".webp", {
            type: "image/webp"
          });

          const formData = new FormData();
          formData.append("file", compressedFile);

          // Use Server Action instead of direct Client Fetch
          const data = await uploadToCloudinary(formData) as any;
          
          const result = {
            info: {
              secure_url: data.secure_url,
              public_id: data.public_id,
              original_filename: data.original_filename || fileStatus.file.name.split('.')[0],
              format: data.format,
              bytes: data.bytes,
            }
          };

          setFiles(prev => prev.map(f => f.id === fileStatus.id ? { ...f, status: "success" } : f));
          onUploadSuccess(result);
          successCount++;
        } catch (error: any) {
          console.error("Upload error for file:", fileStatus.file.name, error);
          toast.error(`${fileStatus.file.name}: ${error.message}`);
          setFiles(prev => prev.map(f => f.id === fileStatus.id ? { ...f, status: "error" } : f));
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to process uploads");
    }
    setIsUploading(false);
    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} files!`);
      if (successCount === files.length) {
        setTimeout(handleClose, 1500);
      }
    } else {
      toast.error("All uploads failed. Check your Cloudinary settings.");
    }
  };

  const handleClose = () => {
    if (isUploading) return;
    files.forEach(f => URL.revokeObjectURL(f.preview));
    setFiles([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-neutral-950/80 rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-white">Upload Assets</h2>
                  <p className="text-neutral-400 text-sm font-medium">Multiple files & automatic WebP conversion enabled</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-3 hover:bg-neutral-800 rounded-full transition-all"
                >
                  <X className="w-6 h-6 text-neutral-400" />
                </button>
              </div>

              {files.length === 0 ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    relative group cursor-pointer
                    border-2 border-dashed rounded-[32px] p-20
                    flex flex-col items-center justify-center gap-6
                    transition-all duration-500
                    ${dragActive 
                      ? "border-blue-500/50 bg-blue-600/5 scale-[0.98]" 
                      : "border-gray-200 hover:border-blue-500/50 hover:bg-gray-50"
                    }
                  `}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="w-20 h-20 bg-neutral-800 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform group-hover:rotate-12 duration-500">
                    <Upload className="w-10 h-10 text-neutral-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">Drop your files here</p>
                    <p className="text-sm text-neutral-400 mt-2 font-medium">Any image format will be converted to WebP automatically</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {files.map((f) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={f.id} 
                        className={`
                          flex items-center gap-4 p-4 rounded-3xl border transition-all
                          ${f.status === "success" ? "bg-green-50 border-green-100" : "bg-neutral-900/50 border-transparent"}
                        `}
                      >
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-neutral-950/80 border border-neutral-800 flex-shrink-0">
                          <img src={f.preview} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white truncate">{f.file.name}</p>
                          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">
                            {f.status === "uploading" ? "Uploading..." : f.status === "success" ? "Converted & Uploaded" : f.status === "error" ? "Failed" : "Ready"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {f.status === "uploading" ? (
                            <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                          ) : f.status === "success" ? (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          ) : f.status === "error" ? (
                            <AlertCircle className="w-6 h-6 text-red-500" />
                          ) : (
                            <button 
                              onClick={() => removeFile(f.id)}
                              className="p-2 hover:bg-neutral-950/80 rounded-full text-red-400 transition-all"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-neutral-800 flex gap-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="flex-1 py-4 px-6 bg-neutral-900/50 text-white rounded-2xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50"
                    >
                      Add More
                    </button>
                    <button
                      onClick={handleUpload}
                      disabled={isUploading || files.every(f => f.status === "success")}
                      className="flex-[2] py-4 px-6 bg-blue-600 text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing Library...
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          Upload {files.filter(f => f.status !== "success").length} Files
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />

            {/* Design accents */}
            <div className="h-2 bg-gradient-to-r from-apple-accent via-blue-500 to-purple-500" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
