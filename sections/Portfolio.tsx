"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Portfolio({ data = [] }: { data?: any[] }) {
  const { dict, language } = useLanguage();

  const finalProjects = data.length > 0
    ? data.map((item) => ({
        id: item.id,
        title: language === "vi" ? item.title_vi : item.title_en,
        category: language === "vi" ? item.category_vi : item.category_en,
        image: item.image_url,
      }))
    : dict.projects.items;

  return (
    <section id="projects" className="section-spacing bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[40px] md:text-[56px] leading-tight mb-6 font-bold tracking-tight"
          >
            {dict.projects.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-apple-text-secondary text-lg max-w-2xl leading-relaxed"
          >
            {dict.projects.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {finalProjects.map((project: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-[40px] bg-apple-bg-secondary cursor-pointer ${
                index === 0 || index === 3 ? "md:col-span-7" : "md:col-span-5"
              } aspect-[4/3] md:aspect-auto md:h-[600px]`}
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="overflow-hidden">
                  <p className="text-white/70 text-sm font-bold uppercase tracking-[0.2em] mb-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {project.category}
                  </p>
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-3xl md:text-4xl font-bold text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-200">
                    {project.title}
                  </h3>
                </div>
                
                <div className="mt-8 overflow-hidden">
                  <div className="flex items-center gap-2 text-white font-medium transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-300">
                    <span className="w-10 h-[1px] bg-white/50" />
                    View Case Study
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-apple-text text-white px-12 py-5 rounded-full text-lg font-bold hover:bg-apple-accent transition-all shadow-xl hover:shadow-apple-accent/20"
          >
            {dict.projects.viewAll}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
