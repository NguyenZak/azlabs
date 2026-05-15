"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const features = [
  {
    title: "Ultra Fast Performance",
    description: "Our architectures are optimized for speed, ensuring sub-second load times and zero-latency interactions for your users.",
    image: "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/feature_performance_1778842236888.png",
    link: "#",
    reverse: false
  },
  {
    title: "Enterprise Scalability",
    description: "Built for growth. From MVP to millions of users, our systems scale dynamically to meet demand without breaking a sweat.",
    image: "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/feature_scalability_1778842253963.png",
    link: "#",
    reverse: true
  },
  {
    title: "AI-First Integration",
    description: "We embed intelligence into every product. Automate workflows, personalize experiences, and stay ahead with custom AI models.",
    image: "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/feature_ai_1778842270090.png",
    link: "#",
    reverse: false
  }
];

export default function Features() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="space-y-40">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex flex-col ${feature.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
            >
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: feature.reverse ? 30 : -30, filter: "blur(10px)" }}
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
                  {feature.title}
                </h3>
                <p className="text-xl md:text-2xl text-apple-text-secondary font-light leading-relaxed mb-8 max-w-xl">
                  {feature.description}
                </p>
                <a 
                  href={feature.link}
                  className="group inline-flex items-center text-apple-accent text-lg font-medium hover:underline underline-offset-4"
                >
                  Learn more
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
                <div className="relative aspect-[16/10] overflow-hidden rounded-[40px] shadow-2xl">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
