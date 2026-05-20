"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X } from "lucide-react";

import type { MetricInfoConfig } from "@/lib/types/metrics";

interface MetricInfoPopoverProps {
  config: MetricInfoConfig;
  size?: "sm" | "md";
  className?: string;
}

export default function MetricInfoPopover({
  config,
  size = "sm",
  className,
}: MetricInfoPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const ranges = config?.ranges ?? [];

  // ❗ HARD SAFETY: prevents crashes + bad data
  if (!ranges.length) return null;

  const min = ranges[0].min;
  const max = ranges[ranges.length - 1].max;

  const totalRange = Math.max(max - min, 1); // avoid divide-by-zero

  const clamp = (val: number) => {
    if (Number.isNaN(val)) return min;
    return Math.min(Math.max(val, min), max);
  };

  const getValuePercent = () => {
    const value = clamp(config.currentValue);
    return ((value - min) / totalRange) * 100;
  };

  const getActiveRangeColor = () => {
    for (const range of ranges) {
      if (
        config.currentValue >= range.min &&
        config.currentValue <= range.max
      ) {
        return range.color;
      }
    }
    return ranges[0].color;
  };

  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative inline-flex ${className ?? ""}`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((v) => !v);
        }}
        className="p-1 rounded-full hover:bg-white/10 transition"
      >
        <Info
          className={`${iconSize} text-white/30 hover:text-white/60 transition`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 z-50"
          >
            <div className="rounded-2xl border border-white/10 bg-black/80 backdrop-blur-2xl p-4 shadow-2xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white">
                  {config.title}
                </p>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-3.5 h-3.5 text-white/40" />
                </button>
              </div>

              <p className="text-xs text-white/50 mb-3">
                {config.description}
              </p>

              <div className="mb-3">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xl font-light text-white">
                    {config.currentValue}
                    <span className="text-xs text-white/40 ml-1">
                      {config.unit}
                    </span>
                  </span>

                  <span
                    className="text-[11px] px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${getActiveRangeColor()}20`,
                      color: getActiveRangeColor(),
                    }}
                  >
                    {
                      ranges.find(
                        (r) =>
                          config.currentValue >= r.min &&
                          config.currentValue <= r.max
                      )?.label ?? "Unknown"
                    }
                  </span>
                </div>

                {/* RANGE BAR */}
                <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
                  {ranges.map((range) => {
                    const width =
                      ((range.max - range.min) / totalRange) * 100;

                    const left =
                      ((range.min - min) / totalRange) * 100;

                    return (
                      <div
                        key={range.label}
                        className="absolute h-full"
                        style={{
                          left: `${left}%`,
                          width: `${width}%`,
                          backgroundColor: `${range.color}40`,
                        }}
                      />
                    );
                  })}

                  {/* POINTER */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-white shadow"
                    style={{
                      backgroundColor: getActiveRangeColor(),
                    }}
                    initial={{ left: 0 }}
                    animate={{ left: `${getValuePercent()}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* LABELS */}
                <div className="flex justify-between mt-1.5">
                  {ranges.map((r) => (
                    <span
                      key={r.label}
                      className="text-[9px]"
                      style={{ color: `${r.color}90` }}
                    >
                      {r.label}
                    </span>
                  ))}
                </div>
              </div>

              {config.idealLabel && (
                <p className="text-[11px] text-white/30 italic">
                  {config.idealLabel}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}