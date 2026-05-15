"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MoveRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsClient({ data }: { data: any[] }) {
  const { dict, language } = useLanguage();
  const horizontalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const horizontal = horizontalRef.current;
    const container = containerRef.current;

    if (!horizontal || !container) return;

    const ctx = gsap.context(() => {
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
          scrub: 1,
          invalidateOnRefresh: true,
        }
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

  return (
    <div className="bg-white overflow-hidden">
      {/* Intro Header */}
      <section className="h-[60vh] flex flex-col justify-end px-6 md:px-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[1440px] mx-auto w-full"
        >
          <span className="text-apple-accent font-bold tracking-[0.4em] uppercase text-xs mb-8 block">
            Digital Archive
          </span>
          <h1 className="text-[64px] md:text-[120px] font-bold tracking-tighter leading-none mb-12">
            Elevating the<br />
            Standard.
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <p className="text-apple-text-secondary text-xl md:text-2xl max-w-xl leading-relaxed">
              {dict.projects.subtitle}
            </p>
            <div className="flex items-center gap-4 text-apple-text font-bold">
              <span>Scroll to navigate</span>
              <MoveRight className="w-8 h-8 animate-bounce-x" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Horizontal Showcase Section */}
      <div ref={containerRef} className="relative h-screen bg-[#0a0a0a]">
        <div ref={horizontalRef} className="flex h-full items-center px-[10vw]">
          {finalProjects.map((project: any, index: number) => (
            <div 
              key={project.id} 
              className="flex-shrink-0 w-[80vw] md:w-[60vw] h-[70vh] mr-[15vw] relative flex items-center"
            >
              <div className="absolute top-0 left-0 w-full text-white/5 text-[20vw] font-bold select-none whitespace-nowrap pointer-events-none transform -translate-y-1/2">
                {project.title}
              </div>

              <div className="relative w-full h-full rounded-[40px] overflow-hidden group">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-16 left-16 right-16 flex flex-col md:flex-row justify-between items-end gap-8">
                  <div className="max-w-md">
                    <p className="text-apple-accent font-bold tracking-widest uppercase text-xs mb-4">
                      {project.category}
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                      {project.title}
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <Link 
                    href={`/projects/${project.id}`}
                    className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-apple-text hover:bg-apple-accent hover:text-white transition-all duration-500 transform hover:scale-110"
                  >
                    <ArrowRight className="w-8 h-8" />
                  </Link>
                </div>
              </div>

              <div className="absolute -right-[10vw] top-1/2 -translate-y-1/2 hidden md:block">
                <div className="w-[1px] h-[300px] bg-white/10" />
                <div className="mt-8 text-white/30 text-xs font-mono uppercase tracking-[0.3em] vertical-text">
                  Project.No 0{index + 1}
                </div>
              </div>
            </div>
          ))}

          <div className="flex-shrink-0 w-[60vw] h-full flex flex-col justify-center items-center text-center px-12">
            <h3 className="text-white text-5xl md:text-7xl font-bold mb-12 tracking-tight">
              Ready for the<br />Next Level?
            </h3>
            <Link
              href="/contact"
              className="bg-apple-accent text-white px-12 py-6 rounded-full text-2xl font-bold hover:bg-apple-accent-hover transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Summary Footer */}
      <section className="py-40 px-6 md:px-24">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Focusing on<br />the Essence.</h2>
            <p className="text-apple-text-secondary text-xl leading-relaxed">
              Our projects are more than just software. They are strategic assets designed to create long-term value and competitive advantages.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-8 border border-apple-border rounded-[32px]">
              <p className="text-4xl font-bold mb-2">99%</p>
              <p className="text-apple-text-secondary text-sm">Customer Satisfaction</p>
            </div>
            <div className="p-8 border border-apple-border rounded-[32px]">
              <p className="text-4xl font-bold mb-2">150+</p>
              <p className="text-apple-text-secondary text-sm">Projects Delivered</p>
            </div>
            <div className="p-8 border border-apple-border rounded-[32px]">
              <p className="text-4xl font-bold mb-2">10+</p>
              <p className="text-apple-text-secondary text-sm">Industry Awards</p>
            </div>
            <div className="p-8 border border-apple-border rounded-[32px]">
              <p className="text-4xl font-bold mb-2">50%</p>
              <p className="text-apple-text-secondary text-sm">Revenue Growth</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
