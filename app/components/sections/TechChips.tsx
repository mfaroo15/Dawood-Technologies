import styles from "./TechChips.module.css";

export function TechChips({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.chips}>
      {items.map((name) => <li key={name} className={styles.chip}>{name}</li>)}
    </ul>
  );
}
