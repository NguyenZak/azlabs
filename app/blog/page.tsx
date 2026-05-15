"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, ArrowLeft, Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { createClient } from "@/utils/supabase/client";

export default function BlogListingPage() {
  const { dict, language } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient();
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const getTitle = (p: any) => (language === "en" ? p.title_en : p.title_vi) || p.title_en;
  const getExcerpt = (p: any) => (language === "en" ? p.excerpt_en : p.excerpt_vi) || p.excerpt_en;
  const getDate = (p: any) =>
    new Date(p.published_at || p.created_at).toLocaleDateString(language === "en" ? "en-US" : "vi-VN", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const filtered = posts.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (p.title_en || "").toLowerCase().includes(q) ||
      (p.title_vi || "").toLowerCase().includes(q) ||
      (p.excerpt_en || "").toLowerCase().includes(q)
    );
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-white pt-[100px]">
      {/* Page Header */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-apple-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 inline-block">
            {dict.magazine.title}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-apple-text tracking-tight mb-6">
            {dict.magazine.insights}
          </h1>
          <p className="text-apple-text-secondary text-xl max-w-2xl mx-auto leading-relaxed">
            {dict.magazine.subtitle}
          </p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-xl mx-auto mb-20">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-apple-text-secondary" />
            <input
              type="text"
              placeholder={dict.magazine.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#f5f5f7] rounded-full pl-14 pr-8 py-5 font-medium focus:outline-none focus:ring-2 focus:ring-apple-accent/20 transition-all text-lg"
            />
          </div>
        </motion.div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <div className="w-10 h-10 border-4 border-apple-border border-t-apple-accent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-32 px-6">
          <p className="text-apple-text-secondary text-xl">
            {dict.magazine.noArticles}
          </p>
        </div>
      ) : (
        <section className="px-6 md:px-12 max-w-[1440px] mx-auto pb-32">
          {/* Featured Post */}
          {featured && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#fbfbfd] p-8 md:p-16 rounded-[48px] border border-apple-border hover:border-apple-accent/20 hover:shadow-2xl transition-all">
                  {/* Image */}
                  <div className="aspect-[4/3] rounded-[32px] overflow-hidden">
                    {featured.image_url ? (
                      <img
                        src={featured.image_url}
                        alt={getTitle(featured)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-apple-accent/10 to-purple-500/10 flex items-center justify-center">
                        <span className="text-8xl font-black text-apple-text/5">AZ</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-apple-accent/10 text-apple-accent rounded-full font-bold text-xs uppercase tracking-wider">
                        Featured
                      </span>
                      <span className="flex items-center gap-1 text-sm text-apple-text-secondary font-medium">
                        <Calendar className="w-3.5 h-3.5" /> {getDate(featured)}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-apple-text leading-tight group-hover:text-apple-accent transition-colors">
                      {getTitle(featured)}
                    </h2>

                    <p className="text-apple-text-secondary text-lg leading-relaxed line-clamp-3">
                      {getExcerpt(featured)}
                    </p>

                    <div className="flex items-center gap-3 text-apple-accent font-bold group-hover:gap-4 transition-all">
                      {dict.magazine.readArticle}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid of Other Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post: any, i: number) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="bg-white rounded-[40px] border border-apple-border overflow-hidden hover:shadow-xl hover:border-apple-accent/20 transition-all h-full flex flex-col">
                    {/* Image */}
                    <div className="aspect-[16/10] overflow-hidden">
                      {post.image_url ? (
                        <img
                          src={post.image_url}
                          alt={getTitle(post)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-apple-accent/5 to-purple-500/5 flex items-center justify-center">
                          <span className="text-4xl font-black text-apple-text/5">AZ</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-1">
                      <span className="text-xs text-apple-text-secondary font-medium flex items-center gap-1 mb-4">
                        <Calendar className="w-3 h-3" /> {getDate(post)}
                      </span>

                      <h3 className="text-xl font-bold tracking-tight text-apple-text mb-3 group-hover:text-apple-accent transition-colors line-clamp-2 leading-tight">
                        {getTitle(post)}
                      </h3>

                      <p className="text-sm text-apple-text-secondary line-clamp-3 leading-relaxed flex-1">
                        {getExcerpt(post)}
                      </p>

                      <div className="flex items-center gap-2 text-apple-accent font-bold text-sm mt-6 group-hover:gap-3 transition-all">
                        {dict.magazine.readMore}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
