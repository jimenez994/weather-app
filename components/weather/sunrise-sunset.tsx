"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Sunrise, Sunset } from "lucide-react";
import type { DailyForecast } from "@/types/weather";
import { formatTime } from "@/lib/utils";
import { sunriseSunsetConfig } from "@/lib/metric-info-configs";
import GlassCard from "@/components/ui/glass-card";
import AnimatedContainer from "@/components/ui/animated-container";
import MetricInfoPopover from "@/components/ui/metric-info-popover";

interface SunriseSunsetProps {
  daily: DailyForecast;
}

const SunriseSunset = memo(function SunriseSunset({ daily }: SunriseSunsetProps) {
  const todaySunrise = daily.sunrise[0];
  const todaySunset = daily.sunset[0];

  const progress = useMemo(() => {
    const now = new Date();
    const sunrise = new Date(todaySunrise);
    const sunset = new Date(todaySunset);
    const total = sunset.getTime() - sunrise.getTime();
    const elapsed = now.getTime() - sunrise.getTime();
    return Math.max(0, Math.min(1, elapsed / total));
  }, [todaySunrise, todaySunset]);

  return (
    <AnimatedContainer delay={0.65}>
      <GlassCard className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-xs font-medium text-white/55 uppercase tracking-widest">Sun</p>
          <MetricInfoPopover config={sunriseSunsetConfig(todaySunrise, todaySunset)} />
        </div>

        <div className="relative py-6">
          {/* <svg viewBox="0 0 200 80" className="w-full"> */}
          <svg viewBox="0 0 200 80" className="w-full overflow-visible">
            <path
              d="M 10,70 Q 100,-10 190,70"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <motion.circle
              r="6"
              fill="white"
              filter="url(#sunGlow)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              style={{
                offsetPath: `path("M 10,70 Q 100,-10 190,70")`,
                offsetDistance: `${progress * 100}%`,
                filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))",
              }}
            />
            <defs>
              {/* <filter id="sunGlow"> */}
                <filter
                  id="sunGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-2">
              <Sunrise className="w-4 h-4 text-amber-400/70" />
              <div>
                <p className="text-sm text-white/70 font-medium">{formatTime(todaySunrise)}</p>
                <p className="text-[10px] text-white/50">Sunrise</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm text-white/70 font-medium">{formatTime(todaySunset)}</p>
                <p className="text-[10px] text-white/50">Sunset</p>
              </div>
              <Sunset className="w-4 h-4 text-amber-400/70" />
            </div>
          </div>
        </div>
      </GlassCard>
    </AnimatedContainer>
  );
});

export default SunriseSunset;
