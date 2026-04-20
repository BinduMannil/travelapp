// Minor-unit aware currency conversion.
// ISO 4217 currencies where the minor unit is the currency itself (0 decimals).
const ZERO_DECIMAL = new Set([
  "JPY",
  "KRW",
  "VND",
  "CLP",
  "PYG",
  "ISK",
  "HUF",
  "UGX",
  "RWF",
]);

export function decimalsFor(currency: string): number {
  return ZERO_DECIMAL.has(currency.toUpperCase()) ? 0 : 2;
}

export function toMajor(amountMinor: number, currency: string): number {
  const d = decimalsFor(currency);
  return amountMinor / 10 ** d;
}

export function toMinor(amountMajor: number, currency: string): number {
  const d = decimalsFor(currency);
  return Math.round(amountMajor * 10 ** d);
}

export type FxRate = { base: string; quote: string; rate: number };

export function convertMinor(
  amountMinor: number,
  fromCurrency: string,
  toCurrency: string,
  rates: ReadonlyArray<FxRate>,
): number | null {
  const from = fromCurrency.toUpperCase();
  const to = toCurrency.toUpperCase();
  if (from === to) return amountMinor;

  const rate = findRate(from, to, rates);
  if (rate === null) return null;

  const amountMajor = toMajor(amountMinor, from);
  const converted = amountMajor * rate;
  return toMinor(converted, to);
}

/**
 * Resolve a from→to FX rate by (1) direct lookup, (2) inverse, or
 * (3) triangulating via any shared base currency present in the rates
 * table. Our snapshots are fetched with a single base (e.g. JPY), so
 * USD→AED has no direct or inverse row — triangulation via JPY recovers
 * it as rate(JPY→AED) / rate(JPY→USD).
 */
function findRate(
  from: string,
  to: string,
  rates: ReadonlyArray<FxRate>,
): number | null {
  const direct = rates.find((r) => r.base === from && r.quote === to);
  if (direct) return direct.rate;

  const inverse = rates.find((r) => r.base === to && r.quote === from);
  if (inverse && inverse.rate > 0) return 1 / inverse.rate;

  // Triangulate via any common base B where B→from and B→to both exist.
  const fromQuotes = rates.filter((r) => r.quote === from);
  for (const row of fromQuotes) {
    const hop = rates.find(
      (r) => r.base === row.base && r.quote === to,
    );
    if (hop && row.rate > 0) return hop.rate / row.rate;
  }

  // Also try via any common quote Q where from→Q and to→Q both exist.
  const fromBases = rates.filter((r) => r.base === from);
  for (const row of fromBases) {
    const hop = rates.find(
      (r) => r.base === to && r.quote === row.quote,
    );
    if (hop && hop.rate > 0) return row.rate / hop.rate;
  }

  return null;
}

export function formatPrice(
  amountMinor: number,
  currency: string,
  locale = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: decimalsFor(currency),
  }).format(toMajor(amountMinor, currency));
}
