"use client";

import { useEffect } from "react";
import { I18nProvider } from "@/lib/i18n/context";
import { isRtlLocale, type Locale } from "@/lib/i18n/config";
import { JourneeWebExperience } from "@/components/home/JourneeWebExperience";

export function LocalizedHomePage({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtlLocale(locale) ? "rtl" : "ltr";
  }, [locale]);

  return (
    <I18nProvider defaultLocale={locale}>
      <JourneeWebExperience />
    </I18nProvider>
  );
}
