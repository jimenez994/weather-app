"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ChevronRight } from "lucide-react";
import type { WeatherAlert } from "@/types/weather";
import GlassCard from "@/components/ui/glass-card";

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

const severityColors: Record<string, { border: string; text: string; bg: string }> = {
  minor: { border: "border-yellow-500/30", text: "text-yellow-300", bg: "#eab308" },
  moderate: { border: "border-orange-500/30", text: "text-orange-300", bg: "#f97316" },
  severe: { border: "border-red-500/30", text: "text-red-300", bg: "#ef4444" },
  extreme: { border: "border-red-700/50", text: "text-red-200", bg: "#b91c1c" },
};

const WeatherAlerts = memo(function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {alerts.map((alert) => {
          const colors = severityColors[alert.severity];
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <GlassCard className={`p-4 border-l-4 ${colors.border}`} glow>
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: colors.bg }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/90">{alert.headline}</p>
                    <p className="text-xs text-white/50 mt-1 line-clamp-2">{alert.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
});

export default WeatherAlerts;
