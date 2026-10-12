"use client";

import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useCart } from "@/providers/CartProvider";
import { useCurrency } from "@/providers/CurrencyProvider";
import { CartItem } from "@/components/cart/CartItem/CartItem";
import { EmptyState } from "@/components/shared/EmptyState/EmptyState";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs/Breadcrumbs";
import { formatPrice } from "@/lib/utils/format-price";
import { FREE_STANDARD_MIN, qualifiesForFreeStandard } from "@/lib/shipping";
import { cartClasses as styles } from "./cart-classes";

export default function CartPage() {
  const t = useTranslations("cart");
  const nav = useTranslations("nav");
  const { cart } = useCart();
  const { currency, convert } = useCurrency();

  // Delivery depends on the method picked (and any code applied) at checkout,
  // so the bag shows the goods + tax and leaves delivery to the next step.
  const beforeDelivery = cart.subtotal + cart.taxAmount;
  // Free standard delivery is judged on the subtotal after discounts; the bag
  // doesn't know about discounts yet, so this is a guide the checkout confirms.
  const freeStandard = qualifiesForFreeStandard(cart.subtotal);
  const remaining = Math.max(FREE_STANDARD_MIN - cart.subtotal, 0);

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: t("title") }]} />

      <header className={`${styles.head} ${cart.items.length > 0 ? "border-b border-line pb-6" : ""}`}>
        <h1 className={styles.title}>{t("title")}</h1>
        {cart.items.length > 0 && (
          <span className={styles.count}>{t("count", { count: cart.itemCount })}</span>
        )}
      </header>

      {cart.items.length === 0 ? (
        <EmptyState
          title={t("empty")}
          subtitle={t("emptySubtitle")}
          actionLabel={t("emptyAction")}
          actionHref="/catalog"
          icon={<ShoppingBag size={28} strokeWidth={1.25} />}
        />
      ) : (
        <div className={styles.layout}>
          <section aria-label={t("listLabel")}>
            <ul className={styles.list}>
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          </section>

          <aside className={styles.summary} aria-labelledby="bag-summary">
            <h2 id="bag-summary" className={styles.summaryTitle}>
              {t("summary")}
            </h2>

            <div className={styles.row}>
              <span className={styles.rowLabel}>{t("subtotal")}</span>
              <span>{formatPrice(convert(cart.subtotal), currency)}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>{t("tax", { rate: 21 })}</span>
              <span>{formatPrice(convert(cart.taxAmount), currency)}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>{t("shipping")}</span>
              <span className="text-muted">{t("shippingCalculated")}</span>
            </div>

            <div className={styles.totalRow}>
              <span className="text-sm font-medium">{t("total")}</span>
              <span className="text-2xl font-light tracking-[-0.01em]">
                {formatPrice(convert(beforeDelivery), currency)}
              </span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted">
              {freeStandard
                ? t("freeStandardReached", { amount: formatPrice(convert(FREE_STANDARD_MIN), currency) })
                : t("freeStandardRemaining", {
                    remaining: formatPrice(convert(remaining), currency),
                    amount: formatPrice(convert(FREE_STANDARD_MIN), currency),
                  })}
            </p>

            <Link href="/checkout" className={styles.checkoutBtn}>
              {t("checkout")}
            </Link>
            <Link href="/catalog" className={styles.continueLink}>
              {t("continueShopping")}
            </Link>

            <p className={styles.footnote}>{t("footnote")}</p>
          </aside>
        </div>
      )}
    </div>
  );
}
