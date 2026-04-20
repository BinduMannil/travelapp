"use client";

import { PreferencesMenu } from "@/components/layout/PreferencesMenu";

export function PreferencesPanel() {
  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Your preferences
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            Pick once — every page adjusts prices, temperatures, and distances
            to your units.
          </p>
        </div>
        <PreferencesMenu />
      </div>
    </section>
  );
}
