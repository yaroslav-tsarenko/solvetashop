"use client";

import { useEffect, useState, use } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { useCurrency } from "@/providers/CurrencyProvider";
import { formatPrice } from "@/lib/utils/format-price";
import type { OrderDetail } from "@/types/order";
import { accountClasses as styles } from "@/app/(shop)/account/account-classes";
import { OrderStatusPill } from "@/app/(shop)/account/OrderStatus";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations("account");
  const format = useFormatter();
  const { currency, convert } = useCurrency();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then(setOrder)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const money = (value: number) => formatPrice(convert(Number(value)), currency);

  const backLink = (
    <Link
      href="/account/orders"
      className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-muted no-underline transition-colors hover:text-ink"
    >
      <ArrowLeft size={15} strokeWidth={1.5} aria-hidden="true" />
      {t("backToOrders")}
    </Link>
  );

  if (loading) return <LoadingSpinner />;
  if (!order || !order.orderNumber) {
    return (
      <div>
        {backLink}
        <h2 className={`${styles.pageTitle} mt-8`}>{t("orderNotFound")}</h2>
        <p className={styles.pageLede}>{t("orderNotFoundDesc")}</p>
      </div>
    );
  }

  const payKey = `payment.${order.paymentStatus}`;
  const paymentLabel = t.has(payKey) ? t(payKey) : order.paymentStatus;
  const addr = order.shippingAddress;

  return (
    <div>
      {backLink}

      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className={`${styles.pageTitle} tabular-nums`}>
            {t("orderNumber", { number: order.orderNumber.slice(-8) })}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {t("placedOn", {
              date: format.dateTime(new Date(order.createdAt), { dateStyle: "long", timeStyle: "short" }),
            })}
          </p>
        </div>
        <OrderStatusPill status={order.status} />
      </div>

      <dl className="mt-12 grid grid-cols-1 gap-10 border-t border-line pt-8 sm:grid-cols-2">
        <div>
          <dt className={styles.term}>{t("deliverTo")}</dt>
          <dd className={styles.value}>
            {addr.firstName} {addr.lastName}
            <br />
            {addr.address1}
            <br />
            {addr.address2 && (
              <>
                {addr.address2}
                <br />
              </>
            )}
            {addr.city}, {addr.postalCode}
            <br />
            {addr.country}
          </dd>
        </div>
        <div>
          <dt className={styles.term}>{t("paymentDelivery")}</dt>
          <dd className={styles.value}>
            <span className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
              <span className="text-muted">{t("paymentLabel")}</span>
              <span>{paymentLabel}</span>
              {order.paymentMethod && (
                <>
                  <span className="text-muted">{t("methodLabel")}</span>
                  <span>{order.paymentMethod}</span>
                </>
              )}
              {order.shippingMethod && (
                <>
                  <span className="text-muted">{t("deliveryLabel")}</span>
                  <span>{order.shippingMethod}</span>
                </>
              )}
              {order.trackingNumber && (
                <>
                  <span className="text-muted">{t("trackingLabel")}</span>
                  <span className="font-medium tabular-nums">{order.trackingNumber}</span>
                </>
              )}
            </span>
          </dd>
        </div>
      </dl>

      <section className={`${styles.section} mt-12`} aria-labelledby="items-title">
        <h3 id="items-title" className={`${styles.sectionTitle} mb-2`}>
          {t("itemsTitle")}
        </h3>
        <ul className="divide-y divide-line">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-6 py-5">
              <div className="min-w-0">
                <p className="text-[0.9375rem] text-ink">{item.productName}</p>
                {item.variantName && <p className="mt-0.5 text-[0.8125rem] text-muted">{item.variantName}</p>}
                <p className="mt-1 text-xs text-faint">{t("sku", { sku: item.productSku })}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-[0.9375rem] tabular-nums text-ink">{money(item.total)}</p>
                <p className="mt-0.5 text-[0.8125rem] tabular-nums text-muted">
                  {t("qtyEach", { count: item.quantity, price: money(item.price) })}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <dl className="ml-auto mt-2 flex max-w-sm flex-col gap-2 border-t border-line pt-6 text-sm">
          <div className="flex justify-between gap-6">
            <dt className="text-muted">{t("subtotal")}</dt>
            <dd className="tabular-nums text-ink">{money(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt className="text-muted">{t("deliveryLabel")}</dt>
            <dd className="tabular-nums text-ink">
              {Number(order.shippingCost) === 0 ? t("free") : money(order.shippingCost)}
            </dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt className="text-muted">{t("tax")}</dt>
            <dd className="tabular-nums text-ink">{money(order.taxAmount)}</dd>
          </div>
          {Number(order.discountAmount) > 0 && (
            <div className="flex justify-between gap-6">
              <dt className="text-sage">{t("discount")}</dt>
              <dd className="tabular-nums text-sage">−{money(order.discountAmount)}</dd>
            </div>
          )}
          <div className="mt-2 flex items-baseline justify-between gap-6 border-t border-line pt-4">
            <dt className="text-base text-ink">{t("total")}</dt>
            <dd className="text-xl font-normal tabular-nums tracking-[-0.01em] text-ink">{money(order.total)}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
