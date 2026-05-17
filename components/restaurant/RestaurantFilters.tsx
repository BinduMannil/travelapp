"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { PriceBand } from "@/lib/data/seed";

export type FilterOption = { slug: string; label: string; count: number };

export function RestaurantFilters({
  priceBands,
  cuisines,
  dietary,
  active,
}: {
  priceBands: Array<{ band: PriceBand; count: number }>;
  cuisines: FilterOption[];
  dietary: FilterOption[];
  active: {
    price: PriceBand | null;
    cuisine: string | null;
    diet: string | null;
    reservations: boolean;
  };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggle = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (value && params.get(key) !== value) params.set(key, value);
      else params.delete(key);
      const qs = params.toString();
      const currentPath = pathname ?? "";
      router.replace(qs ? `${currentPath}?${qs}` : currentPath, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <div className="space-y-8">
      <FilterRow label="Price">
        <Pill
          active={active.price === null}
          onClick={() => toggle("price", null)}
        >
          All
        </Pill>
        {priceBands.map((b) => (
          <Pill
            key={b.band}
            active={active.price === b.band}
            onClick={() => toggle("price", b.band)}
          >
            {b.band}
            <span className={cn("ml-1 text-xs", active.price === b.band ? "text-sumi-800" : "text-sumi-600")}>{b.count}</span>
          </Pill>
        ))}
      </FilterRow>

      <FilterRow label="Cuisine">
        <Pill
          active={active.cuisine === null}
          onClick={() => toggle("cuisine", null)}
        >
          All
        </Pill>
        {cuisines.map((c) => (
          <Pill
            key={c.slug}
            active={active.cuisine === c.slug}
            onClick={() => toggle("cuisine", c.slug)}
          >
            {c.label}
            <span className={cn("ml-1 text-xs", active.cuisine === c.slug ? "text-sumi-800" : "text-sumi-600")}>{c.count}</span>
          </Pill>
        ))}
      </FilterRow>

      <FilterRow label="Dietary">
        <Pill
          active={active.diet === null}
          onClick={() => toggle("diet", null)}
        >
          Any
        </Pill>
        {dietary.map((d) => (
          <Pill
            key={d.slug}
            active={active.diet === d.slug}
            onClick={() => toggle("diet", d.slug)}
          >
            {d.label}
            <span className={cn("ml-1 text-xs", active.diet === d.slug ? "text-sumi-800" : "text-sumi-600")}>{d.count}</span>
          </Pill>
        ))}
      </FilterRow>

      <FilterRow label="Booking">
        <Pill
          active={!active.reservations}
          onClick={() => toggle("reservations", null)}
        >
          Any
        </Pill>
        <Pill
          active={active.reservations}
          onClick={() => toggle("reservations", "walkin")}
        >
          Walk-in OK
        </Pill>
      </FilterRow>
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 border-b border-white/10 pb-7 last:border-b-0 last:pb-0 sm:grid-cols-[8.25rem_1fr] sm:items-start sm:gap-6">
      <span className="pt-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-kintsugi-300">
        {label}
      </span>
      <div className="flex flex-wrap gap-3 sm:gap-3.5">{children}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active}
      className={cn(
        "editorial-pill px-5 py-2.5 text-sm font-semibold leading-none",
        active && "font-bold",
      )}
    >
      {children}
    </button>
  );
}
