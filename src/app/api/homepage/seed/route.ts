import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // ── Utility Links ──────────────────────────────────
    const utilityLinks = [
      { label: "Our story", linkUrl: "/about", icon: "Info", position: "left", sortOrder: 0 },
      { label: "Delivery", linkUrl: "/policies/shipping", icon: "Truck", position: "left", sortOrder: 1 },
      { label: "Returns & refunds", linkUrl: "/policies/returns", icon: "RotateCcw", position: "left", sortOrder: 2 },
      { label: "Questions", linkUrl: "/faq", icon: "HelpCircle", position: "left", sortOrder: 3 },
      { label: "Warranty", linkUrl: "/policies/warranty", icon: "Package", position: "left", sortOrder: 4 },
      { label: "Get in touch", linkUrl: "/contact", icon: "Phone", position: "right", sortOrder: 5 },
    ];

    for (const link of utilityLinks) {
      await prisma.utilityLink.upsert({
        where: { id: `seed-utility-${link.sortOrder}` },
        update: link,
        create: { id: `seed-utility-${link.sortOrder}`, ...link },
      });
    }

    // ── Promo Strip Items ──────────────────────────────
    // Only statements backed by the published policies — no extra promises.
    const promoStripItems = [
      { icon: "Truck", title: "Free standard delivery", subtitle: "On orders of £75 or more", sortOrder: 0 },
      { icon: "RotateCcw", title: "14 days to change your mind", subtitle: "See our returns policy", sortOrder: 1 },
      { icon: "Shield", title: "Longer cover, if you want it", subtitle: "Optional Additional Warranty", sortOrder: 2 },
      { icon: "CreditCard", title: "Secure card payment", subtitle: "Visa and Mastercard", sortOrder: 3 },
      { icon: "Package", title: "Sent within 1–2 business days", subtitle: "After payment is confirmed", sortOrder: 4 },
      { icon: "Mail", title: "Questions?", subtitle: "Write to us any time", sortOrder: 5 },
    ];

    for (const item of promoStripItems) {
      await prisma.promoStripItem.upsert({
        where: { id: `seed-promo-${item.sortOrder}` },
        update: item,
        create: { id: `seed-promo-${item.sortOrder}`, ...item },
      });
    }

    // ── Homepage Tabs ──────────────────────────────────
    // Category slugs are suggestions — point them at real categories in the admin.
    const tabs = [
      { label: "Reduced", icon: "Tag", linkUrl: "/catalog?onSale=true", color: "#8A4B3C", sortOrder: 0 },
      { label: "Pendants", icon: "Lightbulb", linkUrl: "/catalog/pendant-lights", color: "#111111", sortOrder: 1 },
      { label: "Table lamps", icon: "Lamp", linkUrl: "/catalog/table-lamps", color: "#111111", sortOrder: 2 },
      { label: "Floor lamps", icon: "LampFloor", linkUrl: "/catalog/floor-lamps", color: "#111111", sortOrder: 3 },
      { label: "Wall lights", icon: "LampWallUp", linkUrl: "/catalog/wall-lights", color: "#111111", sortOrder: 4 },
      { label: "Light bulbs", icon: "Lightbulb", linkUrl: "/catalog/light-bulbs", color: "#111111", sortOrder: 5 },
      { label: "Home décor", icon: "Flower2", linkUrl: "/catalog/home-decor", color: "#6F7F68", sortOrder: 6 },
      { label: "Recently added", icon: "Sparkles", linkUrl: "/catalog?sort=newest", color: "#6F7F68", sortOrder: 7 },
      { label: "Last pieces", icon: "Archive", linkUrl: "/catalog?onSale=true", color: "#6B6B66", sortOrder: 8 },
    ];

    for (const tab of tabs) {
      await prisma.homepageTab.upsert({
        where: { id: `seed-tab-${tab.sortOrder}` },
        update: tab,
        create: { id: `seed-tab-${tab.sortOrder}`, ...tab },
      });
    }

    // ── Hero Slides (Banners type HERO) ────────────────
    const heroSlides = [
      {
        type: "HERO" as const,
        title: "Softer light for longer evenings",
        subtitle: "Table and floor lamps",
        description: "Warm, low pools of light for reading corners, sideboards and bedside tables.",
        linkUrl: "/catalog/table-lamps",
        ctaLabel: "See the lamps",
        bgColor: "#F2F2EF",
        textColor: "#111111",
        badgeText: "Lamps",
        sortOrder: 0,
      },
      {
        type: "HERO" as const,
        title: "Pendants that settle a room",
        subtitle: "Over tables, islands and stairwells",
        description: "Simple shades in paper, glass, linen and metal, chosen to hang well and light evenly.",
        linkUrl: "/catalog/pendant-lights",
        ctaLabel: "See the pendants",
        bgColor: "#E9E8E2",
        textColor: "#111111",
        badgeText: "Pendants",
        sortOrder: 1,
      },
      {
        type: "HERO" as const,
        title: "Small things, quietly placed",
        subtitle: "Home décor",
        description: "Vases, candle holders and objects that sit easily next to the light they share a shelf with.",
        linkUrl: "/catalog/home-decor",
        ctaLabel: "See the décor",
        bgColor: "#111111",
        textColor: "#ffffff",
        badgeText: "Décor",
        sortOrder: 2,
      },
    ];

    for (let i = 0; i < heroSlides.length; i++) {
      await prisma.banner.upsert({
        where: { id: `seed-hero-${i}` },
        update: heroSlides[i],
        create: { id: `seed-hero-${i}`, ...heroSlides[i] },
      });
    }

    // ── Deal Cards (Banners type DEAL_CARD) ────────────
    // Placeholder prices for the admin preview — edit before publishing.
    const dealCards = [
      {
        type: "DEAL_CARD" as const,
        title: "Opal glass table lamp",
        subtitle: "Reduced",
        description: "A soft, diffused glow from a hand-finished opal glass shade.",
        linkUrl: "/catalog?onSale=true",
        ctaLabel: "View piece",
        bgColor: "#F2F2EF",
        textColor: "#111111",
        oldPrice: "£89.00",
        newPrice: "£69.00",
        discountText: "-22%",
        sortOrder: 0,
      },
      {
        type: "DEAL_CARD" as const,
        title: "Pleated linen pendant",
        subtitle: "Reduced",
        description: "A wide pleated shade that spreads warm light across a dining table.",
        linkUrl: "/catalog?onSale=true",
        ctaLabel: "View piece",
        bgColor: "#F2F2EF",
        textColor: "#111111",
        oldPrice: "£120.00",
        newPrice: "£96.00",
        discountText: "-20%",
        sortOrder: 1,
      },
    ];

    for (let i = 0; i < dealCards.length; i++) {
      await prisma.banner.upsert({
        where: { id: `seed-deal-${i}` },
        update: dealCards[i],
        create: { id: `seed-deal-${i}`, ...dealCards[i] },
      });
    }

    // ── Small Promo Banners ────────────────────────────
    const smallPromos = [
      {
        type: "PROMO_SMALL" as const,
        title: "Wall lights",
        subtitle: "For hallways and bedsides",
        linkUrl: "/catalog/wall-lights",
        ctaLabel: "Browse",
        bgColor: "#F2F2EF",
        textColor: "#111111",
        sortOrder: 0,
      },
      {
        type: "PROMO_SMALL" as const,
        title: "Light bulbs",
        subtitle: "Warm white, dimmable and decorative",
        linkUrl: "/catalog/light-bulbs",
        ctaLabel: "Browse",
        bgColor: "#E9E8E2",
        textColor: "#111111",
        sortOrder: 1,
      },
      {
        type: "PROMO_SMALL" as const,
        title: "Shades",
        subtitle: "Fabric, paper and glass",
        linkUrl: "/catalog/lamp-shades",
        ctaLabel: "Browse",
        bgColor: "#E6EAE3",
        textColor: "#111111",
        sortOrder: 2,
      },
    ];

    for (let i = 0; i < smallPromos.length; i++) {
      await prisma.banner.upsert({
        where: { id: `seed-promo-small-${i}` },
        update: smallPromos[i],
        create: { id: `seed-promo-small-${i}`, ...smallPromos[i] },
      });
    }

    // ── Wide Promo Banner ──────────────────────────────
    const widePromo = {
      type: "PROMO_WIDE" as const,
      title: "Free standard delivery from £75",
      subtitle: "On orders of £75 or more",
      description: "Standard delivery is free when your order comes to £75 or more after discounts; otherwise it costs £4.95. Express delivery is £9.95. Full details are in our delivery policy.",
      linkUrl: "/policies/shipping",
      ctaLabel: "Read the details",
      bgColor: "#F2F2EF",
      textColor: "#111111",
      badgeText: "Delivery",
      sortOrder: 0,
    };

    await prisma.banner.upsert({
      where: { id: "seed-promo-wide-0" },
      update: widePromo,
      create: { id: "seed-promo-wide-0", ...widePromo },
    });

    // ── Brands ─────────────────────────────────────────
    const brands = [
      "Apple", "Samsung", "Sony", "LG", "Xiaomi",
      "Lenovo", "ASUS", "Dyson", "Bosch", "Philips",
      "JBL", "LEGO", "Nike", "Electrolux", "Canon",
    ];

    for (let i = 0; i < brands.length; i++) {
      const slug = brands[i].toLowerCase().replace(/\s+/g, "-");
      await prisma.brand.upsert({
        where: { id: `seed-brand-${i}` },
        update: { name: brands[i], logoUrl: `/brands/${slug}.svg`, linkUrl: `/brands/${slug}`, sortOrder: i },
        create: {
          id: `seed-brand-${i}`,
          name: brands[i],
          logoUrl: `/brands/${slug}.svg`,
          linkUrl: `/brands/${slug}`,
          sortOrder: i,
        },
      });
    }

    // ── Homepage Sections ──────────────────────────────
    const sections = [
      {
        title: "Reduced",
        subtitle: "Pieces with a lower price for now",
        slug: "best-deals",
        filterType: "onSale",
        maxProducts: 5,
        viewAllUrl: "/catalog?onSale=true",
        viewAllLabel: "See everything reduced",
        bgStyle: "white",
        columns: 5,
        sortOrder: 0,
      },
      {
        title: "Most loved",
        subtitle: "The pieces people come back to",
        slug: "popular",
        filterType: "featured",
        maxProducts: 5,
        viewAllUrl: "/catalog",
        viewAllLabel: "See all",
        bgStyle: "white",
        columns: 5,
        sortOrder: 1,
      },
      {
        title: "Recently added",
        subtitle: "New lamps and décor in the shop",
        slug: "new-arrivals",
        filterType: "newest",
        maxProducts: 5,
        viewAllUrl: "/catalog?sort=newest",
        viewAllLabel: "See what's new",
        bgStyle: "gray",
        columns: 5,
        sortOrder: 2,
      },
      {
        title: "Lighting",
        subtitle: "Pendants, lamps and wall lights",
        slug: "electronics",
        filterType: "category",
        categorySlug: "electronics",
        maxProducts: 5,
        viewAllUrl: "/catalog",
        viewAllLabel: "See all lighting",
        bgStyle: "white",
        columns: 5,
        sortOrder: 3,
      },
      {
        title: "Worth a look",
        subtitle: "Pieces others are viewing",
        slug: "recommended",
        filterType: "popular",
        maxProducts: 5,
        viewAllUrl: "/catalog",
        viewAllLabel: "See all",
        bgStyle: "white",
        columns: 5,
        sortOrder: 4,
      },
      {
        title: "For the home",
        subtitle: "Vases, candle holders and objects",
        slug: "home-essentials",
        filterType: "category",
        categorySlug: "home-garden",
        maxProducts: 5,
        viewAllUrl: "/catalog",
        viewAllLabel: "See all décor",
        bgStyle: "gray",
        columns: 5,
        sortOrder: 5,
      },
      {
        title: "Everything",
        subtitle: "The whole shop in one place",
        slug: "all-products",
        filterType: "all",
        maxProducts: 10,
        viewAllUrl: "/catalog",
        viewAllLabel: "Browse the shop",
        bgStyle: "white",
        columns: 5,
        sortOrder: 6,
      },
    ];

    for (const section of sections) {
      await prisma.homepageSection.upsert({
        where: { slug: section.slug },
        update: section,
        create: section,
      });
    }

    return NextResponse.json({
      success: true,
      seeded: {
        utilityLinks: utilityLinks.length,
        promoStripItems: promoStripItems.length,
        tabs: tabs.length,
        heroSlides: heroSlides.length,
        dealCards: dealCards.length,
        smallPromos: smallPromos.length,
        widePromos: 1,
        brands: brands.length,
        sections: sections.length,
      },
    });
  } catch (error) {
    console.error("Error seeding homepage data:", error);
    return NextResponse.json({ error: "Failed to seed homepage data" }, { status: 500 });
  }
}
