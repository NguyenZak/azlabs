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

export default function TechStack({ data = [] }: { data?: any[] }) {
  const displayLogos = data.length > 0 ? data : techLogos;
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

        {/* Extreme Organic Logo Universe */}
        <div className="relative h-[600px] md:h-[800px] w-full max-w-7xl mx-auto">
          {displayLogos.map((tech, index) => {
            const logoUrl = tech.logo_url || `https://cdn.simpleicons.org/${tech.slug}/000000`;
            const techName = tech.name;
            // Highly differentiated sizes
            const sizes = [
              "w-32 h-32 md:w-48 md:h-48 z-10", // Extra Large
              "w-24 h-24 md:w-36 md:h-36 z-20", // Large
              "w-20 h-20 md:w-28 md:h-28 z-30", // Medium
              "w-12 h-12 md:w-20 md:h-20 z-0 opacity-40", // Small (background feel)
              "w-16 h-16 md:w-24 md:h-24 z-10", // Small-Medium
            ];
            
            // Fixed-but-random positions to ensure they don't overlap too badly on small screens
            // while feeling "messy"
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
            const rotation = (index % 3 === 0 ? 12 : index % 2 === 0 ? -8 : 5);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                animate={{
                  y: [0, (index % 2 === 0 ? 15 : -15), 0],
                }}
                transition={{
                  opacity: { duration: 1, delay: index * 0.05 },
                  scale: { type: "spring", stiffness: 100, delay: index * 0.05 },
                  y: {
                    duration: 4 + (index % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                }}
                style={{ 
                  position: 'absolute',
                  top: pos.top,
                  left: pos.left,
                  rotate: `${rotation}deg`
                }}
                whileHover={{ 
                  scale: 1.2,
                  rotate: 0,
                  zIndex: 50,
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.15)",
                }}
                className={`
                  group flex items-center justify-center 
                  bg-white/40 backdrop-blur-xl border border-apple-border 
                  rounded-[24px] md:rounded-[48px] transition-all duration-700
                  ${sizeClass}
                `}
              >
                {/* Logo Image */}
                <img 
                  src={logoUrl} 
                  alt={techName}
                  className="h-1/3 md:h-1/2 w-auto opacity-40 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0"
                />
                
                {/* Float Tooltip */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none uppercase tracking-widest shadow-2xl">
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
