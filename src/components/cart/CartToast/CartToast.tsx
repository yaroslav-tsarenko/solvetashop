"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Check, Lamp } from "lucide-react";

interface CartToastProps {
  name: string;
  imageUrl?: string | null;
  quantity: number;
}

export function CartToast({ name, imageUrl, quantity }: CartToastProps) {
  const t = useTranslations("cart");

  return (
    <div className="flex min-w-[280px] items-center gap-3.5 rounded-[var(--radius-lg)] border border-line bg-paper px-4 py-3 shadow-[var(--shadow-md)]">
      <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-md)] bg-surface text-faint">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill sizes="48px" style={{ objectFit: "contain", padding: "4px" }} />
        ) : (
          <Lamp size={18} strokeWidth={1.5} />
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="flex items-center gap-1.5 text-xs font-medium text-sage">
          <Check size={13} strokeWidth={1.5} />
          {t("toastAdded")}
        </span>
        <span className="max-w-[200px] truncate text-[0.8125rem] text-ink">{name}</span>
        {quantity > 1 && (
          <span className="text-[0.6875rem] text-muted">{t("toastQuantity", { count: quantity })}</span>
        )}
      </div>
    </div>
  );
}
