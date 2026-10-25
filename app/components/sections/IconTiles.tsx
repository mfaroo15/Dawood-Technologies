import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import styles from "./IconTiles.module.css";

type Tile = { title: string; text: string; icon?: LucideIcon; href?: string };

// Bordered tile grid. Tiles with an href become links with a "Learn more" cue.
export function IconTiles({ items, columns = 4 }: { items: readonly Tile[]; columns?: 3 | 4 | 5 }) {
  return (
    <ul className={`${styles.grid} ${columns === 3 ? styles.three : columns === 5 ? styles.five : ""}`}>
      {items.map(({ title, text, icon: Icon, href }) => {
        const content = (
          <>
            {Icon ? <span className={styles.icon}><Icon aria-hidden="true" size={22} /></span> : null}
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>{text}</p>
            {href ? <span className={styles.more}>Learn more <ArrowRight aria-hidden="true" size={16} /></span> : null}
          </>
        );
        return (
          <li key={title}>
            {href ? <Link className={`${styles.tile} ${styles.linked}`} href={href}>{content}</Link> : <div className={styles.tile}>{content}</div>}
          </li>
        );
      })}
    </ul>
  );
}
