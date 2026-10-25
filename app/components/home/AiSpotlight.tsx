import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { ChatDemo } from "./ChatDemo";
import styles from "./AiSpotlight.module.css";

const points = [
  "Website, WhatsApp and Microsoft Teams",
  "Captures enquiries and books calls automatically",
  "Connects to your CRM, ERP or helpdesk",
  "Hands over to a person when it should",
];

export function AiSpotlight() {
  return (
    <section className={styles.section} aria-labelledby="ai-spotlight-title">
      <Reveal className={`container ${styles.layout}`}>
        <div>
          <p className={typography.kickerOnDark}>AI Solutions</p>
          <h2 className={typography.heading} id="ai-spotlight-title">An AI assistant that works while your team sleeps.</h2>
          <p className={styles.lead}>Chatbots and agents that answer from your approved information and take real actions in your systems.</p>
          <ul className={styles.points}>
            {points.map((point) => <li key={point}><span className={styles.dot} aria-hidden="true" />{point}</li>)}
          </ul>
          <Link className={styles.button} href="/services/ai-automation">See AI solutions <ArrowUpRight aria-hidden="true" size={17} /></Link>
        </div>
        <div className={styles.demo}>
          <p className={styles.caption}>Your assistant, your name, your brand.</p>
          <p className="visually-hidden">Example conversation with an AI assistant carrying your own brand name and logo: a customer asks whether you can build an inventory system for their warehouse. The assistant confirms and offers a free 30-minute call, the customer chooses to book, and the call is booked for Tuesday at 10:00 AM with the team notified.</p>
          <ChatDemo />
          <p className={styles.demoNote}>Shown on your website, WhatsApp or Teams, with your logo and colors.</p>
        </div>
      </Reveal>
    </section>
  );
}
