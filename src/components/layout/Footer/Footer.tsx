"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { Wordmark } from "../Wordmark/Wordmark";
import { PreferenceFields } from "../Header/Preferences";
import { COMPANY, COMPANY_ADDRESS } from "@/lib/company";
import visaLogo from "@/assets/visa-logo.svg";
import mastercardLogo from "@/assets/mastercard-logo.svg";
import pciDssLogo from "@/assets/pci-dss-compliant-logo-vector.svg";

const colLink = "text-[0.875rem] text-muted transition-colors hover:text-ink";

function NewsletterInline() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="grid gap-6 border-b border-line py-12 md:grid-cols-[1fr_minmax(0,26rem)] md:items-end md:py-16">
      <div>
        <p className="m-0 max-w-md text-xl font-light leading-snug tracking-[-0.02em] text-ink sm:text-2xl">
          {t("newsletterTitle")}
        </p>
        <p className="mt-2 text-[0.8125rem] text-muted">{t("newsletterText")}</p>
      </div>
      {done ? (
        <p className="m-0 text-[0.875rem] text-sage" role="status">{t("newsletterThanks")}</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setDone(true);
          }}
          className="flex items-center gap-3 border-b border-ink pb-2"
        >
          <label htmlFor="footer-email" className="sr-only">{t("newsletterPlaceholder")}</label>
          <input
            id="footer-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("newsletterPlaceholder")}
            className="min-w-0 flex-1 border-none bg-transparent py-2 text-[0.9375rem] text-ink outline-none placeholder:text-faint"
          />
          <button type="submit" className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink hover:text-sage-hover">
            {t("newsletterCta")}
            <ArrowRight size={15} strokeWidth={1.5} />
          </button>
        </form>
      )}
    </div>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const columns: { title: string; links: { href: string; label: string }[] }[] = [
    {
      title: t("shop"),
      links: [
        { href: "/catalog", label: t("shop") },
        { href: "/catalog?sort=newest", label: t("recent") },
        { href: "/catalog?onSale=true", label: t("reduced") },
        { href: "/catalog?sort=popular", label: t("loved") },
        { href: "/account/orders", label: t("orders") },
      ],
    },
    {
      title: t("help"),
      links: [
        { href: "/policies/shipping", label: t("shipping") },
        { href: "/policies/returns", label: t("returns") },
        { href: "/policies/warranty", label: t("warranty") },
        { href: "/policies/payment", label: t("payment") },
        { href: "/faq", label: t("faq") },
      ],
    },
    {
      title: t("company"),
      links: [
        { href: "/about", label: t("about") },
        { href: "/contact", label: t("contact") },
        { href: "/policies/terms", label: t("terms") },
        { href: "/policies/privacy", label: t("privacy") },
        { href: "/policies/cookies", label: t("cookies") },
      ],
    },
  ];

  const socials = [
    { href: process.env.NEXT_PUBLIC_INSTAGRAM_URL, label: "Instagram" },
    { href: process.env.NEXT_PUBLIC_LINKEDIN_URL, label: "LinkedIn" },
  ].filter((s): s is { href: string; label: string } => !!s.href);

  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="wrap">
        <NewsletterInline />

        <div className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)] lg:gap-20">
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="solveta·shop" className="w-fit">
              <Wordmark size={44} />
            </Link>
            <p className="m-0 max-w-xs text-[0.9375rem] leading-relaxed text-muted">{t("slogan")}</p>
            <address className="text-[0.75rem] not-italic leading-relaxed text-faint">
              <span className="text-muted">{COMPANY.legalName}</span>
              <br />
              {t("companyNumber", { number: COMPANY.companyNumber })}
              <br />
              {COMPANY_ADDRESS}
              <br />
              <a href={COMPANY.phone2Href} className="transition-colors hover:text-ink">{COMPANY.phone2}</a>
            </address>
            {socials.length > 0 ? (
              <p className="m-0 flex gap-4 text-[0.8125rem]">
                <span className="text-faint">{t("followUs")}</span>
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-sage">
                    {s.label}
                  </a>
                ))}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-5">{col.title}</p>
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={colLink}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-line py-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="m-0 text-xs text-faint">
            {t("copyright", { year, storeName: "solveta·shop" })} · {COMPANY.legalName}
          </p>
          <div className="w-full max-w-md">
            <PreferenceFields compact />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[0.6875rem] text-faint">{t("weAccept")}</span>
            {[
              { src: visaLogo, alt: "Visa" },
              { src: mastercardLogo, alt: "Mastercard" },
              { src: pciDssLogo, alt: "PCI DSS" },
            ].map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={100}
                className="!h-auto !w-[44px] object-contain opacity-80"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
