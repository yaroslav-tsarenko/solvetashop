import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs/Breadcrumbs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* Reading styles for admin-authored HTML. */
const proseCls = [
  "text-[0.9375rem] leading-[1.8] text-text-secondary [overflow-wrap:anywhere]",
  "[&_p]:mb-4",
  "[&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:border-t [&_h2]:border-line [&_h2]:pt-10 [&_h2]:text-[1.375rem] [&_h2]:font-light [&_h2]:tracking-[-0.015em] [&_h2]:text-ink",
  "[&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:font-medium [&_h3]:text-ink",
  "[&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-[circle] [&_ol]:mb-4 [&_ol]:ml-5 [&_ol]:list-decimal [&_li]:mb-1.5",
  "[&_a]:text-sage [&_a]:underline [&_a]:underline-offset-4",
  "[&_img]:my-8 [&_img]:rounded-[var(--radius-md)]",
  "[&_strong]:font-medium [&_strong]:text-ink",
].join(" ");

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;

  const page = await prisma.page.findUnique({
    where: { slug },
  });

  if (!page || !page.isActive) notFound();

  return (
    <div className="wrap pb-24">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.title }]} />
      <article className="mx-auto max-w-[760px] pt-4">
        <h1 className="mb-10 border-b border-line pb-10 text-[clamp(2rem,4.4vw,3.25rem)] font-light leading-[1.06] tracking-[-0.025em] text-ink [overflow-wrap:anywhere]">
          {page.title}
        </h1>
        <div className={proseCls} dangerouslySetInnerHTML={{ __html: page.content }} />
      </article>
    </div>
  );
}
