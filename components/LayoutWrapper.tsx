"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScroll";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide main Website UI elements when in the admin area
  const isAdminPage = pathname?.startsWith("/adminaz");

  if (isAdminPage) {
    return <main>{children}</main>;
  }

  return (
    <SmoothScrollProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </SmoothScrollProvider>
  );
}
