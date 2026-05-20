"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className, glow = false, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl border backdrop-blur-lg transition-all duration-200",
        "border-white/15 bg-white/10 dark:border-white/10 dark:bg-white/5",
        "hover:border-white/25 dark:hover:border-white/20",
        glow && "hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
