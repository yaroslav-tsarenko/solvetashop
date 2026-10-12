"use client";

import { useTranslations } from "next-intl";
import { accountClasses as styles, statusTone } from "./account-classes";

/** Small hairline pill with a translated, plain-language order status. */
export function OrderStatusPill({ status }: { status: string }) {
  const t = useTranslations("account");
  const key = `status.${status}`;
  return (
    <span className={`${styles.status} ${statusTone[status] ?? "text-muted"}`}>
      {t.has(key) ? t(key) : status}
    </span>
  );
}
