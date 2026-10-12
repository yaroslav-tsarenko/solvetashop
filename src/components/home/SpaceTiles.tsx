import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export interface SpaceTile {
  key: "spaceLiving" | "spaceDining" | "spaceBedroom" | "spaceOutdoor";
  href: string;
  imageUrl: string | null;
}

/** "Find it by space": four tall image tiles keyed to rooms rather than to raw categories. */
export async function SpaceTiles({ tiles }: { tiles: SpaceTile[] }) {
  const t = await getTranslations("home");
  if (tiles.length === 0) return null;

  return (
    <section className="wrap py-20 md:py-28">
      <header className="mb-10 grid gap-4 md:mb-14 md:grid-cols-2 md:items-end">
        <h2 className="heading m-0">{t("spacesTitle")}</h2>
        <p className="lede m-0 md:justify-self-end md:text-right">{t("spacesText")}</p>
      </header>
      <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 sm:gap-6 lg:grid-cols-4">
        {tiles.map((tile) => (
          <li key={tile.key}>
            <Link href={tile.href} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-md)] bg-plate">
                {tile.imageUrl ? (
                  <Image
                    src={tile.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-[12%] mix-blend-multiply transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                ) : null}
              </div>
              <p className="mt-4 flex items-center justify-between text-[0.9375rem] text-ink">
                {t(tile.key)}
                <ArrowUpRight size={16} strokeWidth={1.5} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
