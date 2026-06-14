"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  MousePointer2,
  ArrowUpRight,
  TrendingUp,
  Box,
  Layers,
  Cpu,
  Mail,
  Activity,
  Zap,
  Globe,
  Database,
  BarChart3,
  Users,
  Monitor
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";

/* ── Static chart data (replace with real data when ready) ── */
const trafficData = [
  { name: "Mon", views: 4000, clicks: 2400 },
  { name: "Tue", views: 3000, clicks: 1398 },
  { name: "Wed", views: 2000, clicks: 9800 },
  { name: "Thu", views: 2780, clicks: 3908 },
  { name: "Fri", views: 1890, clicks: 4800 },
  { name: "Sat", views: 2390, clicks: 3800 },
  { name: "Sun", views: 3490, clicks: 4300 },
];

const BAR_COLORS = ["#0071e3", "#10b981", "#f59e0b"];

/* ── Config ── */
const cmsStats = [
  { label: "Projects", key: "projects", icon: Box, color: "bg-blue-500", shadow: "shadow-blue-500/20" },
  { label: "Services", key: "services", icon: Layers, color: "bg-purple-500", shadow: "shadow-purple-500/20" },
  { label: "Tech Stack", key: "tech_stack", icon: Cpu, color: "bg-amber-500", shadow: "shadow-amber-500/20" },
  { label: "Contacts", key: "contacts", icon: Mail, color: "bg-emerald-500", shadow: "shadow-emerald-500/20" },
];

/* ── Small components ── */
const CmsStatCard = ({ label, value, icon: Icon, color, shadow, index }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    className="bg-neutral-950/60 p-5 md:p-7 rounded-2xl md:rounded-[32px] border border-neutral-900 shadow-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all group overflow-hidden relative"
  >
    <div className={`absolute top-0 right-0 w-28 h-28 ${color} opacity-[0.04] blur-3xl rounded-full -mr-8 -mt-8`} />
    <div className="flex justify-between items-start mb-4 md:mb-5 relative z-10">
      <div className={`w-10 h-10 md:w-12 md:h-12 ${color} rounded-xl md:rounded-2xl flex items-center justify-center text-white ${shadow}`}>
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>
    </div>
    <p className="text-neutral-500 font-semibold text-[10px] uppercase tracking-wider mb-1">{label}</p>
    <span className="text-2xl md:text-3xl font-black tracking-tighter text-white">{value}</span>
  </motion.div>
);

const ActivityRow = ({ title, desc, time, index }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -15 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 + index * 0.08 }}
    className="flex items-center justify-between p-5 hover:bg-neutral-900/50 rounded-2xl transition-all group"
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
        <Zap className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="font-bold text-sm text-white truncate">{title}</p>
        <p className="text-xs text-neutral-500 truncate">{desc}</p>
      </div>
    </div>
    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 bg-neutral-900 px-3 py-1 rounded-full shrink-0 ml-4 border border-neutral-800">
      {time}
    </span>
  </motion.div>
);

