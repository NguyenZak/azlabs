import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Share2, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { en } from "@/lib/i18n/dictionaries/en";
import { vi } from "@/lib/i18n/dictionaries/vi";

/* ── SEO Metadata ── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: post } = await supabase
    .from("posts")
    .select("meta_title_en, meta_title_vi, meta_description_en, meta_description_vi, title_en, title_vi, excerpt_en, excerpt_vi, image_url")
    .eq("slug", slug)
    .single();

  if (!post) return {};

  const lang = cookieStore.get("language")?.value || "vi";
  const title = (lang === "en" ? post.meta_title_en || post.title_en : post.meta_title_vi || post.title_vi);
  const description = (lang === "en" ? post.meta_description_en || post.excerpt_en : post.meta_description_vi || post.excerpt_vi);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: post.image_url ? [{ url: post.image_url }] : [],
    },
  };
}

/* ── Reading time estimator ── */
function getReadingTime(html: string): number {
  const text = html?.replace(/<[^>]*>/g, "") || "";
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/* ── Page ── */
export default async function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const lang = cookieStore.get("language")?.value || "vi";
  const dict = lang === "en" ? en : vi;

  // Fetch current post
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !post) notFound();

  // Fetch related posts (latest 3 excluding current)
  const { data: relatedPosts } = await supabase
    .from("posts")
    .select("id, slug, title_en, title_vi, excerpt_en, excerpt_vi, image_url, published_at, created_at")
    .eq("is_published", true)
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(3);

  const title = lang === "en" ? post.title_en : post.title_vi;
  const excerpt = lang === "en" ? post.excerpt_en : post.excerpt_vi;
  const content = (lang === "en" ? post.content_en : post.content_vi) || "";
  const readTime = getReadingTime(content);
  const date = new Date(post.published_at || post.created_at).toLocaleDateString(lang === "en" ? "en-US" : "vi-VN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-white">
      {/* ── Breadcrumb ── */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-4">
        <nav className="flex items-center gap-2 text-sm text-apple-text-secondary font-medium">
          <Link href="/" className="hover:text-apple-accent transition-colors">{dict.magazine.breadcrumbHome}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-apple-accent transition-colors">{dict.magazine.breadcrumbMagazine}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-apple-text truncate max-w-[200px]">{title}</span>
        </nav>
      </div>

      {/* ── Article Header ── */}
      <header className="max-w-4xl mx-auto px-6 pt-8 pb-16">
        <div className="space-y-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-apple-text-secondary">
            <span className="px-4 py-1.5 bg-apple-accent/10 text-apple-accent rounded-full font-bold text-xs uppercase tracking-wider">
              {dict.magazine.title}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5" /> {date}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5" /> {readTime} {dict.magazine.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-apple-text">
            {title}
          </h1>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-xl md:text-2xl text-apple-text-secondary leading-relaxed max-w-3xl">
              {excerpt}
            </p>
          )}

          {/* Author + Share */}
          <div className="flex items-center justify-between pt-8 border-t border-apple-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-apple-accent to-purple-500 flex items-center justify-center text-white font-black text-sm shadow-lg">
                AZ
              </div>
              <div>
                <p className="font-bold text-apple-text">AZLABS Editorial</p>
                <p className="text-xs text-apple-text-secondary font-medium">{lang === "en" ? "Technology & Design" : "Công nghệ & Thiết kế"}</p>
              </div>
            </div>

            <button
              className="flex items-center gap-2 px-5 py-2.5 bg-[#f5f5f7] rounded-full text-sm font-bold text-apple-text hover:bg-black hover:text-white transition-all"
            >
              <Share2 className="w-4 h-4" /> {dict.magazine.share}
            </button>
          </div>
        </div>
      </header>

      {/* ── Featured Image ── */}
      {post.image_url && (
        <div className="max-w-6xl mx-auto px-6 mb-20">
          <div className="aspect-[2/1] md:aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl border border-apple-border">
            <img
              src={post.image_url}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* ── Article Content ── */}
      <article className="max-w-3xl mx-auto px-6 pb-20">
        <div
          className="
            prose prose-lg md:prose-xl max-w-none
            prose-p:leading-[1.8] prose-p:text-[#1d1d1f]/80
            prose-headings:tracking-tight prose-headings:font-bold prose-headings:text-apple-text
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
            prose-blockquote:border-l-4 prose-blockquote:border-apple-accent
            prose-blockquote:bg-[#f5f5f7] prose-blockquote:p-8 prose-blockquote:rounded-3xl
            prose-blockquote:not-italic prose-blockquote:my-12
            prose-strong:text-apple-text prose-strong:font-extrabold
            prose-a:text-apple-accent prose-a:no-underline prose-a:font-bold
            hover:prose-a:underline
            prose-img:rounded-[32px] prose-img:shadow-xl prose-img:my-12
            prose-ul:my-6 prose-li:my-1
            prose-code:bg-[#f5f5f7] prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:font-medium prose-code:text-sm
            prose-pre:bg-[#1d1d1f] prose-pre:rounded-3xl prose-pre:shadow-xl
          "
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>

      {/* ── Tags / Share Bar ── */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-[#f5f5f7] rounded-[32px]">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-apple-text-secondary uppercase tracking-widest">{dict.magazine.share}</span>
            {["Twitter", "LinkedIn", "Facebook"].map((platform) => (
              <button
                key={platform}
                className="px-4 py-2 bg-white rounded-full text-xs font-bold text-apple-text hover:bg-black hover:text-white transition-all shadow-sm"
              >
                {platform}
              </button>
            ))}
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-bold text-apple-accent hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> {dict.magazine.back}
          </Link>
        </div>
      </div>

      {/* ── Related Articles ── */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-[#fbfbfd] py-32">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="text-apple-accent font-bold tracking-[0.2em] uppercase text-sm mb-3 block">
                  {dict.magazine.relatedTitle}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-apple-text">
                  {dict.magazine.relatedSubtitle}
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden md:flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-apple-accent transition-all text-sm"
              >
                {dict.magazine.viewAll} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((related: any) => {
                const rTitle = lang === "en" ? related.title_en : related.title_vi;
                const rExcerpt = lang === "en" ? related.excerpt_en : related.excerpt_vi;
                const rDate = new Date(related.published_at || related.created_at).toLocaleDateString(lang === "en" ? "en-US" : "vi-VN", {
                  month: "short",
                  day: "numeric",
                });

                return (
                  <Link key={related.id} href={`/blog/${related.slug}`} className="group block">
                    <div className="bg-white rounded-[40px] border border-apple-border overflow-hidden hover:shadow-xl hover:border-apple-accent/20 transition-all">
                      {/* Image */}
                      <div className="aspect-[16/10] overflow-hidden">
                        {related.image_url ? (
                          <img
                            src={related.image_url}
                            alt={rTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-apple-accent/5 to-purple-500/5 flex items-center justify-center">
                            <span className="text-4xl font-black text-apple-text/5">AZ</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <span className="text-xs text-apple-text-secondary font-medium flex items-center gap-1 mb-4">
                          <Calendar className="w-3 h-3" /> {rDate}
                        </span>
                        <h3 className="text-lg font-bold tracking-tight text-apple-text mb-2 group-hover:text-apple-accent transition-colors line-clamp-2 leading-snug">
                          {rTitle}
                        </h3>
                        <p className="text-sm text-apple-text-secondary line-clamp-2 leading-relaxed">
                          {rExcerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Footer ── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[#1d1d1f] text-white p-16 md:p-24 rounded-[48px] relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-apple-accent opacity-10 blur-[100px] rounded-full" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500 opacity-10 blur-[100px] rounded-full" />

            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 bg-apple-accent/20 rounded-[20px] flex items-center justify-center mx-auto">
                <span className="text-2xl font-black text-apple-accent">AZ</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {dict.magazine.ctaTitle}
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
                {dict.magazine.ctaSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-apple-accent hover:text-white transition-all shadow-xl"
                >
                  {dict.magazine.ctaPrimary}
                </Link>
                <Link
                  href="/blog"
                  className="px-10 py-5 bg-white/10 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/10"
                >
                  {dict.magazine.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
