import { Cloud, Code, Compass, Cpu, Database, LayoutGrid, ListChecks, PenTool, Settings, ShieldCheck, type LucideIcon } from "lucide-react";
import { capabilities } from "@/app/data/site";

// Service cards shared by the homepage and /services, so names, order and links stay in sync.
// The homepage shows only the cards marked onHome.
const order: { slug: string; icon: LucideIcon; onHome: boolean }[] = [
  { slug: "technology-consulting", icon: Compass, onHome: true },
  { slug: "application-development", icon: Code, onHome: true },
  { slug: "ai-automation", icon: Cpu, onHome: true },
  { slug: "cloud-devops", icon: Cloud, onHome: true },
  { slug: "enterprise-erp", icon: LayoutGrid, onHome: true },
  { slug: "data-services", icon: Database, onHome: true },
  { slug: "cybersecurity", icon: ShieldCheck, onHome: true },
  { slug: "managed-technology", icon: Settings, onHome: true },
  { slug: "product-design-mvp", icon: PenTool, onHome: false },
  { slug: "quality-assurance", icon: ListChecks, onHome: false },
];

export const serviceCards = order.map(({ slug, icon, onHome }) => {
  const service = capabilities.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return { slug, title: service.title, text: service.tagline, href: `/services/${slug}`, icon, onHome };
});
