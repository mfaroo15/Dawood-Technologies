import type { MetadataRoute } from "next";
import { industries } from "@/app/data/industries";
import { capabilities, siteUrl } from "@/app/data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/services", "/work", "/industries", "/company", "/careers", "/contact", "/privacy", "/terms"];
  return [...routes, ...capabilities.map((item) => `/services/${item.slug}`), ...industries.map((item) => item.href)].map((route) => ({ url: `${siteUrl}${route}` }));
}
