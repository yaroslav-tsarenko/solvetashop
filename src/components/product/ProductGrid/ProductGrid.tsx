"use client";

import { ProductCard } from "@/components/product/ProductCard/ProductCard";

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number | string;
  comparePrice?: number | string | null;
  quantity: number;
  images: { url: string; alt?: string | null }[];
  categories?: { category: { name: string } }[];
}

interface ProductGridProps {
  products: Product[];
  /** Column count at the widest breakpoint. */
  columns?: 3 | 4;
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  return (
    <div
      className={[
        "grid min-w-0 grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 md:gap-y-14",
        columns === 4 ? "xl:grid-cols-4" : "",
      ].join(" ")}
    >
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          slug={product.slug}
          sku={product.sku}
          price={Number(product.price)}
          comparePrice={product.comparePrice ? Number(product.comparePrice) : null}
          imageUrl={product.images?.[0]?.url}
          category={product.categories?.[0]?.category?.name}
          quantity={product.quantity}
          priority={i < 4}
        />
      ))}
    </div>
  );
}
