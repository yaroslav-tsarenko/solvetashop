"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { PriceDisplay } from "@/components/shared/PriceDisplay/PriceDisplay";
import { useCart } from "@/providers/CartProvider";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  comparePrice?: number | null;
  imageUrl?: string | null;
  category?: string;
  quantity: number;
  /** Shows a small "New" marker. */
  isNew?: boolean;
  /** Eager-load the image (first row above the fold). */
  priority?: boolean;
}

/**
 * Product tile: an unboxed square of stone surface holding the image, with
 * the name and price set in plain text underneath. The add button sits inside
 * the image area and fades in on hover; on touch screens it is always shown.
 */
export function ProductCard({
  id,
  name,
  slug,
  sku,
  price,
  comparePrice,
  imageUrl,
  category,
  quantity,
  isNew = false,
  priority = false,
}: ProductCardProps) {
  const t = useTranslations("card");
  const { addItem } = useCart();
  const [imageFailed, setImageFailed] = useState(false);
  const onSale = !!comparePrice && comparePrice > price;
  const soldOut = quantity <= 0;
  const href = `/product/${slug}`;

  const add = () => {
    if (soldOut) return;
    addItem({
      productId: id,
      name,
      slug,
      sku,
      price,
      quantity: 1,
      imageUrl: imageUrl || null,
      maxQuantity: quantity,
    });
  };

  const marker = soldOut ? t("soldOut") : onSale ? t("reduced") : isNew ? t("new") : null;

  return (
    <article className="group relative flex min-w-0 flex-col">
      <figure className="relative m-0 aspect-square overflow-hidden rounded-[var(--radius-md)] bg-plate">
        <Link href={href} tabIndex={-1} aria-hidden="true" className="absolute inset-0 block">
          {imageUrl && !imageFailed ? (
            <Image
              src={imageUrl}
              alt=""
              fill
              priority={priority}
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-contain p-[9%] mix-blend-multiply transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-xs text-faint">
              {t("noImage")}
            </span>
          )}
        </Link>

        {marker ? (
          <span className={`tag absolute left-3 top-3 ${onSale && !soldOut ? "tag-sale" : ""} ${soldOut ? "!text-muted" : ""}`}>
            {marker}
          </span>
        ) : null}

        {!soldOut ? (
          <button
            type="button"
            onClick={add}
            aria-label={t("addNamed", { name })}
            className="absolute bottom-3 right-3 inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-pill)] bg-ink px-3.5 text-xs font-medium text-on-ink opacity-0 transition-[opacity,transform] duration-300 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 translate-y-1 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
          >
            <Plus size={14} strokeWidth={1.5} />
            {t("add")}
          </button>
        ) : null}
      </figure>

      <div className="flex flex-col gap-1 pt-3.5">
        {category ? <span className="text-[0.6875rem] text-faint">{category}</span> : null}
        <h3 className="m-0 text-[0.875rem] font-normal leading-snug text-ink [overflow-wrap:anywhere]">
          <Link href={href} className="line-clamp-2 transition-colors hover:text-sage-hover">
            {name}
          </Link>
        </h3>
        <PriceDisplay price={price} comparePrice={comparePrice} size="sm" />
      </div>
    </article>
  );
}
