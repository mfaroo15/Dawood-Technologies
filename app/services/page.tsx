import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactBand } from "@/app/components/ContactBand";
import { InnerHero } from "@/app/components/InnerHero";
import { TechnologyLogo } from "@/app/components/TechnologyLogo";
import { serviceDirectory } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";

export const metadata = createPageMetadata({ title: "IT Services & Consulting | Dawood Technologies", description: "Explore IT consulting, infrastructure, cloud, networking, application development, and technology support services from Dawood Technologies.", path: "/services" });

export default function ServicesPage() { return <main id="main-content"><InnerHero kicker="SERVICES" title="Technology services organized around business needs." intro="We connect consulting, engineering, integration and ongoing operation across seven service families. Each can stand alone or combine into a broader technology program." />
  <section className="section detail-list"><div className="container">{serviceDirectory.map((item, index) => <article className="capability-overview-row" key={item.title}><span className="detail-code">{String(index + 1).padStart(2, "0")}</span><div className="capability-overview-intro"><h2>{item.title}</h2><p>{item.summary}</p><Link className="text-link" href={`/services/${item.slug}`}>Explore {item.title} <ArrowRight aria-hidden="true" size={16} /></Link></div><div className="capability-overview-services"><strong>Selected services</strong><ul>{item.items.slice(0, 5).map((entry) => <li key={entry}>{entry}</li>)}</ul></div><div className="capability-overview-platforms"><strong>Technology context</strong>{item.platforms.length ? <div>{item.platforms.slice(0, 3).map((platform) => <TechnologyLogo key={platform.name} {...platform} />)}</div> : null}{item.engineeringTechnologies.length ? <p className="overview-engineering-technologies">{item.engineeringTechnologies.join(" · ")}</p> : null}{!item.platforms.length && !item.engineeringTechnologies.length ? <p>Selected around the environment and requirements.</p> : null}</div></article>)}</div></section><ContactBand title="Tell us what your business needs technology to do." /></main>; }
