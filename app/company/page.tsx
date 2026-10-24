import { BadgeCheck, FolderKanban, MessagesSquare, Network, RefreshCw, Video, Wrench } from "lucide-react";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { IconTiles } from "@/app/components/sections/IconTiles";
import { Locations } from "@/app/components/sections/Locations";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { foundingYear } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./company.module.css";

export const metadata = createPageMetadata({ title: "About Dawood Technologies | Company & Expertise", description: "Learn about Dawood Technologies, our expertise, our approach, and how we help organizations implement and support business technology.", path: "/company" });

const beliefs = [
  { title: "Ownership", text: "We take responsibility beyond initial delivery.", icon: BadgeCheck },
  { title: "Practical engineering", text: "Built around real requirements, not unnecessary complexity.", icon: Wrench },
  { title: "Connected thinking", text: "Applications, infrastructure, data and operations together.", icon: Network },
  { title: "Continuous improvement", text: "Technology keeps evolving after launch.", icon: RefreshCw },
];

const engagement = [
  { title: "Video calls", text: "Meetings on Microsoft Teams, scheduled in your time zone.", icon: Video },
  { title: "Shared workspace", text: "Plans, files and progress in one place you can see anytime.", icon: FolderKanban },
  { title: "Regular updates", text: "Demos and progress updates throughout the project.", icon: MessagesSquare },
];

export default function CompanyPage() {
  return (
    <main id="main-content">
      <PageHero kicker="About us" title="Technology capability built from operating experience." lead="We began by running the technology behind manufacturing and trading businesses. Today we bring that same ownership to every organization we work with." />

      <section className={typography.lightSection} aria-labelledby="story-title">
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

      <section className={`${typography.lightSection} ${styles.divided}`} aria-labelledby="engage-title">
        <Reveal className="container">
          <p className={typography.kicker}>How we engage</p>
          <h2 className={typography.heading} id="engage-title">Remote by design.</h2>
          <p className={typography.intro}>Our team works remotely across Chicago, Karachi and Dubai. That gives clients access to talent across regions, longer working hours and the same accountable team from start to finish.</p>
          <IconTiles columns={3} items={engagement} />
        </Reveal>
      </section>

      <section className={typography.tintedSection} aria-labelledby="beliefs-title">
        <Reveal className="container">
          <p className={typography.kicker}>What we believe</p>
          <h2 className={`${typography.heading} ${styles.spacedHeading}`} id="beliefs-title">Our principles.</h2>
          <IconTiles items={beliefs} />
        </Reveal>
      </section>

      <Locations intro="A remote-first team across three time zones, so someone is always working on your project." />
      <CtaBand heading="Work with a team that stays after launch." />
    </main>
  );
}
