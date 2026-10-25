import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { solutions } from "@/app/data/solutions";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./work.module.css";

export const metadata = createPageMetadata({
  title: "What We Build | Dawood Technologies",
  description: "Dawood Technologies builds ERP and inventory systems, AI chatbots and agents, business websites, custom web apps, cloud and IT support, and dashboards.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "What We Build", path: "/work" }]} />
      <PageHero kicker="What we build" title="Solutions built around how your business runs." lead="Practical systems we design, build and support, from first idea to day-to-day use." />

      <section className={typography.lightSection} aria-label="Solutions">
        <Reveal className="container">
          <p className={styles.note}>These are solutions we offer. Client case studies will be added here as projects are delivered.</p>
          <ul className={styles.solutions}>
            {solutions.map(({ title, audience, problem, build, stack, icon: Icon, service }) => (
              <li key={title} className={styles.solution}>
                <span className={styles.icon}><Icon aria-hidden="true" size={22} /></span>
                <h2 className={styles.title}>{title}</h2>
                {audience ? <p className={styles.audience}>{audience}</p> : null}
                <h3 className={styles.label}>The problem</h3>
                <p className={styles.text}>{problem}</p>
                <h3 className={styles.label}>What we build</h3>
                <p className={styles.text}>{build}</p>
                <h3 className={styles.label}>Typical stack</h3>
                <ul className={styles.stack}>
                  {stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Link className={styles.link} href={service.href}>{service.label} <ArrowRight aria-hidden="true" size={16} /></Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <CtaBand heading="Have a project in mind?" button={{ label: "Book a consultation", href: "/contact" }} />
    </main>
  );
}
