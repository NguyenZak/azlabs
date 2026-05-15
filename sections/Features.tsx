"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import AnimatedText from "@/components/AnimatedText";

interface Feature {
  id: string;
  title_en: string;
  title_vi: string;
  description_en: string;
  description_vi: string;
  image_url: string;
  order_index: number;
}

const FeatureContent = ({ feature, language }: { feature: Feature, language: string }) => {
  const headline = language === "vi" ? feature.description_vi : feature.description_en;
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-[40px] mb-8 overflow-hidden">
      <div
        className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl max-w-4xl mx-auto leading-relaxed space-y-6 rich-text-content"
        dangerouslySetInnerHTML={{ __html: headline }}
      />

      {feature.image_url && (
        <div className="mt-12 rounded-3xl overflow-hidden shadow-2xl border border-black/5">
          <img
            src={feature.image_url}
            alt={language === "vi" ? feature.title_vi : feature.title_en}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <style jsx global>{`
        .rich-text-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1d1d1f;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .rich-text-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1d1d1f;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .rich-text-content p {
          margin-bottom: 1.25rem;
        }
        .rich-text-content blockquote {
          border-left: 4px solid #0071e3;
          padding-left: 1.5rem;
          font-style: italic;
          color: #424245;
          margin: 2rem 0;
        }
        .rich-text-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .rich-text-content li {
          margin-bottom: 0.5rem;
        }
        .dark .rich-text-content h2, 
        .dark .rich-text-content h3 {
          color: #f5f5f7;
        }
        .dark .rich-text-content blockquote {
          color: #a1a1a6;
        }
      `}</style>
    </div>
  );
};

export default function FeatureGallery({ data }: { data: Feature[] }) {
  const { dict, language } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!data || data.length === 0 || !mounted) return null;

  const cards = data.map((feature, index) => ({
    category: language === "vi" ? "Trụ cột đổi mới" : "Innovation Pillar",
    title: language === "vi" ? feature.title_vi : feature.title_en,
    src: feature.image_url,
    content: <FeatureContent feature={feature} language={language} />,
  }));

  const carouselItems = cards.map((card, index) => (
    <Card key={card.src + index} card={card} index={index} layout={true} />
  ));

  return (
    <section id="features" className="py-32 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedText
          key={language}
          text={dict.features.title}
          className="px-6 md:px-12 text-[40px] md:text-[56px] font-bold text-apple-text tracking-tight mb-4"
          effect="soft-blur-in"
        />
      </div>
      <Carousel items={carouselItems} />
    </section>
  );
}
