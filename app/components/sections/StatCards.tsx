import { Clock, Globe, Layers, Sparkles, type LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import styles from "./StatCards.module.css";

type Stat = { icon: LucideIcon; label: string; value: string; text: string };

const defaultStats: Stat[] = [
  { icon: Sparkles, label: "Full Stack Developers", value: "10+", text: "Engineers building web, cloud and AI solutions" },
  { icon: Clock, label: "Global Delivery", value: "24/7", text: "Round-the-clock development and support" },
  { icon: Globe, label: "Global Presence", value: "3", text: "Teams in Chicago, Karachi and Dubai" },
  { icon: Layers, label: "End-to-End Systems", value: "6", text: "From website and CRM to ERP and reporting" },
];

export function StatCards({ stats = defaultStats }: { stats?: Stat[] }) {
  return (
    <Reveal as="ul" variant="stagger" className={styles.grid}>
      {stats.map(({ icon: Icon, label, value, text }) => (
        <li key={label} className={styles.card}>
          <p className={styles.label}><Icon aria-hidden="true" size={24} />{label}</p>
          <p className={styles.value}>{value}</p>
          <p className={styles.text}>{text}</p>
        </li>
      ))}
    </Reveal>
  );
}
