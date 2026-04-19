// Frankfurter is a free, no-auth ECB-backed FX API.
// Docs: https://frankfurter.dev
//
// We fetch a single base=JPY snapshot per day, cache it with a Next cache tag,
// and fall back to a hard-coded snapshot if the network is unavailable during
// build or dev.

import type { FxRate } from "@/lib/currency/convert";

export const SUPPORTED_QUOTES = [
  "USD",
  "EUR",
  "GBP",
  "AUD",
  "CAD",
  "SGD",
  "HKD",
  "CNY",
  "KRW",
  "THB",
  "INR",
  "AED",
  "CHF",
] as const;

export type Quote = (typeof SUPPORTED_QUOTES)[number];

const FALLBACK_RATES: Record<Quote, number> = {
  USD: 0.0067,
  EUR: 0.0062,
  GBP: 0.0053,
  AUD: 0.0102,
  CAD: 0.0092,
  SGD: 0.0089,
  HKD: 0.0525,
  CNY: 0.0485,
  KRW: 9.24,
  THB: 0.231,
  INR: 0.568,
  AED: 0.0247,
  CHF: 0.0058,
};

export type FxSnapshot = {
  base: "JPY";
  date: string;
  rates: Record<Quote, number>;
};

export async function getFxSnapshot(base: "JPY" = "JPY"): Promise<FxSnapshot> {
  const symbols = SUPPORTED_QUOTES.join(",");
  const url = `https://api.frankfurter.dev/v1/latest?base=${base}&symbols=${symbols}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 * 60 * 24, tags: ["fx:latest"] },
    });
    if (!res.ok) throw new Error(`Frankfurter ${res.status}`);
    const json = (await res.json()) as {
      base: string;
      date: string;
      rates: Record<string, number>;
    };
    const rates = SUPPORTED_QUOTES.reduce<Record<Quote, number>>(
      (acc, q) => {
        acc[q] = json.rates[q] ?? FALLBACK_RATES[q];
        return acc;
      },
      { ...FALLBACK_RATES },
    );
    return { base, date: json.date, rates };
  } catch {
    return {
      base,
      date: new Date().toISOString().slice(0, 10),
      rates: { ...FALLBACK_RATES },
    };
  }
}

export function snapshotToRates(snapshot: FxSnapshot): FxRate[] {
  return (Object.entries(snapshot.rates) as Array<[Quote, number]>).map(
    ([quote, rate]) => ({ base: snapshot.base, quote, rate }),
  );
}
