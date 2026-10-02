import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { EngineeringModel } from "@/app/components/EngineeringModel";
import { TechnologyEcosystem } from "@/app/components/TechnologyEcosystem";
import { capabilities, contactPhone, foundingYear, industries, siteUrl, solutions, work } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./home.module.css";

const homeDescription = "Technology capability developed through operating businesses, spanning applications, cloud, data, security, automation and ongoing operations.";

const operatingApproach = [
  { code: "01", title: "Understand", description: "Operating requirements and existing systems." },
  { code: "02", title: "Design", description: "Architecture, applications and infrastructure." },
  { code: "03", title: "Implement", description: "Engineering, integration and deployment." },
  { code: "04", title: "Operate", description: "Monitoring, support and continuous improvement." },
];

// Homepage families provide a short entry point; the detailed service catalog stays intact.
const homepageCapabilities = [
  { title: "Applications", slug: "application-development", description: capabilities[3].summary },
  { title: "Enterprise Systems", slug: "enterprise-erp", description: capabilities[4].summary },
  { title: "Cloud & Infrastructure", slug: "cloud-devops", description: capabilities[2].summary },
  { title: "Data & Automation", slug: "data-services", description: "Data pipelines, analytics, AI applications and workflow automation." },
  { title: "Managed Technology", slug: "managed-technology", description: capabilities[7].summary },
];

