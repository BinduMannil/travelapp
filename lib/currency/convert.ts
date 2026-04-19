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

  const direct = rates.find((r) => r.base === from && r.quote === to);
  let rate: number | null = direct?.rate ?? null;

  if (rate === null) {
    const inverse = rates.find((r) => r.base === to && r.quote === from);
    if (inverse && inverse.rate > 0) rate = 1 / inverse.rate;
  }

  if (rate === null) return null;

  const amountMajor = toMajor(amountMinor, from);
  const converted = amountMajor * rate;
  return toMinor(converted, to);
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
