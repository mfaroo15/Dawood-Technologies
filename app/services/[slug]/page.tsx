import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ContactBand } from "@/app/components/ContactBand";
import { InnerHero } from "@/app/components/InnerHero";
import { TechnologyLogo } from "@/app/components/TechnologyLogo";
import { capabilities } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

// These shorter hero headings use the bounded editorial pair; longer heroes retain their existing proportions.
const compactHeroSlugs = new Set(["application-development", "cybersecurity", "data-services", "managed-technology", "technology-consulting"]);
export function generateStaticParams() { return capabilities.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const item = capabilities.find((entry) => entry.slug === slug); return item ? createPageMetadata({ title: item.title, description: item.summary, path: `/services/${slug}` }) : {}; }
export default async function ServicePage({ params }: Props) { const { slug } = await params; const item = capabilities.find((entry) => entry.slug === slug); if (!item) notFound(); return <main id="main-content"><InnerHero compact={compactHeroSlugs.has(slug)} kicker="SERVICE" title={item.title} intro={item.introduction} />
  <section className="section capability-detail-section"><div className="container numbered-section"><div className="section-marker"><p>SERVICES</p></div><div className="section-body"><h2>Scope of work.</h2><div className="service-editorial-grid">{item.items.map((service) => <article key={service}><h3>{service}</h3></article>)}</div></div></div></section>
  <section className="section capability-platform-section"><div className="container numbered-section"><div className="section-marker"><p>TECHNOLOGY</p></div><div className="section-body"><h2>Technology selected for the environment.</h2>{item.platforms.length || item.engineeringTechnologies.length ? <div className="service-technology"><div><h3>Technology Ecosystem</h3>{item.platforms.length ? <div className="capability-platform-grid">{item.platforms.map((platform) => <TechnologyLogo key={platform.name} {...platform} />)}</div> : <p className="platform-context">Platforms are selected around the existing environment and requirements.</p>}</div>{item.engineeringTechnologies.length ? <div className="service-engineering-technologies"><h3>Engineering Technologies</h3><p>{item.engineeringTechnologies.join(" · ")}</p></div> : null}</div> : <p className="platform-context">The technology stack is selected after reviewing the existing environment, requirements and risk profile.</p>}</div></div></section>
  <section className="section capability-industries-section"><div className="container numbered-section"><div className="section-marker"><p>RELEVANT INDUSTRIES</p></div><div className="section-body"><h2>Industries where this service applies.</h2><p className="section-intro">This list identifies applicable markets; it does not represent completed work in every sector.</p><div className="relevant-industry-list">{item.industries.map((industry) => <Link href="/industries" key={industry}>{industry}<ArrowRight aria-hidden="true" size={17} /></Link>)}</div></div></div></section><ContactBand title={`Let's talk about ${item.title.toLowerCase()}.`} /></main>; }
