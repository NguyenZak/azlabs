"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AppleIcon } from "@/components/AppleIcon";
import {
  LayoutDashboard,
  Briefcase,
  Settings,
  Layers,
  Cpu,
  LogOut,
  Image as ImageIcon,
  FileText,
  Sparkles
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Toaster } from "react-hot-toast";

const sidebarItems = [

  { icon: LayoutDashboard, label: "Overview", href: "/adminaz/dashboard" },
  { icon: Sparkles, label: "Hero", href: "/adminaz/hero" },
  { icon: FileText, label: "Posts", href: "/adminaz/posts" },
  { icon: Briefcase, label: "Projects", href: "/adminaz/projects" },
  { icon: Layers, label: "Services", href: "/adminaz/services" },
  { icon: Sparkles, label: "Features", href: "/adminaz/features" },
  { icon: Cpu, label: "Tech Stack", href: "/adminaz/tech-stack" },
  { icon: ImageIcon, label: "Media", href: "/adminaz/media" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/adminaz/login");
  };

  // Do not show sidebar on login page
  if (pathname === "/adminaz/login") {
    return <div className="min-h-screen bg-[#f5f5f7]">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-[#f5f5f7]">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-apple-border flex flex-col">
        <div className="p-8 border-b border-apple-border">
          <Link href="/adminaz/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg">
              <AppleIcon icon={Sparkles} className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-apple-text">AZLABS CMS</span>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${pathname === item.href
                ? "bg-black text-white shadow-xl"
                : "text-apple-text-secondary hover:bg-[#f5f5f7] hover:text-apple-text"
                }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-apple-border">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 font-medium transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}
