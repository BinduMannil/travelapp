import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { montserrat, notoSerifJp } from "./fonts";
import { getFxSnapshot, snapshotToRates } from "@/lib/api/fx";
import { PreferencesProvider } from "@/lib/preferences/context";

export const metadata: Metadata = {
  title: {
    default: "Travel companion",
    template: "%s — Travel companion",
  },
  description:
    "Everything about a country and city for travelers: seasons, costs, visas, attractions, restaurants, transit, packing, and more.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const snapshot = await getFxSnapshot("JPY");
  const rates = snapshotToRates(snapshot);

  return (
    <html lang="en" className={`${montserrat.variable} ${notoSerifJp.variable}`}>
      <body className="min-h-screen bg-washi-50 font-sans text-sumi-900 antialiased">
        <PreferencesProvider rates={rates} defaultCurrency="JPY">
          <header className="sticky top-0 z-30 border-b border-sumi-100/60 bg-washi-50/85 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
              <Link href="/" className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-enji-600 to-sumi-900 font-display text-lg font-bold text-white shadow-sm">
                  旅
                </span>
                <span className="font-display text-base font-semibold tracking-tight text-sumi-900">
                  Travel companion
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
          <footer className="mt-16 border-t border-sumi-100 bg-white py-8 text-center text-xs text-sumi-700">
            Seed data for the Tokyo pilot · rates live from Frankfurter ·{" "}
            <span className="whitespace-nowrap">Reviewed 2026-04</span>
          </footer>
        </PreferencesProvider>
      </body>
    </html>
  );
}
