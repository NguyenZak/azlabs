"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Star, Heart, Target } from "lucide-react";

export default function AboutPage() {
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
    <div className="min-h-screen bg-apple-bg pt-[100px] pb-20 overflow-hidden">
      {/* Page Header */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto mb-32 relative">
        <div className="max-w-4xl relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fade-up inline-block text-apple-accent font-bold tracking-[0.2em] uppercase text-sm mb-6"
          >
            {dict.nav.about}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="fade-up text-[56px] md:text-[80px] font-bold text-apple-text mb-8 leading-[1.1] tracking-tight"
          >
            {dict.about.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="fade-up text-apple-text-secondary text-xl md:text-2xl leading-relaxed max-w-2xl"
          >
            {dict.about.subtitle}
          </motion.p>
        </div>

        {/* Decorative background element */}
        <div className="absolute top-0 right-[-10%] w-[60%] h-full bg-apple-accent/5 blur-[120px] rounded-full -z-10" />
      </section>

      {/* Story Section */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-apple-bg-secondary rounded-[48px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop" 
                alt="Our Studio" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            {/* Floating stats */}
            <div className="absolute bottom-10 -right-10 bg-white p-8 rounded-[32px] shadow-2xl border border-apple-border hidden md:block">
              <p className="text-4xl font-bold text-apple-text mb-1">50+</p>
              <p className="text-apple-text-secondary text-sm font-medium">Global Clients</p>
            </div>
          </motion.div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-apple-text mb-8">
              {dict.about.story.title}
            </h2>
            <p className="text-apple-text-secondary text-lg md:text-xl leading-relaxed mb-8">
              {dict.about.story.content}
            </p>
            <div className="w-20 h-[2px] bg-apple-accent" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-apple-bg-secondary py-40 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {dict.about.values.map((value: any, index: number) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-12 rounded-[40px] hover:shadow-xl transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-apple-bg-secondary flex items-center justify-center text-apple-accent mb-8">
                  {index === 0 ? <Star className="w-8 h-8" /> : index === 1 ? <Target className="w-8 h-8" /> : <Heart className="w-8 h-8" />}
                </div>
                <h3 className="text-2xl font-bold text-apple-text mb-4">{value.title}</h3>
                <p className="text-apple-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-40">
        <div className="bg-apple-text text-white rounded-[60px] p-12 md:p-24 text-center overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              {dict.about.mission.title}
            </h2>
            <p className="text-white/60 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              {dict.about.mission.content}
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-40">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-apple-text mb-6"
          >
            {dict.about.team.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-apple-text-secondary text-xl max-w-2xl mx-auto"
          >
            {dict.about.team.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dict.about.team.members.map((member: any, index: number) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] rounded-[40px] overflow-hidden mb-6 bg-apple-bg-secondary">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <h3 className="text-2xl font-bold text-apple-text mb-1 group-hover:text-apple-accent transition-colors">
                {member.name}
              </h3>
              <p className="text-apple-text-secondary font-medium uppercase tracking-wider text-sm">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto text-center pb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-apple-text mb-8">
          Join us on our journey.
        </h2>
        <Link
          href="#contact"
          className="inline-flex items-center gap-3 bg-apple-accent text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-apple-accent-hover transition-all hover:scale-105 shadow-xl hover:shadow-apple-accent/20"
        >
          {dict.nav.cta}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
