import { Cloud, Code, Compass, Cpu, Database, LayoutGrid, Settings, ShieldCheck, type LucideIcon } from "lucide-react";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { Faq } from "@/app/components/sections/Faq";
import { IconTiles } from "@/app/components/sections/IconTiles";
import { PageHero } from "@/app/components/sections/PageHero";
import { ProcessSteps } from "@/app/components/sections/ProcessSteps";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./services.module.css";

export const metadata = createPageMetadata({ title: "IT Services & Consulting | Dawood Technologies", description: "Explore IT consulting, infrastructure, cloud, networking, software and application development, and technology support services from Dawood Technologies.", path: "/services" });

const services: { title: string; text: string; href: string; icon: LucideIcon }[] = [
  { title: "Technology Consulting", text: "Assessments, architecture and implementation roadmaps.", href: "/services/technology-consulting", icon: Compass },
  { title: "Software & Application Development", text: "Websites, custom software, SaaS products, web and mobile apps.", href: "/services/application-development", icon: Code },
  { title: "Enterprise & ERP", text: "CRM, ERP and business systems that connect your operations.", href: "/services/enterprise-erp", icon: LayoutGrid },
  { title: "Cloud & DevOps", text: "Cloud architecture, migration and deployment pipelines.", href: "/services/cloud-devops", icon: Cloud },
  { title: "Data Services", text: "Integration, reporting and dashboards for decisions.", href: "/services/data-services", icon: Database },
  { title: "AI Nexus", text: "AI applications and automation for real workflows.", href: "/services/ai-automation", icon: Cpu },
  { title: "Cybersecurity", text: "Risk assessments and practical security controls.", href: "/services/cybersecurity", icon: ShieldCheck },
  { title: "Managed Technology", text: "Monitoring, support and continuous improvement.", href: "/services/managed-technology", icon: Settings },
];

export default function ServicesPage() {
  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <PageHero kicker="Services" title="Technology services organized around business needs." lead="Consulting, engineering, integration and ongoing operation. Each service can stand alone or combine into a complete technology program." />

      <section className={typography.lightSection} aria-labelledby="services-title">
        <Reveal className="container">
          <p className={typography.kicker}>What we do</p>
          <h2 className={typography.heading} id="services-title">Eight services, one accountable team.</h2>
          <p className={typography.intro}>Choose a single service or let us run your technology end to end.</p>
          <IconTiles items={services} />
        </Reveal>
      </section>

      <section className={typography.tintedSection} aria-labelledby="process-title">
        <Reveal className="container">
          <p className={typography.kicker}>Our process</p>
          <h2 className={`${typography.heading} ${styles.spacedHeading}`} id="process-title">How every engagement runs.</h2>
          <ProcessSteps />
        </Reveal>
      </section>

      <section className={typography.lightSection} aria-labelledby="faq-title">
        <Reveal className={`container ${styles.split}`}>
          <div>
            <p className={typography.kicker}>FAQ</p>
            <h2 className={typography.heading} id="faq-title">Common questions.</h2>
          </div>
          <Faq />
        </Reveal>
      </section>

      <CtaBand heading="Not sure which service you need?" />
    </main>
  );
}
