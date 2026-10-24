import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/app/components/ButtonLink";
import CapabilityShowcase, { type Capability } from "@/app/components/CapabilityShowcase";
import HeroOcean from "@/app/components/HeroOcean";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { ProcessSteps } from "@/app/components/sections/ProcessSteps";
import { Reveal } from "@/app/components/sections/Reveal";
import { StatCards } from "@/app/components/sections/StatCards";
import { TechChips } from "@/app/components/sections/TechChips";
import typography from "@/app/components/sections/typography.module.css";
import { contactEmail, contactPhone, foundingYear, siteUrl } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./home.module.css";

const capabilityLinks: Capability[] = [
  { title: "Application Development", description: "Web and mobile apps, portals, APIs and integrations.", href: "/services/application-development", image: "/capability-images/application-development.webp" },
  { title: "Enterprise & ERP", description: "CRM, ERP and business systems that connect your operations.", href: "/services/enterprise-erp", image: "/capability-images/enterprise-erp.webp" },
  { title: "Cloud & Infrastructure", description: "Cloud architecture, migration and deployment pipelines.", href: "/services/cloud-devops", image: "/capability-images/cloud-infrastructure.webp" },
  { title: "AI & Automation", description: "AI applications and automation for real workflows.", href: "/services/ai-automation", image: "/capability-images/ai-automation.webp" },
];

const technologies = ["Microsoft Azure", "AWS", "Google Cloud", "Next.js", "React", "Node.js", "TypeScript", "Python", "Shopify", "Docker", "GitHub", "Microsoft 365"];

const homeDescription = "Dawood Technologies provides IT consulting, software development, cloud infrastructure, enterprise networking, automation, and business technology solutions.";

export const metadata: Metadata = {
  ...createPageMetadata({ title: "Dawood Technologies | IT Infrastructure & Business Systems", description: homeDescription, path: "/" }),
  title: { absolute: "Dawood Technologies | IT Infrastructure & Business Systems" },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Dawood Technologies",
        url: `${siteUrl}/`,
        logo: `${siteUrl}/dawood-technologies-logo.png`,
        telephone: contactPhone.schema,
        email: contactEmail,
        foundingDate: String(foundingYear),
        description: "Dawood Technologies grew from the technology needs of operating businesses and designs, builds, modernizes and supports business technology.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Dawood Technologies",
        url: `${siteUrl}/`,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
  return <main id="main-content" className={styles.home}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <section className={`${styles.hero} ${styles.tinted}`} aria-labelledby="home-title">
      <HeroOcean />
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className={`container ${styles.heroContent}`}>
        <p className={`kicker ${styles.label}`}>DAWOOD TECHNOLOGIES</p>
        <h1 className={styles.heroHeading} id="home-title"><span className={styles.heroLine}>Technology built</span> <span className={styles.heroLine}>around how businesses</span> <span className="hero-word-rotator" aria-hidden="true"><span>operate.</span><span>connect.</span><span>scale.</span><span>evolve.</span></span><span className="visually-hidden">operate.</span></h1>
        <p className={styles.heroDescription}>We design, develop, integrate, and support technology solutions that help organizations operate and grow.</p>
        <div className={styles.actions}>
          <ButtonLink href="/services" variant="primary">Explore Our Services <ArrowUpRight size={17} aria-hidden="true" /></ButtonLink>
          <ButtonLink href="/company" variant="secondary">About Us <ArrowUpRight size={17} aria-hidden="true" /></ButtonLink>
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.tinted} ${styles.capabilitiesSection}`} aria-labelledby="capabilities-title">
      <div className="container">
        <div className={styles.sectionIntro}>
          <p className={`kicker ${styles.label}`}>WHAT WE DO</p>
          <h2 className={styles.sectionHeading} id="capabilities-title">Explore our capabilities.</h2>
        </div>
        <CapabilityShowcase items={capabilityLinks} />
      </div>
    </section>

    <section className={typography.lightSection} aria-labelledby="why-title">
      <Reveal className="container">
        <p className={typography.kicker}>Why Dawood Technologies</p>
        <h2 className={typography.heading} id="why-title">A team built for delivery.</h2>
        <p className={typography.intro}>The people, presence and experience behind every project.</p>
        <StatCards />
      </Reveal>
    </section>

    <section className={styles.workBanner} aria-labelledby="work-title">
      <Reveal className="container">
        <div className={styles.workCard}>
          <div>
            <p className={typography.kicker}>Our work</p>
            <h2 className={styles.workHeading} id="work-title">See how we run technology for manufacturing and trade businesses.</h2>
            <p className={styles.workText}>Systems our team builds, hosts and supports every day.</p>
          </div>
          <Link className={styles.workButton} href="/work">View our work <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </Reveal>
    </section>

    <section className={typography.lightSection} aria-labelledby="process-title">
      <Reveal className="container">
        <p className={typography.kicker}>How we work</p>
        <h2 className={typography.heading} id="process-title">From first conversation to running system.</h2>
        <p className={typography.intro}>A clear process, with the same team responsible from planning through day-to-day support.</p>
        <ProcessSteps />
      </Reveal>
    </section>

    <section className={typography.tintedSection} aria-labelledby="tech-title">
      <Reveal className="container">
        <p className={typography.kicker}>Technologies</p>
        <h2 className={`${typography.heading} ${styles.techHeading}`} id="tech-title">Built with proven platforms.</h2>
        <TechChips items={technologies} />
      </Reveal>
    </section>

    <CtaBand heading="Bring us the business challenge." />
  </main>;
}
