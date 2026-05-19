import type { Metadata } from "next";
import { Inter, Geist, Plus_Jakarta_Sans, Space_Grotesk, Orbitron } from "next/font/google";
import "@/styles/globals.css";
import SmoothScrollProvider from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "react-hot-toast";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


import { constructMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: settings } = await supabase.from("site_settings").select("*").maybeSingle();

  return constructMetadata({
    title: settings?.site_name,
    description: settings?.default_meta_description_vi || settings?.default_meta_description_en,
    image: settings?.default_og_image || settings?.logo_url,
    keywords: settings?.keywords,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: settings } = await supabase.from("site_settings").select("*").maybeSingle();
  
  const orgSchema = generateOrganizationSchema();
  const siteSchema = generateWebSiteSchema();

  return (
    <html lang="vi" className={cn(inter.variable, "font-sans", geist.variable, plusJakarta.variable, spaceGrotesk.variable, orbitron.variable)}>
      <head>
        <JsonLd data={orgSchema} />
        <JsonLd data={siteSchema} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
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
