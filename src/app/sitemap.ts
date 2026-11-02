import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/lib/site-config';
import { guides } from '@/content/guides';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin) return [];
  return [{url:`${siteOrigin}/`},...guides.map(guide=>({url:`${siteOrigin}/guides/${guide.slug}/`}))];
}
