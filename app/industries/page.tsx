import { ContactBand } from "@/app/components/ContactBand";
import { InnerHero } from "@/app/components/InnerHero";
import { industries } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";

export const metadata = createPageMetadata({ title: "Industry Experience & Applications", description: "Dawood Technologies operating experience in construction, infrastructure and international trade, with broader team experience across technology environments.", path: "/industries" });
export default function IndustriesPage() {
  const operatingIndustries = industries.filter((item) => item.basis === "operating");
  const teamIndustries = industries.filter((item) => item.basis === "team");

  return <main id="main-content"><InnerHero kicker="INDUSTRY EXPERIENCE & APPLICATIONS" title="Experience across operating environments." intro="Our team brings technology and engineering experience across diverse operating environments. That perspective helps us design systems around the requirements, constraints and workflows of each business." />
    <section className="section industry-detail"><div className="container"><div className="industry-detail-heading editorial-pair"><div><p className="kicker">DEMONSTRATED OPERATING EXPERIENCE</p><h2>Experience shaped inside Dawood businesses.</h2></div><p>Construction, infrastructure and international trade are connected to published work with Dawood RCC Pipe and Dawood Traders.</p></div>{operatingIndustries.map((item) => <article key={item.title}><span>{item.code}</span><div><h2>{item.title}</h2><p>{item.text}</p></div><ul>{item.needs.map((need) => <li key={need}>{need}</li>)}</ul></article>)}</div></section>
    <section className="section industry-detail industry-team"><div className="container"><div className="industry-detail-heading"><div><p className="kicker">TEAM EXPERIENCE &amp; TECHNOLOGY APPLICATIONS</p><h2>Broader technology perspective.</h2></div><p>These references reflect team experience and areas where our capabilities apply. They do not represent completed Dawood Technologies engagements in every sector.</p></div>{teamIndustries.map((item) => <article key={item.title}><span>{item.code}</span><div><h2>{item.title}</h2><p>{item.text}</p></div><ul>{item.needs.map((need) => <li key={need}>{need}</li>)}</ul></article>)}</div></section><ContactBand /></main>;
}
