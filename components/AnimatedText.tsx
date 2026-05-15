"use client";

import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";

type AnimationEffect = "soft-blur-in" | "mask-reveal-up" | "line-by-line-slide";

interface AnimatedTextProps {
  text: string;
  effect?: AnimationEffect | "random";
  className?: string;
  delay?: number;
  once?: boolean;
}

const EFFECTS: AnimationEffect[] = ["soft-blur-in", "mask-reveal-up", "line-by-line-slide"];

export default function AnimatedText({
  text,
  effect = "random",
  className = "",
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  // Use a stable hash to pick the effect to avoid hydration mismatch
  const selectedEffect = useMemo(() => {
    if (effect !== "random") return effect;
    
    // Simple hash of the text to pick a stable effect
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return EFFECTS[Math.abs(hash) % EFFECTS.length];
  }, [effect, text]);

  // Split text into words/characters based on effect
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: getStagger(selectedEffect), 
        delayChildren: delay * i 
      },
    }),
  };

  function getStagger(effect: AnimationEffect) {
    switch (effect) {
      case "soft-blur-in": return 0.02; // Slightly faster for Safari
      case "mask-reveal-up": return 0.08;
      case "line-by-line-slide": return 0.1;
      default: return 0.05;
    }
  }

  const childVariants: Variants = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "tween",
        duration: getDuration(selectedEffect),
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hidden: getHiddenState(selectedEffect),
  };

  function getDuration(effect: AnimationEffect) {
    switch (effect) {
      case "soft-blur-in": return 0.8;
      case "mask-reveal-up": return 0.7;
      case "line-by-line-slide": return 0.8;
      default: return 0.8;
    }
  }

  function getHiddenState(effect: AnimationEffect) {
    switch (effect) {
      case "soft-blur-in":
        // Use a smaller blur for better Safari support
        return { opacity: 0, y: 10, filter: "blur(8px)" };
      case "mask-reveal-up":
        return { opacity: 0, y: "100%", filter: "blur(4px)" };
      case "line-by-line-slide":
        return { opacity: 0, x: -20 };
      default:
        return { opacity: 0 };
    }
  }

  // Common styling for Safari stability
  const safariStabilizer = {
    willChange: "transform, opacity, filter",
    WebkitFontSmoothing: "antialiased",
    backfaceVisibility: "hidden" as const,
  };

  // Soft Blur In works best per-character
  if (selectedEffect === "soft-blur-in") {
    return (
      <motion.span
        key={text}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        style={safariStabilizer}
        className={`inline-block ${className}`}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={childVariants}
            style={safariStabilizer}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // Mask Reveal Up and Line-by-line Slide work best per-line or per-word
  return (
    <motion.span
      key={text}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      style={safariStabilizer}
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <span 
          key={index} 
          className="inline-block overflow-hidden pb-[0.2em] -mb-[0.2em] mr-[0.25em]"
          style={{ verticalAlign: 'bottom' }}
        >
          <motion.span
            variants={childVariants}
            style={safariStabilizer}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
