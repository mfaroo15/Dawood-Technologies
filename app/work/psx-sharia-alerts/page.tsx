import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { PhoneMockup } from "@/app/components/work/PhoneMockup";
import { LiveBadge, PsxPoints } from "@/app/components/work/WorkBits";
import styles from "@/app/components/work/CaseStudyPage.module.css";
import { caseStudyCta, psx } from "@/app/data/case-studies";
import { createPageMetadata } from "@/app/lib/metadata";

export const metadata = createPageMetadata({
  title: "PSX Sharia Alerts Case Study",
  description: "A mobile alerts service built and run by Dawood Technologies: Shariah-compliant stock alerts for the Pakistan Stock Exchange, with early-warning notifications.",
  path: "/work/psx-sharia-alerts",
});

const breadcrumb = [{ name: "Home", path: "/" }, { name: "Solutions", path: "/work" }, { name: psx.name, path: "/work/psx-sharia-alerts" }] as const;

export default function PsxShariaAlertsPage() {
  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[...breadcrumb]} />
      <PageHero breadcrumb={breadcrumb} eyebrow="Built by us" title={psx.name} lead={psx.tagline}>
        <div className={styles.heroPhone}>
          <LiveBadge />
          <PhoneMockup />
        </div>
      </PageHero>

      <section className={typography.lightSection} aria-labelledby="problem-title">
        <Reveal className="container">
          <h2 className={styles.heading} id="problem-title">The problem</h2>
          <p className={styles.lead}>{psx.problem}</p>
        </Reveal>
      </section>

      <section className={typography.tintedSection} aria-labelledby="built-title">
        <Reveal className="container">
          <h2 className={styles.heading} id="built-title">What we built</h2>
          <p className={styles.lead}>{psx.text}</p>
          <div className={styles.pointsWrap}><PsxPoints /></div>
        </Reveal>
      </section>

      <section className={typography.lightSection} aria-labelledby="how-title">
        <Reveal className="container">
          <h2 className={styles.heading} id="how-title">How it works</h2>
          <ol className={styles.steps}>
            {psx.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </Reveal>
      </section>

      <section className={typography.tintedSection} aria-labelledby="technology-title">
        <Reveal className="container">
          <h2 className={styles.heading} id="technology-title">Technology</h2>
          <ul className={styles.built}>
            {psx.technology.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Reveal>
      </section>

      <p className={`container ${styles.disclaimer}`}>{psx.disclaimer}</p>

      <CtaBand heading={caseStudyCta.heading} text={caseStudyCta.text} button={{ label: "Contact us", href: "/contact" }} />
    </main>
  );
}
