"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

/**
 * AI GROQ ACTIONS (Llama 3.3 70b)
 */
export async function generateAIContent(topic: string) {
  if (!GROQ_API_KEY) {
    throw new Error("Groq API Key is missing. Please add it to your environment variables and restart the server.");
  }

  const prompt = `You are a professional Dual-Language Tech Editor at AZLABS. 
  Write a COMPREHENSIVE blog post about: "${topic}" in BOTH Vietnamese and English.

  Requirements for EACH language:
  - Title: Catchy, SEO-optimized.
  - Excerpt: Engaging 2-3 sentence summary.
  - Body Content: A deep-dive article (1000+ words) with rich HTML (h2, h3, p, strong, blockquote, ul, li).
  
  The tone must be Apple-inspired: sleek, modern, and persuasive.

  Return ONLY a JSON object with the following structure:
  {
    "vi": {
      "title": "...",
      "excerpt": "...",
      "content": "..."
    },
    "en": {
      "title": "...",
      "excerpt": "...",
      "content": "..."
    }
  }
  Note: Return ONLY raw JSON without any additional text.`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a professional blog writer that always returns valid JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API Error Response:", errorData);
      throw new Error(errorData.error?.message || "Groq AI Error");
    }

    const result = await response.json();
    let contentString = result.choices[0].message.content;

    // Clean content in case of markdown formatting
    contentString = contentString.replace(/```json/g, "").replace(/```/g, "").trim();

    const content = JSON.parse(contentString);
    return content;
  } catch (error: any) {
    console.error("Groq AI Error:", error);
    if (error.message === "fetch failed") {
      throw new Error("Network error: Could not reach Groq AI. Please check your internet connection or ensure your GROQ_API_KEY is valid in .env.local and the server has been restarted.");
    }
    throw new Error(error.message || "Failed to generate content from Groq AI.");
  }
}

/**
 * AI SAMPLE GENERATION
 */
export async function generateAISamples(type: "solution" | "feature" | "project" | "service" | "testimonial" | "post" | "hero_slide" | "team_member" | "tech_stack") {
  if (!GROQ_API_KEY) {
    throw new Error("Groq API Key is missing.");
  }

  const prompt = `Generate 3 professional, high-end ${type} items for AZLABS (a premium digital studio).
  AZLABS builds world-class websites, mobile apps, and AI solutions.
  
  Return ONLY a JSON array of objects with this structure:
  ${type === 'solution' ? `
  [{
    "title_en": "...",
    "title_vi": "...",
    "description_en": "Deep technical detail in HTML (h2, p, ul, li)...",
    "description_vi": "Chi tiết kỹ thuật sâu bằng HTML (h2, p, ul, li)...",
    "icon": "Brain",
    "features_en": ["Feature 1", "Feature 2"],
    "features_vi": ["Tính năng 1", "Tính năng 2"],
    "order_index": 0
  }]` : type === 'feature' ? `
  [{
    "title_en": "...",
    "title_vi": "...",
    "description_en": "Compelling story in HTML...",
    "description_vi": "Câu chuyện hấp dẫn bằng HTML...",
    "image_url": "https://images.unsplash.com/photo-...",
    "order_index": 0
  }]` : type === 'service' ? `
  [{
    "title_en": "...",
    "title_vi": "...",
    "description_en": "...",
    "description_vi": "...",
    "image_url": "https://images.unsplash.com/photo-...",
    "features_en": ["Feature 1", "Feature 2"],
    "features_vi": ["Tính năng 1", "Tính năng 2"],
    "order_index": 0
  }]` : type === 'testimonial' ? `
  [{
    "name": "...",
    "role_en": "CEO at TechGlobal",
    "role_vi": "CEO tại TechGlobal",
    "content_en": "...",
    "content_vi": "...",
    "avatar_url": "https://images.unsplash.com/photo-...",
    "company_logo_url": "https://images.unsplash.com/photo-...",
    "rating": 5,
    "order_index": 0
  }]` : type === 'post' ? `
  [{
    "slug": "...",
    "title_en": "...",
    "title_vi": "...",
    "excerpt_en": "...",
    "excerpt_vi": "...",
    "content_en": "HTML content...",
    "content_vi": "HTML content...",
    "image_url": "https://images.unsplash.com/photo-...",
    "is_published": true
  }]` : type === 'hero_slide' ? `
  [{
    "title_en": "...",
    "title_vi": "...",
    "subtitle_en": "...",
    "subtitle_vi": "...",
    "cta_text_en": "View Projects",
    "cta_text_vi": "Xem dự án",
    "cta_link": "/projects",
    "image_url": "https://images.unsplash.com/photo-...",
    "order_index": 0
  }]` : type === 'team_member' ? `
  [{
    "name": "...",
    "role_en": "Lead Developer",
    "role_vi": "Trưởng nhóm phát triển",
    "image": "https://images.unsplash.com/photo-...",
    "order_index": 0
  }]` : type === 'tech_stack' ? `
  [{
    "name": "Next.js",
    "slug": "nextdotjs",
    "category": "Frontend",
    "logo_url": "https://images.unsplash.com/photo-...",
    "order_index": 0
  }]` : type === 'project' ? `
  [{
    "title_en": "...",
    "title_vi": "...",
    "category_en": "...",
    "category_vi": "...",
    "description_en": "...",
    "description_vi": "...",
    "details_en": "HTML content...",
    "details_vi": "HTML content...",
    "image_url": "https://images.unsplash.com/photo-...",
    "order_index": 0
  }]` : `[]`}

  IMPORTANT: 
  - All image_url, avatar_url, company_logo_url, logo_url, image MUST be high-quality, realistic images from Unsplash (https://images.unsplash.com/...).
  - Choose images that match the premium, Apple-inspired aesthetic (minimalist, clean, tech-focused, professional).
  - Use diverse and specific Unsplash IDs for each item.
  - The tone must be Apple-inspired: minimalist, bold, and visionary.
  - Vietnamese must be natural and professional.
  - Description/Details MUST contain rich HTML formatting.
  - Return ONLY raw JSON.`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        response_format: { type: "json_object" }
      })
    });

    const result = await response.json();
    const contentString = result.choices[0].message.content.trim();
    const data = JSON.parse(contentString);
    
    // The model might wrap it in a key or return raw array
    const items = Array.isArray(data) ? data : data.items || Object.values(data)[0];
    
    // Fallback if not an array
    if (!Array.isArray(items)) {
      console.error("AI Seed Error: Result is not an array", items);
      return [];
    }

    return items;
  } catch (error) {
    console.error("AI Seed Error:", error);
    throw new Error("Failed to generate AI samples.");
  }
}

