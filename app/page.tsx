import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Features from "@/sections/Features";
import Solutions from "@/sections/Solutions";
import Portfolio from "@/sections/Portfolio";
import TechStack from "@/sections/TechStack";
import About from "@/sections/About";
import Magazine from "@/sections/Magazine";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import { constructMetadata } from "@/lib/seo";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function generateMetadata() {
  return constructMetadata({
    title: "Trang chủ",
    description: "AZLABS — Digital Excellence. Chúng tôi xây dựng tương lai trải nghiệm số thông qua thiết kế đột phá và công nghệ dẫn đầu.",
    url: "/",
  });
}

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

  // Fetch Projects, Services, Tech, Features
  let projects = [];
  let services = [];
  let techStack = [];
  let testimonials = [];
  let featuresData = [];
  let solutionsData = [];
  let settings = null;
  try {
    const { data: projectsData } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    const { data: servicesData } = await supabase.from("services").select("*").order("created_at", { ascending: true });
    const { data: techData } = await supabase.from("tech_stack").select("*").order("order_index", { ascending: true });
    const { data: testimonialsData } = await supabase.from("testimonials").select("*").order("order_index", { ascending: true });
    const { data: featuresRaw } = await supabase.from("features").select("*").order("order_index", { ascending: true });
    const { data: solutionsRaw } = await supabase.from("solutions").select("*").order("order_index", { ascending: true });
    const { data: settingsData } = await supabase.from("site_settings").select("*").maybeSingle();
    
    projects = projectsData || [];
    services = servicesData || [];
    techStack = techData || [];
    testimonials = testimonialsData || [];
    featuresData = featuresRaw || [];
    solutionsData = solutionsRaw || [];
    settings = settingsData;
  } catch (error) {
    console.error("Error fetching data:", error);
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

  // Fetch About Content
  let aboutContent = null;
  try {
    const { data } = await supabase.from("about_content").select("*").maybeSingle();
    aboutContent = data;
  } catch (error) {
    console.error("Error fetching about content:", error);
  }

  return (
    <>
      <Hero slides={heroSlides} />
      <Services data={services} />
      <Solutions data={solutionsData} />
      <Features data={featuresData} />
      <Portfolio data={projects} />
      <TechStack data={techStack} />
      <About data={aboutContent} />
      <Magazine posts={posts} />
      <Testimonials data={testimonials} />
      <Contact settings={settings} />
    </>
  );
}
