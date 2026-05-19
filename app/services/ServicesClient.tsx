"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  BrainCircuit, 
  Palette, 
  Database, 
  Cloud,
  CheckCircle2,
  ArrowRight,
  Terminal
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Link from "next/link";
import { AppleIcon } from "@/components/AppleIcon";

const icons: any = {
  web: Globe,
  mobile: Smartphone,
  ai: BrainCircuit,
  design: Palette,
  saas: Database,
  cloud: Cloud,
};

export default function ServicesClient({ data, settings }: { data: any[], settings?: any }) {
  const { dict, language } = useLanguage();

  const finalServices = data.length > 0 
    ? data.map(item => ({
        id: item.id,
        title: language === "vi" ? item.title_vi : item.title_en,
        details: language === "vi" ? item.description_vi : item.description_en,
        features: (language === "vi" ? item.features_vi : item.features_en) || [],
        icon: icons[item.id] || icons.web, // Fallback
        image_url: item.image_url
      }))
    : dict.services.items.map((item: any) => ({
        ...item,
        icon: icons[item.id] || icons.web
      }));

  const isTechTemplate = settings?.homepage_template === "tech";

  if (isTechTemplate) {
    return (
      <div className="min-h-screen bg-black text-white pt-[100px] pb-20">
        {/* Page Header */}
        <section className="px-6 md:px-12 max-w-[1440px] mx-auto mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-blue-400 font-mono font-bold tracking-widest uppercase text-xs mb-6 bg-blue-950/30 px-3 py-1 rounded-full"
          >
            [{dict.nav.services}]
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[48px] md:text-[72px] font-bold tracking-tight text-white mb-8 uppercase"
          >
            {dict.services.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 font-light text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            {dict.services.subtitle}
          </motion.p>
        </section>

        {/* Services Detailed List */}
        <section className="px-6 md:px-12 max-w-[1440px] mx-auto space-y-12">
          {finalServices.map((service: any, index: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-12 p-8 md:p-12 bg-neutral-950/60 border border-neutral-900 rounded-[32px] overflow-hidden group hover:border-neutral-800 transition-all duration-300`}
            >
              {/* Visual Part */}
              <div className="w-full lg:w-1/2 aspect-video rounded-2xl bg-neutral-950 border border-neutral-900 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
                {service.image_url ? (
                  <img src={service.image_url} alt={service.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-95 transition-opacity duration-300" />
                ) : (
                  <div className="relative z-10 text-blue-500 transform group-hover:scale-105 transition-transform duration-500 flex flex-col items-center gap-3">
                     <AppleIcon icon={service.icon} size={48} />
                     <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Active System Module</span>
                  </div>
                )}
                {/* Scanner sweep line */}
                <div className="absolute inset-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -top-1 group-hover:animate-sweep pointer-events-none" />
              </div>

              {/* Content Part */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-blue-500" />
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider font-bold">SYSTEM INTEGRATION NODE // 0{index + 1}</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-white uppercase">
                    {service.title}
                  </h2>
                  <div 
                    className="text-neutral-400 font-light text-sm leading-relaxed mb-6 prose prose-invert"
                    dangerouslySetInnerHTML={{ __html: service.details }}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-900/60">
                    {service.features.map((feature: string) => (
                      <div key={feature} className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl text-xs font-mono font-bold transition-all uppercase tracking-wider"
                  >
                    {dict.nav.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA Bottom Section */}
        <section className="mt-32 px-6 md:px-12 max-w-[1440px] mx-auto text-center">
          <div className="bg-neutral-950 border border-neutral-900 rounded-[48px] p-12 md:p-24 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase">
                {dict.magazine.ctaTitle}
              </h2>
              <p className="text-neutral-400 font-light text-lg max-w-2xl mx-auto leading-relaxed">
                {dict.magazine.ctaSubtitle}
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-sm font-mono font-bold transition-all uppercase tracking-wider shadow-lg shadow-blue-500/10"
              >
                {dict.nav.cta}
              </Link>
            </div>
          </div>
        </section>

        <style jsx global>{`
          @keyframes sweep {
            0% { top: 0%; }
            100% { top: 100%; }
          }
          .group:hover .group-hover\\:animate-sweep {
            animation: sweep 1.5s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-apple-bg pt-[100px] pb-20">
      {/* Page Header */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto mb-20 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="inline-block text-apple-accent font-bold tracking-[0.2em] uppercase text-sm mb-6"
        >
          {dict.nav.services}
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="text-[48px] md:text-[72px] font-bold text-apple-text mb-8 leading-tight tracking-tight"
        >
          {dict.services.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          className="text-apple-text-secondary text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
        >
          {dict.services.subtitle}
        </motion.p>
      </section>

      {/* Services Detailed List */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto space-y-12">
        {finalServices.map((service: any, index: number) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 p-8 md:p-16 bg-apple-bg-secondary rounded-[48px] overflow-hidden group border border-transparent hover:border-apple-accent/20 transition-all duration-700`}
          >
            {/* Visual Part */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-video rounded-[32px] bg-white shadow-xl flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-apple-accent/5 to-transparent" />
              {service.image_url ? (
                <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
              ) : (
                <div className="relative z-10 text-apple-accent transform group-hover:scale-110 transition-transform duration-700">
                   <AppleIcon icon={service.icon} size={48} />
                 </div>
              )}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-apple-accent/5 rounded-full" />
            </div>

            {/* Content Part */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-apple-text mb-6">
                {service.title}
              </h2>
              <div 
                className="text-apple-text-secondary text-lg mb-8 leading-relaxed rich-text-content"
                dangerouslySetInnerHTML={{ __html: service.details }}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {service.features.map((feature: string) => (
                  <div key={feature} className="flex items-center gap-3 text-apple-text/80">
                    <CheckCircle2 className="w-5 h-5 text-apple-accent shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-apple-text text-white px-8 py-4 rounded-full font-medium hover:bg-apple-accent transition-all hover:scale-105 active:scale-95"
              >
                {dict.nav.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA Bottom Section */}
      <section className="mt-32 px-6 md:px-12 max-w-[1440px] mx-auto text-center">
        <div className="bg-apple-text text-white rounded-[48px] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] bg-repeat" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              {dict.magazine.ctaTitle}
            </h2>
            <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">
              {dict.magazine.ctaSubtitle}
            </p>
            <Link
              href="#contact"
              className="inline-block bg-apple-accent text-white px-10 py-5 rounded-full text-xl font-medium hover:bg-apple-accent-hover transition-all hover:scale-105"
            >
              {dict.nav.cta}
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .rich-text-content p {
          margin-bottom: 1rem;
        }
        .rich-text-content p:last-child {
          margin-bottom: 0;
        }
        .rich-text-content strong {
          color: #1d1d1f;
          font-weight: 600;
        }
        .rich-text-content h2, .rich-text-content h3 {
          font-weight: 700;
          color: #1d1d1f;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
      `}</style>
    </div>
  );
}
