import { CircleCheck } from "lucide-react";
import { Faq } from "./Faq";
import { IndustryPills } from "./IndustryPills";
import { Reveal } from "./Reveal";
import styles from "./ServiceDetails.module.css";
import typography from "./typography.module.css";

type ServiceDetailsProps = {
  whoFor: readonly string[];
  outcomes: readonly string[];
  industries: readonly string[];
  faqs: readonly { question: string; answer: string }[];
};

// "Who it's for", "What you get", "Industries we serve" and "Common questions" for a service page.
export function ServiceDetails({ whoFor, outcomes, industries, faqs }: ServiceDetailsProps) {
  return (
    <>
      <section className={typography.tintedSection} aria-label="Who it's for and what you get">
        <Reveal className={`container ${styles.columns}`}>
          <div>
            <h2 className={styles.heading}>Who it&apos;s for</h2>
            <ul className={styles.list}>{whoFor.map((item) => <li key={item}><CircleCheck aria-hidden="true" size={20} />{item}</li>)}</ul>
          </div>
          <div>
            <h2 className={styles.heading}>What you get</h2>
            <ul className={styles.list}>{outcomes.map((item) => <li key={item}><CircleCheck aria-hidden="true" size={20} />{item}</li>)}</ul>
          </div>
        </Reveal>
      </section>

      <section className={typography.lightSection} aria-labelledby="service-industries-title">
        <Reveal className="container">
          <p className={typography.kicker}>Industries</p>
          <h2 className={`${typography.heading} ${styles.spaced}`} id="service-industries-title">Industries we serve</h2>
          <IndustryPills names={industries} />
        </Reveal>
      </section>

      <section className={typography.tintedSection} aria-labelledby="service-faq-title">
        <Reveal className={`container ${styles.split}`}>
          <div>
            <p className={typography.kicker}>FAQ</p>
            <h2 className={typography.heading} id="service-faq-title">Common questions</h2>
          </div>
          <Faq items={faqs} />
        </Reveal>
      </section>
    </>
  );
}
