import { TechnologyLogo, hasLogo } from "@/app/components/TechnologyLogo";
import styles from "./PlatformLogos.module.css";

export const trademarkNote = "Trademarks and logos belong to their respective owners. Use does not imply endorsement or partnership.";

type PlatformLogosProps = {
  names: readonly string[];
  /** "row": tiles with a heading and the trademark line. "compact": small chips labelled "Common platforms". */
  variant?: "row" | "compact";
};

export function PlatformLogos({ names, variant = "row" }: PlatformLogosProps) {
  if (variant === "compact") {
    return (
      <div className={styles.compact}>
        <p className={styles.compactLabel}>Common platforms</p>
        <ul className={styles.chips}>
          {names.map((name) => <li key={name} className={styles.chip}><TechnologyLogo name={name} />{hasLogo(name) ? <span>{name}</span> : null}</li>)}
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.block}>
      <p className={styles.heading}>Platforms we work with</p>
      <ul className={styles.tiles}>
        {names.map((name) => (
          <li key={name} className={styles.tile}>
            <TechnologyLogo name={name} />
            {/* Wordmarks already show the name. */}
            {hasLogo(name) ? <span className={styles.name} aria-hidden="true">{name}</span> : null}
          </li>
        ))}
      </ul>
      <p className={styles.note}>{trademarkNote}</p>
    </div>
  );
}
