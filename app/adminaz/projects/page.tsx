"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Globe,
  Image as ImageIcon,
  X,
  Loader2,
  Languages
} from "lucide-react";
import LanguageTabs from "@/components/admin/LanguageTabs";
import MediaPicker from "@/components/admin/MediaPicker";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { upsertProject, deleteProject, generateAISamples } from "@/lib/actions/cms";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<"vi" | "en">("vi");

  const supabase = createClient();

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  }

  const [formData, setFormData] = useState({
    id: "",
    title_en: "", title_vi: "",
    category_en: "", category_vi: "",
    description_en: "", description_vi: "",
    details_en: "", details_vi: "",
    image_url: "",
    client: "",
    live_url: "",
    tags: [] as string[]
  });

  const handleOpenModal = (project: any = null) => {
    if (project) {
      setCurrentProject(project);
      setFormData({
        id: project.id,
        title_en: project.title_en, title_vi: project.title_vi,
        category_en: project.category_en, category_vi: project.category_vi,
        description_en: project.description_en || "", description_vi: project.description_vi || "",
        details_en: project.details_en || "", details_vi: project.details_vi || "",
        image_url: project.image_url || "",
        client: project.client || "",
        live_url: project.live_url || "",
        tags: project.tags || []
      });
    } else {
      setCurrentProject(null);
      setFormData({
        id: "", title_en: "", title_vi: "", category_en: "", category_vi: "",
        description_en: "", description_vi: "", 
        details_en: "", details_vi: "",
        image_url: "", client: "", live_url: "", tags: []
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await upsertProject(formData);
      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      alert("Error saving project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (error) {
      alert("Error deleting project");
    }
  };

  const handleSeed = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("AI is curating world-class projects...");
    try {
      const samples = await generateAISamples("project");
      for (const sample of samples) {
        await upsertProject(sample);
      }
      toast.success("Successfully seeded AI projects!", { id: toastId });
      fetchProjects();
    } catch (error) {
      toast.error("Failed to generate AI samples", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Projects</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage your cinematic portfolio projects.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button 
            onClick={handleSeed}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-neutral-950/60 text-blue-400 border border-blue-500/50 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm text-sm"
          >
            <Plus className="w-4 h-4" /> Seed Samples
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-xl text-sm"
          >
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex gap-4 items-center bg-neutral-950/60 p-4 rounded-2xl border border-neutral-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full pl-12 pr-4 py-2 bg-neutral-900/50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-900/50 rounded-xl transition-all font-medium">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Project Display */}
      <div className="bg-neutral-950/60 rounded-2xl md:rounded-[32px] border border-neutral-800 shadow-sm overflow-hidden">
        {/* Mobile Cards */}
        <div className="block md:hidden divide-y divide-apple-border">
          {loading ? (
            <div className="p-12 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-400" /></div>
          ) : projects.length === 0 ? (
            <div className="p-12 text-center text-neutral-400 text-sm">No projects found.</div>
          ) : projects.map((project) => (
            <div key={project.id} className="p-4 space-y-4">
              <div className="flex gap-4">
                <div className="w-20 h-14 rounded-lg bg-neutral-800 overflow-hidden border border-neutral-800 flex-shrink-0">
                  {project.image_url ? <img src={project.image_url} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full flex items-center justify-center text-neutral-600"><ImageIcon className="w-5 h-5" /></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-base truncate">{project.title_en}</span>
                    <span className="px-1.5 py-0.5 bg-green-50 text-green-600 rounded text-[8px] font-bold uppercase shrink-0">Active</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">{project.category_en}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenModal(project)}
                  className="flex-1 py-2 bg-neutral-800/50 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-4 h-4" /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="px-4 py-2 bg-red-50 text-red-500 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <table className="hidden md:table w-full text-left">
          <thead>
            <tr className="bg-neutral-900/50 text-neutral-400 text-sm uppercase tracking-widest font-bold">
              <th className="px-8 py-5">Project</th>
              <th className="px-8 py-5">Category (EN / VI)</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5">Date</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-apple-border">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                    <p className="text-neutral-400 font-medium">Loading projects...</p>
                  </div>
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <p className="text-neutral-400 font-medium">No projects found. Create your first one!</p>
                </td>
              </tr>
            ) : projects.map((project) => (
              <tr key={project.id} className="hover:bg-neutral-900 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-10 rounded-lg overflow-hidden bg-neutral-800 border border-neutral-800 flex-shrink-0">
                      {project.image_url ? (
                        <img src={project.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-600">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-white line-clamp-1">{project.title_en}</div>
                      <div className="text-sm text-neutral-400 line-clamp-1">{project.title_vi}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm">
                    <span className="font-medium">{project.category_en}</span>
                    <span className="mx-2 opacity-20">|</span>
                    <span className="text-neutral-400">{project.category_vi}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-widest">Active</span>
                </td>
                <td className="px-8 py-6 text-sm text-neutral-400">
                  {new Date(project.created_at).toLocaleDateString()}
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a 
                      href={`/projects/${project.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-all"
                      title="View on site"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <button 
                      onClick={() => handleOpenModal(project)}
                      className="p-2 hover:bg-neutral-900/50 rounded-lg text-neutral-400 hover:text-white transition-all"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dual-Language Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-neutral-950/60 rounded-3xl md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] md:max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-neutral-800 flex justify-between items-center bg-neutral-900">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-900/40 border border-blue-500/30 rounded-xl flex items-center justify-center text-white">
                    <Plus className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                    {currentProject ? "Edit Project" : "New Project"}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={async () => {
                      if (!formData.title_en) return toast.error("Please enter an English title first");
                      const loadingToast = toast.loading("AI is crafting your project story...");
                      try {
                        const { generateAIContent } = await import("@/lib/actions/cms");
                        const result = await generateAIContent(formData.title_en);
                        setFormData({
                          ...formData,
                          description_en: result.en.excerpt,
                          description_vi: result.vi.excerpt,
                          details_en: result.en.content,
                          details_vi: result.vi.content
                        });
                        toast.success("Project content generated!");
                      } catch (err: any) {
                        toast.error(err.message);
                      } finally {
                        toast.dismiss(loadingToast);
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-apple-accent text-white rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-lg"
                  >
                    <span className="animate-pulse">✨</span> AI Write
                  </button>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-neutral-900/50 rounded-full transition-all">
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body - Dual Input Grid */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 md:space-y-12">
                
                <LanguageTabs activeLang={activeLang} onChange={setActiveLang} />

                <div className="space-y-12">
                  {activeLang === "vi" ? (
                    <motion.div 
                      key="vi-fields"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                            Tiêu đề (Tiếng Việt)
                          </label>
                          <input 
                            type="text" 
                            placeholder="vd: Ngân hàng Nova"
                            value={formData.title_vi}
                            onChange={(e) => setFormData({ ...formData, title_vi: e.target.value })}
                            className="w-full px-6 py-4 bg-neutral-900/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all font-bold text-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Lĩnh vực (Tiếng Việt)</label>
                          <input 
                            type="text" 
                            placeholder="vd: Giải pháp Tài chính"
                            value={formData.category_vi}
                            onChange={(e) => setFormData({ ...formData, category_vi: e.target.value })}
                            className="w-full px-6 py-4 bg-neutral-900/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Mô tả (Tiếng Việt)</label>
                          <textarea 
                            rows={4}
                            placeholder="Mô tả tầm ảnh hưởng của dự án..."
                            value={formData.description_vi}
                            onChange={(e) => setFormData({ ...formData, description_vi: e.target.value })}
                            className="w-full px-6 py-4 bg-neutral-900/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="en-fields"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                            Title (English)
                          </label>
                          <input 
                            type="text" 
                            placeholder="e.g. Nova Bank"
                            value={formData.title_en}
                            onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                            className="w-full px-6 py-4 bg-neutral-900/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all font-bold text-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Category (English)</label>
                          <input 
                            type="text" 
                            placeholder="e.g. FinTech Solution"
                            value={formData.category_en}
                            onChange={(e) => setFormData({ ...formData, category_en: e.target.value })}
                            className="w-full px-6 py-4 bg-neutral-900/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Description (English)</label>
                          <textarea 
                            rows={4}
                            placeholder="Describe the project impact..."
                            value={formData.description_en}
                            onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                            className="w-full px-6 py-4 bg-neutral-900/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="bg-neutral-900/50 h-[1px] w-full" />

                {/* Metadata Section: Client & Link */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Client / Partner Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Apple Inc. or Tech Global"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      className="w-full px-6 py-4 bg-neutral-900/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Live Project URL</label>
                    <input 
                      type="url" 
                      placeholder="https://example.com"
                      value={formData.live_url}
                      onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                      className="w-full px-6 py-4 bg-neutral-900/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Cloudinary Image Upload Section */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Project Cover Image</label>
                  <button 
                    type="button"
                    onClick={() => setIsUploadModalOpen(true)}
                    className="w-full h-48 border-2 border-dashed border-neutral-800 rounded-[32px] flex flex-col items-center justify-center gap-4 hover:bg-neutral-900 hover:border-blue-500/50/30 transition-all group overflow-hidden"
                  >
                    {formData.image_url ? (
                      <img src={formData.image_url} alt="Uploaded" className="w-full h-full object-cover rounded-[30px]" />
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-neutral-900/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ImageIcon className="w-6 h-6 text-neutral-400" />
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-white">Click to upload image</div>
                          <div className="text-sm text-neutral-400">High-quality cinematic images only (JPG, PNG, WEBP)</div>
                        </div>
                      </>
                    )}
                  </button>

                  <MediaPicker 
                    isOpen={isUploadModalOpen}
                    onClose={() => setIsUploadModalOpen(false)}
                    onSelect={(url: string) => {
                      setFormData({ ...formData, image_url: url });
                    }}
                  />
                </div>

                {/* Details Section (Rich Text) */}
                <div className="space-y-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400">Case Study Details</h3>
                  {activeLang === "vi" ? (
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Nội dung chi tiết (Tiếng Việt)</label>
                      <RichTextEditor 
                        content={formData.details_vi}
                        onChange={(html) => setFormData({ ...formData, details_vi: html })}
                        onImageClick={() => setIsUploadModalOpen(true)}
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Full Project Case Study (English)</label>
                      <RichTextEditor 
                        content={formData.details_en}
                        onChange={(html) => setFormData({ ...formData, details_en: html })}
                        onImageClick={() => setIsUploadModalOpen(true)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-neutral-800 flex justify-end gap-4 bg-neutral-900">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-4 bg-neutral-950/60 border border-neutral-800 rounded-2xl font-bold hover:bg-neutral-900/50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Project"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
