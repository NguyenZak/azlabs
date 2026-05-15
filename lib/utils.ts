import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  if (!text) return "";
  
  return text
    .toString()
    .normalize('NFD')                   // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '')     // remove all the accents
    .replace(/[đĐ]/g, 'd')               // handle Vietnamese specific character 'đ'
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')                // replace spaces with -
    .replace(/[^\w-]+/g, '')             // remove all non-word chars
    .replace(/--+/g, '-')                // replace multiple - with single -
    .replace(/^-+/, '')                  // trim - from start of text
    .replace(/-+$/, '');                 // trim - from end of text
}


