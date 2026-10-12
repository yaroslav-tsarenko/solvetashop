"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import { COUNTRIES } from "@/lib/countries";
import { AuthFrame, PasswordField } from "../AuthFrame";
import { authClasses as styles } from "../auth-classes";

type StrengthKey = "weak" | "fair" | "good" | "strong";

function getPasswordStrength(password: string): { level: number; key: StrengthKey | null; bar: string } {
  if (password.length === 0) return { level: 0, key: null, bar: "" };
  if (password.length < 6) return { level: 25, key: "weak", bar: "bg-brick" };
  if (password.length < 10) return { level: 50, key: "fair", bar: "bg-muted" };
  if (password.length < 14) return { level: 75, key: "good", bar: "bg-sage" };
  return { level: 100, key: "strong", bar: "bg-success" };
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

type Field = keyof FormData;

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  country: "",
  postalCode: "",
  dateOfBirth: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};

/** Order in which fields appear, so we can focus the first one with a problem. */
const FIELD_ORDER: Field[] = [
  "firstName",
  "lastName",
  "dateOfBirth",
  "email",
  "phone",
  "street",
  "city",
  "postalCode",
  "country",
  "password",
  "confirmPassword",
  "termsAccepted",
];

const fieldId = (field: Field) => `register-${field}`;

