import { Marquee } from "@/app/components/sections/Marquee";
import { TechnologyLogo } from "@/app/components/TechnologyLogo";
import styles from "./TechStrip.module.css";

const platforms = ["Next.js", "React", "Node.js", "TypeScript", "Python", "Google Cloud", "Docker", "GitHub", "Shopify", "Databricks"];

// Original-colour logos with the name beside each. The logo itself is decorative here
// because the visible name already labels it.
export function TechStrip() {
  return (
    <section className={styles.strip} aria-labelledby="tech-strip-title">
      <p className={styles.label} id="tech-strip-title">Built on platforms businesses trust</p>
      <Marquee
        label="Platforms"
        duration={40}
        items={platforms.map((name) => ({
          key: name,
          content: <span className={styles.platform}><span className={styles.logo} aria-hidden="true"><TechnologyLogo name={name} /></span>{name}</span>,
        }))}
      />
    </section>
  );
}
