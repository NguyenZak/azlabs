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
  Star,
  User,
  Quote,
  ExternalLink
} from "lucide-react";
import { getTestimonials, upsertTestimonial, deleteTestimonial, generateAISamples } from "@/lib/actions/cms";
import MediaPicker from "@/components/admin/MediaPicker";
import toast from "react-hot-toast";

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeMediaPicker, setActiveMediaPicker] = useState<"avatar" | "company" | null>(null);
  
  const [formData, setFormData] = useState({
    id: undefined,
    name: "",
    role_en: "",
    role_vi: "",
    content_en: "",
    content_vi: "",
    avatar_url: "",
    company_logo_url: "",
    rating: 5,
    order_index: 0
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (testimonial?: any) => {
    if (testimonial) {
      setFormData({
        ...testimonial,
        rating: testimonial.rating || 5,
      });
    } else {
      setFormData({
        id: undefined,
        name: "",
        role_en: "",
        role_vi: "",
        content_en: "",
        content_vi: "",
        avatar_url: "",
        company_logo_url: "",
        rating: 5,
        order_index: 0
      });
    }
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.content_en || !formData.content_vi) {
      return toast.error("Name and Content are required");
    }
    setIsSubmitting(true);
    try {
      await upsertTestimonial(formData);
      toast.success("Testimonial saved successfully");
      setIsEditing(false);
      loadTestimonials();
    } catch (error) {
      toast.error("Failed to save testimonial");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      toast.success("Testimonial deleted");
      loadTestimonials();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleSeed = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("AI is generating authentic testimonials...");
    try {
      const samples = await generateAISamples("testimonial");
      for (const sample of samples) {
        await upsertTestimonial(sample);
      }
      toast.success("Successfully seeded AI testimonials!", { id: toastId });
      loadTestimonials();
    } catch (error) {
      toast.error("Failed to generate AI samples", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing) {
    return (
      <div className="min-h-screen -m-4 md:-m-12 bg-neutral-950/60">
        <header className="px-4 md:px-12 py-4 md:py-6 border-b border-neutral-800 flex justify-between items-center sticky top-0 bg-neutral-950/60/80 backdrop-blur-md z-10 gap-2">
          <div className="flex items-center gap-3 md:gap-6">
            <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-neutral-900/50 rounded-full transition-all">
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <h1 className="text-lg md:text-2xl font-bold tracking-tight truncate">
              {formData.id ? "Edit Testimonial" : "New Testimonial"}
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button 
              onClick={() => setIsEditing(false)} 
              className="hidden sm:block px-4 py-2 text-neutral-400 font-bold hover:bg-neutral-900/50 rounded-full transition-all text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 md:px-8 py-2 md:py-2.5 bg-blue-600 text-white rounded-full font-bold shadow-xl hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50 text-xs md:text-sm"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
          </div>
        </header>

        <div className="max-w-5xl mx-auto p-6 md:p-20 grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20">
          <aside className="space-y-8">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-4 block text-center">User Avatar</label>
              <div 
                onClick={() => setActiveMediaPicker("avatar")}
                className="w-32 h-32 md:w-48 md:h-48 mx-auto bg-neutral-900/50 rounded-full border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 overflow-hidden relative group"
              >
                {formData.avatar_url ? (
                  <>
                    <img src={formData.avatar_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-neutral-950/60/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold shadow-xl">Change</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <User className="w-8 h-8 text-neutral-600" />
                    <span className="text-[8px] font-bold text-gray-400 uppercase">Pick Photo</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-4 block">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`p-2 rounded-xl transition-all ${formData.rating >= star ? 'text-amber-400' : 'text-gray-200'}`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-8">
              <h2 className="text-sm font-black uppercase tracking-widest text-neutral-400">Client Details</h2>
              
              <div className="space-y-3">
                <label className="text-xs font-bold text-white px-1">Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-5 bg-neutral-900/50 rounded-3xl border-none focus:ring-2 focus:ring-blue-500/50 text-lg font-bold" placeholder="e.g. Sarah Chen" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-white px-1">Role/Company (EN)</label>
                  <input type="text" value={formData.role_en} onChange={(e) => setFormData({ ...formData, role_en: e.target.value })} className="w-full p-4 bg-neutral-900/50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500/50 font-medium" placeholder="e.g. CTO at Nexus AI" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-white px-1">Vị trí (VI)</label>
                  <input type="text" value={formData.role_vi} onChange={(e) => setFormData({ ...formData, role_vi: e.target.value })} className="w-full p-4 bg-neutral-900/50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500/50 font-medium" placeholder="VD: CTO tại Nexus AI" />
                </div>
              </div>

              <div className="space-y-8 pt-4">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-white px-1 flex items-center gap-2">
                    <Quote className="w-3 h-3" /> Testimonial Content (EN)
                  </label>
                  <textarea rows={4} value={formData.content_en} onChange={(e) => setFormData({ ...formData, content_en: e.target.value })} className="w-full p-5 bg-neutral-900/50 rounded-3xl border-none focus:ring-2 focus:ring-blue-500/50 resize-none leading-relaxed" placeholder="What the client said in English..." />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-white px-1 flex items-center gap-2">
                    <Quote className="w-3 h-3" /> Nội dung đánh giá (VI)
                  </label>
                  <textarea rows={4} value={formData.content_vi} onChange={(e) => setFormData({ ...formData, content_vi: e.target.value })} className="w-full p-5 bg-neutral-900/50 rounded-3xl border-none focus:ring-2 focus:ring-blue-500/50 resize-none leading-relaxed" placeholder="Khách hàng nói gì bằng tiếng Việt..." />
                </div>
              </div>
            </section>
          </div>
        </div>

        <MediaPicker 
          isOpen={activeMediaPicker !== null}
          onClose={() => setActiveMediaPicker(null)}
          onSelect={(url) => {
            if (activeMediaPicker === "avatar") setFormData({ ...formData, avatar_url: url });
            else if (activeMediaPicker === "company") setFormData({ ...formData, company_logo_url: url });
            setActiveMediaPicker(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Testimonials</h1>
          <p className="text-neutral-400 mt-2 text-base md:text-lg">What clients say about AZLABS precision.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button 
            onClick={handleSeed}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-3 px-6 py-3 bg-neutral-950/60 text-blue-400 border-2 border-blue-500/50 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all shadow-xl text-sm"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Seed Samples
          </button>
          <button 
            onClick={() => handleStartEdit()}
            className="flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:scale-[1.02] transition-all shadow-2xl text-sm"
          >
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        </div>
      </header>

      {loading ? (
        <div className="py-40 flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
          <p className="text-neutral-400 font-medium animate-pulse">Fetching client feedback...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div 
              key={t.id}
              onClick={() => handleStartEdit(t)}
              className="group bg-neutral-950/60 p-6 md:p-10 rounded-[40px] border border-neutral-800 flex flex-col gap-6 hover:shadow-2xl transition-all cursor-pointer hover:border-black/5"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-neutral-800 group-hover:scale-105 transition-transform duration-500">
                    {t.avatar_url ? (
                      <img src={t.avatar_url} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-neutral-900/50 flex items-center justify-center">
                        <User className="w-8 h-8 text-neutral-600" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{t.name}</h3>
                    <p className="text-neutral-400 text-xs font-medium uppercase tracking-widest mt-1">{t.role_en}</p>
                  </div>
                </div>
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute -left-2 -top-2 w-8 h-8 text-blue-400/5 -z-10" />
                <p className="text-neutral-400 font-medium italic line-clamp-3 leading-relaxed">
                  "{t.content_en}"
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-neutral-800 mt-auto">
                 <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest opacity-40">Testimonial</span>
                 <div className="flex gap-2">
                   <a 
                    href="/#testimonials"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-all"
                    title="View on site"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(t.id);
                    }} 
                    className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
