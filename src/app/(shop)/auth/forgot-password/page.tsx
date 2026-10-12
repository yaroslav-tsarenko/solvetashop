"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import { AuthFrame } from "../AuthFrame";
import { authClasses as styles } from "../auth-classes";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t("genericError"));
      }
      setSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("genericError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFrame
      eyebrow={t("forgotEyebrow")}
      title={t("forgotTitle")}
      lede={sent ? undefined : t("forgotLede")}
      footer={
        <Link href="/auth/login" className={styles.textLink}>
          {t("backToSignIn")}
        </Link>
      }
    >
      {sent ? (
        <div className={styles.notice} role="status">
          <p className={styles.noticeTitle}>{t("sentTitle")}</p>
          <p>{t("resetEmailSent")}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.group}>
            <label htmlFor="forgot-email" className="field-label">
              {t("email")}
            </label>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              className="field"
            />
          </div>

          <button type="submit" className={styles.submit} disabled={loading} aria-busy={loading}>
            {loading ? t("pleaseWait") : t("sendLinkCta")}
          </button>
        </form>
      )}
    </AuthFrame>
  );
}
