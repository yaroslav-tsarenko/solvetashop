/**
 * Tailwind class constants for the bag page.
 */
export const cartClasses = {
  wrapper: "wrap pb-24 pt-6 sm:pb-32",

  head: "mb-2 mt-8 flex flex-wrap items-end justify-between gap-4 sm:mt-12",

  title: "display",

  count: "text-sm text-muted",

  layout:
    "grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-20 xl:grid-cols-[minmax(0,1fr)_400px]",

  list: "flex flex-col",

  summary: "flex flex-col pt-6 lg:sticky lg:top-[calc(var(--header-height)+var(--announcement-height)+2rem)]",

  summaryTitle: "eyebrow mb-5",

  row: "flex items-baseline justify-between gap-4 py-2 text-sm",

  rowLabel: "text-muted",

  totalRow: "mt-3 flex items-baseline justify-between gap-4 border-t border-line pt-5",

  checkoutBtn: "btn-ink btn-lg mt-8 w-full",

  continueLink: "btn-quiet mx-auto mt-4 text-muted",

  footnote: "mt-8 text-xs leading-relaxed text-faint",
} as const;
