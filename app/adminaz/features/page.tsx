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
  ChevronRight
} from "lucide-react";
import { getFeatures, upsertFeature, deleteFeature } from "@/lib/actions/cms";
import MediaPicker from "@/components/admin/MediaPicker";
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
      setFormData(feature);
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
    const samples = [
      {
        title_en: "AI-First Engineering",
        title_vi: "Kỹ thuật Ưu tiên AI",
        description_en: "Harnessing the power of Groq Llama 3.3 to build high-performance, intelligent content ecosystems.",
        description_vi: "Tận dụng sức mạnh của Groq Llama 3.3 để xây dựng hệ sinh thái nội dung thông minh, hiệu suất cao.",
        image_url: "https://images.unsplash.com/photo-1620712943543-bcc4628c9757?q=80&w=1000&auto=format&fit=crop" // AI Head / Brain
      },
      {
        title_en: "Apple-Grade Aesthetics",
        title_vi: "Thẩm mỹ Đẳng cấp Apple",
        description_en: "Minimalist, sleek, and premium UI/UX design standards that resonate with global audiences.",
        description_vi: "Tiêu chuẩn thiết kế UI/UX tối giản, tinh tế và cao cấp, mang lại sức hút toàn cầu.",
        image_url: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop" // Tech interior / clean
      },
      {
        title_en: "Cloud-Native Performance",
        title_vi: "Hiệu năng Đám mây Tối ưu",
        description_en: "Scalable infrastructure built with Supabase and AWS, ensuring 99.9% uptime and lightning speed.",
        description_vi: "Cơ sở hạ tầng có thể mở rộng được xây dựng với Supabase và AWS, đảm bảo tốc độ cực nhanh.",
        image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1000&auto=format&fit=crop" // Server / Network
      },
      {
        title_en: "Cinematic Motion",
        title_vi: "Chuyển động Điện ảnh",
        description_en: "High-end GSAP and Framer Motion animations that create a living, breathing digital experience.",
        description_vi: "Các hiệu ứng chuyển động GSAP và Framer Motion cao cấp tạo nên trải nghiệm kỹ thuật số sống động.",
        image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop" // Abstract React / Code flow
      },
      {
        title_en: "Enterprise Security",
        title_vi: "Bảo mật Doanh nghiệp",
        description_en: "State-of-the-art RLS (Row Level Security) and encryption to protect your data with zero compromises.",
        description_vi: "Hệ thống RLS và mã hóa hiện đại nhất để bảo vệ dữ liệu của bạn mà không có bất kỳ sự thỏa hiệp nào.",
        image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop" // Digital security dashboard
      }
    ];

    try {
      for (const sample of samples) {
        await upsertFeature(sample);
      }
      toast.success("Successfully seeded 5 premium features!");
      loadFeatures();
    } catch (error) {
      toast.error("Failed to seed data");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing) {
    return (
      <div className="min-h-screen -m-12 bg-white">
        <header className="px-12 py-6 border-b border-apple-border flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-[#f5f5f7] rounded-full transition-all">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold tracking-tight">
              {formData.id ? "Edit Feature" : "New Feature"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsEditing(false)} 
              className="px-6 py-2.5 text-apple-text-secondary font-bold hover:bg-[#f5f5f7] rounded-full transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-2.5 bg-black text-white rounded-full font-bold shadow-xl hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Feature
            </button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-20 grid grid-cols-1 md:grid-cols-3 gap-20">
          <aside className="space-y-8">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-apple-text-secondary mb-4 block">Visual Representative</label>
              <div 
                onClick={() => setIsMediaPickerOpen(true)}
                className="aspect-square bg-[#f5f5f7] rounded-[40px] border-2 border-dashed border-apple-border flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-50 overflow-hidden relative group"
              >
                {formData.image_url ? (
                  <>
                    <img src={formData.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold shadow-xl">Change Image</span>
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
            
            <div className="p-6 bg-[#f5f5f7] rounded-[32px]">
              <p className="text-xs text-apple-text-secondary leading-relaxed italic">
                "Features define the soul of the product. Choose a simple, high-contrast image to maintain the premium AZLABS aesthetic."
              </p>
            </div>
          </aside>

          <div className="md:col-span-2 space-y-12">
            <section className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-apple-text-secondary">Identity & Language</h2>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-apple-text px-1">Title (EN)</label>
                    <input type="text" value={formData.title_en} onChange={(e) => setFormData({ ...formData, title_en: e.target.value })} className="w-full p-5 bg-[#f5f5f7] rounded-3xl border-none focus:ring-2 focus:ring-apple-accent text-lg font-medium" placeholder="Cloud Scalability" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-apple-text px-1">Tiêu đề (VI)</label>
                    <input type="text" value={formData.title_vi} onChange={(e) => setFormData({ ...formData, title_vi: e.target.value })} className="w-full p-5 bg-[#f5f5f7] rounded-3xl border-none focus:ring-2 focus:ring-apple-accent text-lg font-medium" placeholder="Khả năng mở rộng" />
                  </div>
                </div>

                <div className="space-y-8 pt-4">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-apple-text px-1">Description (EN)</label>
                    <textarea rows={4} value={formData.description_en} onChange={(e) => setFormData({ ...formData, description_en: e.target.value })} className="w-full p-5 bg-[#f5f5f7] rounded-3xl border-none focus:ring-2 focus:ring-apple-accent resize-none leading-relaxed" placeholder="Describe the feature's value in English..." />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-apple-text px-1">Mô tả (VI)</label>
                    <textarea rows={4} value={formData.description_vi} onChange={(e) => setFormData({ ...formData, description_vi: e.target.value })} className="w-full p-5 bg-[#f5f5f7] rounded-3xl border-none focus:ring-2 focus:ring-apple-accent resize-none leading-relaxed" placeholder="Mô tả giá trị tính năng bằng tiếng Việt..." />
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
          <h1 className="text-5xl font-bold tracking-tight text-apple-text">AZLABS Features</h1>
          <p className="text-apple-text-secondary mt-4 text-lg">Define the pillars of your technology ecosystem.</p>
        </div>
        <button 
          onClick={() => handleStartEdit()}
          className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold hover:scale-105 transition-all shadow-2xl"
        >
          <Plus className="w-5 h-5" /> Add New Pillar
        </button>
        <button 
          onClick={handleSeed}
          disabled={isSubmitting}
          className="flex items-center gap-3 px-8 py-4 bg-white text-apple-accent border-2 border-apple-accent rounded-full font-bold hover:bg-apple-accent hover:text-white transition-all"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          Seed Sample Data
        </button>
      </header>

      {loading ? (
        <div className="py-40 flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-apple-accent" />
          <p className="text-apple-text-secondary font-medium animate-pulse">Loading system architecture...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.id}
              onClick={() => handleStartEdit(feature)}
              className="group bg-white p-6 rounded-[32px] border border-apple-border flex items-center gap-8 hover:shadow-xl transition-all cursor-pointer hover:border-black/10"
            >
              <div className="w-24 h-24 bg-[#f5f5f7] rounded-[24px] overflow-hidden flex-shrink-0 border border-apple-border group-hover:scale-105 transition-transform">
                {feature.image_url ? (
                  <img src={feature.image_url} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-apple-text">{feature.title_en}</h3>
                  <ChevronRight className="w-5 h-5 text-apple-text-secondary group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-apple-text-secondary text-sm line-clamp-1 max-w-2xl font-medium">{feature.title_vi}</p>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity pr-4">
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
