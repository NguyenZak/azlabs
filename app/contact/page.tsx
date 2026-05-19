"use client";

import React, { useEffect, useState } from "react";
import Contact from "@/sections/Contact";
import TechContact from "@/sections/TechContact";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getSiteSettings } from "@/lib/actions/cms";

export default function ContactPage() {
  const { dict } = useLanguage();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  const isTechTemplate = settings?.homepage_template === "tech";

  if (isTechTemplate) {
    return (
      <div className="min-h-screen bg-black text-white pt-[100px]">
        <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="text-blue-400 font-mono font-bold tracking-widest uppercase text-xs mb-4 inline-block bg-blue-950/30 px-3 py-1 rounded-full">
              [{dict.nav.contact}]
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase">
              {dict.contact.getInTouch}
            </h1>
          </motion.div>
        </section>

        <TechContact settings={settings} />

        {/* Additional Contact Info */}
        <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-32 border-t border-neutral-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 font-mono text-xs text-neutral-400">
            <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl">
              <h3 className="text-sm font-bold mb-4 text-white uppercase">
                // {dict.contact.offices.singapore}
              </h3>
              <p className="leading-relaxed text-neutral-400">
                123 Marina Bay Sands<br />
                Singapore 018956<br />
                +65 6789 0123
              </p>
            </div>
            <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl">
              <h3 className="text-sm font-bold mb-4 text-white uppercase">
                // {dict.contact.offices.vietnam}
              </h3>
              <p className="leading-relaxed text-neutral-400">
                456 Le Loi, District 1<br />
                Ho Chi Minh City, 70000<br />
                +84 28 3823 4567
              </p>
            </div>
            <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl">
              <h3 className="text-sm font-bold mb-4 text-white uppercase">
                // {dict.contact.offices.usa}
              </h3>
              <p className="leading-relaxed text-neutral-400">
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
