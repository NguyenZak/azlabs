"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Calendar, ArrowUpRight, Activity } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TechMagazine({ posts = [] }: { posts?: any[] }) {
  const { dict, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (posts.length === 0 || !mounted) return null;

  // Use latest 3 or 4 posts
  const displayPosts = posts.slice(0, 4);

  const getTitle = (p: any) => (language === "en" ? p.title_en : p.title_vi) || p.title_en;
  const getExcerpt = (p: any) => (language === "en" ? p.excerpt_en : p.excerpt_vi) || p.excerpt_en;
  const getDate = (p: any) =>
    new Date(p.published_at || p.created_at).toLocaleDateString(language === "en" ? "en-US" : "vi-VN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section id="magazine" className="py-32 bg-black text-white relative overflow-hidden border-t border-neutral-900">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div className="space-y-4 max-w-2xl text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950/30 px-3 py-1 rounded-full w-fit block font-bold">
              {dict.magazine.title}
            </span>
            <h2 className="text-[40px] md:text-[60px] font-bold tracking-tight leading-none text-white">
              {dict.magazine.insights}
            </h2>
          </div>

          <Link
            href="/blog"
            className="group flex items-center gap-2 border border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-white px-6 py-3 rounded-xl font-mono text-xs font-bold transition-all uppercase tracking-wider"
          >
            <span>{dict.magazine.viewAllArticles}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Server Stream Timeline Feed Layout */}
        <div className="space-y-6">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">SYSTEM_LOG_STREAM</span>
          {displayPosts.map((post: any, index: number) => {
            const title = getTitle(post);
            const excerpt = getExcerpt(post);
            const date = getDate(post);
            // Simulated log event properties
            const logCategory = index === 0 ? "FEATURED_INSIGHT" : "SYS_UPDATE";

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative block p-6 md:p-8 bg-neutral-950/40 border border-neutral-900 rounded-2xl hover:border-neutral-800 hover:bg-neutral-950 transition-all duration-300 overflow-hidden"
                >
                  {/* Glowing vertical marker */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-neutral-800 group-hover:bg-blue-500 transition-colors duration-300" />
                  
                  {/* Subtle holographic laser line sweep on hover */}
                  <div className="absolute inset-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent -top-1 group-hover:animate-sweep pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    
                    {/* Col 1: System Date & Logs info */}
                    <div className="lg:col-span-3 flex flex-row lg:flex-col justify-between lg:justify-center gap-2 border-r border-neutral-900/60 pr-6">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-[10px] font-mono font-bold text-neutral-400">
                          [{logCategory}]
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1.5 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-neutral-600" /> {date}
                      </span>
                    </div>

                    {/* Col 2: Blog contents */}
                    <div className="lg:col-span-7 space-y-2">
                      <h4 className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors leading-tight">
                        {title}
                      </h4>
                      <p className="text-neutral-400 text-xs font-light leading-relaxed line-clamp-2">
                        {excerpt}
                      </p>
                    </div>

                    {/* Col 3: Thumbnail preview */}
                    <div className="lg:col-span-2 flex justify-end">
                      {post.image_url ? (
                        <div className="w-24 h-16 rounded-lg overflow-hidden border border-neutral-900">
                          <img
                            src={post.image_url}
                            alt={title}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-16 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center font-mono text-[10px] text-neutral-600 font-bold uppercase">
                          No Img
                        </div>
                      )}
                    </div>

                  </div>

                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>

      <style jsx global>{`
        @keyframes sweep {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .group:hover .group-hover\\:animate-sweep {
          animation: sweep 1.5s linear infinite;
        }
      `}</style>

    </section>
  );
}
