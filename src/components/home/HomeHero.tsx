import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

interface HomeHeroProps {
  imageUrl: string | null;
  imageAlt: string;
  href: string;
}

/**
 * Full-bleed, static opening: a single image on the stone surface, one light
 * headline and one black pill. No slides, no arrows, no dots.
 */
export async function HomeHero({ imageUrl, imageAlt, href }: HomeHeroProps) {
  const t = await getTranslations("home");

  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="wrap grid min-h-[min(82vh,860px)] items-stretch md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="relative z-10 flex flex-col justify-end gap-7 pb-14 pt-24 md:pb-24 md:pr-10">
          <span className="eyebrow">{t("heroEyebrow")}</span>
          <h1 className="display m-0 max-w-[11ch]">{t("heroTitle")}</h1>
          <p className="lede m-0">{t("heroText")}</p>
          <div>
            <Link href={href} className="btn-ink btn-lg">
              {t("heroCta")}
            </Link>
          </div>
        </div>
        <div className="relative -mx-[var(--gutter)] min-h-[46vh] bg-plate md:mx-0 md:-mr-[var(--gutter)] md:min-h-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-contain p-[8%] mix-blend-multiply"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
