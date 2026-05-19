"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Database, Server, Smartphone, Globe, Layers, ArrowRight, Zap, ShieldAlert, Code } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface NodeDetail {
  id: string;
  name: string;
  nameVi: string;
  role: string;
  roleVi: string;
  latency: string;
  protocol: string;
  techs: string[];
  description: string;
  descriptionVi: string;
  sampleCode: string;
}

const ARCHITECTURE_NODES: NodeDetail[] = [
  {
    id: "frontend",
    name: "Corporate Experience Portal",
    nameVi: "Cổng Trải Nghiệm Doanh Nghiệp",
    role: "Custom Website & Portal Design",
    roleVi: "Thiết kế Website & Cổng thông tin tùy chỉnh",
    latency: "PageSpeed: 99+",
    protocol: "Next.js / Core Web Vitals",
    techs: ["Next.js SSR", "Tailwind CSS", "SEO Schema Engine", "Corporate Dashboard"],
    description: "Custom-built corporate websites and administration dashboards tailored to maximize organic search rankings, conversion rates, and client engagements.",
    descriptionVi: "Trang web doanh nghiệp và bảng quản trị được thiết kế riêng nhằm tối đa hóa thứ hạng tìm kiếm tự nhiên, tỷ lệ chuyển đổi và tương tác của khách hàng.",
    sampleCode: `// Deploy highly optimized, SEO-ready Next.js corporate website
const portal = await Azlabs.deployCorporateWebsite({
  domain: "enterprise.com",
  seoEngine: "rich-snippets-active",
  loadTargetMs: 800
});`
  },
  {
    id: "edge",
    name: "Digital Integration Gateway",
    nameVi: "Cổng Tích Hợp Hệ Thống",
    role: "Secure API Middleware & Routing",
    roleVi: "Middleware API & Định tuyến Bảo mật",
    latency: "API Load: <20ms",
    protocol: "REST / GraphQL Integrations",
    techs: ["Vercel Edge Routes", "ERP Syncer", "Secure JWT", "API Rate Limiter"],
    description: "High-speed backend middleware routing website interactions directly into enterprise internal tools, syncing sales leads, database items, and CRM data points.",
    descriptionVi: "Lớp trung gian (middleware) tốc độ cao định tuyến tương tác của người dùng từ website trực tiếp vào các công cụ quản lý nội bộ, đồng bộ dữ liệu CRM và ERP.",
    sampleCode: `// Sync client leads directly to CRM pipeline
app.post('/api/v1/leads', async (req) => {
  const verifiedLead = verifySecurityToken(req);
  return await CRMBridge.syncLead(verifiedLead);
});`
  },
  {
    id: "database",
    name: "ERP & Management Database",
    nameVi: "Hệ Quản Trị Cơ Sở Dữ Liệu & ERP",
    role: "Supabase Postgres / Secure Sync",
    roleVi: "Supabase Postgres / Đồng bộ Bảo mật",
    latency: "99.99% Uptime",
    protocol: "PostgreSQL Connections & Backups",
    techs: ["PostgreSQL", "Supabase Storage", "Row Level Isolation", "Active Backups"],
    description: "Hardened relational databases housing orders, contracts, and internal business details. Controlled via row-level permission logic to safeguard sensitive records.",
    descriptionVi: "Cơ sở dữ liệu quan hệ bảo mật cao lưu trữ đơn hàng, hợp đồng và thông tin vận hành. Được kiểm soát thông qua phân quyền cấp dòng để bảo vệ dữ liệu nhạy cảm.",
    sampleCode: `-- Establish multi-tenant isolation policy for ERP records
CREATE POLICY "Allow employees to view client catalog" 
ON erp_inventory FOR SELECT 
USING (auth.uid() IN (SELECT user_id FROM employees));`
  },
  {
    id: "ai",
    name: "AI Business Assistant",
    nameVi: "Trí Tuệ Nhân Tạo Doanh Nghiệp",
    role: "Cognitive Service Orchestrator",
    roleVi: "Điều phối Dịch vụ Nhận thức",
    latency: "AI reply: <350ms",
    protocol: "Llama-3.3 NLP Engine",
    techs: ["Groq LPUs", "Llama 3.3 Core", "Document RAG Systems", "CRM Automation"],
    description: "Conversational agents and document automation nodes that resolve client tickets 24/7, draft invoices automatically, and structure customer profiles.",
    descriptionVi: "Trợ lý ảo và các luồng tự động hóa tài liệu giúp giải quyết yêu cầu khách hàng 24/7, tự động nháp hóa đơn và hệ thống hóa hồ sơ khách hàng.",
    sampleCode: `// Prompt AI agent to analyze corporate feedback and route to CRM
const analysis = await AIAgent.analyzeTicket({
  ticketId: "lead-9842",
  model: "llama-3.3-70b",
  action: "categorize-and-draft-reply"
});`
  }
];

