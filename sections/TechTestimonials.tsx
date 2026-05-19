"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Award, Quote, ChevronLeft, ChevronRight, Activity, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Testimonial {
  content_en: string;
  content_vi: string;
  name: string;
  role_en: string;
  role_vi: string;
  avatar_url?: string;
  avatar?: string;
  rating?: number;
}

export default function TechTestimonials({ data = [] }: { data?: any[] }) {
  const { dict, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const displayData: Testimonial[] = data.length > 0 ? data : [
    {
      content_en: "AZLABS transformed our digital presence completely. Their attention to detail and premium design sense is unmatched in the industry.",
      content_vi: "AZLABS đã thay đổi hoàn toàn sự hiện diện kỹ thuật số của chúng tôi. Sự chỉn chu đến từng chi tiết và tư duy thiết kế cao cấp của họ là không thể so sánh được.",
      name: "James Wilson",
      role_en: "CEO, FinStream",
      role_vi: "Giám đốc điều hành, FinStream",
      avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
      rating: 5
    },
    {
      content_en: "The AI solutions provided by AZLABS allowed us to automate 40% of our operations while maintaining a high-end user experience.",
      content_vi: "Các giải pháp AI do AZLABS cung cấp đã cho phép chúng tôi tự động hóa 40% hoạt động trong khi vẫn duy trì trải nghiệm người dùng cao cấp.",
      name: "Sarah Chen",
      role_en: "Director of Product, Nexa",
      role_vi: "Giám đốc sản phẩm, Nexa",
      avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
      rating: 5
    },
    {
      content_en: "Working with AZLABS felt like working with a partner who cared as much about our brand as we did. Truly world-class.",
      content_vi: "Làm việc với AZLABS cảm giác như làm việc với một đối tác thực sự quan tâm đến thương hiệu của chúng tôi. Thực sự đẳng cấp thế giới.",
      name: "Michael Ross",
      role_en: "Founder, Aura",
      role_vi: "Người sáng lập, Aura",
      avatar_url: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
      rating: 5
    },
  ];

  const currentTestimonial = displayData[activeIndex] || displayData[0];
  const quoteText = language === "vi" ? currentTestimonial.content_vi : currentTestimonial.content_en;
  const clientName = currentTestimonial.name;
  const clientRole = language === "vi" ? currentTestimonial.role_vi : currentTestimonial.role_en;
  const avatar = currentTestimonial.avatar_url || currentTestimonial.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop";

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % displayData.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + displayData.length) % displayData.length);
  };

  // Mock performance stats to display on each review card
  const getMockAuditStats = (index: number) => {
    const statsList = [
      { speed: "+180% Page Load", cost: "-30% server cost", sla: "99.99% Uptime" },
      { speed: "40% automated tasks", cost: "-45% team overhead", sla: "99.98% SLA" },
      { speed: "+210% organic traffic", cost: "zero database crashes", sla: "100% compliant" }
    ];
    return statsList[index % statsList.length];
  };

  const activeAuditStats = getMockAuditStats(activeIndex);

  return (
    <section id="testimonials" className="py-32 bg-black text-white relative overflow-hidden border-t border-neutral-900">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-20 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950/30 px-3 py-1 rounded-full w-fit block font-bold">
            SLA Verification
          </span>
          <h2 className="text-[40px] md:text-[60px] font-bold tracking-tight leading-none text-white">
            {dict.testimonials.title}
          </h2>
          <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed max-w-xl">
            {dict.testimonials.subtitle}
          </p>
        </div>

        {/* Audit Report Container */}
        <div className="max-w-4xl mx-auto bg-neutral-950/60 border border-neutral-900 rounded-[32px] p-8 md:p-14 relative overflow-hidden">
          {/* Subtle neon glowing accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Report Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-8 border-b border-neutral-900/60 w-full font-mono text-[9px] text-neutral-500">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white uppercase">SLA COMPLIANCE CERTIFICATION</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>LOG_ID: SLA-2026-00{activeIndex + 1}</span>
            </div>
          </div>

          {/* Testimonial Quote slider block with framer transition */}
          <div className="py-8 min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="relative">
                  <Quote className="absolute -left-4 -top-4 w-10 h-10 text-neutral-900 -z-10 rotate-180" />
                  <p className="text-lg md:text-2xl font-light leading-relaxed text-neutral-200">
                    "{quoteText}"
                  </p>
                </div>

                {/* Simulated ROI Statistics */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="bg-neutral-900/30 p-4 rounded-xl border border-neutral-900 text-center">
                    <span className="block text-[8px] font-mono text-neutral-500 uppercase">PERFORMANCE GAIN</span>
                    <span className="text-xs md:text-sm font-mono font-bold text-emerald-400">{activeAuditStats.speed}</span>
                  </div>
                  <div className="bg-neutral-900/30 p-4 rounded-xl border border-neutral-900 text-center">
                    <span className="block text-[8px] font-mono text-neutral-500 uppercase">INFRASTRUCTURE</span>
                    <span className="text-xs md:text-sm font-mono font-bold text-indigo-400">{activeAuditStats.cost}</span>
                  </div>
                  <div className="bg-neutral-900/30 p-4 rounded-xl border border-neutral-900 text-center">
                    <span className="block text-[8px] font-mono text-neutral-500 uppercase">COMPLIANCE SLA</span>
                    <span className="text-xs md:text-sm font-mono font-bold text-white">{activeAuditStats.sla}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Report Footer Bar: User Info & Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-6 pt-8 border-t border-neutral-900/60 w-full mt-4">
            
            {/* User credentials */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-900 shrink-0">
                <img src={avatar} alt={clientName} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-bold text-sm text-white block">{clientName}</span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase block tracking-wider">{clientRole}</span>
              </div>
            </div>

            {/* Slider control arrows */}
            <div className="flex gap-2 justify-end sm:justify-start">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-xl border border-neutral-900 hover:border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all bg-neutral-950/40"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-xl border border-neutral-900 hover:border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all bg-neutral-950/40"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
