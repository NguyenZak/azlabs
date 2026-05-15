import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Features from "@/sections/Features";
import Portfolio from "@/sections/Portfolio";
import TechStack from "@/sections/TechStack";
import About from "@/sections/About";
import Magazine from "@/sections/Magazine";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Fetch Hero Slides with graceful fallback
  let heroSlides = [];
  try {
    const { data } = await supabase
      .from("hero_slides")
      .select("*")
      .order("order_index", { ascending: true });
    heroSlides = data || [];
  } catch (error) {
    console.error("Hero slides table not found or error fetching:", error);
  }

  // Fetch Projects & Services
  let projects = [];
  let services = [];
  try {
    const { data: projectsData } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    const { data: servicesData } = await supabase.from("services").select("*").order("created_at", { ascending: true });
    projects = projectsData || [];
    services = servicesData || [];
  } catch (error) {
    console.error("Error fetching projects or services:", error);
  }

  // Fetch Published Posts for Magazine
  let posts = [];
  try {
    const { data: postsData } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(4);
    posts = postsData || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <>
      <Hero slides={heroSlides} />
      <Services data={services} />
      <Features />
      <Portfolio data={projects} />
      <TechStack />
      <About />
      <Magazine posts={posts} />
      <Testimonials />
      <Contact />
    </>
  );
}
