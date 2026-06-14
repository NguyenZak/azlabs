"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, X, Terminal, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { submitContact } from "@/lib/actions/cms";
import toast from "react-hot-toast";

export default function TechContact({ 
  settings,
  customTitle,
  customSubtitle
}: { 
  settings?: any;
  customTitle?: string;
  customSubtitle?: string;
}) {
  const { dict, language } = useLanguage();
  const rawEmail = settings?.email;
  const email = (!rawEmail || rawEmail === "hello@azlabs.com") ? "azlabs.it@gmail.com" : rawEmail;
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
    <section id="contact" className="py-32 bg-black text-white relative overflow-hidden border-t border-neutral-900">
      {/* Background neon glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Tech Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950/30 px-3 py-1 rounded-full w-fit block font-bold">
                COMMUNICATION GATEWAY
              </span>
              <h2 className="text-[40px] md:text-[64px] font-bold tracking-tight leading-none text-white">
                {customTitle || dict.contact.title}
              </h2>
              <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed max-w-lg">
                {customSubtitle || dict.contact.subtitle}
              </p>
            </div>

            {/* Simulated Server Ping & Endpoint */}
            <div className="bg-neutral-950 border border-neutral-900 p-6 rounded-2xl relative overflow-hidden group max-w-md">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
              
              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 pb-3 border-b border-neutral-900/60 mb-4">
                <span>GATEWAY ENDPOINT</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  ONLINE
                </span>
              </div>

              <div>
                <p className="text-[10px] font-mono text-neutral-600 uppercase">{dict.contact.form.email}</p>
                <a 
                  href={`mailto:${email}`}
                  className="text-lg font-mono font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-2 mt-1"
                >
                  {email}
                  <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                </a>
              </div>
            </div>

            {/* Technical note */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
              <Terminal className="w-4 h-4 text-blue-500" />
              <span>Encrypted via TLS 1.3 / AES-256</span>
            </div>
          </motion.div>

          {/* Right Column: Cyber Form Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-neutral-950/60 border border-neutral-900 p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden"
          >
            {/* Cyber grid overlay */}
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]" />

            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
                  {dict.contact.form.name}
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={dict.contact.form.namePlaceholder}
                  className="w-full bg-neutral-900/50 border border-neutral-900 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all font-mono text-sm text-white"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
                  {dict.contact.form.email}
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={dict.contact.form.emailPlaceholder}
                  className="w-full bg-neutral-900/50 border border-neutral-900 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all font-mono text-sm text-white"
                />
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
                  {dict.contact.form.message}
                </label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={dict.contact.form.messagePlaceholder}
                  rows={4}
                  className="w-full bg-neutral-900/50 border border-neutral-900 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none font-mono text-sm text-white"
                />
              </div>

              {/* Submit Button */}
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-4 text-sm font-mono font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 uppercase tracking-wider shadow-lg shadow-blue-500/10"
              >
                {loading ? (
                  <>
                    <span>{dict.contact.form.sending}</span>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>{dict.contact.form.submit}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>

            </form>
          </motion.div>

        </div>
      </div>

      {/* Dark Success Modal Dialog */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccess(false)}
              className="absolute inset-0 bg-black backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-md bg-neutral-950 border border-neutral-900 rounded-3xl p-10 text-center shadow-2xl z-10"
            >
              <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full border border-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-800 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 bg-emerald-950/40 border border-emerald-500/25 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                {dict.contact.form.successTitle}
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                {dict.contact.form.successMessage}
              </p>

              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-mono text-xs font-bold transition-all uppercase tracking-wider"
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
