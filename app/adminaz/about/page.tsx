"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Save, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Info,
  Loader2,
  Quote
} from "lucide-react";
import MediaPicker from "@/components/admin/MediaPicker";
import { getAboutContent, upsertAboutContent } from "@/lib/actions/cms";
import { toast } from "react-hot-toast";

export default function AdminAboutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    title_en: "", title_vi: "",
    subtitle_en: "", subtitle_vi: "",
    description_en: "", description_vi: "",
    quote_en: "", quote_vi: "",
    image_url: "",
    stats: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAboutContent();
      if (data) {
        // Sanitize null values to empty strings for controlled inputs
        const sanitizedData = Object.keys(data).reduce((acc: any, key) => {
          acc[key] = data[key] === null ? "" : data[key];
          return acc;
        }, {});
        
        setFormData({
          ...sanitizedData,
          stats: data.stats || []
        });
      }
    } catch (error) {
      toast.error("Failed to fetch About content");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await upsertAboutContent(formData);
      toast.success("About content updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update content");
    } finally {
      setIsSaving(false);
    }
  };

  const addStat = () => {
    setFormData({
      ...formData,
      stats: [...formData.stats, { value: "", label_en: "", label_vi: "" }]
    });
  };

  const removeStat = (index: number) => {
    const newStats = [...formData.stats];
    newStats.splice(index, 1);
    setFormData({ ...formData, stats: newStats });
  };

  const updateStat = (index: number, field: string, value: string) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, stats: newStats });
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-apple-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-apple-text">About Section</h1>
          <p className="text-apple-text-secondary mt-2 text-lg">Manage the content of the "Our Philosophy" section.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-apple-accent transition-all disabled:opacity-50 shadow-xl"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Content */}
        <div className="space-y-12">
          {/* Main Titles */}
          <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
            <div className="flex items-center gap-3 text-apple-accent">
              <Info className="w-5 h-5" />
              <h2 className="font-bold uppercase tracking-widest text-sm">Headlines</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1">Subtitle (English) - Green Label</label>
                <input
                  type="text"
                  value={formData.subtitle_en}
                  onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value })}
                  placeholder="e.g. Our Philosophy"
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1">Subtitle (Vietnamese)</label>
                <input
                  type="text"
                  value={formData.subtitle_vi}
                  onChange={(e) => setFormData({ ...formData, subtitle_vi: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1">Main Title (English)</label>
                <textarea
                  rows={2}
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  placeholder="Beyond code. We build legacy."
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1">Main Title (Vietnamese)</label>
                <textarea
                  rows={2}
                  value={formData.title_vi}
                  onChange={(e) => setFormData({ ...formData, title_vi: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium resize-none"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
            <div className="flex items-center gap-3 text-apple-accent">
              <Info className="w-5 h-5" />
              <h2 className="font-bold uppercase tracking-widest text-sm">Description</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1">Body Text (English)</label>
                <textarea
                  rows={4}
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium resize-none leading-relaxed text-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1">Body Text (Vietnamese)</label>
                <textarea
                  rows={4}
                  value={formData.description_vi}
                  onChange={(e) => setFormData({ ...formData, description_vi: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium resize-none leading-relaxed text-lg"
                />
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
            <div className="flex items-center gap-3 text-apple-accent">
              <Quote className="w-5 h-5" />
              <h2 className="font-bold uppercase tracking-widest text-sm">Featured Quote</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1">Quote (English)</label>
                <input
                  type="text"
                  value={formData.quote_en}
                  onChange={(e) => setFormData({ ...formData, quote_en: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium italic"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1">Quote (Vietnamese)</label>
                <input
                  type="text"
                  value={formData.quote_vi}
                  onChange={(e) => setFormData({ ...formData, quote_vi: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium italic"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visuals & Stats */}
        <div className="space-y-12">
          {/* Main Image */}
          <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-apple-accent">
                <ImageIcon className="w-5 h-5" />
                <h2 className="font-bold uppercase tracking-widest text-sm">Main Image</h2>
              </div>
              <button
                onClick={() => setIsMediaModalOpen(true)}
                className="text-apple-accent font-bold text-sm hover:underline"
              >
                Choose from Media
              </button>
            </div>
            
            <div className="relative group aspect-[3/4] rounded-3xl overflow-hidden bg-apple-bg border border-apple-border">
              {formData.image_url ? (
                <>
                  <img
                    src={formData.image_url}
                    alt="About visual"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => setIsMediaModalOpen(true)}
                      className="bg-white text-black px-6 py-2 rounded-full font-bold shadow-xl"
                    >
                      Change Image
                    </button>
                  </div>
                </>
              ) : (
                <div 
                  className="w-full h-full flex flex-col items-center justify-center text-apple-text-secondary cursor-pointer"
                  onClick={() => setIsMediaModalOpen(true)}
                >
                  <Plus className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-bold uppercase tracking-widest text-xs">No image selected</p>
                </div>
              )}
            </div>

            <MediaPicker
              isOpen={isMediaModalOpen}
              onClose={() => setIsMediaModalOpen(false)}
              onSelect={(url: string) => {
                setFormData({ ...formData, image_url: url });
                setIsMediaModalOpen(false);
              }}
            />
          </div>

          {/* Statistics */}
          <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-apple-accent">
                <Plus className="w-5 h-5" />
                <h2 className="font-bold uppercase tracking-widest text-sm">Statistics</h2>
              </div>
              <button
                onClick={addStat}
                className="text-apple-accent font-bold text-sm hover:underline flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Stat
              </button>
            </div>

            <div className="space-y-6">
              {formData.stats.map((stat: any, index: number) => (
                <div key={index} className="p-6 bg-apple-bg rounded-3xl space-y-4 relative group">
                  <button
                    onClick={() => removeStat(index)}
                    className="absolute top-4 right-4 text-apple-text-secondary hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 space-y-1">
                      <label className="text-[10px] font-bold text-apple-text-secondary uppercase px-1">Value</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateStat(index, "value", e.target.value)}
                        placeholder="50+"
                        className="w-full bg-white px-4 py-3 rounded-xl border border-apple-border focus:ring-2 focus:ring-apple-accent transition-all font-bold"
                      />
                    </div>
                    <div className="col-span-3 space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-apple-text-secondary uppercase px-1">Label (English)</label>
                        <input
                          type="text"
                          value={stat.label_en}
                          onChange={(e) => updateStat(index, "label_en", e.target.value)}
                          placeholder="Projects Delivered"
                          className="w-full bg-white px-4 py-3 rounded-xl border border-apple-border focus:ring-2 focus:ring-apple-accent transition-all font-medium text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-apple-text-secondary uppercase px-1">Nhãn (Tiếng Việt)</label>
                        <input
                          type="text"
                          value={stat.label_vi}
                          onChange={(e) => updateStat(index, "label_vi", e.target.value)}
                          className="w-full bg-white px-4 py-3 rounded-xl border border-apple-border focus:ring-2 focus:ring-apple-accent transition-all font-medium text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {formData.stats.length === 0 && (
                <div className="text-center py-10 text-apple-text-secondary italic text-sm">
                  No statistics added.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
