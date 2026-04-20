"use client";

import { PreferencesMenu } from "@/components/layout/PreferencesMenu";

export function PreferencesPanel() {
  return (
    <section className="overflow-hidden rounded-3xl border border-washi-200 bg-gradient-to-br from-white via-washi-50 to-sakura-50 p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sumi-700">
            Your preferences
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold text-sumi-900">
            Set once. Applied everywhere.
          </h2>
          <p className="mt-1 text-sm text-sumi-700">
            Currency, temperature and distance units sync across every page.
          </p>
        </div>
        <PreferencesMenu />
      </div>
    </section>
  );
}
