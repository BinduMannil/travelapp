"use client";

import { LOCALE_OPTIONS } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/context";

export function LanguagePicker({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const current = LOCALE_OPTIONS.find((option) => option.code === locale) ?? LOCALE_OPTIONS[0];

  return (
    <label
      className={`inline-flex w-fit max-w-full min-w-0 items-center justify-start gap-2 rounded-[7px] border border-white/14 bg-white/[0.06] text-white shadow-inner shadow-black/20 backdrop-blur ${
        compact ? "px-3 py-2 text-xs" : "px-3.5 py-2.5 text-sm"
      }`}
    >
      <span className="sr-only">{t("settings.language")}</span>
      {!compact ? (
        <span className="text-[0.64rem] font-bold uppercase tracking-[0.14em] text-kintsugi-300">
          {t("settings.language")}
        </span>
      ) : null}
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as typeof locale)}
        aria-label="Language"
        className="min-w-0 max-w-[11rem] bg-transparent font-semibold text-white outline-none"
      >
        {LOCALE_OPTIONS.map((option) => (
          <option key={option.code} value={option.code}>
            {compact ? option.code.toUpperCase() : option.nativeName}
          </option>
        ))}
      </select>
      <span className="hidden text-white/42 sm:inline">{compact ? current.code.toUpperCase() : current.region}</span>
    </label>
  );
}
