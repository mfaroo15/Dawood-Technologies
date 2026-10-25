import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { industries } from "@/app/data/industries";
import styles from "./HomeIndustries.module.css";

export function HomeIndustries() {
  return (
    <section className={styles.section} aria-labelledby="home-industries-title">
      <Reveal className="container">
        <div className={styles.top}>
          <div>
            <p className={typography.kicker}>Industries</p>
            <h2 className={typography.heading} id="home-industries-title">Experience across industries.</h2>
          </div>
          <Link className={styles.all} href="/industries">View all industries <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
        <ul className={styles.pills}>
          {industries.map((industry) => (
            <li key={industry.title}><Link className={styles.pill} href="/industries"><span className={styles.dot} aria-hidden="true" />{industry.title}</Link></li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
