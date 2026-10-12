/**
 * Tailwind class constants for the listing pages (catalog, category, search).
 * Layout: light title → hairline filter bar → full-width grid → text pagination.
 * Filters live in a right-hand slide-over drawer.
 */
export const catalogClasses = {
  wrapper: "wrap pb-24",

  intro: "pb-10 pt-2 md:pb-14",

  title: "display m-0 break-words",

  lede: "lede mt-4",

  subLinks: "mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm",

  subLink: "text-muted underline-offset-4 transition-colors hover:text-ink hover:underline",

  bar:
    "mb-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-y border-line py-3",

  barStart: "flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2",

  barEnd: "flex items-center gap-6",

  filterToggle:
    "inline-flex cursor-pointer items-center gap-2 bg-transparent py-1 text-sm font-medium text-ink hover:text-sage-hover",

  filterCount: "tabular-nums text-muted",

  chip:
    "inline-flex cursor-pointer items-center gap-1.5 rounded-[var(--radius-pill)] border border-line bg-transparent px-3 py-1 text-xs text-ink transition-colors hover:border-line-strong",

  clearAll: "btn-quiet btn-sm !min-h-0 !text-xs text-muted",

  resultCount: "text-sm tabular-nums text-muted",

  pagination:
    "mt-16 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 border-t border-line pt-8 text-sm",

  pageEdge:
    "cursor-pointer bg-transparent px-3 py-2 text-ink underline-offset-4 hover:underline disabled:cursor-default disabled:text-faint disabled:no-underline",

  pageNum:
    "min-w-9 cursor-pointer bg-transparent px-2 py-2 tabular-nums text-muted transition-colors hover:text-ink",

  pageNumActive: "min-w-9 px-2 py-2 tabular-nums font-medium text-ink underline underline-offset-[6px]",

  pageGap: "min-w-6 px-1 text-center text-faint",

  drawerRoot: "fixed inset-0 z-[200]",

  drawerBackdrop: "absolute inset-0 bg-ink/30",

  drawerPanel:
    "absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-paper shadow-[var(--shadow-md)]",

  drawerHead: "flex items-center justify-between border-b border-line px-6 py-5",

  drawerTitle: "m-0 text-xl font-light tracking-[-0.01em] text-ink",

  drawerClose:
    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-transparent text-ink hover:bg-surface",

  drawerBody: "flex-1 overflow-y-auto px-6 py-6",

  drawerFoot: "flex items-center justify-between gap-4 border-t border-line px-6 py-4",
} as const;
