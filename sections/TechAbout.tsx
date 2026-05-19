"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ShieldAlert, Award, Shield, CheckCircle, Terminal } from "lucide-react";

export default function TechAbout({ data }: { data: any }) {
  const { dict, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const title = data?.[`title_${language}`] || "Beyond code.<br />We build legacy.";
  const plainTitle = title.replace(/<br\s*\/?>/gi, " ");
  const subtitle = data?.[`subtitle_${language}`] || "Our Philosophy";
  const description = data?.[`description_${language}`] || "AZLABS is a technology-driven digital studio focused on creating world-class digital products and premium user experiences. We believe that technology should be as beautiful as it is functional.";
  const quote = data?.[`quote_${language}`] || "Precision is not an act, it's a habit.";
  const image = data?.image_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2601&auto=format&fit=crop";
  const stats = data?.stats && data.stats.length > 0 
    ? data.stats 
    : [
        { value: "50+", label_en: "Systems Deployed", label_vi: "Hệ thống vận hành" },
        { value: "12", label_en: "SLA Audits Passed", label_vi: "Đợt kiểm toán SLA" }
      ];

  return (
    <section id="about" className="py-32 bg-black text-white relative overflow-hidden border-t border-neutral-900">
      {/* Background blur rings */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Philosophy Description */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950/30 px-3 py-1 rounded-full w-fit block font-bold">
                {subtitle}
              </span>
              <h2 className="text-[40px] md:text-[60px] font-bold tracking-tight leading-none text-white">
                {plainTitle}
              </h2>
              <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed max-w-xl">
                {description}
              </p>
            </div>

            {/* Performance Stats dashboard panels */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-900">
              {stats.map((stat: any, index: number) => (
                <div key={index} className="bg-neutral-950 border border-neutral-900 p-5 rounded-2xl relative overflow-hidden group">
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="text-3xl md:text-4xl font-mono font-bold text-white block">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block mt-1 tracking-wider">
                    {language === "vi" ? stat.label_vi : stat.label_en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive System Board Graphic */}
          <div className="lg:col-span-6 bg-neutral-950/60 border border-neutral-900 rounded-[32px] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
            
            {/* Hologram/Glass image header */}
            <div className="relative rounded-2xl overflow-hidden aspect-video border border-neutral-900 group">
              <img 
                src={image} 
                alt="AZLABS System Engineering" 
                className="w-full h-full object-cover opacity-70 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-500" />
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Azlabs Engineering Laboratory</span>
              </div>
            </div>

            {/* Quote certificate panel */}
            <div className="bg-neutral-900/40 p-6 rounded-2xl border border-neutral-900 mt-6 relative overflow-hidden">
              {/* Vertical neon stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500" />
              <p className="text-neutral-300 font-light text-sm italic leading-relaxed pl-3">
                "{quote}"
              </p>
              <div className="flex justify-between items-center mt-4 pl-3">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">— AZLABS Core Mission Statement</span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-950/20 border border-blue-500/20 text-blue-400 font-bold uppercase">
                  VERIFIED
                </span>
              </div>
            </div>

            {/* Certification / Trust Logos list */}
            <div className="grid grid-cols-3 gap-3 mt-6 text-center font-mono text-[9px] text-neutral-500">
              <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-xl flex flex-col items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold text-white uppercase">ISO-27001</span>
                <span>SECURED</span>
              </div>
              <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-xl flex flex-col items-center justify-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-bold text-white uppercase">SLA 99.9%</span>
                <span>COMPLIANT</span>
              </div>
              <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-xl flex flex-col items-center justify-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span className="font-bold text-white uppercase">SOC 2 TYPE II</span>
                <span>VERIFIED</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
