import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { caseStudyCta, caseStudyNote, caseStudyStatus, caseStudySupport, type CaseStudy } from "@/app/data/case-studies";
import { createPageMetadata } from "@/app/lib/metadata";
import { DashboardMock } from "./DashboardMock";
import { StatusLine } from "./WorkBits";
import styles from "./CaseStudyPage.module.css";

export function caseStudyMetadata(study: CaseStudy) {
  return createPageMetadata({ title: study.metaTitle, description: study.metaDescription, path: `/work/${study.slug}` });
}

// Shared layout for the anonymized business case studies. Uses only the facts in app/data/case-studies.
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const breadcrumb = [{ name: "Home", path: "/" }, { name: "Solutions", path: "/work" }, { name: study.title, path: `/work/${study.slug}` }] as const;
  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[...breadcrumb]} />
      <PageHero breadcrumb={breadcrumb} eyebrow={study.label} title={study.title} />

      <section className={typography.lightSection} aria-labelledby="overview-title">
        <Reveal className={`container ${styles.overview}`}>
          <div>
            <h2 className={styles.heading} id="overview-title">Overview</h2>
            <p className={styles.text}>{study.text}</p>
            <StatusLine>{caseStudyStatus}</StatusLine>
          </div>
          <figure className={styles.figure}>
            <div className={styles.visual}><DashboardMock visual={study.visual} /></div>
            <figcaption className={styles.caption}>{caseStudyNote}</figcaption>
          </figure>
        </Reveal>
      </section>

      <section className={typography.tintedSection} aria-labelledby="built-title">
        <Reveal className="container">
          <h2 className={styles.heading} id="built-title">What we built</h2>
          <ul className={styles.built}>
            {study.built.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Reveal>
      </section>

      <section className={typography.lightSection} aria-labelledby="support-title">
        <Reveal className="container">
          <h2 className={styles.heading} id="support-title">How we support it</h2>
          <p className={styles.text}>{caseStudySupport}</p>
        </Reveal>
      </section>

      <CtaBand heading={caseStudyCta.heading} text={caseStudyCta.text} button={{ label: "Contact us", href: "/contact" }} />
    </main>
  );
}
