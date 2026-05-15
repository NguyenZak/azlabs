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
      case "soft-blur-in": return 0.025;
      case "mask-reveal-up": return 0.09;
      case "line-by-line-slide": return 0.12;
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
      case "soft-blur-in": return 0.9;
      case "mask-reveal-up": return 0.76;
      case "line-by-line-slide": return 0.9;
      default: return 0.8;
    }
  }

  function getHiddenState(effect: AnimationEffect) {
    switch (effect) {
      case "soft-blur-in":
        return { opacity: 0, y: 16, filter: "blur(12px)" };
      case "mask-reveal-up":
        return { opacity: 0, y: 30, filter: "blur(6px)" };
      case "line-by-line-slide":
        return { opacity: 0, x: -48 };
      default:
        return { opacity: 0 };
    }
  }

  // Soft Blur In works best per-character
  if (selectedEffect === "soft-blur-in") {
    return (
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        className={`inline-block ${className}`}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={childVariants}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // Mask Reveal Up and Line-by-line Slide work best per-line or per-word
  // For simplicity and "mask" effect, we'll do per-word with overflow-hidden containers if mask-reveal
  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className={`inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] mr-[0.25em]`}>
          <motion.span
            variants={childVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
