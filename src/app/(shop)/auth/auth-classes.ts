/**
 * Small shared class strings for the sign-in, registration and password pages.
 * Layout lives in AuthFrame; these cover the repeating form bits.
 */
export const authClasses = {
  form: "flex flex-col gap-6",

  group: "flex flex-col",

  /** Two fields side by side from the small breakpoint up. */
  pair: "grid grid-cols-1 gap-6 sm:grid-cols-2",

  fieldError: "!border-brick focus:!shadow-none",

  hint: "mt-1.5 text-[0.8125rem] leading-snug text-muted",

  error: "mt-1.5 text-[0.8125rem] leading-snug text-brick",

  /** Underlined inline text link. */
  textLink:
    "font-medium text-ink underline decoration-1 underline-offset-[0.3em] transition-colors hover:text-sage-hover",

  submit: "btn-ink btn-lg w-full",

  /** Confirmation note shown after an email is sent or a password is saved. */
  notice: "border-y border-line py-6 text-[0.9375rem] leading-relaxed text-muted",

  noticeTitle: "mb-2 text-lg font-normal text-ink",
} as const;
