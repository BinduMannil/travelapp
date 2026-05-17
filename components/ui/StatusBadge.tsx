"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StatusBadgeVariant = "success" | "warning" | "error" | "neutral" | "premium";

type StatusBadgeProps = {
  children: ReactNode;
  variant?: StatusBadgeVariant;
  className?: string;
};

const variantClasses: Record<StatusBadgeVariant, string> = {
  success: "border-emerald-200/18 bg-emerald-200/10 text-emerald-100",
  warning: "border-amber-200/20 bg-amber-200/10 text-amber-100",
  error: "border-rose-200/18 bg-rose-200/10 text-rose-100",
  neutral: "border-sky-200/18 bg-sky-200/10 text-sky-100",
  premium: "border-[#e8c77b]/22 bg-[#e8c77b]/13 text-[#f8df9c]",
};

export function StatusBadge({
  children,
  variant = "neutral",
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
