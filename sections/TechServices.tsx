"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, Cpu, ShieldCheck, Database, Cloud, X, Zap, ChevronRight, Activity } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ServiceItem {
  id?: string;
  title: string;
  description: string;
  details?: string;
  features?: string[];
  image?: string;
  category?: string;
}

export default function TechServices({ data = [] }: { data?: any[] }) {
  const { dict, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Fallback logos for generic services
  const fallbackImages = [
    "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_web_dev_1778841031178.png",
    "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_mobile_dev_1778841043651.png",
    "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_ai_solutions_1778841058614.png",
    "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_uiux_design_1778841073172.png",
    "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_saas_systems_1778841086652.png",
    "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_cloud_infra_1778841102902.png",
  ];

  const processedServices: ServiceItem[] = data.length > 0
    ? data.map((item, index) => ({
        id: item.id,
        title: language === "vi" ? item.title_vi : item.title_en,
        description: language === "vi" ? item.description_vi : item.description_en,
        details: language === "vi" ? item.details_vi : item.details_en,
        features: language === "vi" ? item.features_vi : item.features_en,
        image: item.image_url || fallbackImages[index % fallbackImages.length],
        category: language === "vi" ? "Dịch vụ" : "Service",
      }))
    : dict.services.items.map((item, index) => ({
        ...item,
        category: language === "vi" ? "Dịch vụ" : "Service",
        image: fallbackImages[index % fallbackImages.length],
      }));

  // Assign appropriate icon based on title/slug
  const getServiceIcon = (title: string, index: number) => {
    const lower = title.toLowerCase();
    if (lower.includes("web") || lower.includes("trang")) return <Monitor className="w-6 h-6 text-blue-400" />;
    if (lower.includes("mobile") || lower.includes("di động") || lower.includes("app")) return <Smartphone className="w-6 h-6 text-cyan-400" />;
    if (lower.includes("ai") || lower.includes("trí tuệ") || lower.includes("thông minh")) return <Cpu className="w-6 h-6 text-indigo-400" />;
    if (lower.includes("security") || lower.includes("bảo mật")) return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
    if (lower.includes("data") || lower.includes("cơ sở dữ liệu")) return <Database className="w-6 h-6 text-purple-400" />;
    if (lower.includes("cloud") || lower.includes("hạ tầng") || lower.includes("saas")) return <Cloud className="w-6 h-6 text-sky-400" />;
    
    // Rotation default
    const icons = [
      <Monitor className="w-6 h-6 text-blue-400" />,
      <Smartphone className="w-6 h-6 text-cyan-400" />,
      <Cpu className="w-6 h-6 text-indigo-400" />,
      <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      <Database className="w-6 h-6 text-purple-400" />,
      <Cloud className="w-6 h-6 text-sky-400" />
    ];
    return icons[index % icons.length];
  };

  // Simulated metrics for the Bento panels
  const mockMetrics = [
    { label: "SLA TARGET", val: "99.98%" },
    { label: "AVG RESPONSE", val: "14ms" },
    { label: "ISO CERT", val: "27001" },
    { label: "NODE STATUS", val: "ONLINE" }
  ];

  return (
    <section id="services" className="py-32 bg-black text-white relative overflow-hidden border-t border-neutral-900">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-20 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950/30 px-3 py-1 rounded-full w-fit block font-bold">
            Capabilities Portal
          </span>
          <h2 className="text-[40px] md:text-[60px] font-bold tracking-tight leading-none">
            {language === "vi" ? "Dịch Vụ Kỹ Thuật Số" : "System Services"}
          </h2>
          <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed max-w-xl">
            {language === "vi"
              ? "Bảng điều khiển các module dịch vụ công nghệ lõi phục vụ quá trình chuyển đổi số toàn diện cho doanh nghiệp."
              : "An overview of core technology service modules powering comprehensive digital transformation for modern enterprises."}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedServices.map((service, index) => {
            const icon = getServiceIcon(service.title, index);
            // Alternate card widths and designs for bento layout
            const isLarge = index === 0 || index === 4;

            return (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative rounded-[32px] border border-neutral-900 bg-neutral-950/60 p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-neutral-800 hover:bg-neutral-950 min-h-[340px] ${
                  isLarge ? "lg:col-span-2" : "lg:col-span-1"
                }`}
              >
                {/* Tech grid overlay when hovered */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] pointer-events-none transition-opacity duration-500 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]" />

                {/* Card Top: Icon & Status */}
                <div className="flex items-start justify-between w-full">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    {icon}
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-500 font-bold group-hover:text-emerald-400 group-hover:border-emerald-500/25 transition-colors">
                    <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                    <span>SYS_ACTIVE</span>
                  </div>
                </div>

                {/* Card Middle: Title & Description */}
                <div className="space-y-3 my-6">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-400 font-light text-xs md:text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Card Bottom: Metrics & Action */}
                <div className="flex items-end justify-between pt-6 border-t border-neutral-900/60 w-full">
                  <div className="flex gap-4 font-mono text-[9px] text-neutral-500">
                    <div>
                      <span className="block text-neutral-600">RESPONSE</span>
                      <span className="text-white font-bold">{mockMetrics[index % 4].val}</span>
                    </div>
                    <div>
                      <span className="block text-neutral-600">SLA SPEC</span>
                      <span className="text-white font-bold">99.98%</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveService(service)}
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    <span>EXPLORE BLUEPRINT</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* System Service Blueprint Side Panel / Drawer */}
      <AnimatePresence>
        {activeService && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveService(null)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg md:max-w-xl bg-neutral-950 border-l border-neutral-800 p-8 md:p-12 z-50 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-8">
                {/* Drawer Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950/30 px-3 py-1 rounded-full font-bold">
                    SYSTEM SPECIFICATION BLUEPRINT
                  </span>
                  <button
                    onClick={() => setActiveService(null)}
                    className="w-10 h-10 rounded-full border border-neutral-800 hover:border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Service Details */}
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold tracking-tight text-white">
                    {activeService.title}
                  </h3>
                  <div 
                    className="text-neutral-400 font-light text-sm leading-relaxed prose prose-invert"
                    dangerouslySetInnerHTML={{ __html: activeService.details || activeService.description }}
                  />
                </div>

                {/* System Features list */}
                {activeService.features && activeService.features.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-neutral-900">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block font-bold">INCLUDED SYSTEMS</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeService.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-900/50 border border-neutral-900">
                          <Zap className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs font-mono text-neutral-300">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Simulated Blueprint Graphic */}
                {activeService.image && (
                  <div className="rounded-2xl overflow-hidden border border-neutral-900 relative group aspect-video">
                    <img
                      src={activeService.image}
                      alt={activeService.title}
                      className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="pt-8 border-t border-neutral-900 mt-12 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                <div className="text-[10px] font-mono text-neutral-500">
                  <span>COMPLIANCE STATUS: </span>
                  <span className="text-emerald-400 font-bold">ISO-27001 COMPLIANT</span>
                </div>
                <a
                  href="#contact"
                  onClick={() => setActiveService(null)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-center rounded-xl text-xs font-bold transition-colors font-mono uppercase tracking-wider"
                >
                  Request Integration
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
