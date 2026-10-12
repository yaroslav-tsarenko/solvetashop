import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ProductGallery } from "@/components/product/ProductGallery/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs/ProductTabs";
import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs/Breadcrumbs";
import { JsonLd } from "@/components/shared/SEO/JsonLd";
import { productClasses as styles } from "./product-classes";

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getCategoryChain(categoryId: string): Promise<{ name: string; slug: string }[]> {
  const chain: { name: string; slug: string }[] = [];
  let currentId: string | null = categoryId;

  while (currentId) {
    const cat: { name: string; slug: string; parentId: string | null } | null =
      await prisma.category.findUnique({
        where: { id: currentId },
        select: { name: true, slug: true, parentId: true },
      });
    if (!cat) break;
    chain.unshift({ name: cat.name, slug: cat.slug });
    currentId = cat.parentId;
  }

  return chain;
}

/** A few other active pieces from the same category (and its sub-categories). */
async function getRelatedProducts(categoryId: string, excludeId: string) {
  const children = await prisma.category.findMany({
    where: { parentId: categoryId, isActive: true },
    select: { id: true },
  });
  const ids = [categoryId, ...children.map((c) => c.id)];

  const rows = await prisma.product.findMany({
    where: {
      id: { not: excludeId },
      status: "ACTIVE",
      categories: { some: { categoryId: { in: ids } } },
    },
    include: {
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
      categories: { include: { category: { select: { name: true } } } },
    },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return rows.map((p) => ({
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
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, metaTitle: true, metaDescription: true, shortDescription: true },
  });

  if (!product) return {};

  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.shortDescription || product.name,
    openGraph: {
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.shortDescription || undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      categories: { include: { category: true } },
      variants: true,
      reviews: {
        where: { isApproved: true },
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product || product.status === "ARCHIVED") notFound();

  const primaryCategory = product.categories[0]?.category;
  const [categoryChain, related, nav, t] = await Promise.all([
    primaryCategory ? getCategoryChain(primaryCategory.id) : Promise.resolve([]),
    primaryCategory
      ? getRelatedProducts(primaryCategory.id, product.id).catch(() => [])
      : Promise.resolve([]),
    getTranslations("nav"),
    getTranslations("product"),
  ]);

  const reviewCount = product.reviews.length;
  const avgRating = reviewCount > 0
    ? product.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviewCount
    : 0;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const characteristics = product.characteristics as Record<string, Record<string, string>> | null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.shortDescription || product.name,
    sku: product.sku,
    gtin13: product.ean || product.gtin || undefined,
    image: product.images[0]?.url,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    offers: {
      "@type": "Offer",
      price: Number(product.price),
      priceCurrency: "GBP",
      availability: product.quantity > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${siteUrl}/product/${product.slug}`,
    },
    ...(reviewCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating.toFixed(1),
        reviewCount,
      },
    }),
  };

  const breadcrumbItems = [
    { label: nav("home"), href: "/" },
    { label: nav("catalog"), href: "/catalog" },
    ...categoryChain.map((cat) => ({
      label: cat.name,
      href: `/catalog/${cat.slug}`,
    })),
    { label: product.name },
  ];

  return (
    <div className={styles.wrapper}>
      <JsonLd data={jsonLd} />

      <Breadcrumbs items={breadcrumbItems} />

      <div className={styles.layout}>
        <div className={styles.galleryCol}>
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        <div className={styles.infoCol}>
          <div className={styles.infoSticky}>
            <ProductInfo
              id={product.id}
              name={product.name}
              slug={product.slug}
              sku={product.sku}
              price={Number(product.price)}
              comparePrice={product.comparePrice ? Number(product.comparePrice) : null}
              quantity={product.quantity}
              shortDescription={product.shortDescription}
              description={product.description}
              brand={product.brand}
              condition={product.condition}
              lowStockAlert={product.lowStockAlert}
              imageUrl={product.images[0]?.url}
              ean={product.ean}
              reviewCount={reviewCount}
              avgRating={avgRating}
              categoryPath={categoryChain}
            />
          </div>
        </div>

        <div className={styles.detailsCol}>
          <ProductTabs
            description={product.description}
            characteristics={characteristics}
            reviews={product.reviews.map((r) => ({
              ...r,
              createdAt: r.createdAt.toISOString(),
            }))}
          />
        </div>
      </div>

      {related.length > 0 && primaryCategory && (
        <section className={styles.related} aria-labelledby="related-heading">
          <div className={styles.relatedHead}>
            <h2 id="related-heading" className={styles.relatedTitle}>
              {t("relatedTitle", { category: primaryCategory.name })}
            </h2>
            <Link href={`/catalog/${primaryCategory.slug}`} className="btn-quiet btn-sm">
              {t("relatedLink")}
            </Link>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
