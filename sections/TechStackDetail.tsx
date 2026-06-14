"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Terminal, Layers, Star, Info, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TechGlobe } from "@/components/TechGlobe";

interface TechItem {
  id?: string;
  name: string;
  slug: string;
  category?: string; // "Frontend", "Backend", "AI/ML", "Database", "Infrastructure"
  logo_url?: string;
}

const defaultTechLogos: TechItem[] = [
  { name: "Next.js", slug: "nextdotjs", category: "Frontend" },
  { name: "React", slug: "react", category: "Frontend" },
  { name: "TypeScript", slug: "typescript", category: "Frontend" },
  { name: "Tailwind CSS", slug: "tailwindcss", category: "Frontend" },
  { name: "Framer Motion", slug: "framer", category: "Frontend" },
  { name: "Three.js", slug: "threedotjs", category: "Frontend" },
  
  { name: "Node.js", slug: "nodedotjs", category: "Backend" },
  { name: "Python", slug: "python", category: "Backend" },
  { name: "Go", slug: "go", category: "Backend" },
  
  { name: "PostgreSQL", slug: "postgresql", category: "Database" },
  { name: "Supabase", slug: "supabase", category: "Database" },
  { name: "Redis", slug: "redis", category: "Database" },

  { name: "OpenAI", slug: "openai", category: "AI/ML" },
  { name: "Groq Cloud", slug: "groq", category: "AI/ML" },
  
  { name: "Vercel", slug: "vercel", category: "Infrastructure" },
  { name: "Docker", slug: "docker", category: "Infrastructure" },
  { name: "AWS", slug: "amazonaws", category: "Infrastructure" },
  { name: "Cloudflare", slug: "cloudflare", category: "Infrastructure" }
];

const CATEGORIES = ["All", "Frontend", "Backend", "AI/ML", "Database", "Infrastructure"];

const TECH_SPECS: Record<string, { purpose: string; purposeVi: string; integration: string }> = {
  nextdotjs: {
    purpose: "State-of-the-art corporate web experiences that load instantly, boost search ranking, and maximize conversions.",
    purposeVi: "Thiết kế website doanh nghiệp tối tân, tải trang tức thì, thúc đẩy thứ hạng SEO và tối đa hóa tỷ lệ chuyển đổi.",
    integration: `// Corporate Web & SEO Orchestration
const homepage = await Nextjs.renderPage("Home", {
  prefetchData: true,
  structuredSchema: "Organization"
});`
  },
  react: {
    purpose: "Modular component composition that facilitates rapid custom enterprise dashboard and CRM development.",
    purposeVi: "Cơ cấu thành phần dạng mô-đun giúp tăng tốc độ phát triển các bảng quản trị tùy chỉnh và hệ thống CRM.",
    integration: `// Reusable Business Data Table
return <DashboardTable dataSource="/api/v1/orders" />;`
  },
  typescript: {
    purpose: "Rigid data validation schemas guaranteeing zero compilation crashes in ERP resource tracking software.",
    purposeVi: "Lược đồ xác thực dữ liệu chặt chẽ đảm bảo hệ thống ERP và theo dõi tài nguyên hoạt động liên tục không lỗi.",
    integration: `interface PurchaseOrder {
  id: string;
  amount: number;
  status: "pending" | "fulfilled";
}`
  },
  supabase: {
    purpose: "Multi-tenant user authentication, database security policies, and automated billing synchronization.",
    purposeVi: "Xác thực người dùng đa chi nhánh, chính sách bảo mật dữ liệu và tự động đồng bộ hóa hóa đơn.",
    integration: `// Retrieve real-time inventory adjustments
const { data } = await supabase
  .from("erp_inventory")
  .select("*");`
  },
  openai: {
    purpose: "Automated support ticketing analysis and semantic retrieval for internal corporate knowledge bases.",
    purposeVi: "Tự động phân tích phiếu hỗ trợ khách hàng và truy xuất ngữ nghĩa tài liệu nội bộ doanh nghiệp.",
    integration: `// Analyze client feedback sentiments
const tags = await AIAgent.extractLeadCategories(feedback);`
  },
  groq: {
    purpose: "High-frequency AI text generation for immediate customer chat assistance and automated reporting.",
    purposeVi: "Xử lý hội thoại AI thời gian thực để phản hồi khách hàng và tự động lập báo cáo vận hành.",
    integration: `// Run real-time document summarization
const summary = await groq.summarizeContract(rawText);`
  },
  vercel: {
    purpose: "High-availability edge delivery networks ensuring company portals remain online with 99.99% uptime.",
    purposeVi: "Mạng lưới phân phối biên độ sẵn sàng cao đảm bảo các cổng thông tin doanh nghiệp duy trì thời gian hoạt động 99.99%.",
    integration: `// Deploy production system to edge CDN
vercel deploy --prod --scope=azlabs-enterprise`
  }
};

