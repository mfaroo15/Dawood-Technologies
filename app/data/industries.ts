import { Building2, CreditCard, GraduationCap, HeartPulse, Megaphone, MonitorPlay, Package, Plane, Ship, ShoppingCart, Trophy, Truck, type LucideIcon } from "lucide-react";
import content from "./industry-content.json";

// industry-content.json is the single source of truth for industry names, order and page copy.
// This file adds what only the site needs: the /industries card summary, icon and a shorter pill label.
const extras: Record<string, { text: string; icon: LucideIcon; shortTitle?: string }> = {
  "construction-infrastructure": { shortTitle: "Construction", text: "Manufacturing, inventory, ERP and operations systems.", icon: Package },
  "trade-commerce": { text: "Products, clients, enquiries and records in one system.", icon: Ship },
  fintech: { text: "Secure applications, integrations and controlled data workflows.", icon: CreditCard },
  aviation: { text: "Ground handling, GSE coordination, cargo and workforce scheduling.", icon: Plane },
  edtech: { text: "Learning platforms, portals and education workflows.", icon: GraduationCap },
  healthtech: { text: "Secure data workflows and operational systems.", icon: HeartPulse },
  proptech: { text: "Property workflows, CRM integration and analytics.", icon: Building2 },
  "media-entertainment": { shortTitle: "Media", text: "Content platforms, audiences and cloud infrastructure.", icon: MonitorPlay },
  sports: { text: "Digital platforms, fan experiences, web and mobile apps, and performance data.", icon: Trophy },
  "retail-ecommerce": { shortTitle: "Retail", text: "Online stores, inventory, order management, payments and customer systems working together.", icon: ShoppingCart },
  "logistics-transportation": { shortTitle: "Logistics", text: "Shipment tracking, fleet and warehouse systems, customer portals and operational reporting.", icon: Truck },
  adtech: { text: "Campaign workflows, reporting, automation and data integration.", icon: Megaphone },
};

export const industries = content.industries.map((industry) => {
  const extra = extras[industry.slug];
  if (!extra) throw new Error(`Missing card details for industry "${industry.slug}"`);
  return { ...industry, ...extra, href: `/industries/${industry.slug}` as const };
});

export type Industry = (typeof industries)[number];

/** Industry page link for a name used elsewhere (e.g. a service's industry list). */
export function industryHref(name: string) {
  const industry = industries.find((item) => item.name === name);
  if (!industry) throw new Error(`Unknown industry "${name}"`);
  return industry.href;
}
