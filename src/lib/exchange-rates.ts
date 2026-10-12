import { DEFAULT_RATES, type Rates } from "@/lib/currency";

let cachedRates: { rates: Rates; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * GBP-based exchange rates (1 GBP = x), cached for an hour. Used by both
 * /api/exchange-rates (what the storefront displays with) and /api/checkout
 * (what is charged), so the two agree. Falls back to DEFAULT_RATES.
 */
export async function getGbpRates(): Promise<Rates> {
  if (cachedRates && Date.now() - cachedRates.timestamp < CACHE_DURATION) {
    return cachedRates.rates;
  }

  try {
    const res = await fetch("https://api.frankfurter.dev/v1/latest?base=GBP&symbols=EUR,USD", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch rates: ${res.status}`);
    const data = await res.json();
    const eur = Number(data?.rates?.EUR);
    const usd = Number(data?.rates?.USD);
    if (!(eur > 0) || !(usd > 0)) throw new Error("Malformed rates response");

    cachedRates = { rates: { GBP: 1, EUR: eur, USD: usd }, timestamp: Date.now() };
    return cachedRates.rates;
  } catch (e) {
    console.warn("Failed to fetch exchange rates, using fallback:", e);
    return DEFAULT_RATES;
  }
}
