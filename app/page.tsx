import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/app/components/ButtonLink";
import CapabilityShowcase, { type Capability } from "@/app/components/CapabilityShowcase";
import HeroOcean from "@/app/components/HeroOcean";
import { contactEmail, contactPhone, foundingYear, siteUrl } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./home.module.css";

const capabilityLinks: Capability[] = [
  { title: "Services", description: "Development, infrastructure, and technology operations.", href: "/services", image: "/capability-images/services.webp" },
  { title: "AI Nexus", description: "Artificial intelligence and business automation.", href: "/services/ai-automation", image: "/capability-images/ai-nexus.webp" },
  { title: "Solutions", description: "Systems designed around business needs.", href: "/solutions", image: "/capability-images/solutions-dashboard.webp" },
  { title: "Industries", description: "Technology across operating environments.", href: "/industries", image: "/capability-images/industries.webp" },
];

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

    <section className={styles.section} aria-labelledby="approach-title">
      <div className="container"><div className={styles.textBlock}>
        <p className={`kicker ${styles.label}`}>OUR APPROACH</p>
        <h2 className={styles.sectionHeading} id="approach-title">Built from operating experience.</h2>
        <p className={styles.description}>Dawood Technologies developed from the technology needs of operating businesses. We apply that practical understanding to deliver technology solutions designed around real operational challenges.</p>
        <Link className={`text-link ${styles.textLink}`} href="/company">Discover Our Story <ArrowRight size={16} aria-hidden="true" /></Link>
      </div></div>
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

    <section className={styles.section} aria-labelledby="work-title">
      <div className="container"><div className={styles.textBlock}>
        <p className={`kicker ${styles.label}`}>OUR WORK</p>
        <h2 className={styles.sectionHeading} id="work-title">Technology in practice.</h2>
        <p className={styles.description}>Explore how technology supports business applications, digital platforms, and operational needs through our existing work.</p>
        <Link className={`text-link ${styles.textLink}`} href="/work">Explore Our Work <ArrowRight size={16} aria-hidden="true" /></Link>
      </div></div>
    </section>

    <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="connect-title">
      <div className="container"><div className={styles.textBlock}>
        <p className={`kicker ${styles.label}`}>LET&apos;S CONNECT</p>
        <h2 className={styles.sectionHeading} id="connect-title">Let&apos;s discuss what you&apos;re building.</h2>
        <p className={styles.description}>Tell us about your business challenge, technology needs, or next project.</p>
        <div className={styles.actions}><ButtonLink href="/contact" variant="primary">Contact Us <ArrowUpRight size={17} aria-hidden="true" /></ButtonLink></div>
      </div></div>
    </section>
  </main>;
}
