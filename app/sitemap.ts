import { MetadataRoute } from 'next';
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://azlabs.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/blog",
    "/solutions",
    "/contact",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic routes from Supabase
  const [
    { data: posts },
    { data: projects },
    { data: services },
    { data: solutions }
  ] = await Promise.all([
    supabase.from("posts").select("slug, updated_at").eq("is_published", true),
    supabase.from("projects").select("slug, updated_at"),
    supabase.from("services").select("slug, updated_at"),
    supabase.from("solutions").select("slug, updated_at"),
  ]);

  const dynamicRoutes = [
    ...(posts || []).map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...(projects || []).map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: new Date(project.updated_at || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...(services || []).map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: new Date(service.updated_at || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...(solutions || []).map((solution) => ({
      url: `${SITE_URL}/solutions/${solution.slug}`,
      lastModified: new Date(solution.updated_at || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
