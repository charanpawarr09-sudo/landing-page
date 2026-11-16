import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/pricing", "/contact", "/support", "/privacy", "/terms"].map(path => ({ url: "https://repairnox.com" + path })); }
