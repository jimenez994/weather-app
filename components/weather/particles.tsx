"use client";

import { useEffect, useRef } from "react";

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

export default function RainParticles({ type }: RainParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = Array.from({ length: type === "snow" ? 80 : 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: type === "snow" ? 0.3 + Math.random() * 0.7 : 8 + Math.random() * 12,
        opacity: type === "snow" ? 0.3 + Math.random() * 0.5 : 0.08 + Math.random() * 0.1,
        size: type === "snow" ? 2 + Math.random() * 4 : 1 + Math.random() * 1.5,
        wind: type === "snow" ? -0.3 + Math.random() * 0.6 : -0.5 + Math.random() * 1,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const color = type === "snow" ? "255, 255, 255" : "148, 163, 184";
      ctx.strokeStyle = `rgba(${color}, 0.3)`;
      ctx.fillStyle = `rgba(${color}, 0.3)`;

      particles.forEach((p) => {
        p.y += p.speed;
        p.x += p.wind;

        if (type === "rain") {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.wind * 2, p.y + p.speed * 1.5);
          ctx.strokeStyle = `rgba(${color}, ${p.opacity})`;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
          ctx.fill();
        }

        if (p.y > canvas.height + 10) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.x < -10) p.x = canvas.width + 10;
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [type]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}
