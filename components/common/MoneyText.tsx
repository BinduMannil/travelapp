"use client";

import type { ReactNode } from "react";
import { PriceDisplay } from "@/lib/preferences/context";

/**
 * Scans a string for embedded JPY amounts ("¥500", "¥1,200", "¥4,000-¥8,000")
 * and renders each as a <PriceDisplay> so it converts into the user's chosen
 * currency. Plain text between matches passes through unchanged.
 *
 * Use for any seed copy that mentions a yen amount inline (Tip lines,
 * how-to-join paragraphs, transit price notes, etc). Cheaper than
 * restructuring every seed into a typed money field.
 */

// Matches ¥123, ¥1,234, ¥10000 etc. Captures the digit run.
const YEN_RE = /¥(\d{1,3}(?:,\d{3})+|\d+)/g;

export function MoneyText({ children }: { children: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of children.matchAll(YEN_RE)) {
    const start = m.index ?? 0;
    if (start > last) out.push(children.slice(last, start));
    const amount = parseInt(m[1].replace(/,/g, ""), 10);
    if (Number.isFinite(amount)) {
      out.push(
        <PriceDisplay
          key={`m-${key++}`}
          amountMinor={amount}
          currency="JPY"
        />,
      );
    } else {
      out.push(m[0]);
    }
    last = start + m[0].length;
  }
  if (last < children.length) out.push(children.slice(last));
  return <>{out}</>;
}
