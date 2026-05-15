"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Wallet, 
  Cpu, 
  ShoppingBag, 
  Activity,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Link from "next/link";
import gsap from "gsap";

const iconMap: any = {
  Wallet: <Wallet className="w-8 h-8" />,
  Cpu: <Cpu className="w-8 h-8" />,
  ShoppingBag: <ShoppingBag className="w-8 h-8" />,
  Activity: <Activity className="w-8 h-8" />,
};

export default function SolutionsPage() {
  const { dict } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-apple-bg pt-[100px] pb-20">
      {/* Page Header */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto mb-32">
        <div className="max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fade-up inline-block text-apple-accent font-bold tracking-[0.2em] uppercase text-sm mb-6"
          >
            {dict.nav.solutions}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="fade-up text-[56px] md:text-[80px] font-bold text-apple-text mb-8 leading-[1.1] tracking-tight"
          >
            {dict.solutions.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="fade-up text-apple-text-secondary text-xl md:text-2xl leading-relaxed"
          >
            {dict.solutions.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Solutions Cards */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {dict.solutions.items.map((solution: any, index: number) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-apple-bg-secondary p-12 rounded-[48px] hover:shadow-2xl transition-all duration-500 group border border-transparent hover:border-apple-accent/10"
            >
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-apple-accent mb-8 shadow-sm group-hover:bg-apple-accent group-hover:text-white transition-all duration-500">
                {iconMap[solution.icon]}
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-apple-text mb-6">
                {solution.title}
              </h2>
              
              <p className="text-apple-text-secondary text-lg mb-10 leading-relaxed h-[80px]">
                {solution.description}
              </p>
              
              <div className="space-y-4 mb-12">
                {solution.features.map((feature: string) => (
                  <div key={feature} className="flex items-center gap-3 text-apple-text/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-apple-accent" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 font-bold text-apple-text group/link"
              >
                Learn More
                <div className="w-10 h-10 rounded-full border border-apple-text/20 flex items-center justify-center group-hover/link:bg-apple-text group-hover/link:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust & Methodology Section */}
      <section className="mt-40 bg-apple-text text-white py-32 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">How We Solve</h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              Our approach combines rigorous engineering with creative problem-solving to deliver measurable business impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8">
                <ShieldCheck className="w-10 h-10 text-apple-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Security First</h3>
              <p className="text-white/50 leading-relaxed">
                We implement bank-grade security protocols across all our digital solutions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8">
                <Zap className="w-10 h-10 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">High Performance</h3>
              <p className="text-white/50 leading-relaxed">
                Optimized for speed, low latency, and seamless global scalability.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8">
                <BarChart3 className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Data Driven</h3>
              <p className="text-white/50 leading-relaxed">
                Integrated analytics and AI insights to track every KPI in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="mt-32 px-6 md:px-12 max-w-[1440px] mx-auto text-center pb-20">
        <div className="border border-apple-border rounded-[48px] p-12 md:p-24">
          <h2 className="text-3xl md:text-5xl font-bold text-apple-text mb-8">
            Ready for a tailored solution?
          </h2>
          <p className="text-apple-text-secondary text-xl mb-12 max-w-2xl mx-auto">
            Book a consultation with our experts to discuss your specific business needs and goals.
          </p>
          <Link
            href="#contact"
            className="inline-block bg-apple-accent text-white px-10 py-5 rounded-full text-xl font-medium hover:bg-apple-accent-hover transition-all"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>
    </div>
  );
}
