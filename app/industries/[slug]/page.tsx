import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CircleCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { Faq } from "@/app/components/sections/Faq";
import { LinkPills } from "@/app/components/sections/IndustryPills";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { industries, type Industry } from "@/app/data/industries";
import { capabilities } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./industry.module.css";

type Props = { params: Promise<{ slug: string }> };

const pills = [
  { id: "challenges", label: "Challenges" },
  { id: "capabilities", label: "Capabilities" },
  { id: "outcomes", label: "Outcomes" },
  { id: "services", label: "Services" },
  { id: "faq", label: "FAQ" },
];

// Meta description: the intro plus the longest closing line that keeps it within 140-160 characters.
const descriptionEndings = [
  "Dawood Technologies designs, builds and supports these systems for your business.",
  "Designed, built and supported by Dawood Technologies.",
  "Built and supported by Dawood Technologies.",
  "From Dawood Technologies.",
];
function describe({ slug, intro }: Industry) {
  const description = descriptionEndings.map((ending) => `${intro} ${ending}`).find((text) => text.length >= 140 && text.length <= 160);
  if (!description) throw new Error(`No 140-160 character description fits the "${slug}" intro`);
  return description;
}

const serviceTitle = (slug: string) => {
  const service = capabilities.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service "${slug}"`);
  return service.title;
};

export function generateStaticParams() { return industries.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) return {};
  return createPageMetadata({ title: `${industry.name} Technology Solutions | Dawood Technologies`, description: describe(industry), path: industry.href });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const index = industries.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const industry = industries[index];
  const previous = industries[(index - 1 + industries.length) % industries.length];
  const next = industries[(index + 1) % industries.length];
  const breadcrumb = [{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }, { name: industry.name, path: industry.href }] as const;

  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[...breadcrumb]} />
      <PageHero breadcrumb={breadcrumb} title={industry.heading} lead={industry.intro} pills={pills} />

      <section id="challenges" className={typography.lightSection} aria-labelledby="challenges-title">
        <Reveal className="container">
          <p className={typography.kicker}>Challenges</p>
          <h2 className={`${typography.heading} ${styles.spacedHeading}`} id="challenges-title">Common challenges</h2>
          <ul className={`${styles.row} ${styles.three}`}>
            {industry.challenges.map((item) => (
              <li key={item.title}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="capabilities" className={typography.tintedSection} aria-labelledby="capabilities-title">
        <Reveal className="container">
          <p className={typography.kicker}>Capabilities</p>
          <h2 className={`${typography.heading} ${styles.spacedHeading}`} id="capabilities-title">Our capabilities</h2>
          <ul className={`${styles.row} ${styles.two}`}>
            {industry.capabilities.map((item) => (
              <li key={item.title}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
                <ul className={styles.points}>
                  {item.points.map((point) => <li key={point}><CircleCheck aria-hidden="true" size={16} />{point}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="outcomes" className={typography.lightSection} aria-labelledby="outcomes-title">
        <Reveal className="container">
          <p className={typography.kicker}>Outcomes</p>
          <h2 className={`${typography.heading} ${styles.spacedHeading}`} id="outcomes-title">Possible business outcomes</h2>
          <ul className={`${styles.row} ${styles.three}`}>
            {industry.outcomes.map((item) => (
              <li key={item.title}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
              </li>
            ))}
          </ul>
          <p className={styles.note}>Outcomes depend on each business and project.</p>
        </Reveal>
      </section>

      <section id="services" className={typography.tintedSection} aria-labelledby="services-title">
        <Reveal className="container">
          <p className={typography.kicker}>Services</p>
          <h2 className={`${typography.heading} ${styles.spacedHeading}`} id="services-title">Services for {industry.name}</h2>
          <LinkPills onTint items={industry.services.map((service) => ({ label: serviceTitle(service), href: `/services/${service}` }))} />
        </Reveal>
      </section>

      <section id="faq" className={typography.lightSection} aria-labelledby="faq-title">
        <Reveal className={`container ${styles.split}`}>
          <div>
            <p className={typography.kicker}>FAQ</p>
            <h2 className={typography.heading} id="faq-title">Common questions</h2>
          </div>
          <Faq items={industry.faqs} />
        </Reveal>
      </section>

      <CtaBand heading={`Let's talk about your ${industry.name} project.`} text={industry.cta} button={{ label: "Book a call", href: "/contact" }} />

      <nav className={`container ${styles.pager}`} aria-label="More industries">
        <Link href={previous.href} className={styles.previous}>
          <span className={styles.direction}><ChevronLeft aria-hidden="true" size={16} />Previous</span>
          {previous.name}
        </Link>
        <Link href={next.href} className={styles.next}>
          <span className={styles.direction}>Next<ChevronRight aria-hidden="true" size={16} /></span>
          {next.name}
        </Link>
      </nav>
    </main>
  );
}
