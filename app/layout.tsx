import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import SmoothScrollProvider from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});


import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "react-hot-toast";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: settings } = await supabase.from("site_settings").select("*").maybeSingle();

  return {
    title: settings?.site_name || "AZLABS — Building The Future Of Digital Experience",
    description: "AZLABS is a premium digital studio crafting world-class websites, mobile apps, and AI solutions.",
    icons: settings?.favicon_url ? [{ rel: "icon", url: settings.favicon_url }] : [],
    openGraph: {
      title: settings?.site_name || "AZLABS",
      images: settings?.logo_url ? [{ url: settings.logo_url }] : [],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: settings } = await supabase.from("site_settings").select("*").maybeSingle();
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased">
        <LanguageProvider>
          <AnalyticsTracker />
          <LayoutWrapper settings={settings}>
            {children}
          </LayoutWrapper>
          <Toaster position="bottom-right" />
        </LanguageProvider>
      </body>
    </html>
  );
}
