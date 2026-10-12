"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

interface ProductSortProps {
  value: string;
  onChange: (value: string) => void;
}

/** Quiet inline select: "Order  Latest arrivals ⌄". */
export function ProductSort({ value, onChange }: ProductSortProps) {
  const t = useTranslations("listing");
  const id = useId();

  const options = [
    { key: "newest", label: t("sortNewest") },
    { key: "price-asc", label: t("sortPriceAsc") },
    { key: "price-desc", label: t("sortPriceDesc") },
    { key: "name-asc", label: t("sortName") },
  ];

  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <label htmlFor={id} className="text-muted">
        {t("sortLabel")}
      </label>
      <span className="relative inline-flex items-center">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="cursor-pointer appearance-none border-0 bg-transparent py-1 pr-6 pl-0 text-sm font-medium text-ink focus:outline-none focus-visible:underline focus-visible:underline-offset-4"
        >
          {options.map((option) => (
            <option key={option.key} value={option.key}>{option.label}</option>
          ))}
        </select>
        <ChevronDown size={14} strokeWidth={1.5} className="pointer-events-none absolute right-0 text-muted" />
      </span>
    </div>
  );
}
