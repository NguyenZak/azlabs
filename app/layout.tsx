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

export const metadata: Metadata = {
  title: "AZLABS — Building The Future Of Digital Experience",
  description: "AZLABS is a premium digital studio crafting world-class websites, mobile apps, and AI solutions.",
  openGraph: {
    title: "AZLABS — Building The Future Of Digital Experience",
    description: "AZLABS is a premium digital studio crafting world-class websites, mobile apps, and AI solutions.",
    url: "https://azlabs.com",
    siteName: "AZLABS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased">
        <LanguageProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
