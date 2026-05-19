"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MoveRight, Terminal } from "lucide-react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsClient({ data, settings }: { data: any[], settings?: any }) {
  const { dict, language } = useLanguage();
  const horizontalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const horizontal = horizontalRef.current;
    const container = containerRef.current;

    if (!horizontal || !container) return;

    const ctx = gsap.context(() => {
      // Only apply horizontal scroll on desktop (min-width: 768px)
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        const scrollWidth = horizontal.scrollWidth;
        const amountToScroll = scrollWidth - window.innerWidth;

        gsap.to(horizontal, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 1.5, // Increased for more "viscous" smooth feel
            invalidateOnRefresh: true,
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const finalProjects = data.length > 0 
    ? data.map(item => ({
        id: item.id,
        title: language === "vi" ? item.title_vi : item.title_en,
        category: language === "vi" ? item.category_vi : item.category_en,
        description: language === "vi" ? item.description_vi : item.description_en,
        image: item.image_url
      }))
    : dict.projects.items;

  const isTechTemplate = settings?.homepage_template === "tech";

  if (isTechTemplate) {
    return (
      <div className="bg-black text-white overflow-hidden">
        {/* Intro Header */}
        <section className="min-h-[50vh] md:h-[60vh] flex flex-col justify-end px-6 md:px-24 pb-12 md:pb-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[1440px] mx-auto w-full"
          >
            <span className="text-blue-400 font-mono font-bold tracking-widest uppercase text-xs mb-4 md:mb-8 block bg-blue-950/30 px-3 py-1 rounded-full w-fit">
              [{dict.projects.archive}]
            </span>
            <h1 className="text-4xl md:text-[100px] font-bold tracking-tighter leading-[0.9] mb-8 md:mb-12 uppercase">
              {dict.projects.elevateTitle.split('.')[0]}<br />
              {dict.projects.elevateTitle.split('.')[1] || "Standard."}
            </h1>
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 md:gap-12">
              <p className="text-neutral-400 font-light text-lg md:text-2xl max-w-xl leading-relaxed">
                {dict.projects.subtitle}
              </p>
              <div className="hidden md:flex items-center gap-4 text-white font-mono text-xs">
                <span>{dict.projects.scroll}</span>
                <MoveRight className="w-6 h-6 animate-bounce-x text-blue-500" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Horizontal/Vertical Showcase Section */}
        <div ref={containerRef} className="relative h-auto md:h-screen bg-black py-20 md:py-0 border-t border-b border-neutral-900">
          <div ref={horizontalRef} className="flex flex-col md:flex-row h-full md:items-center px-6 md:px-[10vw] gap-12 md:gap-0 will-change-transform">
            {finalProjects.map((project: any, index: number) => (
              <div 
                key={project.id} 
                className="flex-shrink-0 w-full md:w-[60vw] h-[50vh] md:h-[70vh] md:mr-[15vw] relative flex items-center will-change-transform"
              >
                {/* Background Title - Hidden on mobile for clarity */}
                <div className="absolute top-0 left-0 w-full text-blue-500/5 text-[20vw] font-mono font-bold select-none whitespace-nowrap pointer-events-none transform -translate-y-1/2 hidden md:block">
                  {project.title}
                </div>

                <div className="relative w-full h-full rounded-3xl overflow-hidden group border border-neutral-900 shadow-2xl">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 z-10">
                    <div className="max-w-md">
                      <p className="text-blue-400 font-mono tracking-widest uppercase text-[10px] md:text-xs mb-2 md:mb-4 bg-blue-950/40 px-3 py-1 rounded-full w-fit">
                        {project.category}
                      </p>
                      <h2 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tight leading-none uppercase">
                        {project.title}
                      </h2>
                      <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">
                        {project.description}
                      </p>
                    </div>
                    
                    <Link 
                      href={`/projects/${project.id}`}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
                    >
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                    </Link>
                  </div>
                </div>

                {/* Counter - Hidden on mobile */}
                <div className="absolute -right-[10vw] top-1/2 -translate-y-1/2 hidden md:block">
                  <div className="w-[1px] h-[300px] bg-neutral-900" />
                  <div className="mt-8 text-neutral-600 text-[10px] font-mono uppercase tracking-[0.3em] vertical-text">
                    MODULE.REGISTRY 0{index + 1}
                  </div>
                </div>
              </div>
            ))}

            {/* Last Slide / CTA */}
            <div className="flex-shrink-0 w-full md:w-[60vw] py-20 md:py-0 h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
              <h3 className="text-white text-4xl md:text-6xl font-bold mb-8 md:mb-12 tracking-tight uppercase">
                {dict.projects.nextLevel.split('?')[0]}?<br />
                {dict.projects.nextLevel.split('?')[1]}
              </h3>
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 md:px-10 md:py-5 rounded-xl text-sm font-mono font-bold transition-all uppercase tracking-wider"
              >
                {dict.projects.getInTouch}
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Arrows - Synchronized with Features */}
          <div className="hidden md:flex absolute bottom-12 right-12 md:right-24 items-center gap-3 z-50">
             <button 
               onClick={() => {
                 const scrollAmount = window.innerWidth * 0.8;
                 window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
               }}
               className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-950 border border-neutral-900 transition-all hover:border-neutral-800"
             >
               <IconArrowNarrowLeft className="h-6 w-6 text-white" />
             </button>
             <button 
               onClick={() => {
                 const scrollAmount = window.innerWidth * 0.8;
                 window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
               }}
               className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-950 border border-neutral-900 transition-all hover:border-neutral-800"
             >
               <IconArrowNarrowRight className="h-6 w-6 text-white" />
             </button>
          </div>
        </div>

        {/* Grid Summary Footer */}
        <section className="py-24 md:py-40 px-6 md:px-24">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight uppercase">
                {dict.projects.essenceTitle.split('.')[0]}.<br className="hidden md:block" />
                {dict.projects.essenceTitle.split('.')[1]}
              </h2>
              <p className="text-neutral-400 font-light text-lg md:text-xl leading-relaxed">
                {dict.projects.essenceSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 font-mono">
              <div className="p-6 md:p-8 border border-neutral-900 rounded-2xl bg-neutral-950/60 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500/20 group-hover:bg-blue-500 transition-colors" />
                <p className="text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-blue-500">99%</p>
                <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">{dict.projects.satisfaction}</p>
              </div>
              <div className="p-6 md:p-8 border border-neutral-900 rounded-2xl bg-neutral-950/60 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500/20 group-hover:bg-blue-500 transition-colors" />
                <p className="text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-blue-500">150+</p>
                <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">{dict.projects.delivered}</p>
              </div>
              <div className="p-6 md:p-8 border border-neutral-900 rounded-2xl bg-neutral-950/60 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500/20 group-hover:bg-blue-500 transition-colors" />
                <p className="text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-blue-500">10+</p>
                <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">{dict.projects.awards}</p>
              </div>
              <div className="p-6 md:p-8 border border-neutral-900 rounded-2xl bg-neutral-950/60 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500/20 group-hover:bg-blue-500 transition-colors" />
                <p className="text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-blue-500">50%</p>
                <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">{dict.projects.growth}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Classic fallback layout
  return (
    <div className="bg-white overflow-hidden">
      {/* Intro Header */}
      <section className="min-h-[50vh] md:h-[60vh] flex flex-col justify-end px-6 md:px-24 pb-12 md:pb-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[1440px] mx-auto w-full"
        >
          <span className="text-apple-accent font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4 md:mb-8 block">
            {dict.projects.archive}
          </span>
          <h1 className="text-4xl md:text-[120px] font-bold tracking-tighter leading-[0.9] mb-8 md:mb-12">
            {dict.projects.elevateTitle.split('.')[0]}<br />
            {dict.projects.elevateTitle.split('.')[1] || "Standard."}
          </h1>
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 md:gap-12">
            <p className="text-apple-text-secondary text-lg md:text-2xl max-w-xl leading-relaxed">
              {dict.projects.subtitle}
            </p>
            <div className="hidden md:flex items-center gap-4 text-apple-text font-bold">
              <span>{dict.projects.scroll}</span>
              <MoveRight className="w-8 h-8 animate-bounce-x" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Horizontal/Vertical Showcase Section */}
      <div ref={containerRef} className="relative h-auto md:h-screen bg-[#0a0a0a] py-20 md:py-0">
        <div ref={horizontalRef} className="flex flex-col md:flex-row h-full md:items-center px-6 md:px-[10vw] gap-12 md:gap-0 will-change-transform">
          {finalProjects.map((project: any, index: number) => (
            <div 
              key={project.id} 
              className="flex-shrink-0 w-full md:w-[60vw] h-[50vh] md:h-[70vh] md:mr-[15vw] relative flex items-center will-change-transform"
            >
              {/* Background Title - Hidden on mobile for clarity */}
              <div className="absolute top-0 left-0 w-full text-white/5 text-[20vw] font-bold select-none whitespace-nowrap pointer-events-none transform -translate-y-1/2 hidden md:block">
                {project.title}
              </div>

              <div className="relative w-full h-full rounded-[32px] md:rounded-[40px] overflow-hidden group border border-white/5 shadow-2xl">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 md:opacity-60 transition-opacity duration-700" />
                
                <div className="absolute bottom-8 left-8 right-8 md:bottom-16 md:left-16 md:right-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 z-10">
                  <div className="max-w-md">
                    <p className="text-apple-accent font-bold tracking-widest uppercase text-[10px] md:text-xs mb-2 md:mb-4">
                      {project.category}
                    </p>
                    <h2 className="text-2xl md:text-6xl font-bold text-white mb-3 md:mb-6 tracking-tight leading-none">
                      {project.title}
                    </h2>
                    <p className="text-white/60 text-sm md:text-lg leading-relaxed line-clamp-2 md:line-clamp-none">
                      {project.description}
                    </p>
                  </div>
                  
                  <Link 
                    href={`/projects/${project.id}`}
                    className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center text-apple-text hover:bg-apple-accent hover:text-white transition-all duration-700 transform hover:scale-110 shadow-xl"
                  >
                    <ArrowRight className="w-5 h-5 md:w-8 md:h-8" />
                  </Link>
                </div>
              </div>

              {/* Counter - Hidden on mobile */}
              <div className="absolute -right-[10vw] top-1/2 -translate-y-1/2 hidden md:block">
                <div className="w-[1px] h-[300px] bg-white/10" />
                <div className="mt-8 text-white/30 text-xs font-mono uppercase tracking-[0.3em] vertical-text">
                  Project.No {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </div>
              </div>
            </div>
          ))}

          {/* Last Slide / CTA */}
          <div className="flex-shrink-0 w-full md:w-[60vw] py-20 md:py-0 h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
            <h3 className="text-white text-4xl md:text-7xl font-bold mb-8 md:mb-12 tracking-tight">
              {dict.projects.nextLevel.split('?')[0]}?<br />
              {dict.projects.nextLevel.split('?')[1]}
            </h3>
            <Link
              href="/contact"
              className="bg-apple-accent text-white px-8 py-4 md:px-12 md:py-6 rounded-full text-lg md:text-2xl font-bold hover:bg-apple-accent-hover transition-all shadow-2xl"
            >
              {dict.projects.getInTouch}
            </Link>
          </div>
        </div>

        {/* Desktop Navigation Arrows - Synchronized with Features */}
        <div className="hidden md:flex absolute bottom-12 right-12 md:right-24 items-center gap-3 z-50">
           <button 
             onClick={() => {
               const scrollAmount = window.innerWidth * 0.8;
               window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
             }}
             className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all hover:bg-white/20 active:scale-95 group shadow-xl"
           >
             <IconArrowNarrowLeft className="h-7 w-7 text-white group-hover:scale-110 transition-transform" />
           </button>
           <button 
             onClick={() => {
               const scrollAmount = window.innerWidth * 0.8;
               window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
             }}
             className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all hover:bg-white/20 active:scale-95 group shadow-xl"
           >
             <IconArrowNarrowRight className="h-7 w-7 text-white group-hover:scale-110 transition-transform" />
           </button>
        </div>
      </div>

      {/* Grid Summary Footer */}
      <section className="py-24 md:py-40 px-6 md:px-24">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight leading-tight">
              {dict.projects.essenceTitle.split('.')[0]}.<br className="hidden md:block" />
              {dict.projects.essenceTitle.split('.')[1]}
            </h2>
            <p className="text-apple-text-secondary text-lg md:text-xl leading-relaxed">
              {dict.projects.essenceSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            <div className="p-6 md:p-8 border border-apple-border rounded-[24px] md:rounded-[32px] bg-[#f5f5f7]/30">
              <p className="text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-apple-accent">99%</p>
              <p className="text-apple-text-secondary text-[12px] md:text-sm font-medium uppercase tracking-widest">{dict.projects.satisfaction}</p>
            </div>
            <div className="p-6 md:p-8 border border-apple-border rounded-[24px] md:rounded-[32px] bg-[#f5f5f7]/30">
              <p className="text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-apple-accent">150+</p>
              <p className="text-apple-text-secondary text-[12px] md:text-sm font-medium uppercase tracking-widest">{dict.projects.delivered}</p>
            </div>
            <div className="p-6 md:p-8 border border-apple-border rounded-[24px] md:rounded-[32px] bg-[#f5f5f7]/30">
              <p className="text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-apple-accent">10+</p>
              <p className="text-apple-text-secondary text-[12px] md:text-sm font-medium uppercase tracking-widest">{dict.projects.awards}</p>
            </div>
            <div className="p-6 md:p-8 border border-apple-border rounded-[24px] md:rounded-[32px] bg-[#f5f5f7]/30">
              <p className="text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-apple-accent">50%</p>
              <p className="text-apple-text-secondary text-[12px] md:text-sm font-medium uppercase tracking-widest">{dict.projects.growth}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
