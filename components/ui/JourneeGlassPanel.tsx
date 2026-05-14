"use client";

import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type JourneeGlassPanelProps<T extends ElementType = "section"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  tone?: "default" | "gold" | "dark";
};

const toneClasses = {
  default:
    "border-white/12 bg-white/[.045] shadow-[0_22px_70px_rgba(0,0,0,.24),inset_0_1px_0_rgba(255,255,255,.055)]",
  gold:
    "border-[#e8c77b]/18 bg-[linear-gradient(160deg,rgba(232,199,123,.14),rgba(255,255,255,.055)_42%,rgba(255,255,255,.025))] shadow-[0_24px_80px_rgba(0,0,0,.28),inset_0_1px_0_rgba(232,199,123,.12)]",
  dark:
    "border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.035))] shadow-[0_26px_80px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.06)]",
};

export function JourneeGlassPanel<T extends ElementType = "section">({
  as,
  children,
  className,
  tone = "default",
}: JourneeGlassPanelProps<T>) {
  const Component = as ?? "section";

  return (
    <Component
      className={cn(
        "rounded-[1.5rem] border backdrop-blur-xl",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </Component>
  );
}
