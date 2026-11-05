import { TechnologyLogo, hasLogo, hasNeutralIcon } from "@/app/components/TechnologyLogo";
import styles from "./PlatformLogos.module.css";

const trademarkNote = "Trademarks and logos belong to their respective owners. Use does not imply endorsement or partnership.";

// "Platforms we work with" row: neutral icons, logos or wordmarks, a heading and the trademark line.
export function PlatformLogos({ names }: { names: readonly string[] }) {
  return (
    <div className={styles.block}>
      <p className={styles.heading}>Platforms we work with</p>
      <ul className={styles.tiles}>
        {names.map((name) => (
          <li key={name} className={styles.tile}>
            <span className={styles.markBox}><TechnologyLogo name={name} /></span>
            {/* Wordmarks already show the name, and a logo labels itself for screen readers. A neutral icon does neither. */}
            {hasNeutralIcon(name) ? <span className={styles.name}>{name}</span> : hasLogo(name) ? <span className={styles.name} aria-hidden="true">{name}</span> : null}
          </li>
        ))}
      </ul>
      <p className={styles.note}>{trademarkNote}</p>
    </div>
  );
}
