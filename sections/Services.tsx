"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import AnimatedText from "@/components/AnimatedText";

const ServiceContent = ({ service, language }: { service: any, language: string }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-[40px] mb-8 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-apple-text dark:text-white mb-6 leading-tight">
          {service.title}
        </h2>
        <div 
          className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl leading-relaxed mb-10 prose prose-neutral dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: service.details || service.description }}
        />
        
        {service.features && service.features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            {service.features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-black/5 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-apple-accent" />
                <span className="font-semibold text-apple-text dark:text-white">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {service.image && (
        <div className="mt-12 rounded-3xl overflow-hidden shadow-2xl border border-black/5">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default function Services({ data = [] }: { data?: any[] }) {
  const { dict, language } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const serviceImages = [
    "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_web_dev_1778841031178.png",
    "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_mobile_dev_1778841043651.png",
    "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_ai_solutions_1778841058614.png",
    "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_uiux_design_1778841073172.png",
    "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_saas_systems_1778841086652.png",
    "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_cloud_infra_1778841102902.png",
  ];

  const finalServices = data.length > 0 
    ? data.map((item, index) => ({
        id: item.id,
        title: language === "vi" ? item.title_vi : item.title_en,
        category: language === "vi" ? "Dịch vụ" : "Service",
        description: language === "vi" ? item.description_vi : item.description_en,
        details: language === "vi" ? item.details_vi : item.details_en,
        features: language === "vi" ? item.features_vi : item.features_en,
        image: item.image_url || serviceImages[index % serviceImages.length],
      }))
    : dict.services.items.map((item, index) => ({
        ...item,
        category: language === "vi" ? "Dịch vụ" : "Service",
        image: serviceImages[index % serviceImages.length],
      }));

  const carouselItems = finalServices.map((service, index) => (
    <Card 
      key={service.id + index} 
      card={{
        src: service.image,
        title: service.title,
        category: service.category,
        content: <ServiceContent service={service} language={language} />,
      }} 
      index={index} 
      layout={true}
    />
  ));

  return (
    <section id="services" className="py-32 bg-white overflow-hidden border-t border-apple-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-10">
        <h2 className="text-[40px] md:text-[56px] font-bold text-apple-text tracking-tight mb-4">
          <AnimatedText text={dict.services.title} effect="random" />
        </h2>
        <p className="text-apple-text-secondary text-lg md:text-xl max-w-2xl leading-relaxed">
          {dict.services.subtitle}
        </p>
      </div>

      <Carousel items={carouselItems} />
    </section>
  );
}
