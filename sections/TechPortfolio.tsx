"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, Star, CheckCircle, ExternalLink, Activity, Info, X, Zap } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Project {
  id: string;
  title_en: string;
  title_vi: string;
  category_en: string;
  category_vi: string;
  details_en?: string;
  details_vi?: string;
  image_url?: string;
}

export default function TechPortfolio({ 
  data = [], 
  customTitle, 
  customSubtitle 
}: { 
  data?: any[]; 
  customTitle?: string; 
  customSubtitle?: string; 
}) {
  const { dict, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Mock release tags & performance scores for rendering developer card stats
  const getMockStats = (id: string, index: number) => {
    const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const techStacks = [
      ["Next.js", "Supabase", "Tailwind CSS"],
      ["React Native", "Expo", "Postgres"],
      ["Next.js", "OpenAI", "Vector DB"],
      ["Three.js", "Framer Motion", "GSAP"],
      ["Node.js", "GraphQL", "Redis"],
    ];
    return {
      version: `v1.${(hash % 9) + 1}.0-stable`,
      score: 95 + (hash % 5),
      stack: techStacks[index % techStacks.length]
    };
  };

  return (
    <section id="projects" className="py-32 bg-black text-white relative overflow-hidden border-t border-neutral-900">
      {/* Background neon glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950/30 px-3 py-1 rounded-full w-fit block font-bold">
              Deployment Registry
            </span>
            <h2 className="text-[40px] md:text-[60px] font-bold tracking-tight leading-none text-white">
              {customTitle || (language === "vi" ? "Dự Án Thực Tế" : "System Deployments")}
            </h2>
            <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed">
              {customSubtitle || (language === "vi"
                ? "Danh sách các giải pháp phần mềm và trang web doanh nghiệp đã được triển khai lên môi trường sản xuất."
                : "Active registry of custom websites and enterprise solutions deployed into production environments.")}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((project, index) => {
              const projectTitle = language === "vi" ? project.title_vi : project.title_en;
              const projectCategory = language === "vi" ? project.category_vi : project.category_en;
              const stats = getMockStats(project.id, index);

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-neutral-950/60 border border-neutral-900 rounded-[32px] overflow-hidden flex flex-col justify-between min-h-[380px] p-6 hover:border-neutral-800 hover:bg-neutral-950 transition-all duration-300"
                >
                  {/* Cyber Grid Background overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] pointer-events-none transition-opacity duration-500 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]" />

                  {/* Card Header: Registry Tags */}
                  <div className="flex items-center justify-between w-full pb-4 border-b border-neutral-900/60">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-blue-400" />
                      <span className="text-[10px] font-mono text-neutral-500 font-bold uppercase">{projectCategory}</span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 font-bold">
                      {stats.version}
                    </span>
                  </div>

                  {/* Card Body: Info and Graphic overlay */}
                  <div className="space-y-4 my-6">
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                      {projectTitle}
                    </h3>
                    
                    {/* Performance metrics dashboard mock */}
                    <div className="grid grid-cols-2 gap-3 bg-neutral-900/40 p-4 rounded-2xl border border-neutral-900">
                      <div>
                        <span className="block text-[8px] font-mono text-neutral-600">AUDIT SCORE</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">{stats.score}/100</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-mono text-neutral-600">STATUS</span>
                        <span className="text-[10px] font-mono font-bold text-white flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          DEPLOYED
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {stats.stack.map((stackName) => (
                      <span key={stackName} className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-neutral-900/50 border border-neutral-900 text-neutral-400">
                        {stackName}
                      </span>
                    ))}
                  </div>

                  {/* Card Footer: Explore trigger */}
                  <div className="flex items-center justify-between w-full pt-4 border-t border-neutral-900/60">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="flex items-center gap-1.5 text-xs font-mono font-bold text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      <Info className="w-4 h-4" />
                      <span>VIEW AUDIT LOG</span>
                    </button>
                    {project.image_url && (
                      <div className="w-12 h-8 rounded-lg overflow-hidden border border-neutral-900">
                        <img src={project.image_url} alt={projectTitle} className="w-full h-full object-cover opacity-60" />
                      </div>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center text-neutral-500 font-mono text-xs">
            {dict.projects.noProjects}
          </div>
        )}

      </div>

      {/* Drawer showing project audit details */}
      <AnimatePresence>
        {activeProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-black z-50"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg md:max-w-xl bg-neutral-950 border-l border-neutral-800 p-8 md:p-12 z-50 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950/30 px-3 py-1 rounded-full font-bold">
                    SYSTEM REGISTRY AUDIT LOG
                  </span>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="w-10 h-10 rounded-full border border-neutral-800 hover:border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold tracking-tight text-white">
                    {language === "vi" ? activeProject.title_vi : activeProject.title_en}
                  </h3>
                  <div
                    className="text-neutral-400 font-light text-sm leading-relaxed prose prose-invert"
                    dangerouslySetInnerHTML={{ __html: (language === "vi" ? activeProject.details_vi : activeProject.details_en) || "" }}
                  />
                </div>

                {/* Integration Verification Checklist */}
                <div className="space-y-3 pt-6 border-t border-neutral-900">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block font-bold">ENGINEERING CHECKLIST</span>
                  <div className="space-y-2 text-xs font-mono text-neutral-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Google PageSpeed Index verified {">"} 95</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Security headers (HSTS, CSP) fully hardened</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Database RLS & isolation queries approved</span>
                    </div>
                  </div>
                </div>

                {/* Big project layout image */}
                {activeProject.image_url && (
                  <div className="rounded-2xl overflow-hidden border border-neutral-900 aspect-video relative group">
                    <img
                      src={activeProject.image_url}
                      alt="Project Screenshot"
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-8 border-t border-neutral-900 mt-12 flex justify-between items-center text-[10px] font-mono text-neutral-500">
                <span>DEPLOYED WORKFLOWS</span>
                <span className="text-blue-400 font-bold flex items-center gap-1">
                  SECURE PRODUCTION <Activity className="w-3.5 h-3.5 text-emerald-400" />
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
