/**
 * Currency maths shared by the storefront (CurrencyProvider) and the server
 * (/api/checkout), so the amount displayed and the amount charged are computed
 * identically. Prices are stored in GBP; rates are "1 GBP = x".
 */

export type Currency = "GBP" | "EUR" | "USD";

export const BASE_CURRENCY: Currency = "GBP";
export const SUPPORTED_CURRENCIES: Currency[] = ["GBP", "EUR", "USD"];

export type Rates = Record<Currency, number>;

export const DEFAULT_RATES: Rates = { GBP: 1, EUR: 1.17, USD: 1.27 };

export function isCurrency(value: unknown): value is Currency {
  return typeof value === "string" && (SUPPORTED_CURRENCIES as string[]).includes(value);
}

/** Converts a GBP amount to `currency`, rounded to 2 decimals. */
export function convertFromBase(amountInBase: number, currency: Currency, rates: Rates): number {
  if (currency === BASE_CURRENCY) return amountInBase;
  return Math.round(amountInBase * rates[currency] * 100) / 100;
}
