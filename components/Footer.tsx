import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { MessageCircle, Image, Link as LinkIcon, Send, Code } from "lucide-react";

export default function Footer({ settings }: { settings?: any }) {
  const { dict, language } = useLanguage();

  const rawAddress = settings?.[`address_${language}`];
  const address = rawAddress || "47 Vũ Trọng Phụng";
  const copyright = settings?.[`copyright_${language}`] || `© ${new Date().getFullYear()} AZLABS. ${dict.nav.home}.`; // fallback
  const rawEmail = settings?.email;
  const email = (!rawEmail || rawEmail === "hello@azlabs.com") ? "azlabs.it@gmail.com" : rawEmail;
  const rawPhone = settings?.phone;
  const phone = (!rawPhone || rawPhone === "+1 (555) 000-0000" || rawPhone === "+84 123 456 789") ? "0876698333" : rawPhone;

  const socialLinks = [
    { icon: LinkIcon, href: settings?.linkedin_url, label: "LinkedIn" },
    { icon: Send, href: settings?.twitter_url, label: "X (Twitter)" },
    { icon: Image, href: settings?.instagram_url, label: "Instagram" },
    { icon: Code, href: settings?.github_url, label: "GitHub" },
    { icon: MessageCircle, href: settings?.facebook_url, label: "Facebook" },
  ].filter(link => link.href);

  return (
    <footer className="bg-apple-bg-secondary pt-20 pb-10 border-t border-apple-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-apple-text uppercase tracking-wider">{dict.nav.company}</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-[12px] text-apple-text-secondary hover:underline">{dict.nav.about}</Link></li>
              <li><Link href="/projects" className="text-[12px] text-apple-text-secondary hover:underline">{dict.nav.work}</Link></li>
              <li><Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">{dict.nav.careers}</Link></li>
              <li><Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">{dict.nav.press}</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-apple-text uppercase tracking-wider">{dict.nav.services}</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-[12px] text-apple-text-secondary hover:underline">{dict.services.items[0].title}</Link></li>
              <li><Link href="/services" className="text-[12px] text-apple-text-secondary hover:underline">{dict.services.items[1].title}</Link></li>
              <li><Link href="/services" className="text-[12px] text-apple-text-secondary hover:underline">{dict.services.items[2].title}</Link></li>
              <li><Link href="/services" className="text-[12px] text-apple-text-secondary hover:underline">{dict.services.items[3].title}</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-apple-text uppercase tracking-wider">{dict.nav.social}</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-apple-text-secondary hover:text-apple-accent transition-colors"
                  title={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
              {socialLinks.length === 0 && (
                <ul className="space-y-2">
                  <li><Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">LinkedIn</Link></li>
                  <li><Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">Instagram</Link></li>
                </ul>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-apple-text uppercase tracking-wider">{dict.nav.contact}</h4>
            <ul className="space-y-2">
              <li className="text-[12px] text-apple-text-secondary">{email}</li>
              <li className="text-[12px] text-apple-text-secondary">{phone}</li>
              <li className="text-[12px] text-apple-text-secondary">{address}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-apple-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-5 bg-[#4285F4] rounded-full transform -rotate-12" />
                <div className="w-2 h-5 bg-[#EA4335] rounded-full transform rotate-12" />
              </div>
              <span className="text-xl font-medium text-[#5f6368] tracking-tight">
                <span className="font-bold text-[#1d1d1f]">AzLabs</span>
              </span>
            </div>
            <p className="text-[12px] text-apple-text-secondary">
              {settings?.[`copyright_${language}`] || `© ${new Date().getFullYear()} AZLABS. ${dict.nav.copyrightNotice}`}
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">{dict.nav.privacy}</Link>
            <Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">{dict.nav.terms}</Link>
            <Link href="#" className="text-[12px] text-apple-text-secondary hover:underline">{dict.nav.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
