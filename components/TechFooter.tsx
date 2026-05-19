"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { MessageCircle, Image, Link as LinkIcon, Send, Code, Terminal, Activity } from "lucide-react";

export default function TechFooter({ settings }: { settings?: any }) {
  const { dict, language } = useLanguage();

  const address = settings?.[`address_${language}`] || "San Francisco, CA";
  const copyright = settings?.[`copyright_${language}`] || `© ${new Date().getFullYear()} AZLABS. All rights reserved.`;
  const email = settings?.email || "hello@azlabs.com";
  const phone = settings?.phone || "+1 (555) 000-0000";

  const socialLinks = [
    { icon: LinkIcon, href: settings?.linkedin_url, label: "LinkedIn" },
    { icon: Send, href: settings?.twitter_url, label: "X" },
    { icon: Image, href: settings?.instagram_url, label: "Instagram" },
    { icon: Code, href: settings?.github_url, label: "GitHub" },
    { icon: MessageCircle, href: settings?.facebook_url, label: "Facebook" },
  ].filter(link => link.href);

  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-neutral-900 relative overflow-hidden">
      {/* Background ambient glow decoration */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          
          {/* Col 1: Company Links */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block mb-2">
              {dict.nav.company}
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-neutral-400">
              <li><Link href="/about" className="hover:text-white transition-colors">[{dict.nav.about}]</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">[{dict.nav.work}]</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">[{dict.nav.careers}]</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">[{dict.nav.press}]</Link></li>
            </ul>
          </div>

          {/* Col 2: Services Links */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block mb-2">
              {dict.nav.services}
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-neutral-400">
              {dict.services?.items?.slice(0, 4).map((item: any, idx: number) => (
                <li key={idx}>
                  <Link href="/services" className="hover:text-white transition-colors">
                    // {item.title}
                  </Link>
                </li>
              )) || (
                <>
                  <li><Link href="/services" className="hover:text-white transition-colors">// Web Development</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">// Enterprise Portal</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Col 3: Social Badges */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block mb-2">
              {dict.nav.social}
            </span>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-neutral-900 hover:border-neutral-800 hover:bg-neutral-950 flex items-center justify-center text-neutral-400 hover:text-blue-400 transition-all"
                  title={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
              {socialLinks.length === 0 && (
                <div className="flex gap-2">
                  <Link href="#" className="text-xs font-mono text-neutral-400 hover:text-white">LinkedIn</Link>
                  <span className="text-neutral-700">|</span>
                  <Link href="#" className="text-xs font-mono text-neutral-400 hover:text-white">Github</Link>
                </div>
              )}
            </div>
          </div>

          {/* Col 4: Contact Information */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block mb-2">
              {dict.nav.contact}
            </span>
            <ul className="space-y-2 font-mono text-xs text-neutral-400">
              <li className="text-neutral-300 font-semibold">{email}</li>
              <li>{phone}</li>
              <li className="text-[11px] leading-relaxed text-neutral-500">{address}</li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Metadata and System Console */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6">
          
          {/* Logo and Copyright */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-500" />
              <span className="font-mono text-sm font-bold tracking-widest text-white">
                [ AZLABS :: CORE ]
              </span>
            </div>
            <p className="text-[10px] font-mono text-neutral-500">
              {settings?.[`copyright_${language}`] || `© ${new Date().getFullYear()} AZLABS. ${dict.nav.copyrightNotice}`}
            </p>
          </div>

          {/* Live system state logs */}
          <div className="bg-neutral-950 border border-neutral-900 px-4 py-2 rounded-xl flex items-center gap-6 text-[9px] font-mono text-neutral-500 max-w-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-neutral-400 font-bold uppercase">PING SECURE</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-blue-500" />
              <span>LATENCY: 24ms</span>
            </div>
            <span>TLS 1.3</span>
          </div>

          {/* Links */}
          <div className="flex gap-4 font-mono text-[10px] text-neutral-500">
            <Link href="#" className="hover:text-white transition-colors">{dict.nav.privacy}</Link>
            <span>/</span>
            <Link href="#" className="hover:text-white transition-colors">{dict.nav.terms}</Link>
            <span>/</span>
            <Link href="#" className="hover:text-white transition-colors">{dict.nav.cookies}</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
