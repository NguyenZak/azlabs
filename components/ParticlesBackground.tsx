"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type ParticlesBackgroundProps = {
  particleCount?: number;
  color?: string;
  backgroundColor?: string;
  speed?: number;
  opacity?: number;
  interactive?: boolean;
};

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  particleCount = 120, // Tối ưu số lượng để ổn định
  color = "#4285F4",
  backgroundColor = "transparent",
  speed = 0.5,
  opacity = 0.4,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = new THREE.Scene();
    let camera: THREE.PerspectiveCamera | null = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 800;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: backgroundColor === "transparent",
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      if (backgroundColor !== "transparent") {
        renderer.setClearColor(backgroundColor);
      }
      
      containerRef.current.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("AZLABS: Three.js fallback enabled due to WebGL issues.");
      return;
    }

    // --- Geometry & Materials ---
    const particlesData: any[] = [];
    const maxParticleCount = Math.min(particleCount, 200);
    const r = 800;
    const rHalf = r / 2;

    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(maxParticleCount * 3);

    for (let i = 0; i < maxParticleCount; i++) {
      positions[i * 3] = Math.random() * r - rHalf;
      positions[i * 3 + 1] = Math.random() * r - rHalf;
      positions[i * 3 + 2] = Math.random() * r - rHalf;

      particlesData.push({
        velocity: new THREE.Vector3(
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
          -1 + Math.random() * 2
        ).multiplyScalar(speed),
      });
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const pMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 4,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: opacity,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(particlesGeometry, pMaterial);
    scene.add(points);

    // --- Lines (Plexus) ---
    const lineSegments = maxParticleCount * maxParticleCount;
    const linePositions = new Float32Array(lineSegments * 3);
    const lineColors = new Float32Array(lineSegments * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // --- Interaction & Events ---
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      console.warn("AZLABS: WebGL Context Lost. Pausing animation...");
      cancelAnimationFrame(frameId);
    };

    if (interactive) window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    renderer.domElement.addEventListener("webglcontextlost", onContextLost, false);

    // --- Animation ---
    let frameId: number;
    const animate = () => {
      if (!renderer || !scene || !camera) return;
      frameId = requestAnimationFrame(animate);

      let vertexpos = 0;
      let colorpos = 0;
      let numConnected = 0;

      for (let i = 0; i < maxParticleCount; i++) {
        positions[i * 3] += particlesData[i].velocity.x;
        positions[i * 3 + 1] += particlesData[i].velocity.y;
        positions[i * 3 + 2] += particlesData[i].velocity.z;

        if (positions[i * 3 + 1] < -rHalf || positions[i * 3 + 1] > rHalf)
          particlesData[i].velocity.y = -particlesData[i].velocity.y;

        if (positions[i * 3] < -rHalf || positions[i * 3] > rHalf)
          particlesData[i].velocity.x = -particlesData[i].velocity.x;

        if (positions[i * 3 + 2] < -rHalf || positions[i * 3 + 2] > rHalf)
          particlesData[i].velocity.z = -particlesData[i].velocity.z;

        // Plexus Logic
        for (let j = i + 1; j < maxParticleCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 150) {
            numConnected++;
            const alpha = 1.0 - dist / 150;

            linePositions[vertexpos++] = positions[i * 3];
            linePositions[vertexpos++] = positions[i * 3 + 1];
            linePositions[vertexpos++] = positions[i * 3 + 2];

            linePositions[vertexpos++] = positions[j * 3];
            linePositions[vertexpos++] = positions[j * 3 + 1];
            linePositions[vertexpos++] = positions[j * 3 + 2];

            const c = new THREE.Color(color);
            lineColors[colorpos++] = c.r * alpha;
            lineColors[colorpos++] = c.g * alpha;
            lineColors[colorpos++] = c.b * alpha;
            lineColors[colorpos++] = c.r * alpha;
            lineColors[colorpos++] = c.g * alpha;
            lineColors[colorpos++] = c.b * alpha;
          }
        }
      }

      lineGeometry.setDrawRange(0, numConnected * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
      particlesGeometry.attributes.position.needsUpdate = true;

      points.rotation.y += 0.001;
      linesMesh.rotation.y += 0.001;

      if (interactive) {
        points.rotation.x += (mouse.current.y * 0.2 - points.rotation.x) * 0.05;
        points.rotation.y += (mouse.current.x * 0.2 - points.rotation.y) * 0.05;
        linesMesh.rotation.copy(points.rotation);
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Final Cleanup ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer) {
        renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
        cancelAnimationFrame(frameId);
        if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        renderer.forceContextLoss();
      }
      particlesGeometry.dispose();
      pMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      scene = null;
      camera = null;
      renderer = null;
    };
  }, [particleCount, color, backgroundColor, speed, opacity, interactive]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden" 
      style={{ background: backgroundColor }}
    />
  );
};

export default ParticlesBackground;
