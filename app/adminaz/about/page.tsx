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
  Quote,
  Languages,
  Sparkles,
  ExternalLink
} from "lucide-react";
import LanguageTabs from "@/components/admin/LanguageTabs";
import MediaPicker from "@/components/admin/MediaPicker";
import { 
  getAboutContent, 
  upsertAboutContent, 
  getTeamMembers, 
  upsertTeamMember, 
  deleteTeamMember,
  generateAISamples
} from "@/lib/actions/cms";
import { toast } from "react-hot-toast";

export default function AdminAboutPage() {
  const [activeTab, setActiveTab] = useState("content");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [currentMediaField, setCurrentMediaField] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<"vi" | "en">("vi");
  
  const [formData, setFormData] = useState<any>({
    title_en: "", title_vi: "",
    subtitle_en: "", subtitle_vi: "",
    description_en: "", description_vi: "",
    quote_en: "", quote_vi: "",
    story_title_en: "", story_title_vi: "",
    story_content_en: "", story_content_vi: "",
    mission_title_en: "", mission_title_vi: "",
    mission_content_en: "", mission_content_vi: "",
    values: [],
    image_url: "",
    stats: []
  });

  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [editingMember, setEditingMember] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [about, team] = await Promise.all([
        getAboutContent(),
        getTeamMembers()
      ]);
      
      if (about) {
        setFormData({
          ...about,
          stats: about.stats || []
        });
      }
      setTeamMembers(team);
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

  const handleSaveMember = async () => {
    if (!editingMember.name) return;
    setIsSaving(true);
    try {
      await upsertTeamMember(editingMember);
      setEditingMember(null);
      await fetchData();
      toast.success("Team member saved");
    } catch (error) {
      toast.error("Failed to save team member");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteTeamMember(id);
      await fetchData();
      toast.success("Member deleted");
    } catch (error) {
      toast.error("Failed to delete member");
    }
  };

  const handleSeedTeam = async () => {
    setIsSaving(true);
    const toastId = toast.loading("AI is gathering our dream team...");
    try {
      const samples = await generateAISamples("team_member");
      for (const sample of samples) {
        await upsertTeamMember(sample);
      }
      toast.success("Successfully seeded AI team members!", { id: toastId });
      await fetchData();
    } catch (error) {
      toast.error("Failed to generate AI samples", { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  const addValue = () => {
    setFormData({
      ...formData,
      values: [...(formData.values || []), { title_en: "", title_vi: "", description_en: "", description_vi: "" }]
    });
  };

  const removeValue = (index: number) => {
    const newValues = [...formData.values];
    newValues.splice(index, 1);
    setFormData({ ...formData, values: newValues });
  };

  const updateValue = (index: number, field: string, value: string) => {
    const newValues = [...formData.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setFormData({ ...formData, values: newValues });
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
          <h1 className="text-4xl font-bold tracking-tight text-apple-text">About & Team</h1>
          <p className="text-apple-text-secondary mt-2 text-lg">Manage company philosophy, mission, and team members.</p>
        </div>
        <div className="flex gap-4">
          <a 
            href="/#about"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white border border-apple-border px-6 py-4 rounded-full font-bold hover:bg-apple-bg transition-all shadow-sm text-blue-500"
            title="View on site"
          >
            <ExternalLink className="w-5 h-5" />
            View Site
          </a>
          <button
            onClick={() => {
              setEditingMember({ name: "", role_en: "", role_vi: "", image: "", order_index: teamMembers.length });
            }}
            className="flex items-center gap-2 bg-white border border-apple-border px-6 py-4 rounded-full font-bold hover:bg-apple-bg transition-all shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Add Member
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-apple-accent transition-all disabled:opacity-50 shadow-xl"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-apple-border">
        {["content", "story", "values", "team"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
              activeTab === tab ? "text-apple-accent" : "text-apple-text-secondary hover:text-apple-text"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-apple-accent" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-12">
        {activeTab === "content" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-12">
              <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
                <h2 className="font-bold uppercase tracking-widest text-sm text-apple-accent">Philosophy Headlines</h2>
                <div className="space-y-6">
                  <LanguageTabs activeLang={activeLang} onChange={setActiveLang} />

                  <div className="grid grid-cols-1 gap-4">
                    {activeLang === "vi" ? (
                      <>
                        <input
                          type="text"
                          placeholder="Phụ đề (VI)"
                          value={formData.subtitle_vi}
                          onChange={(e) => setFormData({ ...formData, subtitle_vi: e.target.value })}
                          className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none"
                        />
                        <input
                          type="text"
                          placeholder="Tiêu đề (VI)"
                          value={formData.title_vi}
                          onChange={(e) => setFormData({ ...formData, title_vi: e.target.value })}
                          className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none"
                        />
                        <textarea
                          placeholder="Mô tả (VI)"
                          value={formData.description_vi}
                          onChange={(e) => setFormData({ ...formData, description_vi: e.target.value })}
                          className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none h-32"
                        />
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          placeholder="Subtitle (EN)"
                          value={formData.subtitle_en}
                          onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value })}
                          className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none"
                        />
                        <input
                          type="text"
                          placeholder="Title (EN)"
                          value={formData.title_en}
                          onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                          className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none"
                        />
                        <textarea
                          placeholder="Description (EN)"
                          value={formData.description_en}
                          onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                          className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none h-32"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
                <h2 className="font-bold uppercase tracking-widest text-sm text-apple-accent">Statistics</h2>
                <div className="space-y-4">
                  {formData.stats.map((stat: any, i: number) => (
                    <div key={i} className="flex gap-4 items-center">
                      <input type="text" value={stat.value} onChange={(e) => updateStat(i, "value", e.target.value)} className="w-20 bg-apple-bg p-3 rounded-xl" />
                      <input type="text" value={stat.label_en} onChange={(e) => updateStat(i, "label_en", e.target.value)} className="flex-1 bg-apple-bg p-3 rounded-xl" />
                      <button onClick={() => removeStat(i)}><Trash2 className="w-4 h-4 text-red-500" /></button>
                    </div>
                  ))}
                  <button onClick={addStat} className="text-apple-accent text-sm font-bold">+ Add Stat</button>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
              <h2 className="font-bold uppercase tracking-widest text-sm text-apple-accent">Main Image</h2>
              <div 
                className="aspect-[4/3] rounded-3xl bg-apple-bg overflow-hidden cursor-pointer relative group"
                onClick={() => {
                  setCurrentMediaField("image_url");
                  setIsMediaModalOpen(true);
                }}
              >
                {formData.image_url ? <img src={formData.image_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">Select Image</div>}
              </div>
            </div>
          </div>
        )}

        {activeTab === "story" && (
          <div className="space-y-8">
            <LanguageTabs activeLang={activeLang} onChange={setActiveLang} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
                <h2 className="font-bold uppercase tracking-widest text-sm text-apple-accent">Our Story</h2>
                {activeLang === "vi" ? (
                  <>
                    <input
                      type="text"
                      placeholder="Tiêu đề câu chuyện (VI)"
                      value={formData.story_title_vi}
                      onChange={(e) => setFormData({ ...formData, story_title_vi: e.target.value })}
                      className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none"
                    />
                    <textarea
                      placeholder="Nội dung câu chuyện (VI)"
                      value={formData.story_content_vi}
                      onChange={(e) => setFormData({ ...formData, story_content_vi: e.target.value })}
                      className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none h-64"
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Story Title (EN)"
                      value={formData.story_title_en}
                      onChange={(e) => setFormData({ ...formData, story_title_en: e.target.value })}
                      className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none"
                    />
                    <textarea
                      placeholder="Story Content (EN)"
                      value={formData.story_content_en}
                      onChange={(e) => setFormData({ ...formData, story_content_en: e.target.value })}
                      className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none h-64"
                    />
                  </>
                )}
              </div>
              <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
                <h2 className="font-bold uppercase tracking-widest text-sm text-apple-accent">Our Mission</h2>
                {activeLang === "vi" ? (
                  <>
                    <input
                      type="text"
                      placeholder="Tiêu đề sứ mệnh (VI)"
                      value={formData.mission_title_vi}
                      onChange={(e) => setFormData({ ...formData, mission_title_vi: e.target.value })}
                      className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none"
                    />
                    <textarea
                      placeholder="Nội dung sứ mệnh (VI)"
                      value={formData.mission_content_vi}
                      onChange={(e) => setFormData({ ...formData, mission_content_vi: e.target.value })}
                      className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none h-64"
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Mission Title (EN)"
                      value={formData.mission_title_en}
                      onChange={(e) => setFormData({ ...formData, mission_title_en: e.target.value })}
                      className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none"
                    />
                    <textarea
                      placeholder="Mission Content (EN)"
                      value={formData.mission_content_en}
                      onChange={(e) => setFormData({ ...formData, mission_content_en: e.target.value })}
                      className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none h-64"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "values" && (
          <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="font-bold uppercase tracking-widest text-sm text-apple-accent">Core Values</h2>
              <button onClick={addValue} className="text-apple-accent font-bold text-sm">+ Add Value</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(formData.values || []).map((val: any, i: number) => (
                <div key={i} className="p-6 bg-apple-bg rounded-3xl space-y-4 relative group">
                  <button onClick={() => removeValue(i)} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                  <input type="text" placeholder="Title (EN)" value={val.title_en} onChange={(e) => updateValue(i, "title_en", e.target.value)} className="w-full bg-white p-3 rounded-xl border border-apple-border" />
                  <textarea placeholder="Description (EN)" value={val.description_en} onChange={(e) => updateValue(i, "description_en", e.target.value)} className="w-full bg-white p-3 rounded-xl border border-apple-border h-24" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="space-y-8">
            <div className="flex justify-end">
              <button
                onClick={handleSeedTeam}
                disabled={isSaving}
                className="flex items-center gap-2 bg-white border border-apple-accent text-apple-accent px-6 py-3 rounded-full font-bold hover:bg-apple-accent hover:text-white transition-all shadow-sm text-sm"
              >
                <Sparkles className="w-4 h-4" />
                Seed Team
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white p-6 rounded-[32px] border border-apple-border shadow-sm group">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-apple-bg relative">
                  <img src={member.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                    <a 
                      href="/#about"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-2 rounded-full text-blue-500 hover:text-blue-700"
                      title="View on site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button onClick={() => setEditingMember(member)} className="bg-white p-2 rounded-full"><Save className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteMember(member.id)} className="bg-white p-2 rounded-full text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-apple-text-secondary text-sm">{member.role_en}</p>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>

      {/* Member Edit Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] p-10 w-full max-w-lg space-y-6">
            <h2 className="text-2xl font-bold">Edit Member</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={editingMember.name}
                onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none"
              />
              <input
                type="text"
                placeholder="Role (EN)"
                value={editingMember.role_en}
                onChange={(e) => setEditingMember({ ...editingMember, role_en: e.target.value })}
                className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none"
              />
              <div 
                className="h-32 rounded-2xl bg-apple-bg flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={() => {
                  setCurrentMediaField("member_image");
                  setIsMediaModalOpen(true);
                }}
              >
                {editingMember.image ? <img src={editingMember.image} className="w-full h-full object-cover" /> : "Select Avatar"}
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setEditingMember(null)} className="flex-1 py-4 font-bold border border-apple-border rounded-full">Cancel</button>
              <button onClick={handleSaveMember} className="flex-1 py-4 font-bold bg-black text-white rounded-full">Save</button>
            </div>
          </div>
        </div>
      )}

      <MediaPicker
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(url: string) => {
          if (currentMediaField === "image_url") {
            setFormData({ ...formData, image_url: url });
          } else if (currentMediaField === "member_image") {
            setEditingMember({ ...editingMember, image: url });
          }
          setIsMediaModalOpen(false);
        }}
      />
    </div>
  );
}
