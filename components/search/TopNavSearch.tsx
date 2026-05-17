"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type TopNavSearchProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  readOnly?: boolean;
};

export function TopNavSearch({
  value,
  defaultValue = "",
  onValueChange,
  onSearchSubmit,
  placeholder = "Search destinations or anything...",
  label = "Search Journee",
  className,
  readOnly = false,
}: TopNavSearchProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const controlled = value !== undefined;

  function updateValue(nextValue: string) {
    if (!controlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  }

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSearchSubmit?.(currentValue);
      }}
      className={cn(
        "hidden min-w-[240px] max-w-[520px] flex-1 items-center rounded-full border border-white/12 bg-white/[0.045] px-4 py-2.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08)] transition focus-within:border-[#f3b544]/70 lg:flex",
        readOnly && "text-white/70",
        className,
      )}
    >
      <Search className="mr-3 h-4 w-4 shrink-0 text-[#f3b544]" aria-hidden />
      {readOnly ? (
        <span className="min-w-0 flex-1 truncate text-sm">{placeholder}</span>
      ) : (
        <input
          type="search"
          value={currentValue}
          onChange={(event) => updateValue(event.target.value)}
          aria-label={label}
          placeholder={placeholder}
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/48"
        />
      )}
    </form>
  );
}
