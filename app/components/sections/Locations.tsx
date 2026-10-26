import { LocalTime } from "./LocalTime";
import { Reveal } from "./Reveal";
import styles from "./Locations.module.css";
import typography from "./typography.module.css";

const locations = [
  { city: "Chicago", country: "United States", timeZone: "America/Chicago", role: "Your point of contact in US hours" },
  { city: "Karachi", country: "Pakistan", timeZone: "Asia/Karachi", role: "Work progresses overnight" },
  { city: "Dubai", country: "United Arab Emirates", timeZone: "Asia/Dubai", role: "Close to clients in the Gulf" },
];

type LocationsProps = { kicker?: string; heading?: string; intro?: string };

// Dark "where we operate" section with live local times.
export function Locations({
  kicker = "Where we operate",
  heading = "One team across your working day.",
  intro = "US management, South Asia engineering and a Middle East presence, so someone is always working on your project.",
}: LocationsProps) {
  return (
    <section id="where-we-operate" className={styles.section} aria-labelledby="locations-title">
      <Reveal className="container">
        <p className={typography.kickerOnDark}>{kicker}</p>
        <h2 id="locations-title" className={typography.heading}>{heading}</h2>
        <p className={typography.introOnDark}>{intro}</p>
        <ul className={styles.grid}>
          {locations.map((location) => (
            <li key={location.city}>
              <LocalTime className={styles.time} timeZone={location.timeZone} />
              <h3 className={styles.city}>{location.city}</h3>
              <p className={styles.country}>{location.country}</p>
              <p className={styles.role}>{location.role}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
