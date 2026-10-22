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
    title: "Engineering technology around how businesses evolve.",
    copy: [
      "Dawood Technologies approaches technology through practical operating requirements, maintainability, security and long-term ownership.",
      "Architecture, implementation, deployment, ongoing support and continuous improvement are planned together, with security and maintainability considered throughout.",
    ],
  },
  {
    kicker: "OUR TEAM",
    title: "A distributed team with a shared perspective.",
    copy: [
      "Our team combines business understanding with technical expertise, working collaboratively across Chicago, Karachi, and Dubai. This remote-first approach gives us access to talent across regions while maintaining the flexibility to support clients wherever they operate.",
      <>Our team brings together <Link href="/careers">engineers and technology professionals</Link> across applications, cloud infrastructure, data, enterprise systems, automation, cybersecurity and technology operations.</>,
      "We consider these disciplines together so that decisions made during architecture and engineering remain practical through deployment, operation and support.",
    ],
  },
  {
    kicker: "REMOTE ENGAGEMENT",
    title: "Built to work across locations.",
    copy: [
      "Our remote-first approach supports collaboration across locations and time zones. We use structured communication, shared documentation, and clearly defined responsibilities to keep technology projects coordinated from planning through implementation and ongoing support.",
      "Clear communication, coordinated schedules, secure access and defined delivery ownership guide how we work together across locations.",
    ],
  },
  {
    kicker: "HOW WE WORK",
    title: "Practical, collaborative and focused on outcomes.",
    copy: [
      "We begin by understanding business requirements and agreeing realistic plans, responsibilities and implementation priorities. Collaboration continues through technology implementation, ongoing support and continuous improvement.",
    ],
  },
  {
    kicker: "OUR WORK",
    title: "From operating experience to client engagements.",
    copy: [
      "Work with Dawood RCC Pipe and Dawood Traders helped develop the ownership-driven approach that now defines Dawood Technologies.",
      <Link className="text-link" href="/work" key="our-work">Explore Our Work <ArrowRight size={16} aria-hidden="true" /></Link>,
    ],
  },
] as const;

export default function CompanyPage() {
  return <main id="main-content"><InnerHero kicker="COMPANY" title="Technology capability built from operating experience." intro="Dawood Technologies developed from the technology responsibilities of Dawood operating businesses and extends that ownership-driven approach to other organizations." />
    {companySections.map((section, sectionIndex) => <section className={`section ${styles.storySection}`} key={section.kicker} aria-labelledby={`company-story-${sectionIndex}`}><div className="container"><div className={styles.storyContent}><p className="kicker">{section.kicker}</p><h2 id={`company-story-${sectionIndex}`}>{section.title}</h2><div className={styles.storyCopy}>{section.copy.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div></div></section>)}
    <ContactBand /></main>;
}
