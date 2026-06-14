"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Search, 
  ImageIcon, 
  Loader2, 
  ExternalLink,
  Filter
} from "lucide-react";
import MediaUploadModal from "@/components/admin/MediaUploadModal";
import { getMedia, saveMedia, deleteMedia } from "@/lib/actions/cms";
import toast from "react-hot-toast";

export default function MediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const data = await getMedia();
      setMedia(data);
    } catch (error) {
      toast.error("Failed to load media");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = async (result: any) => {
    const info = result.info;
    const mediaData = {
      url: info.secure_url,
      public_id: info.public_id,
      file_name: info.original_filename,
      file_type: info.format,
      file_size: info.bytes,
    };

    try {
      await saveMedia(mediaData);
      toast.success("Image uploaded successfully");
      loadMedia();
    } catch (error) {
      toast.error("Failed to save media info");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    try {
      await deleteMedia(id);
      toast.success("Deleted successfully");
      loadMedia();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("URL copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = media.filter(item => 
    item.file_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Media Library</h1>
          <p className="text-neutral-400 mt-2">Manage your visual assets for AZLABS.</p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-xl active:scale-95"
        >
          <Plus className="w-5 h-5" /> Upload Media
        </button>

        <MediaUploadModal 
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search by filename..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-neutral-950/60 border border-neutral-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-6 py-3 bg-neutral-950/60 border border-neutral-800 rounded-xl text-neutral-400 font-bold hover:bg-gray-50 transition-all">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <p className="text-neutral-400 font-medium">Scanning library...</p>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="py-20 text-center bg-neutral-950/60 rounded-[40px] border border-neutral-800 border-dashed">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-neutral-600" />
          </div>
          <p className="text-neutral-400 font-medium">No media found. Upload your first asset!</p>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <AnimatePresence>
            {filteredMedia.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative aspect-square bg-neutral-950/60 rounded-3xl border border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <img 
                  src={item.url} 
                  alt={item.file_name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 backdrop-blur-[2px]">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => window.open(item.url, '_blank')}
                      className="p-2 bg-neutral-950/60/20 hover:bg-neutral-950/60/40 rounded-lg text-white backdrop-blur-md transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-white text-[10px] font-bold truncate px-1">
                      {item.file_name || "Untitled"}
                    </p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => copyToClipboard(item.url, item.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-neutral-950/60 text-black rounded-xl text-[10px] font-bold hover:bg-neutral-800 transition-all"
                      >
                        {copiedId === item.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copiedId === item.id ? "Copied" : "Copy URL"}
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
