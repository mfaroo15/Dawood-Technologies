import { Clock, Globe, Layers, Sparkles, type LucideIcon } from "lucide-react";
import { capabilities } from "@/app/data/site";
import { Reveal } from "./Reveal";
import styles from "./StatCards.module.css";

type Stat = { icon: LucideIcon; label: string; value: string; text: string };

const defaultStats: Stat[] = [
  { icon: Sparkles, label: "Full Stack Developers", value: "10+", text: "Engineers building web, cloud and AI systems" },
  { icon: Clock, label: "Response time", value: "1 day", text: "We reply to every enquiry within one business day" },
  { icon: Globe, label: "Global teams", value: "2", text: "Karachi and Dubai" },
  { icon: Layers, label: "Services", value: String(capabilities.length), text: "From consulting and software to AI, cloud and managed IT" },
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
