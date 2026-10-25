import type { MetadataRoute } from "next";
import { capabilities, siteUrl } from "@/app/data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/services", "/work", "/industries", "/company", "/careers", "/contact", "/privacy", "/terms"];
  return [...routes, ...capabilities.map((item) => `/services/${item.slug}`)].map((route) => ({ url: `${siteUrl}${route}` }));
}
