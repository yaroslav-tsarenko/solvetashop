import type { ComponentPropsWithRef, ReactNode } from "react";

type TermsConsentProps = ComponentPropsWithRef<"input"> & {
  label: ReactNode;
  error?: string;
};

export function TermsConsent({ label, error, id, ...inputProps }: TermsConsentProps) {
  const inputId = id ?? "terms-consent";
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
          className="mt-[0.2rem] h-4 w-4 flex-shrink-0 cursor-pointer rounded-[2px] accent-[var(--color-ink)]"
        />
        <label
          htmlFor={inputId}
          className="cursor-pointer text-[0.8125rem] leading-[1.65] text-muted [&_a]:text-ink [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[0.25em] [&_a:hover]:text-sage"
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={errorId} className="pl-7 text-xs text-brick">
          {error}
        </p>
      )}
    </div>
  );
}
