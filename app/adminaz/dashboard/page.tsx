"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Eye, 
  MousePointer2, 
  Clock,
  ArrowUpRight,
  TrendingUp
} from "lucide-react";

const stats = [
  { label: "Total Views", value: "24.5K", change: "+12%", icon: Eye },
  { label: "Interactions", value: "1.2K", change: "+5%", icon: MousePointer2 },
  { label: "Active Users", value: "854", change: "+18%", icon: Users },
  { label: "Avg. Session", value: "3m 42s", change: "-2%", icon: Clock },
];

const StatCard = ({ label, value, change, icon: Icon, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white p-8 rounded-[32px] border border-apple-border shadow-sm hover:shadow-xl transition-all group"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-[#f5f5f7] rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <span className={`text-sm font-bold px-2 py-1 rounded-lg ${change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {change}
      </span>
    </div>
    <h3 className="text-apple-text-secondary font-medium mb-1">{label}</h3>
    <div className="text-3xl font-bold tracking-tight text-apple-text">{value}</div>
  </motion.div>
);

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-apple-text">Dashboard</h1>
          <p className="text-apple-text-secondary mt-2">Welcome back. Here is what's happening today.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white border border-apple-border rounded-xl font-bold hover:bg-[#f5f5f7] transition-all">
            Export Report
          </button>
          <button className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:opacity-90 transition-all">
            Refresh Data
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-apple-border shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
            <Link href="/adminaz/activity" className="text-apple-accent font-medium flex items-center">
              View All <ArrowUpRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-apple-border last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold">Project "Nova Bank" Updated</div>
                    <div className="text-sm text-apple-text-secondary">Alex Nguyen changed 3 images via Cloudinary</div>
                  </div>
                </div>
                <div className="text-sm text-apple-text-secondary font-medium">2 hours ago</div>
              </div>
            ))}
          </div>
        </div>

        {/* CMS Status */}
        <div className="bg-black text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold tracking-tight mb-4">System Health</h2>
            <div className="space-y-6 mt-8">
              <div className="flex justify-between items-center">
                <span className="opacity-60">Database</span>
                <span className="bg-green-500 w-2 h-2 rounded-full animate-pulse" />
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-60">Cloudinary API</span>
                <span className="bg-green-500 w-2 h-2 rounded-full animate-pulse" />
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-60">Storage Used</span>
                <span className="font-bold">12.5 / 50 GB</span>
              </div>
            </div>
            <button className="w-full mt-12 py-4 bg-white text-black rounded-2xl font-bold hover:bg-[#f5f5f7] transition-all">
              Run Diagnostics
            </button>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-apple-accent opacity-20 blur-[100px] rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Helper for Link (missing import in the snippet)
import Link from "next/link";
