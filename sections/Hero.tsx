"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Antigravity } from "@/components/Antigravity";

import { useMotionValue, useTransform, animate } from "framer-motion";

import AnimatedText from "@/components/AnimatedText";

export default function Hero({ slides = [] }: { slides?: any[] }) {
  const { dict, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback if no slides from CMS
  const defaultSlides = [
    {
      title_en: dict.hero.title,
      title_vi: dict.hero.title,
      subtitle_en: dict.hero.subtitle,
      subtitle_vi: dict.hero.subtitle,
      cta_text_en: dict.hero.ctaPrimary,
      cta_text_vi: dict.hero.ctaPrimary,
      cta_link: "/contact"
    }
  ];

  const activeSlides = slides.length > 0 ? slides : defaultSlides;
  const currentSlide = activeSlides[currentIndex];

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);

  const title = language === "en" ? currentSlide.title_en : currentSlide.title_vi;
  const subtitle = language === "en" ? currentSlide.subtitle_en : currentSlide.subtitle_vi;
  const ctaText = language === "en" ? currentSlide.cta_text_en : currentSlide.cta_text_vi;
  const ctaLink = currentSlide.cta_link || "/contact";

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white px-6">
      {/* Premium Interactive Particles */}
      <div className="absolute inset-0 z-0">
        <Antigravity
          color={["#3186FF", "#FC413D", "#FBBC04", "#00B95C"]}
          count={500}
          particleSize={0.75}
          magnetRadius={15}
          lerpSpeed={0.03}
          fieldStrength={20}
          autoAnimate={true}
        />
      </div>

      <div className="relative z-10 text-center max-w-[1200px] mx-auto">
        {/* Brand Logo Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-3 h-6 bg-[#4285F4] rounded-full transform -rotate-12" />
              <div className="w-3 h-6 bg-[#EA4335] rounded-full transform rotate-12" />
            </div>
            <span className="text-2xl font-medium text-[#5f6368] tracking-tight">
              <span className="font-bold text-[#1d1d1f]">AzLabs</span> Digital Studio
            </span>
          </div>
        </motion.div>

        {/* Dynamic Content Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-8 min-h-[160px] md:min-h-[200px]">
              <h1 className="text-[42px] md:text-[72px] lg:text-[84px] font-bold tracking-tight leading-[1.1] text-[#1d1d1f] max-w-[1000px] mx-auto text-center">
                <AnimatedText text={title} effect="random" key={title} />
              </h1>
            </div>

            <p className="text-lg md:text-xl text-apple-text-secondary max-w-2xl mx-auto mb-12 font-medium leading-relaxed opacity-80">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href={ctaLink}
                className="group relative px-10 py-4 bg-[#1d1d1f] text-white rounded-full text-lg font-medium overflow-hidden transition-all hover:pr-14"
              >
                <span className="relative z-10">{ctaText}</span>
                <div className="absolute inset-0 bg-apple-accent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
              </Link>

              <Link
                href="/projects"
                className="group flex items-center gap-3 bg-white/50 backdrop-blur text-[#1d1d1f] px-10 py-4 rounded-full text-lg font-medium hover:bg-white transition-all border border-apple-border/50"
              >
                {language === "en" ? "View Work" : "Xem dự án"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Controls */}
      {activeSlides.length > 1 && (
        <>
          {/* Navigation Dots */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === idx ? "w-8 bg-black" : "w-1.5 bg-apple-border hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>

          {/* Side Arrows (Desktop) */}
          <div className="hidden lg:block">
            <button
              onClick={prevSlide}
              className="absolute left-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/80 backdrop-blur-sm rounded-full transition-all border border-white/20 text-apple-text-secondary"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/80 backdrop-blur-sm rounded-full transition-all border border-white/20 text-apple-text-secondary"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </>
      )}

      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}
