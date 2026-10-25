import { Mail, MapPin, Phone } from "lucide-react";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbStructuredData";
import BookingCalendar from "@/app/components/BookingCalendar";
import { PageHero } from "@/app/components/sections/PageHero";
import { Reveal } from "@/app/components/sections/Reveal";
import { SecurityTrust } from "@/app/components/sections/SecurityTrust";
import typography from "@/app/components/sections/typography.module.css";
import { ContactForm } from "@/app/contact/ContactForm";
import { contactEmail, contactPhone, contactPresence } from "@/app/data/site";
import { createPageMetadata } from "@/app/lib/metadata";
import styles from "./contact.module.css";

export const metadata = createPageMetadata({
  title: "Contact Dawood Technologies | IT Consulting & Support",
  description: "Contact Dawood Technologies to discuss IT consulting, business systems, cloud infrastructure, software development, or technology solutions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main-content">
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageHero kicker="Contact" title="Let's talk." lead="Tell us about your organization and what you're looking to build. We reply within one business day." />

      {/* The Cal.com embed sizes itself from its container, so this section is not animated. */}
      <section className={typography.lightSection} aria-labelledby="booking-title">
        <div className="container">
          <p className={typography.kicker}>Book a call</p>
          <h2 className={typography.heading} id="booking-title">Schedule an introduction call.</h2>
          <p className={typography.intro}>Pick a time that works for you. We&apos;ll meet on Microsoft Teams for 30 minutes to understand your business and what you&apos;re building.</p>
          <div className="booking-calendar">
            <BookingCalendar />
          </div>
        </div>
      </section>

      <section className={typography.tintedSection} aria-labelledby="inquiry-title">
        <Reveal className="container">
          <p className={typography.kicker}>Send an inquiry</p>
          <h2 className={`${typography.heading} ${styles.spacedHeading}`} id="inquiry-title">Prefer to write?</h2>
          <div className={styles.layout}>
            <ContactForm />

            <aside className={styles.aside} aria-label="Contact information">
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Contact information</h3>
                <a className={styles.contactLink} href={contactPhone.href}>
                  <span className={styles.icon}><Phone aria-hidden="true" size={20} /></span>
                  <span><span className={styles.label}>Phone</span>{contactPhone.display}</span>
                </a>
                <a className={styles.contactLink} href={`mailto:${contactEmail}`}>
                  <span className={styles.icon}><Mail aria-hidden="true" size={20} /></span>
                  <span><span className={styles.label}>Email</span>{contactEmail}</span>
                </a>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Where our team works</h3>
                <ul className={styles.teams}>
                  {contactPresence.map((location) => (
                    <li key={location}>
                      <MapPin aria-hidden="true" size={18} />
                      <span>{location}<span className={styles.teamLabel}>Remote team</span></span>
                    </li>
                  ))}
                </ul>
                <p className={styles.remoteNote}>We&apos;re a remote-first company and work with clients anywhere.</p>
              </div>
              <SecurityTrust variant="compact" />
            </aside>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
