/**
 * Shared class strings for the account area. Sections are separated by
 * hairlines rather than boxed cards.
 */
export const accountClasses = {
  /** Page-level heading inside the account area (the greeting is the h1). */
  pageTitle: "text-[1.75rem] font-light leading-tight tracking-[-0.02em] text-ink md:text-[2rem]",

  pageLede: "lede mt-2",

  /** A stacked page section with a hairline on top. */
  section: "border-t border-line pt-8",

  sectionHead: "mb-6 flex flex-wrap items-baseline justify-between gap-4",

  sectionTitle: "text-lg font-normal tracking-[-0.01em] text-ink",

  /** Underlined text link used for "see all" style actions. */
  textLink:
    "text-sm font-medium text-ink underline decoration-1 underline-offset-[0.3em] transition-colors hover:text-sage-hover",

  /** Status pill: hairline outline, coloured text. */
  status:
    "inline-flex items-center whitespace-nowrap rounded-[var(--radius-pill)] border border-line px-2.5 py-0.5 text-[0.75rem] font-medium",

  /** Definition-list label. */
  term: "eyebrow",

  /** Definition-list value. */
  value: "mt-2 text-[0.9375rem] leading-relaxed text-ink",

  /** Order history: table on wider screens. */
  table:
    "hidden w-full border-collapse text-left text-sm md:table [&_th]:border-b [&_th]:border-line [&_th]:pb-3 [&_th]:text-[0.6875rem] [&_th]:font-medium [&_th]:uppercase [&_th]:tracking-[var(--tracking-label)] [&_th]:text-muted [&_td]:border-b [&_td]:border-line [&_td]:py-5 [&_td]:align-middle",

  /** Order history: stacked rows on small screens. */
  rowList: "divide-y divide-line border-y border-line md:hidden",

  row: "flex items-start justify-between gap-4 py-5 text-ink no-underline",
} as const;

/** Text colour per order status, applied to the status pill. */
export const statusTone: Record<string, string> = {
  PENDING: "text-muted",
  CONFIRMED: "text-sage",
  PROCESSING: "text-sage",
  SHIPPED: "text-ink",
  DELIVERED: "text-success",
  CANCELLED: "text-brick",
  REFUNDED: "text-brick",
};

export const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
] as const;

export const PAYMENT_STATUSES = ["PENDING", "PAID", "FAILED", "REFUNDED"] as const;
