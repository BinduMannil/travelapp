import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { montserrat, notoSerifJp } from "./fonts";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import { PreferencesProvider } from "@/lib/preferences/context";
import { ConsentProvider } from "@/lib/consent/context";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { PreferencesTrigger } from "@/components/consent/PreferencesTrigger";
import { LEGAL } from "@/lib/legal/constants";

export const metadata: Metadata = {
  title: {
    default: "Journee",
    template: "%s — Journee",
  },
  description:
    "Journee — editorial travel companion. Seasons, costs, visas, attractions, restaurants, transit, packing, and more.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${notoSerifJp.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-washi-50 font-sans text-sumi-900 antialiased">
        <ConsentProvider>
          <PreferencesProvider rates={rates} defaultCurrency="JPY">
            <header className="sticky top-0 z-30 border-b border-sumi-100/60 bg-washi-50/85 backdrop-blur">
              <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
                <Link href="/" className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-enji-600 to-sumi-900 font-display text-lg font-bold text-white shadow-sm">
                    旅
                  </span>
                  <span className="font-display text-base font-semibold tracking-tight text-sumi-900">
                    {LEGAL.brand}
                  </span>
                </Link>
                <nav className="hidden gap-6 text-sm font-medium text-sumi-700 sm:flex">
                  <Link
                    href="/country/japan"
                    className="transition hover:text-enji-600"
                  >
                    Japan
                  </Link>
                  <Link
                    href="/city/tokyo"
                    className="transition hover:text-enji-600"
                  >
                    Tokyo
                  </Link>
                </nav>
              </div>
            </header>
            <div className="min-h-[calc(100vh-64px)]">{children}</div>
            <footer className="mt-16 border-t border-sumi-100 bg-white py-10 text-sumi-700">
              <div className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-[1fr_auto]">
                <div>
                  <div className="font-display text-sm font-semibold text-sumi-900">
                    {LEGAL.brand}
                  </div>
                  <p className="mt-1 max-w-lg text-[10px] leading-relaxed">
                    Independent editorial travel guide. Operated by{" "}
                    {LEGAL.entityName}, registered with{" "}
                    {LEGAL.tradeLicenseAuthority}. Not a travel agent. Always
                    verify visa, health, and legal details with official
                    sources before you travel.
                  </p>
                  <p className="mt-3 text-[10px]">
                    Seed data for the Tokyo pilot · rates live from Frankfurter ·{" "}
                    <span className="whitespace-nowrap">
                      Reviewed {LEGAL.reviewedAt}
                    </span>
                  </p>
                </div>
                <nav
                  aria-label="Legal"
                  className="flex flex-wrap items-start gap-x-5 gap-y-2 text-xs sm:justify-end"
                >
                  <Link href="/legal/terms" className="hover:text-enji-600">
                    Terms
                  </Link>
                  <Link href="/legal/privacy" className="hover:text-enji-600">
                    Privacy
                  </Link>
                  <Link
                    href="/legal/affiliate-disclosure"
                    className="hover:text-enji-600"
                  >
                    Affiliate disclosure
                  </Link>
                  <PreferencesTrigger className="hover:text-enji-600" />
                  <a
                    href={`mailto:${LEGAL.supportEmail}`}
                    className="hover:text-enji-600"
                  >
                    Contact
                  </a>
                </nav>
              </div>
            </footer>
            <ConsentBanner />
          </PreferencesProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
