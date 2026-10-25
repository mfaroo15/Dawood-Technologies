import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { AiSolutionsPage } from "@/app/components/AiSolutionsPage";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { PlatformLogos } from "@/app/components/PlatformLogos";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import { ServiceDetails } from "@/app/components/sections/ServiceDetails";
import typography from "@/app/components/sections/typography.module.css";
import { aiSolutionsMetadata } from "@/app/data/ai-solutions";
import { capabilities } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "../services.module.css";

type Props = { params: Promise<{ slug: string }> };

// Lowercase a service name for use mid-sentence, keeping acronyms and mixed-case names (ERP, MVP, DevOps).
const sentenceCase = (title: string) => title.split(" ").map((word) => (/[A-Z].*[A-Z]/.test(word) ? word : word.toLowerCase())).join(" ");

export function generateStaticParams() { return capabilities.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = capabilities.find((entry) => entry.slug === slug);
  if (!item) return {};
  if (slug === "ai-automation") return createPageMetadata({ ...aiSolutionsMetadata, description: item.summary });
  return createPageMetadata({ title: item.title, description: item.summary, path: `/services/${slug}` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const item = capabilities.find((entry) => entry.slug === slug);
  if (!item) notFound();
  if (slug === "ai-automation") return <AiSolutionsPage />;

  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: item.title, path: `/services/${slug}` }]} />
      <PageHero
        title={item.title}
        lead={item.introduction}
        breadcrumb={[{ label: "Services", href: "/services" }, { label: item.title }]}
        buttons={[{ label: "Book an introduction call", href: "/contact" }, { label: "See what we build", href: "/work", variant: "secondary" }]}
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

      <ServiceDetails whoFor={item.whoFor} outcomes={item.outcomes} industries={item.industries} faqs={item.faqs} />

      <section className={typography.lightSection} aria-label="Platforms we work with">
        <Reveal className="container">
          <PlatformLogos names={item.platforms} />
        </Reveal>
      </section>

      <CtaBand heading={"ctaHeading" in item ? item.ctaHeading : `Let's talk about ${sentenceCase(item.title)}.`} text={item.ctaText} />
    </main>
  );
}
