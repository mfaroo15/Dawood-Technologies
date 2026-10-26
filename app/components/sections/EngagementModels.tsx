import Link from "next/link";
import { ArrowRight, ClipboardList, LifeBuoy, Users } from "lucide-react";
import { Reveal } from "./Reveal";
import styles from "./EngagementModels.module.css";
import typography from "./typography.module.css";

const models = [
  { title: "Project-based delivery", text: "A defined scope, timeline and deliverables, from first design to launch. Best for new websites, applications and systems.", icon: ClipboardList },
  { title: "Dedicated team", text: "Developers, designers and QA engineers working as an extension of your team, managed by us and aligned to your hours. Scale up or down as you need.", icon: Users },
  { title: "Ongoing support & managed IT", text: "Monthly support, maintenance and improvements for the systems you already run, with a named point of contact.", icon: LifeBuoy },
];

// "Ways to work with us" section, shared by the homepage and /services.
export function EngagementModels({ tinted = false }: { tinted?: boolean }) {
  return (
    <section id="engagement-models" className={tinted ? typography.tintedSection : typography.lightSection} aria-labelledby="engagement-title">
      <Reveal className="container">
        <p className={typography.kicker}>Engagement models</p>
        <h2 className={`${typography.heading} ${styles.heading}`} id="engagement-title">Work with us the way that suits you.</h2>
        <ul className={styles.grid}>
          {models.map(({ title, text, icon: Icon }) => (
            <li key={title} className={styles.card}>
              <span className={styles.icon}><Icon aria-hidden="true" size={28} strokeWidth={1.75} /></span>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.text}>{text}</p>
              <Link className={styles.link} href="/contact">Book a call<span className="visually-hidden">: {title}</span> <ArrowRight aria-hidden="true" size={16} /></Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
