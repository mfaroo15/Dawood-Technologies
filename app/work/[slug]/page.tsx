import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Boxes, ChartLine, Globe, LayoutGrid, Package, Users } from "lucide-react";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { BrowserFrame } from "@/app/components/sections/BrowserFrame";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { IconTiles } from "@/app/components/sections/IconTiles";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { work } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "../work.module.css";

type Props = { params: Promise<{ slug: string }> };

// Icons follow the order of each project's `built` list.
const builtIcons = [Globe, Package, Boxes, Users, LayoutGrid, ChartLine];

const results = [
  { value: "Live", text: "systems in daily use by the business" },
  { value: "1 team", text: "responsible for building, hosting and support" },
  { value: "Ongoing", text: "improvements as the business grows" },
];

export function generateStaticParams() { return work.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = work.find((item) => item.slug === slug);
  return project ? createPageMetadata({ title: project.name, description: project.summary, path: `/work/${slug}` }) : {};
}

export default async function WorkDetail({ params }: Props) {
  const { slug } = await params;
  const index = work.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const project = work[index];
  const next = work[(index + 1) % work.length];
  const meta = [
    { label: "Client", value: project.name },
    { label: "Industry", value: project.industry },
    { label: "Services", value: project.services },
    { label: "Status", value: "Live and supported daily" },
  ];

  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Our Work", path: "/work" }, { name: project.name, path: `/work/${slug}` }]} />
      <PageHero breadcrumb={[{ label: "Our Work", href: "/work" }, { label: project.name }]} tag={project.industry} title={project.title} wideTitle>
        <dl className={styles.meta}>
          {meta.map((entry) => <div key={entry.label}><dt>{entry.label}</dt><dd>{entry.value}</dd></div>)}
        </dl>
        <div className={styles.heroShot}>
          <BrowserFrame src={project.image} alt={`${project.name} website`} domain={project.domain} sizes="(max-width: 1440px) 100vw, 1312px" preload />
        </div>
      </PageHero>

      <section className={typography.lightSection} aria-labelledby="challenge-title">
        <Reveal className={`container ${styles.split}`}>
          <div>
            <p className={typography.kicker}>The challenge</p>
            <h2 className={typography.heading} id="challenge-title">{project.challengeHeading}</h2>
          </div>
          <p className={styles.challengeText}>{project.challenge}</p>
        </Reveal>
      </section>

      <section className={typography.tintedSection} aria-labelledby="built-title">
        <Reveal className="container">
          <p className={typography.kicker}>What we built</p>
          <h2 className={typography.heading} id="built-title">{project.builtHeading}</h2>
          <p className={typography.intro}>Each part is designed, built and run by our team.</p>
          <IconTiles columns={3} items={project.built.map((item, i) => ({ ...item, icon: builtIcons[i] }))} />
        </Reveal>
      </section>

      <section className={typography.darkSection} aria-labelledby="results-title">
        <Reveal className="container">
          <p className={typography.kickerOnDark}>Results</p>
          <h2 className={`${typography.heading} ${styles.spacedHeading}`} id="results-title">Where things stand today.</h2>
          <ul className={styles.results}>
            {results.map((result) => (
              <li key={result.value} className={styles.result}>
                <span className={styles.resultValue}>{result.value}</span>
                <p className={styles.resultText}>{result.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className={styles.nextSection} aria-label="Next case study">
        <Reveal className="container">
          <Link className={styles.next} href={`/work/${next.slug}`}>
            <span>
              <span className={styles.nextLabel}>Next case study</span>
              <span className={styles.nextName}>{next.name}</span>
            </span>
            <ArrowRight aria-hidden="true" size={24} />
          </Link>
        </Reveal>
      </section>

      <CtaBand heading={project.ctaHeading} />
    </main>
  );
}
