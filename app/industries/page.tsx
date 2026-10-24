import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, CircleCheck, CreditCard, GraduationCap, HeartPulse, Megaphone, MonitorPlay, Plane, Trophy, type LucideIcon } from "lucide-react";
import { createPageMetadata } from "@/app/lib/metadata";
import rccPipeShot from "@/public/work/rcc-pipe.png";
import tradersShot from "@/public/work/traders.png";
import { LocalTime } from "./LocalTime";
import { ScrollReveal } from "./ScrollReveal";
import styles from "./industries.module.css";

export const metadata = createPageMetadata({
  title: "Industries | Dawood Technologies",
  description: "We design, build and run the systems behind day-to-day operations: websites, CRM, ERP and reporting, with teams in Chicago, Karachi and Dubai.",
  path: "/industries",
});

const stats = [
  { value: "6", label: "core systems we build and run" },
  { value: "10", label: "industries of team experience" },
  { value: "3", label: "locations across 3 time zones" },
];

const builtAndRun = ["Company website", "Product catalogue", "Inventory management", "Client & enquiry management (CRM)", "ERP", "Business records & reporting"];

type WorkItem = { title: string; tag: string; description: string; image: StaticImageData; alt: string; domain: string; caseStudy: string; website: string };

const work: WorkItem[] = [
  {
    title: "Dawood RCC Pipe",
    tag: "Construction & Infrastructure",
    description: "An established infrastructure manufacturer, from its public website to the systems behind daily operations.",
    image: rccPipeShot,
    alt: "Dawood RCC Pipe website",
    domain: "dawoodrccpipe.com",
    caseStudy: "/work/dawood-rcc-pipe",
    website: "https://dawoodrccpipe.com/",
  },
  {
    title: "Dawood Traders",
    tag: "International Trade & Commerce",
    description: "An international trading business, with products, clients, enquiries and records managed in one connected system.",
    image: tradersShot,
    alt: "Dawood Traders website",
    domain: "dawoodtraderspk.com",
    caseStudy: "/work/dawood-traders",
    website: "https://dawoodtraderspk.com/",
  },
];

const teamIndustries: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "FinTech", text: "Secure applications, integrations and controlled data workflows.", icon: CreditCard },
  { title: "Aviation", text: "Ground handling, GSE coordination, cargo and workforce scheduling systems.", icon: Plane },
  { title: "EdTech", text: "Learning platforms, portals and education workflows.", icon: GraduationCap },
  { title: "HealthTech", text: "Secure data workflows and operational systems.", icon: HeartPulse },
  { title: "PropTech", text: "Property workflows, CRM integration and analytics.", icon: Building2 },
  { title: "Media & Entertainment", text: "Content platforms, audiences and scalable cloud infrastructure.", icon: MonitorPlay },
  { title: "Sports", text: "Digital platforms, fan experiences and performance data.", icon: Trophy },
  { title: "AdTech", text: "Campaign workflows, reporting and data integration.", icon: Megaphone },
];

const locations = [
  { city: "Chicago", country: "United States", timeZone: "America/Chicago", role: "Your point of contact in US hours" },
  { city: "Karachi", country: "Pakistan", timeZone: "Asia/Karachi", role: "Work progresses overnight" },
  { city: "Dubai", country: "United Arab Emirates", timeZone: "Asia/Dubai", role: "Close to clients in the Gulf" },
];

