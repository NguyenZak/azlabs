"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import AnimatedText from "@/components/AnimatedText";

const ProjectContent = ({ project, language }: { project: any, language: string }) => {
  const details = language === "vi" ? project.details_vi : project.details_en;
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-[40px] mb-8 overflow-hidden">
      <div 
        className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl max-w-4xl mx-auto leading-relaxed space-y-6 rich-text-content"
        dangerouslySetInnerHTML={{ __html: details || "" }}
      />
      
      {project.image_url && (
        <div className="mt-12 rounded-3xl overflow-hidden shadow-2xl border border-black/5">
          <img
            src={project.image_url}
            alt={language === "vi" ? project.title_vi : project.title_en}
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

export default function Portfolio({ data = [] }: { data?: any[] }) {
  const { dict, language } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const finalProjects = data.length > 0 ? data : [];

  const cards = finalProjects.map((project, index) => ({
    category: language === "vi" ? project.category_vi : project.category_en,
    title: language === "vi" ? project.title_vi : project.title_en,
    src: project.image_url,
    content: <ProjectContent project={project} language={language} />,
  }));

  const carouselItems = cards.map((card, index) => (
    <Card key={card.src + index} card={card} index={index} layout={true} />
  ));

  return (
    <section id="projects" className="py-32 bg-[#f5f5f7] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-6 md:px-12 mb-10">
          <h2 className="text-[40px] md:text-[56px] font-bold text-apple-text tracking-tight mb-4">
            <AnimatedText text={dict.projects.title} effect="random" />
          </h2>
          <p className="text-apple-text-secondary text-lg md:text-xl max-w-2xl leading-relaxed">
            {dict.projects.subtitle}
          </p>
        </div>
      </div>
      
      {carouselItems.length > 0 ? (
        <Carousel items={carouselItems} />
      ) : (
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 text-center text-apple-text-secondary">
          {dict.projects.noProjects}
        </div>
      )}
    </section>
  );
}
