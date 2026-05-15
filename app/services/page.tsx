"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  BrainCircuit, 
  Palette, 
  Database, 
  Cloud,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Link from "next/link";
import gsap from "gsap";

import { AppleIcon } from "@/components/AppleIcon";

const icons: any = {
  web: (props: any) => <AppleIcon icon={Globe} {...props} />,
  mobile: (props: any) => <AppleIcon icon={Smartphone} {...props} />,
  ai: (props: any) => <AppleIcon icon={BrainCircuit} {...props} />,
  design: (props: any) => <AppleIcon icon={Palette} {...props} />,
  saas: (props: any) => <AppleIcon icon={Database} {...props} />,
  cloud: (props: any) => <AppleIcon icon={Cloud} {...props} />,
};

export default function ServicesPage() {
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
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto mb-20 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fade-up inline-block text-apple-accent font-bold tracking-[0.2em] uppercase text-sm mb-6"
        >
          {dict.nav.services}
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="fade-up text-[48px] md:text-[72px] font-bold text-apple-text mb-8 leading-tight tracking-tight"
        >
          {dict.services.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="fade-up text-apple-text-secondary text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
        >
          {dict.services.subtitle}
        </motion.p>
      </section>

      {/* Services Detailed List */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto space-y-12">
        {dict.services.items.map((service: any, index: number) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 p-8 md:p-16 bg-apple-bg-secondary rounded-[48px] overflow-hidden group border border-transparent hover:border-apple-accent/20 transition-all duration-700`}
          >
            {/* Visual Part */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-video rounded-[32px] bg-white shadow-xl flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-apple-accent/5 to-transparent" />
              <div className="relative z-10 text-apple-accent transform group-hover:scale-110 transition-transform duration-700">
                {React.createElement(icons[service.id], { size: 48 })}
              </div>
              {/* Abstract decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-apple-accent/5 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-apple-accent/5 rounded-full" />
            </div>

            {/* Content Part */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-apple-text mb-6">
                {service.title}
              </h2>
              <p className="text-apple-text-secondary text-lg mb-8 leading-relaxed">
                {service.details}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {service.features.map((feature: string) => (
                  <div key={feature} className="flex items-center gap-3 text-apple-text/80">
                    <CheckCircle2 className="w-5 h-5 text-apple-accent shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-apple-text text-white px-8 py-4 rounded-full font-medium hover:bg-apple-accent transition-all hover:scale-105 active:scale-95"
              >
                {dict.nav.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA Bottom Section */}
      <section className="mt-32 px-6 md:px-12 max-w-[1440px] mx-auto text-center">
        <div className="bg-apple-text text-white rounded-[48px] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] bg-repeat" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Ready to transform your vision?
            </h2>
            <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">
              Let's build something exceptional together. Our team is ready to bring your ideas to life with precision and craft.
            </p>
            <Link
              href="#contact"
              className="inline-block bg-apple-accent text-white px-10 py-5 rounded-full text-xl font-medium hover:bg-apple-accent-hover transition-all hover:scale-105"
            >
              {dict.nav.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
