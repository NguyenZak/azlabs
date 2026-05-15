import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Share2, Clock, ChevronRight, Tag, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { en } from "@/lib/i18n/dictionaries/en";
import { vi } from "@/lib/i18n/dictionaries/vi";

/* ── SEO Metadata ── */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: project } = await supabase
    .from("projects")
    .select("title_en, title_vi, description_en, description_vi, image_url")
    .eq("id", id)
    .single();

  if (!project) return {};

  const lang = cookieStore.get("language")?.value || "vi";
  const title = (lang === "en" ? project.title_en : project.title_vi);
  const description = (lang === "en" ? project.description_en : project.description_vi);

  return {
    title: `${title} | AZLABS Portfolio`,
    description,
    openGraph: {
      title,
      description,
      images: project.image_url ? [{ url: project.image_url }] : [],
    },
  };
}

/* ── Page ── */
export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const lang = cookieStore.get("language")?.value || "vi";
  const dict = lang === "en" ? en : vi;

  // Fetch current project
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) notFound();

  // Fetch other projects for "Related"
  const { data: relatedProjects } = await supabase
    .from("projects")
    .select("id, title_en, title_vi, category_en, category_vi, image_url")
    .neq("id", id)
    .limit(3);

  const title = lang === "en" ? project.title_en : project.title_vi;
  const category = lang === "en" ? project.category_en : project.category_vi;
  const description = lang === "en" ? project.description_en : project.description_vi;
  const details = (lang === "en" ? project.details_en : project.details_vi) || "";
  
  const date = new Date(project.created_at).toLocaleDateString(lang === "en" ? "en-US" : "vi-VN", {
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-white font-apple">
      {/* ── Breadcrumb ── */}
      <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-4">
        <nav className="flex items-center gap-2 text-[12px] text-apple-text-secondary font-medium tracking-wide">
          <Link href="/" className="hover:underline transition-colors uppercase tracking-widest">{dict.magazine.breadcrumbHome}</Link>
          <ChevronRight className="w-2.5 h-2.5 opacity-30" />
          <Link href="/projects" className="hover:underline transition-colors uppercase tracking-widest">Portfolio</Link>
          <ChevronRight className="w-2.5 h-2.5 opacity-30" />
          <span className="text-apple-text truncate uppercase tracking-widest opacity-50">{title}</span>
        </nav>
      </div>

      {/* ── Project Header ── */}
      <header className="max-w-[1200px] mx-auto px-6 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div className="space-y-6">
            <span className="text-apple-accent font-bold tracking-[0.2em] uppercase text-sm block">
              {category}
            </span>
            <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold tracking-tight leading-[1.05] text-apple-text font-apple-display">
              {title}
            </h1>
          </div>
          
          <div className="space-y-8 pb-4">
            <p className="text-[21px] md:text-[24px] text-apple-text-secondary leading-relaxed font-medium tracking-tight">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-widest block">Date</span>
                <span className="text-sm font-bold text-apple-text">{date}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-widest block">Role</span>
                <span className="text-sm font-bold text-apple-text">Design & Development</span>
              </div>
              {project.tags && project.tags.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-widest block">Stack</span>
                  <div className="flex gap-2">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="text-sm font-bold text-apple-text px-2 py-0.5 bg-apple-bg-secondary rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero Image ── */}
      {project.image_url && (
        <div className="max-w-[1440px] mx-auto px-6 mb-32">
          <div className="aspect-[16/9] rounded-[48px] overflow-hidden shadow-2xl border border-apple-border relative group">
            <img
              src={project.image_url}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
            />
          </div>
        </div>
      )}

      {/* ── Project Details ── */}
      <section className="max-w-[800px] mx-auto px-6 pb-32">
        {details ? (
          <div
            className="
              font-apple
              prose prose-xl max-w-none
              prose-p:text-[21px] prose-p:md:text-[24px] prose-p:leading-[1.47] prose-p:text-apple-text prose-p:tracking-[-0.011em] prose-p:mb-[32px] prose-p:font-normal
              prose-headings:tracking-tight prose-headings:font-bold prose-headings:text-apple-text
              prose-h2:text-[36px] prose-h2:md:text-[42px] prose-h2:mt-20 prose-h2:mb-10 prose-h2:leading-[1.1] prose-h2:tracking-tight
              prose-h3:text-[28px] prose-h3:md:text-[32px] prose-h3:mt-16 prose-h3:mb-6 prose-h3:leading-[1.2] prose-h3:tracking-tight
              prose-blockquote:border-l-[4px] prose-blockquote:border-apple-accent
              prose-blockquote:bg-[#f5f5f7] prose-blockquote:p-12 prose-blockquote:rounded-[40px]
              prose-blockquote:not-italic prose-blockquote:my-16 prose-blockquote:text-apple-text
              prose-strong:text-apple-text prose-strong:font-bold
              prose-a:text-apple-accent prose-a:no-underline prose-a:font-medium
              hover:prose-a:underline
              prose-img:rounded-[32px] prose-img:my-20 prose-img:w-full prose-img:shadow-xl
              prose-ul:my-10 prose-li:my-4 prose-li:leading-relaxed prose-li:text-[21px] prose-li:md:text-[24px] prose-li:tracking-[-0.011em]
            "
            dangerouslySetInnerHTML={{ __html: details }}
          />
        ) : (
          <div className="text-center py-20 space-y-8">
            <div className="w-20 h-20 bg-apple-bg-secondary rounded-full flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8 text-apple-text-secondary opacity-30" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Case Study in Progress</h2>
              <p className="text-apple-text-secondary text-lg max-w-md mx-auto">
                We're currently documenting the full journey of this project. Check back soon for the complete deep dive.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ── Related Projects ── */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="bg-[#fbfbfd] py-40">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="space-y-4">
                <span className="text-apple-accent font-bold tracking-[0.2em] uppercase text-sm block">
                  More Work
                </span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-apple-text leading-none">
                  Exploration<br />Never Ends.
                </h2>
              </div>
              <Link
                href="/projects"
                className="group flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-apple-accent transition-all text-lg shadow-xl"
              >
                View Full Archive <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {relatedProjects.map((related: any) => {
                const rTitle = lang === "en" ? related.title_en : related.title_vi;
                const rCategory = lang === "en" ? related.category_en : related.category_vi;

                return (
                  <Link key={related.id} href={`/projects/${related.id}`} className="group block">
                    <div className="space-y-8">
                      <div className="aspect-[16/10] overflow-hidden rounded-[40px] bg-white border border-apple-border shadow-sm group-hover:shadow-2xl transition-all duration-700">
                        {related.image_url ? (
                          <img
                            src={related.image_url}
                            alt={rTitle}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-apple-accent/5 to-purple-500/5 flex items-center justify-center">
                            <span className="text-4xl font-black text-apple-text/5">AZ</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3 px-2">
                        <span className="text-xs text-apple-accent font-bold uppercase tracking-widest block">
                          {rCategory}
                        </span>
                        <h3 className="text-2xl font-bold tracking-tight text-apple-text group-hover:text-apple-accent transition-colors leading-tight">
                          {rTitle}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
            Have a project<br />in mind?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 px-12 py-6 bg-apple-accent text-white rounded-full font-bold text-2xl hover:scale-105 transition-all shadow-2xl shadow-apple-accent/20"
          >
            Let's build it <MoveRight className="w-8 h-8" />
          </Link>
        </div>
      </section>
    </main>
  );
}

const ArrowRight = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const MoveRight = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 8L22 12L18 16" />
    <path d="M2 12H22" />
  </svg>
);
