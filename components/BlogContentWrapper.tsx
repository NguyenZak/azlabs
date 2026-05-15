"use client";

import React, { useEffect, useState } from "react";
import { TracingBeam } from "./ui/tracing-beam";
import { motion, useScroll, useSpring } from "framer-motion";
import { Share2, Link as LinkIcon, User } from "lucide-react";
import { IconBrandTwitter, IconBrandLinkedin, IconBrandFacebook } from "@tabler/icons-react";

interface BlogContentWrapperProps {
  children: React.ReactNode;
  title: string;
  excerpt?: string;
  date: string;
  readTime: number;
  readTimeText: string;
  imageUrl?: string;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: string;
}

export function BlogContentWrapper({
  children,
  title,
  excerpt,
  date,
  readTime,
  readTimeText,
  imageUrl,
  authorName = "AZLABS Team",
  authorRole = "Technology Specialists",
  authorAvatar,
}: BlogContentWrapperProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      {/* ── Reading Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-apple-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          
          {/* ── Floating Social (Desktop) ── */}
          <div className="hidden xl:flex flex-col gap-4 absolute -left-24 top-24">
            {[
              { icon: <IconBrandTwitter className="w-5 h-5" />, label: "Twitter" },
              { icon: <IconBrandLinkedin className="w-5 h-5" />, label: "LinkedIn" },
              { icon: <IconBrandFacebook className="w-5 h-5" />, label: "Facebook" },
            ].map((social) => (
              <button
                key={social.label}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f5f5f7] text-apple-text-secondary hover:bg-black hover:text-white transition-all shadow-sm"
              >
                {social.icon}
              </button>
            ))}
            <button
              onClick={copyLink}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all shadow-sm ${
                copied ? "bg-green-500 text-white" : "bg-[#f5f5f7] text-apple-text-secondary hover:bg-black hover:text-white"
              }`}
            >
              <LinkIcon className="w-4 h-4" />
            </button>
          </div>

          {/* ── Header Section ── */}
          <header className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-apple-accent/10 text-apple-accent rounded-full text-[10px] px-3 py-1 font-bold uppercase tracking-[0.2em]">
                  Magazine
                </span>
                <span className="w-1 h-1 bg-apple-border rounded-full" />
                <span className="text-[12px] text-apple-text-secondary font-medium uppercase tracking-widest">{date}</span>
              </div>

              <h1 className="text-[36px] md:text-[56px] font-bold text-apple-text leading-[1.1] mb-8 font-apple-display tracking-tight">
                {title}
              </h1>

              {excerpt && (
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-apple-accent rounded-full opacity-20" />
                  <p className="text-[20px] md:text-[24px] text-apple-text-secondary leading-relaxed font-light pl-8 py-2">
                    {excerpt}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-6 mt-10 p-4 rounded-[24px] bg-[#f5f5f7]/50 border border-apple-border w-fit">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-apple-accent/10 flex items-center justify-center overflow-hidden border border-apple-border">
                    {authorAvatar ? (
                      <img src={authorAvatar} alt={authorName} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-apple-accent" />
                    )}
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-apple-text">{authorName}</div>
                    <div className="text-[11px] text-apple-text-secondary uppercase tracking-widest">{authorRole}</div>
                  </div>
                </div>
                <div className="w-px h-8 bg-apple-border" />
                <div className="text-[13px] font-medium text-apple-text-secondary flex items-center gap-2">
                   {readTime} {readTimeText}
                </div>
              </div>
            </motion.div>
          </header>

          {/* ── Featured Image ── */}
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-16 group"
            >
              <div className="rounded-[40px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.12)] border border-apple-border aspect-video relative">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          )}

          {/* ── Main Content ── */}
          <div className="text-apple-text mb-24">
            {children}
          </div>

          {/* ── Author Card (Bottom) ── */}
          <footer className="mt-24 border-t border-apple-border pt-16 pb-24">
             <div className="bg-[#f5f5f7] rounded-[48px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-10">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white border-4 border-white shadow-xl">
                  {authorAvatar ? (
                    <img src={authorAvatar} alt={authorName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-apple-accent/5 flex items-center justify-center">
                      <User className="w-12 h-12 text-apple-accent" />
                    </div>
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="text-[12px] font-bold text-apple-accent uppercase tracking-[0.2em] mb-2">Written by</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-apple-text mb-4 tracking-tight">{authorName}</h3>
                  <p className="text-apple-text-secondary leading-relaxed max-w-lg">
                    Expert in software development and digital innovation at AZLABS. Dedicated to building world-class technology solutions.
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
                     {["Twitter", "LinkedIn", "Portfolio"].map(l => (
                       <button key={l} className="text-sm font-bold text-apple-text hover:text-apple-accent transition-colors">{l}</button>
                     ))}
                  </div>
                </div>
             </div>
          </footer>
        </div>
      </TracingBeam>
    </div>
  );
}

