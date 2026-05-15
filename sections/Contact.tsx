"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Contact() {
  const { dict } = useLanguage();

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
                  <p className="text-sm font-bold text-apple-text-secondary uppercase tracking-widest">Email us</p>
                  <p className="text-xl font-bold text-apple-text">hello@azlabs.com</p>
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
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-apple-text-secondary uppercase tracking-widest ml-4">
                  {dict.contact.form.name}
                </label>
                <input 
                  type="text" 
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
                  placeholder={dict.contact.form.emailPlaceholder}
                  className="w-full bg-white border border-apple-border rounded-full px-8 py-5 focus:outline-none focus:ring-2 focus:ring-apple-accent/20 focus:border-apple-accent transition-all text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-apple-text-secondary uppercase tracking-widest ml-4">
                  {dict.contact.form.message}
                </label>
                <textarea 
                  placeholder={dict.contact.form.messagePlaceholder}
                  rows={4}
                  className="w-full bg-white border border-apple-border rounded-[32px] px-8 py-6 focus:outline-none focus:ring-2 focus:ring-apple-accent/20 focus:border-apple-accent transition-all resize-none text-lg"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-apple-text text-white rounded-full py-6 text-xl font-bold flex items-center justify-center gap-3 hover:bg-apple-accent transition-all shadow-xl hover:shadow-apple-accent/20"
              >
                {dict.contact.form.submit}
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
