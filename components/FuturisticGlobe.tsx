"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const FuturisticGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const isVisible = useRef(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Visibility Check ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 4000);
    camera.position.z = 1200;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true }); // Antialias off for performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Capped pixel ratio
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Style the canvas element to fill container absolutely
    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.objectFit = "cover";

    containerRef.current.appendChild(canvas);

    // --- Container ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- 1. The Central Globe ---
    const globeGroup = new THREE.Group();
    mainGroup.add(globeGroup);

    const radius = 420;
    const particleCount = 1500; // Further reduced
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: "#4285F4",
      size: 1.5,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    globeGroup.add(new THREE.Points(geometry, material));

    const wireframeGeom = new THREE.IcosahedronGeometry(radius, 4);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: "#4285F4",
      wireframe: true,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending
    });
    globeGroup.add(new THREE.Mesh(wireframeGeom, wireframeMat));

    // --- 2. Plexus Network ---
    const plexusGroup = new THREE.Group();
    mainGroup.add(plexusGroup);

    const plexusParticleCount = 120; // Reduced from 180
    const plexusRangeX = 3000;
    const plexusRangeY = 1800;
    const plexusRangeZ = 1200;

    const plexusParticles: any[] = [];
    const plexusGeometry = new THREE.BufferGeometry();
    const plexusPositions = new Float32Array(plexusParticleCount * 3);

    for (let i = 0; i < plexusParticleCount; i++) {
      const x = (Math.random() - 0.5) * plexusRangeX;
      const y = (Math.random() - 0.5) * plexusRangeY;
      const z = (Math.random() - 0.5) * plexusRangeZ;

      plexusPositions[i * 3] = x;
      plexusPositions[i * 3 + 1] = y;
      plexusPositions[i * 3 + 2] = z;

      plexusParticles.push({
        pos: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4
        )
      });
    }

    plexusGeometry.setAttribute("position", new THREE.BufferAttribute(plexusPositions, 3).setUsage(THREE.DynamicDrawUsage));
    const plexusPoints = new THREE.Points(plexusGeometry, new THREE.PointsMaterial({
      color: "#4285F4",
      size: 3,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    }));
    plexusGroup.add(plexusPoints);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#4285F4",
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });
    const lineGeometry = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    plexusGroup.add(lineMesh);

    // --- Animation ---
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let frameId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate);

      // PAUSE if not visible
      if (!isVisible.current) return;

      // Throttle update slightly if needed, but keeping it 60fps
      const delta = time - lastTime;
      lastTime = time;

      globeGroup.rotation.y += 0.0008;

      const linePositions = [];
      const maxDistance = 450;

      for (let i = 0; i < plexusParticleCount; i++) {
        const p = plexusParticles[i];
        p.pos.add(p.velocity);

        if (Math.abs(p.pos.x) > plexusRangeX / 2) p.velocity.x *= -1;
        if (Math.abs(p.pos.y) > plexusRangeY / 2) p.velocity.y *= -1;
        if (Math.abs(p.pos.z) > plexusRangeZ / 2) p.velocity.z *= -1;

        plexusPositions[i * 3] = p.pos.x;
        plexusPositions[i * 3 + 1] = p.pos.y;
        plexusPositions[i * 3 + 2] = p.pos.z;

        // Optimization: Only check lines for every 2nd particle or reduce frequency
        for (let j = i + 1; j < plexusParticleCount; j++) {
          const p2 = plexusParticles[j];
          const distSq = p.pos.distanceToSquared(p2.pos);
          if (distSq < maxDistance * maxDistance) {
            linePositions.push(p.pos.x, p.pos.y, p.pos.z);
            linePositions.push(p2.pos.x, p2.pos.y, p2.pos.z);
          }
        }
      }

      plexusGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

      mainGroup.rotation.y += (mouse.current.x * 0.12 - mainGroup.rotation.y) * 0.03;
      mainGroup.rotation.x += (-mouse.current.y * 0.12 - mainGroup.rotation.x) * 0.03;

      renderer.render(scene, camera);
    };

    requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(frameId);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose of everything
      scene.clear();
      geometry.dispose();
      wireframeGeom.dispose();
      plexusGeometry.dispose();
      lineGeometry.dispose();

      material.dispose();
      wireframeMat.dispose();
      lineMaterial.dispose();
      (plexusPoints.material as THREE.Material).dispose();

      renderer.dispose();
      renderer.forceContextLoss(); // Tell the browser to free this context immediately
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-0 mix-blend-screen"
    />
  );
};
