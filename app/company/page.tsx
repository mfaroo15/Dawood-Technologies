import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactBand } from "@/app/components/ContactBand";
import { InnerHero } from "@/app/components/InnerHero";
import { foundingYear } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./company.module.css";

export const metadata = createPageMetadata({ title: "About Dawood Technologies | Company & Expertise", description: "Learn about Dawood Technologies, our expertise, our approach, and how we help organizations implement and support business technology.", path: "/company" });

const companySections = [
  {
    kicker: "BUILT FROM OPERATING EXPERIENCE",
    title: "Technology responsibility became a dedicated company.",
    copy: [
      <>Dawood Technologies was founded in {foundingYear} from the technology needs of <Link href="/work">Dawood operating businesses</Link>. What began as an internal capability to manage <Link href="/services">applications, infrastructure, systems</Link>, security, data and day-to-day technology operations developed into a dedicated technology company.</>,
      "Today, Dawood Technologies brings that ownership-driven approach to organizations beyond Dawood, connecting technology decisions to how businesses actually operate.",
      <Link className="text-link" href="/work" key="explore-work">Explore Our Work <ArrowRight size={16} aria-hidden="true" /></Link>,
    ],
  },
  {
    kicker: "OUR APPROACH",
    title: "Technology decision-making grounded in real operations.",
    copy: [
      "Dawood Technologies approaches technology through practical operating requirements, maintainability, security and long-term ownership.",
      "Architecture, implementation, deployment, ongoing support and continuous improvement are planned together, with security and maintainability considered throughout.",
    ],
  },
  {
    kicker: "OUR TEAM",
    title: "Engineers who understand business operations.",
    copy: [
      <>Our team brings together <Link href="/careers">engineers and technology professionals</Link> across applications, cloud infrastructure, data, enterprise systems, automation, cybersecurity and technology operations.</>,
      "We consider these disciplines together so that decisions made during architecture and engineering remain practical through deployment, operation and support.",
    ],
  },
  {
    kicker: "REMOTE ENGAGEMENT",
    title: "Built to Work Across Locations",
    copy: [
      "Dawood Technologies operates with a remote-first approach, bringing together technology professionals across Chicago, Karachi, and Dubai. Our distributed team collaborates across time zones to deliver technology solutions, from initial consultation and development through deployment and ongoing support.",
      "These cities represent our team presence. Clear communication, coordinated schedules, secure access and defined delivery ownership guide how we work together across locations.",
    ],
  },
] as const;

export default function CompanyPage() {
  return <main id="main-content" className={styles.company}><InnerHero kicker="COMPANY" title="Technology capability built from operating experience." intro="Dawood Technologies developed from the technology responsibilities of Dawood operating businesses and extends that ownership-driven approach to other organizations." />
    <section className="section company-story"><div className="container company-story-grid">{companySections.map((section) => <article className="company-story-row" key={section.kicker}><div><p className="kicker">{section.kicker}</p><h2>{section.title}</h2></div><div className="editorial-copy story-copy">{section.copy.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></article>)}</div></section>
    <ContactBand /></main>;
}
