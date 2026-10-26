import Link from "next/link";
import { ArrowRight, ChevronRight, type LucideIcon } from "lucide-react";
import styles from "./IconTiles.module.css";

/** `id` makes a tile a jump-link target. `more` replaces the default "Learn more" cue on linked tiles. */
type Tile = { id?: string; title: string; text: string; icon?: LucideIcon; href?: string; more?: string };

// Unboxed column grid. Tiles with an href become links with a "Learn more" (or custom) cue.
export function IconTiles({ items, columns = 4 }: { items: readonly Tile[]; columns?: 3 | 4 | 5 }) {
  return (
    <ul className={`${styles.grid} ${columns === 3 ? styles.three : columns === 5 ? styles.five : ""}`}>
      {items.map(({ id, title, text, icon: Icon, href, more }) => {
        const content = (
          <>
            {Icon ? <span className={styles.icon}><Icon aria-hidden="true" size={28} strokeWidth={1.75} /></span> : null}
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>{text}</p>
            {href ? <span className={styles.more}>{more ?? "Learn more"} {more ? <ChevronRight aria-hidden="true" size={16} /> : <ArrowRight aria-hidden="true" size={16} />}</span> : null}
          </>
        );
        return (
          <li key={title} id={id}>
            {href ? <Link className={`${styles.tile} ${styles.linked}`} href={href}>{content}</Link> : <div className={styles.tile}>{content}</div>}
          </li>
        );
      })}
    </ul>
  );
}
