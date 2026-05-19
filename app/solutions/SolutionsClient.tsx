"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Terminal, CheckCircle2, ArrowRight, Shield, Layers, HelpCircle, Activity } from "lucide-react";

export default function SolutionsClient({ data, settings }: { data: any[], settings?: any }) {
  const { dict, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const defaultImages = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2664&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  ];

  const finalSolutions = data.length > 0 
    ? data.map((item, index) => ({
        id: item.id,
        title: language === "vi" ? item.title_vi : item.title_en,
        category: dict.solutions.category,
        description: language === "vi" ? item.description_vi : item.description_en,
        features: (language === "vi" ? item.features_vi : item.features_en) || [],
        image: item.image_url || defaultImages[index % defaultImages.length],
      }))
    : dict.solutions.items.map((item, index) => ({
        ...item,
        category: dict.solutions.category,
        image: defaultImages[index % defaultImages.length],
      }));

  const isTechTemplate = settings?.homepage_template === "tech";

  if (isTechTemplate) {
    return (
      <div className="min-h-screen bg-black text-white pt-[100px] pb-20">
        {/* Page Header */}
        <section className="px-6 md:px-12 max-w-[1440px] mx-auto mb-20">
          <div className="max-w-4xl space-y-4">
            <span className="inline-block text-blue-400 font-mono font-bold tracking-widest uppercase text-xs bg-blue-950/30 px-3 py-1 rounded-full">
              [{dict.solutions.category}]
            </span>
            <h1 className="text-[56px] md:text-[80px] font-bold tracking-tight text-white uppercase leading-none">
              {dict.solutions.title}
            </h1>
            <p className="text-neutral-400 font-light text-xl md:text-2xl leading-relaxed max-w-2xl">
              {dict.solutions.subtitle}
            </p>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="px-6 md:px-12 max-w-[1440px] mx-auto space-y-12">
          {finalSolutions.map((solution: any, index: number) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-neutral-950 border border-neutral-900 rounded-[32px] p-8 md:p-12 hover:border-neutral-800 transition-all duration-300 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Content */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">INTEGRATED SOLUTION // 0{index + 1}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">
                    {solution.title}
                  </h2>

                  <div 
                    className="text-neutral-400 font-light text-sm leading-relaxed prose prose-invert"
                    dangerouslySetInnerHTML={{ __html: solution.description }}
                  />

                  {solution.features && solution.features.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-neutral-900">
                      {solution.features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cover/Graphic representation */}
                <div className="lg:col-span-5 relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-neutral-900">
                  <img src={solution.image} alt={solution.title} className="w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Trust & Methodology Section */}
        <section className="mt-40 bg-neutral-950 border-t border-b border-neutral-900 py-32 px-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase">{dict.solutions.engineeringTitle}</h2>
              <p className="text-neutral-400 font-light text-lg max-w-2xl mx-auto leading-relaxed">
                {dict.solutions.engineeringSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dict.solutions.methodology.map((item: any, idx: number) => (
                <div key={idx} className="p-8 bg-black border border-neutral-900 rounded-2xl relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-neutral-900 group-hover:bg-blue-500 transition-colors" />
                  <h3 className="text-lg font-bold mb-4 text-white font-mono uppercase tracking-wider">// {item.title}</h3>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Fallback default Apple UI
  return (
    <div className="min-h-screen bg-white pt-[100px] pb-20 overflow-hidden">
      {/* Page Header */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto mb-20">
        <div className="max-w-4xl">
          <h1 className="text-[56px] md:text-[80px] font-bold text-apple-text mb-8 leading-[1.1] tracking-tight">
            {dict.solutions.title}
          </h1>
          <p className="text-apple-text-secondary text-xl md:text-2xl leading-relaxed max-w-2xl">
            {dict.solutions.subtitle}
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto space-y-12">
        {finalSolutions.map((solution: any, index: number) => (
          <div key={solution.id} className="bg-apple-bg-secondary p-8 md:p-12 rounded-[40px] border border-apple-border flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-apple-text mb-6">{solution.title}</h2>
              <div 
                className="text-apple-text-secondary text-lg mb-8 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: solution.description }}
              />
              {solution.features && solution.features.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {solution.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-apple-accent shrink-0" />
                      <span className="font-semibold text-apple-text">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full lg:w-1/2 aspect-video rounded-3xl overflow-hidden shadow-xl border border-black/5">
              <img src={solution.image} alt={solution.title} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </section>

      {/* Trust & Methodology Section */}
      <section className="mt-40 bg-black text-white py-32 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">{dict.solutions.engineeringTitle}</h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              {dict.solutions.engineeringSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {dict.solutions.methodology.map((item: any, idx: number) => (
              <div key={idx} className="text-center p-10 bg-white/5 rounded-[40px] border border-white/10">
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
