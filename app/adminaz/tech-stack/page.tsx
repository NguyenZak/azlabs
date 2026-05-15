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
  Smartphone,
  ExternalLink
} from "lucide-react";
import MediaPicker from "@/components/admin/MediaPicker";
import { 
  upsertTech, 
  deleteTech, 
  generateAISamples,
  parseTechWithAI 
} from "@/lib/actions/cms";
import { createClient } from "@/utils/supabase/client";
import { slugify } from "@/lib/utils";
import toast from "react-hot-toast";
import { Sparkles, FileCode, Check, AlertCircle } from "lucide-react";


const categories = ["Frontend", "Backend", "Mobile", "Infrastructure", "Database", "AI/ML"];

export default function TechStackAdmin() {
  const [techs, setTechs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTech, setCurrentTech] = useState<any>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  // Bulk Add States
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkInput, setBulkInput] = useState("");
  const [bulkPreview, setBulkPreview] = useState<any[]>([]);
  const [isParsing, setIsParsing] = useState(false);

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
    slug: "",
    logo_url: "",
    category: "Frontend",
    order_index: 0
  });

  const handleOpenModal = (tech: any = null) => {
    if (tech) {
      setCurrentTech(tech);
      setFormData({
        id: tech.id,
        name: tech.name,
        slug: tech.slug || "",
        logo_url: tech.logo_url || "",
        category: tech.category || "Frontend",
        order_index: tech.order_index || 0
      });
    } else {
      setCurrentTech(null);
      setFormData({ id: "", name: "", slug: "", logo_url: "", category: "Frontend", order_index: 0 });
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

  const handleSeed = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("AI is analyzing the tech landscape...");
    try {
      const samples = await generateAISamples("tech_stack");
      for (const sample of samples) {
        await upsertTech(sample);
      }
      toast.success("Successfully seeded AI-generated tech stack!", { id: toastId });
      fetchTechs();
    } catch (error) {
      toast.error("Failed to generate AI samples", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkParse = async () => {
    if (!bulkInput.trim()) return;
    setIsParsing(true);
    try {
      const detected = await parseTechWithAI(bulkInput);
      setBulkPreview(detected);
      toast.success(`AI detected ${detected.length} technologies!`);
    } catch (error) {
      toast.error("AI could not parse the input.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleSaveBulk = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading(`Saving ${bulkPreview.length} items...`);
    try {
      for (const tech of bulkPreview) {
        await upsertTech({
          ...tech,
          order_index: techs.length
        });
      }
      toast.success("Successfully added technologies!", { id: toastId });
      setIsBulkModalOpen(false);
      setBulkInput("");
      setBulkPreview([]);
      fetchTechs();
    } catch (error) {
      toast.error("Failed to save items.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-apple-text">Tech Stack</h1>
          <p className="text-apple-text-secondary mt-1 font-medium">Manage technologies powering your world-class solutions</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsBulkModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-apple-text border border-apple-border rounded-2xl font-bold hover:bg-apple-bg transition-all shadow-sm text-sm"
          >
            <FileCode className="w-4 h-4" /> Bulk Add
          </button>
          <button 
            onClick={handleSeed}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-apple-accent border border-apple-accent rounded-2xl font-bold hover:bg-apple-accent hover:text-white transition-all shadow-sm text-sm"
          >
            <Sparkles className="w-4 h-4" /> Seed Samples
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="bg-black text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-xl"
          >
            <Plus className="w-5 h-5" /> Add Technology
          </button>
        </div>
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
                    <img 
                      src={tech.logo_url.startsWith('<svg') 
                        ? `data:image/svg+xml;base64,${typeof window === 'undefined' ? Buffer.from(tech.logo_url).toString('base64') : window.btoa(unescape(encodeURIComponent(tech.logo_url)))}` 
                        : tech.logo_url} 
                      alt={tech.name} 
                      className="max-w-full max-h-full object-contain transition-all duration-500" 
                    />
                  ) : (
                    <Cpu className="w-8 h-8 text-gray-300" />
                  )}
                </div>
                <div className="text-center">
                  <div className="text-xs font-black tracking-tight text-apple-text">{tech.name}</div>
                  <div className="text-[9px] font-bold text-apple-text-secondary uppercase tracking-widest mt-1 opacity-60">{tech.category}</div>
                </div>

                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a 
                    href="/#tech-stack"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-white/80 backdrop-blur shadow-sm rounded-full text-blue-500 hover:text-blue-700 transition-all"
                    title="View on site"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary ml-1">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          const newSlug = slugify(val).replace(/-/g, ""); // SimpleIcons usually don't have hyphens
                          setFormData(prev => ({ 
                            ...prev, 
                            name: val,
                            slug: prev.slug === slugify(prev.name).replace(/-/g, "") || !prev.slug ? newSlug : prev.slug,
                            logo_url: (prev.slug === slugify(prev.name).replace(/-/g, "") || !prev.slug) 
                              ? `https://cdn.simpleicons.org/${newSlug}` 
                              : prev.logo_url
                          }));
                        }}

                        className="w-full px-6 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all font-bold"
                        placeholder="e.g. Next.js"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary ml-1">Icon Slug / Link</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({ ...formData, slug: val });
                          if (val) {
                            if (val.includes(".") && (val.includes("/") || val.length > 5)) {
                              // Domain logic
                              const domain = val.replace("https://", "").replace("http://", "").split("/")[0];
                              setFormData(prev => ({ ...prev, logo_url: `https://logo.clearbit.com/${domain}` }));
                            } else {
                              // Simple Icons logic
                              const slug = val.toLowerCase().replace(/ /g, "").replace(/\./g, "dot");
                              setFormData(prev => ({ ...prev, logo_url: `https://cdn.simpleicons.org/${slug}` }));
                            }
                          }
                        }}
                        className="w-full px-6 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all font-bold"
                        placeholder="nextdotjs or google.com"
                      />
                    </div>
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

                  {/* Logo URL / Manual */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary ml-1">Logo URL / Raw SVG</label>
                      <textarea
                        value={formData.logo_url}
                        onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                        className="w-full px-4 py-3 bg-[#f5f5f7] border-none rounded-xl text-xs font-mono h-20 resize-none"
                        placeholder="Paste URL or raw <svg> code here..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary ml-1">Order</label>
                      <input
                        type="number"
                        value={formData.order_index}
                        onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                        className="w-full px-6 py-3 bg-[#f5f5f7] border-none rounded-xl font-bold"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Logo Preview & Upload */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-text-secondary ml-1">Visual Preview</label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center border border-apple-border shadow-inner overflow-hidden p-4 group-hover:shadow-lg transition-all">
                        {formData.logo_url ? (
                          <img 
                            src={formData.logo_url.startsWith('<svg') 
                              ? `data:image/svg+xml;base64,${typeof window === 'undefined' ? Buffer.from(formData.logo_url).toString('base64') : window.btoa(unescape(encodeURIComponent(formData.logo_url)))}` 
                              : formData.logo_url} 
                            className="w-full h-full object-contain" 
                            onError={(e) => (e.currentTarget.src = "https://placehold.co/100x100?text=Error")}
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-gray-200" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-[11px] text-apple-text-secondary">Paste a link to a website or a SimpleIcon slug above. We'll try to find the logo automatically.</p>
                        <button
                          onClick={() => setIsUploadModalOpen(true)}
                          className="w-full px-4 py-3 bg-[#f5f5f7] border border-apple-border rounded-xl font-bold text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                        >
                          <ImageIcon className="w-4 h-4" /> Custom Upload (Cloudinary)
                        </button>
                      </div>

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
      {/* Bulk Add Modal */}
      <AnimatePresence>
        {isBulkModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBulkModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[40px] shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col relative z-10"
            >
              <div className="p-8 border-b border-apple-border flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-apple-text">Bulk Add with AI</h2>
                  <p className="text-apple-text-secondary text-sm">Paste SVGs, links, or names. AI will do the rest.</p>
                </div>
                <button onClick={() => setIsBulkModalOpen(false)} className="p-2 hover:bg-apple-bg rounded-full transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-apple-text-secondary">Input Data</label>
                  <textarea
                    value={bulkInput}
                    onChange={(e) => setBulkInput(e.target.value)}
                    placeholder="Paste SVG code or list of techs here..."
                    className="w-full h-48 bg-apple-bg p-6 rounded-3xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-mono text-sm resize-none"
                  />
                  <button
                    onClick={handleBulkParse}
                    disabled={isParsing || !bulkInput.trim()}
                    className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-apple-accent transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isParsing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                    {isParsing ? "AI is analyzing..." : "Analyze with AI"}
                  </button>
                </div>

                {bulkPreview.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-apple-text flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        Detected Technologies ({bulkPreview.length})
                      </h3>
                      <button onClick={() => setBulkPreview([])} className="text-red-500 text-sm font-bold hover:underline">Clear All</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {bulkPreview.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-apple-bg rounded-2xl border border-apple-border">
                          <img src={item.logo_url} className="w-8 h-8 object-contain" alt="" />
                          <div className="flex-1">
                            <p className="font-bold text-sm">{item.name}</p>
                            <p className="text-[10px] uppercase font-bold text-apple-text-secondary tracking-widest">{item.category}</p>
                          </div>
                          <button onClick={() => setBulkPreview(bulkPreview.filter((_, i) => i !== idx))} className="text-apple-text-secondary hover:text-red-500">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {bulkPreview.length === 0 && !isParsing && bulkInput && (
                  <div className="flex flex-col items-center justify-center py-12 text-apple-text-secondary">
                    <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-sm font-medium">Click "Analyze with AI" to detect technologies.</p>
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-apple-border bg-apple-bg/50 flex gap-4">
                <button onClick={() => setIsBulkModalOpen(false)} className="flex-1 py-4 font-bold border border-apple-border rounded-2xl hover:bg-white transition-all">Cancel</button>
                <button
                  onClick={handleSaveBulk}
                  disabled={isSubmitting || bulkPreview.length === 0}
                  className="flex-[2] py-4 bg-black text-white rounded-2xl font-bold hover:bg-apple-accent transition-all disabled:opacity-50 shadow-xl"
                >
                  {isSubmitting ? "Saving..." : `Add ${bulkPreview.length} Technologies`}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
