import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { PlatformLogos, trademarkNote } from "@/app/components/PlatformLogos";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { IconTiles } from "@/app/components/sections/IconTiles";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { industries } from "@/app/data/industries";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./industries.module.css";

export const metadata = createPageMetadata({
  title: "Industries | Dawood Technologies",
  description: "We design, build and run the systems behind day-to-day operations: websites, CRM, ERP and reporting, with teams in Chicago, Karachi and Dubai.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }]} />
      <PageHero kicker="Industries" title="Industries we serve." lead="We design, build and run the systems behind day-to-day operations, from websites and CRM to ERP and reporting, for businesses across industries and time zones." />

      <section className={typography.tintedSection} aria-labelledby="industries-title">
        <Reveal className="container">
          <p className={typography.kicker}>Where we deliver</p>
          <h2 className={typography.heading} id="industries-title">Where our team has delivered.</h2>
          <p className={typography.intro}>Hands-on experience across operating environments, ready to apply to your business.</p>
          <IconTiles columns={5} items={industries.map((industry) => ({ ...industry, footer: <PlatformLogos variant="compact" names={industry.platforms} /> }))} />
          <p className={styles.note}>{trademarkNote}</p>
        </Reveal>
      </section>

      <CtaBand heading="Tell us about your industry." />
    </main>
  );
}
