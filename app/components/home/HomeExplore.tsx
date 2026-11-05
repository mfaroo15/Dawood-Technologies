import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { industries } from "@/app/data/industries";
import { solutions } from "@/app/data/solutions";
import styles from "./HomeExplore.module.css";

const engagementModels = [
  { title: "Project-based delivery", text: "Defined scope, timeline and deliverables." },
  { title: "Dedicated team", text: "An extension of your team, scaled as you need." },
  { title: "Ongoing support & managed IT", text: "Monthly support with a named point of contact." },
];

function LinkRows({ links, twoColumns = false }: { links: { href: string; label: string }[]; twoColumns?: boolean }) {
  return (
    <ul className={`${styles.rows} ${twoColumns ? styles.twoColumns : ""}`}>
      {links.map(({ href, label }) => (
        <li key={href}><Link className={styles.row} href={href}>{label}<ChevronRight aria-hidden="true" size={16} /></Link></li>
      ))}
    </ul>
  );
}

export function HomeExplore() {
  return (
    <section className={styles.section} aria-labelledby="home-explore-title">
      <Reveal className="container">
        <p className={typography.kicker}>Explore</p>
        <h2 className={`${typography.heading} ${styles.heading}`} id="home-explore-title">Find what fits your business.</h2>
        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.industries}`}>
            <div className={styles.cardHead}>
              <h3 className={styles.cardTitle}>Industries</h3>
              <Link className={styles.all} href="/industries">All industries <ArrowRight aria-hidden="true" size={16} /></Link>
            </div>
            <LinkRows twoColumns links={industries.map(({ href, shortTitle, name }) => ({ href, label: shortTitle ?? name }))} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h3 className={styles.cardTitle}>Solutions</h3>
              <Link className={styles.all} href="/work">All solutions <ArrowRight aria-hidden="true" size={16} /></Link>
            </div>
            <LinkRows links={solutions.map(({ id, shortTitle }) => ({ href: `/work#${id}`, label: shortTitle }))} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h3 className={styles.cardTitle}><Link className={styles.titleLink} href="/services#engagement-models">How we work with you <ArrowRight aria-hidden="true" size={18} /></Link></h3>
            </div>
            <ul className={styles.models}>
              {engagementModels.map(({ title, text }) => (
                <li key={title}>
                  <p className={styles.modelTitle}>{title}</p>
                  <p className={styles.modelText}>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
