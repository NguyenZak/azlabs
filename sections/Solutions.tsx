"use client";

import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import AnimatedText from "@/components/AnimatedText";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SolutionsProps {
  data: any[];
}

const SolutionContent = ({ solution }: { solution: any }) => {
  const { language } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4"
    >
      <div className="text-[#686870] text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
        <span className="font-bold text-black mr-2">
          {language === "en" ? solution.title_en : solution.title_vi}
        </span>
        <span dangerouslySetInnerHTML={{ __html: language === "en" ? solution.description_en : solution.description_vi }} />
      </div>
      
      {/* HTML Content support for more details if available */}
      {solution.content_en && (
        <div 
          className="mt-12 prose prose-lg prose-gray max-w-4xl mx-auto"
          dangerouslySetInnerHTML={{ 
            __html: language === "en" ? solution.content_en : solution.content_vi 
          }}
        />
      )}
    </motion.div>
  );
};

export default function Solutions({ data }: SolutionsProps) {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!data || data.length === 0 || !mounted) return null;

  const cards = data.map((solution, index) => (
    <Card 
      key={solution.id} 
      card={{
        category: language === "en" ? "Solution" : "Giải pháp",
        title: language === "en" ? solution.title_en : solution.title_vi,
        src: solution.image_url || `https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop`,
        content: <SolutionContent solution={solution} />
      }} 
      index={index} 
    />
  ));

  return (
    <section className="w-full py-20 bg-white overflow-hidden" id="solutions">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <AnimatedText
          text={language === "en" ? "Industry Solutions." : "Giải pháp Ngành nghề."}
          className="text-4xl md:text-7xl font-bold tracking-tighter text-apple-text mb-4"
          effect="soft-blur-in"
        />
        <p className="text-xl text-apple-text-secondary max-w-2xl font-medium leading-relaxed">
          {language === "en" 
            ? "Engineered for excellence. We solve complex industry challenges with custom-tailored technology frameworks."
            : "Kiến tạo sự xuất sắc. Chúng tôi giải quyết các thách thức phức tạp của ngành bằng các khung công nghệ được may đo riêng biệt."}
        </p>
      </div>
      <Carousel items={cards} />
    </section>
  );
}
