import type { CSSProperties, ReactNode } from "react";
import styles from "./Marquee.module.css";

type MarqueeProps = {
  items: { key: string; content: ReactNode }[];
  /** Seconds for one full loop. */
  duration?: number;
  label?: string;
};

// The list is rendered four times so half the track is always wider than the screen;
// the track slides by exactly half its width, so the loop is seamless. Only the first
// copy is exposed to assistive technology. With reduced motion only that copy shows,
// as a static wrapped grid. Overflow is hidden: there is no scrollbar or swiping.
const COPIES = 4;

export function Marquee({ items, duration = 40, label }: MarqueeProps) {
  return (
    <div className={styles.marquee} style={{ "--marquee-duration": `${duration}s` } as CSSProperties}>
      <div className={styles.track}>
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul className={styles.group} key={copy} aria-label={copy === 0 ? label : undefined} aria-hidden={copy > 0 ? true : undefined}>
            {items.map((item) => <li className={styles.item} key={item.key}>{item.content}</li>)}
          </ul>
        ))}
      </div>
    </div>
  );
}
