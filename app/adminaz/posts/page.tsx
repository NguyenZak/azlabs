"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Search, Edit3, Trash2, Globe, Image as ImageIcon, 
  X, FileText, BarChart, Settings, Save, Eye, Hash, Loader2
} from "lucide-react";
import toast from "react-hot-toast";
import RichTextEditor from "@/components/admin/RichTextEditor";
import MediaPicker from "@/components/admin/MediaPicker";
import { upsertPost, deletePost, generateAIContent } from "@/lib/actions/cms";
import { createClient } from "@/utils/supabase/client";
import { Sparkles, Wand2 } from "lucide-react";

export default function PostsAdmin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaTargetLang, setMediaTargetLang] = useState<"en" | "vi">("vi");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleImageSelect = (url: string) => {
    const imgHtml = `<img src="${url}" alt="image" />`;
    if (mediaTargetLang === "vi") {
      setFormData(prev => ({ ...prev, content_vi: prev.content_vi + imgHtml }));
    } else {
      setFormData(prev => ({ ...prev, content_en: prev.content_en + imgHtml }));
    }
  };
  const [currentPost, setCurrentPost] = useState<any>(null);
  
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleAIGenerate = async () => {
    if (!aiPrompt) return toast.error("Please enter a topic first!");
    
    setIsGeneratingAI(true);
    try {
      const result = await generateAIContent(aiPrompt);
      
      setFormData(prev => ({
        ...prev,
        title_vi: result.vi.title,
        excerpt_vi: result.vi.excerpt,
        content_vi: result.vi.content,
        title_en: result.en.title,
        excerpt_en: result.en.excerpt,
        content_en: result.en.content,
      }));

      toast.success("AI Magic Write completed for both languages!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const supabase = createClient();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  }

  const [formData, setFormData] = useState({
    id: "",
    slug: "",
    title_en: "", title_vi: "",
    excerpt_en: "", excerpt_vi: "",
    content_en: "", content_vi: "",
    image_url: "",
    meta_title_en: "", meta_title_vi: "",
    meta_description_en: "", meta_description_vi: "",
    is_published: false
  });

  const handleOpenModal = (post: any = null) => {
    if (post) {
      setCurrentPost(post);
      setFormData({
        id: post.id,
        slug: post.slug,
        title_en: post.title_en, title_vi: post.title_vi,
        excerpt_en: post.excerpt_en || "", excerpt_vi: post.excerpt_vi || "",
        content_en: post.content_en || "", content_vi: post.content_vi || "",
        image_url: post.image_url || "",
        meta_title_en: post.meta_title_en || "", meta_title_vi: post.meta_title_vi || "",
        meta_description_en: post.meta_description_en || "", meta_description_vi: post.meta_description_vi || "",
        is_published: post.is_published || false
      });
    } else {
      setCurrentPost(null);
      setFormData({
        id: "", slug: "", title_en: "", title_vi: "", excerpt_en: "", excerpt_vi: "",
        content_en: "", content_vi: "", image_url: "", meta_title_en: "", meta_title_vi: "",
        meta_description_en: "", meta_description_vi: "", is_published: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.slug) return alert("Slug is required");
    setIsSubmitting(true);
    try {
      await upsertPost(formData);
      setIsModalOpen(false);
      fetchPosts();
    } catch (error) {
      alert("Error saving post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      await deletePost(id);
      fetchPosts();
    } catch (error) {
      alert("Error deleting post");
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)]">
      <AnimatePresence mode="wait">
        {!isModalOpen ? (
          /* LIST VIEW */
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-apple-text">Blog Posts</h1>
                <p className="text-sm text-apple-text-secondary mt-1">Manage and create stories for AZLABS.</p>
              </div>
              <button 
                onClick={() => handleOpenModal()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-xl"
              >
                <Plus className="w-5 h-5" /> New Article
              </button>
            </header>

            <div className="bg-white rounded-2xl md:rounded-[32px] border border-apple-border shadow-sm overflow-hidden">
              <div className="p-4 md:p-6 border-b border-apple-border">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-apple-text-secondary" />
                  <input type="text" placeholder="Search articles..." className="w-full pl-12 pr-4 py-3 bg-[#f5f5f7] border-none rounded-xl focus:ring-2 focus:ring-apple-accent" />
                </div>
              </div>

              {/* Mobile View: Cards */}
              <div className="block md:hidden divide-y divide-apple-border">
                {loading ? (
                  <div className="p-12 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-apple-accent" /></div>
                ) : posts.length === 0 ? (
                  <div className="p-12 text-center text-apple-text-secondary text-sm">No articles yet.</div>
                ) : posts.map((post) => (
                  <div key={post.id} className="p-4 space-y-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-14 rounded-lg bg-gray-100 overflow-hidden border border-apple-border flex-shrink-0">
                        {post.image_url ? <img src={post.image_url} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon className="w-5 h-5" /></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-base truncate">{post.title_en}</span>
                          {post.is_published ? <span className="px-1.5 py-0.5 bg-green-50 text-green-600 rounded text-[8px] font-bold uppercase shrink-0">Live</span> : <span className="px-1.5 py-0.5 bg-gray-100 text-gray-400 rounded text-[8px] font-bold uppercase shrink-0">Draft</span>}
                        </div>
                        <p className="text-xs text-apple-text-secondary mt-1">/{post.slug}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleOpenModal(post)}
                        className="flex-1 py-2 bg-apple-bg-secondary text-apple-text rounded-lg text-sm font-bold flex items-center justify-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" /> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="px-4 py-2 bg-red-50 text-red-500 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View: Table */}
              <table className="hidden md:table w-full text-left">
                <tbody className="divide-y divide-apple-border">
                  {loading ? (
                    <tr><td className="px-8 py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-apple-accent" /></td></tr>
                  ) : posts.length === 0 ? (
                    <tr><td className="px-8 py-20 text-center text-apple-text-secondary">No articles yet.</td></tr>
                  ) : posts.map((post) => (
                    <tr key={post.id} className="group hover:bg-[#fbfbfd] transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-14 rounded-lg bg-gray-100 overflow-hidden border border-apple-border flex-shrink-0">
                            {post.image_url ? <img src={post.image_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon className="w-5 h-5" /></div>}
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-lg">{post.title_en}</span>
                              {post.is_published ? <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-[10px] font-bold">Published</span> : <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded text-[10px] font-bold">Draft</span>}
                            </div>
                            <p className="text-sm text-apple-text-secondary">/{post.slug} • {new Date(post.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleOpenModal(post)} className="p-2 hover:bg-gray-100 rounded-lg"><Edit3 className="w-5 h-5" /></button>
                          <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-red-50 text-red-400 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          /* FULL-PAGE EDITOR VIEW */
          <motion.div 
            key="editor"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col gap-8"
          >
            {/* Sticky Header */}
            <header className="sticky top-0 md:top-0 z-[41] flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 bg-[#f5f5f7]/80 backdrop-blur-md gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex items-center gap-2 text-apple-text-secondary hover:text-apple-text transition-colors font-medium text-sm"
              >
                <X className="w-4 h-4" /> Back
              </button>
              <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                <div className="flex bg-white p-1 rounded-xl border border-apple-border shadow-sm">
                  <button 
                    onClick={() => setActiveTab("content")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'content' ? 'bg-black text-white' : 'text-apple-text-secondary'}`}
                  >
                    Editor
                  </button>
                  <button 
                    onClick={() => setActiveTab("seo")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'seo' ? 'bg-black text-white' : 'text-apple-text-secondary'}`}
                  >
                    SEO
                  </button>
                </div>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 bg-black text-white rounded-xl font-bold shadow-xl hover:opacity-90 flex items-center gap-2 disabled:opacity-50 text-xs"
                >
                  {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                  Save
                </button>
              </div>
            </header>

            {/* AI Assistant (Always visible in editor) */}
            <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 p-6 md:p-8 rounded-3xl md:rounded-[40px] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles className="w-32 h-32" /></div>
              <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-8">
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                    <Wand2 className="w-5 h-5 md:w-6 md:h-6" /> AI Assistant
                  </h3>
                  <p className="text-white/70 text-sm md:text-base">What should we write about today?</p>
                  <input 
                    type="text" 
                    placeholder="e.g. Next.js 15 performance optimization tips..." 
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="w-full mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/50 transition-all outline-none text-sm md:text-base"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleAIGenerate}
                    disabled={isGeneratingAI}
                    className="px-6 md:px-10 py-4 md:py-6 bg-white text-indigo-600 rounded-2xl md:rounded-[28px] font-black shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-base md:text-lg group"
                  >
                    {isGeneratingAI ? <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" /> : <Sparkles className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />}
                    Magic Write
                  </button>
                  <p className="hidden md:block text-white/40 text-[10px] text-center font-bold uppercase tracking-widest">
                    Generates full content in VI & EN
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Main Area */}
              <div className="lg:col-span-8 space-y-12">
                <AnimatePresence mode="wait">
                  {activeTab === "content" ? (
                    <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          value={formData.title_en}
                          onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                          className="w-full text-3xl md:text-5xl font-bold tracking-tight border-none p-0 focus:ring-0 bg-transparent placeholder:text-gray-200" 
                          placeholder="English Title..." 
                        />
                        <input 
                          type="text" 
                          value={formData.title_vi}
                          onChange={(e) => setFormData({ ...formData, title_vi: e.target.value })}
                          className="w-full text-xl md:text-3xl font-bold tracking-tight border-none p-0 focus:ring-0 bg-transparent placeholder:text-gray-300 text-apple-text-secondary" 
                          placeholder="Tiêu đề tiếng Việt..." 
                        />
                      </div>

                      <div className="space-y-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-apple-text-secondary">Body (EN)</label>
                          <RichTextEditor 
                            content={formData.content_en} 
                            onChange={(c) => setFormData({ ...formData, content_en: c })} 
                            onImageClick={() => {
                              setMediaTargetLang("en");
                              setIsMediaPickerOpen(true);
                            }}
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-apple-text-secondary">Nội dung (VI)</label>
                          <RichTextEditor 
                            content={formData.content_vi} 
                            onChange={(c) => setFormData({ ...formData, content_vi: c })} 
                            onImageClick={() => {
                              setMediaTargetLang("vi");
                              setIsMediaPickerOpen(true);
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="seo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 bg-white p-12 rounded-[40px] border border-apple-border">
                      <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase">Meta Title (EN)</label>
                          <input type="text" value={formData.meta_title_en} onChange={(e) => setFormData({ ...formData, meta_title_en: e.target.value })} className="w-full p-4 bg-[#f5f5f7] rounded-xl border-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase">Meta Title (VI)</label>
                          <input type="text" value={formData.meta_title_vi} onChange={(e) => setFormData({ ...formData, meta_title_vi: e.target.value })} className="w-full p-4 bg-[#f5f5f7] rounded-xl border-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase">Meta Description (EN)</label>
                          <textarea rows={4} value={formData.meta_description_en} onChange={(e) => setFormData({ ...formData, meta_description_en: e.target.value })} className="w-full p-4 bg-[#f5f5f7] rounded-xl border-none resize-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase">Meta Description (VI)</label>
                          <textarea rows={4} value={formData.meta_description_vi} onChange={(e) => setFormData({ ...formData, meta_description_vi: e.target.value })} className="w-full p-4 bg-[#f5f5f7] rounded-xl border-none resize-none" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white p-8 rounded-[40px] border border-apple-border space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase text-apple-text-secondary">Post Settings</label>
                    <div className="flex items-center justify-between p-4 bg-[#f5f5f7] rounded-2xl">
                      <span className="font-medium">Published</span>
                      <input 
                        type="checkbox" 
                        checked={formData.is_published}
                        onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase text-apple-text-secondary">Slug</label>
                    <div className="flex items-center gap-2 p-4 bg-[#f5f5f7] rounded-2xl">
                      <Hash className="w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="bg-transparent border-none p-0 focus:ring-0 text-sm font-mono w-full" 
                        placeholder="article-slug"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase text-apple-text-secondary">Featured Image</label>
                    <div 
                      onClick={() => setIsUploadModalOpen(true)} 
                      className="aspect-video bg-[#f5f5f7] rounded-3xl border-2 border-dashed border-apple-border flex items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden relative"
                    >
                      {formData.image_url ? (
                        <img src={formData.image_url} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <ImageIcon className="w-6 h-6 text-gray-300" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Upload Cover</span>
                        </div>
                      )}
                    </div>
                    
                    <MediaPicker 
                      isOpen={isUploadModalOpen}
                      onClose={() => setIsUploadModalOpen(false)}
                      onSelect={(url: string) => setFormData({ ...formData, image_url: url })}
                    />
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-[32px] border border-orange-100">
                  <p className="text-xs text-orange-600 leading-relaxed font-medium">
                    Tip: Use the AI Assistant to generate high-quality drafts based on your topic. You can then refine the content manually.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MediaPicker 
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={handleImageSelect}
      />
    </div>
  );
}
