"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

import {
  BASE_CURRENCY,
  SUPPORTED_CURRENCIES,
  DEFAULT_RATES,
  convertFromBase,
  type Currency,
  type Rates,
} from "@/lib/currency";

// The store's base currency (GBP) is what the numbers in the database mean.
// Every other currency is derived from it at display time with the same maths
// /api/checkout uses to charge, so displayed and charged totals agree.
export { BASE_CURRENCY, SUPPORTED_CURRENCIES };
export type { Currency };

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  /** Takes an amount in BASE_CURRENCY and returns it in the selected one. */
  convert: (amountInBase: number) => number;
  rates: Rates;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(BASE_CURRENCY);
  const [rates, setRates] = useState<Rates>(DEFAULT_RATES);

  useEffect(() => {
    const stored = localStorage.getItem("currency") as Currency | null;
    if (stored && SUPPORTED_CURRENCIES.includes(stored)) {
      setCurrencyState(stored);
    } else if (stored) {
      localStorage.removeItem("currency");
    }
  }, []);

  useEffect(() => {
    fetch("/api/exchange-rates")
      .then((r) => r.json())
      .then((data) => {
        if (data.rates) {
          setRates({ GBP: 1, EUR: data.rates.EUR, USD: data.rates.USD });
        }
      })
      .catch(() => {});
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("currency", c);
  };

  const convert = useCallback(
    (amountInBase: number) => convertFromBase(amountInBase, currency, rates),
    [currency, rates]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
