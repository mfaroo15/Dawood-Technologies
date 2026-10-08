import { siteUrl } from "@/app/data/site";

type Breadcrumb = { name: string; path: `/${string}` };

// Describe the existing index/detail hierarchy without adding a visual breadcrumb.
export function BreadcrumbStructuredData({ items }: { items: Breadcrumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${siteUrl}${path}`,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
