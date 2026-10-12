import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

/** Three plain numbered notes on fulfilment, with links to the governing policies. */
export async function DeliveryNotes() {
  const t = await getTranslations("home");
  const steps = [
    { n: "01", title: t("deliveryStep1Title"), text: t("deliveryStep1Text") },
    { n: "02", title: t("deliveryStep2Title"), text: t("deliveryStep2Text") },
    { n: "03", title: t("deliveryStep3Title"), text: t("deliveryStep3Text") },
  ];

  return (
    <section className="bg-surface">
      <div className="wrap py-20 md:py-24">
        <h2 className="heading m-0 max-w-lg">{t("deliveryTitle")}</h2>
        <ol className="m-0 mt-12 grid list-none gap-10 p-0 md:grid-cols-3 md:gap-12">
          {steps.map((s) => (
            <li key={s.n} className="flex flex-col gap-3 border-t border-line-strong pt-5">
              <span className="text-[0.75rem] text-sage tabular-nums">{s.n}</span>
              <h3 className="m-0 text-[1.125rem] font-normal text-ink">{s.title}</h3>
              <p className="m-0 text-[0.875rem] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12 flex flex-wrap gap-6 text-[0.8125rem]">
          <Link href="/policies/shipping" className="link-sage">{t("deliveryLink")}</Link>
          <Link href="/policies/returns" className="link-sage">{t("returnsLink")}</Link>
        </p>
      </div>
    </section>
  );
}
