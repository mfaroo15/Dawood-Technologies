import { Marquee } from "@/app/components/sections/Marquee";
import { TechnologyLogo } from "@/app/components/TechnologyLogo";
import styles from "./TechStrip.module.css";

const platforms = ["AWS", "Microsoft Azure", "Google Cloud", "Oracle", "Salesforce", "Next.js", "React", "Node.js", "TypeScript", "Python", "Docker", "GitHub", "Shopify", "Databricks"];

// Neutral icon or original-colour logo, with the name beside each. The mark is decorative here
// because the visible name already labels it.
export function TechStrip() {
  return (
    <section className={styles.strip} aria-labelledby="tech-strip-title">
      <p className={styles.label} id="tech-strip-title">Built on platforms businesses trust</p>
      <Marquee
        label="Platforms"
        duration={56}
        items={platforms.map((name) => ({
          key: name,
          content: <span className={styles.platform}><span className={styles.logo} aria-hidden="true"><TechnologyLogo name={name} /></span>{name}</span>,
        }))}
      />
      <p className={styles.trademark}>Oracle is a registered trademark of Oracle and/or its affiliates. Salesforce is a trademark of Salesforce, Inc. Other names are trademarks of their respective owners.</p>
    </section>
  );
}
