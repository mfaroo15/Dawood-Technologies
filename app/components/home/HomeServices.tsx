import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { serviceCards } from "@/app/data/service-cards";
import styles from "./HomeServices.module.css";

// AI Solutions is the dark featured card.
const featuredSlug = "ai-automation";

export function HomeServices() {
  return (
    <section className={styles.section} aria-labelledby="home-services-title">
      <Reveal className="container">
        <p className={typography.kicker}>What we do</p>
        <h2 className={typography.heading} id="home-services-title">Services built around how your business runs.</h2>
        <p className={typography.intro}>From the first website to the systems behind daily operations, one team designs, builds and supports it.</p>
        <ul className={styles.grid}>
          {serviceCards.filter((card) => card.onHome).map(({ slug, title, text, href, icon: Icon }) => {
            const featured = slug === featuredSlug;
            return (
              <li key={slug}>
                <Link className={`${styles.card} ${featured ? styles.featured : ""}`} href={href}>
                  <span className={styles.icon}><Icon aria-hidden="true" size={22} /></span>
                  <h3 className={styles.title}>
                    {title}
                    {featured ? <span className={styles.badge}>New</span> : null}
                  </h3>
                  <p className={styles.text}>{text}</p>
                  <span className={styles.more}>Explore <ArrowRight aria-hidden="true" size={16} /></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