export default function InteractiveSystemArchitecture() {
  const { language } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<string>("frontend");

  const activeNode = ARCHITECTURE_NODES.find((node) => node.id === selectedNode) || ARCHITECTURE_NODES[0];

  const nodeIcons: Record<string, React.ReactNode> = {
    frontend: <Smartphone className="w-6 h-6 text-blue-400" />,
    edge: <Globe className="w-6 h-6 text-cyan-400" />,
    database: <Database className="w-6 h-6 text-purple-400" />,
    ai: <Cpu className="w-6 h-6 text-indigo-400" />,
  };

  return (
    <section id="architecture" className="py-32 bg-black text-white relative overflow-hidden">
      {/* Background glow grids */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/25 bg-blue-950/20 text-[10px] font-mono tracking-widest text-blue-400 uppercase">
            <Zap className="w-3.5 h-3.5" /> High Performance Architecture
          </div>
          <h2 className="text-[40px] md:text-[60px] font-bold tracking-tight leading-none text-white">
            {language === "vi" ? "Kiến trúc Hệ thống" : "System Architecture"}
          </h2>
          <p className="text-neutral-400 font-light max-w-xl mx-auto text-sm md:text-base">
            {language === "vi" 
              ? "Tìm hiểu cách hệ sinh thái kỹ thuật số của chúng tôi vận hành tối ưu qua các luồng dữ liệu thời gian thực." 
              : "Discover how our digital ecosystem processes workloads with low-latency and enterprise-grade security."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Diagram Flow */}
          <div className="lg:col-span-7 bg-neutral-950/60 border border-neutral-900 rounded-[32px] p-8 md:p-12 relative">
            <div className="absolute top-4 left-6 flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Realtime pipeline visualizer
            </div>

            {/* SVG Connection Paths with animated dots */}
            <div className="relative flex flex-col md:flex-row items-stretch justify-between gap-12 md:gap-4 mt-8 py-10">
              {/* Connecting lines for medium+ screens */}
              <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-0.5 bg-neutral-900 hidden md:block z-0">
                {/* Glowing flow animation dot */}
                <motion.div 
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 blur-sm pointer-events-none"
                />
                <motion.div 
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1.5 }}
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-500 blur-sm pointer-events-none"
                />
              </div>

              {ARCHITECTURE_NODES.map((node, index) => {
                const isSelected = selectedNode === node.id;
                return (
                  <div key={node.id} className="relative z-10 flex flex-col items-center flex-1">
                    <button
                      onClick={() => setSelectedNode(node.id)}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 relative ${
                        isSelected 
                          ? "bg-blue-600 border-2 border-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.4)] scale-110" 
                          : "bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:scale-105"
                      }`}
                    >
                      {nodeIcons[node.id]}
                      {isSelected && (
                        <span className="absolute -inset-2 rounded-2xl border border-blue-500/50 animate-pulse pointer-events-none" />
                      )}
                    </button>
                    <span className="mt-4 text-[11px] font-mono font-bold text-center tracking-wider text-neutral-400 uppercase select-none">
                      {node.id}
                    </span>
                    <span className="mt-1 text-[10px] font-mono text-neutral-600 select-none">
                      {node.latency}
                    </span>
                    
                    {index < ARCHITECTURE_NODES.length - 1 && (
                      <div className="flex md:hidden flex-col items-center my-4 text-neutral-800">
                        <ArrowRight className="w-5 h-5 rotate-90" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Flow Indicators */}
            <div className="mt-8 pt-8 border-t border-neutral-900 grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono text-[10px] text-neutral-500">
              <div>
                <p className="text-white font-bold">HTTP/3</p>
                <p className="mt-0.5 text-neutral-600 uppercase">Edge Protocol</p>
              </div>
              <div>
                <p className="text-white font-bold">SSE / WSS</p>
                <p className="mt-0.5 text-neutral-600 uppercase">Realtime Sync</p>
              </div>
              <div>
                <p className="text-white font-bold">Row-Level (RLS)</p>
                <p className="mt-0.5 text-neutral-600 uppercase">Data Shield</p>
              </div>
              <div>
                <p className="text-white font-bold">180ms stream</p>
                <p className="mt-0.5 text-neutral-600 uppercase">Avg LLM speed</p>
              </div>
            </div>
          </div>

          {/* Right Column: Node Details & Source Code */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-950/60 border border-neutral-900 rounded-[32px] p-8 md:p-10 space-y-6 relative overflow-hidden"
              >
                {/* Node type overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950/30 px-3 py-1 rounded-full w-fit block font-bold">
                    {activeNode.role}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
                    {language === "vi" ? activeNode.nameVi : activeNode.name}
                  </h3>
                </div>

                <p className="text-neutral-400 text-sm font-light leading-relaxed">
                  {language === "vi" ? activeNode.descriptionVi : activeNode.description}
                </p>

                {/* Performance Specs */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-neutral-900">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">Internal Latency</span>
                    <span className="text-sm font-mono text-white font-bold">{activeNode.latency}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">Protocol</span>
                    <span className="text-sm font-mono text-white font-bold">{activeNode.protocol}</span>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Engine Stack</span>
                  <div className="flex flex-wrap gap-2">
                    {activeNode.techs.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Code Snippet Box */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-blue-400" /> Reference snippet
                  </span>
                  <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-4 overflow-x-auto whitespace-pre font-mono text-[10px] text-neutral-400 leading-normal select-all">
                    <code>{activeNode.sampleCode}</code>
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
