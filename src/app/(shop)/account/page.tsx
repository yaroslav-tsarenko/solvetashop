"use client";

import { useEffect, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useCurrency } from "@/providers/CurrencyProvider";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { formatPrice } from "@/lib/utils/format-price";
import { accountClasses as styles } from "./account-classes";
import { OrderStatusPill } from "./OrderStatus";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
}

const shortcuts = [
  { href: "/account/wishlist", titleKey: "tabs.wishlist", blurbKey: "wishlistBlurb" },
  { href: "/account/addresses", titleKey: "tabs.addresses", blurbKey: "addressesBlurb" },
  { href: "/account/profile", titleKey: "tabs.profile", blurbKey: "detailsBlurb" },
] as const;

export default function AccountPage() {
  const t = useTranslations("account");
  const format = useFormatter();
  const { user, loading } = useAuth();
  const { currency, convert } = useCurrency();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/orders?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data.data) ? data.data : []))
      .catch(() => setOrders([]))
      .finally(() => setOrdersLoading(false));
  }, [user]);

  if (loading) return <LoadingSpinner />;

  const totalSpent = orders.reduce((sum, o) => sum + Number(o.total), 0);
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="flex flex-col gap-16">
      <section aria-labelledby="glance-title">
        <h2 id="glance-title" className="sr-only">
          {t("glanceTitle")}
        </h2>
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-line">
          <div className="sm:pr-8">
            <dt className={styles.term}>{t("ordersCount")}</dt>
            <dd className="mt-3 text-[2.25rem] font-light leading-none tracking-[-0.03em] text-ink">
              {ordersLoading ? "—" : orders.length}
            </dd>
          </div>
          <div className="sm:px-8">
            <dt className={styles.term}>{t("spentSoFar")}</dt>
            <dd className="mt-3 text-[2.25rem] font-light leading-none tracking-[-0.03em] text-ink">
              {ordersLoading ? "—" : formatPrice(convert(totalSpent), currency)}
            </dd>
          </div>
          <div className="min-w-0 sm:pl-8">
            <dt className={styles.term}>{t("signedInAs")}</dt>
            <dd className="mt-3 truncate text-base text-ink">{user?.email}</dd>
            {user?.name && <dd className="mt-1 truncate text-sm text-muted">{user.name}</dd>}
          </div>
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="latest-title">
        <div className={styles.sectionHead}>
          <h2 id="latest-title" className={styles.sectionTitle}>
            {t("latestTitle")}
          </h2>
          {recentOrders.length > 0 && (
            <Link href="/account/orders" className={styles.textLink}>
              {t("seeAllOrders")}
            </Link>
          )}
        </div>

        {ordersLoading ? (
          <p className="py-6 text-sm text-muted">{t("loadingOrders")}</p>
        ) : recentOrders.length === 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-4 py-2">
            <p className="text-[0.9375rem] text-muted">{t("noOrdersShort")}</p>
            <Link href="/catalog" className="btn-line btn-sm">
              {t("shopCta")}
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-line border-t border-line">
            {recentOrders.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/account/orders/${order.id}`}
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-5 text-ink no-underline sm:grid-cols-[1fr_auto_auto_auto]"
                >
                  <span className="min-w-0">
                    <span className="block text-[0.9375rem] font-medium tabular-nums">
                      {t("orderNumber", { number: order.orderNumber.slice(-8) })}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] text-muted">
                      {format.dateTime(new Date(order.createdAt), { dateStyle: "medium" })}
                    </span>
                  </span>
                  <span className="hidden sm:block">
                    <OrderStatusPill status={order.status} />
                  </span>
                  <span className="text-[0.9375rem] tabular-nums">
                    {formatPrice(convert(Number(order.total)), currency)}
                  </span>
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="hidden text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink sm:block"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.section} aria-labelledby="elsewhere-title">
        <h2 id="elsewhere-title" className={`${styles.sectionTitle} mb-6`}>
          {t("elsewhereTitle")}
        </h2>
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {shortcuts.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="group block text-ink no-underline">
                <span className="flex items-center gap-2 text-[0.9375rem] font-medium">
                  {t(s.titleKey)}
                  <ArrowRight
                    size={15}
                    strokeWidth={1.5}
                    className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-muted">{t(s.blurbKey)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
