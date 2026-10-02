import { ContactBand } from "@/app/components/ContactBand";
import { InnerHero } from "@/app/components/InnerHero";
import { foundingYear } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./company.module.css";

export const metadata = createPageMetadata({ title: "Company", description: `Founded in ${foundingYear}, Dawood Technologies developed from the technology needs of operating businesses and brings that ownership-driven approach to other organizations.`, path: "/company" });

const companySections = [
  {
    kicker: "BUILT FROM OPERATING EXPERIENCE",
    compactIntro: true,
    title: "Technology responsibility became a dedicated company.",
    copy: [
      `Dawood Technologies was founded in ${foundingYear} from the technology needs of Dawood operating businesses. What began as an internal capability to manage applications, infrastructure, systems, security, data and day-to-day technology operations developed into a dedicated technology company.`,
      "Today, Dawood Technologies brings that ownership-driven approach to organizations beyond Dawood, connecting technology decisions to how businesses actually operate.",
    ],
  },
  {
    kicker: "OUR APPROACH",
    compactIntro: true,
    title: "Technology decision-making grounded in real operations.",
    copy: [
      "Dawood Technologies approaches technology through practical operating requirements, maintainability, security and long-term ownership.",
      "Architecture, implementation, deployment, security, maintainability, support and continuous improvement are considered as parts of the same technology lifecycle.",
    ],
  },
  {
    kicker: "OUR TEAM",
    compactIntro: false,
    title: "Engineers who understand business operations.",
    copy: [
      "Our team brings together engineers and technology professionals across applications, cloud infrastructure, data, enterprise systems, automation, cybersecurity and technology operations.",
      "These disciplines are considered together so that decisions made during architecture and engineering remain practical through deployment, operation and support.",
    ],
  },
  {
    kicker: "REMOTE ENGAGEMENT",
    compactIntro: true,
    title: "Built to work across locations.",
    copy: [
      "We work remotely with clients and distributed teams, from discovery and consultation through implementation, deployment and ongoing support. Secure access and communication support project collaboration across locations and time zones.",
      "Clear project communication, coordinated schedules and defined delivery ownership keep managed engagements accountable. Geography does not prevent us from delivering and supporting technology for your business.",
    ],
  },
] as const;

export default function CompanyPage() {
  return <main id="main-content" className={styles.company}><InnerHero kicker="COMPANY" title="Technology capability built from operating experience." intro="Dawood Technologies developed from the technology responsibilities of Dawood operating businesses and extends that ownership-driven approach to other organizations." />
    <section className="section company-story"><div className="container company-story-grid">{companySections.map((section) => <article className={`company-story-row${section.compactIntro ? " editorial-pair" : ""}`} key={section.kicker}><div><p className="kicker">{section.kicker}</p><h2>{section.title}</h2></div><div className="editorial-copy story-copy">{section.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>)}</div></section>
    <ContactBand /></main>;
}
