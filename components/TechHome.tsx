"use client";

import React from "react";
import TechHero from "@/sections/TechHero";
import InteractiveSystemArchitecture from "@/sections/InteractiveSystemArchitecture";
import TechServices from "@/sections/TechServices";
import TechFeatures from "@/sections/TechFeatures";
import TechSolutions from "@/sections/TechSolutions";
import TechPortfolio from "@/sections/TechPortfolio";
import TechStackDetail from "@/sections/TechStackDetail";
import TechAbout from "@/sections/TechAbout";
import TechMagazine from "@/sections/TechMagazine";
import TechTestimonials from "@/sections/TechTestimonials";
import TechContact from "@/sections/TechContact";

interface TechHomeProps {
  heroSlides: any[];
  projects: any[];
  services: any[];
  techStack: any[];
  testimonials: any[];
  featuresData: any[];
  solutionsData: any[];
  settings: any;
  posts: any[];
  aboutContent: any;
}

export default function TechHome({
  heroSlides,
  projects,
  services,
  techStack,
  testimonials,
  featuresData,
  solutionsData,
  settings,
  posts,
  aboutContent,
}: TechHomeProps) {
  return (
    <div className="bg-black text-white">
      {/* 1. Cyber Terminal Hero */}
      <TechHero slides={heroSlides} />

      {/* 2. Services Section */}
      <TechServices data={services} />

      {/* 3. Solutions Section */}
      <TechSolutions data={solutionsData} />

      {/* 4. Live Interactive System Architecture Visualizer */}
      <InteractiveSystemArchitecture />

      {/* 5. Features Section */}
      <TechFeatures data={featuresData} />

      {/* 6. Developer Portfolio Grid */}
      <TechPortfolio data={projects} />

      {/* 7. Interactive Tech Stack Showcase & 3D Globe */}
      <TechStackDetail data={techStack} />

      {/* 8. About Section */}
      <TechAbout data={aboutContent} />

      {/* 9. Magazine Section */}
      <TechMagazine posts={posts} />

      {/* 10. Testimonials Section */}
      <TechTestimonials data={testimonials} />

      {/* 11. Contact Form (Tailored wrapper for Tech template) */}
      <TechContact settings={settings} />
    </div>
  );
}