/**
 * AI PARSING FOR BULK INPUT
 */
export async function parseTechWithAI(rawInput: string) {
  if (!GROQ_API_KEY) {
    throw new Error("Groq API Key is missing.");
  }

  const prompt = `
  Analyze the following input which contains SVG code, names, or list of technologies:
  ---
  ${rawInput}
  ---
  
  Extract each technology and return a JSON array of objects with these fields:
  - "name": Official name of the tech (e.g., "Next.js", "PostgreSQL").
  - "slug": SimpleIcons compatible slug (lowercase, no spaces, e.g., "nextdotjs", "postgresql").
  - "category": Choose the MOST accurate from: ["Frontend", "Backend", "Mobile", "Infrastructure", "Database", "AI/ML"].
  - "logo_url": If the input contains a direct SVG/image URL for this tech, use it. Otherwise, use "https://cdn.simpleicons.org/{slug}".

  Return ONLY a raw JSON array. If you can't identify a tech, skip it.
  `;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      }),
    });

    const result = await response.json();
    const content = result.choices[0].message.content;
    const jsonStr = content.match(/\[[\s\S]*\]/)?.[0] || content;
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("AI Parsing Error:", error);
    throw new Error("Failed to parse input with AI.");
  }
}

/**
 * PROJECTS ACTIONS
 */
