/**
 * Delivery terms for Solvetashop — the single source of truth.
 *
 * The checkout page, the bag, /api/checkout, the order emails and the
 * shipping policy all read from here, so what the site shows, what checkout
 * charges and what the policy says can't drift apart. All amounts are in the
 * store's base currency (GBP); other currencies are converted at checkout.
 *
 * The DB `StoreSettings.freeShippingMin` column is intentionally NOT used.
 */

export const SHIPPING_METHOD_KEYS = ["standard", "express"] as const;
export type ShippingMethodKey = (typeof SHIPPING_METHOD_KEYS)[number];

/** Standard delivery is free when the order subtotal after discounts is at least this (GBP). */
export const FREE_STANDARD_MIN = 75;

export interface ShippingMethod {
  key: ShippingMethodKey;
  /** Price in GBP before any free-delivery rule is applied. */
  price: number;
  /** Whether the FREE_STANDARD_MIN threshold makes this method free. */
  freeOverThreshold: boolean;
  /** i18n key (inside the `checkout` namespace) for the delivery-time label. */
  timeKey: `methods.${ShippingMethodKey}.time`;
}

export const SHIPPING_METHODS: readonly ShippingMethod[] = [
  { key: "standard", price: 4.95, freeOverThreshold: true, timeKey: "methods.standard.time" },
  { key: "express", price: 9.95, freeOverThreshold: false, timeKey: "methods.express.time" },
] as const;

export const DEFAULT_SHIPPING_METHOD: ShippingMethodKey = "standard";

export function isShippingMethod(value: unknown): value is ShippingMethodKey {
  return typeof value === "string" && (SHIPPING_METHOD_KEYS as readonly string[]).includes(value);
}

export function getShippingMethod(method: ShippingMethodKey): ShippingMethod {
  return SHIPPING_METHODS.find((m) => m.key === method) ?? SHIPPING_METHODS[0];
}

/** True when the subtotal (after discounts, GBP) qualifies for free standard delivery. */
export function qualifiesForFreeStandard(discountedSubtotal: number): boolean {
  return discountedSubtotal >= FREE_STANDARD_MIN;
}

/** Delivery charge in GBP for a method, given the order subtotal after discounts (GBP). */
export function shippingCost(method: ShippingMethodKey, discountedSubtotal: number): number {
  const m = getShippingMethod(method);
  if (m.freeOverThreshold && qualifiesForFreeStandard(discountedSubtotal)) return 0;
  return m.price;
}

/**
 * Typical delivery times after dispatch, per destination zone, in business
 * days. Rendered in the shipping policy; the checkout labels
 * (`checkout.methods.*.time` in messages/*.json) and the email labels below
 * summarise the same figures — update them together.
 */
export const DELIVERY_ZONES = [
  { zone: "United Kingdom", standard: "1–3", express: "1–2" },
  { zone: "Europe", standard: "3–7", express: "2–4" },
  { zone: "North America", standard: "5–10", express: "3–5" },
  { zone: "Asia & Oceania", standard: "7–14", express: "4–7" },
  { zone: "Africa & South America", standard: "8–15", express: "5–8" },
] as const;

/** English delivery-time summaries (used in emails), matching messages/en.json. */
export const DELIVERY_TIME_EN: Record<ShippingMethodKey, string> = {
  standard: "UK 1–3 business days · Europe 3–7 · elsewhere 5–15, after dispatch",
  express: "UK 1–2 business days · Europe 2–4 · elsewhere 3–8, after dispatch",
};

export const SHIPPING_LABEL_EN: Record<ShippingMethodKey, string> = {
  standard: "Standard delivery",
  express: "Express delivery",
};
