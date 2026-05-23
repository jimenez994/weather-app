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
  const [isDesktop, setIsDesktop] = useState(false);
  const [popoverWidth, setPopoverWidth] = useState(288);

  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const ranges = config?.ranges ?? [];

  const { min, totalRange, valuePercent, activeColor, activeLabel } =
    useMemo(() => {
      if (!ranges.length) {
        return {
          min: 0,
          totalRange: 1,
          valuePercent: 0,
          activeColor: "#4ade80",
          activeLabel: "Unknown",
        };
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
      return { min: mn, totalRange: tr, valuePercent: vp, activeColor: ac, activeLabel: al };
    }, [config.currentValue, ranges]);

  if (!ranges.length) return null;

  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  // outside-click + scroll-to-close
  useEffect(() => {
    if (!isOpen) return;

    const openTime = Date.now();

    const onOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !containerRef.current?.contains(target) &&
        !popoverRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const onScroll = () => {
      if (Date.now() - openTime > 80) {
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

            const desktop = window.innerWidth >= 768;
            setIsDesktop(desktop);

            const pw = Math.min(288, window.innerWidth - (desktop ? 16 : 32));
            setPopoverWidth(pw);
            const halfWidth = pw / 2;
            const viewportPad = desktop ? 8 : 16;

            // --- horizontal alignment ---
            const btnCenter = btn.left + btn.width / 2;
            let align: "left" | "center" | "right" = "center";
            if (btnCenter - halfWidth < viewportPad) align = "left";
            else if (btnCenter + halfWidth > window.innerWidth - viewportPad) align = "right";

            // --- vertical: flip below if not enough space above ---
            const popoverHeight = 280;
            const gap = desktop ? 8 : 12;
            const spaceAbove = btn.top - gap;
            const spaceBelow = window.innerHeight - btn.bottom - gap;
            const vertical =
              spaceAbove < popoverHeight && spaceBelow > spaceAbove
                ? "bottom"
                : "top";

            setPlacement({ vertical, align });
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }}
        className="p-1 rounded-full hover:bg-white/10 transition"
      >
        <Info className={`${iconSize} text-white/40 hover:text-white/70`} />
      </button>

      {isOpen &&
        btnRect &&
        createPortal(
          <AnimatePresence>
            <motion.div
              ref={popoverRef}
              key="metric-popover"
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
              style={(() => {
                const pad = isDesktop ? 8 : 16;
                const vGap = isDesktop ? 8 : 12;

                // --- vertical ---
                const vert =
                  placement.vertical === "top"
                    ? { bottom: `${window.innerHeight - btnRect.top + vGap}px` as const }
                    : { top: `${btnRect.bottom + vGap}px` as const };

                // --- horizontal ---
                const maxLeft = window.innerWidth - pad - popoverWidth;
                let horiz: Record<string, string>;
                if (placement.align === "center") {
                  horiz = { left: `${btnRect.left + btnRect.width / 2}px` };
                } else if (placement.align === "left") {
                  const left = Math.max(pad, Math.min(btnRect.left, maxLeft));
                  horiz = { left: `${left}px` };
                } else {
                  const maxRight = window.innerWidth - pad - popoverWidth;
                  const idealRight = window.innerWidth - btnRect.right;
                  const right = Math.max(pad, Math.min(idealRight, maxRight));
                  horiz = { right: `${right}px` };
                }

                return { ...vert, ...horiz };
              })()}
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

                  <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
                    {ranges.map((range) => (
                      <div
                        key={range.label}
                        className="absolute h-full"
                        style={{
                          left: `${((range.min - min) / totalRange) * 100}%`,
                          width: `${((range.max - range.min) / totalRange) * 100}%`,
                          backgroundColor: `${range.color}40`,
                        }}
                      />
                    ))}

                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-white shadow"
                      style={{ backgroundColor: activeColor }}
                      animate={{ left: `${valuePercent}%` }}
                    />
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
