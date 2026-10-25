import Link from "next/link";
import { PageHero } from "@/app/components/PageHero";
import { contactEmail } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How Dawood Technologies collects, uses, shares and protects personal information from our website, contact form, call booking and project conversations.",
  path: "/privacy",
});

const effectiveDate = "October 25, 2026";
const emailLink = <a href={`mailto:${contactEmail}`}>{contactEmail}</a>;

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page" id="main-content">
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        text="How we collect, use and look after the personal information you share with us through this website and when working with our team."
      />

      <section className="section">
        <div className="container legal-layout">
          <aside className="legal-summary">
            <strong>Last updated</strong>
            <p>{effectiveDate}</p>
            <p>Questions about this policy can be sent to {emailLink}.</p>
          </aside>

          <div className="legal-content">
            <section>
              <h2>About this policy</h2>
              <p>Effective date: {effectiveDate}<br />Last updated: {effectiveDate}</p>
              <p>
                Dawood Technologies (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy sets out, in plain terms, what personal information we collect, why we collect it, who we share it with and the choices you have.
              </p>
            </section>

            <section>
              <h2>Scope</h2>
              <p>
                This policy covers information we handle through this website, our contact form, our online call booking, email, and conversations about current or possible projects. Where we sign a separate agreement with a client, that agreement also governs how we handle data within the project.
              </p>
            </section>

            <section>
              <h2>Information we collect</h2>
              <p>When you contact us, you may give us:</p>
              <ul>
                <li>your name, work email address and phone number</li>
                <li>your company name</li>
                <li>the service you are interested in, your budget range and your preferred timeline</li>
                <li>the message you write and anything else you choose to share</li>
              </ul>
              <p>
                When you browse the site, we and our hosting and security providers may also receive basic technical data, such as your device type, browser, the pages you visit and the time of your visit.
              </p>
            </section>

            <section>
              <h2>How we use information</h2>
              <p>We use personal information to:</p>
              <ul>
                <li>reply to your enquiry and follow up on it</li>
                <li>schedule and hold calls you book with us</li>
                <li>prepare proposals and estimates you ask for</li>
                <li>deliver and support the services we agree to provide</li>
                <li>keep this website secure and prevent spam or misuse</li>
                <li>meet our legal, tax and accounting obligations</li>
              </ul>
            </section>

            <section>
              <h2>Services we use</h2>
              <p>We rely on a small number of trusted providers to run this website and our business:</p>
              <ul>
                <li><strong>Formspree</strong> receives and delivers the messages you send through our contact form.</li>
                <li>
                  <strong>Google reCAPTCHA</strong> helps protect our contact form from spam and automated abuse. It collects hardware and software information and sends it to Google. Google&apos;s{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and{" "}
                  <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.
                </li>
                <li><strong>Cal.com</strong> handles the scheduling of calls you book with us.</li>
                <li><strong>Vercel</strong> hosts this website and processes basic technical data to serve and protect it.</li>
                <li><strong>Microsoft 365 and Microsoft Teams</strong> are used for our email and for online meetings.</li>
              </ul>
              <p>Each provider handles information under its own privacy terms.</p>
            </section>

            <section>
              <h2>Sharing</h2>
              <p>
                We do not sell personal information, and we do not share it for targeted advertising. We share it only with the providers listed above, with professional advisers such as lawyers and accountants where needed, or when the law requires us to.
              </p>
            </section>

            <section>
              <h2>How long we keep information</h2>
              <p>
                We keep personal information only for as long as we need it for the purpose it was collected, including any legal or accounting requirements. After that, we delete it or anonymize it so it can no longer identify you.
              </p>
            </section>

            <section>
              <h2>International transfers</h2>
              <p>
                Our team works across the United States, Pakistan and the United Arab Emirates, and our service providers may process data in other countries. When information moves between countries, we take reasonable steps to keep it protected.
              </p>
            </section>

            <section>
              <h2>Data security</h2>
              <p>
                We use reasonable technical and organizational measures to protect personal information, such as limiting access to the people who need it. No method of storing or sending data is completely secure, so we cannot promise absolute security.
              </p>
            </section>

            <section>
              <h2>If a data breach happens</h2>
              <p>
                If we become aware of a breach affecting personal information, we will investigate it, take steps to limit any harm, and notify the people affected and the relevant authorities where the law requires.
              </p>
            </section>

            <section>
              <h2>Your rights</h2>
              <p>
                You can ask to see the personal information we hold about you, have it corrected or deleted, or object to how we use it. To make a request, email {emailLink}. We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2>Children</h2>
              <p>
                This website is not intended for children under 16, and we do not knowingly collect their personal information. If you believe a child has sent us information, please contact us and we will delete it.
              </p>
            </section>

            <section>
              <h2>Links to other websites</h2>
              <p>
                Our website may link to other websites, such as our LinkedIn page. We are not responsible for how those sites handle personal information, so please read their privacy policies.
              </p>
            </section>

            <section>
              <h2>Changes to this policy</h2>
              <p>
                We may update this policy from time to time. When we do, we will change the &quot;Last updated&quot; date at the top of this page.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                Dawood Technologies<br />
                Email: {emailLink}
              </p>
              <p>You can also read our <Link href="/terms">Terms &amp; Conditions</Link>.</p>
            </section>

            <section>
              <h2>Region-specific information</h2>

              <h3>European Union (GDPR)</h3>
              <p>
                We process personal information on the basis of your consent, to take steps towards or carry out a contract with you, or for our legitimate interests in running and protecting our business. In addition to the rights above, you can ask us to restrict how we use your information and to give you a copy of it in a portable format. You also have the right to complain to a data protection authority.
              </p>

              <h3>United Kingdom (UK GDPR)</h3>
              <p>
                You have the same rights as described for the European Union. You can also complain to the Information Commissioner&apos;s Office (ICO).
              </p>

              <h3>United States residents</h3>
              <p>
                Residents of any US state, including Illinois and California, can ask us to access, correct or delete their personal information. We do not sell personal information or share it for targeted advertising, and we will not treat you differently for using your rights.
              </p>

              <h3>United Arab Emirates</h3>
              <p>We handle personal data in line with applicable UAE data protection law.</p>

              <h3>Pakistan</h3>
              <p>
                We handle personal data in line with applicable Pakistani law, and we will update this policy as new data protection laws come into force.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
