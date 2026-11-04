import Link from "next/link";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { BuiltByUs } from "@/app/components/work/BuiltByUs";
import { CaseStudyCard } from "@/app/components/work/CaseStudyCard";
import { caseStudies, caseStudyNote } from "@/app/data/case-studies";
import { solutions } from "@/app/data/solutions";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./work.module.css";

export const metadata = createPageMetadata({
  title: "Our Work and Solutions | Dawood Technologies",
  description: "Websites, ERP and CRM we have designed, built and continue to operate, plus the PSX Sharia Alerts product and the solutions we build for growing businesses.",
  path: "/work",
});

const breadcrumb = [{ name: "Home", path: "/" }, { name: "Solutions", path: "/work" }] as const;

export default function WorkPage() {
  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[...breadcrumb]} />
      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="Our work"
        title="Systems that run real businesses."
        lead="Websites, ERP and CRM we have designed, built and continue to operate."
        pills={[{ id: "case-studies", label: "Case studies" }, { id: "built-by-us", label: "Built by us" }]}
      />

      <section className={styles.caseStudies} id="case-studies" aria-labelledby="case-studies-title">
        <Reveal className="container">
          <h2 className="visually-hidden" id="case-studies-title">Case studies</h2>
          <div className={styles.caseGrid}>
            {caseStudies.map((study) => <CaseStudyCard study={study} key={study.slug} />)}
          </div>
          <p className={styles.caseNote}>{caseStudyNote}</p>
        </Reveal>
      </section>

      <BuiltByUs />

      {solutions.map((solution, index) => (
        <section key={solution.id} id={solution.id} className={`${styles.solution} ${index % 2 ? styles.alt : ""}`} aria-labelledby={`${solution.id}-title`}>
          <Reveal className="container-text">
            <p className={typography.kicker}>{solution.eyebrow}</p>
            <h2 className={styles.title} id={`${solution.id}-title`}>{solution.title}</h2>
            <p className={styles.intro}>{solution.intro}</p>

            <dl className={styles.facts}>
              <div><dt>The challenge</dt><dd>{solution.challenge}</dd></div>
              <div><dt>What we deliver</dt><dd>{solution.deliver}</dd></div>
              <div><dt>What changes</dt><dd>{solution.changes}</dd></div>
            </dl>

            <ul className={styles.features}>
              {solution.features.map((feature) => (
                <li key={feature.title}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureText}>{feature.text}</p>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <p className={styles.builtWith}>Built with {solution.builtWith.join(" · ")}</p>
              <Link className={styles.discuss} href="/contact">Discuss this solution<span className="visually-hidden">: {solution.title}</span> <span aria-hidden="true">›</span></Link>
            </div>
          </Reveal>
        </section>
      ))}

      <CtaBand heading="Have a project in mind?" text="Share what you want to build and we'll show you how we'd approach it." button={{ label: "Book a consultation", href: "/contact" }} />
    </main>
  );
}
