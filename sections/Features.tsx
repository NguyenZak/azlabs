"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
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
  
  if (!data || data.length === 0) return null;

  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="space-y-40">
          {data.map((feature, index) => {
            const isReverse = index % 2 !== 0;
            const title = language === "vi" ? feature.title_vi : feature.title_en;
            const description = language === "vi" ? feature.description_vi : feature.description_en;
            
            return (
              <div 
                key={feature.id}
                className={`flex flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
              >
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: isReverse ? 30 : -30, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    type: "spring",
                    stiffness: 40,
                    damping: 20,
                    mass: 1,
                    delay: 0.1
                  }}
                  className="flex-1 text-left"
                >
                  <h3 className="text-[40px] md:text-[56px] font-bold tracking-tighter leading-tight text-apple-text mb-6">
                    {title}
                  </h3>
                  <p className="text-xl md:text-2xl text-apple-text-secondary font-light leading-relaxed mb-8 max-w-xl">
                    {description}
                  </p>
                  <a 
                    href="#"
                    className="group inline-flex items-center text-apple-accent text-lg font-medium hover:underline underline-offset-4"
                  >
                    {language === "vi" ? "Tìm hiểu thêm" : "Learn more"}
                    <ChevronRight className="ml-1 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </motion.div>

                {/* Image Content */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    type: "spring",
                    stiffness: 30,
                    damping: 15,
                    mass: 1.2,
                    delay: 0.2
                  }}
                  className="flex-1 w-full"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[40px] shadow-2xl bg-gray-100">
                    {feature.image_url && (
                      <img 
                        src={feature.image_url} 
                        alt={title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
