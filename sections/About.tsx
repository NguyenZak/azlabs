"use client";

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="section-spacing bg-apple-bg-secondary overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-apple-accent font-bold tracking-widest uppercase text-sm"
            >
                Our Philosophy
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-[40px] md:text-[64px] leading-[1.1] text-apple-text"
            >
                Beyond code.<br />We build legacy.
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-apple-text-secondary text-xl leading-relaxed max-w-xl"
            >
                AZLABS is a technology-driven digital studio focused on creating world-class 
                digital products and premium user experiences. We believe that technology 
                should be as beautiful as it is functional.
            </motion.p>
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex gap-12 pt-8"
            >
                <div>
                    <p className="text-[48px] font-bold text-apple-text">50+</p>
                    <p className="text-apple-text-secondary">Projects Delivered</p>
                </div>
                <div>
                    <p className="text-[48px] font-bold text-apple-text">12</p>
                    <p className="text-apple-text-secondary">Global Awards</p>
                </div>
            </motion.div>
          </div>
          
          <div className="relative">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="aspect-[3/4] rounded-[48px] overflow-hidden shadow-2xl"
            >
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2601&auto=format&fit=crop" 
                    alt="AZLABS Office" 
                    className="w-full h-full object-cover"
                />
            </motion.div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 glass rounded-[40px] p-8 hidden md:block animate-bounce-slow">
                <p className="text-apple-text font-medium text-lg italic">
                    "Precision is not an act, it's a habit."
                </p>
                <p className="mt-4 text-apple-text-secondary text-sm">— AZLABS Vision</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
