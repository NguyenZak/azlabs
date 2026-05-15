import { createClient } from "@/utils/supabase/client";
import { HERO_SAMPLES, MOCK_SERVICES, FEATURE_SAMPLES, TECH_STACK } from "./data";

/**
 * CMS SERVICE
 * Handles fetching data from Supabase with graceful fallback to hardcoded (mock) data.
 * This ensures the UI never looks empty even if the database is not seeded.
 */

export const CMSService = {
  /**
   * Fetch Hero Slides
   */
  getHeroSlides: async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .order("order_index", { ascending: true });
      
      if (error || !data || data.length === 0) return HERO_SAMPLES;
      return data;
    } catch (e) {
      console.warn("CMS Service: Falling back to HERO_SAMPLES", e);
      return HERO_SAMPLES;
    }
  },

  /**
   * Fetch Services
   */
  getServices: async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("order_index", { ascending: true });
      
      if (error || !data || data.length === 0) return MOCK_SERVICES;
      return data;
    } catch (e) {
      console.warn("CMS Service: Falling back to MOCK_SERVICES", e);
      return MOCK_SERVICES;
    }
  },

  /**
   * Fetch Tech Stack
   */
  getTechStack: async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("tech_stack")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (error || !data || data.length === 0) return TECH_STACK;
      return data;
    } catch (e) {
      return TECH_STACK;
    }
  },

  /**
   * Fetch Features
   */
  getFeatures: async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("features")
        .select("*")
        .order("order_index", { ascending: true });
      
      if (error || !data || data.length === 0) return FEATURE_SAMPLES;
      return data;
    } catch (e) {
      return FEATURE_SAMPLES;
    }
  }
};
