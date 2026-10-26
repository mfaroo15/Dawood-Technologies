import Link from "next/link";
import { industryHref } from "@/app/data/industries";
import styles from "./IndustryPills.module.css";

// Wrapping row of link pills. `onTint` gives white pills for tinted sections.
export function LinkPills({ items, onTint = false }: { items: readonly { label: string; href: string }[]; onTint?: boolean }) {
  return (
    <ul className={`${styles.pills} ${onTint ? styles.onTint : ""}`}>
      {items.map(({ label, href }) => (
        <li key={href}><Link className={styles.pill} href={href}>{label}</Link></li>
      ))}
    </ul>
  );
}

// Industry names as pills, each linking to its industry page (homepage and service pages).
export function IndustryPills({ names }: { names: readonly string[] }) {
  return <LinkPills items={names.map((name) => ({ label: name, href: industryHref(name) }))} />;
}
