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
    <div className="min-h-screen bg-[#fbfbfd] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[32px] p-12 shadow-2xl border border-apple-border"
      >
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 shadow-xl">
            <AppleIcon icon={Sparkles} className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-apple-text">AZLABS Admin</h1>
          <p className="text-apple-text-secondary mt-2">Sign in to manage your world-class site.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium"
            >
              {error}
            </motion.div>
          )}
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-apple-text-secondary" />
              <input 
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all text-apple-text font-medium"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-apple-text-secondary" />
              <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-apple-accent transition-all text-apple-text font-medium"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg flex items-center justify-center group hover:bg-apple-text transition-all shadow-xl disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Sign In"}
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-apple-text-secondary">
            Authorized access only. All activities are logged.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
