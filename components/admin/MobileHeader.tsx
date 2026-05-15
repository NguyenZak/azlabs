"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { AppleIcon } from "@/components/AppleIcon";
import { usePathname } from "next/navigation";

export function MobileHeader() {
  const pathname = usePathname();
  
  // Extract page title from pathname
  const segments = pathname.split("/").filter(Boolean);
  const rawTitle = segments[segments.length - 1] || "Admin";
  const title = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1).replace("-", " ");

  return (
    <header className="sticky top-0 z-40 md:hidden bg-white/80 backdrop-blur-xl border-b border-apple-border h-14 flex items-center px-4 justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <AppleIcon icon={Sparkles} className="text-white w-4 h-4" />
        </div>
        <span className="font-bold text-sm tracking-tight text-apple-text">AZLABS</span>
      </div>
      <h1 className="text-sm font-semibold text-apple-text absolute left-1/2 -translate-x-1/2 uppercase tracking-widest">
        {title}
      </h1>
      <div className="w-8" /> {/* Placeholder for right balance */}
    </header>
  );
}
