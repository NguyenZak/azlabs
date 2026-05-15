"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  PieChart, 
  LineChart as LineChartIcon, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer2, 
  ArrowUpRight,
  Globe,
  Smartphone,
  Monitor
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', views: 4000, clicks: 2400 },
  { name: 'Tue', views: 3000, clicks: 1398 },
  { name: 'Wed', views: 2000, clicks: 9800 },
  { name: 'Thu', views: 2780, clicks: 3908 },
  { name: 'Fri', views: 1890, clicks: 4800 },
  { name: 'Sat', views: 2390, clicks: 3800 },
  { name: 'Sun', views: 3490, clicks: 4300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-10 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-apple-accent" />
            <span className="text-xs font-bold text-apple-accent uppercase tracking-widest">Intelligence</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-apple-text">Analytics Overview</h1>
          <p className="text-apple-text-secondary mt-2">Diving deep into user behavior and system performance.</p>
        </div>
        <div className="flex gap-4">
          <select className="bg-white border border-apple-border rounded-xl px-4 py-2 font-bold text-sm focus:outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>All Time</option>
          </select>
        </div>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Page Views", value: "84.2K", change: "+12.5%", icon: Eye, color: "text-blue-500" },
          { label: "Unique Visitors", value: "12.8K", change: "+8.2%", icon: Users, color: "text-purple-500" },
          { label: "Avg. Engagement", value: "4m 12s", change: "+5.1%", icon: MousePointer2, color: "text-emerald-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[40px] border border-apple-border shadow-sm group hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 bg-apple-bg-secondary rounded-2xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                <TrendingUp className="w-4 h-4" />
                {stat.change}
              </div>
            </div>
            <p className="text-apple-text-secondary font-medium mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-apple-text">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Traffic Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-[48px] border border-apple-border shadow-sm"
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black tracking-tight">Traffic Trends</h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-apple-text-secondary">
                <div className="w-2 h-2 rounded-full bg-apple-accent" /> Views
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-apple-text-secondary">
                <div className="w-2 h-2 rounded-full bg-emerald-400" /> Clicks
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0071e3" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0071e3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#86868b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#86868b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#0071e3', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="views" stroke="#0071e3" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={4} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Browser Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-10 rounded-[48px] border border-apple-border shadow-sm"
        >
          <h2 className="text-2xl font-black tracking-tight mb-10">Platform Distribution</h2>
          <div className="grid grid-cols-2 gap-8 h-[350px]">
            <div className="space-y-6">
              {[
                { label: "Chrome", value: 65, icon: Globe },
                { label: "Safari", value: 25, icon: Monitor },
                { label: "Mobile App", value: 10, icon: Globe },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="flex items-center gap-2"><item.icon className="w-4 h-4" /> {item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-apple-bg-secondary rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-apple-text" 
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Chrome', val: 65 },
                  { name: 'Safari', val: 25 },
                  { name: 'Others', val: 10 },
                ]}>
                  <Bar dataKey="val" radius={[10, 10, 10, 10]}>
                    {[0, 1, 2].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Device & Location Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-apple-border shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-8">Top Performing Pages</h2>
          <div className="space-y-4">
            {[
              { path: "/", views: "42,390", time: "1m 45s", bounce: "12%" },
              { path: "/services", views: "12,204", time: "2m 10s", bounce: "8%" },
              { path: "/projects", views: "8,942", time: "3m 05s", bounce: "15%" },
              { path: "/about", views: "4,102", time: "1m 12s", bounce: "24%" },
            ].map((page, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-apple-bg-secondary rounded-3xl group hover:bg-black hover:text-white transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-apple-text group-hover:text-black font-bold">
                    {i + 1}
                  </div>
                  <span className="font-bold">{page.path}</span>
                </div>
                <div className="flex gap-12 text-sm font-bold">
                  <div className="text-right">
                    <p className="opacity-40 uppercase tracking-widest text-[10px]">Views</p>
                    <p>{page.views}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="opacity-40 uppercase tracking-widest text-[10px]">Avg Time</p>
                    <p>{page.time}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="opacity-40 uppercase tracking-widest text-[10px]">Bounce</p>
                    <p className={`text-emerald-500 ${i === 3 ? 'text-red-400' : ''}`}>{page.bounce}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black tracking-tight mb-8">System Performance</h2>
            <div className="space-y-10">
              <div>
                <div className="flex justify-between mb-4">
                  <span className="opacity-60 text-sm font-bold uppercase tracking-widest">Lighthouse Score</span>
                  <span className="text-emerald-400 font-bold">98/100</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full">
                  <div className="w-[98%] h-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-4">
                  <span className="opacity-60 text-sm font-bold uppercase tracking-widest">TTFB</span>
                  <span className="font-bold text-emerald-400">42ms</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full">
                  <div className="w-[100%] h-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-4">
                  <span className="opacity-60 text-sm font-bold uppercase tracking-widest">Server Load</span>
                  <span className="font-bold text-amber-400">2.4%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full">
                  <div className="w-[24%] h-full bg-amber-400" />
                </div>
              </div>
            </div>

            <div className="mt-16 p-6 bg-white/5 rounded-[32px] border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
                </div>
                <p className="font-bold text-sm uppercase tracking-widest">Optimization active</p>
              </div>
              <p className="text-xs opacity-40 leading-relaxed">
                AZLABS Edge Engine is currently optimizing assets for 42 concurrent users in 12 regions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing imports for lucide-react
import { Activity } from "lucide-react";
