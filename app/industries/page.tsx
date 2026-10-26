import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { IconTiles } from "@/app/components/sections/IconTiles";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { industries } from "@/app/data/industries";
import { createPageMetadata } from "@/app/lib/metadata";

export const metadata = createPageMetadata({
  title: "Industries | Dawood Technologies",
  description: "We design, build and run the systems behind day-to-day operations: websites, CRM, ERP and reporting, with teams in Chicago, Karachi and Dubai.",
  path: "/industries",
});

const breadcrumb = [{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }] as const;

// One pill and one tile per industry, in page order, each linking to that industry's page.
const tiles = industries.map(({ name, text, icon, href }) => ({ title: name, text, icon, href, more: `Explore ${name}` }));

export default function IndustriesPage() {
  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[...breadcrumb]} />
      <PageHero breadcrumb={breadcrumb} title="Industries we serve." lead="We design, build and run the systems behind daily operations, from websites and CRM to ERP and reporting." pills={industries.map(({ name, shortTitle, href }) => ({ href, label: shortTitle ?? name }))} pillsLabel="Industry pages" />

      <section className={typography.tintedSection} aria-labelledby="industries-title">
        <Reveal className="container">
          <p className={typography.kicker}>Where we deliver</p>
          <h2 className={typography.heading} id="industries-title">Where our team has delivered.</h2>
          <p className={typography.intro}>Hands-on experience across operating environments, ready to apply to your business.</p>
          <IconTiles items={tiles} />
        </Reveal>
      </section>

      <CtaBand heading="Tell us about your industry." text="We'll walk you through how businesses like yours use technology to work better." />
    </main>
  );
}
