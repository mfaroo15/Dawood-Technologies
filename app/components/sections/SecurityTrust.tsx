import { FileCheck2, FileLock2, KeyRound, MessagesSquare } from "lucide-react";
import { IconTiles } from "./IconTiles";
import { Reveal } from "./Reveal";
import styles from "./SecurityTrust.module.css";
import typography from "./typography.module.css";

const items = [
  { title: "NDA on request", text: "We sign a non-disclosure agreement before you share project details.", icon: FileLock2 },
  { title: "You own the work", text: "Once paid for, all code, designs and deliverables belong to you.", icon: FileCheck2 },
  { title: "Confidential access", text: "Your data, systems and credentials are accessed only by the people working on your project.", icon: KeyRound },
  { title: "Clear communication", text: "Meetings on Microsoft Teams, regular progress updates and a point of contact in your time zone.", icon: MessagesSquare },
];

// Full section on /company; "compact" is a card for the contact page sidebar.
export function SecurityTrust({ variant = "section" }: { variant?: "section" | "compact" }) {
  if (variant === "compact") {
    return (
      <div>
        <h3 className={styles.cardTitle}>Your ideas, data and code stay protected.</h3>
        <ul className={styles.list}>
          {items.map(({ title, text, icon: Icon }) => (
            <li key={title}>
              <Icon aria-hidden="true" size={18} />
              <span><strong>{title}</strong>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section id="security-trust" className={typography.lightSection} aria-labelledby="security-title">
      <Reveal className="container">
        <p className={typography.kicker}>Security &amp; trust</p>
        <h2 className={`${typography.heading} ${styles.heading}`} id="security-title">Your ideas, data and code stay protected.</h2>
        <IconTiles items={items} />
      </Reveal>
    </section>
  );
}
