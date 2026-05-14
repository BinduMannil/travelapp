import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { montserrat, playfair } from "./fonts";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import { PreferencesProvider } from "@/lib/preferences/context";
import { I18nProvider } from "@/lib/i18n/context";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, isLocale, isRtlLocale } from "@/lib/i18n/config";
import { ConsentProvider } from "@/lib/consent/context";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { AlertBanner } from "@/components/alerts/AlertBanner";
import { getActiveAlerts } from "@/lib/alerts";
import { AppContentFrame } from "@/components/layout/AppContentFrame";

export const metadata: Metadata = {
  title: {
    default: "Journee",
    template: "%s — Journee",
  },
  description:
    "Journee is a cinematic travel companion for destination discovery, trip planning, local intelligence, maps, journals, guides, and practical travel decisions.",
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ja: "/ja",
      ar: "/ar",
      fr: "/fr",
      es: "/es",
      de: "/de",
      "x-default": "/",
    },
  },
};

const avatarSuppressionCss = `
  img[alt="Profile"],
  img[alt="Profile avatar"],
  img[alt*="avatar" i],
  img[src*="photo-1494790108377"],
  img[src*="photo-1526772662000"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
  const dir = isRtlLocale(locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${montserrat.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#050807] font-sans text-white antialiased">
        <style dangerouslySetInnerHTML={{ __html: avatarSuppressionCss }} />
        <I18nProvider defaultLocale={locale}>
          <ConsentProvider>
            <PreferencesProvider rates={rates} defaultCurrency="AED">
              <AlertBanner alerts={getActiveAlerts({ now: new Date() })} />
              <AppContentFrame variant="flush">{children}</AppContentFrame>
              <ConsentBanner />
            </PreferencesProvider>
          </ConsentProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
