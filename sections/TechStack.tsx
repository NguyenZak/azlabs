"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const techLogos = [
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "AWS", slug: "amazonaws" },
  { name: "Docker", slug: "docker" },
  { name: "Swift", slug: "swift" },
  { name: "Kotlin", slug: "kotlin" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Supabase", slug: "supabase" },
  { name: "Firebase", slug: "firebase" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Framer", slug: "framer" },
  { name: "Prisma", slug: "prisma" },
  { name: "OpenAI", slug: "openai" },
  { name: "Vercel", slug: "vercel" },
  { name: "Stripe", slug: "stripe" },
  { name: "GitHub", slug: "github" },
  { name: "Python", slug: "python" },
  { name: "Postman", slug: "postman" }
];

const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 1.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx!.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = 600;
      particles = [];
      for (let i = 0; i < 80; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    init();
    animate();
    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />;
};

export default function TechStack() {
  return (
    <section id="solutions" className="py-32 bg-white overflow-hidden relative">
      <NeuralBackground />
      
      <div className="max-w-[1440px] mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-[48px] md:text-[72px] font-bold tracking-tighter leading-none text-apple-text mb-6">
            Powered by world-class tech.
          </h2>
          <p className="text-lg md:text-xl text-apple-text-secondary max-w-2xl mx-auto font-light">
            Building the future with industry-leading infrastructure.
          </p>
        </motion.div>

        {/* Compact AI Tech Logo Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4 max-w-5xl mx-auto">
          {techLogos.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                y: -5, 
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderColor: "rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.3, delay: index * 0.01 }}
              className="group relative h-20 md:h-24 rounded-2xl border border-apple-border flex items-center justify-center bg-white/40 backdrop-blur-sm transition-all duration-300"
            >
              {/* Logo Image */}
              <img 
                src={`https://cdn.simpleicons.org/${tech.slug}/000000`} 
                alt={tech.name}
                className="h-6 md:h-8 w-auto opacity-40 group-hover:opacity-100 transition-all duration-300"
              />
              
              {/* Subtle Tooltip */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none uppercase tracking-widest whitespace-nowrap">
                {tech.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
