"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import { AuthFrame, PasswordField } from "../AuthFrame";
import { authClasses as styles } from "../auth-classes";

export default function ResetPasswordPage() {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(t("passwordsMismatch"));
      return;
    }
    if (password.length < 6) {
      toast.error(t("passwordTooShort"));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("genericError"));
      setSuccess(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("genericError"));
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <AuthFrame eyebrow={t("forgotEyebrow")} title={t("invalidResetLink")} lede={t("invalidResetLinkDesc")}>
        <Link href="/auth/forgot-password" className="btn-ink btn-lg">
          {t("requestNewLink")}
        </Link>
      </AuthFrame>
    );
  }

  return (
    <AuthFrame
      eyebrow={t("forgotEyebrow")}
      title={success ? t("resetSuccessTitle") : t("resetTitle")}
      lede={success ? undefined : t("resetLede")}
    >
      {success ? (
        <div className="flex flex-col items-start gap-8">
          <p className={styles.notice + " w-full"} role="status">
            {t("passwordResetSuccess")}
          </p>
          <Link href="/auth/login" className="btn-ink btn-lg">
            {t("signInCta")}
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <PasswordField
            id="reset-password"
            label={t("newPassword")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            hint={t("passwordRule")}
          />
          <PasswordField
            id="reset-password-confirm"
            label={t("confirmNewPassword")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />

          <button type="submit" className={`${styles.submit} mt-2`} disabled={loading} aria-busy={loading}>
            {loading ? t("pleaseWait") : t("savePasswordCta")}
          </button>
        </form>
      )}
    </AuthFrame>
  );
}
