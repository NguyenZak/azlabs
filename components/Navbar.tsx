"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Menu, X, Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";


export default function Navbar({ settings }: { settings?: any }) {
  const { dict, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: dict.nav.home, href: "/" },
    { name: dict.nav.services, href: "/services" },
    { name: dict.nav.portfolio, href: "/portfolio" },
    { name: dict.nav.work, href: "/projects" },
    { name: dict.nav.solutions, href: "/solutions" },
    { name: dict.magazine.title, href: "/blog" },
    { name: dict.nav.about, href: "/about" },
    { name: dict.nav.contact, href: "/contact" },
  ];

  const isTechTemplate = settings?.homepage_template === "tech";

  if (isTechTemplate) {
    return (
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[56px] flex items-center bg-black/75 backdrop-blur-md border-b",
          isScrolled ? "border-neutral-900 bg-black/90" : "border-transparent"
        )}
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex gap-0.5">
              <div className="w-2 h-5 bg-[#4285F4] rounded-full transform -rotate-12 group-hover:-rotate-45 transition-transform duration-500" />
              <div className="w-2 h-5 bg-[#EA4335] rounded-full transform rotate-12 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <span className="text-base font-medium font-mono tracking-tight text-neutral-400">
              <span className="font-bold text-white">AzLabs</span>
              <span className="hidden sm:inline ml-1 text-sm opacity-60">// {dict.nav.digitalStudio}</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 font-mono">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[11px] font-bold transition-colors uppercase tracking-wider",
                    isActive ? "text-blue-400" : "text-neutral-400 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA & Lang */}
          <div className="hidden md:flex items-center gap-6 font-mono">
            <button
              onClick={() => setLanguage(language === "en" ? "vi" : "en")}
              className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-widest"
            >
              <Languages className="w-3.5 h-3.5 text-blue-500" />
              {language === "en" ? "VN" : "EN"}
            </button>

            <Link
              href="#contact"
              className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-[10px] font-bold transition-all uppercase tracking-widest border border-blue-500 shadow-md shadow-blue-500/25"
            >
              {dict.nav.cta}
            </Link>
          </div>

          {/* Mobile Toggle & Lang */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setLanguage(language === "en" ? "vi" : "en")}
              className="text-[11px] font-bold text-neutral-400 font-mono"
            >
              {language === "en" ? "VN" : "EN"}
            </button>
            <button
              className="text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-[56px] left-0 right-0 bg-black/95 border-b border-neutral-900 h-screen flex flex-col p-6 gap-6 md:hidden animate-fade-in font-mono">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-xl font-bold border-b border-neutral-900 pb-4 uppercase tracking-wider",
                    isActive ? "text-blue-400" : "text-white"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="#contact"
              className="bg-blue-600 text-white px-6 py-4 rounded text-center font-bold uppercase tracking-wider border border-blue-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              {dict.nav.cta}
            </Link>
          </div>
        )}
      </nav>
    );
  }

  // Classic default Apple layout
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[52px] flex items-center bg-white",
        isScrolled ? "border-b border-apple-border shadow-sm" : "border-b border-transparent"
      )}
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex gap-0.5">
            <div className="w-2 h-5 bg-[#4285F4] rounded-full transform -rotate-12 group-hover:-rotate-45 transition-transform duration-500" />
            <div className="w-2 h-5 bg-[#EA4335] rounded-full transform rotate-12 group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <span className="text-base font-medium text-[#5f6368] tracking-tight">
            <span className="font-bold text-[#1d1d1f]">AzLabs</span>
            <span className="hidden sm:inline ml-1 text-sm opacity-60">{dict.nav.digitalStudio}</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[12px] transition-colors",
                  isActive ? "text-apple-accent font-semibold" : "font-normal text-apple-text/70 hover:text-apple-text"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA & Lang */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => setLanguage(language === "en" ? "vi" : "en")}
            className="flex items-center gap-1.5 text-[11px] font-medium text-apple-text/60 hover:text-apple-text transition-colors uppercase tracking-wider"
          >
            <Languages className="w-3.5 h-3.5" />
            {language === "en" ? "VN" : "EN"}
          </button>

          <Link
            href="#contact"
            className="bg-apple-accent hover:bg-apple-accent-hover text-white px-3 py-1.5 rounded-full text-[11px] font-medium transition-all hover:scale-105 active:scale-95"
          >
            {dict.nav.cta}
          </Link>
        </div>

        {/* Mobile Toggle & Lang */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setLanguage(language === "en" ? "vi" : "en")}
            className="text-[11px] font-bold text-apple-text/60"
          >
            {language === "en" ? "VN" : "EN"}
          </button>
          <button
            className="text-apple-text"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[52px] left-0 right-0 bg-white h-screen flex flex-col p-6 gap-6 md:hidden animate-fade-in">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-2xl border-b border-apple-border pb-4",
                  isActive ? "font-bold text-apple-accent" : "font-semibold text-apple-text"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="#contact"
            className="bg-apple-accent text-white px-6 py-4 rounded-xl text-center font-bold"
            onClick={() => setMobileMenuOpen(false)}
          >
            {dict.nav.cta}
          </Link>
        </div>
      )}
    </nav>
  );
}
