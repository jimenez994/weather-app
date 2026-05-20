"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Wind } from "lucide-react";
import type { AirQuality } from "@/types/weather";
import { getAirQualityLabel } from "@/lib/utils";
import { airQualityConfig } from "@/lib/metric-info-configs";
import GlassCard from "@/components/ui/glass-card";
import AnimatedContainer from "@/components/ui/animated-container";
import MetricInfoPopover from "@/components/ui/metric-info-popover";

interface AirQualityProps {
  data: AirQuality;
}

const AirQuality = memo(function AirQuality({ data }: AirQualityProps) {
  const now = new Date().toISOString();
  const index = data.time.findIndex((t) => t >= now);
  const idx = index >= 0 ? index : Math.max(data.time.length - 1, 0);
  const aqi = data.usAqi[idx] ?? 0;
  const pm25 = data.pm25[idx] ?? 0;
  const pm10 = data.pm10[idx] ?? 0;
  const quality = getAirQualityLabel(aqi);

  return (
    <AnimatedContainer delay={0.6}>
      <GlassCard className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Wind className="w-4 h-4 text-white/50" />
          <p className="text-xs font-medium text-white/50 uppercase tracking-widest">Air Quality</p>
          <MetricInfoPopover config={airQualityConfig(aqi)} />
        </div>

        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-3xl font-light text-white">{aqi}</p>
            <p className="text-sm text-white/60 mt-0.5">AQI Index</p>
          </div>
          <div
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${quality.color}20`, color: quality.color }}
          >
            {quality.label}
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/50">PM2.5</span>
              <span className="text-white/70">{pm25.toFixed(1)} µg/m³</span>
            </div>
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-white/40"
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(pm25, 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/50">PM10</span>
              <span className="text-white/70">{pm10.toFixed(1)} µg/m³</span>
            </div>
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-white/40"
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(pm10, 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              />
            </div>
          </div>
        </div>
      </GlassCard>
    </AnimatedContainer>
  );
});

export default AirQuality;
