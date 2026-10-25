import Link from "next/link";
import styles from "./IndustryPills.module.css";

// Industry names as pills linking to /industries (homepage and service pages).
export function IndustryPills({ names }: { names: readonly string[] }) {
  return (
    <ul className={styles.pills}>
      {names.map((name) => (
        <li key={name}><Link className={styles.pill} href="/industries"><span className={styles.dot} aria-hidden="true" />{name}</Link></li>
      ))}
    </ul>
  );
}
