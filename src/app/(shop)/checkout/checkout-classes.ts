/**
 * Tailwind class constants for the checkout page.
 */
export const checkoutClasses = {
  wrapper: "wrap pb-24 pt-6 sm:pb-32",

  head: "mb-10 mt-8 flex flex-col gap-3 sm:mt-12",

  title: "display",

  guestNote: "text-sm text-muted [&_a]:text-sage [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-4 [&_a:hover]:text-sage-hover",

  layout:
    "grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-20 xl:grid-cols-[minmax(0,1fr)_440px]",

  form: "flex flex-col border-b border-line",

  section: "border-t border-line py-8 sm:py-10",

  sectionHead: "flex items-baseline justify-between gap-4",

  sectionTitle: "flex items-baseline gap-4 text-xl font-light tracking-[-0.01em] sm:text-2xl",

  sectionNumber: "w-5 text-sm font-medium tabular-nums",

  sectionBody: "mt-8 flex flex-col gap-5 sm:pl-9",

  sectionRecap: "mt-3 text-sm leading-relaxed text-muted sm:pl-9",

  twoCol: "grid grid-cols-1 gap-5 sm:grid-cols-2",

  hint: "mt-1.5 block text-xs text-faint",

  error: "mt-1.5 block text-xs text-brick",

  methodList: "flex flex-col border-y border-line",

  methodRow:
    "flex cursor-pointer items-center gap-4 border-t border-line py-4 first:border-t-0 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-sage",

  summary:
    "-order-1 rounded-[var(--radius-lg)] bg-surface p-6 sm:p-8 lg:sticky lg:top-[calc(var(--header-height)+var(--announcement-height)+2rem)] lg:order-none",

  summaryRow: "flex items-baseline justify-between gap-4 py-1.5 text-sm",

  summaryTotal: "mt-3 flex items-baseline justify-between gap-4 border-t border-line pt-5",
} as const;
