import Link from "next/link";
import { ArrowRight, ChartColumn, Compass, LifeBuoy, Plug, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { CtaBand } from "@/app/components/sections/CtaBand";
import { IconTiles } from "@/app/components/sections/IconTiles";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import { TechChips } from "@/app/components/sections/TechChips";
import typography from "@/app/components/sections/typography.module.css";
import { aiApplications, aiServiceAreas } from "@/app/data/ai-nexus";
import { capabilities } from "@/app/data/site";
import styles from "./AiNexusPage.module.css";

const areaIcons = [Compass, Sparkles, Workflow, Plug, ChartColumn, ShieldCheck, LifeBuoy];

const useCases = [
  { title: "Enquiries", text: "Answer and route customer enquiries automatically, around the clock." },
  { title: "Documents", text: "Read invoices, orders and forms and enter the data for you." },
  { title: "Reporting", text: "Ask questions about your business data in plain language." },
];

const relatedServices = [
  { label: "Software & Application Development", href: "/services/application-development" },
  { label: "Enterprise & ERP", href: "/services/enterprise-erp" },
  { label: "Data Services", href: "/services/data-services" },
  { label: "Managed Technology", href: "/services/managed-technology" },
];

export function AiNexusPage() {
  const aiService = capabilities.find((item) => item.slug === "ai-automation")!;
  const technologies = [...aiService.engineeringTechnologies, ...aiService.platforms.map((platform) => platform.name)];

  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "AI Nexus", path: "/services/ai-automation" }]} />
      <PageHero
        kicker="Artificial intelligence & automation"
        title="AI that works with your business."
        lead="From identifying opportunities to integrating intelligent capabilities into existing systems, we help businesses use AI where it improves real workflows."
        buttons={[{ label: "Book an AI consultation", href: "/contact" }]}
      />

      <section className={typography.lightSection} aria-labelledby="ai-scope-title">
        <Reveal className="container">
          <p className={typography.kicker}>AI Nexus capabilities</p>
          <h2 className={typography.heading} id="ai-scope-title">Explore our AI capabilities.</h2>
          <p className={typography.intro}>From strategy and application development to automation, integration and governance, explore how AI can support different business needs.</p>
          <IconTiles columns={3} items={aiServiceAreas.map((area, index) => ({ title: area.title, text: area.summary, icon: areaIcons[index] }))} />
        </Reveal>
      </section>

      <section className={typography.darkSection} aria-labelledby="ai-usecases-title">
        <Reveal className="container">
          <p className={typography.kickerOnDark}>Use cases</p>
          <h2 className={`${typography.heading} ${styles.spacedHeading}`} id="ai-usecases-title">Where businesses start with AI.</h2>
          <ul className={styles.useCases}>
            {useCases.map((item) => (
              <li key={item.title} className={styles.useCase}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className={typography.tintedSection} aria-labelledby="ai-applications-title">
        <Reveal className="container">
          <p className={typography.kicker}>Possible applications</p>
          <h2 className={typography.heading} id="ai-applications-title">Where AI fits into everyday operations.</h2>
          <p className={typography.intro}>Examples to evaluate against your own processes and data.</p>
          <IconTiles columns={3} items={aiApplications} />
        </Reveal>
      </section>

      <section className={typography.lightSection} aria-labelledby="ai-responsible-title">
        <Reveal className={`container ${styles.split}`}>
          <div>
            <p className={typography.kicker}>Responsible implementation</p>
            <h2 className={typography.heading} id="ai-responsible-title">Control is part of the solution.</h2>
          </div>
          <div className={styles.prose}>
            <p>Before a workflow goes into use, its boundaries need to be clear: what information it may access, what it may do and which decisions remain with people. Validation and security considerations belong in implementation planning, alongside the application&apos;s functional requirements.</p>
            <p>Agree who reviews outputs, who approves changes and who takes responsibility when a result needs investigation. Keep a way to escalate exceptions and revisit the controls as the system, its data or its use changes.</p>
          </div>
        </Reveal>
      </section>

      <section className={typography.tintedSection} aria-labelledby="ai-technology-title">
        <Reveal className={`container ${styles.split}`}>
          <div>
            <p className={typography.kicker}>Technology &amp; integration</p>
            <h2 className={typography.heading} id="ai-technology-title">Fit the technology to the environment.</h2>
            <p className={styles.prose}>Selection starts with the existing application environment, information requirements and operating constraints.</p>
          </div>
          <div>
            <TechChips items={technologies} />
            <h3 className={styles.subheading}>Related services</h3>
            <p className={styles.prose}>AI work connects with the applications, data and support that surround it.</p>
            <ul className={styles.related}>
              {relatedServices.map((item) => <li key={item.href}><Link href={item.href}>{item.label} <ArrowRight size={16} aria-hidden="true" /></Link></li>)}
            </ul>
            <h3 className={styles.subheading}>Relevant operating contexts</h3>
            <TechChips items={aiService.industries} />
          </div>
        </Reveal>
      </section>

      <CtaBand heading="Explore what AI can do for your business." text="Book a 30-minute AI consultation with our team." button={{ label: "Book an AI consultation", href: "/contact" }} />
    </main>
  );
}