export async function upsertProject(formData: any) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("projects")
    .upsert({
      id: formData.id || undefined,
      title_en: formData.title_en,
      title_vi: formData.title_vi,
      category_en: formData.category_en,
      category_vi: formData.category_vi,
      description_en: formData.description_en,
      description_vi: formData.description_vi,
      details_en: formData.details_en,
      details_vi: formData.details_vi,
      image_url: formData.image_url,
      client: formData.client,
      live_url: formData.live_url,
      tags: formData.tags,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/projects");
  revalidatePath("/");
  return data;
}

export async function deleteProject(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("projects")
    .delete()
    .match({ id });

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/projects");
  revalidatePath("/");
}

/**
 * POSTS (BLOG) ACTIONS
 */
export async function upsertPost(formData: any) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("posts")
    .upsert({
      id: formData.id || undefined,
      slug: formData.slug,
      title_en: formData.title_en,
      title_vi: formData.title_vi,
      excerpt_en: formData.excerpt_en,
      excerpt_vi: formData.excerpt_vi,
      content_en: formData.content_en,
      content_vi: formData.content_vi,
      image_url: formData.image_url,
      meta_title_en: formData.meta_title_en,
      meta_title_vi: formData.meta_title_vi,
      meta_description_en: formData.meta_description_en,
      meta_description_vi: formData.meta_description_vi,
      is_published: formData.is_published,
      updated_at: new Date().toISOString(),
      published_at: formData.is_published ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/posts");
  revalidatePath("/blog");
  return data;
}

export async function deletePost(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("posts")
    .delete()
    .match({ id });

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/posts");
  revalidatePath("/blog");
}

export async function getProjects() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

/**
 * SOLUTIONS ACTIONS
 */
export async function getSolutions() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("solutions")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function upsertSolution(formData: any) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("solutions")
    .upsert({
      id: formData.id || undefined,
      title_en: formData.title_en,
      title_vi: formData.title_vi,
      description_en: formData.description_en,
      description_vi: formData.description_vi,
      image_url: formData.image_url,
      icon: formData.icon,
      features_en: formData.features_en,
      features_vi: formData.features_vi,
      order_index: formData.order_index || 0,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/solutions");
  revalidatePath("/solutions");
  return data;
}

export async function deleteSolution(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("solutions")
    .delete()
    .match({ id });

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/solutions");
  revalidatePath("/solutions");
}
export async function getServices() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function upsertService(formData: any) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const payload: any = {
    id: formData.id || undefined,
    title_en: formData.title_en,
    title_vi: formData.title_vi,
    description_en: formData.description_en,
    description_vi: formData.description_vi,
    image_url: formData.image_url,
    order_index: formData.order_index || 0,
  };

  // Only add features if the table supports it (safeguard)
  if (formData.features_en && formData.features_en.length > 0) payload.features_en = formData.features_en;
  if (formData.features_vi && formData.features_vi.length > 0) payload.features_vi = formData.features_vi;

  const { data, error } = await supabase
    .from("services")
    .upsert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/services");
  revalidatePath("/");
  return data;
}

export async function deleteService(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("services")
    .delete()
    .match({ id });

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/services");
  revalidatePath("/");
}

/**
 * TECH STACK ACTIONS
 */
export async function upsertTech(formData: any) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("tech_stack")
    .upsert({
      id: formData.id || undefined,
      name: formData.name,
      slug: formData.slug || "",
      logo_url: formData.logo_url,
      category: formData.category,
      order_index: formData.order_index || 0,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/tech-stack");
  revalidatePath("/");
  return data;
}

export async function deleteTech(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("tech_stack")
    .delete()
    .match({ id });

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/tech-stack");
  revalidatePath("/");
}

export async function getTech() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("tech_stack")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function getTestimonials() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching testimonials:", error.message);
    return [];
  }
  return data || [];
}

export async function upsertTestimonial(formData: any) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("testimonials")
    .upsert({
      id: formData.id || undefined,
      name: formData.name,
      role_en: formData.role_en,
      role_vi: formData.role_vi,
      content_en: formData.content_en,
      content_vi: formData.content_vi,
      avatar_url: formData.avatar_url,
      company_logo_url: formData.company_logo_url,
      rating: formData.rating || 5,
      order_index: formData.order_index || 0,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/testimonials");
  revalidatePath("/");
  return data;
}

export async function deleteTestimonial(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("testimonials")
    .delete()
    .match({ id });

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/testimonials");
  revalidatePath("/");
}

export async function getAnalytics() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [
    { count: postsCount },
    { count: projectsCount },
    { count: servicesCount },
    { count: contactsCount },
    { count: mediaCount }
  ] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("contacts").select("*", { count: "exact", head: true }),
    supabase.from("media").select("*", { count: "exact", head: true }),
  ]);

  return {
    posts: postsCount || 0,
    projects: projectsCount || 0,
    services: servicesCount || 0,
    contacts: contactsCount || 0,
    media: mediaCount || 0
  };
}

/**
 * HERO SLIDER ACTIONS
 */
export async function upsertHeroSlide(formData: any) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const payload: any = {
    title_en: formData.title_en,
    title_vi: formData.title_vi,
    subtitle_en: formData.subtitle_en,
    subtitle_vi: formData.subtitle_vi,
    cta_text_en: formData.cta_text_en,
    cta_text_vi: formData.cta_text_vi,
    cta_link: formData.cta_link,
    image_url: formData.image_url,
    order_index: formData.order_index || 0,
  };

  if (formData.id && formData.id.trim() !== "") {
    payload.id = formData.id;
  }

  const { data, error } = await supabase
    .from("hero_slides")
    .upsert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/hero");
  revalidatePath("/");
  return data;
}

export async function deleteHeroSlide(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("hero_slides")
    .delete()
    .match({ id });

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/hero");
  revalidatePath("/");
}

/**
 * MEDIA ACTIONS
 */
