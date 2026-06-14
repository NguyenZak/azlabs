"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Loader2, 
  Sparkles, 
  Image as ImageIcon,
  ArrowLeft,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { getFeatures, upsertFeature, deleteFeature, generateAISamples } from "@/lib/actions/cms";
import MediaPicker from "@/components/admin/MediaPicker";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function FeaturesAdmin() {
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    id: undefined,
    title_en: "",
    title_vi: "",
    description_en: "",
    description_vi: "",
    image_url: "",
  });

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    setLoading(true);
    try {
      const data = await getFeatures();
      setFeatures(data);
    } catch (error) {
      toast.error("Failed to load features");
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (feature?: any) => {
    if (feature) {
      setFormData({
        ...feature
      });
    } else {
      setFormData({
        id: undefined,
        title_en: "",
        title_vi: "",
        description_en: "",
        description_vi: "",
        image_url: "",
      });
    }
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    if (!formData.title_en || !formData.title_vi) return toast.error("Titles are required");
    setIsSubmitting(true);
    try {
      await upsertFeature(formData);
      toast.success("Feature saved successfully");
      setIsEditing(false);
      loadFeatures();
    } catch (error) {
      toast.error("Failed to save feature");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteFeature(id);
      toast.success("Feature deleted");
      loadFeatures();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleSeed = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("AI is architecting premium pillars...");
    try {
      const samples = await generateAISamples("feature");
      for (const sample of samples) {
        await upsertFeature(sample);
      }
      toast.success("Successfully seeded AI-generated features!", { id: toastId });
      loadFeatures();
    } catch (error) {
      toast.error("Failed to generate AI samples", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing) {
    return (
      <div className="min-h-screen -m-12 bg-neutral-950/60">
        <header className="px-12 py-6 border-b border-neutral-800 flex justify-between items-center sticky top-0 bg-neutral-950/60/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-neutral-900/50 rounded-full transition-all">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold tracking-tight">
              {formData.id ? "Edit Feature" : "New Feature"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsEditing(false)} 
              className="px-6 py-2.5 text-neutral-400 font-bold hover:bg-neutral-900/50 rounded-full transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-2.5 bg-blue-600 text-white rounded-full font-bold shadow-xl hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Feature
            </button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-20 grid grid-cols-1 md:grid-cols-3 gap-20">
          <aside className="space-y-8">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-4 block">Visual Representative</label>
              <div 
                onClick={() => setIsMediaPickerOpen(true)}
                className="aspect-square bg-neutral-900/50 rounded-[40px] border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-50 overflow-hidden relative group"
              >
                {formData.image_url ? (
                  <>
                    <img src={formData.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-neutral-950/60/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold shadow-xl">Change Image</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-neutral-950/60 rounded-2xl flex items-center justify-center shadow-sm">
                      <ImageIcon className="w-8 h-8 text-blue-400" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase mt-2">Pick from Media</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 bg-neutral-900/50 rounded-[32px]">
              <p className="text-xs text-neutral-400 leading-relaxed italic">
                "Features define the soul of the product. Use high-quality, descriptive images to maintain the premium AZLABS aesthetic."
              </p>
            </div>
          </aside>

          <div className="md:col-span-2 space-y-12">
            <section className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-neutral-400">Identity & Language</h2>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white px-1">Title (EN)</label>
                    <input type="text" value={formData.title_en} onChange={(e) => setFormData({ ...formData, title_en: e.target.value })} className="w-full p-5 bg-neutral-900/50 rounded-3xl border-none focus:ring-2 focus:ring-blue-500/50 text-lg font-medium" placeholder="Cloud Scalability" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white px-1">Tiêu đề (VI)</label>
                    <input type="text" value={formData.title_vi} onChange={(e) => setFormData({ ...formData, title_vi: e.target.value })} className="w-full p-5 bg-neutral-900/50 rounded-3xl border-none focus:ring-2 focus:ring-blue-500/50 text-lg font-medium" placeholder="Khả năng mở rộng" />
                  </div>
                </div>

                <div className="space-y-8 pt-4">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white px-1">Description (EN)</label>
                    <textarea rows={4} value={formData.description_en} onChange={(e) => setFormData({ ...formData, description_en: e.target.value })} className="w-full p-5 bg-neutral-900/50 rounded-3xl border-none focus:ring-2 focus:ring-blue-500/50 resize-none leading-relaxed" placeholder="Describe the feature's value in English..." />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white px-1">Mô tả (VI)</label>
                    <textarea rows={4} value={formData.description_vi} onChange={(e) => setFormData({ ...formData, description_vi: e.target.value })} className="w-full p-5 bg-neutral-900/50 rounded-3xl border-none focus:ring-2 focus:ring-blue-500/50 resize-none leading-relaxed" placeholder="Mô tả giá trị tính năng bằng tiếng Việt..." />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <MediaPicker 
          isOpen={isMediaPickerOpen}
          onClose={() => setIsMediaPickerOpen(false)}
          onSelect={(url) => setFormData({ ...formData, image_url: url })}
        />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-white">AZLABS Features</h1>
          <p className="text-neutral-400 mt-4 text-lg">Define the pillars of your technology ecosystem.</p>
        </div>
        <button 
          onClick={() => handleStartEdit()}
          className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:scale-105 transition-all shadow-2xl"
        >
          <Plus className="w-5 h-5" /> Add New Pillar
        </button>
        <button 
          onClick={handleSeed}
          disabled={isSubmitting}
          className="flex items-center gap-3 px-8 py-4 bg-neutral-950/60 text-blue-400 border-2 border-blue-500/50 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          Seed Sample Data
        </button>
      </header>

      {loading ? (
        <div className="py-40 flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
          <p className="text-neutral-400 font-medium animate-pulse">Loading system architecture...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.id}
              onClick={() => handleStartEdit(feature)}
              className="group bg-neutral-950/60 p-6 rounded-[32px] border border-neutral-800 flex items-center gap-8 hover:shadow-xl transition-all cursor-pointer hover:border-black/10"
            >
              <div className="w-24 h-24 bg-neutral-900/50 rounded-[24px] overflow-hidden flex-shrink-0 border border-neutral-800 group-hover:scale-105 transition-transform">
                {feature.image_url ? (
                  <img src={feature.image_url} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-neutral-600" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{feature.title_en}</h3>
                  <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-neutral-400 text-sm line-clamp-1 max-w-2xl font-medium">{feature.title_vi}</p>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity pr-4">
                <a 
                  href="/#features"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-4 hover:bg-blue-50 text-blue-500 rounded-2xl transition-all"
                  title="View on site"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(feature.id);
                  }} 
                  className="p-4 hover:bg-red-50 text-red-400 rounded-2xl transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
