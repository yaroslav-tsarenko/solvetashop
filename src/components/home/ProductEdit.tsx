import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid";
import type { HomepageProduct } from "@/lib/homepage-products";

interface ProductEditProps {
  titleKey: "selectedTitle" | "reducedTitle";
  textKey: "selectedText" | "reducedText";
  products: HomepageProduct[];
  href: string;
  tone?: "paper" | "surface";
}

/** A titled, airy product grid with a single text link to the full listing. */
export async function ProductEdit({ titleKey, textKey, products, href, tone = "paper" }: ProductEditProps) {
  const t = await getTranslations("home");
  if (products.length === 0) return null;

  return (
    <section className={tone === "surface" ? "bg-surface" : ""}>
      <div className="wrap py-20 md:py-28">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div className="flex max-w-xl flex-col gap-3">
            <h2 className="heading m-0">{t(titleKey)}</h2>
            <p className="lede m-0">{t(textKey)}</p>
          </div>
          <Link href={href} className="btn-quiet">
            {t("seeEverything")}
          </Link>
        </header>
        <ProductGrid
          products={products.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            sku: (p as { sku?: string }).sku ?? "",
            price: p.price,
            comparePrice: p.comparePrice ?? null,
            quantity: p.quantity ?? 0,
            images: p.images,
            categories: p.categories,
          }))}
        />
      </div>
    </section>
  );
}
