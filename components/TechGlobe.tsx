"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { StaticService } from "@/lib/services";

const techLogos = StaticService.getTechStack();

export const TechGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2000);
    camera.position.z = 600;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(800, 600);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    const sprites: any[] = [];
    const gridCols = 5;
    const spacing = 150;

    techLogos.forEach((tech, i) => {
      const logoUrl = `https://cdn.simpleicons.org/${tech.slug}/000000`;

      textureLoader.load(logoUrl, (texture) => {
        const material = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0.6,
        });

        const sprite = new THREE.Sprite(material);
        sprite.scale.set(50, 50, 1);

        // Calculate grid position
        const col = i % gridCols;
        const row = Math.floor(i / gridCols);

        const x = (col - (gridCols - 1) / 2) * spacing;
        const y = -(row - 2) * spacing;
        const z = (Math.random() - 0.5) * 100;

        sprite.position.set(x, y, z);

        // Save original data for interaction
        const spriteData = {
          mesh: sprite,
          originalPos: new THREE.Vector3(x, y, z),
          velocity: new THREE.Vector3(),
          phase: Math.random() * Math.PI * 2,
        };

        sprites.push(spriteData);
        logoGroup.add(sprite);
      });
    });

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      mouse.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 1200;
      mouse.current.y = -((event.clientY - rect.top) / rect.height - 0.5) * 900;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      sprites.forEach((s) => {
        const { mesh, originalPos, phase } = s;

        // Floating animation
        const floatY = Math.sin(time + phase) * 10;
        const floatZ = Math.cos(time * 0.5 + phase) * 20;

        // Magnetic Attraction / Repulsion Logic
        const dx = mouse.current.x - mesh.position.x;
        const dy = mouse.current.y - mesh.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const targetPos = originalPos.clone();

        if (dist < 400) {
          // Add a subtle magnetic "tilt" or displacement
          const force = (400 - dist) / 400;
          targetPos.x += dx * force * 0.3;
          targetPos.y += dy * force * 0.3;
          targetPos.z += force * 150; // Push forward towards user
          mesh.material.opacity = 0.6 + force * 0.4; // Brighten on hover
        } else {
          mesh.material.opacity = 0.4;
        }

        targetPos.y += floatY;
        targetPos.z += floatZ;

        // Smoothly lerp towards target position
        mesh.position.lerp(targetPos, 0.1);
      });

      // Subtle scene rotation based on mouse
      logoGroup.rotation.y += (mouse.current.x * 0.0001 - logoGroup.rotation.y) * 0.05;
      logoGroup.rotation.x += (-mouse.current.y * 0.0001 - logoGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = width * 0.6;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1200px] min-h-[400px] md:min-h-[600px] mx-auto flex items-center justify-center grayscale"
    />
  );
};
