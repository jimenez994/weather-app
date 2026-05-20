"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { getWeatherCondition } from "@/lib/utils";
import RainParticles from "./particles";

interface Props {
  weatherCode: number;
  temperature?: number;
  isDay?: boolean;
  children: React.ReactNode;
}

const dayGradients: Record<string, string> = {
  clear:
    "linear-gradient(135deg, #0284c7 0%, #0ea5e9 40%, #7dd3fc 100%)",
  "partly-cloudy":
    "linear-gradient(135deg, #0369a1 0%, #38bdf8 50%, #94a3b8 100%)",
  cloudy:
    "linear-gradient(135deg, #475569 0%, #64748b 50%, #9ca3af 100%)",
  overcast:
    "linear-gradient(135deg, #334155 0%, #475569 50%, #64748b 100%)",
  rain:
    "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 40%, #64748b 100%)",
  drizzle:
    "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #64748b 100%)",
  snow:
    "linear-gradient(135deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)",
  sleet:
    "linear-gradient(135deg, #475569 0%, #64748b 50%, #94a3b8 100%)",
  thunderstorm:
    "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #475569 100%)",
  fog:
    "linear-gradient(135deg, #64748b 0%, #94a3b8 50%, #b0bec5 100%)",
};

const nightGradients: Record<string, string> = {
  clear:
    "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c1445 100%)",
  "partly-cloudy":
    "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
  cloudy:
    "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)",
  overcast:
    "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
  rain:
    "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e3a8a 100%)",
  drizzle:
    "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e3a8a 100%)",
  snow:
    "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
  sleet:
    "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
  thunderstorm:
    "linear-gradient(135deg, #020617 0%, #0f172a 50%, #312e81 100%)",
  fog:
    "linear-gradient(135deg, #1e293b 0%, #334155 50%, #0f172a 100%)",
};

export default function WeatherBackground({
  weatherCode,
  temperature,
  isDay = true,
  children,
}: Props) {
  const controls = useAnimation();
  const prev = useRef<number | null>(null);

  const condition = getWeatherCondition(weatherCode);
  const gradients = isDay ? dayGradients : nightGradients;
  const background = gradients[condition] ?? gradients.clear ?? nightGradients.clear;

  const tempC = typeof temperature === "number" && !isNaN(temperature) ? temperature : null;

  // subtle warm/cool tint overlay based on temperature
  const tempTint = useMemo(() => {
    if (tempC === null) return null;
    if (tempC > 32) return "rgba(255,180,50,0.06)";   // hot amber wash
    if (tempC > 25) return "rgba(255,200,80,0.04)";    // warm tint
    if (tempC < 0) return "rgba(100,160,255,0.08)";    // cold blue wash
    if (tempC < 10) return "rgba(130,180,240,0.04)";   // cool tint
    return null;
  }, [tempC]);

  const showParticles =
    condition === "rain" ||
    condition === "drizzle" ||
    condition === "snow" ||
    condition === "sleet" ||
    condition === "thunderstorm";

  useEffect(() => {
    if (prev.current !== weatherCode) {
      controls.start({
        opacity: [0.92, 1],
        transition: { duration: 0.35 },
      });
      prev.current = weatherCode;
    }
  }, [weatherCode, controls]);

  return (
    <motion.div
      animate={controls}
      className="relative min-h-screen overflow-hidden"
      style={{
        background,
        willChange: "opacity",
      }}
    >
      {/* temperature tint overlay */}
      {tempTint && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ background: tempTint }}
        />
      )}

      {/* light atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-radial from-white/10 via-transparent to-transparent" />

      {/* particles */}
      {showParticles && (
        <div className="opacity-80">
          <RainParticles type={condition === "snow" ? "snow" : "rain"} />
        </div>
      )}

      {/* thunderstorm — subtle static overlay, no continuous animation */}
      {condition === "thunderstorm" && (
        <div className="absolute inset-0 pointer-events-none bg-white/[0.03]" />
      )}

      {/* content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
