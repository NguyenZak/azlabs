import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co https://vercel.live;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.live;
              img-src 'self' data: https://*.supabase.co https://images.unsplash.com https://res.cloudinary.com https://vercel.com https://vercel.live https://cdn.simpleicons.org;
              font-src 'self' data: https://fonts.gstatic.com;
              connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vercel.live https://*.pusher.com wss://*.pusher.com;
              frame-src 'self' https://vercel.live;
              frame-ancestors 'none';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
