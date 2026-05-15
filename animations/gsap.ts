import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const revealOnScroll = (element: string | HTMLElement, delay: number = 0) => {
  gsap.from(element, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    delay,
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
};

export const heroAnimation = (container: string | HTMLElement) => {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.from(".hero-small-text", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.5,
  })
    .from(
      ".hero-main-title",
      {
        opacity: 0,
        y: 40,
        duration: 1.2,
      },
      "-=0.6"
    )
    .from(
      ".hero-subheadline",
      {
        opacity: 0,
        y: 30,
        duration: 1,
      },
      "-=0.8"
    )
    .from(
      ".hero-ctas",
      {
        opacity: 0,
        y: 20,
        duration: 0.8,
      },
      "-=0.6"
    );

  return tl;
};
