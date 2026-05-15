import { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
  noIndex?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  authorName?: string;
  type?: "website" | "article";
  locale?: "vi_VN" | "en_US";
  alternates?: Metadata["alternates"];
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://azlabs.com";
const DEFAULT_BRAND = "AZLABS";

export function constructMetadata({
  title,
  description,
  image,
  url = "",
  keywords = [],
  noIndex = false,
  publishedAt,
  updatedAt,
  authorName = "AZLABS Team",
  type = "website",
  locale = "vi_VN",
  alternates,
}: SEOProps): Metadata {
  const fullUrl = `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
  const ogImage = image || `${SITE_URL}/default-og.jpg`; // Ensure you have this file in public/

  const baseMetadata: Metadata = {
    title: title ? `${title} | ${DEFAULT_BRAND}` : `${DEFAULT_BRAND} — Premium Digital Studio`,
    description: description || "AZLABS is a premium digital studio crafting world-class websites, mobile apps, and AI solutions.",
    keywords: keywords.length > 0 ? keywords : ["digital studio", "web development", "AI solutions", "AZLABS", "Vietnam tech"],
    alternates: {
      canonical: fullUrl,
      ...alternates,
    },
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: title || DEFAULT_BRAND,
      description: description || "Building the Future of Digital Experience",
      url: fullUrl,
      siteName: DEFAULT_BRAND,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || DEFAULT_BRAND,
        },
      ],
      locale: locale,
      type: type,
    },
    twitter: {
      card: "summary_large_image",
      title: title || DEFAULT_BRAND,
      description: description || "Building the Future of Digital Experience",
      images: [ogImage],
      creator: "@azlabs",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // AI search optimization
    other: {
      "revisit-after": "7 days",
      "author": authorName,
    },
  };

  // Add Article specific metadata
  if (type === "article" && publishedAt) {
    baseMetadata.openGraph = {
      ...baseMetadata.openGraph,
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: updatedAt || publishedAt,
      authors: [authorName],
    };
  }

  return baseMetadata;
}
