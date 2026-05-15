"use client";

import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const serviceImages = [
  "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_web_dev_1778841031178.png",
  "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_mobile_dev_1778841043651.png",
  "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_ai_solutions_1778841058614.png",
  "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_uiux_design_1778841073172.png",
  "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_saas_systems_1778841086652.png",
  "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/service_cloud_infra_1778841102902.png",
];

const bentoClasses = [
  "lg:col-span-2 lg:row-span-2", // Web
  "lg:col-span-1 lg:row-span-2", // Mobile
  "lg:col-span-1 lg:row-span-1", // AI
  "lg:col-span-1 lg:row-span-2", // Design
  "lg:col-span-1 lg:row-span-1", // SaaS
  "lg:col-span-1 lg:row-span-1", // Cloud
];

export default function Services({ data = [] }: { data?: any[] }) {
  const { dict, language } = useLanguage();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const finalServices = data.length > 0 
    ? data.map((item, index) => ({
        id: item.id,
        title: language === "vi" ? item.title_vi : item.title_en,
        description: language === "vi" ? item.description_vi : item.description_en,
        image: item.image_url || serviceImages[index % serviceImages.length],
        bentoClass: bentoClasses[index % bentoClasses.length] || "lg:col-span-1"
      }))
    : dict.services.items.map((item, index) => ({
        ...item,
        image: serviceImages[index % serviceImages.length],
        bentoClass: bentoClasses[index % bentoClasses.length] || "lg:col-span-1"
      }));

  return (
    <section id="services" className="py-32 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h2 className="text-[56px] md:text-[80px] font-bold tracking-tighter leading-[0.9] text-apple-text mb-8">
              {dict.services.title.split(" ").slice(0, 1).join(" ")}<br />
              {dict.services.title.split(" ").slice(1).join(" ")}
            </h2>
            <p className="text-xl md:text-2xl text-apple-text-secondary leading-relaxed font-light">
              {dict.services.subtitle}
            </p>
          </motion.div>
          
          <Link href="/services" className="group flex items-center gap-4 text-lg font-bold text-apple-text">
            Explore All Services
            <div className="w-12 h-12 rounded-full border border-apple-border flex items-center justify-center group-hover:bg-apple-text group-hover:text-white transition-all">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Bento Grid with Images */}
        <motion.div 
          ref={containerRef} 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
        >
          {finalServices.map((service, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1
                  }
                }
              }}
              className={`group relative overflow-hidden rounded-[40px] border border-apple-border bg-[#fbfbfd] ${service.bentoClass}`}
            >
              {/* Background Image (Always Colored, No Hover Scale) */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${service.image}')` }}
              />
              
              {/* Static Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
              
              <div className="relative z-20 h-full flex flex-col p-10 justify-end">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-lg text-white/80 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <Link 
                  href={`/services#${service.id}`}
                  className="mt-8 flex items-center gap-2 text-white font-bold underline underline-offset-8 decoration-white/30 hover:decoration-white transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
