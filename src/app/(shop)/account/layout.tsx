"use client";

import { useAuth } from "@/providers/AuthProvider";
import { AccountSidebar } from "@/components/account/AccountSidebar/AccountSidebar";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const t = useTranslations("account");

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/auth/login";
    }
  }, [loading, user]);

  if (loading) return <LoadingSpinner />;
  if (!user) return null;

  const firstName = user.name?.trim().split(/\s+/)[0];
  const greeting = firstName ? t("greeting", { name: firstName }) : t("greetingNoName");

  return (
    <div className="wrap pb-24 pt-10 md:pt-16">
      <header>
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="display mt-4 max-w-[18ch] !text-[clamp(2.25rem,4.5vw,3.75rem)]">{greeting}</h1>
        <AccountSidebar />
      </header>
      <div className="pt-10 md:pt-14">{children}</div>
    </div>
  );
}
