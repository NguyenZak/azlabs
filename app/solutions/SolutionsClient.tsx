"use client";

import React from "react";
import { motion } from "framer-motion";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import AnimatedText from "@/components/AnimatedText";

const SolutionContent = ({ solution, language }: { solution: any, language: string }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-[40px] mb-8 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-apple-text dark:text-white mb-6 leading-tight">
          {solution.title}
        </h2>
        <div 
          className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl leading-relaxed mb-10 rich-text-content"
          dangerouslySetInnerHTML={{ __html: solution.description }}
        />
        
        {solution.features && solution.features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            {solution.features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-black/5 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-apple-accent" />
                <span className="font-semibold text-apple-text dark:text-white">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {solution.image && (
        <div className="mt-12 rounded-3xl overflow-hidden shadow-2xl border border-black/5">
          <img
            src={solution.image}
            alt={solution.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <style jsx global>{`
        .rich-text-content h2 { font-size: 2rem; font-weight: 700; color: #1d1d1f; margin: 2rem 0 1rem; line-height: 1.2; }
        .rich-text-content p { margin-bottom: 1.25rem; }
        .dark .rich-text-content h2 { color: #f5f5f7; }
      `}</style>
    </div>
  );
};

export default function SolutionsClient({ data }: { data: any[] }) {
  const { dict, language } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
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

  const carouselItems = finalSolutions.map((solution, index) => (
    <Card 
      key={solution.id + index} 
      card={{
        src: solution.image,
        title: solution.title,
        category: solution.category,
        content: <SolutionContent solution={solution} language={language} />,
      }} 
      index={index} 
      layout={true}
    />
  ));

  return (
    <div className="min-h-screen bg-white pt-[100px] pb-20 overflow-hidden">
      {/* Page Header */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto mb-20">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="text-[56px] md:text-[80px] font-bold text-apple-text mb-8 leading-[1.1] tracking-tight"
          >
            <AnimatedText text={dict.solutions.title} effect="soft-blur-in" />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="text-apple-text-secondary text-xl md:text-2xl leading-relaxed max-w-2xl"
          >
            {dict.solutions.subtitle}
          </motion.p>
        </div>
      </section>

      <Carousel items={carouselItems} />

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
