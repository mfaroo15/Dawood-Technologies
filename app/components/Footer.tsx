import Image from "next/image";
import Link from "next/link";
import { FooterLead } from "@/app/components/FooterLead";
import { capabilities, contactEmail, contactPhone, contactPresence, legalLinks, linkedInUrl } from "@/app/data/site";
import styles from "./Footer.module.css";

const companyLinks = [
  { href: "/company", label: "About Us" },
  { href: "/work", label: "What We Build" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const serviceOrder = ["technology-consulting", "application-development", "product-design-mvp", "quality-assurance", "enterprise-erp", "cloud-devops", "data-services", "ai-automation", "cybersecurity", "managed-technology"];
// Footer wording that differs from the service name; the page itself stays "AI Nexus".
const footerLabels: Record<string, string> = { "ai-automation": "AI Solutions" };
const serviceLinks = serviceOrder.flatMap((slug) => capabilities.filter((item) => item.slug === slug));

export function Footer() {
  return (
    <footer className="site-footer">
      <FooterLead />
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Link href="/" aria-label="Dawood Technologies home">
            <Image className={styles.logo} src="/dawood-technologies-logo.png" alt="" width={1714} height={221} />
          </Link>
          <p>Business applications, enterprise systems, cloud infrastructure and ongoing technology operations.</p>
          <ul className={styles.list}>
            <li><a href={contactPhone.href}>{contactPhone.display}</a></li>
            <li><a href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
          </ul>
          <a className={styles.social} href={linkedInUrl} target="_blank" rel="noopener" aria-label="Dawood Technologies on LinkedIn">
            {/* LinkedIn mark; lucide-react no longer ships brand icons. */}
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
            </svg>
          </a>
        </div>
        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className={styles.heading}>Company</h2>
          <ul className={styles.list}>{companyLinks.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
        </nav>
        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className={styles.heading}>Services</h2>
          <ul className={styles.list}>{serviceLinks.map((item) => <li key={item.slug}><Link href={`/services/${item.slug}`}>{footerLabels[item.slug] ?? item.title}</Link></li>)}</ul>
        </nav>
        <div>
          <h2 className={styles.heading}>Our teams</h2>
          <ul className={styles.list}>{contactPresence.map((location) => <li key={location}>{location}</li>)}</ul>
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <span>Copyright {new Date().getFullYear()} Dawood Technologies</span>
        <ul className={styles.legal}>{legalLinks.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
      </div>
    </footer>
  );
}