/* ══════════════════════ MAIN COMPONENT ══════════════════════ */
export default function AdminDashboard() {
  const supabase = createClient();
  const [counts, setCounts] = useState<any>({ projects: 0, services: 0, tech_stack: 0, contacts: 0 });
  const [pageViewCount, setPageViewCount] = useState(0);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [proj, serv, tech, cont, pv] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("tech_stack").select("*", { count: "exact", head: true }),
        supabase.from("contacts").select("*", { count: "exact", head: true }),
        supabase.from("page_views").select("*", { count: "exact", head: true }),
      ]);

      setCounts({
        projects: proj.count || 0,
        services: serv.count || 0,
        tech_stack: tech.count || 0,
        contacts: cont.count || 0,
      });
      setPageViewCount(pv.count || 0);

      const { data: contacts } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (contacts) {
        setRecentContacts(
          contacts.map((c) => ({
            title: `New inquiry — ${c.name}`,
            desc: c.message,
            time: new Date(c.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }))
        );
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-10 pb-20">
      {/* ── Header ── */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-[0.2em]">System Online</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white">Control Center</h1>
          <p className="text-neutral-500 mt-1 text-base md:text-lg font-medium">
            Real-time overview of AZLABS digital ecosystem.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <select className="bg-neutral-950 border border-neutral-900 rounded-2xl px-5 py-3 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>All Time</option>
          </select>
        </motion.div>
      </header>

      {/* ── CMS Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {cmsStats.map(({ key, ...stat }, i) => (
          <CmsStatCard key={key} {...stat} value={counts[key]} index={i} />
        ))}
      </div>

      {/* ── Analytics Hero Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Page Views", value: pageViewCount.toLocaleString(), icon: Eye, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Unique Visitors", value: "—", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
          { label: "Avg. Engagement", value: "4m 12s", icon: MousePointer2, color: "text-emerald-500", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.08 }}
            className="bg-neutral-950/60 p-7 rounded-[32px] border border-neutral-900 shadow-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all group"
          >
            <div className="flex justify-between items-start mb-5">
              <div className={`w-12 h-12 ${stat.bg.replace('50', '900/30')} border border-${stat.color.split('-')[1]}-500/20 rounded-2xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs bg-emerald-950/30 px-2 py-1 rounded-lg border border-emerald-500/20">
                <TrendingUp className="w-3.5 h-3.5" /> +12%
              </div>
            </div>
            <p className="text-neutral-500 font-semibold text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <span className="text-3xl font-black text-white">{stat.value}</span>
          </motion.div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Traffic Trends */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-neutral-950/60 p-6 md:p-10 rounded-[32px] md:rounded-[48px] border border-neutral-900 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
            <h2 className="text-lg md:text-xl font-black tracking-tight text-white">Traffic Trends</h2>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-neutral-500">
                <span className="w-2 h-2 rounded-full bg-[#0071e3] shadow-[0_0_10px_rgba(0,113,227,0.8)]" /> Views
              </span>
              <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-neutral-500">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" /> Clicks
              </span>
            </div>
          </div>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0071e3" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0071e3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1a1a1a" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 10 }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #262626", backgroundColor: "#0a0a0a", color: "#fff", boxShadow: "0 8px 30px rgba(0,0,0,0.5)" }} />
                <Area type="monotone" dataKey="views" stroke="#0071e3" strokeWidth={2} fill="url(#gViews)" />
                <Area type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Platform Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-neutral-950/60 p-10 rounded-[48px] border border-neutral-900 shadow-sm"
        >
          <h2 className="text-xl font-black tracking-tight mb-8 text-white">Platform Distribution</h2>
          <div className="grid grid-cols-2 gap-8 h-[300px]">
            <div className="space-y-6 flex flex-col justify-center">
              {[
                { label: "Chrome", value: 65, icon: Globe },
                { label: "Safari", value: 25, icon: Monitor },
                { label: "Others", value: 10, icon: Globe },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-neutral-400" /> {item.label}
                    </span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1.2, delay: 0.6 + i * 0.15 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: BAR_COLORS[i] }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Chrome", val: 65 },
                    { name: "Safari", val: 25 },
                    { name: "Others", val: 10 },
                  ]}
                >
                  <Bar dataKey="val" radius={[10, 10, 10, 10]}>
                    {[0, 1, 2].map((_, idx) => (
                      <Cell key={idx} fill={BAR_COLORS[idx]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom: Activity + System + Pages ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Live Feed */}
        <div className="lg:col-span-5 bg-neutral-950/60 p-8 rounded-[48px] border border-neutral-900 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                <Activity className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black tracking-tight text-white">Live Feed</h2>
            </div>
            <Link
              href="/adminaz/contacts"
              className="group flex items-center gap-1 text-xs font-bold bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all text-neutral-400"
            >
              All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-1">
            {recentContacts.length > 0 ? (
              recentContacts.map((a, i) => <ActivityRow key={i} {...a} index={i} />)
            ) : (
              <div className="py-16 text-center">
                <Mail className="w-10 h-10 mx-auto text-neutral-600 opacity-30 mb-3" />
                <p className="text-neutral-500 text-sm italic">No signals yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Pages */}
        <div className="lg:col-span-4 bg-neutral-950/60 p-8 rounded-[48px] border border-neutral-900 shadow-sm">
          <h2 className="text-lg font-black tracking-tight mb-6 text-white">Top Pages</h2>
          <div className="space-y-3">
            {[
              { path: "/", views: "42,390" },
              { path: "/services", views: "12,204" },
              { path: "/projects", views: "8,942" },
              { path: "/about", views: "4,102" },
              { path: "/contact", views: "2,810" },
            ].map((page, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-neutral-900/50 border border-neutral-800/50 rounded-2xl group hover:bg-blue-600/10 hover:border-blue-500/30 hover:text-blue-400 transition-all text-neutral-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center text-white group-hover:bg-blue-500/20 group-hover:text-blue-400 text-xs font-black transition-colors">
                    {i + 1}
                  </div>
                  <span className="font-bold text-sm font-mono">{page.path}</span>
                </div>
                <span className="text-xs font-bold opacity-60 text-neutral-500 group-hover:text-blue-400/60">{page.views}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Core */}
        <div className="lg:col-span-3 bg-neutral-950 border border-neutral-900 text-white p-8 rounded-[48px] shadow-[0_0_50px_rgba(59,130,246,0.05)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Zap className="w-20 h-20 text-blue-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-4 h-4 text-blue-500" />
              <h2 className="text-sm font-black uppercase tracking-widest">System</h2>
            </div>

            <div className="space-y-5">
              {[
                { label: "Supabase", icon: Database },
                { label: "Cloudinary", icon: Globe },
                { label: "Edge CDN", icon: Activity },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-xs opacity-50 font-medium">
                    <item.icon className="w-3 h-3" /> {item.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Online</span>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-5">
              {[
                { label: "Lighthouse", value: "98", pct: 98, color: "bg-emerald-400" },
                { label: "TTFB", value: "42ms", pct: 100, color: "bg-emerald-400" },
                { label: "Load", value: "2.4%", pct: 24, color: "bg-amber-400" },
              ].map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] opacity-40 font-bold uppercase tracking-widest">{m.label}</span>
                    <span className="text-xs font-bold">{m.value}</span>
                  </div>
                  <div className="w-full h-1 bg-neutral-950/60/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.pct}%` }}
                      transition={{ duration: 1.5, delay: 0.8 + i * 0.2 }}
                      className={`h-full ${m.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Nav */}
            <div className="mt-8 grid grid-cols-2 gap-2">
              {[
                { label: "Projects", icon: Box, href: "/adminaz/projects" },
                { label: "Services", icon: Layers, href: "/adminaz/services" },
                { label: "Contacts", icon: Mail, href: "/adminaz/contacts" },
                { label: "Stack", icon: Cpu, href: "/adminaz/tech-stack" },
              ].map((lnk, i) => (
                <Link
                  key={i}
                  href={lnk.href}
                  className="flex flex-col items-center p-4 bg-neutral-900/50 border border-neutral-800/50 rounded-2xl gap-2 hover:bg-blue-600/20 hover:border-blue-500/30 hover:text-blue-400 transition-all group text-neutral-400"
                >
                  <lnk.icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-all" />
                  <span className="text-[10px] font-bold tracking-wider uppercase">{lnk.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
