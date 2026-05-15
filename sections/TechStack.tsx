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

import AnimatedText from "@/components/AnimatedText";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TechStack({ data = [] }: { data?: any[] }) {
  const [mounted, setMounted] = React.useState(false);
  const { dict } = useLanguage();
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const displayLogos = data.length > 0 ? data : techLogos;

  if (!mounted) return null;

  return (
    <section id="tech-stack" className="py-32 bg-white overflow-hidden relative">
      <NeuralBackground />
      
      <div className="max-w-[1440px] mx-auto px-6 relative z-10 text-center">
        <div className="mb-24">
          <h2 className="text-[48px] md:text-[72px] font-bold tracking-tighter leading-none text-apple-text mb-6">
            <AnimatedText text={dict.techStack.title} effect="random" />
          </h2>
          <p className="text-lg md:text-xl text-apple-text-secondary max-w-2xl mx-auto font-light">
            {dict.techStack.subtitle}
          </p>
        </div>

        {/* Organic Logo Universe - Stable & Visible */}
        <div className="relative h-[600px] md:h-[800px] w-full max-w-7xl mx-auto">
          {displayLogos.map((tech, index) => {
            const logoUrlRaw = tech.logo_url || `https://cdn.simpleicons.org/${tech.slug}/000000`;
            
            const toBase64 = (str: string) => {
              if (typeof window === 'undefined') return Buffer.from(str).toString('base64');
              return window.btoa(unescape(encodeURIComponent(str)));
            };

            const logoUrl = logoUrlRaw.startsWith('<svg') 
              ? `data:image/svg+xml;base64,${toBase64(logoUrlRaw)}`
              : logoUrlRaw;
               
            const techName = tech.name;

            // Differentiated sizes for organic feel
            const sizes = [
              "w-14 h-14 md:w-20 md:h-20 z-10",
              "w-12 h-12 md:w-16 md:h-16 z-20",
              "w-10 h-10 md:w-14 md:h-14 z-10",
              "w-8 h-8 md:w-12 md:h-12 z-0",
            ];
            
            const positions = [
              { top: "5%", left: "10%" },
              { top: "15%", left: "45%" },
              { top: "5%", left: "75%" },
              { top: "35%", left: "5%" },
              { top: "30%", left: "25%" },
              { top: "40%", left: "55%" },
              { top: "35%", left: "85%" },
              { top: "65%", left: "15%" },
              { top: "60%", left: "40%" },
              { top: "70%", left: "70%" },
              { top: "85%", left: "10%" },
              { top: "80%", left: "30%" },
              { top: "85%", left: "55%" },
              { top: "80%", left: "85%" },
              { top: "20%", left: "65%" },
              { top: "50%", left: "15%" },
              { top: "10%", left: "30%" },
              { top: "55%", left: "75%" },
              { top: "45%", left: "35%" },
              { top: "75%", left: "50%" },
            ];

            const sizeClass = sizes[index % sizes.length];
            const pos = positions[index % positions.length];
            const rotation = (index % 3 === 0 ? 8 : index % 2 === 0 ? -5 : 3);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: index * 0.05,
                }}
                style={{ 
                  position: 'absolute',
                  top: pos.top,
                  left: pos.left,
                  rotate: `${rotation}deg`
                }}
                className={`
                  group flex items-center justify-center 
                  transition-all duration-500
                  hover:scale-125 hover:rotate-0 hover:z-50
                  ${sizeClass}
                `}
              >
                <img 
                  src={logoUrl} 
                  alt={techName}
                  className="h-full w-full object-contain opacity-100 group-hover:drop-shadow-2xl transition-all duration-300"
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase tracking-widest pointer-events-none whitespace-nowrap">
                  {techName}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
