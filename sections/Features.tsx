"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
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

export default function Features({ data }: { data: Feature[] }) {
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  if (!data || data.length === 0) return null;

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-[#f5f5f7] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[40px] md:text-[56px] font-bold tracking-tight text-[#1d1d1f]"
          >
            {language === "vi" ? "Tìm hiểu AZLABS." : "Get to know AZLABS."}
          </motion.h2>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {data.map((feature, index) => {
            const title = language === "vi" ? feature.title_vi : feature.title_en;
            const description = language === "vi" ? feature.description_vi : feature.description_en;
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-none w-[320px] md:w-[400px] aspect-[4/5] relative rounded-[32px] overflow-hidden bg-white snap-start group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={feature.image_url} 
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle dark overlay if needed */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                </div>

                {/* Text Content (Top Aligned) */}
                <div className="relative z-10 p-8 flex flex-col h-full text-white">
                  <span className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">
                    Feature {index + 1}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
                    {title}
                  </h3>
                  <p className="text-lg opacity-90 font-light leading-snug max-w-[280px]">
                    {description}
                  </p>

                  {/* Plus Icon (Bottom Right) */}
                  <div className="mt-auto ml-auto">
                    <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {/* Spacer for end of scroll */}
          <div className="flex-none w-px md:w-24 h-full" />
        </div>

        {/* Bottom Navigation Controls */}
        <div className="mt-8 flex justify-end gap-3 px-2">
          <button 
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
              canScrollLeft 
                ? "bg-[#e8e8ed] hover:bg-[#d2d2d7] cursor-pointer" 
                : "bg-[#f5f5f7] opacity-30 cursor-default"
            }`}
          >
            <ChevronLeft className={`w-6 h-6 ${canScrollLeft ? "text-[#1d1d1f]" : "text-[#86868b]"}`} />
          </button>
          <button 
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
              canScrollRight 
                ? "bg-[#e8e8ed] hover:bg-[#d2d2d7] cursor-pointer" 
                : "bg-[#f5f5f7] opacity-30 cursor-default"
            }`}
          >
            <ChevronRight className={`w-6 h-6 ${canScrollRight ? "text-[#1d1d1f]" : "text-[#86868b]"}`} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
