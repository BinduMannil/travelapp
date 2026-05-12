"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  LOCALE_STORAGE_KEY,
  localeToIntlLocale,
  isLocale,
  isRtlLocale,
  type Locale,
} from "@/lib/i18n/config";
import { dictionaries, type TranslationTree, type TranslationValue } from "@/lib/i18n/dictionaries";

type I18nContextValue = {
  locale: Locale;
  intlLocale: string;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatDate: (value: Date | string | number, options?: Intl.DateTimeFormatOptions) => string;
  formatTime: (value: Date | string | number, options?: Intl.DateTimeFormatOptions) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function readPath(tree: TranslationTree, path: string): TranslationValue | undefined {
  return path.split(".").reduce<TranslationValue | undefined>((current, part) => {
    if (!current || typeof current === "string") return undefined;
    return current[part];
  }, tree);
}

function interpolate(value: string, vars?: Record<string, string | number>) {
  if (!vars) return value;
  return Object.entries(vars).reduce(
    (text, [key, replacement]) => text.replaceAll(`{${key}}`, String(replacement)),
    value,
  );
}

export function I18nProvider({
  children,
  defaultLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(saved)) setLocaleState(saved);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    document.cookie = `${LOCALE_COOKIE_NAME}=${next}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  const dir = isRtlLocale(locale) ? "rtl" : "ltr";
  const intlLocale = localeToIntlLocale(locale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [dir, locale]);

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: string, vars?: Record<string, string | number>) => {
      const localized = readPath(dictionaries[locale], key);
      const fallback = readPath(dictionaries[DEFAULT_LOCALE], key);
      const text =
        typeof localized === "string"
          ? localized
          : typeof fallback === "string"
            ? fallback
            : key;

      return interpolate(text, vars);
    };

    return {
      locale,
      intlLocale,
      dir,
      setLocale,
      t,
      formatNumber: (number, options) =>
        new Intl.NumberFormat(intlLocale, options).format(number),
      formatDate: (date, options) =>
        new Intl.DateTimeFormat(intlLocale, options).format(new Date(date)),
      formatTime: (date, options) =>
        new Intl.DateTimeFormat(intlLocale, {
          hour: "numeric",
          minute: "2-digit",
          ...options,
        }).format(new Date(date)),
    };
  }, [dir, intlLocale, locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside <I18nProvider>");
  return context;
}
