"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

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
    console.error("Groq AI Error:", error.message);
    throw new Error(error.message || "Failed to generate content from Groq AI.");
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
      image_url: formData.image_url,
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

/**
 * SERVICES ACTIONS
 */
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
      logo_url: formData.logo_url,
      category: formData.category,
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
    .upsert([feature])
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

/**
 * CLOUDINARY SIGNATURE (For Signed Uploads)
 */
export async function getCloudinarySignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "azlabs";
  
  if (!apiSecret) {
    throw new Error("Cloudinary API Secret is missing");
  }

  // Parameters to sign (must be alphabetical)
  let paramsToSign = "";
  if (uploadPreset) {
    paramsToSign = `timestamp=${timestamp}&upload_preset=${uploadPreset}${apiSecret}`;
  } else {
    paramsToSign = `timestamp=${timestamp}${apiSecret}`;
  }
  
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign)
    .digest("hex");

  return {
    signature,
    timestamp,
    uploadPreset,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  };
}
