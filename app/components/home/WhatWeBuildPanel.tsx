import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { solutions } from "@/app/data/solutions";
import styles from "./WhatWeBuildPanel.module.css";

export function WhatWeBuildPanel() {
  return (
    <section className={styles.section} aria-labelledby="home-build-title">
      <Reveal className="container">
        <div className={styles.panel}>
          <div>
            <p className={typography.kicker}>What we build</p>
            <h2 className={styles.heading} id="home-build-title">Solutions ready to fit your business.</h2>
            <p className={styles.text}>See the systems we design and deliver, from ERP to AI assistants.</p>
            <Link className={styles.button} href="/work">See what we build <ArrowUpRight aria-hidden="true" size={17} /></Link>
          </div>
          <ul className={styles.tiles}>
            {solutions.map(({ shortTitle, shortTag, icon: Icon }) => (
              <li key={shortTitle} className={styles.tile}>
                <Icon aria-hidden="true" size={20} />
                <span className={styles.tileTitle}>{shortTitle}</span>
                <span className={styles.tileTag}>{shortTag}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
