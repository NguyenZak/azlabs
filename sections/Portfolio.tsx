"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import AnimatedText from "@/components/AnimatedText";

const ProjectContent = ({ project, language }: { project: any, language: string }) => {
  const details = language === "vi" ? project.details_vi : project.details_en;
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          {language === "vi" ? project.title_vi : project.title_en}
        </span>{" "}
        {details || (language === "vi" ? "Đang cập nhật nội dung chi tiết cho dự án này..." : "Detailed content for this project is being updated...")}
      </p>
      {project.image_url && (
        <img
          src={project.image_url}
          alt={language === "vi" ? project.title_vi : project.title_en}
          className="md:w-3/4 h-full w-full mx-auto object-cover mt-10 rounded-3xl shadow-2xl"
        />
      )}
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
          No projects found.
        </div>
      )}
    </section>
  );
}
