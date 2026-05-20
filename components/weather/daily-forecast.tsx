"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { DailyForecast as DailyType } from "@/types/weather";
import { formatDay, formatTemperature, getWeatherIconComponent, mmToInches } from "@/lib/utils";
import GlassCard from "@/components/ui/glass-card";
import AnimatedContainer from "@/components/ui/animated-container";

interface DailyForecastProps {
  data: DailyType;
}

const DailyForecast = memo(function DailyForecast({ data }: DailyForecastProps) {
  return (
    <AnimatedContainer delay={0.3}>
      <GlassCard className="p-4 md:p-6">
        <p className="text-xs font-medium text-white/50 uppercase tracking-widest mb-4">
          7-Day Forecast
        </p>
        <div className="space-y-1">
          {data.time.map((day, i) => {
            const Icon = getWeatherIconComponent(data.weatherCode[i]);
            const maxTemp = data.temperature2mMax[i];
            const minTemp = data.temperature2mMin[i];
            const range = 50;
            const lowPercent = ((minTemp + 10) / range) * 100;
            const highPercent = ((maxTemp + 10) / range) * 100;

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <span className="w-20 text-sm font-medium text-white/70">{formatDay(day)}</span>
                <Icon className="w-5 h-5 text-white/60 flex-shrink-0" />
                {data.precipitationProbabilityMax[i] > 0 ? (
                  <span className="text-[11px] text-blue-300/70 w-10 text-right">
                    {data.precipitationProbabilityMax[i]}%{" "}
                    <span className="text-white/30">
                      {mmToInches(data.precipitationSum[i]).toFixed(2)}&quot;
                    </span>
                  </span>
                ) : (
                  <span className="w-10" />
                )}
                <span className="text-sm text-white/50 w-10 text-right">{formatTemperature(minTemp)}</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden relative mx-1">
                  <motion.div
                    className="absolute h-full rounded-full bg-gradient-to-r from-sky-400 to-amber-400"
                    initial={{ left: `${lowPercent}%`, right: `${100 - highPercent}%` }}
                    whileInView={{ left: `${lowPercent}%`, right: `${100 - highPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                  />
                </div>
                <span className="text-sm font-medium text-white/80 w-10">{formatTemperature(maxTemp)}</span>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </AnimatedContainer>
  );
});

export default DailyForecast;
