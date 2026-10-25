import Link from "next/link";
import { ArrowRight, BarChart3, Bot, Cloud, Code2, LayoutGrid, Workflow, type LucideIcon } from "lucide-react";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import styles from "./HomeServices.module.css";

type Service = { title: string; text: string; href: string; icon: LucideIcon; featured?: boolean };

const services: Service[] = [
  { title: "Software & Web Development", text: "Websites, web apps and SaaS products designed around your workflows.", href: "/services/application-development", icon: Code2 },
  { title: "ERP & Business Systems", text: "Inventory, orders, production and invoicing in one system your team trusts.", href: "/services/enterprise-erp", icon: LayoutGrid },
  { title: "AI Agents & Chatbots", text: "Assistants for your website, WhatsApp and Teams that answer, act and hand over to people.", href: "/services/ai-automation", icon: Bot, featured: true },
  { title: "Cloud & Infrastructure", text: "Azure, AWS and Microsoft 365 set up securely, monitored and supported.", href: "/services/cloud-devops", icon: Cloud },
  { title: "AI & Automation", text: "Automate document handling, reporting and repetitive workflows.", href: "/services/ai-automation", icon: Workflow },
  { title: "Data & Dashboards", text: "Reporting connected to your data, so managers see the numbers that matter.", href: "/services/data-services", icon: BarChart3 },
];

export function HomeServices() {
  return (
    <section className={styles.section} aria-labelledby="home-services-title">
      <Reveal className="container">
        <p className={typography.kicker}>What we do</p>
        <h2 className={typography.heading} id="home-services-title">Services built around how your business runs.</h2>
        <p className={typography.intro}>From the first website to the systems behind daily operations, one team designs, builds and supports it.</p>
        <ul className={styles.grid}>
          {services.map(({ title, text, href, icon: Icon, featured }) => (
            <li key={title}>
              <Link className={`${styles.card} ${featured ? styles.featured : ""}`} href={href}>
                <span className={styles.icon}><Icon aria-hidden="true" size={22} /></span>
                <h3 className={styles.title}>
                  {title}
                  {featured ? <span className={styles.badge}>New</span> : null}
                </h3>
                <p className={styles.text}>{text}</p>
                <span className={styles.more}>Explore <ArrowRight aria-hidden="true" size={16} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
