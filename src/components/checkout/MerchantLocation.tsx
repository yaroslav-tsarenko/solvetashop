import { COMPANY, COMPANY_ADDRESS } from "@/lib/company";

interface MerchantLocationProps {
  title: string;
  description: string;
}

export function MerchantLocation({ title, description }: MerchantLocationProps) {
  return (
    <section aria-label={title} className="border-t border-line pt-5">
      <h3 className="eyebrow mb-3">{title}</h3>
      <address className="text-[0.8125rem] not-italic leading-[1.7] text-muted">
        <span className="block font-medium text-ink">{COMPANY.legalName}</span>
        <span className="block">
          {COMPANY.tradingName} — company number {COMPANY.companyNumber}
        </span>
        <span className="block">{COMPANY_ADDRESS}</span>
        <span className="block">
          <a href={COMPANY.phoneHref} className="transition-colors hover:text-sage">
            {COMPANY.phone}
          </a>
          {" · "}
          <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-sage">
            {COMPANY.email}
          </a>
        </span>
      </address>
      <p className="mt-3 text-xs leading-[1.6] text-faint">{description}</p>
    </section>
  );
}
