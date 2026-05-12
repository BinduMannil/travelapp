"use client";

import { PreferencesMenu } from "@/components/layout/PreferencesMenu";

export function PreferencesPanel() {
  return (
    <section className="scene-glass overflow-hidden rounded-[1.35rem] p-6 shadow-editorial-deep sm:p-8">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="max-w-xl">
          <p className="luxury-kicker text-kintsugi-300">
            Your preferences
          </p>
          <h2 className="mt-2 font-sans text-2xl font-semibold text-white">
            Set once. Applied everywhere.
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/72">
            Currency, temperature and distance units sync across every page.
          </p>
        </div>
        <div className="lg:justify-self-end">
          <PreferencesMenu />
        </div>
      </div>
    </section>
  );
}
