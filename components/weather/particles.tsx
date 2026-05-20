"use client";

import { memo, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  size: number;
  wind: number;
}

interface RainParticlesProps {
  type: "rain" | "snow";
}

function RainParticlesComponent({ type }: RainParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    if (!ctx) return;

    let animationId = 0;
    let particles: Particle[] = [];
    let resizeTimeout: NodeJS.Timeout;
    let lastFrameTime = 0;
    let isVisible = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const TARGET_FPS = 30;
    const FRAME_TIME = 1000 / TARGET_FPS;

    const PARTICLE_COUNT = prefersReducedMotion
      ? type === "snow"
        ? 15
        : 20
      : type === "snow"
        ? 35
        : 50;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        createParticles();
      }, 120);
    };

    const createParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed:
          type === "snow"
            ? 0.2 + Math.random() * 0.5
            : 4 + Math.random() * 6,
        opacity:
          type === "snow"
            ? 0.2 + Math.random() * 0.35
            : 0.05 + Math.random() * 0.06,
        size:
          type === "snow"
            ? 1.5 + Math.random() * 2.5
            : 0.8 + Math.random() * 1,
        wind:
          type === "snow"
            ? -0.2 + Math.random() * 0.4
            : -0.3 + Math.random() * 0.6,
      }));
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";

      if (isVisible) {
        lastFrameTime = performance.now();
        animate(lastFrameTime);
      } else {
        cancelAnimationFrame(animationId);
      }
    };

    const animate = (timestamp: number) => {
      if (!isVisible) return;

      const delta = timestamp - lastFrameTime;

      if (delta < FRAME_TIME) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const color = type === "snow" ? "255,255,255" : "148,163,184";

      particles.forEach((p) => {
        p.y += p.speed;
        p.x += p.wind;

        // recycle particles before fully leaving screen
        if (p.y > window.innerHeight + 5) {
          p.y = -5;
          p.x = Math.random() * window.innerWidth;
        }

        if (p.x > window.innerWidth + 5) p.x = -5;
        if (p.x < -5) p.x = window.innerWidth + 5;

        // skip fully offscreen particles
        if (
          p.x < -10 ||
          p.x > window.innerWidth + 10 ||
          p.y < -10 ||
          p.y > window.innerHeight + 10
        ) {
          return;
        }

        if (type === "rain") {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${color}, ${p.opacity})`;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.wind * 2, p.y + p.speed * 1.5);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();

    if (!prefersReducedMotion) {
      animationId = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", debouncedResize, {
      passive: true,
    });

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      cancelAnimationFrame(animationId);

      clearTimeout(resizeTimeout);

      window.removeEventListener("resize", debouncedResize);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      particles = [];
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}

export default memo(RainParticlesComponent);

