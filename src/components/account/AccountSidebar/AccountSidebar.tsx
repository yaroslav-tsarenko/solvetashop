"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useAuth } from "@/providers/AuthProvider";

const navItems = [
  { href: "/account", labelKey: "tabs.overview" },
  { href: "/account/orders", labelKey: "tabs.orders" },
  { href: "/account/wishlist", labelKey: "tabs.wishlist" },
  { href: "/account/addresses", labelKey: "tabs.addresses" },
  { href: "/account/profile", labelKey: "tabs.profile" },
] as const;

/**
 * Account navigation: a single row of text tabs under the greeting, with the
 * active tab marked by an ink underline sitting on the hairline. Scrolls
 * sideways on narrow screens. (Kept under the old component name so imports
 * don't change.)
 */
export function AccountSidebar() {
  const pathname = usePathname();
  const t = useTranslations("account");
  const { user, signOut } = useAuth();

  return (
    <div className="mt-10 flex items-end justify-between gap-6 border-b border-line">
      <nav
        aria-label={t("navLabel")}
        className="-mb-px flex gap-7 overflow-x-auto [scrollbar-width:none] md:gap-9 [&::-webkit-scrollbar]:hidden"
      >
        {navItems.map((item) => {
          const isActive =
            item.href === "/account"
              ? pathname === "/account" || pathname === "/account/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "whitespace-nowrap border-b pb-3.5 text-[0.9375rem] no-underline transition-colors",
                isActive
                  ? "border-ink text-ink"
                  : "border-transparent text-muted hover:text-ink",
              ].join(" ")}
            >
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>
      <div className="hidden flex-shrink-0 items-center gap-4 pb-3.5 md:flex">
        {user?.email && <span className="max-w-[16rem] truncate text-[0.8125rem] text-faint">{user.email}</span>}
        <button
          type="button"
          onClick={signOut}
          className="cursor-pointer text-[0.8125rem] font-medium text-ink underline decoration-1 underline-offset-[0.3em] transition-colors hover:text-sage-hover"
        >
          {t("signOut")}
        </button>
      </div>
      <button
        type="button"
        onClick={signOut}
        className="flex-shrink-0 cursor-pointer pb-3.5 text-[0.8125rem] font-medium text-muted underline decoration-1 underline-offset-[0.3em] md:hidden"
      >
        {t("signOut")}
      </button>
    </div>
  );
}