export default function RegisterPage() {
  const t = useTranslations("auth");
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(form.password);
  const selectedCountry = COUNTRIES.find((c) => c.code === form.country);
  const phoneHint = selectedCountry ? selectedCountry.phone : "+44";

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const setTermsAccepted = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setForm((prev) => ({ ...prev, termsAccepted: checked }));
    setErrors((prev) => ({ ...prev, termsAccepted: undefined }));
  };

  function validate(): Partial<Record<Field, string>> {
    const errs: Partial<Record<Field, string>> = {};
    if (!form.firstName.trim()) errs.firstName = t("errFirstName");
    if (!form.lastName.trim()) errs.lastName = t("errLastName");
    if (!form.dateOfBirth) errs.dateOfBirth = t("errDob");
    else {
      const dob = new Date(form.dateOfBirth);
      const age = (Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
      if (age < 18) errs.dateOfBirth = t("errTooYoung");
    }
    if (!form.email.trim()) errs.email = t("errEmail");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t("errEmailInvalid");
    if (!form.phone.trim()) errs.phone = t("errPhone");
    if (!form.street.trim()) errs.street = t("errStreet");
    if (!form.city.trim()) errs.city = t("errCity");
    if (!form.country) errs.country = t("errCountry");
    if (!form.postalCode.trim()) errs.postalCode = t("errPostalCode");
    if (!form.password) errs.password = t("errPassword");
    else if (form.password.length < 6) errs.password = t("passwordTooShort");
    if (form.password !== form.confirmPassword) errs.confirmPassword = t("passwordsMismatch");
    if (!form.termsAccepted) errs.termsAccepted = t("termsRequired");
    return errs;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    const firstInvalid = FIELD_ORDER.find((f) => errs[f]);
    if (firstInvalid) {
      toast.error(t("fixErrors"));
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          street: form.street,
          city: form.city,
          country: form.country,
          postalCode: form.postalCode,
          dateOfBirth: form.dateOfBirth,
          password: form.password,
          termsAccepted: form.termsAccepted,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("registerFailed"));
      toast.success(t("registerSuccess"));
      window.location.href = "/account";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("registerFailed"));
    } finally {
      setLoading(false);
    }
  };

  /** Plain text/date/email/tel input bound to a form field. */
  const textInput = (
    field: Exclude<Field, "termsAccepted" | "country">,
    label: string,
    opts: { type?: string; autoComplete?: string; placeholder?: string; hint?: ReactNode } = {},
  ) => {
    const id = fieldId(field);
    const error = errors[field];
    return (
      <div className={styles.group}>
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        <input
          id={id}
          type={opts.type ?? "text"}
          value={form[field]}
          onChange={set(field)}
          autoComplete={opts.autoComplete}
          placeholder={opts.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : opts.hint ? `${id}-hint` : undefined}
          className={`field ${error ? styles.fieldError : ""}`}
        />
        {error ? (
          <p id={`${id}-error`} className={styles.error}>
            {error}
          </p>
        ) : opts.hint ? (
          <p id={`${id}-hint`} className={styles.hint}>
            {opts.hint}
          </p>
        ) : null}
      </div>
    );
  };

  const section = (index: string, legend: string, children: ReactNode) => (
    <fieldset className="border-t border-line pt-6">
      <legend className="float-left mb-6 flex w-full items-baseline gap-3">
        <span className="text-[0.75rem] font-medium tabular-nums text-faint">{index}</span>
        <span className="text-base font-normal text-ink">{legend}</span>
      </legend>
      <div className="clear-both flex flex-col gap-6">{children}</div>
    </fieldset>
  );

  return (
    <AuthFrame
      wide
      eyebrow={t("registerEyebrow")}
      title={t("registerTitle")}
      lede={t("registerLede")}
      footer={
        <p>
          {t("haveAccount")}{" "}
          <Link href="/auth/login" className={styles.textLink}>
            {t("signInLink")}
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
        <p className="text-[0.8125rem] text-muted">{t("allRequired")}</p>

        {section(
          "01",
          t("sectionAbout"),
          <>
            <div className={styles.pair}>
              {textInput("firstName", t("firstName"), { autoComplete: "given-name" })}
              {textInput("lastName", t("lastName"), { autoComplete: "family-name" })}
            </div>
            {textInput("dateOfBirth", t("dateOfBirth"), {
              type: "date",
              autoComplete: "bday",
              hint: t("dobHint"),
            })}
          </>,
        )}

        {section(
          "02",
          t("sectionContact"),
          <>
            {textInput("email", t("email"), {
              type: "email",
              autoComplete: "email",
              placeholder: t("emailPlaceholder"),
            })}
            {textInput("phone", t("phone"), {
              type: "tel",
              autoComplete: "tel",
              placeholder: `${phoneHint} …`,
              hint: form.country ? undefined : t("phoneHintNoCountry"),
            })}
          </>,
        )}

        {section(
          "03",
          t("sectionAddress"),
          <>
            {textInput("street", t("street"), { autoComplete: "street-address" })}
            <div className={styles.pair}>
              {textInput("city", t("city"), { autoComplete: "address-level2" })}
              {textInput("postalCode", t("postalCode"), { autoComplete: "postal-code" })}
            </div>
            <div className={styles.group}>
              <label htmlFor={fieldId("country")} className="field-label">
                {t("country")}
              </label>
              <select
                id={fieldId("country")}
                value={form.country}
                onChange={set("country")}
                autoComplete="country"
                aria-invalid={errors.country ? true : undefined}
                aria-describedby={errors.country ? `${fieldId("country")}-error` : undefined}
                className={`field cursor-pointer ${form.country ? "" : "text-faint"} ${errors.country ? styles.fieldError : ""}`}
              >
                <option value="">{t("countryPlaceholder")}</option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p id={`${fieldId("country")}-error`} className={styles.error}>
                  {errors.country}
                </p>
              )}
            </div>
          </>,
        )}

        {section(
          "04",
          t("sectionPassword"),
          <>
            <div>
              <PasswordField
                id={fieldId("password")}
                label={t("password")}
                value={form.password}
                onChange={set("password")}
                autoComplete="new-password"
                error={errors.password}
                hint={t("passwordRule")}
                required={false}
              />
              {strength.key && (
                <div className="mt-3 flex items-center gap-3" aria-live="polite">
                  <div className="h-px flex-1 bg-line">
                    <div
                      className={`h-[2px] -translate-y-[0.5px] transition-[width] duration-300 ${strength.bar}`}
                      style={{ width: `${strength.level}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted">
                    {t("strengthLabel", { level: t(`strength.${strength.key}`) })}
                  </span>
                </div>
              )}
            </div>
            <PasswordField
              id={fieldId("confirmPassword")}
              label={t("confirmPassword")}
              value={form.confirmPassword}
              onChange={set("confirmPassword")}
              autoComplete="new-password"
              error={errors.confirmPassword}
              required={false}
            />

            <div className={styles.group}>
              <label className="flex cursor-pointer items-start gap-3 text-[0.875rem] leading-relaxed text-muted">
                <input
                  id={fieldId("termsAccepted")}
                  type="checkbox"
                  checked={form.termsAccepted}
                  onChange={setTermsAccepted}
                  aria-invalid={errors.termsAccepted ? true : undefined}
                  aria-describedby={errors.termsAccepted ? `${fieldId("termsAccepted")}-error` : undefined}
                  className="mt-[0.2rem] h-4 w-4 flex-shrink-0 cursor-pointer accent-[var(--color-ink)]"
                />
                <span>
                  {t.rich("termsConsent", {
                    terms: (chunks) => (
                      <Link href="/policies/terms" target="_blank" className={styles.textLink}>
                        {chunks}
                      </Link>
                    ),
                    privacy: (chunks) => (
                      <Link href="/policies/privacy" target="_blank" className={styles.textLink}>
                        {chunks}
                      </Link>
                    ),
                  })}
                </span>
              </label>
              {errors.termsAccepted && (
                <p id={`${fieldId("termsAccepted")}-error`} className={styles.error}>
                  {errors.termsAccepted}
                </p>
              )}
            </div>
          </>,
        )}

        <button type="submit" className={styles.submit} disabled={loading} aria-busy={loading}>
          {loading ? t("pleaseWait") : t("createAccountCta")}
        </button>
      </form>
    </AuthFrame>
  );
}
