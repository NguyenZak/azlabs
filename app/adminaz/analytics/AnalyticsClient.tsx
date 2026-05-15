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

export default function AnalyticsClient({ stats, contacts, projects }: { stats: any, contacts: any[], projects: any[] }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <div className="p-20 text-center font-bold">Loading intelligence data...</div>;

  return (
    <div className="space-y-10 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-apple-accent" />
            <span className="text-xs font-bold text-apple-accent uppercase tracking-widest">Intelligence</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-apple-text">Analytics Overview</h1>
          <p className="text-apple-text-secondary mt-2">Diving deep into real-time content and lead performance.</p>
        </div>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Content Items", value: stats.posts + stats.projects, icon: Eye, color: "text-blue-500" },
          { label: "Business Leads", value: stats.contacts, icon: Users, color: "text-purple-500" },
          { label: "Digital Assets", value: stats.media, icon: MousePointer2, color: "text-emerald-500" },
          { label: "Active Services", value: stats.services, icon: Activity, color: "text-orange-500" },
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
                Live
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
            <h2 className="text-2xl font-black tracking-tight">Activity Trends</h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-apple-text-secondary">
                <div className="w-2 h-2 rounded-full bg-apple-accent" /> Content
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-apple-text-secondary">
                <div className="w-2 h-2 rounded-full bg-emerald-400" /> Leads
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
          <h2 className="text-2xl font-black tracking-tight mb-10">Recent Projects</h2>
          <div className="space-y-4">
            {projects.slice(0, 5).map((project, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-apple-bg-secondary rounded-2xl">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-lg overflow-hidden border border-apple-border">
                     <img src={project.image_url} alt="" className="w-full h-full object-cover" />
                   </div>
                   <span className="font-bold text-sm truncate max-w-[150px]">{project.title_en}</span>
                </div>
                <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {project.category_en}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Leads Table */}
      <div className="bg-white p-10 rounded-[48px] border border-apple-border shadow-sm">
        <h2 className="text-2xl font-black tracking-tight mb-8">Recent Inquiries & Leads</h2>
        <div className="space-y-4">
          {contacts.length > 0 ? (
            contacts.slice(0, 5).map((contact, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-apple-bg-secondary rounded-3xl group hover:bg-black hover:text-white transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-apple-text group-hover:text-black font-black">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{contact.name}</p>
                    <p className="text-xs opacity-50">{contact.email}</p>
                  </div>
                </div>
                <div className="flex gap-12 text-sm font-bold">
                  <div className="text-right hidden sm:block">
                    <p className="opacity-40 uppercase tracking-widest text-[10px]">Company</p>
                    <p>{contact.company || "Individual"}</p>
                  </div>
                  <div className="text-right">
                    <p className="opacity-40 uppercase tracking-widest text-[10px]">Status</p>
                    <p className="text-apple-accent">{contact.status}</p>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="opacity-40 uppercase tracking-widest text-[10px]">Date</p>
                    <p>{new Date(contact.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-apple-text-secondary font-medium">No inquiries yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Missing imports for lucide-react
import { Activity } from "lucide-react";