export default function TechStackDetail({ data = [] }: { data?: TechItem[] }) {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTech, setSelectedTech] = useState<string>("nextdotjs");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayTech = data.length > 0 ? data : defaultTechLogos;

  // Filter tech stack items
  const filteredTech = displayTech.filter((tech) => {
    if (activeCategory === "All") return true;
    return tech.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  const selectedItem = displayTech.find((tech) => 
    (tech.id && tech.id === selectedTech) || 
    (tech.slug && tech.slug === selectedTech)
  ) || displayTech[0];

  const getTechDetails = (slug: string) => {
    return TECH_SPECS[slug] || {
      purpose: "General high-performance building blocks enabling robust system integration.",
      purposeVi: "Khối kiến trúc hiệu suất cao chung hỗ trợ tích hợp hệ thống vững chắc.",
      integration: `// Technology Module Import\nimport { ${selectedItem?.name || 'Engine'} } from "@azlabs/core";`
    };
  };

  const activeSpec = getTechDetails(selectedItem?.slug || "");

  if (!mounted) return null;

  return (
    <section id="tech-stack" className="py-32 bg-black text-white relative overflow-hidden">
      {/* Mesh glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950/30 px-3 py-1 rounded-full w-fit block font-bold">
              Engineering Core
            </span>
            <h2 className="text-[40px] md:text-[64px] font-bold tracking-tight leading-none">
              {language === "vi" ? "Giải Pháp Đột Phá" : "Engine Stack"}
            </h2>
            <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed">
              {language === "vi"
                ? "Hệ thống công nghệ cao cấp giúp chúng tôi xây dựng các giải pháp quản trị doanh nghiệp toàn diện, website tốc độ cao và tự động hóa quy trình nghiệp vụ."
                : "The premium enterprise tech stack enabling us to deploy high-speed business portals, optimized custom websites, and seamless workflow automation."}
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 md:justify-end">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  // Auto-select first in filtered list if current selected is no longer in view
                  const firstOfNew = displayTech.find((t) => cat === "All" || t.category?.toLowerCase() === cat.toLowerCase());
                  if (firstOfNew) setSelectedTech(firstOfNew.id || firstOfNew.slug || "");
                }}
                className={`px-4 py-2 text-xs font-mono rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-white text-black border-white font-bold"
                    : "bg-neutral-950 text-neutral-500 border-neutral-900 hover:text-white hover:border-neutral-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Visualizer & Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 3D Interactive Tech Globe & Grid */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Interactive Grid List */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 w-full mb-8">
              <AnimatePresence mode="popLayout">
                {filteredTech.map((tech, index) => {
                  const isSelected = selectedTech === tech.slug || (tech.id && selectedTech === tech.id);
                  const logoUrlRaw = tech.logo_url || `https://cdn.simpleicons.org/${tech.slug || 'code'}`;
                  
                  const toBase64 = (str: string) => {
                    if (typeof window === 'undefined') return Buffer.from(str).toString('base64');
                    return window.btoa(unescape(encodeURIComponent(str)));
                  };

                  const logoUrl = logoUrlRaw.startsWith('<svg') 
                    ? `data:image/svg+xml;base64,${toBase64(logoUrlRaw)}`
                    : logoUrlRaw;

                  return (
                    <motion.div
                      layout
                      key={tech.id || tech.slug || `tech-item-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => setSelectedTech(tech.id || tech.slug || "")}
                        className={`w-full aspect-square rounded-2xl border flex flex-col items-center justify-center p-4 transition-all duration-300 relative group ${
                          isSelected
                            ? "bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                            : "bg-neutral-950 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/50"
                        }`}
                      >
                        <img
                          src={logoUrl}
                          alt={tech.name}
                          className={`w-8 h-8 object-contain transition-all duration-300 ${
                            isSelected ? "opacity-100" : "opacity-45 group-hover:opacity-100"
                          }`}
                        />
                        <span className={`text-[10px] font-mono mt-3 text-center truncate w-full ${
                          isSelected ? "text-white font-bold" : "text-neutral-500 group-hover:text-neutral-300"
                        }`}>
                          {tech.name}
                        </span>
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Backdrop TechGlobe wrapper */}
            <div className="w-full bg-neutral-950/40 border border-neutral-900 rounded-[32px] overflow-hidden flex items-center justify-center p-4 relative h-[360px] md:h-[420px]">
              <div className="absolute top-4 left-6 flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 uppercase tracking-widest pointer-events-none">
                <Layers className="w-3.5 h-3.5" /> 3D Logo Universe
              </div>
              <TechGlobe />
            </div>
          </div>

          {/* Right Column: Code & Tech Specifications Panel */}
          <div className="lg:col-span-5 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTech}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-950/80 border border-neutral-900 rounded-[32px] p-8 md:p-10 space-y-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

                {/* Tech logo badge and title */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center p-2.5">
                    <img
                      src={selectedItem?.logo_url || `https://cdn.simpleicons.org/${selectedItem?.slug || 'code'}`}
                      alt={selectedItem?.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">
                      {selectedItem?.category} Module
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-white mt-0.5">
                      {selectedItem?.name} Integration
                    </h3>
                  </div>
                </div>

                {/* Core Purpose */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block font-bold">CORE CAPABILITY</span>
                  <p className="text-neutral-300 font-light text-sm leading-relaxed">
                    {language === "vi" ? activeSpec.purposeVi : activeSpec.purpose}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block font-bold">AZLABS ASSURANCE</span>
                  <div className="space-y-2 text-xs font-mono text-neutral-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Optimized bundle size & code-splitting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Fully verified types & safe integrations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Hardened security audits applied</span>
                    </div>
                  </div>
                </div>

                {/* Code execution */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase flex items-center gap-1.5 font-bold">
                    <Code className="w-3.5 h-3.5 text-blue-400" /> CODE INTEGRATION SETUP
                  </span>
                  <div className="relative group/code">
                    <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-4 overflow-x-auto whitespace-pre font-mono text-[10px] text-neutral-400 leading-normal select-all">
                      <code>{activeSpec.integration}</code>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
