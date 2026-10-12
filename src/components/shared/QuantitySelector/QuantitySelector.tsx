"use client";

import { useTranslations } from "next-intl";

interface QuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onChange: (quantity: number) => void;
}

/**
 * Minimal text stepper: "−  2  +" inside a hairline pill.
 */
export function QuantitySelector({ quantity, maxQuantity, onChange }: QuantitySelectorProps) {
  const t = useTranslations("cart");
  const stepBtn =
    "flex h-9 w-9 items-center justify-center text-base font-light text-ink transition-colors hover:text-sage disabled:cursor-not-allowed disabled:text-faint";

  return (
    <div
      role="group"
      aria-label={t("quantity")}
      className="inline-flex h-9 items-center rounded-[var(--radius-pill)] border border-line"
    >
      <button
        type="button"
        className={stepBtn}
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        aria-label={t("decrease")}
      >
        −
      </button>
      <span className="min-w-[1.75rem] text-center text-sm font-medium tabular-nums" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        className={stepBtn}
        onClick={() => onChange(Math.min(maxQuantity, quantity + 1))}
        disabled={quantity >= maxQuantity}
        aria-label={t("increase")}
      >
        +
      </button>
    </div>
  );
}
