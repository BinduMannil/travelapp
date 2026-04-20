"use client";

import type { PriceItem } from "@/lib/data/seed";
import { PriceDisplay } from "@/lib/preferences/context";

export function CostTable({ items }: { items: PriceItem[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-slate-600">
          <tr>
            <th className="px-4 py-2 font-medium">Item</th>
            <th className="px-4 py-2 text-right font-medium">Typical price</th>
            <th className="px-4 py-2 font-medium">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {items.map((it) => (
            <tr key={it.key}>
              <td className="px-4 py-3 font-medium text-slate-900">
                {it.label}
              </td>
              <td className="px-4 py-3 text-right tabular-nums">
                <PriceDisplay
                  amountMinor={it.amount_minor}
                  currency={it.currency}
                />
              </td>
              <td className="px-4 py-3 text-slate-600">{it.notes ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
