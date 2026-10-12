"use client";

import { useEffect, useState, Suspense } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useCurrency } from "@/providers/CurrencyProvider";
import { formatPrice } from "@/lib/utils/format-price";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { useCart } from "@/providers/CartProvider";
import type { OrderDetail } from "@/types/order";

type Outcome = "placed" | "cancel" | "decline" | "exception" | "failed";

function ConfirmedContent() {
  const t = useTranslations("order");
  const { currency, convert } = useCurrency();
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const statusParam = searchParams.get("status");
  const paymentLinkId = searchParams.get("id");
  const checkoutId = searchParams.get("checkoutId");

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(!!orderId || !!paymentLinkId || !!checkoutId);

  useEffect(() => {
    const targetOrderId = orderId;
    const targetCheckoutId = checkoutId || paymentLinkId;

    if (targetOrderId || targetCheckoutId) {
      let isSubscribed = true;
      const params = new URLSearchParams();
      if (targetOrderId) params.append("orderId", targetOrderId);
      if (targetCheckoutId) params.append("checkoutId", targetCheckoutId);
      if (statusParam) params.append("status", statusParam);

      fetch(`/api/orders/verify?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          if (!isSubscribed) return;
          if (data?.id) {
            setOrder(data);
            if (data.paymentStatus === "PAID") {
              clearCart();
            }
          }
        })
        .catch(() => {
          if (isSubscribed) setOrder(null);
        })
        .finally(() => {
          if (isSubscribed) setLoading(false);
        });

      return () => {
        isSubscribed = false;
      };
    }
    // Without an order/checkout id there is nothing to verify; `loading`
    // already starts as false in that case.
  }, [orderId, statusParam, paymentLinkId, checkoutId, clearCart]);

  if (loading) {
    return (
      <div className="wrap-narrow flex min-h-[60vh] flex-col items-start justify-center gap-5 py-16" role="status">
        <LoadingSpinner />
        <h2 className="heading">{t("checkingTitle")}</h2>
        <p className="lede">{t("checkingNote")}</p>
      </div>
    );
  }

  const isFailed = order?.paymentStatus === "FAILED" || ["decline", "cancel", "exception"].includes(statusParam || "");

  const outcome: Outcome = !isFailed
    ? "placed"
    : statusParam === "cancel" || statusParam === "decline" || statusParam === "exception"
      ? statusParam
      : "failed";

  const money = (value: number) => formatPrice(convert(Number(value)), currency);

  return (
    <div className="wrap-narrow pb-24 pt-14 sm:pb-32 sm:pt-20">
      <header className="flex flex-col gap-4 border-b border-line pb-10">
        <span className={`eyebrow ${isFailed ? "text-brick" : "text-sage"}`}>
          {isFailed ? t("eyebrowFailed") : t("eyebrowPlaced")}
        </span>
        <h1 className="display">{t(`outcomes.${outcome}.title`)}</h1>
        <p className="lede">{t(`outcomes.${outcome}.message`)}</p>
        {order && (
          <p className="text-sm text-muted">
            {t("reference")}{" "}
            <span className="font-medium text-ink tabular-nums">#{order.orderNumber.slice(-8)}</span>
          </p>
        )}
      </header>

      {order && (
        <section aria-labelledby="oc-items" className="border-b border-line py-10">
          <h2 id="oc-items" className="eyebrow mb-6">{t("itemsTitle")}</h2>

          <ul className="flex flex-col">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-6 border-t border-line py-4 first:border-t-0 first:pt-0">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[0.9375rem] text-ink">{item.productName}</div>
                  <div className="mt-0.5 text-xs text-muted">
                    {item.variantName ? `${item.variantName} · ` : ""}
                    {t("lineQty", { count: item.quantity, price: money(item.price) })}
                  </div>
                </div>
                <span className="whitespace-nowrap text-sm tabular-nums">{money(item.total)}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-6 flex flex-col gap-2 border-t border-line pt-6 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{t("subtotal")}</dt>
              <dd className="tabular-nums">{money(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{t("delivery")}</dt>
              <dd className="tabular-nums">
                {Number(order.shippingCost) === 0 ? t("free") : money(order.shippingCost)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{t("tax")}</dt>
              <dd className="tabular-nums">{money(order.taxAmount)}</dd>
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-line pt-4">
              <dt className="font-medium">{t("total")}</dt>
              <dd className="text-2xl font-light tracking-[-0.01em] tabular-nums">{money(order.total)}</dd>
            </div>
          </dl>
        </section>
      )}

      {order && (
        <section className="grid grid-cols-1 gap-10 border-b border-line py-10 sm:grid-cols-2">
          <div>
            <h2 className="eyebrow mb-3">{t("shipTo")}</h2>
            <address className="text-sm not-italic leading-[1.7] text-muted">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
              {order.shippingAddress.address1}<br />
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}
            </address>
          </div>
          <div>
            <h2 className="eyebrow mb-3">{t("whatNext")}</h2>
            {isFailed ? (
              <p className="text-sm leading-[1.7] text-muted">{t("failedNext")}</p>
            ) : (
              <ol className="flex flex-col gap-2 text-sm leading-[1.6] text-muted">
                <li className="flex gap-3"><span className="w-4 text-faint tabular-nums">1</span>{t("next1")}</li>
                <li className="flex gap-3"><span className="w-4 text-faint tabular-nums">2</span>{t("next2")}</li>
                <li className="flex gap-3"><span className="w-4 text-faint tabular-nums">3</span>{t("next3")}</li>
              </ol>
            )}
          </div>
        </section>
      )}

      {order && !isFailed && (
        <p className="border-b border-line py-6 text-sm text-muted">
          {t.rich("emailSent", {
            email: order.customerEmail,
            strong: (chunks) => <span className="text-ink">{chunks}</span>,
          })}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-10">
        {isFailed ? (
          <Link href="/checkout" className="btn-ink btn-lg">
            {t("retry")}
          </Link>
        ) : (
          <Link href="/catalog" className="btn-ink btn-lg">
            {t("keepBrowsing")}
          </Link>
        )}
        <Link href="/account/orders" className="btn-quiet">
          {t("viewOrders")}
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ConfirmedContent />
    </Suspense>
  );
}
