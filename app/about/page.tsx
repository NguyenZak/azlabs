"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Link from "next/link";
import gsap from "gsap";
import { getAboutContent, getSiteSettings, getTeamMembers } from "@/lib/actions/cms";
import { ArrowRight, Star, Heart, Target, Terminal, Shield } from "lucide-react";

export default function AboutPage() {
  const { dict, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [about, team, siteSettings] = await Promise.all([
        getAboutContent(),
        getTeamMembers(),
        getSiteSettings()
      ]);
      setData(about);
      setTeamMembers(team);
      setSettings(siteSettings);
    };
    fetchData();
  }, []);

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
  }, [data]);

  const isTechTemplate = settings?.homepage_template === "tech";

  if (isTechTemplate) {
    return (
      <div className="min-h-screen bg-black text-white pt-[100px] pb-20 overflow-hidden">
        {/* Page Header */}
        <section className="px-6 md:px-12 max-w-[1440px] mx-auto mb-32 relative">
          <div className="max-w-4xl relative z-10">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fade-up inline-block text-blue-400 font-mono font-bold tracking-widest uppercase text-xs mb-6 bg-blue-950/30 px-3 py-1 rounded-full"
            >
              [{dict.nav.about}]
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="fade-up text-[56px] md:text-[80px] font-bold text-white mb-8 leading-[1.1] tracking-tight uppercase"
              dangerouslySetInnerHTML={{ __html: data?.[`title_${language}`] || dict.about.title }}
            />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="fade-up text-neutral-400 font-light text-xl md:text-2xl leading-relaxed max-w-2xl"
            >
              {data?.[`subtitle_${language}`] || dict.about.subtitle}
            </motion.p>
          </div>

          {/* Glowing blur */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-500/5 blur-[140px] rounded-full -z-10" />
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
              <div className="aspect-[4/5] bg-neutral-950 border border-neutral-900 rounded-[32px] overflow-hidden">
                <img 
                  src={data?.image_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop"} 
                  alt="Our Studio" 
                  className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
              </div>
              {/* Floating stats block */}
              <div className="absolute bottom-10 -right-10 bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-2xl hidden md:block">
                <p className="text-4xl font-mono font-bold text-white mb-1">
                  {data?.stats?.[0]?.value || "50+"}
                </p>
                <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider font-bold">
                  {language === "vi" ? (data?.stats?.[0]?.label_vi || "HỆ THỐNG") : (data?.stats?.[0]?.label_en || "SYSTEMS DEPLOYED")}
                </p>
              </div>
            </motion.div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8">
                {data?.[`story_title_${language}`] || dict.about.story.title}
              </h2>
              <div 
                className="text-neutral-400 font-light text-sm md:text-base leading-relaxed mb-8 prose prose-invert"
                dangerouslySetInnerHTML={{ __html: data?.[`story_content_${language}`] || dict.about.story.content }}
              />
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-neutral-950/60 border-t border-b border-neutral-900 py-40 px-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {(data?.values || dict.about.values).map((value: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black border border-neutral-900 p-10 rounded-[32px] hover:border-neutral-800 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-blue-400 mb-8">
                    {index === 0 ? <Star className="w-5 h-5" /> : index === 1 ? <Target className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                    {value?.[`title_${language}`] || value.title}
                  </h3>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">
                    {value?.[`description_${language}`] || value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-40">
          <div className="bg-neutral-950 border border-neutral-900 rounded-[48px] p-12 md:p-20 text-center overflow-hidden relative">
            {/* Ambient indicator strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
            
            <div className="relative z-10 space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block font-bold">
                SYSTEM CORE PURPOSE
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
                {data?.[`mission_title_${language}`] || dict.about.mission.title}
              </h2>
              <div 
                className="text-neutral-400 font-light text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data?.[`mission_content_${language}`] || dict.about.mission.content }}
              />
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
              className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
            >
              {dict.about.team.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-neutral-400 font-light text-lg max-w-2xl mx-auto"
            >
              {dict.about.team.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(teamMembers.length > 0 ? teamMembers : dict.about.team.members).map((member: any, index: number) => (
              <motion.div
                key={member.name || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 bg-neutral-900 border border-neutral-900 relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-102 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-neutral-500 font-mono uppercase tracking-wider text-[10px] font-bold">
                  {language === "vi" ? (member.role_vi || member.role) : (member.role_en || member.role)}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 md:px-12 max-w-[1440px] mx-auto text-center pb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 uppercase tracking-tight">
            {dict.about.journey}
          </h2>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-sm font-mono font-bold hover:bg-blue-500 transition-all uppercase tracking-wider shadow-lg shadow-blue-500/10"
          >
            {dict.nav.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    );
  }

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
            dangerouslySetInnerHTML={{ __html: data?.[`title_${language}`] || dict.about.title }}
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="fade-up text-apple-text-secondary text-xl md:text-2xl leading-relaxed max-w-2xl"
          >
            {data?.[`subtitle_${language}`] || dict.about.subtitle}
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
                src={data?.image_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop"} 
                alt="Our Studio" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            {/* Floating stats */}
            <div className="absolute bottom-10 -right-10 bg-white p-8 rounded-[32px] shadow-2xl border border-apple-border hidden md:block">
              <p className="text-4xl font-bold text-apple-text mb-1">
                {data?.stats?.[0]?.value || "50+"}
              </p>
              <p className="text-apple-text-secondary text-sm font-medium">
                {language === "vi" ? (data?.stats?.[0]?.label_vi || "Dự án") : (data?.stats?.[0]?.label_en || "Global Projects")}
              </p>
            </div>
          </motion.div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-apple-text mb-8">
              {data?.[`story_title_${language}`] || dict.about.story.title}
            </h2>
            <div 
              className="text-apple-text-secondary text-lg md:text-xl leading-relaxed mb-8 prose prose-apple"
              dangerouslySetInnerHTML={{ __html: data?.[`story_content_${language}`] || dict.about.story.content }}
            />
            <div className="w-20 h-[2px] bg-apple-accent" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-apple-bg-secondary py-40 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {(data?.values || dict.about.values).map((value: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-12 rounded-[40px] hover:shadow-xl transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-apple-bg-secondary flex items-center justify-center text-apple-accent mb-8">
                  {index === 0 ? <Star className="w-8 h-8" /> : index === 1 ? <Target className="w-8 h-8" /> : <Heart className="w-8 h-8" />}
                </div>
                <h3 className="text-2xl font-bold text-apple-text mb-4">
                  {value?.[`title_${language}`] || value.title}
                </h3>
                <p className="text-apple-text-secondary leading-relaxed">
                  {value?.[`description_${language}`] || value.description}
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
              {data?.[`mission_title_${language}`] || dict.about.mission.title}
            </h2>
            <div 
              className="text-white/60 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data?.[`mission_content_${language}`] || dict.about.mission.content }}
            />
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
          {(teamMembers.length > 0 ? teamMembers : dict.about.team.members).map((member: any, index: number) => (
            <motion.div
              key={member.name || index}
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
                {language === "vi" ? (member.role_vi || member.role) : (member.role_en || member.role)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto text-center pb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-apple-text mb-8">
          {dict.about.journey}
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
