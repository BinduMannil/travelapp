export const SUPPORTED_LOCALES = ["en", "ja", "ar", "fr", "es", "de"] as const;

export const FUTURE_LOCALES = ["zh", "ko", "it", "pt", "ru"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const RTL_LOCALES: ReadonlyArray<Locale> = ["ar"];

export const LOCALE_STORAGE_KEY = "journee:locale";

export const LOCALE_COOKIE_NAME = "journee_locale";

export const LOCALE_OPTIONS: ReadonlyArray<{
  code: Locale;
  label: string;
  nativeName: string;
  region: string;
}> = [
  { code: "en", label: "English", nativeName: "English", region: "Global" },
  { code: "ja", label: "Japanese", nativeName: "日本語", region: "Japan" },
  { code: "ar", label: "Arabic", nativeName: "العربية", region: "MENA" },
  { code: "fr", label: "French", nativeName: "Français", region: "France" },
  { code: "es", label: "Spanish", nativeName: "Español", region: "Spain" },
  { code: "de", label: "German", nativeName: "Deutsch", region: "Germany" },
];

export function isLocale(value: string | null | undefined): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function isRtlLocale(locale: Locale) {
  return RTL_LOCALES.includes(locale);
}

export function localeToIntlLocale(locale: Locale) {
  const map: Record<Locale, string> = {
    en: "en-US",
    ja: "ja-JP",
    ar: "ar-AE",
    fr: "fr-FR",
    es: "es-ES",
    de: "de-DE",
  };

  return map[locale];
}

export function localePath(pathname: string, locale: Locale) {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}
