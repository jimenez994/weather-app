"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { CurrentWeather as CurrentWeatherType } from "@/types/weather";
import { getWeatherLabel, formatTemperature, getWeatherIconComponent } from "@/lib/utils";
import { feelsLikeConfig } from "@/lib/metric-info-configs";
import GlassCard from "@/components/ui/glass-card";
import MetricInfoPopover from "@/components/ui/metric-info-popover";

interface CurrentWeatherProps {
  data: CurrentWeatherType;
  cityName: string;
}

const CurrentWeather = memo(function CurrentWeather({ data, cityName }: CurrentWeatherProps) {
  const Icon = getWeatherIconComponent(data.weatherCode);
  

  return (
    <GlassCard className="p-6 md:p-8">
      <div className="flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-white/80 uppercase tracking-widest"
        >
          {cityName}
        </motion.p>

        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.25 }}
          className="my-4"
        >
          <Icon className="w-20 h-20 text-white/90" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-7xl md:text-8xl font-light tracking-tighter text-white">
            {formatTemperature(data.temperature)}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-1 text-lg text-white/80 font-light"
        >
          {getWeatherLabel(data.weatherCode)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-1 mt-1"
        >
          <span className="text-sm text-white/65">
            Feels like {formatTemperature(data.feelsLike)}
          </span>
          <MetricInfoPopover
            config={feelsLikeConfig(data.temperature, data.feelsLike)}
          />
        </motion.div>
      </div>
    </GlassCard>
  );
});

export default CurrentWeather;

