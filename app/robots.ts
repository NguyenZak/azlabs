import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://azlabs.com";
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/adminaz', // Disallow admin area
        '/api/',    // Disallow internal API routes
        '/private/',
        '/*?*',     // Disallow search queries to prevent duplicate content
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
