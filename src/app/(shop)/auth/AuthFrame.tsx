"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";
import { Wordmark } from "@/components/layout/Wordmark/Wordmark";
import { authClasses as styles } from "./auth-classes";

interface AuthFrameProps {
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
  footer?: ReactNode;
  /** Wider form column (registration). */
  wide?: boolean;
}

/**
 * Split layout for every auth page: a quiet surface panel with the wordmark on
 * the left (desktop only) and a narrow form column on the right.
 */
export function AuthFrame({ eyebrow, title, lede, children, footer, wide = false }: AuthFrameProps) {
  const t = useTranslations("auth");

  return (
    <div className="wrap py-10 md:py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-0">
        <aside className="hidden min-h-[560px] flex-col justify-between rounded-[var(--radius-lg)] bg-surface p-10 md:sticky md:top-24 md:flex md:self-start lg:p-14">
          <Wordmark size={26} />
          <p className="max-w-[18rem] text-[1.625rem] font-light leading-[1.25] tracking-[-0.02em] text-ink">
            {t("panelLine")}
          </p>
        </aside>

        <section className="flex justify-center md:px-10 md:py-6 lg:px-16">
          <div className={`w-full ${wide ? "max-w-[34rem]" : "max-w-[25rem]"}`}>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-3 text-[2rem] font-light leading-[1.08] tracking-[-0.03em] text-ink md:text-[2.5rem]">
              {title}
            </h1>
            {lede && <p className="lede mt-3">{lede}</p>}

            <div className="mt-10">{children}</div>

            {footer && (
              <div className="mt-10 border-t border-line pt-6 text-sm text-muted">{footer}</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete: "current-password" | "new-password";
  placeholder?: string;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
}

/** .field password input with an inline show/hide text toggle. */
export function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  placeholder,
  error,
  hint,
  required = true,
}: PasswordFieldProps) {
  const t = useTranslations("auth");
  const [visible, setVisible] = useState(false);
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={styles.group}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`field pr-12 ${error ? styles.fieldError : ""}`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? t("hidePassword") : t("showPassword")}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center text-muted transition-colors hover:text-ink"
        >
          {visible ? <EyeOff size={17} strokeWidth={1.5} /> : <Eye size={17} strokeWidth={1.5} />}
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      ) : hint ? (
        <div id={`${id}-hint`} className={styles.hint}>
          {hint}
        </div>
      ) : null}
    </div>
  );
}
