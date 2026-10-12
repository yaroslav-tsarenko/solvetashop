import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { JsonLd } from "@/components/shared/SEO/JsonLd";
import { HomeHero } from "@/components/home/HomeHero";
import { SpaceTiles, type SpaceTile } from "@/components/home/SpaceTiles";
import { ProductEdit } from "@/components/home/ProductEdit";
import { LightNote } from "@/components/home/LightNote";
import { CategoryIndex, type IndexEntry } from "@/components/home/CategoryIndex";
import { DeliveryNotes } from "@/components/home/DeliveryNotes";
import {
  getFeaturedProducts,
  getNewProducts,
  getSaleProducts,
  pickForShelf,
  type HomepageProduct,
} from "@/lib/homepage-products";

export const dynamic = "force-dynamic";

/**
 * Rooms on the home page map onto real category slugs. The first slug that has
 * products wins the link; the tile image is drawn from any of them. A tile with
 * no matching products is simply left out.
 */
const SPACES: { key: SpaceTile["key"]; slugs: string[] }[] = [
  { key: "spaceLiving", slugs: ["floor-lamps", "home-decor-accents"] },
  { key: "spaceDining", slugs: ["ceiling-lights", "spotlights-downlights"] },
  { key: "spaceBedroom", slugs: ["table-desk-lamps", "wall-lights"] },
  { key: "spaceOutdoor", slugs: ["solar-lights", "outdoor-garden"] },
];

const CURATED_SLUGS = [
  "ceiling-lights",
  "table-desk-lamps",
  "floor-lamps",
  "wall-lights",
  "home-decor-accents",
];

type CategoryNode = {
  id: string;
  name: string;
  slug: string;
  children: { slug: string }[];
};

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.warn("Home query fallback:", (err as Error)?.message || String(err));
    return fallback;
  }
}

async function getHomeData() {
  const [heroBanner, products, categories] = await Promise.all([
    safe(
      () =>
        prisma.banner.findFirst({
          where: { isActive: true, type: "HERO", imageUrl: { not: null } },
          orderBy: { sortOrder: "asc" },
          select: { imageUrl: true, title: true, linkUrl: true },
        }),
      null,
    ),
    safe(
      () =>
        prisma.product.findMany({
          where: { status: "ACTIVE", images: { some: {} } },
          include: {
            images: { orderBy: { sortOrder: "asc" }, take: 1 },
            categories: { include: { category: { select: { name: true, slug: true } } } },
          },
          orderBy: { createdAt: "desc" },
          take: 400,
        }),
      [],
    ),
    safe(
      () =>
        prisma.category.findMany({
          where: { isActive: true, parentId: null },
          orderBy: { sortOrder: "asc" },
          select: {
            id: true,
            name: true,
            slug: true,
            children: { where: { isActive: true }, select: { slug: true } },
          },
        }),
      [] as CategoryNode[],
    ),
  ]);

  // Prisma Decimals and Dates → plain JSON for client components.
  const all = JSON.parse(JSON.stringify(products)) as (HomepageProduct & { sku: string })[];

  const inSlugs = (p: HomepageProduct, slugs: string[]) =>
    !!p.categories?.some((c) => slugs.includes(c.category.slug));

  const expand = (slug: string) => {
    const cat = categories.find((c) => c.slug === slug);
    return cat ? [cat.slug, ...cat.children.map((ch) => ch.slug)] : [slug];
  };

  const spaces: SpaceTile[] = [];
  for (const space of SPACES) {
    const linkSlug = space.slugs.find((s) => all.some((p) => inSlugs(p, expand(s))));
    if (!linkSlug) continue;
    const pool = all.filter((p) => inSlugs(p, expand(linkSlug)));
    const pick = pickForShelf(pool, 1, `space:${space.key}`)[0];
    spaces.push({ key: space.key, href: `/catalog/${linkSlug}`, imageUrl: pick?.images[0]?.url ?? null });
  }

  // Counts come from the database rather than the 400-item sample above.
  const counts = await safe(
    () =>
      prisma.category.findMany({
        where: { isActive: true },
        select: { slug: true, parentId: true, id: true, _count: { select: { products: true } } },
      }),
    [] as { slug: string; parentId: string | null; id: string; _count: { products: number } }[],
  );
  const indexEntries: IndexEntry[] = categories
    .map((c) => {
      const top = counts.find((x) => x.slug === c.slug);
      const childTotal = counts
        .filter((x) => top && x.parentId === top.id)
        .reduce((sum, x) => sum + x._count.products, 0);
      return { id: c.id, name: c.name, slug: c.slug, count: (top?._count.products ?? 0) + childTotal };
    })
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  // The curated grid leans on the home-and-living side of the range and takes
  // a couple of pieces from each of those categories so no single one dominates.
  const featured = getFeaturedProducts(all, 8);
  const seen = new Set<string>();
  const curated: typeof all = [];
  for (const slug of CURATED_SLUGS) {
    const pool = all.filter((p) => !seen.has(p.id) && inSlugs(p, expand(slug)));
    for (const p of pickForShelf(pool, 2, `selected:${slug}`)) {
      seen.add(p.id);
      curated.push(p);
    }
  }
  const selected =
    featured.length >= 4 ? featured : curated.length >= 4 ? curated.slice(0, 8) : getNewProducts(all, 8);
  const reduced = getSaleProducts(all, 4);

  const heroPool = all.filter((p) => inSlugs(p, expand("table-desk-lamps")));
  const heroProduct = pickForShelf(heroPool.length ? heroPool : all, 1, "hero")[0];
  const notePool = all.filter((p) => inSlugs(p, expand("bulbs-tubes")));
  const noteProduct = pickForShelf(notePool.length ? notePool : all, 1, "light-note")[0];
  const bulbsSlug = categories.some((c) => c.slug === "bulbs-tubes") ? "/catalog/bulbs-tubes" : "/catalog";

  return {
    hero: {
      imageUrl: heroBanner?.imageUrl ?? heroProduct?.images[0]?.url ?? null,
      imageAlt: heroBanner?.title ?? heroProduct?.name ?? "",
      href: heroBanner?.linkUrl || "/catalog",
    },
    spaces,
    selected,
    reduced,
    note: { imageUrl: noteProduct?.images[0]?.url ?? null, href: bulbsSlug },
    index: indexEntries,
  };
}

export default async function HomePage() {
  const data = await getHomeData();
  const meta = await getTranslations("meta");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "solveta·shop",
          url: siteUrl,
          description: meta("description"),
        }}
      />
      <HomeHero {...data.hero} />
      <SpaceTiles tiles={data.spaces} />
      <ProductEdit titleKey="selectedTitle" textKey="selectedText" products={data.selected} href="/catalog" />
      <LightNote {...data.note} />
      <ProductEdit
        titleKey="reducedTitle"
        textKey="reducedText"
        products={data.reduced}
        href="/catalog?onSale=true"
        tone="surface"
      />
      <CategoryIndex entries={data.index} />
      <DeliveryNotes />
    </>
  );
}
