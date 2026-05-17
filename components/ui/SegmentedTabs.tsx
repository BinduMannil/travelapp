"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SegmentedTabItem<T extends string = string> = {
  value: T;
  label: ReactNode;
  ariaLabel?: string;
};

type SegmentedTabsProps<T extends string = string> = {
  items: SegmentedTabItem<T>[];
  value: T;
  onValueChange: (value: T) => void;
  variant?: "pill" | "underline";
  className?: string;
  itemClassName?: string;
  "aria-label"?: string;
};

export function SegmentedTabs<T extends string = string>({
  items,
  value,
  onValueChange,
  variant = "pill",
  className,
  itemClassName,
  "aria-label": ariaLabel,
}: SegmentedTabsProps<T>) {
  const pill = variant === "pill";

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "flex max-w-full gap-2 overflow-x-auto",
        pill
          ? "rounded-full border border-white/10 bg-white/[.045] p-2"
          : "border-b border-white/10",
        className,
      )}
    >
      {items.map((item) => {
        const active = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={item.ariaLabel}
            onClick={() => onValueChange(item.value)}
            className={cn(
              "whitespace-nowrap font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8c77b]",
              pill
                ? "rounded-full px-4 py-2 text-sm"
                : "relative px-1 pb-3 pt-2 text-sm",
              pill && active
                ? "bg-[#e8c77b] text-[#130f0a]"
                : pill
                  ? "text-white/68 hover:bg-white/10 hover:text-white"
                  : active
                    ? "text-[#e8c77b]"
                    : "text-white/62 hover:text-white",
              itemClassName,
            )}
          >
            {item.label}
            {!pill && active ? (
              <span className="absolute bottom-[-1px] left-0 h-[2px] w-full rounded-full bg-[#e8c77b]" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
