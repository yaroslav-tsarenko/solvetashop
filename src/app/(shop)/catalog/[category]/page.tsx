import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs/Breadcrumbs";
import { EmptyState } from "@/components/shared/EmptyState/EmptyState";
import { Link } from "@/i18n/routing";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { catalogClasses as styles } from "../catalog-classes";

export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    select: { name: true, description: true },
  });
  if (!category) return {};
  return {
    title: category.name,
    description: category.description || undefined,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      children: {
        select: { id: true, slug: true, name: true, isActive: true, sortOrder: true },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      },
      parent: { select: { name: true, slug: true } },
    },
  });

  if (!category) notFound();

  const categoryIds = [category.id, ...category.children.map((c) => c.id)];

  const productCategories = await prisma.productCategory.findMany({
    where: { categoryId: { in: categoryIds } },
    include: {
      product: {
        include: {
          images: { orderBy: { sortOrder: "asc" }, take: 1 },
          categories: { include: { category: { select: { name: true } } } },
        },
      },
    },
  });

  const seen = new Set<string>();
  const products = productCategories
    .map((pc) => pc.product)
    .filter((p) => {
      if (p.status !== "ACTIVE" || seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    })
    .map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      price: Number(p.price),
      comparePrice: p.comparePrice != null ? Number(p.comparePrice) : null,
      quantity: p.quantity,
      images: p.images.map((img) => ({ url: img.url, alt: img.alt })),
      categories: p.categories.map((c) => ({ category: { name: c.category.name } })),
    }));

  const [t, nav] = await Promise.all([getTranslations("listing"), getTranslations("nav")]);
  const subcategories = category.children.filter((c) => c.isActive);

  return (
    <div className={`${styles.wrapper} [overflow-wrap:anywhere]`}>
      <Breadcrumbs
        items={[
          { label: nav("home"), href: "/" },
          { label: nav("catalog"), href: "/catalog" },
          ...(category.parent
            ? [{ label: category.parent.name, href: `/catalog/${category.parent.slug}` }]
            : []),
          { label: category.name },
        ]}
      />

      <header className={styles.intro}>
        <h1 className={styles.title}>{category.name}</h1>
        {category.description && <p className={styles.lede}>{category.description}</p>}
        {subcategories.length > 0 && (
          <nav className={styles.subLinks} aria-label={t("subcategoriesLabel")}>
            {subcategories.map((sub) => (
              <Link key={sub.id} href={`/catalog/${sub.slug}`} className={styles.subLink}>
                {sub.name}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <div className={styles.bar}>
        <span className={styles.resultCount}>{t("resultCount", { count: products.length })}</span>
        <Link href={`/catalog?category=${encodeURIComponent(category.slug)}`} className="text-sm text-ink underline-offset-4 hover:underline">
          {t("refineLink")}
        </Link>
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <EmptyState
          title={t("categoryEmptyTitle")}
          subtitle={t("categoryEmptyText")}
          actionLabel={nav("catalog")}
          actionHref="/catalog"
        />
      )}
    </div>
  );
}
