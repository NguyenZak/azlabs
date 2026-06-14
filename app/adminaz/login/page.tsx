"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AppleIcon } from "@/components/AppleIcon";
import { Lock, User, ChevronRight, Sparkles } from "lucide-react";

import { createClient } from "@/utils/supabase/client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push("/adminaz/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-neutral-950/80 rounded-[32px] p-12 shadow-[0_0_50px_rgba(59,130,246,0.1)] border border-neutral-900 backdrop-blur-xl"
      >
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <Sparkles className="text-blue-400 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase">AZLABS SYS</h1>
          <p className="text-neutral-500 mt-2 text-sm tracking-wider">SECURE ACCESS REQUIRED</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl text-sm font-bold uppercase tracking-wider"
            >
              {error}
            </motion.div>
          )}
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input 
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white font-bold"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white font-bold"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-lg flex items-center justify-center group hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] disabled:opacity-50"
          >
            {isLoading ? "AUTHENTICATING..." : "INITIALIZE LOGIN"}
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
            Authorized access only. All activities are logged.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
