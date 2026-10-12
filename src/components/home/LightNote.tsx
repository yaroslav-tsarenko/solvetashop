import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

/** Editorial split: one still-life image beside a short note on using light well. */
export async function LightNote({ imageUrl, href }: { imageUrl: string | null; href: string }) {
  const t = await getTranslations("home");

  return (
    <section className="wrap grid items-center gap-10 py-20 md:grid-cols-12 md:gap-16 md:py-28">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] bg-plate md:col-span-6 lg:col-span-5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-contain p-[14%] mix-blend-multiply"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-6 md:col-span-6 lg:col-span-5 lg:col-start-8">
        <span className="eyebrow">{t("editorialEyebrow")}</span>
        <h2 className="m-0 text-[clamp(1.75rem,3.4vw,3rem)] font-light leading-[1.08] tracking-[-0.03em] text-ink">
          {t("editorialTitle")}
        </h2>
        <p className="m-0 text-[1rem] leading-[1.8] text-muted">{t("editorialText")}</p>
        <div>
          <Link href={href} className="btn-line">
            {t("editorialCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
