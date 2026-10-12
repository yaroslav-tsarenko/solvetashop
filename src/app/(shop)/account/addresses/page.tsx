"use client";

import { useTranslations } from "next-intl";
import { EmptyState } from "@/components/shared/EmptyState/EmptyState";
import { MapPin } from "lucide-react";
import { accountClasses as styles } from "../account-classes";

export default function AddressesPage() {
  const t = useTranslations("account");

  return (
    <div>
      <div className="mb-10">
        <h2 className={styles.pageTitle}>{t("addressesTitle")}</h2>
        <p className={styles.pageLede}>{t("addressesLede")}</p>
      </div>
      <div className="border-t border-line">
        <EmptyState
          title={t("noAddresses")}
          subtitle={t("noAddressesSubtitle")}
          icon={<MapPin size={40} strokeWidth={1.25} />}
        />
      </div>
    </div>
  );
}
