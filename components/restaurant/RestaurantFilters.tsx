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
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    },
    [pathname, router, searchParams],
  );

  return (
    <div className="space-y-3">
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
            <span className="ml-1 text-xs text-sumi-700">{b.count}</span>
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
            <span className="ml-1 text-xs text-sumi-700">{c.count}</span>
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
            <span className="ml-1 text-xs text-sumi-700">{d.count}</span>
          </Pill>
        ))}
      </FilterRow>

      <FilterRow label="Reservations">
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
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-[0.25em] text-sumi-700">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
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
      className={cn(
        "rounded-full border px-3 py-1 text-sm",
        active
          ? "border-brand-500 bg-brand-50 text-brand-800"
          : "border-washi-200 bg-white text-sumi-800 hover:border-slate-300",
      )}
    >
      {children}
    </button>
  );
}