export async function getMedia() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function saveMedia(mediaData: any) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("media")
    .insert([mediaData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/adminaz/media");
  return data;
}

export async function deleteMedia(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase
    .from("media")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/adminaz/media");
}

/**
 * FEATURES ACTIONS
 */
export async function getFeatures() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("features")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function upsertFeature(feature: any) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("features")
    .upsert([{
      ...feature,
      text_color: feature.text_color || "text-neutral-900"
    }])
    .select();

  if (error) throw new Error(error.message);
  revalidatePath("/adminaz/features");
  revalidatePath("/");
  return data;
}

export async function deleteFeature(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase
    .from("features")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/adminaz/features");
  revalidatePath("/");
}

/**
 * CONTACTS ACTIONS
 */
export async function getContacts() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function submitContact(formData: any) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("contacts")
    .insert([{
      name: formData.name,
      email: formData.email,
      company: formData.company,
      message: formData.message,
      status: "new"
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/adminaz/contacts");
  return data;
}

export async function updateContactStatus(id: string, status: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("contacts")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/adminaz/contacts");
}

export async function deleteContact(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("contacts")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/adminaz/contacts");
}

export async function getCloudinarySignature() {
  // Signature no longer needed for Unsigned uploads
  return {
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "azlabs",
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  };
}

export async function uploadToCloudinary(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      resource_type: "auto",
      folder: "azlabs",
      format: "webp",
    });
    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
}

/**
 * ABOUT CONTENT ACTIONS
 */
export async function getAboutContent() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("about_content")
    .select("*")
    .maybeSingle();
  
  if (error) {
    console.error("Error fetching about content:", error);
    return null;
  }
  return data;
}

export async function upsertAboutContent(formData: any) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const payload = {
    title_en: formData.title_en,
    title_vi: formData.title_vi,
    subtitle_en: formData.subtitle_en,
    subtitle_vi: formData.subtitle_vi,
    description_en: formData.description_en,
    description_vi: formData.description_vi,
    quote_en: formData.quote_en,
    quote_vi: formData.quote_vi,
    story_title_en: formData.story_title_en,
    story_title_vi: formData.story_title_vi,
    story_content_en: formData.story_content_en,
    story_content_vi: formData.story_content_vi,
    mission_title_en: formData.mission_title_en,
    mission_title_vi: formData.mission_title_vi,
    mission_content_en: formData.mission_content_en,
    mission_content_vi: formData.mission_content_vi,
    values: formData.values,
    image_url: formData.image_url,
    stats: formData.stats,
    updated_at: new Date().toISOString(),
  };

  const { data: existing } = await supabase.from("about_content").select("id").maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("about_content")
      .update(payload)
      .eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("about_content").insert([payload]);
    if (error) throw error;
  }

  revalidatePath("/");
  revalidatePath("/adminaz/about");
}

/**
 * SITE SETTINGS ACTIONS
 */
export async function getSiteSettings() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .maybeSingle();
  
  if (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
  return data;
}

export async function upsertSiteSettings(formData: any) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const payload = {
    site_name: formData.site_name,
    logo_url: formData.logo_url,
    favicon_url: formData.favicon_url,
    phone: formData.phone,
    email: formData.email,
    address_en: formData.address_en,
    address_vi: formData.address_vi,
    working_hours_en: formData.working_hours_en,
    working_hours_vi: formData.working_hours_vi,
    facebook_url: formData.facebook_url,
    instagram_url: formData.instagram_url,
    linkedin_url: formData.linkedin_url,
    twitter_url: formData.twitter_url,
    github_url: formData.github_url,
    copyright_en: formData.copyright_en,
    copyright_vi: formData.copyright_vi,
    homepage_template: formData.homepage_template || "default",
    updated_at: new Date().toISOString(),
  };

  const { data: existing } = await supabase.from("site_settings").select("id").maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("site_settings")
      .update(payload)
      .eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("site_settings").insert([payload]);
    if (error) throw error;
  }

  revalidatePath("/", "layout"); // Revalidate all pages
  revalidatePath("/adminaz/settings");
}

/**
 * TEAM MEMBERS ACTIONS
 */
export async function getTeamMembers() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("order_index", { ascending: true });
  
  if (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
  return data || [];
}

export async function upsertTeamMember(member: any) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Remove empty id to allow Supabase to generate one
  const { id, ...memberData } = member;
  const payload = id ? member : memberData;

  const { data, error } = await supabase
    .from("team_members")
    .upsert([payload])
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/about");
  revalidatePath("/adminaz/about");
  return data;
}

export async function deleteTeamMember(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/about");
  revalidatePath("/adminaz/about");
}
