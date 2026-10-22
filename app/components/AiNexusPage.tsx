import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { InnerHero } from "@/app/components/InnerHero";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import { ButtonLink } from "@/app/components/ButtonLink";
import { aiApplications, aiDeliverySteps, aiFaqs, aiServiceAreas } from "@/app/data/ai-nexus";
import { capabilities } from "@/app/data/site";
import styles from "./AiNexusPage.module.css";

export function AiNexusPage() {
  const aiService = capabilities.find((item) => item.slug === "ai-automation")!;
  return <main id="main-content" className={styles.page}>
    <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "AI Nexus", path: "/services/ai-automation" }]} />
    <InnerHero kicker="ARTIFICIAL INTELLIGENCE & AUTOMATION" title="AI Nexus" intro="AI that works with your business." aside={<>
      <p className={styles.heroDescription}>From identifying opportunities to integrating intelligent capabilities into existing systems, Dawood Technologies helps businesses evaluate where AI could improve workflows, information access and everyday operations.</p>
      <ButtonLink href="/contact" variant="primary">Contact Us <ArrowUpRight size={17} aria-hidden="true" /></ButtonLink>
    </>} />

    <section className="section capability-detail-section" aria-labelledby="ai-scope-title"><div className="container numbered-section">
      <div className="section-marker"><p>AI NEXUS CAPABILITIES</p></div>
      <div className="section-body"><h2 id="ai-scope-title">Explore our AI capabilities.</h2>
        <p className="section-intro">From strategy and application development to automation, integration, and governance, explore how AI can support different business needs.</p>
        <p className={styles.scopeNote}>These areas describe potential work, rather than completed projects or a fixed service package. Feasibility, delivery capability and the scope of each engagement are reviewed before work is agreed.</p>
        <ol className={styles.services}>{aiServiceAreas.map((area, index) => <li key={area.title}>
          <div className={styles.serviceIntro}><span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{area.title}</h3><p>{area.description}</p></div></div>
          <ul className={styles.scope}>{area.scope.map((item) => <li key={item}>{item}</li>)}</ul>
        </li>)}</ol>
      </div>
    </div></section>

    <section className="section capability-platform-section" aria-labelledby="ai-applications-title"><div className="container numbered-section">
      <div className="section-marker"><p>POSSIBLE APPLICATIONS</p></div>
      <div className="section-body"><h2 id="ai-applications-title">Where AI fits into everyday operations.</h2>
        <p className="section-intro">Examples to evaluate against your processes and data. They illustrate possible uses, not customer case studies or promised results.</p>
        <div className={styles.examples}>{aiApplications.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div>
    </div></section>

    <section className="section capability-detail-section" aria-labelledby="ai-delivery-title"><div className="container numbered-section">
      <div className="section-marker"><p>DELIVERY APPROACH</p></div>
      <div className="section-body"><h2 id="ai-delivery-title">From business need to working solution.</h2>
        <p className="section-intro">The same operating discipline applies to AI as to other business technology: understand the requirement, agree the work and make ownership clear.</p>
        <ol className={styles.delivery}>{aiDeliverySteps.map((step, index) => <li key={step.title}><span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      </div>
    </div></section>

    <section className="section capability-industries-section" aria-labelledby="ai-responsible-title"><div className="container numbered-section">
      <div className="section-marker"><p>RESPONSIBLE IMPLEMENTATION</p></div>
      <div className="section-body"><h2 id="ai-responsible-title">Control is part of the solution.</h2>
        <div className={styles.prose}><p>Before a workflow goes into use, its boundaries need to be clear: what information it may access, what it may do and which decisions remain with people. Validation and security considerations belong in implementation planning, alongside the application&apos;s functional requirements.</p>
          <p>Agree who reviews outputs, who approves changes and who takes responsibility when a result needs investigation. Keep a way to escalate exceptions and revisit the controls as the system, its data or its use changes.</p>
        </div>
      </div>
    </div></section>

    <section className="section capability-detail-section" aria-labelledby="ai-technology-title"><div className="container numbered-section">
      <div className="section-marker"><p>TECHNOLOGY &amp; INTEGRATION</p></div>
      <div className="section-body"><h2 id="ai-technology-title">Fit the technology to the environment.</h2>
        <div className={styles.prose}><p>Selection starts with the existing application environment, information requirements and operating constraints. Python and the cloud platforms already referenced in our technology work provide context for evaluation; their inclusion does not imply a partnership or a required stack.</p></div>
        <ul className={styles.technologies} aria-label="Existing technology references">{[...aiService.engineeringTechnologies, ...aiService.platforms.map((platform) => platform.name)].map((name) => <li key={name}>{name}</li>)}</ul>
        <p className={styles.relatedIntro}>AI work connects with the applications, data and support that surround it.</p>
        <ul className={styles.related}>{[
          ["Application Development", "/services/application-development"],
          ["Enterprise & ERP", "/services/enterprise-erp"],
          ["Data Services", "/services/data-services"],
          ["Managed Technology", "/services/managed-technology"],
        ].map(([label, href]) => <li key={href}><Link href={href}>{label} <ArrowRight size={16} aria-hidden="true" /></Link></li>)}</ul>
        <h3 className={styles.contextTitle}>Relevant operating contexts.</h3>
        <p className={styles.relatedIntro}>The existing industry references indicate where the offering may apply; they are not a list of completed AI projects.</p>
        <ul className={styles.contexts}>{aiService.industries.map((industry) => <li key={industry}>{industry}</li>)}</ul>
      </div>
    </div></section>

    <section className={`section ${styles.faqSection}`} aria-labelledby="ai-faq-title"><div className="container numbered-section">
      <div className="section-marker"><p>COMMON QUESTIONS</p></div>
      <div className="section-body"><h2 id="ai-faq-title">Planning an AI engagement.</h2>
        <div className={styles.faqs}>{aiFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
      </div>
    </div></section>

    <section className="section cta-section" aria-labelledby="ai-contact-title"><div className="container">
      <p className="section-kicker">LET&apos;S TALK</p><h2 className="section-title" id="ai-contact-title">Have a process that could work better?</h2>
      <p className="section-intro">Tell us what you&apos;re trying to improve. We&apos;ll help you evaluate whether AI, automation or a broader technology solution is the right approach.</p>
      <div className="contact-actions"><ButtonLink href="/contact" variant="primary">Discuss Your Project <ArrowUpRight size={17} aria-hidden="true" /></ButtonLink></div>
    </div></section>
  </main>;
}