export default function IndustriesPage() {
  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero} aria-labelledby="industries-title">
        <div className="container">
          <p className={styles.kicker}>Industries</p>
          <h1 id="industries-title" className={styles.heroTitle}>Technology built for real operating businesses.</h1>
          <p className={styles.heroLead}>We design, build and run the systems behind day-to-day operations, from websites and CRM to ERP and reporting, for businesses across industries and time zones.</p>
          <ul className={styles.stats}>
            {stats.map((stat) => <li key={stat.label}><span className={styles.statValue}>{stat.value}</span><span className={styles.statLabel}>{stat.label}</span></li>)}
          </ul>
        </div>
      </section>

      <section className={styles.work} aria-labelledby="work-title">
        <div className={`container ${styles.reveal}`} data-reveal="">
          <p className={styles.kicker}>Selected work</p>
          <h2 id="work-title" className={styles.heading}>Systems we build and run.</h2>
          <p className={styles.intro}>We don&apos;t just build and hand over. We run the complete technology for the businesses we work with, every day.</p>
          <ul className={styles.workGrid}>
            {work.map((item) => (
              <li key={item.title} className={styles.workCard}>
                <div className={styles.shotArea}>
                  <div className={styles.browser}>
                    <div className={styles.browserBar} aria-hidden="true"><span className={styles.dots}><i /><i /><i /></span><span className={styles.url}>{item.domain}</span></div>
                    <div className={styles.shot}><Image src={item.image} alt={item.alt} sizes="(max-width: 900px) 100vw, 50vw" /></div>
                  </div>
                </div>
                <div className={styles.workBody}>
                  <span className={styles.tag}>{item.tag}</span>
                  <h3 className={styles.workTitle}>{item.title}</h3>
                  <p className={styles.workText}>{item.description}</p>
                  <h4 className={styles.checklistTitle}>What we built and run</h4>
                  <ul className={styles.checklist}>
                    {builtAndRun.map((entry) => <li key={entry}><CircleCheck aria-hidden="true" size={18} />{entry}</li>)}
                  </ul>
                  <div className={styles.actions}>
                    <Link className={styles.primaryButton} href={item.caseStudy}>View case study<span className="visually-hidden">: {item.title}</span> <ArrowUpRight aria-hidden="true" size={17} /></Link>
                    <a className={styles.textLink} href={item.website} target="_blank" rel="noopener">Visit website<span className="visually-hidden">: {item.domain} (opens in a new tab)</span> <ArrowUpRight aria-hidden="true" size={17} /></a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.team} aria-labelledby="team-title">
        <div className={`container ${styles.reveal}`} data-reveal="">
          <p className={styles.kicker}>Team experience</p>
          <h2 id="team-title" className={styles.heading}>Where our engineers have worked.</h2>
          <p className={styles.intro}>Industries where our team brings hands-on experience, ready to apply to your business.</p>
          <ul className={styles.teamGrid}>
            {teamIndustries.map(({ title, text, icon: Icon }) => (
              <li key={title} className={styles.tile}>
                <span className={styles.tileIcon}><Icon aria-hidden="true" size={22} /></span>
                <h3 className={styles.tileTitle}>{title}</h3>
                <p className={styles.tileText}>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.operate} aria-labelledby="operate-title">
        <div className={`container ${styles.reveal}`} data-reveal="">
          <p className={styles.kicker}>Where we operate</p>
          <h2 id="operate-title" className={styles.heading}>One team across your working day.</h2>
          <p className={styles.intro}>US management, South Asia engineering and a Middle East presence, so someone is always working on your project.</p>
          <ul className={styles.locationGrid}>
            {locations.map((location) => (
              <li key={location.city} className={styles.location}>
                <LocalTime className={styles.time} timeZone={location.timeZone} />
                <h3 className={styles.city}>{location.city}</h3>
                <p className={styles.country}>{location.country}</p>
                <p className={styles.role}>{location.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={`container ${styles.ctaInner} ${styles.reveal}`} data-reveal="">
          <div>
            <h2 id="cta-title" className={styles.ctaTitle}>Bring us the business challenge.</h2>
            <p className={styles.ctaText}>Book a 30-minute introduction call. We&apos;ll help define the right technology path.</p>
          </div>
          <Link className={styles.ctaButton} href="/contact">Book an introduction call <ArrowUpRight aria-hidden="true" size={17} /></Link>
        </div>
      </section>
      <ScrollReveal />
    </main>
  );
}
