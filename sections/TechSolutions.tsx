"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Play, CheckCircle2, ArrowRight, ServerCrash, Cpu, Database, Layout } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Solution {
  id: string;
  title_en: string;
  title_vi: string;
  description_en: string;
  description_vi: string;
  content_en?: string;
  content_vi?: string;
  image_url?: string;
}

export default function TechSolutions({ data = [] }: { data: any[] }) {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeStep, setActiveStep] = useState<"ingest" | "process" | "output">("ingest");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!data || data.length === 0 || !mounted) return null;

  const currentSolution = data[activeIndex] || data[0];
  const title = language === "en" ? currentSolution.title_en : currentSolution.title_vi;
  const description = language === "en" ? currentSolution.description_en : currentSolution.description_vi;
  const content = language === "en" ? currentSolution.content_en : currentSolution.content_vi;

  const stepDetails = {
    ingest: {
      title: language === "en" ? "Data Integration" : "Tích hợp Dữ liệu Đầu vào",
      desc: language === "en" 
        ? "Connect legacy databases, e-commerce webhooks, or CRM feeds directly to our secure gateway endpoint."
        : "Kết nối cơ sở dữ liệu cũ, webhook e-commerce hoặc phễu dữ liệu CRM trực tiếp tới cổng kết nối an toàn.",
      code: `// Secure Gateway Listener
const IngestionServer = await Gateway.connect({
  source: "${title.replace(/\s+/g, "_").toLowerCase()}_stream",
  protocol: "WSS / HTTPS",
  encryption: "AES-256-GCM"
});`,
      icon: <Database className="w-5 h-5 text-blue-400" />
    },
    process: {
      title: language === "en" ? "Cloud Logic Processing" : "Xử lý Nghiệp vụ & AI",
      desc: language === "en"
        ? "Transform input schemas, execute smart algorithms, structure records, and query active models."
        : "Chuẩn hóa lược đồ dữ liệu, chạy thuật toán tối ưu hóa, chuẩn cấu trúc bản ghi và truy vấn mô hình AI.",
      code: `// Compute & Enrich records
const ProcessEngine = await Solutions.process({
  enrichWithAI: true,
  runSlaChecks: true,
  isolationLevel: "serializable"
});`,
      icon: <Cpu className="w-5 h-5 text-indigo-400" />
    },
    output: {
      title: language === "en" ? "Interactive Dashboard Output" : "Trực quan hóa Báo cáo",
      desc: language === "en"
        ? "Deliver lightning-fast analytics interfaces, update operational records, and push Slack/SMS notifications."
        : "Kết xuất giao diện quản trị phân tích siêu nhanh, cập nhật lịch sử vận hành và gửi thông báo hệ thống.",
      code: `// Stream to Customer Dashboard
await Dashboard.pushUpdate({
  channel: "enterprise_ops",
  renderTarget: "nextjs_ssr_view",
  payload: ProcessEngine.results
});`,
      icon: <Layout className="w-5 h-5 text-emerald-400" />
    }
  };

  return (
    <section id="solutions" className="py-32 bg-black text-white relative overflow-hidden border-t border-neutral-900">
      {/* Background radial elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/25 bg-blue-950/20 text-[10px] font-mono tracking-widest text-blue-400 uppercase">
            <Zap className="w-3.5 h-3.5" /> High Performance Solutions
          </div>
          <h2 className="text-[40px] md:text-[60px] font-bold tracking-tight leading-none text-white">
            {language === "en" ? "Industry Solutions" : "Giải Pháp Quản Trị"}
          </h2>
          <p className="text-neutral-400 font-light text-sm md:text-base max-w-xl mx-auto">
            {language === "en"
              ? "Custom-tailored business portal solutions designed to connect web interfaces with core enterprise pipelines."
              : "Các giải pháp cổng thông tin quản lý được thiết kế chuyên biệt để kết nối giao diện web với lõi dữ liệu vận hành."}
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Solution Picker (Tabs) */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">SELECT SOLUTION</span>
            {data.map((sol, index) => {
              const solTitle = language === "en" ? sol.title_en : sol.title_vi;
              const isSelected = activeIndex === index;
              return (
                <button
                  key={sol.id}
                  onClick={() => {
                    setActiveIndex(index);
                    setActiveStep("ingest");
                  }}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? "bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.25)]"
                      : "bg-neutral-950 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/40"
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`text-[10px] font-mono block ${isSelected ? "text-blue-200" : "text-neutral-500"}`}>
                      SOL_MODULE_0{index + 1}
                    </span>
                    <span className="text-sm font-bold tracking-tight">{solTitle}</span>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? "translate-x-1 text-white" : "text-neutral-600"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Pipeline Interactive Visualizer */}
          <div className="lg:col-span-8 bg-neutral-950/60 border border-neutral-900 rounded-[32px] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900/60">
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">ACTIVE CONFIGURATION</span>
                <h3 className="text-xl font-bold tracking-tight text-white mt-0.5">{title}</h3>
              </div>
              <div className="text-neutral-400 text-xs font-light max-w-sm" dangerouslySetInnerHTML={{ __html: description }} />
            </div>

            {/* SVG Interactive Pipeline Flowchart */}
            <div className="my-8 py-6 relative">
              {/* Timeline Connector Line */}
              <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-0.5 bg-neutral-900 hidden md:block" />

              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-8 md:gap-4 relative z-10">
                
                {/* Step 1 button */}
                <button
                  onClick={() => setActiveStep("ingest")}
                  className={`flex-1 p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-3 group/step ${
                    activeStep === "ingest"
                      ? "bg-blue-950/40 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                      : "bg-neutral-950 border-neutral-900 hover:border-neutral-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                      <Database className={`w-4 h-4 ${activeStep === "ingest" ? "text-blue-400" : "text-neutral-500"}`} />
                    </div>
                    <span className="text-[9px] font-mono text-neutral-600 font-bold uppercase">STEP 01</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-white">Data Ingestion</span>
                    <span className="text-[10px] text-neutral-500 font-mono mt-0.5 block uppercase">Ingestion layer</span>
                  </div>
                </button>

                {/* Arrow helper for desktop */}
                <div className="hidden md:flex text-neutral-800 items-center justify-center">
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* Step 2 button */}
                <button
                  onClick={() => setActiveStep("process")}
                  className={`flex-1 p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-3 group/step ${
                    activeStep === "process"
                      ? "bg-indigo-950/40 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                      : "bg-neutral-950 border-neutral-900 hover:border-neutral-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                      <Cpu className={`w-4 h-4 ${activeStep === "process" ? "text-indigo-400" : "text-neutral-500"}`} />
                    </div>
                    <span className="text-[9px] font-mono text-neutral-600 font-bold uppercase">STEP 02</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-white">Compute & AI</span>
                    <span className="text-[10px] text-neutral-500 font-mono mt-0.5 block uppercase">Processing engine</span>
                  </div>
                </button>

                {/* Arrow helper for desktop */}
                <div className="hidden md:flex text-neutral-800 items-center justify-center">
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* Step 3 button */}
                <button
                  onClick={() => setActiveStep("output")}
                  className={`flex-1 p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-3 group/step ${
                    activeStep === "output"
                      ? "bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                      : "bg-neutral-950 border-neutral-900 hover:border-neutral-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                      <Layout className={`w-4 h-4 ${activeStep === "output" ? "text-emerald-400" : "text-neutral-500"}`} />
                    </div>
                    <span className="text-[9px] font-mono text-neutral-600 font-bold uppercase">STEP 03</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-white">Enterprise Yield</span>
                    <span className="text-[10px] text-neutral-500 font-mono mt-0.5 block uppercase">Visual report</span>
                  </div>
                </button>

              </div>
            </div>

            {/* Bottom details block with animated code & description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-neutral-900/60 items-center">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {stepDetails[activeStep].icon}
                  <span className="text-xs font-bold font-mono tracking-wide text-white uppercase">
                    {stepDetails[activeStep].title}
                  </span>
                </div>
                <p className="text-neutral-400 text-xs font-light leading-relaxed">
                  {stepDetails[activeStep].desc}
                </p>
              </div>

              {/* Console preview block */}
              <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-4 overflow-x-auto whitespace-pre font-mono text-[9px] text-neutral-400 leading-normal select-all select-none">
                <code>{stepDetails[activeStep].code}</code>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
