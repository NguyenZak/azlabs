"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ImageIcon, Loader2, Check } from "lucide-react";
import MediaUploadModal from "./MediaUploadModal";
import { getMedia } from "@/lib/actions/cms";

interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function MediaPicker({ isOpen, onClose, onSelect }: MediaPickerProps) {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen]);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const data = await getMedia();
      setMedia(data);
    } catch (error) {
      console.error("Failed to load media");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (result: any) => {
    loadMedia();
    // Optionally auto-select the newly uploaded image
    // onSelect(result.info.secure_url);
    // onClose();
  };

  const filteredMedia = media.filter(item => 
    item.file_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-20">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-neutral-950/80 rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-full max-h-[85vh]"
          >
            <header className="px-10 py-8 border-b border-neutral-800 flex justify-between items-center bg-neutral-900">
              <div>
                <h3 className="text-2xl font-black tracking-tight">Media Library</h3>
                <p className="text-sm text-neutral-400 mt-1 font-medium">Select an asset for your project</p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-lg active:scale-95"
                >
                  Upload New
                </button>
                <button onClick={onClose} className="p-3 hover:bg-neutral-800 rounded-full transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <MediaUploadModal 
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUploadSuccess={handleUploadSuccess}
              />
            </header>

            <div className="p-8 border-b border-neutral-800">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="Search your assets..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 bg-neutral-900/50 border-none rounded-[20px] focus:ring-2 focus:ring-blue-500/50 font-medium text-lg"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
                  <p className="text-neutral-400 font-bold uppercase tracking-widest text-xs">Accessing Library...</p>
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-400">
                  <ImageIcon className="w-20 h-20 mb-6 opacity-10" />
                  <p className="text-xl font-bold">Your library is empty</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {filteredMedia.map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => {
                        onSelect(item.url);
                        onClose();
                      }}
                      className="group relative aspect-square bg-neutral-900/50 rounded-[32px] overflow-hidden border border-neutral-800 hover:border-blue-500/50 transition-all shadow-sm hover:shadow-2xl"
                    >
                      <img src={item.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-neutral-950/80/90 backdrop-blur px-4 py-2 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                          <span className="text-[10px] font-black text-black">INSERT</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
