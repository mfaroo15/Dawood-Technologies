import Image from "next/image";
import Link from "next/link";
import { FooterLead } from "@/app/components/FooterLead";
import { capabilities, contactEmail, contactPhone, contactPresence, legalLinks } from "@/app/data/site";
import styles from "./Footer.module.css";

const companyLinks = [
  { href: "/company", label: "About Us" },
  { href: "/work", label: "Our Work" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const serviceOrder = ["technology-consulting", "application-development", "enterprise-erp", "cloud-devops", "data-services", "ai-automation", "cybersecurity", "managed-technology"];
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
        </div>
        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className={styles.heading}>Company</h2>
          <ul className={styles.list}>{companyLinks.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
        </nav>
        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className={styles.heading}>Services</h2>
          <ul className={styles.list}>{serviceLinks.map((item) => <li key={item.slug}><Link href={`/services/${item.slug}`}>{item.title}</Link></li>)}</ul>
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
