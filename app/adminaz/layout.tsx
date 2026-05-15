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
    return <div className="min-h-screen bg-[#f5f5f7]">{children}</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-[#f5f5f7]">
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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar Component */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-apple-border flex flex-col transition-transform duration-500 ease-apple md:relative md:translate-x-0 shadow-2xl md:shadow-none",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <div className="p-8 border-b border-apple-border flex items-center justify-between">
            <Link href="/adminaz/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg">
                <AppleIcon icon={Sparkles} className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-apple-text">AZLABS CMS</span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 -mr-2 text-apple-text-secondary md:hidden"
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
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                  pathname === item.href
                    ? "bg-black text-white shadow-xl"
                    : "text-apple-text-secondary hover:bg-[#f5f5f7] hover:text-apple-text"
                )}
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
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 pb-24 md:pb-12">
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
