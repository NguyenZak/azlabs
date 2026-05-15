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
  Loader2
} from "lucide-react";
import { CldUploadWidget } from 'next-cloudinary';
import { upsertProject, deleteProject } from "@/lib/actions/cms";
import { createClient } from "@/utils/supabase/client";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);

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
    image_url: "",
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
        image_url: project.image_url || "",
        tags: project.tags || []
      });
    } else {
      setCurrentProject(null);
      setFormData({
        id: "", title_en: "", title_vi: "", category_en: "", category_vi: "",
        description_en: "", description_vi: "", image_url: "", tags: []
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

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-apple-text">Projects</h1>
          <p className="text-apple-text-secondary mt-2">Manage your cinematic portfolio projects.</p>
        </div>
        <button 
          onClick={() => { setCurrentProject(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-xl"
        >
          <Plus className="w-5 h-5" /> New Project
        </button>
      </header>

      {/* Toolbar */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-apple-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-apple-text-secondary" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full pl-12 pr-4 py-2 bg-[#f5f5f7] border-none rounded-xl focus:ring-2 focus:ring-apple-accent transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#f5f5f7] rounded-xl transition-all font-medium">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Project Table */}
      <div className="bg-white rounded-[32px] border border-apple-border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#f5f5f7] text-apple-text-secondary text-sm uppercase tracking-widest font-bold">
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
                    <Loader2 className="w-8 h-8 animate-spin text-apple-accent" />
                    <p className="text-apple-text-secondary font-medium">Loading projects...</p>
                  </div>
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <p className="text-apple-text-secondary font-medium">No projects found. Create your first one!</p>
                </td>
              </tr>
            ) : projects.map((project) => (
              <tr key={project.id} className="hover:bg-[#fbfbfd] transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-10 rounded-lg overflow-hidden bg-gray-100 border border-apple-border flex-shrink-0">
                      {project.image_url ? (
                        <img src={project.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-apple-text line-clamp-1">{project.title_en}</div>
                      <div className="text-sm text-apple-text-secondary line-clamp-1">{project.title_vi}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm">
                    <span className="font-medium">{project.category_en}</span>
                    <span className="mx-2 opacity-20">|</span>
                    <span className="text-apple-text-secondary">{project.category_vi}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-widest">Active</span>
                </td>
                <td className="px-8 py-6 text-sm text-apple-text-secondary">
                  {new Date(project.created_at).toLocaleDateString()}
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleOpenModal(project)}
                      className="p-2 hover:bg-[#f5f5f7] rounded-lg text-apple-text-secondary hover:text-apple-text transition-all"
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
              className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-apple-border flex justify-between items-center bg-[#fbfbfd]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
                    <Plus className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {currentProject ? "Edit Project" : "Create New Project"}
                  </h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-[#f5f5f7] rounded-full transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body - Dual Input Grid */}
              <div className="flex-1 overflow-y-auto p-10 space-y-12">
                
                {/* Title Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary flex items-center gap-2">
                      <Globe className="w-3 h-3" /> Title (English)
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Nova Bank"
                      className="w-full px-6 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all font-bold text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary flex items-center gap-2">
                      <Globe className="w-3 h-3 text-red-400" /> Tiêu đề (Tiếng Việt)
                    </label>
                    <input 
                      type="text" 
                      placeholder="vd: Ngân hàng Nova"
                      className="w-full px-6 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all font-bold text-lg"
                    />
                  </div>
                </div>

                {/* Category Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary">Category (English)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. FinTech Solution"
                      className="w-full px-6 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary">Lĩnh vực (Tiếng Việt)</label>
                    <input 
                      type="text" 
                      placeholder="vd: Giải pháp Tài chính"
                      className="w-full px-6 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all"
                    />
                  </div>
                </div>

                {/* Description Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary">Description (English)</label>
                    <textarea 
                      rows={4}
                      placeholder="Describe the project impact..."
                      className="w-full px-6 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary">Mô tả (Tiếng Việt)</label>
                    <textarea 
                      rows={4}
                      placeholder="Mô tả tầm ảnh hưởng của dự án..."
                      className="w-full px-6 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Cloudinary Image Upload Section */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary">Project Cover Image (Cloudinary)</label>
                  <CldUploadWidget 
                    uploadPreset="azlabs_cms"
                    onSuccess={(result: any) => {
                      setFormData({ ...formData, image_url: result.info.secure_url });
                    }}
                  >
                    {({ open }) => (
                      <button 
                        type="button"
                        onClick={() => open()}
                        className="w-full h-48 border-2 border-dashed border-apple-border rounded-[32px] flex flex-col items-center justify-center gap-4 hover:bg-[#fbfbfd] hover:border-apple-accent/30 transition-all group"
                      >
                        {formData.image_url ? (
                          <img src={formData.image_url} alt="Uploaded" className="w-full h-full object-cover rounded-[30px]" />
                        ) : (
                          <>
                            <div className="w-12 h-12 bg-[#f5f5f7] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <ImageIcon className="w-6 h-6 text-apple-text-secondary" />
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-apple-text">Click to upload from Cloudinary</div>
                              <div className="text-sm text-apple-text-secondary">High-quality cinematic images only (JPG, PNG, WEBP)</div>
                            </div>
                          </>
                        )}
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-apple-border flex justify-end gap-4 bg-[#fbfbfd]">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-4 bg-white border border-apple-border rounded-2xl font-bold hover:bg-[#f5f5f7] transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-12 py-4 bg-black text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl disabled:opacity-50 flex items-center gap-2"
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
