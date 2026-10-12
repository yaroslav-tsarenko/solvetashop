"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ProductGalleryProps {
  images: { id: string; url: string; alt?: string | null }[];
  productName: string;
}

/**
 * Large image on a warm surface with a thin strip of square thumbnails —
 * vertical on desktop (left of the image), horizontal below it on mobile.
 */
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const t = useTranslations("product");
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <figure className="m-0 flex aspect-[4/5] items-center justify-center rounded-[var(--radius-md)] bg-surface text-sm text-faint">
        {t("galleryEmpty")}
      </figure>
    );
  }

  const current = images[Math.min(selectedIndex, images.length - 1)];
  const hasStrip = images.length > 1;

  return (
    <div className={hasStrip ? "flex flex-col-reverse gap-3 md:flex-row md:gap-4" : ""}>
      {hasStrip && (
        <ul
          className="m-0 flex list-none gap-2 overflow-x-auto p-0 [scrollbar-width:none] md:max-h-[640px] md:w-16 md:flex-none md:flex-col md:overflow-y-auto md:overflow-x-visible [&::-webkit-scrollbar]:hidden"
          aria-label={t("galleryLabel")}
        >
          {images.map((image, index) => {
            const active = index === selectedIndex;
            return (
              <li key={image.id} className="flex-none">
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={t("galleryShow", { index: index + 1, total: images.length })}
                  aria-current={active ? "true" : undefined}
                  className={[
                    "relative block h-14 w-14 cursor-pointer overflow-hidden rounded-[var(--radius-md)] bg-surface md:h-16 md:w-16",
                    "border transition-colors duration-150",
                    active ? "border-ink" : "border-transparent hover:border-line-strong",
                  ].join(" ")}
                >
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-contain p-1.5"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <figure className="relative m-0 aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-md)] bg-surface md:flex-1">
        <Image
          key={current.id}
          src={current.url}
          alt={current.alt || productName}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-contain p-6 sm:p-10"
          priority
        />
        {hasStrip && (
          <figcaption className="absolute bottom-3 right-4 text-xs tabular-nums text-muted">
            {selectedIndex + 1} / {images.length}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
