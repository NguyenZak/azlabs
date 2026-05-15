"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Trash2,
  X,
  Loader2,
  Image as ImageIcon,
  Cpu,
  Cloud,
  Code,
  Layout,
  Database,
  Smartphone
} from "lucide-react";
import MediaPicker from "@/components/admin/MediaPicker";
import { upsertTech, deleteTech } from "@/lib/actions/cms";
import { createClient } from "@/utils/supabase/client";

const categories = ["Frontend", "Backend", "Mobile", "Infrastructure", "Database", "AI/ML"];

export default function TechStackAdmin() {
  const [techs, setTechs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTech, setCurrentTech] = useState<any>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchTechs();
  }, []);

  async function fetchTechs() {
    setLoading(true);
    const { data } = await supabase.from("tech_stack").select("*").order("name", { ascending: true });
    if (data) setTechs(data);
    setLoading(false);
  }

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    logo_url: "",
    category: "Frontend"
  });

  const handleOpenModal = (tech: any = null) => {
    if (tech) {
      setCurrentTech(tech);
      setFormData({
        id: tech.id,
        name: tech.name,
        logo_url: tech.logo_url || "",
        category: tech.category || "Frontend"
      });
    } else {
      setCurrentTech(null);
      setFormData({ id: "", name: "", logo_url: "", category: "Frontend" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name) return alert("Name is required");
    setIsSubmitting(true);
    try {
      await upsertTech(formData);
      setIsModalOpen(false);
      fetchTechs();
    } catch (error) {
      alert("Error saving tech");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this tech from stack?")) return;
    try {
      await deleteTech(id);
      fetchTechs();
    } catch (error) {
      alert("Error deleting tech");
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-apple-text">Tech Stack</h1>
          <p className="text-apple-text-secondary mt-1 font-medium">Manage technologies powering your world-class solutions</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-black text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-xl"
        >
          <Plus className="w-5 h-5" /> Add Technology
        </button>
      </header>

      {/* Categories Tabs & List */}
      <div className="bg-white rounded-[40px] border border-apple-border shadow-sm overflow-hidden">
        <div className="p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {loading ? (
              Array(12).fill(0).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-50 rounded-3xl animate-pulse" />
              ))
            ) : techs.length === 0 ? (
              <div className="col-span-full py-20 text-center text-apple-text-secondary font-medium">
                Your tech stack is empty. Start adding some technologies!
              </div>
            ) : techs.map((tech) => (
              <motion.div
                key={tech.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative aspect-square bg-[#f5f5f7] rounded-[32px] p-6 flex flex-col items-center justify-center gap-3 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-apple-border"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-1">
                  {tech.logo_url ? (
                    <img src={tech.logo_url} alt={tech.name} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                  ) : (
                    <Cpu className="w-8 h-8 text-gray-300" />
                  )}
                </div>
                <div className="text-center">
                  <div className="text-xs font-black tracking-tight text-apple-text">{tech.name}</div>
                  <div className="text-[9px] font-bold text-apple-text-secondary uppercase tracking-widest mt-1 opacity-60">{tech.category}</div>
                </div>

                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(tech)} className="p-2 bg-white/80 backdrop-blur shadow-sm rounded-full text-apple-text-secondary hover:text-black transition-all">
                    <ImageIcon className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleDelete(tech.id)} className="p-2 bg-white/80 backdrop-blur shadow-sm rounded-full text-red-400 hover:text-red-600 transition-all">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/5 backdrop-blur-2xl"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl border border-apple-border overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold tracking-tight">{currentTech ? "Edit Tech" : "Add Tech"}</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-[#f5f5f7] rounded-full transition-all">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary ml-1">Technology Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all font-bold"
                      placeholder="e.g. Next.js, OpenAI, Kubernetes"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary ml-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-6 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all font-bold appearance-none"
                    >
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>

                  {/* Logo Upload */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary ml-1">Logo (Cloudinary)</label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[#f5f5f7] rounded-2xl flex items-center justify-center border border-apple-border overflow-hidden">
                        {formData.logo_url ? (
                          <img src={formData.logo_url} className="w-full h-full object-contain p-2" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                      <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="flex-1 px-6 py-4 bg-white border border-apple-border rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all text-center"
                      >
                        Upload Logo
                      </button>

                      <MediaPicker 
                        isOpen={isUploadModalOpen}
                        onClose={() => setIsUploadModalOpen(false)}
                        onSelect={(url: string) => setFormData({ ...formData, logo_url: url })}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-end gap-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                    {currentTech ? "Update Technology" : "Add to Stack"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
