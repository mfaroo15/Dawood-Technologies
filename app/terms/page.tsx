import Link from "next/link";
import { PageHero } from "@/app/components/sections/PageHero";
import { contactEmail, legalUpdated } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";

export const metadata = createPageMetadata({
  title: "Terms & Conditions",
  description: "The terms that apply when you use the Dawood Technologies website, contact our team or ask about our services, including acceptable use and liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="legal-page" id="main-content">
      <PageHero breadcrumb={[{ name: "Home", path: "/" }, { name: "Terms & Conditions", path: "/terms" }]} title="Terms & Conditions" lead={`Last updated ${legalUpdated}`} />

      <section className="section">
        <div className="container legal-layout">
          <aside className="legal-summary">
            <strong>Last updated</strong>
            <p>{legalUpdated}</p>
            <p>
              Questions about these terms can be sent to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </aside>

          <div className="legal-content">
            <section>
              <h2>Use of This Website</h2>
              <p>
                This website is provided for general information about Dawood Technologies and its services. You agree not to misuse the website, interfere with its operation or attempt unauthorized access to related systems.
              </p>
            </section>

            <section>
              <h2>Service Information</h2>
              <p>
                Website content, service descriptions and examples are provided for informational purposes only. A specific engagement, scope, timeline, deliverable or fee applies only when confirmed in a written proposal, agreement or statement of work.
              </p>
            </section>

            <section>
              <h2>Client Responsibilities</h2>
              <ul>
                <li>Provide accurate information needed for project scoping and delivery.</li>
                <li>Maintain appropriate access to accounts, systems, content and third-party services.</li>
                <li>Review deliverables, provide feedback and approve work in a timely manner.</li>
                <li>Use delivered systems and recommendations responsibly within your business environment.</li>
              </ul>
            </section>

            <section>
              <h2>Intellectual Property</h2>
              <p>
                Unless otherwise agreed in writing, website content, branding, templates, processes and materials created by Dawood Technologies remain protected by applicable intellectual property laws. Client-owned materials remain the property of the client.
              </p>
              <p>
                Ownership of project deliverables should be defined in the applicable proposal or agreement.
              </p>
            </section>

            <section>
              <h2>Third-Party Services</h2>
              <p>
                Projects may involve third-party platforms, plugins, hosting providers, payment processors, analytics tools or software vendors. Dawood Technologies is not responsible for changes, outages, pricing, security incidents or policy decisions made by third-party providers.
              </p>
            </section>

            <section>
              <h2>No Regulated Advice</h2>
              <p>
                Services related to finance systems, cybersecurity, IT controls, analytics or business operations are provided as technology and operational support. They do not constitute legal, financial, tax, insurance or regulated professional advice.
              </p>
            </section>

            <section>
              <h2>Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Dawood Technologies is not liable for indirect, incidental, consequential, special or punitive damages arising from website use or services unless a separate written agreement states otherwise.
              </p>
            </section>

            <section>
              <h2>Updates to Terms</h2>
              <p>
                These terms may be updated from time to time. Continued use of the website after updates means you accept the revised terms.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                For questions, contact <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. You can also review our{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
