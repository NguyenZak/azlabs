"use client";

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "AZLABS transformed our digital presence completely. Their attention to detail and premium design sense is unmatched in the industry.",
    author: "James Wilson",
    role: "CEO, FinStream",
    avatar: "https://i.pravatar.cc/150?u=james",
  },
  {
    text: "The AI solutions provided by AZLABS allowed us to automate 40% of our operations while maintaining a high-end user experience.",
    author: "Sarah Chen",
    role: "Director of Product, Nexa",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    text: "Working with AZLABS felt like working with a partner who cared as much about our brand as we did. Truly world-class.",
    author: "Michael Ross",
    role: "Founder, Aura",
    avatar: "https://i.pravatar.cc/150?u=michael",
  },
];

export default function Testimonials() {
  return (
    <section className="section-spacing bg-apple-bg">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <h2 className="text-center text-[32px] md:text-[48px] mb-20">
          What our partners say.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="glass p-10 rounded-[32px] border border-apple-border flex flex-col justify-between h-full"
            >
              <p className="text-xl italic text-apple-text mb-12 leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                    src={t.avatar} 
                    alt={t.author} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-apple-accent/20"
                />
                <div>
                  <h4 className="font-bold text-apple-text">{t.author}</h4>
                  <p className="text-sm text-apple-text-secondary">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
