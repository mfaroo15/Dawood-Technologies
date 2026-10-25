import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { AiNexusPage } from "@/app/components/AiNexusPage";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import { TechChips } from "@/app/components/sections/TechChips";
import typography from "@/app/components/sections/typography.module.css";
import { aiNexusMetadata } from "@/app/data/ai-nexus";
import { capabilities } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "../services.module.css";

type Props = { params: Promise<{ slug: string }> };

const fallbackTechnologies = ["Microsoft Azure", "AWS", "Google Cloud", "Microsoft 365"];

export function generateStaticParams() { return capabilities.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "ai-automation") return createPageMetadata(aiNexusMetadata);
  const item = capabilities.find((entry) => entry.slug === slug);
  return item ? createPageMetadata({ title: item.title, description: item.summary, path: `/services/${slug}` }) : {};
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const item = capabilities.find((entry) => entry.slug === slug);
  if (!item) notFound();
  if (slug === "ai-automation") return <AiNexusPage />;

  const listed = [...item.platforms.map((platform) => platform.name), ...item.engineeringTechnologies];
  const technologies = listed.length ? listed : fallbackTechnologies;

  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: item.title, path: `/services/${slug}` }]} />
      <PageHero
        kicker="Service"
        title={item.title}
        lead={item.introduction}
        breadcrumb={[{ label: "Services", href: "/services" }, { label: item.title }]}
        buttons={[{ label: "Book an introduction call", href: "/contact" }, { label: "See our work", href: "/work", variant: "secondary" }]}
      />

      <section className={typography.lightSection} aria-labelledby="scope-title">
        <Reveal className={`container ${styles.split}`}>
          <div>
            <p className={typography.kicker}>What we deliver</p>
            <h2 className={`${typography.heading} ${styles.splitHeading}`} id="scope-title">Scope of work.</h2>
            <p className={styles.splitIntro}>Each project is scoped around your users, workflows and existing systems.</p>
          </div>
          <ul className={styles.checklist}>
            {item.items.map((entry) => <li key={entry}><CircleCheck aria-hidden="true" size={20} />{entry}</li>)}
          </ul>
        </Reveal>
      </section>

      <section className={typography.tintedSection} aria-labelledby="tech-title">
        <Reveal className="container">
          <p className={typography.kicker}>Technologies</p>
          <h2 className={`${typography.heading} ${styles.spacedHeading}`} id="tech-title">What we build with.</h2>
          <TechChips items={technologies} />
        </Reveal>
      </section>

      <CtaBand heading={"ctaHeading" in item ? item.ctaHeading : `Let's talk about ${item.title.toLowerCase()}.`} />
    </main>
  );
}
