"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { AlertSeverity, TravelAlert } from "@/lib/alerts";

const LS_KEY = "journee:alerts:dismissed";

const SEVERITY_STYLE: Record<
  AlertSeverity,
  { band: string; pill: string; label: string; icon: string }
> = {
  info: {
    band: "bg-aizome-600 text-washi-50",
    pill: "bg-washi-50/15 text-washi-50",
    label: "Advisory",
    icon: "知",
  },
  warning: {
    band: "bg-kintsugi-500 text-sumi-900",
    pill: "bg-sumi-900/15 text-sumi-900",
    label: "Travel warning",
    icon: "警",
  },
  critical: {
    band: "bg-enji-700 text-washi-50",
    pill: "bg-washi-50/15 text-washi-50",
    label: "Critical — do not travel",
    icon: "急",
  },
};

/**
 * Top-of-page alert banner. One banner renders per active alert, in
 * severity order (critical → warning → info). Each banner is dismissible
 * per-session via localStorage; the dismiss key is the alert slug so a
 * new alert with a different slug surfaces even if the user previously
 * dismissed an old one.
 *
 * The component is mounted once in app/layout.tsx with the full active
 * alert list. It then filters on the client using the current pathname
 * so a Japan country alert disappears when the user is on, say, /legal.
 */
export function AlertBanner({
  alerts,
  cityToCountry = { tokyo: "japan" },
}: {
  alerts: TravelAlert[];
  /** Mapping so a city route like /city/tokyo knows its parent country. */
  cityToCountry?: Record<string, string>;
}) {
  const pathname = usePathname() ?? "/";
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  // Derive the country / city scope from the URL.
  const { countrySlug, citySlug } = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] === "country" && parts[1]) {
      return { countrySlug: parts[1], citySlug: undefined as string | undefined };
    }
    if (parts[0] === "city" && parts[1]) {
      const city = parts[1];
      return { countrySlug: cityToCountry[city], citySlug: city };
    }
    return { countrySlug: undefined, citySlug: undefined };
  }, [pathname, cityToCountry]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LS_KEY);
      if (raw) setDismissed(new Set(JSON.parse(raw)));
    } catch {
      /* storage unavailable — treat every alert as un-dismissed */
    }
    setHydrated(true);
  }, []);

  function dismiss(slug: string) {
    setDismissed((prev) => {
      const next = new Set(prev);
      next.add(slug);
      try {
        window.localStorage.setItem(LS_KEY, JSON.stringify([...next]));
      } catch {
        /* noop */
      }
      return next;
    });
  }

  // Don't render on the server or before hydration — avoids SSR flash of
  // alerts the user has already dismissed.
  if (!hydrated) return null;

  const order: AlertSeverity[] = ["critical", "warning", "info"];
  const visible = [...alerts]
    .filter((a) => !dismissed.has(a.slug))
    .filter((a) => {
      if (a.scope === "global") return true;
      if (a.scope === "country") return a.country_slug === countrySlug;
      if (a.scope === "city")
        return (
          a.city_slug === citySlug ||
          (a.country_slug === countrySlug && !citySlug)
        );
      return false;
    })
    .sort(
      (a, b) => order.indexOf(a.severity) - order.indexOf(b.severity),
    );

  if (visible.length === 0) return null;

  return (
    <div className="relative z-40">
      {visible.map((a) => {
        const s = SEVERITY_STYLE[a.severity];
        return (
          <div
            key={a.slug}
            role={a.severity === "critical" ? "alert" : "status"}
            className={`w-full ${s.band}`}
          >
            <div className="mx-auto flex max-w-7xl flex-wrap items-start gap-3 px-6 py-3">
              <span
                aria-hidden
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${s.pill} font-display text-sm font-bold`}
              >
                {s.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span
                    className={`rounded-full ${s.pill} px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.22em]`}
                  >
                    {s.label}
                  </span>
                  <span className="text-sm font-semibold">{a.title}</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed opacity-90">
                  {a.body}
                  {a.source_url && (
                    <>
                      {" "}
                      <a
                        href={a.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 inline-block underline underline-offset-2 opacity-100"
                      >
                        {a.source_label ?? "Source"} →
                      </a>
                    </>
                  )}
                </p>
              </div>
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => dismiss(a.slug)}
                className={`ml-auto grid h-7 w-7 place-items-center rounded-full ${s.pill} text-sm hover:opacity-80`}
              >
                ×
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
