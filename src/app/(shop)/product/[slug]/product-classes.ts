/**
 * Tailwind class constants for the product page.
 * Desktop: gallery + detail accordions on the left, sticky purchase column on the right.
 */
export const productClasses = {
  wrapper: "wrap pb-24",

  layout:
    "grid grid-cols-1 gap-y-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-x-12 lg:gap-x-20",

  galleryCol: "min-w-0 md:col-start-1 md:row-start-1",

  infoCol: "min-w-0 md:col-start-2 md:row-span-2 md:row-start-1",

  infoSticky: "md:sticky md:top-[calc(var(--header-height,4rem)+2rem)]",

  detailsCol: "min-w-0 md:col-start-1 md:row-start-2",

  related: "mt-24 border-t border-line pt-12",

  relatedHead: "mb-8 flex flex-wrap items-end justify-between gap-4",

  relatedTitle: "heading m-0",
} as const;
