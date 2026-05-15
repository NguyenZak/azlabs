import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { constructMetadata } from "@/lib/seo";
import BlogListingClient from "./BlogListingClient";
import JsonLd from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/schema";

export async function generateMetadata() {
  return constructMetadata({
    title: "Tạp chí Công nghệ & Sáng tạo",
    description: "Khám phá những xu hướng công nghệ mới nhất, kiến thức lập trình và giải pháp chuyển đổi số từ đội ngũ chuyên gia AZLABS.",
    url: "/blog",
  });
}

export default async function BlogListingPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Trang chủ", item: "/" },
    { name: "Tạp chí", item: "/blog" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <BlogListingClient initialPosts={posts || []} />
    </>
  );
}
