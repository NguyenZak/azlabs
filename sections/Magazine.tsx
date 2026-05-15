"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Magazine({ posts = [] }: { posts?: any[] }) {
  const { language } = useLanguage();

  if (posts.length === 0) return null;

  // Show latest 3 posts
  const featured = posts[0];
  const rest = posts.slice(1, 4);

  const getTitle = (p: any) => (language === "en" ? p.title_en : p.title_vi) || p.title_en;
  const getExcerpt = (p: any) => (language === "en" ? p.excerpt_en : p.excerpt_vi) || p.excerpt_en;
  const getDate = (p: any) =>
    new Date(p.published_at || p.created_at).toLocaleDateString(language === "en" ? "en-US" : "vi-VN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section id="magazine" className="section-spacing bg-[#fbfbfd]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-apple-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
              Magazine
            </span>
            <h2 className="text-[48px] md:text-[64px] font-bold tracking-tight leading-[1.1] text-apple-text">
              {language === "en" ? "Insights & Ideas" : "Bài viết & Kiến thức"}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/blog"
              className="group flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-apple-accent transition-all"
            >
              {language === "en" ? "View All Articles" : "Xem tất cả"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Featured + Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Post (Large) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="aspect-[4/3] rounded-[48px] overflow-hidden mb-8 relative">
                {featured.image_url ? (
                  <img
                    src={featured.image_url}
                    alt={getTitle(featured)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-apple-accent/10 to-purple-500/10 flex items-center justify-center">
                    <span className="text-6xl font-black text-apple-text/5">AZ</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm text-apple-text-secondary font-medium">
                <span className="px-3 py-1 bg-apple-accent/10 text-apple-accent rounded-full font-bold text-xs uppercase tracking-wider">
                  Featured
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {getDate(featured)}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-apple-text mb-4 group-hover:text-apple-accent transition-colors leading-tight">
                {getTitle(featured)}
              </h3>
              <p className="text-apple-text-secondary text-lg leading-relaxed line-clamp-3">
                {getExcerpt(featured)}
              </p>
            </Link>
          </motion.div>

          {/* Smaller Posts */}
          <div className="space-y-6">
            {rest.map((post: any, i: number) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex gap-6 p-6 bg-white rounded-[32px] border border-apple-border hover:shadow-xl hover:border-apple-accent/20 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-[24px] overflow-hidden shrink-0">
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt={getTitle(post)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-apple-accent/5 to-purple-500/5 flex items-center justify-center">
                        <span className="text-2xl font-black text-apple-text/5">AZ</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="text-xs text-apple-text-secondary font-medium flex items-center gap-1 mb-3">
                      <Calendar className="w-3 h-3" /> {getDate(post)}
                    </span>
                    <h4 className="text-xl font-bold tracking-tight text-apple-text mb-2 group-hover:text-apple-accent transition-colors line-clamp-2 leading-tight">
                      {getTitle(post)}
                    </h4>
                    <p className="text-sm text-apple-text-secondary line-clamp-2 leading-relaxed">
                      {getExcerpt(post)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
