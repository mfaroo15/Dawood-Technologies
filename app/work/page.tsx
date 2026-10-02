import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactBand } from "@/app/components/ContactBand";
import { InnerHero } from "@/app/components/InnerHero";
import { work } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";

export const metadata = createPageMetadata({ title: "Work", description: "Selected Dawood Technologies work in operating businesses across manufacturing, infrastructure and international trade.", path: "/work" });

export default function WorkPage() {
  return <main id="main-content">
    <InnerHero compact kicker="OUR WORK" title="Technology in operating businesses." intro="Work with Dawood RCC Pipe and Dawood Traders helped develop the ownership-driven approach that now defines Dawood Technologies." />
    <section className="section work-index"><div className="container work-case-list">
      {work.map((item, index) => <article className="work-case-feature" key={item.slug}>
        <div className="work-project-meta"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.name}</strong><small>{item.sector}</small></div>
        <div className="work-case-copy"><h2><Link href={`/work/${item.slug}`}>{item.title}</Link></h2><p>{item.overview}</p><div className="work-index-actions"><Link href={`/work/${item.slug}`}>View case study <ArrowRight aria-hidden="true" size={15} /></Link><a href={item.website} target="_blank" rel="noopener noreferrer">Visit website <ArrowUpRight aria-hidden="true" size={15} /></a></div></div>
      </article>)}
    </div></section>
    <ContactBand title="Tell us what your business needs technology to do." />
  </main>;
}
