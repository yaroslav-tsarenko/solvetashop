"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import { AuthFrame, PasswordField } from "../AuthFrame";
import { authClasses as styles } from "../auth-classes";

export default function LoginPage() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("loginFailed"));
      toast.success(t("loginSuccess"));
      if (data.user?.role === "ADMIN" || data.user?.role === "SUPER_ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/account";
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFrame
      eyebrow={t("loginEyebrow")}
      title={t("loginTitle")}
      lede={t("loginLede")}
      footer={
        <p>
          {t("newHere")}{" "}
          <Link href="/auth/register" className={styles.textLink}>
            {t("createAccountLink")}
          </Link>
        </p>
      }
    >
      <form onSubmit={handleEmailLogin} className={styles.form}>
        <div className={styles.group}>
          <label htmlFor="login-email" className="field-label">
            {t("email")}
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            className="field"
          />
        </div>

        <div>
          <PasswordField
            id="login-password"
            label={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder={t("passwordPlaceholder")}
          />
          <p className="mt-3 text-[0.8125rem]">
            <Link href="/auth/forgot-password" className={styles.textLink}>
              {t("forgotPassword")}
            </Link>
          </p>
        </div>

        <button type="submit" className={`${styles.submit} mt-2`} disabled={loading} aria-busy={loading}>
          {loading ? t("pleaseWait") : t("signInCta")}
        </button>
      </form>
    </AuthFrame>
  );
}
