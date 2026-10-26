import { BadgeCheck, FolderKanban, MessagesSquare, Network, RefreshCw, Video, Wrench } from "lucide-react";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { IconTiles } from "@/app/components/sections/IconTiles";
import { Locations } from "@/app/components/sections/Locations";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import { SecurityTrust } from "@/app/components/sections/SecurityTrust";
import typography from "@/app/components/sections/typography.module.css";
import { BrowserFrame } from "@/app/components/sections/BrowserFrame";
import { foundingYear, operatingBusinesses } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./company.module.css";

export const metadata = createPageMetadata({ title: "About Dawood Technologies | Company & Expertise", description: "How Dawood Technologies grew from running the technology of its own operating businesses into a remote-first team serving clients around the world.", path: "/company" });

const beliefs = [
  { title: "Ownership", text: "We take responsibility beyond initial delivery.", icon: BadgeCheck },
  { title: "Practical engineering", text: "Shaped by real requirements, not unnecessary complexity.", icon: Wrench },
  { title: "Connected thinking", text: "Applications, infrastructure, data and operations together.", icon: Network },
  { title: "Continuous improvement", text: "Technology keeps evolving after launch.", icon: RefreshCw },
];

const engagement = [
  { title: "Video calls", text: "Meetings on Microsoft Teams, scheduled in your time zone.", icon: Video },
  { title: "Shared workspace", text: "Plans, files and progress in one place you can see anytime.", icon: FolderKanban },
  { title: "Regular updates", text: "Demos and progress updates throughout the project.", icon: MessagesSquare },
];

const breadcrumb = [{ name: "Home", path: "/" }, { name: "About Us", path: "/company" }] as const;

const pills = [
  { id: "our-story", label: "Our story" },
  { id: "foundation", label: "Our foundation" },
  { id: "how-we-engage", label: "How we engage" },
  { id: "principles", label: "Principles" },
  { id: "where-we-operate", label: "Locations" },
  { id: "security-trust", label: "Trust" },
];

export default function CompanyPage() {
  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[...breadcrumb]} />
      <PageHero breadcrumb={breadcrumb} title="Technology built on operating experience." lead="We began running technology for manufacturing and trading businesses, and bring that ownership to every client." pills={pills} />

      <section id="our-story" className={typography.lightSection} aria-labelledby="story-title">
        <Reveal className={`container ${styles.split}`}>
          <div>
            <p className={typography.kicker}>Our story</p>
            <h2 className={typography.heading} id="story-title">From internal capability to technology company.</h2>
          </div>
          <div className={styles.story}>
            <p>Dawood Technologies was founded in {foundingYear}. What began as the team managing applications, infrastructure, security and daily technology operations for operating businesses became a dedicated technology company.</p>
            <p>That background shapes how we work: technology has to fit how a business actually runs, and it has to keep working long after launch.</p>
          </div>
        </Reveal>
      </section>

      <section id="foundation" className={`${typography.tintedSection} ${styles.anchor}`} aria-labelledby="foundation-title">
        <Reveal className="container">
          <p className={typography.kicker}>Our foundation</p>
          <h2 className={typography.heading} id="foundation-title">Where our experience comes from</h2>
          <p className={typography.intro}>Before working with clients, we built and ran the technology behind our own operating businesses. These systems run every day, and they shape how we design, deliver and support technology for others.</p>
          <ul className={styles.businesses}>
            {operatingBusinesses.map((business) => (
              <li key={business.slug} className={styles.business}>
                <div className={styles.shotArea}>
                  <BrowserFrame src={business.image} alt={`${business.name} website`} domain={business.domain} sizes="(max-width: 900px) 100vw, 50vw" />
                </div>
                <div className={styles.businessBody}>
                  <p className={styles.tagWrap}><span className={typography.tag}>Operating business</span></p>
                  <h3 className={styles.businessName}>{business.name}</h3>
                  <p className={styles.industry}>{business.industry}</p>
                  <p className={styles.about}>{business.about}</p>
                  <h4 className={styles.label}>What we built</h4>
                  <ul className={styles.chips}>
                    {business.built.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <h4 className={styles.label}>What we run and support</h4>
                  <p className={styles.supported}>{business.supported}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="how-we-engage" className={typography.lightSection} aria-labelledby="engage-title">
        <Reveal className="container">
          <p className={typography.kicker}>How we engage</p>
          <h2 className={typography.heading} id="engage-title">Remote by design.</h2>
          <p className={typography.intro}>Our team works remotely across Karachi and Dubai. That gives clients access to experienced engineers, a presence close to the Gulf and the same accountable team from start to finish.</p>
          <IconTiles columns={3} items={engagement} />
        </Reveal>
      </section>

      <section id="principles" className={typography.tintedSection} aria-labelledby="beliefs-title">
        <Reveal className="container">
          <p className={typography.kicker}>What we believe</p>
          <h2 className={`${typography.heading} ${styles.spacedHeading}`} id="beliefs-title">Our principles.</h2>
          <IconTiles items={beliefs} />
        </Reveal>
      </section>

      <Locations />
      <SecurityTrust />
      <CtaBand heading="Work with a team that stays after launch." text="Meet the team, ask your questions and see if we're the right fit." />
    </main>
  );
}
