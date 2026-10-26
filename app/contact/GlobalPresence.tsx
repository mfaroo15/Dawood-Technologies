import { presenceMap, projectLocation, teamLocations } from "@/app/data/global-presence";
import styles from "./GlobalPresence.module.css";

// Karachi and Dubai sit close together, so one label rises and the other drops to keep both readable on small screens.
export function GlobalPresence() {
  return (
    <div className={styles.map} role="img" aria-label="Map showing Dawood Technologies teams in Karachi and Dubai">
      <div className={styles.frame}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG artwork; next/image adds nothing here. */}
        <img className={styles.land} src="/world-map-dots.svg" alt="" width={presenceMap.width} height={presenceMap.height} />
      </div>
      {teamLocations.map((location) => {
        const { left, top } = projectLocation(location.latitude, location.longitude);
        return (
          <span key={location.city} className={styles.marker} data-side={location.labelSide} style={{ left: `${left}%`, top: `${top}%` }}>
            <span className={styles.label}>
              <span className={styles.city}>{location.city}</span>
              <span className={styles.country}>{location.countryState}</span>
            </span>
          </span>
        );
      })}
    </div>
  );
}
