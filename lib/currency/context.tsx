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
  convertMinor,
  formatPrice,
  type FxRate,
} from "@/lib/currency/convert";

type CurrencyContextValue = {
  rates: ReadonlyArray<FxRate>;
  display: string;
  setDisplay: (currency: string) => void;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const LS_KEY = "travelapp:display-currency";

export function CurrencyProvider({
  rates,
  defaultCurrency,
  children,
}: {
  rates: ReadonlyArray<FxRate>;
  defaultCurrency: string;
  children: ReactNode;
}) {
  const [display, setDisplayState] = useState(defaultCurrency);

  useEffect(() => {
    const stored = window.localStorage.getItem(LS_KEY);
    if (stored) setDisplayState(stored);
  }, []);

  const setDisplay = useCallback((currency: string) => {
    setDisplayState(currency);
    window.localStorage.setItem(LS_KEY, currency);
  }, []);

  const value = useMemo(
    () => ({ rates, display, setDisplay }),
    [rates, display, setDisplay],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used inside <CurrencyProvider>");
  }
  return ctx;
}

export function PriceDisplay({
  amountMinor,
  currency,
  locale = "en-US",
}: {
  amountMinor: number;
  currency: string;
  locale?: string;
}) {
  const { rates, display } = useCurrency();
  const target = display.toUpperCase();
  const source = currency.toUpperCase();

  const original = formatPrice(amountMinor, source, locale);
  if (target === source) return <span>{original}</span>;

  const converted = convertMinor(amountMinor, source, target, rates);
  if (converted === null) {
    return (
      <span title="Conversion unavailable">
        {original}
      </span>
    );
  }
  return (
    <span title={`${original} · rate as of today`}>
      {formatPrice(converted, target, locale)}
    </span>
  );
}

export function CurrencySelector({
  currencies,
}: {
  currencies: ReadonlyArray<string>;
}) {
  const { display, setDisplay } = useCurrency();
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-slate-600">Display in</span>
      <select
        value={display}
        onChange={(e) => setDisplay(e.target.value)}
        className="rounded-md border border-slate-300 bg-white px-2 py-1"
      >
        {currencies.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </label>
  );
}