export const metadata: Metadata = {
  ...createPageMetadata({ title: "Dawood Technologies | IT Infrastructure & Business Systems", description: homeDescription, path: "/" }),
  title: { absolute: "Dawood Technologies | IT Infrastructure & Business Systems" },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Dawood Technologies",
        url: `${siteUrl}/`,
        logo: `${siteUrl}/dawood-technologies-logo.png`,
        telephone: contactPhone.schema,
        foundingDate: String(foundingYear),
        description: "Dawood Technologies grew from the technology needs of operating businesses and designs, builds, modernizes and supports business technology.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Dawood Technologies",
        url: `${siteUrl}/`,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
  return <main id="main-content" className={styles.home}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <section className="home-hero" aria-labelledby="approach-title"><div className="container approach-hero"><header className="approach-intro"><p className="kicker">OUR APPROACH</p><h1 id="approach-title"><span className="hero-heading-line">Engineering technology</span><span className="hero-heading-line">around how businesses</span><span className="hero-word-rotator" aria-hidden="true"><span>operate.</span><span>connect.</span><span>scale.</span><span>evolve.</span></span><span className="visually-hidden">operate.</span></h1><p>Dawood Technologies designs, implements and supports technology across applications, data, cloud infrastructure, enterprise networking and day-to-day technology operations.</p></header></div></section>

    <section className="section home-origin"><div className="container"><div className="editorial-intro story-grid"><div><p className="kicker">BUILT FROM OPERATING EXPERIENCE</p><h2>Technology capability developed inside operating businesses.</h2></div><div className="editorial-copy story-copy"><p>Dawood Technologies grew from the technology needs of Dawood operating businesses. That internal capability developed into a dedicated technology company.</p><p>Today, we bring the same ownership-driven approach to organizations beyond Dawood, connecting technology decisions to how businesses actually operate.</p><Link className="text-link" href="/company">Our company story <ArrowRight aria-hidden="true" size={16} /></Link></div></div><div className="approach-process" aria-label="Four-step operating approach">{operatingApproach.map((step) => <article className="approach-step" key={step.code}><div className="approach-step-index"><span>{step.code}</span></div><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>

    <section className="section capability-section"><div className="container services-intro editorial-intro editorial-pair"><div><p className="kicker">SERVICES</p><h2>Engineering across the technology lifecycle.</h2></div><p className="editorial-copy">Our team brings together engineers and technology professionals across applications, cloud infrastructure, data, enterprise systems, automation, cybersecurity and technology operations.</p></div><div className="container capability-list">{homepageCapabilities.map((item, index) => <Link href={`/services/${item.slug}`} className="capability-row" key={item.slug}><span>{String(index + 1).padStart(2, "0")}</span><div className={styles.capabilityCopy}><h3>{item.title}</h3><p>{item.description}</p></div><ArrowRight aria-hidden="true" /></Link>)}</div><div className="container"><Link className="text-link" href="/services">Explore all services <ArrowRight aria-hidden="true" size={16} /></Link></div></section>

    <section className="section real-world"><div className="container split-heading editorial-intro editorial-pair"><div><p className="kicker">SELECTED WORK</p><h2>Technology in operating businesses.</h2></div><p className="editorial-copy">Work with Dawood RCC Pipe and Dawood Traders helped shape an operating model grounded in day-to-day technology responsibility.</p></div><div className="container home-work-showcase">{work.map((item, index) => <article className="home-work-panel" key={item.slug}><div className="work-project-meta"><span>{String(index + 1).padStart(2, "0")}</span><h3><Link href={`/work/${item.slug}`}>{item.name}</Link></h3><small>{item.sector}</small></div><div className="home-work-copy"><p className={styles.workStatement}>{item.title}</p><p>{item.summary}</p><div className="work-evidence-actions"><Link href={`/work/${item.slug}`}>View case study <ArrowRight aria-hidden="true" size={15} /></Link><a href={item.website} target="_blank" rel="noopener noreferrer">Visit website <ArrowUpRight aria-hidden="true" size={15} /></a></div></div></article>)}</div></section>

    <section className="section industry-section"><div className="container editorial-intro"><div><p className="kicker">INDUSTRY EXPERIENCE &amp; APPLICATIONS</p><h2>Experience across operating environments.</h2></div><div className="editorial-copy"><p>Our operating-business work is concentrated in construction, infrastructure and international trade. Broader references reflect team experience and where our technology capabilities apply.</p><Link className="text-link" href="/industries">Explore industry experience <ArrowRight aria-hidden="true" size={16} /></Link></div></div><div className="container"><div className="industry-list home-industry-list">{industries.slice(0, 6).map((item) => <article key={item.title}><span>{item.code}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>

    <section className="section home-solutions"><div className="container editorial-intro editorial-pair"><div><p className="kicker">SOLUTIONS</p><h2>Systems built around business needs.</h2></div><div className="editorial-copy"><p>Solution work combines product thinking, systems integration, data and infrastructure decisions around a specific operating requirement.</p><Link className="text-link" href="/solutions">View all solutions <ArrowRight aria-hidden="true" size={16} /></Link></div></div><div className="container solution-lineup">{solutions.map((item) => <article key={item.title}><span>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="section technology-section" aria-labelledby="technology-title"><div className="container split-heading editorial-intro editorial-pair"><div><p className="kicker">ENGINEERING MODEL</p><h2 id="technology-title">How we think about technology systems.</h2></div><p className="editorial-copy">Architecture, implementation, deployment, security, maintainability, support and continuous improvement are treated as parts of the same operating responsibility.</p></div><div className="container technology-system"><EngineeringModel /><TechnologyEcosystem /></div></section>

    <section className="section principles"><div className="container"><p className="kicker">WHY DAWOOD TECHNOLOGIES</p><div className="principle-grid"><article><span>01</span><h3>Operating context</h3><p>Requirements are defined around the people, workflows and systems involved.</p></article><article><span>02</span><h3>Connected capability</h3><p>Applications, cloud infrastructure, data and enterprise systems are planned together.</p></article><article><span>03</span><h3>Ongoing ownership</h3><p>Support, maintenance and planned improvements continue after deployment.</p></article><article><span>04</span><h3>Documented decisions</h3><p>Architecture, access and operating responsibilities are made clear to the teams involved.</p></article></div></div></section>

    <section className="section closing-cta"><div className="container"><p className="kicker">LET&apos;S TALK</p><h2>Tell us what your business needs technology to do.</h2><Link className="button button-primary" href="/contact">Let&apos;s Talk <ArrowUpRight aria-hidden="true" size={17} /></Link></div></section>
  </main>;
}
