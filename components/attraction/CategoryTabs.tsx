"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { formatTag } from "@/lib/copy/formatting";
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
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <div className="scene-glass flex flex-wrap gap-2.5 rounded-[1.35rem] p-3">
      <button
        type="button"
        onClick={() => select(null)}
        data-active={!activeCategory}
        className={cn(
          "editorial-pill px-4 py-2 text-sm font-semibold leading-none",
          !activeCategory && "font-bold",
        )}
      >
        All
        <span className={cn("ml-1 text-xs", !activeCategory ? "text-sumi-800" : "text-sumi-600")}>{total}</span>
      </button>
      {tabs.map((t) => (
        <button
          key={t.slug}
          type="button"
          onClick={() => select(t.slug)}
          data-active={activeCategory === t.slug}
          className={cn(
            "editorial-pill px-4 py-2 text-sm font-semibold leading-none",
            activeCategory === t.slug && "font-bold",
          )}
        >
          {formatTag(t.label)}
          <span className={cn("ml-1 text-xs", activeCategory === t.slug ? "text-sumi-800" : "text-sumi-600")}>{t.count}</span>
        </button>
      ))}
    </div>
  );
}
