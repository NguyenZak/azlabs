"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Award, Zap, Activity, Check, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Feature {
  id: string;
  title_en: string;
  title_vi: string;
  description_en: string;
  description_vi: string;
  image_url: string;
  order_index: number;
}

export default function TechFeatures({ data = [] }: { data: Feature[] }) {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    if (data && data.length > 0) {
      setSelectedId(data[0].id);
    }
  }, [data]);

  if (!data || data.length === 0 || !mounted) return null;

  const currentFeature = data.find((f) => f.id === selectedId) || data[0];
  const featureTitle = language === "vi" ? currentFeature.title_vi : currentFeature.title_en;
  const featureDesc = language === "vi" ? currentFeature.description_vi : currentFeature.description_en;

  // Mock technical specifications to render visual comparison charts
  const featureMetrics: Record<string, { speed: number; security: number; ai: number; load: number }> = {
    default: { speed: 99, security: 100, ai: 95, load: 88 }
  };

  const getMetricsForId = (id: string) => {
    // Return different dummy metrics based on feature id string hash to simulate live changes
    const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      speed: 80 + (hash % 20),
      security: 85 + (hash % 16),
      ai: 75 + (hash % 26),
      load: 90 + (hash % 10)
    };
  };

  const activeMetrics = getMetricsForId(currentFeature.id);

  return (
    <section id="features" className="py-32 bg-black text-white relative overflow-hidden border-t border-neutral-900">
      {/* Background neon mesh */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl text-left mb-20 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950/30 px-3 py-1 rounded-full w-fit block font-bold">
            Innovation Pillars
          </span>
          <h2 className="text-[40px] md:text-[60px] font-bold tracking-tight leading-none text-white">
            {language === "vi" ? "Tính Năng Ưu Việt" : "Product Benchmarks"}
          </h2>
          <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed max-w-xl">
            {language === "vi"
              ? "So sánh và đánh giá các tiêu chuẩn chất lượng hệ thống phần mềm do chúng tôi phát triển."
              : "Compare and verify the high-performance core parameters of our developed business software engines."}
          </p>
        </div>

        {/* Layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Feature Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">PILLAR CATEGORIES</span>
            {data.map((feat, index) => {
              const isSelected = selectedId === feat.id;
              const titleText = language === "vi" ? feat.title_vi : feat.title_en;
              return (
                <button
                  key={feat.id}
                  onClick={() => setSelectedId(feat.id)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    isSelected
                      ? "bg-neutral-900 border-neutral-700 shadow-xl"
                      : "bg-neutral-950 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/30"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isSelected ? "bg-blue-600 text-white" : "bg-neutral-900 text-neutral-500"
                  }`}>
                    {isSelected ? <Check className="w-4 h-4" /> : <span className="text-xs font-mono font-bold">0{index + 1}</span>}
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-white block">{titleText}</span>
                    <span className="text-xs text-neutral-500 line-clamp-1">
                      {language === "vi" ? feat.description_vi.replace(/<[^>]*>/g, "") : feat.description_en.replace(/<[^>]*>/g, "")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Comparative Dashboard Graphic */}
          <div className="lg:col-span-7 bg-neutral-950/60 border border-neutral-900 rounded-[32px] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            
            {/* Corner blur decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6">
              {/* Feature Title and Rich Text */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">DETAILED VERIFICATION</span>
                <h3 className="text-2xl font-bold tracking-tight text-white">{featureTitle}</h3>
              </div>

              {/* Render HTML description safely */}
              <div 
                className="text-neutral-400 font-light text-sm leading-relaxed prose prose-invert prose-sm"
                dangerouslySetInnerHTML={{ __html: featureDesc }}
              />
            </div>

            {/* Performance charts section */}
            <div className="mt-8 pt-8 border-t border-neutral-900/60 space-y-4">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block font-bold">OPERATIONAL PARAMETERS</span>
              
              <div className="space-y-3">
                {/* Bar 1: Core speed */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-neutral-400">PAGESPEED PERFORMANCE INDEX</span>
                    <span className="text-white font-bold">{activeMetrics.speed}/100</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${activeMetrics.speed}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="bg-blue-500 h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Bar 2: Security */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-neutral-400">THREAT PROTECTION SHIELD</span>
                    <span className="text-white font-bold">{activeMetrics.security}% SECURE</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${activeMetrics.security}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="bg-indigo-500 h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Bar 3: Scalability */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-neutral-400">AI COGNITIVE CAPACITY</span>
                    <span className="text-white font-bold">{activeMetrics.ai}% LOADABLE</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${activeMetrics.ai}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="bg-emerald-500 h-full rounded-full"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
