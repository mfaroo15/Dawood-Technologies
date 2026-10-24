import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BrowserFrame } from "@/app/components/sections/BrowserFrame";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { work } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./work.module.css";

export const metadata = createPageMetadata({ title: "Our Work & Technology Projects | Dawood Technologies", description: "Case studies from businesses that rely on our technology every day, from public websites to the ERP and CRM behind their operations.", path: "/work" });

const systems = ["Company website", "Product catalogue", "Inventory management", "CRM for clients & enquiries", "ERP", "Records & reporting"];

export default function WorkPage() {
  return (
    <main id="main-content">
      <PageHero kicker="Our work" title="Systems we build and run." lead="Case studies from businesses that rely on our technology every day, from public websites to the ERP and CRM behind their operations." />

      <section className={typography.lightSection} aria-label="Case studies">
        <Reveal className="container">
          <ul className={styles.cards}>
            {work.map((item) => (
              <li key={item.slug} className={styles.card}>
                <div className={styles.shotArea}>
                  <BrowserFrame src={item.image} alt={`${item.name} website`} domain={item.domain} sizes="(max-width: 900px) 100vw, 50vw" />
                </div>
                <div className={styles.body}>
                  <p className={styles.tagWrap}><span className={typography.tag}>{item.industry}</span></p>
                  <h2 className={styles.cardTitle}>{item.name}</h2>
                  <p className={styles.cardText}>{item.summary}</p>
                  <ul className={styles.systems} aria-label="Systems">
                    {systems.map((system) => <li key={system}>{system}</li>)}
                  </ul>
                  <Link className={styles.readMore} href={`/work/${item.slug}`}>Read case study<span className="visually-hidden">: {item.name}</span> <ArrowRight aria-hidden="true" size={17} /></Link>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.banner}>
            <div>
              <h2 className={styles.bannerTitle}>Your project could be next.</h2>
              <p className={styles.bannerText}>Tell us what your business needs technology to do.</p>
            </div>
            <Link className={styles.button} href="/contact">Book an introduction call <ArrowUpRight aria-hidden="true" size={17} /></Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
