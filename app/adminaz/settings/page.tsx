"use client";

import React, { useState, useEffect } from "react";
import { 
  Save, 
  Loader2, 
  Image as ImageIcon, 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Image, 
  Link as LinkIcon, 
  Code,
  Send,
  Clock
} from "lucide-react";
import MediaPicker from "@/components/admin/MediaPicker";
import { getSiteSettings, upsertSiteSettings } from "@/lib/actions/cms";
import { toast } from "react-hot-toast";

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isFaviconModalOpen, setIsFaviconModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    site_name: "AZLABS",
    logo_url: "",
    favicon_url: "",
    phone: "",
    email: "",
    address_en: "",
    address_vi: "",
    working_hours_en: "",
    working_hours_vi: "",
    facebook_url: "",
    instagram_url: "",
    linkedin_url: "",
    twitter_url: "",
    github_url: "",
    copyright_en: "",
    copyright_vi: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getSiteSettings();
      if (data) {
        // Sanitize null values to empty strings for controlled inputs
        const sanitizedData = Object.keys(data).reduce((acc: any, key) => {
          acc[key] = data[key] === null ? "" : data[key];
          return acc;
        }, {});
        setFormData(sanitizedData);
      }
    } catch (error) {
      toast.error("Failed to fetch settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await upsertSiteSettings(formData);
      toast.success("Settings updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update settings");
    } finally {
      setIsSaving(false);
    }
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
          <h1 className="text-4xl font-bold tracking-tight text-apple-text">Site Settings</h1>
          <p className="text-apple-text-secondary mt-2 text-lg">Manage global configurations, branding, and contact info.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-apple-accent transition-all disabled:opacity-50 shadow-xl"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Branding & Contact */}
        <div className="space-y-12">
          {/* Branding Section */}
          <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
            <div className="flex items-center gap-3 text-apple-accent">
              <Globe className="w-5 h-5" />
              <h2 className="font-bold uppercase tracking-widest text-sm">Branding</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1">Site Name</label>
                <input
                  type="text"
                  value={formData.site_name}
                  onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1">Logo</label>
                  <div 
                    onClick={() => setIsLogoModalOpen(true)}
                    className="aspect-video bg-apple-bg rounded-2xl border border-apple-border flex items-center justify-center cursor-pointer overflow-hidden group relative"
                  >
                    {formData.logo_url ? (
                      <img src={formData.logo_url} alt="Logo" className="max-h-full object-contain" />
                    ) : (
                      <ImageIcon className="w-8 h-8 opacity-20" />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-bold text-xs">Change Logo</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1">Favicon</label>
                  <div 
                    onClick={() => setIsFaviconModalOpen(true)}
                    className="aspect-square w-20 h-20 bg-apple-bg rounded-2xl border border-apple-border flex items-center justify-center cursor-pointer overflow-hidden group relative"
                  >
                    {formData.favicon_url ? (
                      <img src={formData.favicon_url} alt="Favicon" className="w-full h-full object-contain" />
                    ) : (
                      <ImageIcon className="w-6 h-6 opacity-20" />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-bold text-[10px]">Change</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
            <div className="flex items-center gap-3 text-apple-accent">
              <Phone className="w-5 h-5" />
              <h2 className="font-bold uppercase tracking-widest text-sm">Contact Information</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1 flex items-center gap-2">
                    <Phone className="w-3 h-3" /> Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1 flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Address (English)
                </label>
                <input
                  type="text"
                  value={formData.address_en}
                  onChange={(e) => setFormData({ ...formData, address_en: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Địa chỉ (Tiếng Việt)
                </label>
                <input
                  type="text"
                  value={formData.address_vi}
                  onChange={(e) => setFormData({ ...formData, address_vi: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Hours (EN)
                  </label>
                  <input
                    type="text"
                    value={formData.working_hours_en}
                    onChange={(e) => setFormData({ ...formData, working_hours_en: e.target.value })}
                    placeholder="Mon-Fri, 9AM-6PM"
                    className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Giờ làm việc (VI)
                  </label>
                  <input
                    type="text"
                    value={formData.working_hours_vi}
                    onChange={(e) => setFormData({ ...formData, working_hours_vi: e.target.value })}
                    className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Socials & Global */}
        <div className="space-y-12">
          {/* Social Links */}
          <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
            <div className="flex items-center gap-3 text-apple-accent">
              <MessageCircle className="w-5 h-5" />
              <h2 className="font-bold uppercase tracking-widest text-sm">Social Presence</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1 flex items-center gap-2">
                  <MessageCircle className="w-3 h-3" /> Facebook URL
                </label>
                <input
                  type="url"
                  value={formData.facebook_url}
                  onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1 flex items-center gap-2">
                  <Image className="w-3 h-3" /> Instagram URL
                </label>
                <input
                  type="url"
                  value={formData.instagram_url}
                  onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1 flex items-center gap-2">
                  <LinkIcon className="w-3 h-3" /> LinkedIn URL
                </label>
                <input
                  type="url"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1 flex items-center gap-2">
                  <Send className="w-3 h-3" /> Twitter/X URL
                </label>
                <input
                  type="url"
                  value={formData.twitter_url}
                  onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1 flex items-center gap-2">
                  <Code className="w-3 h-3" /> GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Global / Footer */}
          <div className="bg-white p-10 rounded-[40px] border border-apple-border shadow-sm space-y-8">
            <div className="flex items-center gap-3 text-apple-accent">
              <MapPin className="w-5 h-5" />
              <h2 className="font-bold uppercase tracking-widest text-sm">Footer Content</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1">Copyright (English)</label>
                <input
                  type="text"
                  value={formData.copyright_en}
                  onChange={(e) => setFormData({ ...formData, copyright_en: e.target.value })}
                  placeholder="© 2026 AZLABS. All rights reserved."
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-apple-text-secondary px-1">Bản quyền (Tiếng Việt)</label>
                <input
                  type="text"
                  value={formData.copyright_vi}
                  onChange={(e) => setFormData({ ...formData, copyright_vi: e.target.value })}
                  className="w-full bg-apple-bg px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-apple-accent transition-all font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <MediaPicker
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        onSelect={(url: string) => {
          setFormData({ ...formData, logo_url: url });
          setIsLogoModalOpen(false);
        }}
      />

      <MediaPicker
        isOpen={isFaviconModalOpen}
        onClose={() => setIsFaviconModalOpen(false)}
        onSelect={(url: string) => {
          setFormData({ ...formData, favicon_url: url });
          setIsFaviconModalOpen(false);
        }}
      />
    </div>
  );
}
