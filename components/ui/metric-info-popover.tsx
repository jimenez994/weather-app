"use client";

import { memo, useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X } from "lucide-react";

import type { MetricInfoConfig } from "@/lib/types/metrics";

interface MetricInfoPopoverProps {
  config: MetricInfoConfig;
  size?: "sm" | "md";
  className?: string;
}

const MetricInfoPopover = memo(function MetricInfoPopover({
  config,
  size = "sm",
  className,
}: MetricInfoPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<{
    vertical: "top" | "bottom";
    align: "left" | "center" | "right";
  }>({ vertical: "top", align: "center" });
  const [btnRect, setBtnRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const ranges = config?.ranges ?? [];

  const { min, max, totalRange, valuePercent, activeColor, activeLabel } =
    useMemo(() => {
      if (!ranges.length) {
        return { min: 0, max: 0, totalRange: 1, valuePercent: 0, activeColor: "#4ade80", activeLabel: "Unknown" };
      }
      const mn = ranges[0].min;
      const mx = ranges[ranges.length - 1].max;
      const tr = Math.max(mx - mn, 1);
      const v = Number.isNaN(config.currentValue)
        ? mn
        : Math.min(Math.max(config.currentValue, mn), mx);
      const vp = ((v - mn) / tr) * 100;
      let ac = ranges[0].color;
      let al = ranges[0].label;
      for (const r of ranges) {
        if (config.currentValue >= r.min && config.currentValue <= r.max) {
          ac = r.color;
          al = r.label;
          break;
        }
      }
      return { min: mn, max: mx, totalRange: tr, valuePercent: vp, activeColor: ac, activeLabel: al };
    }, [config.currentValue, ranges]);

  // HARD SAFETY: prevents crashes + bad data
  if (!ranges.length) return null;

  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  // close on outside click + scroll
  useEffect(() => {
    if (!isOpen) return;

    let ignoreScrollUntil = Date.now() + 100;

    const onOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideContainer =
        containerRef.current && containerRef.current.contains(target);
      const insidePopover =
        popoverRef.current && popoverRef.current.contains(target);

      if (!insideContainer && !insidePopover) {
        setIsOpen(false);
      }
    };

    const onScroll = () => {
      if (Date.now() > ignoreScrollUntil) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onOutsideClick);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
      window.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative inline-flex ${className ?? ""}`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!isOpen) {
            const btn = (e.currentTarget as HTMLElement).getBoundingClientRect();
            setBtnRect(btn);
            const estHeight = 280;
            const estWidth = Math.min(288, window.innerWidth - 32);

            const spaceAbove = btn.top;
            const spaceBelow = window.innerHeight - btn.bottom;
            const vertical =
              spaceAbove < estHeight && spaceBelow > spaceAbove
                ? "bottom"
                : "top";

            const btnCenter = btn.left + btn.width / 2;
            const halfWidth = estWidth / 2;
            let align: "left" | "center" | "right" = "center";
            if (btnCenter - halfWidth < 16) align = "left";
            else if (btnCenter + halfWidth > window.innerWidth - 16)
              align = "right";

            setPlacement({ vertical, align });
          } else {
            setBtnRect(null);
          }
          setIsOpen((v) => !v);
        }}
        className="p-1 rounded-full hover:bg-white/10 transition"
      >
        <Info
          className={`${iconSize} text-white/40 hover:text-white/70 transition`}
        />
      </button>

      {isOpen &&
        btnRect &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="metric-popover"
              ref={popoverRef}
              initial={{
                opacity: 0,
                scale: 0.92,
                y: placement.vertical === "top" ? 6 : -6,
                ...(placement.align === "center" ? { x: "-50%" } : {}),
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                ...(placement.align === "center" ? { x: "-50%" } : {}),
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
                y: placement.vertical === "top" ? 6 : -6,
                ...(placement.align === "center" ? { x: "-50%" } : {}),
              }}
              transition={{ duration: 0.18 }}
              className="fixed z-[9999] w-72 max-w-[calc(100vw-2rem)]"
              style={{
                ...(placement.vertical === "top"
                  ? { bottom: `${window.innerHeight - btnRect.top + 12}px` }
                  : { top: `${btnRect.bottom + 12}px` }),
                ...(placement.align === "center"
                  ? { left: "50%" }
                  : placement.align === "left"
                    ? { left: `${Math.max(16, btnRect.left)}px` }
                    : {
                        right: `${Math.max(16, window.innerWidth - btnRect.right)}px`,
                      }),
              }}
            >
              <div className="rounded-2xl border border-white/10 bg-black/85 backdrop-blur-md p-4 shadow-2xl max-h-[calc(100vh-2rem)] overflow-y-auto">
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

                <p className="text-xs text-white/60 mb-3">
                  {config.description}
                </p>

                <div className="mb-3">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xl font-light text-white">
                      {config.currentValue}
                      <span className="text-xs text-white/50 ml-1">
                        {config.unit}
                      </span>
                    </span>

                    <span
                      className="text-[11px] px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${activeColor}20`,
                        color: activeColor,
                      }}
                    >
                      {activeLabel}
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
                        backgroundColor: activeColor,
                      }}
                      initial={{ left: 0 }}
                      animate={{ left: `${valuePercent}%` }}
                      transition={{ duration: 0.35 }}
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
                  <p className="text-[11px] text-white/45 italic">
                    {config.idealLabel}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
});

export default MetricInfoPopover;
