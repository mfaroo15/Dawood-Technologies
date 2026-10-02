import Link from "next/link";
import { PageHero } from "@/app/components/PageHero";
import { contactEmail, legalUpdated } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Dawood Technologies website visitors, prospects and clients.",
  path: "/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page" id="main-content">
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        text="This policy explains how Dawood Technologies collects, uses and protects information shared through this website, contact forms and project conversations."
      />

      <section className="section">
        <div className="container legal-layout">
          <aside className="legal-summary">
            <strong>Last updated</strong>
            <p>{legalUpdated}</p>
            <p>
              Questions about privacy can be sent to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </aside>

          <div className="legal-content">
            <section>
              <h2>Information We Collect</h2>
              <p>
                We may collect information you choose to provide, including your name, email address, phone number, company name, project details and messages submitted through the website or direct communication.
              </p>
              <p>
                We may also receive basic technical information such as browser type, device information, referring pages and website usage data through hosting, analytics or security tools.
              </p>
            </section>

            <section>
              <h2>How We Use Information</h2>
              <ul>
                <li>To respond to inquiries and project requests.</li>
                <li>To provide, manage and improve services.</li>
                <li>To prepare proposals, estimates and project communication.</li>
                <li>To maintain website security, performance and reliability.</li>
                <li>To comply with legal, accounting or operational obligations.</li>
              </ul>
            </section>

            <section>
              <h2>Sharing Information</h2>
              <p>
                We do not sell personal information. We may share limited information with service providers when needed for hosting, analytics, communication, project delivery, payment processing, security or legal compliance.
              </p>
            </section>

            <section>
              <h2>Data Security</h2>
              <p>
                We use reasonable administrative, technical and organizational safeguards designed to protect information. No website, network or storage system can be guaranteed to be completely secure.
              </p>
            </section>

            <section>
              <h2>Cookies and Analytics</h2>
              <p>
                This website may use cookies, analytics tools or similar technologies to understand site activity, improve content and protect the website. Browser settings can usually be adjusted to block or delete cookies.
              </p>
            </section>

            <section>
              <h2>Your Choices</h2>
              <p>
                You may contact us to request access, correction or deletion of personal information where applicable. Some information may need to be retained for legitimate business, legal or security reasons.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                For privacy questions, contact <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. You can also review our{" "}
                <Link href="/terms">Terms &amp; Conditions</Link>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
