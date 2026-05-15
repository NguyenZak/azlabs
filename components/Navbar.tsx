"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";


export default function Navbar({ settings }: { settings?: any }) {
  const { dict, language, setLanguage } = useLanguage();
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
    { name: dict.nav.work, href: "/projects" },
    { name: dict.nav.solutions, href: "/solutions" },
    { name: "Magazine", href: "/blog" },
    { name: dict.nav.about, href: "/about" },
    { name: dict.nav.contact, href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[52px] flex items-center bg-white",
        isScrolled ? "border-b border-apple-border shadow-sm" : "border-b border-transparent"
      )}
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt={settings.site_name} className="h-6 w-auto" />
          ) : (
            <span className="text-xl font-bold tracking-tighter text-apple-text">
              {settings?.site_name || "AZLABS"}
            </span>
          )}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[12px] font-normal text-apple-text/70 hover:text-apple-text transition-colors"
            >
              {link.name}
            </Link>
          ))}
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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl font-semibold text-apple-text border-b border-apple-border pb-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
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
