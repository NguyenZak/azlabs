"use client";

import React, { useState, useEffect } from "react";
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
  Sparkles,
  Mail,
  BarChart3,
  Info,
  X
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Toaster } from "react-hot-toast";
import { MobileNav } from "@/components/admin/MobileNav";
import { MobileHeader } from "@/components/admin/MobileHeader";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/adminaz/dashboard" },
  { icon: Settings, label: "Settings", href: "/adminaz/settings" },
  { icon: Sparkles, label: "Hero", href: "/adminaz/hero" },
  { icon: FileText, label: "Posts", href: "/adminaz/posts" },
  { icon: Briefcase, label: "Projects", href: "/adminaz/projects" },
  { icon: Layers, label: "Services", href: "/adminaz/services" },
  { icon: Sparkles, label: "Solutions", href: "/adminaz/solutions" },
  { icon: Sparkles, label: "Features", href: "/adminaz/features" },
  { icon: Cpu, label: "Tech Stack", href: "/adminaz/tech-stack" },
  { icon: Info, label: "About", href: "/adminaz/about" },
  { icon: Mail, label: "Contacts", href: "/adminaz/contacts" },
  { icon: Sparkles, label: "Testimonials", href: "/adminaz/testimonials" },
  { icon: BarChart3, label: "Analytics", href: "/adminaz/analytics" },
  { icon: ImageIcon, label: "Media", href: "/adminaz/media" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/adminaz/login");
  };

  if (pathname === "/adminaz/login") {
    return <div className="min-h-screen bg-black">{children}</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-blue-600 text-white font-mono selection:bg-blue-500/30 selection:text-blue-200">
      <MobileHeader />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop Sidebar / Mobile Drawer Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[45] md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar Component */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 bg-neutral-950 border-r border-neutral-900 flex flex-col transition-transform duration-500 ease-apple md:relative md:translate-x-0 shadow-2xl shadow-blue-500/5 md:shadow-none",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <div className="p-8 border-b border-neutral-900 flex items-center justify-between">
            <Link href="/adminaz/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all">
                <Sparkles className="text-blue-400 w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white uppercase">AZLABS SYS</span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 -mr-2 text-neutral-500 hover:text-white transition-colors md:hidden"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm uppercase tracking-wider font-bold",
                  pathname === item.href
                    ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                    : "text-neutral-500 hover:bg-neutral-900/50 hover:text-white"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-neutral-900">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500/70 hover:text-red-400 hover:bg-red-500/10 font-bold uppercase tracking-wider text-sm transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 pb-24 md:pb-12 bg-black">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <MobileNav onMenuClick={() => setIsSidebarOpen(true)} />
      <Toaster position="bottom-right" />
    </div>
  );
}
