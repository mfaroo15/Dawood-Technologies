import { Cloud, Database, Server, Users, type LucideIcon } from "lucide-react";
import { Marquee } from "@/app/components/sections/Marquee";
import { TechnologyLogo } from "@/app/components/TechnologyLogo";
import styles from "./TechStrip.module.css";

// Their trademark rules restrict logo use, so these show the name with a neutral icon.
const namedPlatforms: { name: string; icon: LucideIcon }[] = [
  { name: "AWS", icon: Server },
  { name: "Microsoft Azure", icon: Cloud },
  { name: "Google Cloud", icon: Cloud },
  { name: "Oracle", icon: Database },
  { name: "Salesforce", icon: Users },
];
const logoPlatforms = ["Next.js", "React", "Node.js", "TypeScript", "Python", "Docker", "GitHub", "Shopify", "Databricks"];

// Original-colour logos with the name beside each. The logo or icon is decorative here
// because the visible name already labels it.
export function TechStrip() {
  return (
    <section className={styles.strip} aria-labelledby="tech-strip-title">
      <p className={styles.label} id="tech-strip-title">Built on platforms businesses trust</p>
      <Marquee
        label="Platforms"
        duration={56}
        items={[
          ...namedPlatforms.map(({ name, icon: Icon }) => ({
            key: name,
            content: <span className={styles.platform}><span className={styles.tile} aria-hidden="true"><Icon size={16} strokeWidth={1.75} /></span>{name}</span>,
          })),
          ...logoPlatforms.map((name) => ({
            key: name,
            content: <span className={styles.platform}><span className={styles.logo} aria-hidden="true"><TechnologyLogo name={name} /></span>{name}</span>,
          })),
        ]}
      />
      <p className={styles.trademark}>Oracle is a registered trademark of Oracle and/or its affiliates. Salesforce is a trademark of Salesforce, Inc. Other names are trademarks of their respective owners.</p>
    </section>
  );
}
