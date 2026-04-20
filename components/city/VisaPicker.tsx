"use client";

import { useEffect, useMemo, useState } from "react";
import type { VisaRule } from "@/lib/data/seed";
import { formatLongDate } from "@/lib/legal/constants";

const LS_KEY = "travelapp:citizenship";

const REQUIREMENT_COPY: Record<
  VisaRule["requirement"],
  { label: string; tone: string }
> = {
  visa_free: {
    label: "Visa-free",
    tone: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
  visa_required: {
    label: "Visa required",
    tone: "bg-rose-100 text-rose-900 border-rose-300",
  },
  evisa_or_visa: {
    label: "eVisa or visa",
    tone: "bg-amber-100 text-amber-900 border-amber-300",
  },
  visa_waiver_registration: {
    label: "Visa-free with pre-registration",
    tone: "bg-sky-100 text-sky-900 border-sky-300",
  },
};

export function VisaPicker({
  rules,
  reviewedAt,
  officialSource,
  disclaimer,
}: {
  rules: VisaRule[];
  reviewedAt: string;
  officialSource: string;
  disclaimer: string;
}) {
  const sorted = useMemo(
    () => [...rules].sort((a, b) => a.name.localeCompare(b.name)),
    [rules],
  );
  const [citizenship, setCitizenship] = useState<string>("");

  useEffect(() => {
    const stored = window.localStorage.getItem(LS_KEY);
    if (stored && sorted.some((r) => r.citizenship === stored)) {
      setCitizenship(stored);
    }
  }, [sorted]);

  const rule = sorted.find((r) => r.citizenship === citizenship);

  function handleChange(value: string) {
    setCitizenship(value);
    if (value) window.localStorage.setItem(LS_KEY, value);
  }

  return (
    <div>
      <label className="block">
        <span className="text-sm font-medium text-sumi-800">
          Your citizenship
        </span>
        <select
          value={citizenship}
          onChange={(e) => handleChange(e.target.value)}
          className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
        >
          <option value="">Select your passport country…</option>
          {sorted.map((r) => (
            <option key={r.citizenship} value={r.citizenship}>
              {r.name}
            </option>
          ))}
        </select>
      </label>

      {rule ? (
        <article
          className={`mt-6 rounded-lg border p-5 ${REQUIREMENT_COPY[rule.requirement].tone}`}
        >
          <div className="text-xs uppercase tracking-[0.25em] opacity-80">
            Result for {rule.name}
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-3">
            <h2 className="text-2xl font-semibold">
              {REQUIREMENT_COPY[rule.requirement].label}
            </h2>
            {typeof rule.max_stay_days === "number" && (
              <span className="text-base">
                up to <strong>{rule.max_stay_days}</strong> days
              </span>
            )}
          </div>
          {rule.notes && (
            <p className="mt-3 text-sm leading-relaxed">{rule.notes}</p>
          )}
          {rule.evisa_url && (
            <a
              href={rule.evisa_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium underline"
            >
              Apply for an eVisa →
            </a>
          )}
        </article>
      ) : (
        <p className="mt-6 rounded-lg border border-dashed border-slate-300 p-5 text-sm text-sumi-700">
          Pick your passport country above to see your specific requirement.
        </p>
      )}

      <div className="mt-6 rounded-md bg-washi-100 p-4 text-sm text-sumi-800">
        <div>
          Rules last reviewed: <strong>{formatLongDate(reviewedAt)}</strong>
        </div>
        <div className="mt-1">{disclaimer}</div>
        <a
          href={officialSource}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-brand-600 underline"
        >
          Official source (MOFA Japan)
        </a>
      </div>
    </div>
  );
}
