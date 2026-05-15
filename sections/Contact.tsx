"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { submitContact } from "@/lib/actions/cms";
import toast from "react-hot-toast";

export default function Contact({ settings }: { settings?: any }) {
  const { dict } = useLanguage();
  const email = settings?.email || "hello@azlabs.com";
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(dict.contact.form.errorRequired);
      return;
    }

    setLoading(true);
    try {
      await submitContact(formData);
      setShowSuccess(true);
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      toast.error(dict.contact.form.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-spacing bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Column: Text & Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[48px] md:text-[72px] leading-[1.1] font-bold text-apple-text mb-8 tracking-tight">
              {dict.contact.title}
            </h2>
            <p className="text-apple-text-secondary text-xl md:text-2xl leading-relaxed mb-12 max-w-lg">
              {dict.contact.subtitle}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-apple-bg-secondary flex items-center justify-center text-apple-accent group-hover:bg-apple-accent group-hover:text-white transition-all duration-300">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-apple-text-secondary uppercase tracking-widest">{dict.contact.form.email}</p>
                  <p className="text-xl font-bold text-apple-text">{email}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-apple-bg-secondary p-8 md:p-16 rounded-[48px] border border-apple-border shadow-sm"
          >
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-apple-text-secondary uppercase tracking-widest ml-4">
                  {dict.contact.form.name}
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={dict.contact.form.namePlaceholder}
                  className="w-full bg-white border border-apple-border rounded-full px-8 py-5 focus:outline-none focus:ring-2 focus:ring-apple-accent/20 focus:border-apple-accent transition-all text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-apple-text-secondary uppercase tracking-widest ml-4">
                  {dict.contact.form.email}
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={dict.contact.form.emailPlaceholder}
                  className="w-full bg-white border border-apple-border rounded-full px-8 py-5 focus:outline-none focus:ring-2 focus:ring-apple-accent/20 focus:border-apple-accent transition-all text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-apple-text-secondary uppercase tracking-widest ml-4">
                  {dict.contact.form.message}
                </label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={dict.contact.form.messagePlaceholder}
                  rows={4}
                  className="w-full bg-white border border-apple-border rounded-[32px] px-8 py-6 focus:outline-none focus:ring-2 focus:ring-apple-accent/20 focus:border-apple-accent transition-all resize-none text-lg"
                />
              </div>

              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full bg-apple-text text-white rounded-full py-6 text-xl font-bold flex items-center justify-center gap-3 hover:bg-apple-accent transition-all shadow-xl hover:shadow-apple-accent/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    {dict.contact.form.sending}
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    {dict.contact.form.submit}
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Alert Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccess(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-lg bg-white rounded-[48px] p-12 text-center shadow-2xl"
            >
              <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-8 right-8 p-2 hover:bg-[#f5f5f7] rounded-full transition-all"
              >
                <X className="w-6 h-6 text-apple-text-secondary" />
              </button>

              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>

              <h2 className="text-3xl font-bold text-apple-text mb-4 tracking-tight">
                {dict.contact.form.successTitle}
              </h2>
              <p className="text-apple-text-secondary text-lg leading-relaxed mb-10">
                {dict.contact.form.successMessage}
              </p>

              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full py-5 bg-black text-white rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-xl"
              >
                {dict.contact.form.close}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
