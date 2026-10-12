"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Lamp } from "lucide-react";
import { Link } from "@/i18n/routing";
import { QuantitySelector } from "@/components/shared/QuantitySelector/QuantitySelector";
import { PriceDisplay } from "@/components/shared/PriceDisplay/PriceDisplay";
import { useCart } from "@/providers/CartProvider";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
}

/**
 * One line of the bag: small image on surface, name + details, a text stepper,
 * the line price and an underlined "Remove".
 */
export function CartItem({ item }: CartItemProps) {
  const t = useTranslations("cart");
  const { updateQuantity, removeItem } = useCart();

  return (
    <li className="grid grid-cols-[72px_minmax(0,1fr)] gap-x-5 gap-y-4 border-b border-line py-6 sm:grid-cols-[96px_minmax(0,1fr)_auto] sm:items-center sm:gap-x-8">
      <Link
        href={`/product/${item.slug}`}
        className="relative block aspect-square w-full overflow-hidden rounded-[var(--radius-md)] bg-surface"
        tabIndex={-1}
        aria-hidden="true"
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt=""
            fill
            sizes="96px"
            style={{ objectFit: "contain", padding: "8px" }}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-faint">
            <Lamp size={20} strokeWidth={1.25} />
          </span>
        )}
      </Link>

      <div className="flex min-w-0 flex-col gap-1">
        <Link
          href={`/product/${item.slug}`}
          className="line-clamp-2 text-[0.9375rem] text-ink [overflow-wrap:anywhere] hover:text-sage"
        >
          {item.name}
        </Link>
        {item.variantName && <span className="text-[0.8125rem] text-muted">{item.variantName}</span>}
        <span className="text-xs text-faint">{t("reference", { sku: item.sku })}</span>

        <div className="mt-3 flex items-center gap-5">
          <QuantitySelector
            quantity={item.quantity}
            maxQuantity={item.maxQuantity}
            onChange={(qty) => updateQuantity(item.productId, qty, item.variantId)}
          />
          <button
            type="button"
            onClick={() => removeItem(item.productId, item.variantId)}
            className="text-[0.8125rem] text-muted underline decoration-1 underline-offset-4 transition-colors hover:text-brick"
          >
            {t("remove")}
          </button>
        </div>
      </div>

      <div className="col-start-2 sm:col-start-auto sm:text-right">
        <PriceDisplay price={item.price * item.quantity} size="sm" />
      </div>
    </li>
  );
}
