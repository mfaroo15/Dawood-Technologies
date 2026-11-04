import Link from "next/link";
import { ArrowUpRight, CreditCard, Landmark, LayoutGrid, MessageSquare, Truck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import styles from "./HomeIntegrations.module.css";

type IntegrationGroup = { title: string; subtitle: string; icon: LucideIcon; names: string[] };

// Names only, no third-party logos.
const groups: IntegrationGroup[] = [
  { title: "Payments", subtitle: "Gateways & wallets", icon: CreditCard, names: ["JazzCash", "Easypaisa", "Stripe", "PayPal", "PayFast"] },
  { title: "Banking", subtitle: "Bank payment gateways", icon: Landmark, names: ["Meezan Bank", "HBL", "Bank Alfalah", "Bank AL Habib"] },
  { title: "Messaging", subtitle: "Customer & team", icon: MessageSquare, names: ["WhatsApp Business", "Microsoft Teams", "Email & SMS"] },
  { title: "Delivery", subtitle: "Couriers & tracking", icon: Truck, names: ["TCS", "Leopards", "PostEx", "Trax"] },
  { title: "Business tools", subtitle: "Productivity & marketing", icon: LayoutGrid, names: ["Google Workspace", "Microsoft 365", "Meta", "Mailchimp"] },
];

export function HomeIntegrations() {
  return (
    <section className={styles.section} aria-labelledby="home-integrations-title">
      <Reveal className="container">
        <div className={styles.header}>
          <div>
            <p className={typography.kicker}>Integrations</p>
            <h2 className={`${typography.heading} ${styles.title}`} id="home-integrations-title">Connected to the tools <span className={styles.accent}>your business runs on.</span></h2>
          </div>
          <p className={styles.intro}>We connect your website, ERP and apps to the payment, banking, messaging, delivery and business platforms your customers already use.</p>
        </div>

        <div className={styles.panel}>
          {groups.map(({ title, subtitle, icon: Icon, names }) => (
            <div className={styles.row} key={title}>
              <div className={styles.category}>
                <span className={styles.icon}><Icon aria-hidden="true" size={20} strokeWidth={2} /></span>
                <div>
                  <h3 className={styles.categoryTitle}>{title}</h3>
                  <p className={styles.subtitle}>{subtitle}</p>
                </div>
              </div>
              <ul className={styles.names}>
                {names.map((name) => <li className={styles.name} key={name}>{name}</li>)}
              </ul>
            </div>
          ))}
          <div className={styles.footer}>
            <p className={styles.footerText}><strong>Don&apos;t see yours?</strong> We build custom API integrations for almost any system.</p>
            <Link className={styles.footerLink} href="/contact">Discuss an integration <ArrowUpRight aria-hidden="true" size={15} /></Link>
          </div>
        </div>

        <p className={styles.note}>Trademarks belong to their respective owners. Use does not imply endorsement.</p>
      </Reveal>
    </section>
  );
}
