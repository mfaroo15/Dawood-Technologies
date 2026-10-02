import { ButtonLink } from "@/app/components/ButtonLink";
import { CTASection } from "@/app/components/CTASection";
import { PageHero } from "@/app/components/PageHero";
import { locations, values } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description: "Learn why Dawood Technologies was established and how it designs, operates and supports business technology systems.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="ABOUT Dawood Technologies"
        title="Technology capability built around operating businesses."
        text="Dawood Technologies was established to bring software, infrastructure, data, security and technology operations closer to the businesses that depend on them."
      >
        <ButtonLink href="/contact" variant="primary">
          Start a Conversation
        </ButtonLink>
      </PageHero>

      <section className="section about-page">
        <div className="container editorial-intro story-grid">
          <div>
            <div className="section-kicker">WHAT WE DO</div>
            <h2 className="section-title">Applications, infrastructure and operations.</h2>
          </div>
          <div className="editorial-copy about-copy light-copy">
            <p>We plan, build and operate websites, business applications, CRM and enterprise systems, cloud infrastructure, reporting, automation and security controls.</p>
            <p>Requirements are defined against the users, workflows, data and access arrangements involved in day-to-day operation.</p>
            <p>After deployment, we can continue to monitor, maintain and improve the systems we support.</p>
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <div className="editorial-intro intro-block">
            <div>
              <div className="section-kicker">HOW THE COMPANY WORKS</div>
              <h2 className="section-title">Requirements before implementation.</h2>
            </div>
            <p className="section-intro editorial-copy">Each engagement begins with the current systems, users, workflows, constraints and required outcome. These inputs define the implementation plan.</p>
          </div>
          <div className="value-card-grid">
            {values.map((item) => (
              <article className="value-card" key={item}>
                <h3>{item}</h3>
                <p>
                  {item === "Clarity" && "Clear recommendations, plain communication and structured decisions."}
                  {item === "Reliability" && "Systems, support and delivery practices built for dependable use."}
                  {item === "Security" && "Risk awareness, access discipline, audits and safeguards built into the work."}
                  {item === "Practical Innovation" && "Modern tools applied where they solve real business problems."}
                  {item === "Long-Term Value" && "Technology choices that can be maintained, improved and understood over time."}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section locations-section">
        <div className="container">
          <div className="editorial-intro intro-block">
            <div><div className="section-kicker">MARKETS AND LOCATIONS SERVED</div><h2 className="section-title">Support across key business markets.</h2></div>
            <p className="section-intro editorial-copy">These are presented as markets and locations served, not as claims of physical offices in every location.</p>
          </div>
          <div className="locations">
            {locations.map((item) => (
              <span className="location" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
