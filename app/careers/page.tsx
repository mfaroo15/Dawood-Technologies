import { Code, Globe, Mail, Target, TrendingUp } from "lucide-react";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { IconTiles } from "@/app/components/sections/IconTiles";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { contactEmail } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./careers.module.css";

export const metadata = createPageMetadata({
  title: "Careers",
  description: "Explore career opportunities at Dawood Technologies across software, cloud infrastructure, data, enterprise systems and technology operations.",
  path: "/careers",
});

const reasons = [
  { title: "Real impact", text: "Build systems that businesses rely on every day.", icon: Target },
  { title: "Modern stack", text: "Next.js, cloud platforms and AI tools.", icon: Code },
  { title: "Remote-first", text: "Work with colleagues in Karachi and Dubai.", icon: Globe },
  { title: "Room to grow", text: "Take on more responsibility as you and the team grow.", icon: TrendingUp },
];

const cvLink = `mailto:${contactEmail}?subject=CV%20-%20Dawood%20Technologies`;

const breadcrumb = [{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }] as const;

const pills = [
  { id: "why-work-with-us", label: "Why join us" },
  { id: "open-positions", label: "Open positions" },
];

export default function CareersPage() {
  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[...breadcrumb]} />
      <PageHero breadcrumb={breadcrumb} title="Build technology that stays useful." lead="Work across applications, cloud, data and AI, on systems that real businesses depend on every day." pills={pills} />

      <section id="why-work-with-us" className={typography.lightSection} aria-labelledby="why-title">
        <Reveal className="container">
          <p className={typography.kicker}>Why work with us</p>
          <h2 className={`${typography.heading} ${styles.spacedHeading}`} id="why-title">What you can expect.</h2>
          <IconTiles items={reasons} />
        </Reveal>
      </section>

      <section id="open-positions" className={typography.tintedSection} aria-labelledby="positions-title">
        <Reveal className="container">
          <p className={typography.kicker}>Open positions</p>
          <h2 className={`${typography.heading} ${styles.spacedHeading}`} id="positions-title">Current openings.</h2>
          <div className={styles.empty}>
            <h3 className={styles.emptyTitle}>No open positions right now.</h3>
            <p className={styles.emptyText}>We&apos;re always glad to hear from talented engineers. Send us your CV and we&apos;ll be in touch when a role opens.</p>
            <a className={styles.button} href={cvLink}><Mail aria-hidden="true" size={18} />Send your CV</a>
            <p className={styles.email}>{contactEmail}</p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
