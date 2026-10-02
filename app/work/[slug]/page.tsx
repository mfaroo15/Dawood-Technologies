import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactBand } from "@/app/components/ContactBand";
import { ArrowUpRight } from "lucide-react";
import { work } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return work.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const project = work.find((item) => item.slug === slug);
  if (!project) return {};
  return createPageMetadata({ title: project.name, description: project.summary, path: `/work/${slug}` });
}

export default async function WorkDetail({ params }: Props) {
  const { slug } = await params; const project = work.find((item) => item.slug === slug);
  if (!project) notFound();
  const caseSections = [
    { label: "PROJECT OVERVIEW", title: "Operating context.", body: project.overview },
    { label: "CHALLENGE", title: "What the work needed to solve.", body: project.challenge },
    { label: "WHAT WE BUILT", title: "Published scope.", items: project.built },
    { label: "TECHNICAL APPROACH", title: "How the work is approached.", body: project.approach },
    { label: "SYSTEM / ARCHITECTURE", title: "System areas.", items: project.system },
    { label: "OUTCOME", title: "Current published outcome.", body: project.outcome },
    { label: "ONGOING TECHNOLOGY SUPPORT", title: "Continuity after launch.", body: project.support },
  ];
  return <main id="main-content">
    <section className="case-hero"><div className="container case-hero-grid case-hero-text intro-block"><div><p className="kicker">WORK / {project.sector}</p><h1>{project.title}</h1></div><div className="inner-hero-copy"><p>{project.summary}</p><a className="text-link" href={project.website} target="_blank" rel="noopener noreferrer">Visit website <ArrowUpRight aria-hidden="true" size={16} /></a></div></div></section>
    <section className="section case-content"><div className="container case-layout"><aside><span>OPERATING BUSINESS</span><strong>{project.name}</strong><span>SECTOR</span><strong>{project.sector}</strong></aside><div>
      {caseSections.map((section) => <section key={section.label}><p className="kicker">{section.label}</p><h2>{section.title}</h2>{section.items ? <ul className="case-scope-list">{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : <p>{section.body}</p>}</section>)}
      <section className="case-note"><strong>Published scope</strong><p>Detailed implementation information and project outcomes are kept private unless approved for publication.</p></section>
    </div></div></section>
    <ContactBand title="Put technology to work inside your operation." />
  </main>;
}
