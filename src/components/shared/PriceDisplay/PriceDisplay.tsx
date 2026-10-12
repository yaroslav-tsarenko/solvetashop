"use client";

import { formatPrice } from "@/lib/utils/format-price";
import { useCurrency } from "@/providers/CurrencyProvider";

interface PriceDisplayProps {
  price: number;
  comparePrice?: number | null;
  size?: "sm" | "md" | "lg";
}

const sizeCls = {
  sm: { price: "text-[0.875rem]", compare: "text-[0.75rem]" },
  md: { price: "text-[1.125rem]", compare: "text-[0.875rem]" },
  lg: { price: "text-[1.625rem] font-light tracking-[-0.02em]", compare: "text-base" },
};

/** Plain-text price: current price first, the former price struck through after it. */
export function PriceDisplay({ price, comparePrice, size = "md" }: PriceDisplayProps) {
  const { currency, convert } = useCurrency();
  const isOnSale = !!comparePrice && comparePrice > price;

  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2">
      <span className={`${sizeCls[size].price} ${isOnSale ? "text-brick" : "text-ink"} tabular-nums`}>
        {formatPrice(convert(price), currency)}
      </span>
      {isOnSale ? (
        <s className={`${sizeCls[size].compare} text-faint tabular-nums`}>
          {formatPrice(convert(comparePrice), currency)}
        </s>
      ) : null}
    </span>
  );
}
