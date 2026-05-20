"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
  Wind,
  Droplets,
  Gauge,
  Eye,
  CloudRain,
} from "lucide-react";

import type { CurrentWeather } from "@/types/weather";

import { getWindDirection, getUvLevel } from "@/lib/utils";

import {
  windConfig,
  humidityConfig,
  pressureConfig,
  visibilityConfig,
  uvIndexConfig,
  precipitationConfig,
} from "@/lib/metric-info-configs";

import GlassCard from "@/components/ui/glass-card";
import AnimatedContainer from "@/components/ui/animated-container";
import MetricInfoPopover from "@/components/ui/metric-info-popover";

interface WeatherDetailsProps {
  current: CurrentWeather;
}

const WeatherDetails = memo(function WeatherDetails({ current }: WeatherDetailsProps) {
  const uvCfg = uvIndexConfig(current.uvIndex);
  const uv = getUvLevel(uvCfg.currentValue);

  const windCfg = windConfig(current.windSpeed);
  const humidityCfg = humidityConfig(current.humidity);
  const visCfg = visibilityConfig(current.visibility);
  const pressureCfg = pressureConfig(current.pressure);
  const precipCfg = precipitationConfig(current.precipitation);

  const cards = [
    {
      icon: Wind,
      title: "Wind",
      value: `${windCfg.currentValue} ${windCfg.unit}`,
      sub: getWindDirection(current.windDirection),
      config: windCfg,
    },
    {
      icon: Droplets,
      title: "Humidity",
      value: `${humidityCfg.currentValue}${humidityCfg.unit}`,
      sub:
        current.humidity > 65
          ? "Humid"
          : current.humidity < 35
          ? "Dry"
          : "Comfortable",
      config: humidityCfg,
    },
    {
      icon: Eye,
      title: "Visibility",
      value: `${visCfg.currentValue} ${visCfg.unit}`,
      sub: visCfg.currentValue >= 10 ? "Clear" : "Reduced",
      config: visCfg,
    },
    {
      icon: Gauge,
      title: "Pressure",
      value: `${pressureCfg.currentValue} ${pressureCfg.unit}`,
      sub: pressureCfg.currentValue < 29.92 ? "Low" : "High",
      config: pressureCfg,
    },
    {
      icon: CloudRain,
      title: "Precipitation",
      value: `${precipCfg.currentValue} ${precipCfg.unit}`,
      sub: current.precipitation === 0 ? "None" : "Expected",
      config: precipCfg,
    },
  ];

  return (
    <AnimatedContainer delay={0.4}>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.05 }}
          >
            <GlassCard className="p-4 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <card.icon className="w-4 h-4 text-white/60" />
                  <p className="text-xs uppercase tracking-widest text-white/45">
                    {card.title}
                  </p>
                </div>
                <MetricInfoPopover config={card.config} />
              </div>

              <p className="text-2xl font-light text-white">
                {card.value}
              </p>

              <p className="text-sm text-white/50 mt-1">
                {card.sub}
              </p>
            </GlassCard>
          </motion.div>
        ))}

        {/* UV Index */}
        <motion.div
          className="col-span-2 lg:col-span-5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-5">
            <div className="flex items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs uppercase tracking-widest text-white/45">
                    UV Index
                  </p>
                  <MetricInfoPopover config={uvCfg} />
                </div>

                <p className="text-3xl font-light text-white mt-2">
                  {uvCfg.currentValue}
                </p>

                <p className="text-sm font-medium mt-1" style={{ color: uv.color }}>
                  {uv.level}
                </p>
              </div>

              <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: uv.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min((uvCfg.currentValue / 11) * 100, 100)}%` }}
                />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatedContainer>
  );
});

export default WeatherDetails;
