"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Image as ImageIcon, 
  Menu 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  onMenuClick: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/adminaz/dashboard" },
  { icon: FileText, label: "Posts", href: "/adminaz/posts" },
  { icon: Briefcase, label: "Projects", href: "/adminaz/projects" },
  { icon: ImageIcon, label: "Media", href: "/adminaz/media" },
];

export function MobileNav({ onMenuClick }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-black/80 backdrop-blur-xl border-t border-neutral-900 md:hidden safe-area-inset-bottom font-mono">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all duration-300",
                isActive ? "text-blue-400 scale-110 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" : "text-neutral-500 hover:text-white"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "fill-current")} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={onMenuClick}
          className="flex flex-col items-center justify-center gap-1 text-neutral-500 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">More</span>
        </button>
      </div>
    </nav>
  );
}
