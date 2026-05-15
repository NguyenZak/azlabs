"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials({ data = [] }: { data?: any[] }) {
  const displayData = data.length > 0 ? data : [
    {
      content_en: "AZLABS transformed our digital presence completely. Their attention to detail and premium design sense is unmatched in the industry.",
      name: "James Wilson",
      role_en: "CEO, FinStream",
      avatar_url: "https://i.pravatar.cc/150?u=james",
      rating: 5
    },
    {
      content_en: "The AI solutions provided by AZLABS allowed us to automate 40% of our operations while maintaining a high-end user experience.",
      name: "Sarah Chen",
      role_en: "Director of Product, Nexa",
      avatar_url: "https://i.pravatar.cc/150?u=sarah",
      rating: 5
    },
    {
      content_en: "Working with AZLABS felt like working with a partner who cared as much about our brand as we did. Truly world-class.",
      name: "Michael Ross",
      role_en: "Founder, Aura",
      avatar_url: "https://i.pravatar.cc/150?u=michael",
      rating: 5
    },
  ];

  return (
    <section className="section-spacing bg-apple-bg overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-[32px] md:text-[56px] font-bold tracking-tight text-apple-text">
            What our partners say.
          </h2>
          <p className="text-apple-text-secondary text-lg md:text-xl mt-4">Trusted by visionary teams worldwide.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {displayData.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-10 md:p-12 rounded-[48px] border border-apple-border flex flex-col justify-between h-full group hover:shadow-2xl transition-all duration-500"
            >
              <div>
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-medium text-apple-text mb-12 leading-relaxed tracking-tight">
                  "{t.content_en}"
                </p>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-apple-bg-secondary group-hover:scale-105 transition-transform duration-500">
                  <img 
                      src={t.avatar_url || t.avatar} 
                      alt={t.name} 
                      className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-apple-text text-lg">{t.name}</h4>
                  <p className="text-sm font-medium text-apple-text-secondary uppercase tracking-widest mt-1">
                    {t.role_en}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
