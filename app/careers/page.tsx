import { InnerHero } from "@/app/components/InnerHero";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./careers.module.css";

export const metadata = createPageMetadata({
  title: "Careers",
  description: "Explore career opportunities at Dawood Technologies across software, cloud infrastructure, data, enterprise systems and technology operations.",
  path: "/careers",
});

const principles = [
  { code: "01", title: "Ownership", description: "Take responsibility beyond initial delivery." },
  { code: "02", title: "Practical engineering", description: "Build around actual requirements rather than unnecessary complexity." },
  { code: "03", title: "Connected thinking", description: "Consider applications, infrastructure, data and operations together." },
  { code: "04", title: "Continuous improvement", description: "Technology continues to evolve after launch." },
];

export default function CareersPage() {
  return (
    <main id="main-content">
      <InnerHero
        kicker="CAREERS"
        title="Build technology that stays useful."
        intro="Work across applications, infrastructure, data and business systems designed around real operating needs."
      />

      <section className="section company-story" aria-labelledby="careers-work-title">
        <div className={`container editorial-intro ${styles.intro}`}>
          <div>
            <p className="kicker">01 — WORKING AT DAWOOD TECHNOLOGIES</p>
            <h2 id="careers-work-title">Technology work connected to the operation.</h2>
          </div>
          <div className="editorial-copy story-copy">
            <p>Our work spans software engineering, cloud infrastructure, enterprise systems, data, automation and ongoing technology operations.</p>
          </div>
        </div>
      </section>

      <section className={`section ${styles.principles}`} aria-labelledby="careers-principles-title">
        <div className="container">
          <h2 className="kicker" id="careers-principles-title">02 — HOW WE WORK</h2>
          <div className="industry-list">
            {principles.map((principle) => (
              <article key={principle.code}>
                <span>{principle.code}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section company-story" aria-labelledby="careers-positions-title">
        <div className={`container editorial-intro ${styles.intro}`}>
          <div>
            <p className="kicker">03 — OPEN POSITIONS</p>
            <h2 id="careers-positions-title">No open positions right now.</h2>
          </div>
          <div className="editorial-copy story-copy">
            <p>We don&apos;t currently have any open roles. As Dawood Technologies grows, new opportunities will be posted here.</p>
            <p>Check back for future opportunities.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
