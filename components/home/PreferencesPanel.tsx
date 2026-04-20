"use client";

import { PreferencesMenu } from "@/components/layout/PreferencesMenu";

export function PreferencesPanel() {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50 p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Your preferences
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            Set once. Applied everywhere.
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Currency, temperature, and distance units sync across every page.
          </p>
        </div>
        <PreferencesMenu />
      </div>
    </section>
  );
}
