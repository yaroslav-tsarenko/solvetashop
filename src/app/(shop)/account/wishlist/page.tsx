"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid";
import { EmptyState } from "@/components/shared/EmptyState/EmptyState";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { accountClasses as styles } from "../account-classes";

export default function WishlistPage() {
  const t = useTranslations("account");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wishlist")
      .then((res) => res.json())
      .then((data) => {
        setItems(
          data.map((item: { product: Record<string, unknown> }) => item.product)
        );
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className={styles.pageTitle}>{t("wishlistTitle")}</h2>
          <p className={styles.pageLede}>{t("wishlistLede")}</p>
        </div>
        {items.length > 0 && (
          <p className="text-sm text-muted">{t("pieces", { count: items.length })}</p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="border-t border-line">
          <EmptyState
            title={t("emptyWishlist")}
            subtitle={t("emptyWishlistSubtitle")}
            actionLabel={t("shopCta")}
            actionHref="/catalog"
            icon={<Heart size={40} strokeWidth={1.25} />}
          />
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}
