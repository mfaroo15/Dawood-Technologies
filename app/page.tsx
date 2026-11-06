import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/app/components/ButtonLink";
import { AiSpotlight } from "@/app/components/home/AiSpotlight";
import { HomeExplore } from "@/app/components/home/HomeExplore";
import { HomeIntegrations } from "@/app/components/home/HomeIntegrations";
import { HomeServices } from "@/app/components/home/HomeServices";
import { TechStrip } from "@/app/components/home/TechStrip";
import { HeroVideo } from "@/app/components/home/HeroVideo";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./home.module.css";

const homeDescription = "Dawood Technologies provides IT consulting, software development, cloud infrastructure, enterprise networking, automation, and business technology solutions.";

export const metadata: Metadata = {
  ...createPageMetadata({ title: "Dawood Technologies | Digital Engineering & IT Services", description: homeDescription, path: "/" }),
  title: { absolute: "Dawood Technologies | Digital Engineering & IT Services" },
};

export default function Home() {
  return <main id="main-content" className={styles.home}>
    <section className={`${styles.hero} ${styles.tinted}`} aria-labelledby="home-title">
      <HeroVideo />
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className={`container ${styles.heroContent}`}>
        <p className={`kicker ${styles.label}`}>Software · ERP · Cloud · AI</p>
        <h1 className={styles.heroHeading} id="home-title">
          <span className={styles.heroLine}>Technology built around</span>{" "}
          <span className={styles.heroLine}>how businesses <span className="hero-word-rotator" aria-hidden="true"><span>operate.</span><span>connect.</span><span>scale.</span><span>evolve.</span></span><span className="visually-hidden">operate.</span></span>
        </h1>
        <p className={styles.heroDescription}>We build websites, custom software, ERP systems and AI assistants, and run the cloud and IT behind them, for businesses worldwide.</p>
        <div className={styles.actions} data-wa-avoid="children">
          <ButtonLink href="/services" variant="primary">Explore Our Services <ArrowUpRight size={17} aria-hidden="true" /></ButtonLink>
          <ButtonLink href="/company" variant="secondary">About Us <ArrowUpRight size={17} aria-hidden="true" /></ButtonLink>
        </div>
      </div>
    </section>

    <TechStrip />

    <HomeServices />
    <HomeIntegrations />

    <AiSpotlight />
    <HomeExplore />

    <CtaBand heading="Bring us the business challenge." text="Book a 30-minute call and leave with a clear next step for your project." />
  </main>;
}
