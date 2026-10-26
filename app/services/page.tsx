import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { EngagementModels } from "@/app/components/sections/EngagementModels";
import { Faq } from "@/app/components/sections/Faq";
import { IconTiles } from "@/app/components/sections/IconTiles";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { serviceCards } from "@/app/data/service-cards";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./services.module.css";

export const metadata = createPageMetadata({ title: "IT Services & Consulting | Dawood Technologies", description: "Explore IT consulting, infrastructure, cloud, networking, software and application development, and technology support services from Dawood Technologies.", path: "/services" });

const breadcrumb = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }] as const;

const pills = [
  { id: "services", label: "Services" },
  { id: "engagement-models", label: "Engagement models" },
  { id: "faq", label: "FAQ" },
];

export default function ServicesPage() {
  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[...breadcrumb]} />
      <PageHero breadcrumb={breadcrumb} title="Services built around business needs." lead="Consulting, engineering, integration and operation. Use one service or combine them into a complete program." pills={pills} />

      <section id="services" className={typography.lightSection} aria-labelledby="services-title">
        <Reveal className="container">
          <p className={typography.kicker}>What we do</p>
          <h2 className={typography.heading} id="services-title">Ten services, one accountable team.</h2>
          <p className={typography.intro}>Choose a single service or let us run your technology end to end.</p>
          <IconTiles columns={5} items={serviceCards} />
        </Reveal>
      </section>

      <EngagementModels tinted />

      <section id="faq" className={typography.lightSection} aria-labelledby="faq-title">
        <Reveal className={`container ${styles.split}`}>
          <div>
            <p className={typography.kicker}>FAQ</p>
            <h2 className={typography.heading} id="faq-title">Common questions.</h2>
          </div>
          <Faq />
        </Reveal>
      </section>

      <CtaBand heading="Not sure which service you need?" text="Tell us what you're trying to achieve and we'll recommend the right mix of services." />
    </main>
  );
}
