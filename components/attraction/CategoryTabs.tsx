"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

export type CategoryTab = { slug: string; label: string; count: number };

export function CategoryTabs({
  tabs,
  total,
  activeCategory,
}: {
  tabs: CategoryTab[];
  total: number;
  activeCategory: string | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const select = useCallback(
    (slug: string | null) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (slug) params.set("category", slug);
      else params.delete("category");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    },
    [pathname, router, searchParams],
  );

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => select(null)}
        className={cn(
          "rounded-full border px-3 py-1 text-sm",
          !activeCategory
            ? "border-brand-500 bg-brand-50 text-brand-800"
            : "border-washi-200 bg-white text-sumi-800 hover:border-washi-300",
        )}
      >
        All
        <span className="ml-1 text-xs text-sumi-700">{total}</span>
      </button>
      {tabs.map((t) => (
        <button
          key={t.slug}
          type="button"
          onClick={() => select(t.slug)}
          className={cn(
            "rounded-full border px-3 py-1 text-sm",
            activeCategory === t.slug
              ? "border-brand-500 bg-brand-50 text-brand-800"
              : "border-washi-200 bg-white text-sumi-800 hover:border-washi-300",
          )}
        >
          {t.label}
          <span className="ml-1 text-xs text-sumi-700">{t.count}</span>
        </button>
      ))}
    </div>
  );
}
