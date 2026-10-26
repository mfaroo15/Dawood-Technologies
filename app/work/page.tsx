import Link from "next/link";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { solutions } from "@/app/data/solutions";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./work.module.css";

export const metadata = createPageMetadata({
  title: "Solutions | Dawood Technologies",
  description: "ERP and inventory systems, AI assistants, business websites, web apps and SaaS, cloud and IT, and dashboards, designed, built and supported by one team.",
  path: "/work",
});

const breadcrumb = [{ name: "Home", path: "/" }, { name: "Solutions", path: "/work" }] as const;

export default function WorkPage() {
  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[...breadcrumb]} />
      <PageHero
        breadcrumb={breadcrumb}
        title="Solutions."
        lead="Proven systems for the problems growing businesses face every day. Designed, built and supported by one team."
        pills={solutions.map(({ id, shortTitle }) => ({ id, label: shortTitle }))}
      />

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

      <p className={`container-text ${styles.caseNote}`}>Client case studies will be added as projects are delivered.</p>

      <CtaBand heading="Have a project in mind?" text="Share what you want to build and we'll show you how we'd approach it." button={{ label: "Book a consultation", href: "/contact" }} />
    </main>
  );
}
