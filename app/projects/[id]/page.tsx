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
    <main className="min-h-screen bg-white font-apple pb-20">
      {/* ── Fixed Reading Progress ── */}
      <div className="fixed top-0 left-0 w-full h-1 bg-apple-accent z-[100] origin-left scale-x-0" id="reading-progress" />

      {/* ── Top Navigation / Breadcrumb ── */}
      <div className="max-w-[1440px] mx-auto px-6 pt-32 pb-4">
        <nav className="flex items-center gap-2 text-[10px] md:text-[12px] text-apple-text-secondary font-bold tracking-widest uppercase">
          <Link href="/projects" className="hover:text-apple-accent transition-colors">Portfolio</Link>
          <ChevronRight className="w-2.5 h-2.5 opacity-30" />
          <span className="text-apple-text truncate opacity-50">{title}</span>
        </nav>
      </div>

      {/* ── Project Title Section ── */}
      <header className="max-w-[1440px] mx-auto px-6 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-8 space-y-8">
             <div className="flex items-center gap-3">
                <span className="px-4 py-1 bg-apple-accent text-white rounded-full text-[10px] font-bold uppercase tracking-widest leading-none">
                  {category}
                </span>
                <span className="text-apple-text-secondary text-[12px] font-medium uppercase tracking-widest">Case Study</span>
             </div>
             <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight text-apple-text leading-[0.9] font-apple-display">
                {title}
             </h1>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
             <p className="text-xl md:text-2xl text-apple-text-secondary leading-relaxed font-medium">
                {description}
             </p>
          </div>
        </div>
      </header>

      {/* ── Hero Showcase ── */}
      {project.image_url && (
        <section className="max-w-[1440px] mx-auto px-6 mb-32">
          <div className="aspect-[21/9] md:aspect-[21/9] rounded-[48px] overflow-hidden shadow-2xl border border-apple-border relative group">
            <img
              src={project.image_url}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </section>
      )}

      {/* ── Executive Brief (Metadata Grid) ── */}
      <section className="max-w-[1440px] mx-auto px-6 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 p-12 bg-[#f5f5f7] rounded-[48px]">
          <div className="space-y-3">
             <span className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] block">Client</span>
             <span className="text-lg md:text-xl font-bold text-apple-text">{project.client || "Global Partner"}</span>
          </div>
          <div className="space-y-3">
             <span className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] block">Year</span>
             <span className="text-lg md:text-xl font-bold text-apple-text">{date}</span>
          </div>
          <div className="space-y-3">
             <span className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] block">Services</span>
             <span className="text-lg md:text-xl font-bold text-apple-text">Web, AI & Design</span>
          </div>
          <div className="space-y-3">
             <span className="text-[10px] font-bold text-apple-text-secondary uppercase tracking-[0.2em] block">Link</span>
             {project.live_url ? (
               <a href={project.live_url} target="_blank" className="text-lg md:text-xl font-bold text-apple-accent hover:underline flex items-center gap-2">
                 Live Preview <ExternalLink className="w-4 h-4" />
               </a>
             ) : (
               <span className="text-lg md:text-xl font-bold text-apple-text opacity-30 italic">Proprietary</span>
             )}
          </div>
        </div>
      </section>

      {/* ── Main Case Study Content ── */}
      <section className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-24">
        <aside className="lg:col-span-4 space-y-16">
          <div className="sticky top-32 space-y-12">
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-apple-text uppercase tracking-widest border-b border-apple-border pb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-3">
                {(project.tags || ["Next.js", "AI", "Tailwind", "Supabase"]).map((tag: string) => (
                  <span key={tag} className="px-4 py-2 bg-[#f5f5f7] rounded-xl text-sm font-bold text-apple-text hover:bg-black hover:text-white transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-bold text-apple-text uppercase tracking-widest border-b border-apple-border pb-4">Key Achievements</h3>
              <ul className="space-y-4">
                 {[
                   "User Engagement +45%",
                   "Load Time Optimization",
                   "Intuitive UX Architecture",
                   "Enterprise-grade Security"
                 ].map(item => (
                   <li key={item} className="flex items-center gap-3 text-apple-text-secondary text-sm font-medium">
                      <div className="w-1.5 h-1.5 bg-apple-accent rounded-full" />
                      {item}
                   </li>
                 ))}
              </ul>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <div className="space-y-16">
            {/* The Story / Content */}
            <article
              className="
                font-apple
                prose prose-2xl max-w-none
                prose-p:text-[21px] prose-p:md:text-[24px] prose-p:leading-[1.5] prose-p:text-apple-text prose-p:tracking-[-0.011em] prose-p:mb-[32px] prose-p:font-normal
                prose-headings:tracking-tight prose-headings:font-bold prose-headings:text-apple-text
                prose-h2:text-[36px] prose-h2:md:text-[56px] prose-h2:mt-24 prose-h2:mb-12 prose-h2:leading-[1] prose-h2:tracking-tighter
                prose-h3:text-[28px] prose-h3:md:text-[32px] prose-h3:mt-16 prose-h3:mb-8 prose-h3:leading-[1.2] prose-h3:tracking-tight
                prose-blockquote:border-l-[4px] prose-blockquote:border-apple-accent
                prose-blockquote:bg-[#f5f5f7] prose-blockquote:p-12 prose-blockquote:rounded-[48px]
                prose-blockquote:not-italic prose-blockquote:my-20 prose-blockquote:text-apple-text
                prose-strong:text-apple-text prose-strong:font-bold
                prose-img:rounded-[48px] prose-img:my-24 prose-img:w-full prose-img:shadow-[0_40px_80px_rgba(0,0,0,0.1)]
                prose-ul:my-10 prose-li:my-4 prose-li:leading-relaxed prose-li:text-[21px] prose-li:md:text-[24px]
              "
              dangerouslySetInnerHTML={{ __html: details }}
            />

            {!details && (
              <div className="p-16 bg-[#f5f5f7] rounded-[48px] text-center space-y-6">
                <Clock className="w-12 h-12 mx-auto text-apple-accent opacity-20" />
                <h3 className="text-3xl font-bold tracking-tight">Compiling Success...</h3>
                <p className="text-apple-text-secondary text-lg max-w-md mx-auto">
                  We're currently documenting the full strategy and implementation details for this project.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Related Projects ── */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="bg-[#fbfbfd] mt-40 py-40 border-t border-apple-border">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="space-y-4">
                <span className="text-apple-accent font-bold tracking-[0.3em] uppercase text-xs block">Portfolio</span>
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-apple-text leading-none">
                  Discover<br />More Impact.
                </h2>
              </div>
              <Link
                href="/projects"
                className="group flex items-center gap-4 px-10 py-5 bg-black text-white rounded-full font-bold hover:bg-apple-accent transition-all text-xl shadow-2xl"
              >
                Full Portfolio <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {relatedProjects.map((related: any) => {
                const rTitle = lang === "en" ? related.title_en : related.title_vi;
                const rCategory = lang === "en" ? related.category_en : related.category_vi;

                return (
                  <Link key={related.id} href={`/projects/${related.id}`} className="group block space-y-8">
                    <div className="aspect-[16/10] overflow-hidden rounded-[48px] bg-white border border-apple-border group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-700">
                      {related.image_url ? (
                        <img
                          src={related.image_url}
                          alt={rTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#f5f5f7] flex items-center justify-center">
                          <span className="text-4xl font-black text-black/5">AZ</span>
                        </div>
                      )}
                    </div>
                    <div className="px-4 space-y-3">
                      <span className="text-[10px] text-apple-accent font-bold uppercase tracking-[0.2em] block">{rCategory}</span>
                      <h3 className="text-3xl font-bold tracking-tight text-apple-text group-hover:text-apple-accent transition-colors leading-tight">{rTitle}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── High Impact CTA ── */}
      <section className="py-60 px-6 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-16 relative z-10">
          <h2 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.8] text-apple-text">
            Start your<br />own journey.
          </h2>
          <p className="text-xl md:text-3xl text-apple-text-secondary max-w-2xl mx-auto font-medium">
             Ready to transform your vision into a world-class digital reality?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-6 px-16 py-8 bg-apple-accent text-white rounded-full font-bold text-3xl hover:scale-105 transition-all shadow-[0_20px_40px_rgba(0,113,227,0.3)]"
          >
            Work with us <MoveRight className="w-10 h-10" />
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
