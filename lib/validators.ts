import { z } from 'zod';

// 📧 Contact Form Validator
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email address"),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "Message is too short").max(2000),
});

// 📝 Blog Post Validator
export const postSchema = z.object({
  title_en: z.string().trim().min(5).max(200),
  title_vi: z.string().trim().min(5).max(200),
  slug: z.string().trim().regex(/^[a-z0-z0-9-]+$/, "Invalid slug format"),
  excerpt_en: z.string().trim().max(500).optional(),
  excerpt_vi: z.string().trim().max(500).optional(),
  content_en: z.string().min(10),
  content_vi: z.string().min(10),
  image_url: z.string().url().optional(),
  is_published: z.boolean().default(false),
});

// 📂 File Upload Validator
export const fileUploadSchema = z.object({
  size: z.number().max(5 * 1024 * 1024, "File size exceeds 5MB limit"),
  type: z.enum(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']),
});

// 🔐 Login Validator
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
