import Link from "next/link";
import { ContactBand } from "@/app/components/ContactBand";
import { InnerHero } from "@/app/components/InnerHero";
import { solutions } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";

export const metadata = createPageMetadata({ title: "Business Technology Solutions | Dawood Technologies", description: "Discover business technology solutions covering digital transformation, enterprise systems, cloud infrastructure, automation, and software.", path: "/solutions" });
const servicePaths: Readonly<Record<string, string>> = {
  "Application development": "/services/application-development",
  "Systems integration": "/services/enterprise-erp",
  "Data services": "/services/data-services",
  "CRM implementation": "/services/enterprise-erp",
  "Workflow automation": "/services/ai-automation",
  "Business intelligence": "/services/data-services",
  "Data integration": "/services/data-services",
  "AI integration": "/services/ai-automation",
  "Intelligent automation": "/services/ai-automation",
  "AI applications": "/services/ai-automation",
  "Cloud architecture": "/services/cloud-devops",
  "DevOps": "/services/cloud-devops",
  "Managed cloud": "/services/cloud-devops",
};

export default function SolutionsPage() { return <main id="main-content"><InnerHero kicker="SOLUTIONS" title="Systems built for specific business requirements." intro="Each solution combines the application, integration, data and infrastructure work required for a defined operating need." /><section className="section industry-detail"><div className="container">{solutions.map((item) => <article key={item.title}><span>{item.label}</span><div><h2>{item.title}</h2><p>{item.text}</p></div><ul>{item.services.map((service) => <li key={service}>{servicePaths[service] ? <Link href={servicePaths[service]}>{service}</Link> : service}</li>)}</ul></article>)}</div></section><ContactBand /></main>; }
