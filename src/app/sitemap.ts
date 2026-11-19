import type { MetadataRoute } from "next";
import { industries } from "@/content/industries";
import { guides } from "@/content/guides";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/pricing", "/contact", "/support", "/privacy", "/terms", "/about", "/industries", "/guides", ...industries.map(item => `/industries/${item.slug}`), ...guides.map(item => `/guides/${item.slug}`)].map(path => ({ url: siteUrl + path }));
}
