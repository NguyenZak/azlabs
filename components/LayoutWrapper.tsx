"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TechFooter from "@/components/TechFooter";
import SmoothScrollProvider from "@/components/SmoothScroll";

export default function LayoutWrapper({ children, settings }: { children: React.ReactNode, settings: any }) {
  const pathname = usePathname();
  
  // Hide main Website UI elements when in the admin area
  const isAdminPage = pathname?.startsWith("/adminaz");

  const isTechTemplate = settings?.homepage_template === "tech";

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isTechTemplate) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.add("tech-template");
        document.documentElement.style.backgroundColor = "#000000";
        document.body.style.backgroundColor = "#000000";
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.remove("tech-template");
        document.documentElement.style.backgroundColor = "";
        document.body.style.backgroundColor = "";
      }
    }
  }, [isTechTemplate]);

  if (isAdminPage) {
    return <main>{children}</main>;
  }

  return (
    <SmoothScrollProvider>
      <div className={isTechTemplate ? "tech-template min-h-screen bg-black text-white" : ""}>
        <Navbar settings={settings} />
        <main>{children}</main>
        {isTechTemplate ? (
          <TechFooter settings={settings} />
        ) : (
          <Footer settings={settings} />
        )}
      </div>
    </SmoothScrollProvider>
  );
}
