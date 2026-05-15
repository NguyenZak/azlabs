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
  Globe,
  Box,
  Languages,
  ExternalLink
} from "lucide-react";
import LanguageTabs from "@/components/admin/LanguageTabs";
import { getServices, upsertService, deleteService, generateAISamples } from "@/lib/actions/cms";
import MediaPicker from "@/components/admin/MediaPicker";
import toast from "react-hot-toast";

export default function ServicesAdmin() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<"vi" | "en">("vi");
  
  const [formData, setFormData] = useState({
    id: undefined,
    title_en: "",
    title_vi: "",
    description_en: "",
    description_vi: "",
    image_url: "",
    features_en: [] as string[],
    features_vi: [] as string[],
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (service?: any) => {
    if (service) {
      setFormData({
        ...service,
        features_en: service.features_en || [],
        features_vi: service.features_vi || [],
      });
    } else {
      setFormData({
        id: undefined,
        title_en: "",
        title_vi: "",
        description_en: "",
        description_vi: "",
        image_url: "",
        features_en: [],
        features_vi: [],
      });
    }
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    if (!formData.title_en || !formData.title_vi) return toast.error("Titles are required");
    setIsSubmitting(true);
    try {
      await upsertService(formData);
      toast.success("Service saved successfully");
      setIsEditing(false);
      loadServices();
    } catch (error) {
      toast.error("Failed to save service");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteService(id);
      toast.success("Service deleted");
      loadServices();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleSeed = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("AI is designing premium services...");
    try {
      const samples = await generateAISamples("service");
      for (const sample of samples) {
        await upsertService(sample);
      }
      toast.success("Successfully seeded AI-generated services!", { id: toastId });
      loadServices();
    } catch (error) {
      toast.error("Failed to generate AI samples", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing) {
    return (
      <div className="min-h-screen -m-4 md:-m-12 bg-white">
        <header className="px-4 md:px-12 py-4 md:py-6 border-b border-apple-border flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10 gap-2">
          <div className="flex items-center gap-3 md:gap-6">
            <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-[#f5f5f7] rounded-full transition-all">
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <h1 className="text-lg md:text-2xl font-bold tracking-tight truncate">
              {formData.id ? "Edit Service" : "New Service"}
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button 
              onClick={() => setIsEditing(false)} 
              className="hidden sm:block px-4 py-2 text-apple-text-secondary font-bold hover:bg-[#f5f5f7] rounded-full transition-all text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 md:px-8 py-2 md:py-2.5 bg-black text-white rounded-full font-bold shadow-xl hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50 text-xs md:text-sm"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
          </div>
        </header>

        <div className="max-w-5xl mx-auto p-6 md:p-20 grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20">
          <aside className="space-y-8">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-apple-text-secondary mb-4 block">Service Banner</label>
              <div 
                onClick={() => setIsMediaPickerOpen(true)}
                className="aspect-[4/3] bg-[#f5f5f7] rounded-[40px] border-2 border-dashed border-apple-border flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-50 overflow-hidden relative group"
              >
                {formData.image_url ? (
                  <>
                    <img src={formData.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold shadow-xl">Change Media</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <ImageIcon className="w-8 h-8 text-apple-accent" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase mt-2">Pick from Media</span>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-8">
              <h2 className="text-sm font-black uppercase tracking-widest text-apple-text-secondary">Core Information</h2>
              
              <LanguageTabs activeLang={activeLang} onChange={setActiveLang} />

              <div className="space-y-12">
                {activeLang === "vi" ? (
                  <motion.div 
                    key="vi-fields"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-apple-text px-1">Tiêu đề (VI)</label>
                      <input type="text" value={formData.title_vi} onChange={(e) => setFormData({ ...formData, title_vi: e.target.value })} className="w-full p-5 bg-[#f5f5f7] rounded-3xl border-none focus:ring-2 focus:ring-apple-accent text-lg font-bold" placeholder="VD: Phát triển di động" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-apple-text px-1">Mô tả (VI)</label>
                      <textarea rows={4} value={formData.description_vi} onChange={(e) => setFormData({ ...formData, description_vi: e.target.value })} className="w-full p-5 bg-[#f5f5f7] rounded-3xl border-none focus:ring-2 focus:ring-apple-accent resize-none leading-relaxed" placeholder="Mô tả ngắn gọn về dịch vụ..." />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="en-fields"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-apple-text px-1">Service Title (EN)</label>
                      <input type="text" value={formData.title_en} onChange={(e) => setFormData({ ...formData, title_en: e.target.value })} className="w-full p-5 bg-[#f5f5f7] rounded-3xl border-none focus:ring-2 focus:ring-apple-accent text-lg font-bold" placeholder="e.g. Mobile Development" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-apple-text px-1">Description (EN)</label>
                      <textarea rows={4} value={formData.description_en} onChange={(e) => setFormData({ ...formData, description_en: e.target.value })} className="w-full p-5 bg-[#f5f5f7] rounded-3xl border-none focus:ring-2 focus:ring-apple-accent resize-none leading-relaxed" placeholder="Brief overview of what you offer..." />
                    </div>
                  </motion.div>
                )}
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
    <div className="space-y-8 md:space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-apple-text">Services</h1>
          <p className="text-apple-text-secondary mt-2 text-base md:text-lg">Define your professional expertise.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button 
            onClick={handleSeed}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-3 px-6 py-3 bg-white text-apple-accent border-2 border-apple-accent rounded-full font-bold hover:bg-apple-accent hover:text-white transition-all shadow-xl text-sm"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Seed Samples
          </button>
          <button 
            onClick={() => handleStartEdit()}
            className="flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-full font-bold hover:scale-[1.02] transition-all shadow-2xl text-sm"
          >
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>
      </header>

      {loading ? (
        <div className="py-40 flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-apple-accent" />
          <p className="text-apple-text-secondary font-medium animate-pulse">Scanning service catalog...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => handleStartEdit(service)}
              className="group bg-white p-4 md:p-8 rounded-3xl md:rounded-[40px] border border-apple-border flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10 hover:shadow-2xl transition-all cursor-pointer hover:border-black/5"
            >
              <div className="w-full sm:w-32 aspect-video sm:aspect-square bg-[#f5f5f7] rounded-2xl md:rounded-[32px] overflow-hidden flex-shrink-0 border border-apple-border group-hover:scale-[1.02] sm:group-hover:scale-105 transition-transform duration-500">
                {service.image_url ? (
                  <img src={service.image_url} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Box className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl md:text-2xl font-bold text-apple-text truncate">{service.title_en}</h3>
                  <ChevronRight className="w-5 h-5 text-apple-text-secondary group-hover:translate-x-2 transition-transform shrink-0" />
                </div>
                <p className="text-apple-text-secondary text-sm md:text-base line-clamp-1 max-w-3xl font-medium mb-3 md:mb-4">{service.title_vi}</p>
                <div className="flex flex-wrap gap-2">
                  {(service.features_en || []).slice(0, 3).map((f: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 bg-[#f5f5f7] rounded-full text-[9px] font-bold text-apple-text-secondary uppercase tracking-wider">{f}</span>
                  ))}
                </div>
              </div>

              <div className="flex sm:flex-col gap-2 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-none border-apple-border">
                <a 
                  href="/#services"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 sm:flex-none p-3 hover:bg-blue-50 text-blue-500 rounded-xl transition-all flex items-center justify-center"
                  title="View on site"
                >
                  <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(service.id);
                  }} 
                  className="flex-1 sm:flex-none p-3 hover:bg-red-50 text-red-400 rounded-xl transition-all flex items-center justify-center"
                >
                  <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
