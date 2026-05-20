"use client";

import { memo, useRef } from "react";
import { motion } from "framer-motion";
import type { HourlyForecast as HourlyType } from "@/types/weather";
import { formatHour, formatTemperature, getWeatherIconComponent } from "@/lib/utils";
import GlassCard from "@/components/ui/glass-card";
import AnimatedContainer from "@/components/ui/animated-container";

interface HourlyForecastProps {
  data: HourlyType;
}

const HourlyForecast = memo(function HourlyForecast({ data }: HourlyForecastProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatedContainer delay={0.2}>
      <GlassCard className="p-4 md:p-6">
        <p className="text-xs font-medium text-white/50 uppercase tracking-widest mb-4">
          Hourly Forecast
        </p>
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data.time.map((time, i) => {
            const Icon = getWeatherIconComponent(data.weatherCode[i]);
            return (
              <motion.div
                key={time}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="flex flex-col items-center gap-2 min-w-[72px] snap-start py-2"
              >
                <span className="text-xs font-medium text-white/50">{i === 0 ? "Now" : formatHour(time)}</span>
                <Icon className="w-5 h-5 text-white/70" />
                <span className="text-sm font-medium text-white/90">{formatTemperature(data.temperature2m[i])}</span>
                {data.precipitationProbability[i] > 0 && (
                  <span className="text-[10px] text-blue-300/80">{data.precipitationProbability[i]}%</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </AnimatedContainer>
  );
});

export default HourlyForecast;
