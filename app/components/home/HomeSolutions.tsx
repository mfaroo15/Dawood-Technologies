import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { solutions } from "@/app/data/solutions";
import styles from "./HomeSolutions.module.css";

// Homepage teaser: the six solutions, each linking to its section on /work.
export function HomeSolutions() {
  return (
    <section className={styles.section} aria-labelledby="home-solutions-title">
      <Reveal className="container">
        <p className={typography.kicker}>Solutions</p>
        <h2 className={typography.heading} id="home-solutions-title">Solutions ready to fit your business.</h2>
        <p className={typography.intro}>See the systems we design and deliver, from ERP to AI assistants.</p>
        <ul className={styles.list}>
          {solutions.map(({ id, shortTitle }) => (
            <li key={id}><Link href={`/work#${id}`}>{shortTitle} <span aria-hidden="true">›</span></Link></li>
          ))}
        </ul>
        <Link className={styles.button} href="/work">Explore solutions <ArrowUpRight aria-hidden="true" size={17} /></Link>
      </Reveal>
    </section>
  );
}
