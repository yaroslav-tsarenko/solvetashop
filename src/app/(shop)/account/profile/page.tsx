"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "@/lib/validators/profile";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import { accountClasses as styles } from "../account-classes";

export default function ProfilePage() {
  const t = useTranslations("account");
  const { user, refresh } = useAuth();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      fetch("/api/auth/me")
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            reset({ name: data.user.name || "", phone: data.user.phone || "" });
          }
        });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      await fetch("/api/auth/sync-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user?.id, email: user?.email, name: data.name }),
      });
      await refresh();
      toast.success(t("profileSaved"));
    } catch {
      toast.error(t("profileSaveFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
      <div>
        <h2 className={styles.pageTitle}>{t("profileTitle")}</h2>
        <p className={styles.pageLede}>{t("profileLede")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-lg flex-col gap-6" noValidate>
        <div>
          <label htmlFor="profile-email" className="field-label">
            {t("emailLabel")}
          </label>
          <input
            id="profile-email"
            value={user?.email || ""}
            readOnly
            aria-describedby="profile-email-hint"
            className="field cursor-not-allowed bg-surface text-muted"
          />
          <p id="profile-email-hint" className="mt-1.5 text-[0.8125rem] text-muted">
            {t("emailHint")}
          </p>
        </div>

        <div>
          <label htmlFor="profile-name" className="field-label">
            {t("nameLabel")}
          </label>
          <input
            id="profile-name"
            autoComplete="name"
            {...register("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "profile-name-error" : undefined}
            className={`field ${errors.name ? "!border-brick" : ""}`}
          />
          {errors.name && (
            <p id="profile-name-error" className="mt-1.5 text-[0.8125rem] text-brick">
              {t("nameRequired")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="profile-phone" className="field-label">
            {t("phoneLabel")} <span className="font-normal text-faint">· {t("optional")}</span>
          </label>
          <input id="profile-phone" type="tel" autoComplete="tel" {...register("phone")} className="field" />
        </div>

        <div className="border-t border-line pt-6">
          <button type="submit" className="btn-ink" disabled={loading} aria-busy={loading}>
            {loading ? t("saving") : t("saveDetails")}
          </button>
        </div>
      </form>
    </div>
  );
}
