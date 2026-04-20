import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
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
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <PreferencesProvider rates={rates} defaultCurrency="JPY">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
              <Link href="/" className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-fuchsia-500 text-white">
                  <span aria-hidden>✈</span>
                </span>
                <span className="font-semibold tracking-tight">
                  Travel companion
                </span>
              </Link>
              <nav className="hidden gap-4 text-sm text-slate-600 sm:flex">
                <Link href="/country/japan" className="hover:text-slate-900">
                  Japan
                </Link>
                <Link href="/city/tokyo" className="hover:text-slate-900">
                  Tokyo
                </Link>
              </nav>
            </div>
          </header>
          <div className="min-h-[calc(100vh-64px)]">{children}</div>
          <footer className="mt-16 border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
            Seed data for the Tokyo pilot · rates live from Frankfurter ·{" "}
            <span className="whitespace-nowrap">Reviewed 2026-04</span>
          </footer>
        </PreferencesProvider>
      </body>
    </html>
  );
}
