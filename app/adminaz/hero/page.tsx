"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Loader2, 
  Sparkles, 
  ChevronLeft,
  Link as LinkIcon,
  Layout,
  Type
} from "lucide-react";
import { upsertHeroSlide, deleteHeroSlide } from "@/lib/actions/cms";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { HERO_SAMPLES } from "@/lib/services/data";

export default function HeroSliderAdmin() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    id: "",
    title_en: "", title_vi: "",
    subtitle_en: "", subtitle_vi: "",
    cta_text_en: "", cta_text_vi: "",
    cta_link: "/contact",
    order_index: 0
  });

  const supabase = createClient();

  useEffect(() => {
    fetchSlides();
  }, []);

  async function fetchSlides() {
    setLoading(true);
    const { data } = await supabase.from("hero_slides").select("*").order("order_index", { ascending: true });
    if (data) setSlides(data);
    setLoading(false);
  }

  const handleStartAdd = () => {
    setFormData({
      id: "", title_en: "", title_vi: "", subtitle_en: "", subtitle_vi: "",
      cta_text_en: "", cta_text_vi: "", cta_link: "/contact",
      order_index: slides.length
    });
    setIsEditing(true);
  };

  const handleStartEdit = (slide: any) => {
    const { image_url, ...rest } = slide; // Exclude image_url if exists
    setFormData({ ...rest });
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    if (!formData.title_en || !formData.title_vi) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await upsertHeroSlide(formData);
      toast.success("Slide saved successfully");
      setIsEditing(false);
      fetchSlides();
    } catch (error) {
      toast.error("Error saving slide");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this slide?")) return;
    try {
      await deleteHeroSlide(id);
      toast.success("Slide deleted");
      fetchSlides();
    } catch (error) {
      toast.error("Error deleting slide");
    }
  };
  const handleSeed = async () => {
    if (!confirm("Seed sample tech slides? This will add to your current slides.")) return;
    setIsSubmitting(true);
    
    try {
      for (const sample of HERO_SAMPLES) {
        await upsertHeroSlide(sample);
      }
      toast.success("Successfully seeded tech slides!");
      fetchSlides();
    } catch (error) {
      toast.error("Error seeding slides");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto pb-20"
      >
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => setIsEditing(false)}
            className="p-3 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-apple-border shadow-sm group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <h1 className="text-3xl font-bold tracking-tight">
            {formData.id ? "Edit Cinematic Content" : "New Cinematic Slide"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-apple-border shadow-sm space-y-8">
              {/* Titles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary ml-1">Main Headline (EN)</label>
                  <textarea 
                    rows={3}
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    className="w-full px-5 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all font-bold text-lg leading-tight"
                    placeholder="e.g. Next-Gen AI Solutions"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary ml-1">Tiêu đề chính (VI)</label>
                  <textarea 
                    rows={3}
                    value={formData.title_vi}
                    onChange={(e) => setFormData({ ...formData, title_vi: e.target.value })}
                    className="w-full px-5 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all font-bold text-lg leading-tight"
                    placeholder="VD: Giải pháp AI thế hệ mới"
                  />
                </div>
              </div>

              {/* Subtitles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary ml-1">Description (EN)</label>
                  <textarea 
                    rows={4}
                    value={formData.subtitle_en}
                    onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value })}
                    className="w-full px-5 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all text-sm font-medium leading-relaxed"
                    placeholder="Sub-headline in English..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary ml-1">Mô tả (VI)</label>
                  <textarea 
                    rows={4}
                    value={formData.subtitle_vi}
                    onChange={(e) => setFormData({ ...formData, subtitle_vi: e.target.value })}
                    className="w-full px-5 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all text-sm font-medium leading-relaxed"
                    placeholder="Phụ đề bằng Tiếng Việt..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-apple-border shadow-sm space-y-6">
              <h3 className="text-sm font-bold flex items-center gap-2 px-1">
                <LinkIcon className="w-4 h-4" /> Action Button (CTA)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary">Text (EN)</label>
                  <input 
                    type="text"
                    value={formData.cta_text_en}
                    onChange={(e) => setFormData({ ...formData, cta_text_en: e.target.value })}
                    className="w-full px-4 py-3 bg-[#f5f5f7] border-none rounded-xl focus:ring-2 focus:ring-apple-accent transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary">Text (VI)</label>
                  <input 
                    type="text"
                    value={formData.cta_text_vi}
                    onChange={(e) => setFormData({ ...formData, cta_text_vi: e.target.value })}
                    className="w-full px-4 py-3 bg-[#f5f5f7] border-none rounded-xl focus:ring-2 focus:ring-apple-accent transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary">Link (e.g. /projects)</label>
                  <input 
                    type="text"
                    value={formData.cta_link}
                    onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                    className="w-full px-4 py-3 bg-[#f5f5f7] border-none rounded-xl focus:ring-2 focus:ring-apple-accent transition-all font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-apple-border shadow-sm">
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="w-16 h-16 bg-apple-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-apple-accent" />
                </div>
                <p className="text-xs font-bold text-apple-text-secondary uppercase tracking-widest px-4">
                  Using 3D Tech Background
                </p>
                <p className="text-[10px] text-apple-text-secondary mt-2 px-6 opacity-60">
                  This slide will be rendered over the Futuristic Globe. No image required.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-apple-border shadow-sm">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary ml-1 block mb-3">Slide Order</label>
              <input 
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                className="w-full px-5 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all font-bold text-center text-xl"
              />
            </div>

            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-5 bg-black text-white rounded-3xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
              Publish Content
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Layout className="w-5 h-5 text-apple-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-apple-text-secondary">Hero Experience</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-apple-text">Content Slider</h1>
          <p className="text-xl text-apple-text-secondary mt-2 font-medium">Manage text-based slides over your 3D Tech Background</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleSeed}
            disabled={isSubmitting}
            className="px-6 py-4 bg-white text-apple-text border border-apple-border rounded-2xl font-bold flex items-center gap-2 hover:bg-[#f5f5f7] transition-all shadow-sm"
          >
            <Sparkles className="w-5 h-5 text-yellow-500" /> Seed Samples
          </button>
          <button 
            onClick={handleStartAdd}
            className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-2xl"
          >
            <Plus className="w-5 h-5" /> New Slide
          </button>
        </div>
      </header>

      {/* List */}
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          Array(2).fill(0).map((_, i) => (
            <div key={i} className="h-40 bg-white rounded-[40px] animate-pulse border border-apple-border" />
          ))
        ) : slides.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center bg-white rounded-[40px] border border-apple-border border-dashed">
            <div className="w-20 h-20 bg-[#f5f5f7] rounded-full flex items-center justify-center mb-6">
              <Type className="w-10 h-10 text-apple-text-secondary" />
            </div>
            <p className="text-xl font-bold text-apple-text">No slides found</p>
            <p className="text-apple-text-secondary mt-2">Start by adding cinematic text slides.</p>
          </div>
        ) : slides.map((slide, index) => (
          <motion.div 
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-[40px] border border-apple-border shadow-sm flex items-center gap-8 group hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center text-white font-bold flex-shrink-0 text-xl">
              {index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                 <span className="text-[10px] font-black text-apple-text-secondary uppercase tracking-widest bg-[#f5f5f7] px-2 py-1 rounded">Order: {slide.order_index}</span>
                 {slide.cta_text_en && <span className="text-[10px] font-bold text-apple-accent">Action: {slide.cta_text_en}</span>}
              </div>
              <h3 className="text-2xl font-bold text-apple-text truncate">{slide.title_en}</h3>
              <p className="text-apple-text-secondary line-clamp-1 mt-1 font-medium">{slide.subtitle_en}</p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleStartEdit(slide)}
                className="p-4 hover:bg-[#f5f5f7] rounded-2xl text-apple-text-secondary transition-all"
              >
                <Edit3 className="w-6 h-6" />
              </button>
              <button 
                onClick={() => handleDelete(slide.id)}
                className="p-4 hover:bg-red-50 text-red-400 rounded-2xl transition-all"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
