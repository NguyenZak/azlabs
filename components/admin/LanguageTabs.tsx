"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

interface LanguageTabsProps {
  activeLang: "vi" | "en";
  onChange: (lang: "vi" | "en") => void;
}

const LanguageTabs: React.FC<LanguageTabsProps> = ({ activeLang, onChange }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex bg-[#f5f5f7] p-1 rounded-2xl border border-apple-border shadow-inner">
        <button
          onClick={() => onChange("vi")}
          className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
            activeLang === "vi"
              ? "text-black"
              : "text-apple-text-secondary hover:text-apple-text"
          }`}
        >
          {activeLang === "vi" && (
            <motion.div
              layoutId="active-lang-bg"
              className="absolute inset-0 bg-white rounded-xl shadow-sm border border-apple-border"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <span className="text-base">🇻🇳</span> Tiếng Việt
          </span>
        </button>
        <button
          onClick={() => onChange("en")}
          className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
            activeLang === "en"
              ? "text-black"
              : "text-apple-text-secondary hover:text-apple-text"
          }`}
        >
          {activeLang === "en" && (
            <motion.div
              layoutId="active-lang-bg"
              className="absolute inset-0 bg-white rounded-xl shadow-sm border border-apple-border"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <span className="text-base">🇺🇸</span> English
          </span>
        </button>
      </div>
      
      <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
        <Globe className="w-3 h-3" />
        <span className="text-[10px] font-black uppercase tracking-widest">Multi-language Mode</span>
      </div>
    </div>
  );
};

export default LanguageTabs;
