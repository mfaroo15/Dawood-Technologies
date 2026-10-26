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
  if (slug === "ai-automation") return createPageMetadata(aiSolutionsMetadata);
  return createPageMetadata({ title: item.title, description: item.summary, path: `/services/${slug}` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const item = capabilities.find((entry) => entry.slug === slug);
  if (!item) notFound();
  if (slug === "ai-automation") return <AiSolutionsPage />;

  const breadcrumb = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: item.title, path: `/services/${slug}` }] as const;
  const pills = [
    { id: "scope", label: "Scope of work" },
    { id: "who-its-for", label: "Who it's for" },
    { id: "what-you-get", label: "What you get" },
    ...(item.industries.length ? [{ id: "industries", label: "Industries" }] : []),
    ...(item.platforms.length ? [{ id: "platforms", label: "Platforms" }] : []),
    ...(item.faqs.length ? [{ id: "faq", label: "FAQ" }] : []),
  ];

  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[...breadcrumb]} />
      <PageHero
        title={item.title}
        lead={item.introduction}
        breadcrumb={breadcrumb}
        pills={pills}
        buttons={[{ label: "Book an introduction call", href: "/contact" }, { label: "Explore solutions", href: "/work", variant: "secondary" }]}
      />

      <section id="scope" className={typography.lightSection} aria-labelledby="scope-title">
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

      <section id="platforms" className={typography.lightSection} aria-label="Platforms we work with">
        <Reveal className="container">
          <PlatformLogos names={item.platforms} />
        </Reveal>
      </section>

      <CtaBand heading={"ctaHeading" in item ? item.ctaHeading : `Let's talk about ${sentenceCase(item.title)}.`} text={item.ctaText} />
    </main>
  );
}
