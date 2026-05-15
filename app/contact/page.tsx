"use client";

import React from "react";
import Contact from "@/sections/Contact";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ContactPage() {
  const { dict } = useLanguage();

  return (
    <div className="min-h-screen bg-white pt-[100px]">
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="text-apple-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 inline-block">
            {dict.nav.contact}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-apple-text tracking-tight">
            {dict.contact.getInTouch}
          </h1>
        </motion.div>
      </section>
      
      <Contact />
      
      {/* Additional Contact Info */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-32 border-t border-apple-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h3 className="text-xl font-bold mb-6 text-apple-text">{dict.contact.offices.singapore}</h3>
            <p className="text-apple-text-secondary leading-relaxed">
              123 Marina Bay Sands<br />
              Singapore 018956<br />
              +65 6789 0123
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 text-apple-text">{dict.contact.offices.vietnam}</h3>
            <p className="text-apple-text-secondary leading-relaxed">
              456 Le Loi, District 1<br />
              Ho Chi Minh City, 70000<br />
              +84 28 3823 4567
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 text-apple-text">{dict.contact.offices.usa}</h3>
            <p className="text-apple-text-secondary leading-relaxed">
              789 Sand Hill Road<br />
              Menlo Park, CA 94025<br />
              +1 (650) 123-4567
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
