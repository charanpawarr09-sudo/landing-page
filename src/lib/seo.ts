import type { Metadata } from "next";

export const siteUrl = "https://repairnox.com";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", siteName: "RepairNox", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "RepairNox repair shop management software" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

export function breadcrumbData(items: readonly { name: string; path: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: siteUrl + item.path })) };
}
