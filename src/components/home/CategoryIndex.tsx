import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export interface IndexEntry {
  id: string;
  name: string;
  slug: string;
  count: number;
}

/** Text-only index of every category, two columns, hairline rules. */
export async function CategoryIndex({ entries }: { entries: IndexEntry[] }) {
  const t = await getTranslations("home");
  if (entries.length === 0) return null;

  return (
    <section className="border-t border-line">
      <div className="wrap grid gap-10 py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16 md:py-28">
        <div className="flex flex-col gap-3 md:sticky md:top-[calc(var(--header-height)+2rem)] md:self-start">
          <h2 className="heading m-0">{t("indexTitle")}</h2>
          <p className="lede m-0">{t("indexText")}</p>
        </div>
        <ol className="m-0 grid list-none gap-x-10 p-0 sm:grid-cols-2">
          {entries.map((entry, i) => (
            <li key={entry.id}>
              <Link
                href={`/catalog/${entry.slug}`}
                className="group flex items-baseline gap-4 border-b border-line py-4 text-ink"
              >
                <span className="w-6 shrink-0 text-[0.6875rem] text-faint tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[1.0625rem] font-light tracking-[-0.01em] transition-colors group-hover:text-sage-hover">
                  {entry.name}
                </span>
                <span className="text-[0.6875rem] text-faint">{t("pieces", { count: entry.count })}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
