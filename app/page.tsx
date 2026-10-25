import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/app/components/ButtonLink";
import { AiSpotlight } from "@/app/components/home/AiSpotlight";
import { HomeIndustries } from "@/app/components/home/HomeIndustries";
import { HomeServices } from "@/app/components/home/HomeServices";
import { WhatWeBuildPanel } from "@/app/components/home/WhatWeBuildPanel";
import HeroOcean from "@/app/components/HeroOcean";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { EngagementModels } from "@/app/components/sections/EngagementModels";
import { ProcessSteps } from "@/app/components/sections/ProcessSteps";
import { Reveal } from "@/app/components/sections/Reveal";
import { StatCards } from "@/app/components/sections/StatCards";
import typography from "@/app/components/sections/typography.module.css";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./home.module.css";

const homeDescription = "Dawood Technologies provides IT consulting, software development, cloud infrastructure, enterprise networking, automation, and business technology solutions.";

export const metadata: Metadata = {
  ...createPageMetadata({ title: "Dawood Technologies | IT Infrastructure & Business Systems", description: homeDescription, path: "/" }),
  title: { absolute: "Dawood Technologies | IT Infrastructure & Business Systems" },
};

export default function Home() {
  return <main id="main-content" className={styles.home}>
    <section className={`${styles.hero} ${styles.tinted}`} aria-labelledby="home-title">
      <HeroOcean />
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className={`container ${styles.heroContent}`}>
        <p className={`kicker ${styles.label}`}>SOFTWARE · ERP · CLOUD · AI</p>
        <h1 className={styles.heroHeading} id="home-title"><span className={styles.heroLine}>Technology built</span> <span className={styles.heroLine}>around how businesses</span> <span className="hero-word-rotator" aria-hidden="true"><span>operate.</span><span>connect.</span><span>scale.</span><span>evolve.</span></span><span className="visually-hidden">operate.</span></h1>
        <p className={styles.heroDescription}>We build websites, custom software, ERP systems and AI assistants, and run the cloud and IT behind them, for businesses worldwide.</p>
        <div className={styles.actions}>
          <ButtonLink href="/services" variant="primary">Explore Our Services <ArrowUpRight size={17} aria-hidden="true" /></ButtonLink>
          <ButtonLink href="/company" variant="secondary">About Us <ArrowUpRight size={17} aria-hidden="true" /></ButtonLink>
        </div>
      </div>
    </section>

    <HomeServices />

    <section className={typography.lightSection} aria-labelledby="why-title">
      <Reveal className="container">
        <p className={typography.kicker}>Why Dawood Technologies</p>
        <h2 className={typography.heading} id="why-title">A team built for delivery.</h2>
        <p className={typography.intro}>The people, presence and experience behind every project.</p>
        <StatCards />
      </Reveal>
    </section>

    <AiSpotlight />
    <HomeIndustries />
    <WhatWeBuildPanel />
    <EngagementModels tinted />

    <section className={typography.lightSection} aria-labelledby="process-title">
      <Reveal className="container">
        <p className={typography.kicker}>How we work</p>
        <h2 className={typography.heading} id="process-title">From first conversation to running system.</h2>
        <p className={typography.intro}>A clear process, with the same team responsible from planning through day-to-day support.</p>
        <ProcessSteps />
      </Reveal>
    </section>

    <CtaBand heading="Bring us the business challenge." />
  </main>;
}
