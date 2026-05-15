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
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                {headline}
              </span>{" "}
              AZLABS mang đến những giải pháp công nghệ đột phá, tối ưu hóa quy trình và nâng tầm thương hiệu của bạn. 
              Chúng tôi kết hợp sự sáng tạo với kỹ thuật hiện đại để tạo ra những sản phẩm vượt mong đợi.
            </p>
            <img
              src={feature.image_url}
              alt={language === "vi" ? feature.title_vi : feature.title_en}
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-10 rounded-2xl"
            />
          </div>
        );
      })}
    </>
  );
};

export default function FeatureGallery({ data }: { data: Feature[] }) {
  const { language } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!data || data.length === 0 || !mounted) return null;

  const cards = data.map((feature, index) => ({
    category: language === "vi" ? feature.title_vi : feature.title_en,
    title: language === "vi" ? feature.description_vi : feature.description_en,
    src: feature.image_url,
    content: <FeatureContent feature={feature} language={language} />,
  }));

  const carouselItems = cards.map((card, index) => (
    <Card key={card.src + index} card={card} index={index} layout={true} />
  ));

  return (
    <section id="features" className="py-32 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="px-6 md:px-12 text-[40px] md:text-[56px] font-bold text-apple-text tracking-tight mb-4">
          <AnimatedText 
            text={language === "vi" ? "Tìm hiểu AZLABS." : "Get to know AZLABS."} 
            effect="random" 
          />
        </h2>
      </div>
      <Carousel items={carouselItems} />
    </section>
  );
}
