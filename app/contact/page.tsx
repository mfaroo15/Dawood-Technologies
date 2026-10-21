import { GlobalPresence } from "@/app/contact/GlobalPresence";
import { ContactForm } from "@/app/contact/ContactForm";
import { contactPhone } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact Dawood Technologies | IT Consulting & Support",
  description: "Contact Dawood Technologies to discuss IT consulting, business systems, cloud infrastructure, software development, or technology solutions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="section contact-page">
        <div className="container">
          <header className="contact-intro">
            <p className="section-kicker">CONTACT</p>
            <h1>Let&apos;s talk.</h1>
            <p>Tell us about your organization, technology environment, or what you&apos;re looking to build. Our team will get back to you shortly.</p>
          </header>

          <div className="contact-layout">
            <ContactForm />

            <aside className="contact-information" aria-label="Contact information and geographic presence">
              <section className="contact-information-block">
                <p className="section-kicker">CONTACT INFORMATION</p>
                <a className="contact-phone" href={contactPhone.href}>{contactPhone.display}</a>
                <p>We&apos;re available to discuss your requirements and answer any questions.</p>
              </section>

              <GlobalPresence />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
