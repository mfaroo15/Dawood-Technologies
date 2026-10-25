import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { EngagementModels } from "@/app/components/sections/EngagementModels";
import { Faq } from "@/app/components/sections/Faq";
import { IconTiles } from "@/app/components/sections/IconTiles";
import { PageHero } from "@/app/components/sections/PageHero";
import { ProcessSteps } from "@/app/components/sections/ProcessSteps";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { serviceCards } from "@/app/data/service-cards";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./services.module.css";

export const metadata = createPageMetadata({ title: "IT Services & Consulting | Dawood Technologies", description: "Explore IT consulting, infrastructure, cloud, networking, software and application development, and technology support services from Dawood Technologies.", path: "/services" });

export default function ServicesPage() {
  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <PageHero kicker="Services" title="Technology services organized around business needs." lead="Consulting, engineering, integration and ongoing operation. Each service can stand alone or combine into a complete technology program." />

      <section className={typography.lightSection} aria-labelledby="services-title">
        <Reveal className="container">
          <p className={typography.kicker}>What we do</p>
          <h2 className={typography.heading} id="services-title">Ten services, one accountable team.</h2>
          <p className={typography.intro}>Choose a single service or let us run your technology end to end.</p>
          <IconTiles columns={5} items={serviceCards} />
        </Reveal>
      </section>

      <EngagementModels tinted />

      <section className={typography.lightSection} aria-labelledby="process-title">
        <Reveal className="container">
          <p className={typography.kicker}>Our process</p>
          <h2 className={`${typography.heading} ${styles.spacedHeading}`} id="process-title">How every engagement runs.</h2>
          <ProcessSteps />
        </Reveal>
      </section>

      <section className={typography.tintedSection} aria-labelledby="faq-title">
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
