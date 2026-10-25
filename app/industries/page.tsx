import { Building2, CreditCard, GraduationCap, HeartPulse, Megaphone, MonitorPlay, Package, Plane, Ship, Trophy } from "lucide-react";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { IconTiles } from "@/app/components/sections/IconTiles";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { createPageMetadata } from "@/app/lib/metadata";

export const metadata = createPageMetadata({
  title: "Industries | Dawood Technologies",
  description: "We design, build and run the systems behind day-to-day operations: websites, CRM, ERP and reporting, with teams in Chicago, Karachi and Dubai.",
  path: "/industries",
});

const industries = [
  { title: "Construction & Infrastructure", text: "Manufacturing, inventory, ERP and operations systems.", icon: Package },
  { title: "Trade & Commerce", text: "Products, clients, enquiries and records in one system.", icon: Ship },
  { title: "FinTech", text: "Secure applications, integrations and controlled data workflows.", icon: CreditCard },
  { title: "Aviation", text: "Ground handling, GSE coordination, cargo and workforce scheduling.", icon: Plane },
  { title: "EdTech", text: "Learning platforms, portals and education workflows.", icon: GraduationCap },
  { title: "HealthTech", text: "Secure data workflows and operational systems.", icon: HeartPulse },
  { title: "PropTech", text: "Property workflows, CRM integration and analytics.", icon: Building2 },
  { title: "Media & Entertainment", text: "Content platforms, audiences and cloud infrastructure.", icon: MonitorPlay },
  { title: "Sports", text: "Digital platforms, fan experiences, web and mobile apps, and performance data.", icon: Trophy },
  { title: "AdTech", text: "Campaign workflows, reporting, automation and data integration.", icon: Megaphone },
];

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
          <IconTiles columns={5} items={industries} />
        </Reveal>
      </section>

      <CtaBand heading="Tell us about your industry." />
    </main>
  );
}
