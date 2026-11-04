import { psx } from "@/app/data/case-studies";
import styles from "./WorkBits.module.css";

export function Chips({ items, onDark = false }: { items: readonly string[]; onDark?: boolean }) {
  return (
    <ul className={`${styles.chips} ${onDark ? styles.chipsOnDark : ""}`}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export function StatusLine({ children }: { children: string }) {
  return <p className={styles.status}><span className={styles.dot} aria-hidden="true" />{children}</p>;
}

export function LiveBadge() {
  return <p className={styles.live}><span className={styles.liveDot} aria-hidden="true" />{psx.badge}</p>;
}

export function PsxPoints({ onDark = false }: { onDark?: boolean }) {
  return (
    <ul className={`${styles.points} ${onDark ? styles.pointsOnDark : ""}`}>
      {psx.points.map(({ icon: Icon, text }) => (
        <li key={text}><span className={styles.pointIcon}><Icon aria-hidden="true" size={17} strokeWidth={2.25} /></span>{text}</li>
      ))}
    </ul>
  );
}
