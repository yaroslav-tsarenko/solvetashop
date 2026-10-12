"use client";

import { useEffect, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useAuth } from "@/providers/AuthProvider";
import { useCurrency } from "@/providers/CurrencyProvider";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { EmptyState } from "@/components/shared/EmptyState/EmptyState";
import { formatPrice } from "@/lib/utils/format-price";
import { Package } from "lucide-react";
import { accountClasses as styles } from "@/app/(shop)/account/account-classes";
import { OrderStatusPill } from "@/app/(shop)/account/OrderStatus";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  items: { id: string }[];
}

export default function OrdersPage() {
  const t = useTranslations("account");
  const format = useFormatter();
  const { user } = useAuth();
  const { currency, convert } = useCurrency();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/orders?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data.data) ? data.data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingSpinner />;

  const dateOf = (o: Order) => format.dateTime(new Date(o.createdAt), { dateStyle: "medium" });
  const numberOf = (o: Order) => t("orderNumber", { number: o.orderNumber.slice(-8) });
  const totalOf = (o: Order) => formatPrice(convert(Number(o.total)), currency);

  return (
    <div>
      <div className="mb-10">
        <h2 className={styles.pageTitle}>{t("ordersTitle")}</h2>
        <p className={styles.pageLede}>{t("ordersLede")}</p>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          title={t("noOrders")}
          subtitle={t("noOrdersSubtitle")}
          actionLabel={t("shopCta")}
          actionHref="/catalog"
          icon={<Package size={40} strokeWidth={1.25} />}
        />
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{t("colOrder")}</th>
                <th scope="col">{t("colPlaced")}</th>
                <th scope="col">{t("colPieces")}</th>
                <th scope="col">{t("colStatus")}</th>
                <th scope="col" className="text-right">
                  {t("colTotal")}
                </th>
                <th scope="col">
                  <span className="sr-only">{t("view")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="font-medium tabular-nums text-ink">{numberOf(order)}</td>
                  <td className="text-muted">{dateOf(order)}</td>
                  <td className="text-muted">{t("pieces", { count: order.items.length })}</td>
                  <td>
                    <OrderStatusPill status={order.status} />
                  </td>
                  <td className="text-right tabular-nums text-ink">{totalOf(order)}</td>
                  <td className="w-24 text-right">
                    <Link href={`/account/orders/${order.id}`} className={styles.textLink}>
                      {t("view")}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ul className={styles.rowList}>
            {orders.map((order) => (
              <li key={order.id}>
                <Link href={`/account/orders/${order.id}`} className={styles.row}>
                  <span className="min-w-0">
                    <span className="block text-[0.9375rem] font-medium tabular-nums">{numberOf(order)}</span>
                    <span className="mt-1 block text-[0.8125rem] text-muted">
                      {dateOf(order)} · {t("pieces", { count: order.items.length })}
                    </span>
                    <span className="mt-3 block">
                      <OrderStatusPill status={order.status} />
                    </span>
                  </span>
                  <span className="text-[0.9375rem] tabular-nums">{totalOf(order)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
