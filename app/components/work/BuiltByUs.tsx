import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { psx } from "@/app/data/case-studies";
import { PhoneMockup } from "./PhoneMockup";
import { Chips, LiveBadge, PsxPoints } from "./WorkBits";
import styles from "./BuiltByUs.module.css";

export function BuiltByUs() {
  return (
    <section className={styles.section} id="built-by-us" aria-labelledby="built-by-us-title">
      <Reveal className="container">
        <p className={styles.eyebrow}>Built by us</p>
        <h2 className={`${typography.heading} ${styles.heading}`} id="built-by-us-title">Products we build and run.</h2>
        <p className={typography.introOnDark}>Software designed, engineered and operated by our team, from first idea to live, always-on service.</p>

        <div className={styles.layout}>
          <article className={styles.card}>
            <LiveBadge />
            <h3 className={styles.name}>{psx.name}</h3>
            <p className={styles.tagline}>{psx.tagline}</p>
            <p className={styles.text}>{psx.text}</p>
            <PsxPoints onDark />
            <div className={styles.chips}><Chips items={psx.chips} onDark /></div>
            <Link className={styles.button} href="/work/psx-sharia-alerts">View case study<span className="visually-hidden">: {psx.name}</span> <ArrowUpRight aria-hidden="true" size={17} /></Link>
          </article>
          <PhoneMockup />
        </div>

        <p className={styles.note}>{psx.disclaimer}</p>
      </Reveal>
    </section>
  );
}
