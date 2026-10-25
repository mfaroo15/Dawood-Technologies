import { TechnologyLogo, hasLogo } from "@/app/components/TechnologyLogo";
import styles from "./PlatformLogos.module.css";

const trademarkNote = "Trademarks and logos belong to their respective owners. Use does not imply endorsement or partnership.";

// "Platforms we work with" row: logo tiles, a heading and the trademark line.
export function PlatformLogos({ names }: { names: readonly string[] }) {
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
