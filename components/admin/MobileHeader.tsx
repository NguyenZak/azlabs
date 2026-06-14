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
    <header className="sticky top-0 z-40 md:hidden bg-black/80 backdrop-blur-xl border-b border-neutral-900 h-14 flex items-center px-4 justify-between font-mono">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
          <Sparkles className="text-blue-400 w-4 h-4" />
        </div>
        <span className="font-bold text-sm tracking-tight text-white uppercase">AZLABS</span>
      </div>
      <h1 className="text-xs font-bold text-neutral-400 absolute left-1/2 -translate-x-1/2 uppercase tracking-widest">
        {title}
      </h1>
      <div className="w-8" /> {/* Placeholder for right balance */}
    </header>
  );
}
