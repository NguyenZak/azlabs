"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Code, Cpu, Server, ShieldCheck, Play, RotateCcw, Activity } from "lucide-react";
import { FuturisticGlobe } from "@/components/FuturisticGlobe";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface HeroSlide {
  id?: string;
  title_en: string;
  title_vi: string;
  subtitle_en?: string;
  subtitle_vi?: string;
  cta_text_en?: string;
  cta_text_vi?: string;
  cta_link?: string;
}

export default function TechHero({ slides = [] }: { slides?: HeroSlide[] }) {
  const { language, dict } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [terminalTab, setTerminalTab] = useState<"code" | "logs" | "status">("code");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeLine, setActiveLine] = useState(0);

  // 3D Perspective Tilt State for Terminal
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!terminalRef.current) return;
    const card = terminalRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Smooth rotate values (max 6 degrees)
    const rotateX = -(y / (rect.height / 2)) * 6;
    const rotateY = (x / (rect.width / 2)) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Default content if no slides
  const defaultSlide = {
    title_en: "Engineering the Future of AI Ecosystems",
    title_vi: "Kiến tạo Tương lai Hệ sinh thái AI",
    subtitle_en: "Pioneering cinematic digital experiences with cutting-edge intelligence and Apple-grade aesthetics.",
    subtitle_vi: "Tiên phong trải nghiệm kỹ thuật số điện ảnh với trí tuệ tiên tiến và thẩm mỹ đẳng cấp Apple.",
    cta_text_en: "Deploy Solution",
    cta_text_vi: "Triển khai Giải pháp",
    cta_link: "#contact",
  };

  const slide = slides.length > 0 ? slides[0] : defaultSlide;
  const title = language === "vi" ? slide.title_vi : slide.title_en;
  const subtitle = language === "vi" ? slide.subtitle_vi : slide.subtitle_en;
  const ctaText = language === "vi" ? slide.cta_text_vi || "Triển khai" : slide.cta_text_en || "Deploy";

  const codeSnippet = `// 💼 AZLABS Enterprise Digital Transformation Engine
import { EnterprisePortal, ERPConnector, CRMAutomation } from "@azlabs/core";

const portal = new EnterprisePortal({
  company: "Enterprise Client Corp",
  designStandard: "premium-cinematic",
  compliance: "ISO-27001-certified"
});

async function bootstrapBusinessSystem() {
  console.log("⚡ Bootstrapping corporate digital systems...");
  
  // 1. Build High-Performance Custom Website
  const website = await portal.deployCorporateWebsite({
    engine: "Next.js-SSR",
    seoOptimized: true,
    pageSpeedSLA: "99+",
    localization: ["vi", "en"]
  });

  // 2. Connect Enterprise ERP & Database Synchronization
  const database = await ERPConnector.link({
    syncSource: "supabase-postgresql",
    modules: ["Inventory", "Procurement", "Accounting"],
    autoBackups: "daily"
  });

  // 3. Mount AI-Driven CRM & Customer Support Agents
  const crm = await CRMAutomation.initialize({
    salesPipeline: "intelligent-lead-routing",
    aiAssistant: "active-agent-24/7",
    channelIntegrations: ["email", "zalo", "messenger"]
  });

  console.log("🚀 Corporate Systems Active and Synchronized!");
}

bootstrapBusinessSystem();`;

  const logDatabase = [
    "💼 [ERP] Connecting secure tunnel to Supabase enterprise database...",
    "🛡️ [SECURITY] Hardened RLS tables initialized: customers, invoices, catalog.",
    "🌐 [WEBSITE] Automated SEO optimization mapping completed successfully.",
    "🧬 [AI AGENT] Deep-learning CRM routing engines online (Llama-3.3 Core).",
    "📊 [ANALYTICS] Business intelligence dashboard synchronizing transaction logs.",
    "📈 [METRICS] Website performance scan passed: 99/100 Core Web Vitals.",
    "⚡ [SYSTEM] Digital transformation portal fully synchronized & active.",
  ];

  const handleRunCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalTab("logs");
    setTerminalLogs([]);

    let i = 0;
    const interval = setInterval(() => {
      if (i < logDatabase.length) {
        setTerminalLogs((prev) => [...prev, logDatabase[i]]);
        i++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 900);
  };

  const handleResetLogs = () => {
    setTerminalLogs([]);
    setIsRunning(false);
  };

  if (!mounted) return null;

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center pt-28 pb-16 select-none isolate">
      {/* 3D Plexus Globe Backdrop */}
      <FuturisticGlobe />

      {/* Cyber ambient glow effect mesh */}
      <div className="absolute top-[-10%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />

      {/* Fine lines & grid HUD decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,185,92,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Cyber Grid Lines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      {/* Absolute floating telemetry details */}
      <div className="absolute top-10 left-10 text-[9px] font-mono text-neutral-600 tracking-[0.25em] pointer-events-none uppercase hidden xl:block">
        SYS_LOC: [105.8048° E, 21.0285° N]
      </div>
      <div className="absolute top-10 right-10 text-[9px] font-mono text-neutral-600 tracking-[0.25em] pointer-events-none uppercase hidden xl:block">
        NET_ZONE: SECURE_EDGE_APAC
      </div>
      <div className="absolute bottom-10 left-10 text-[9px] font-mono text-neutral-600 tracking-[0.25em] pointer-events-none uppercase hidden xl:block">
        SHIELD: ACTIVE_EAL6+
      </div>
      <div className="absolute bottom-10 right-10 text-[9px] font-mono text-neutral-600 tracking-[0.25em] pointer-events-none uppercase hidden xl:block">
        AZL_STATUS: SYS_ONLINE
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 w-full relative z-10">

        {/* Style Injector for Animations & Scrollbars */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          @keyframes scanning-line {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .animate-scan-line {
            animation: scanning-line 8s linear infinite;
          }
        `}} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Premium Content & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 text-left space-y-6 md:space-y-8"
          >
            {/* Top Line Status Pill */}
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md border border-cyan-500/20 bg-cyan-950/10 backdrop-blur-md text-[9px] font-mono tracking-widest text-cyan-400"
              >
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                </span>
                <span>CORE_PORTAL // SECURE_STATUS: OPERATIONAL</span>
              </motion.div>
            </div>

            {/* Title: Splitting text and highlighting key terms with beautiful gradient */}
            <h1 className="text-[40px] sm:text-[54px] lg:text-[64px] font-black tracking-tight leading-[1.05] text-white uppercase font-sans">
              {title.split(" ").map((word, idx) => {
                const isHighlight = /AI|Ecosystems|Hệ|sinh|thái/i.test(word);
                return (
                  <span
                    key={idx}
                    className={`inline-block mr-[0.2em] whitespace-nowrap transition-all duration-300 ${isHighlight
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)] font-black"
                        : "text-white"
                      }`}
                  >
                    {word}
                  </span>
                );
              })}
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed max-w-xl">
              {subtitle}
            </p>

            {/* Cyber CTA Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={slide.cta_link || "#contact"}
                className="group relative px-7 py-4 rounded-md overflow-hidden flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 font-mono font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-[0.98] transition-all duration-300"
              >
                <span className="relative z-10 text-[10px] uppercase tracking-widest">Deploy Solutions</span>
                <Play className="w-3 h-3 relative z-10 fill-white text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="group relative px-7 py-4 rounded-md overflow-hidden border border-neutral-800 bg-black/60 hover:bg-neutral-900/80 text-cyan-400 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer font-mono text-[10px] uppercase tracking-widest"
              >
                <Code className="w-3.5 h-3.5" />
                <span>Run Sandbox</span>
              </button>
            </div>

            {/* Telemetry Metric Widgets */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-900 font-mono">
              {[
                { value: "99.99%", label: "Uptime SLA", status: "STABLE", color: "text-emerald-400" },
                { value: "<45ms", label: "LATENCY_SG", status: "FAST", color: "text-cyan-400" },
                { value: "ISO-27001", label: "SECURITY", status: "ACTIVE", color: "text-indigo-400" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group/metric p-3.5 bg-black/50 backdrop-blur-md rounded-lg border border-neutral-900 hover:border-neutral-800 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-[1px] bg-cyan-500/50 group-hover/metric:w-full transition-all duration-500" />
                  <div className="absolute top-0 left-0 w-[1px] h-2 bg-cyan-500/50 group-hover/metric:h-full transition-all duration-500" />

                  <div className="flex justify-between items-center text-[8px] text-neutral-600 mb-1">
                    <span>{item.label}</span>
                    <span className={`text-[7px] font-bold ${item.color}`}>{item.status}</span>
                  </div>
                  <p className="text-base md:text-lg font-bold text-white tracking-tight">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Holographic Terminal Box with 3D Tilt Effect */}
          <motion.div
            initial={{ opacity: 0, x: 35, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 w-full max-w-xl lg:max-w-none mx-auto relative group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={terminalRef}
            style={{
              perspective: 1000,
            }}
          >
            {/* Holographic Glowing shadow backplate */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-2xl blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* The Floating Console Shell with 3D tilt */}
            <div
              className="relative w-full rounded-xl border border-cyan-500/20 bg-black/80 backdrop-blur-md shadow-2xl overflow-hidden font-mono text-xs text-neutral-300 select-none"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              {/* Virtual Scanner Light line sweeping across the terminal */}
              <div className="absolute inset-x-0 h-[1.5px] bg-cyan-400/10 shadow-[0_0_10px_rgba(34,211,238,0.2)] animate-scan-line pointer-events-none" />

              {/* Terminal Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3.5 gap-3 border-b border-neutral-900/60 bg-black/40">
                <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto">
                  {/* Dot status lights */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40 border border-yellow-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/40 border border-green-500/30" />
                  </div>
                  <span className="text-[10px] text-neutral-500 ml-4 font-mono select-none truncate max-w-[150px] sm:max-w-none">
                    azlabs-transform-portal.config.ts
                  </span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto justify-start sm:justify-end scrollbar-none">
                  {[
                    { id: "code", label: "Source Code" },
                    { id: "logs", label: "Live Logs" },
                    { id: "status", label: "Diagnostics" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setTerminalTab(tab.id as any)}
                      className={`px-3 py-1 rounded text-[9px] md:text-[10px] transition-all whitespace-nowrap cursor-pointer ${terminalTab === tab.id
                          ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold"
                          : "text-neutral-500 hover:text-neutral-300 border border-transparent"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Console Viewport */}
              <div className="p-5 h-[280px] md:h-[340px] overflow-y-auto leading-relaxed select-text hide-scrollbar bg-black/30">
                {/* Tab 1: Interactive Source Code */}
                {terminalTab === "code" && (
                  <pre className="text-left text-neutral-400 font-mono text-[10px] md:text-[11px] overflow-x-auto whitespace-pre">
                    {codeSnippet.split("\n").map((line, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 md:gap-4 px-2 py-0.5 rounded transition-all hover:bg-neutral-900/30 ${idx === activeLine ? "bg-cyan-500/5 border-l-2 border-cyan-400 text-cyan-200" : ""
                          }`}
                        onMouseEnter={() => setActiveLine(idx)}
                      >
                        <span className="text-[8px] text-neutral-600 w-4 text-right select-none">{idx + 1}</span>
                        <span className="flex-1">{line}</span>
                      </div>
                    ))}
                  </pre>
                )}

                {/* Tab 2: Execution Logs */}
                {terminalTab === "logs" && (
                  <div className="space-y-2 text-left">
                    {terminalLogs.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-[200px] md:h-[260px] text-neutral-500 text-center space-y-4">
                        <Activity className="w-8 h-8 opacity-45 animate-pulse text-cyan-400" />
                        <p className="max-w-[240px] text-[10px] md:text-xs">Execute system initialization sequence in simulated sandbox sandbox environment.</p>
                        <button
                          onClick={handleRunCode}
                          className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded text-[9px] md:text-[10px] cursor-pointer tracking-wider font-mono shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                        >
                          INITIALIZE SIMULATION
                        </button>
                      </div>
                    )}

                    {terminalLogs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`font-mono text-[10px] md:text-[11px] ${log.includes("OK") || log.includes("successfully") || log.includes("Active")
                            ? "text-emerald-400 font-bold"
                            : log.includes("SYSTEM")
                              ? "text-cyan-400"
                              : log.includes("SECURITY")
                                ? "text-amber-400"
                                : "text-neutral-400"
                          }`}
                      >
                        {log}
                      </motion.div>
                    ))}

                    {isRunning && (
                      <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] md:text-[11px] mt-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <span>Compiling digital architecture pipeline...</span>
                      </div>
                    )}

                    {terminalLogs.length > 0 && !isRunning && (
                      <div className="flex items-center justify-between border-t border-neutral-900 pt-4 mt-6">
                        <span className="text-emerald-400 font-bold text-[9px] md:text-[10px] flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" /> RUN SEQUENCE COMPLETE
                        </span>
                        <button
                          onClick={handleResetLogs}
                          className="flex items-center gap-1 text-[9px] md:text-[10px] text-neutral-500 hover:text-neutral-300 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" /> Reset Session
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 3: Diagnostics Panel */}
                {terminalTab === "status" && (
                  <div className="space-y-6 text-left h-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <div className="bg-black/40 p-4 rounded border border-neutral-900 space-y-2">
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="text-[8px] font-mono font-bold uppercase tracking-wider">AI Operations</span>
                        </div>
                        <p className="text-xs md:text-sm font-bold text-white">Cognitive Routing Core</p>
                        <div className="flex items-center justify-between text-[9px] text-neutral-500">
                          <span>Llama-3.3-Core</span>
                          <span className="text-emerald-400 font-bold">ONLINE</span>
                        </div>
                      </div>

                      <div className="bg-black/40 p-4 rounded border border-neutral-900 space-y-2">
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Server className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="text-[8px] font-mono font-bold uppercase tracking-wider">Database Link</span>
                        </div>
                        <p className="text-xs md:text-sm font-bold text-white">Supabase Postgres Sync</p>
                        <div className="flex items-center justify-between text-[9px] text-neutral-500">
                          <span>PostgreSQL Engine</span>
                          <span className="text-emerald-400 font-bold">STABLE</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/40 p-4 rounded border border-neutral-900 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-mono font-bold text-neutral-400 uppercase tracking-wider">Secure Operations & SLA Shields</span>
                        <span className="text-emerald-400 font-bold text-[9px]">100% HEALTH</span>
                      </div>
                      <div className="w-full bg-black h-1.5 rounded-full overflow-hidden border border-neutral-900">
                        <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full w-[100%] rounded-full" />
                      </div>
                      <div className="flex justify-between text-[8px] text-neutral-500 font-mono">
                        <span>GDPR COMPLIANT</span>
                        <span>ISO-27001 KEY</span>
                        <span>99.98% SLA TARGET</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terminal Footer Diagnostics Bar */}
              <div className="px-5 py-3.5 bg-black/50 border-t border-neutral-900/60 flex justify-between items-center text-[9px] md:text-[10px] text-neutral-500 select-none">
                <span>UTF-8 // typescript-next-srv</span>
                <span className="flex items-center gap-2 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  env::active_prod_node_ap_01
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
