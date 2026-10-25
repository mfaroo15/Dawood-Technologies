import { AppWindow, Bot, Boxes, ChartColumn, Cloud, Globe, type LucideIcon } from "lucide-react";

// Shared by the /work page and the homepage "What we build" panel.
type Solution = { title: string; shortTitle: string; shortTag: string; audience?: string; problem: string; build: string; stack: string[]; icon: LucideIcon; service: { label: string; href: string } };

export const solutions: Solution[] = [
  {
    title: "ERP & Inventory Systems",
    shortTitle: "ERP & Inventory",
    shortTag: "Manufacturers & traders",
    audience: "For manufacturers, traders and distributors",
    problem: "Stock, orders, production and invoicing live in separate spreadsheets, so nobody has one accurate picture.",
    build: "A central system for inventory, purchasing, sales orders, production and invoicing, with role-based access and reports.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Microsoft 365 integration"],
    icon: Boxes,
    service: { label: "Enterprise & ERP", href: "/services/enterprise-erp" },
  },
  {
    title: "AI Chatbots & Agents",
    shortTitle: "AI Chatbots",
    shortTag: "Website & WhatsApp",
    audience: "Website, WhatsApp and Microsoft Teams",
    problem: "The same customer and staff questions arrive all day, including outside business hours.",
    build: "Assistants that answer from approved information, capture enquiries, book calls and act in connected systems, with handover to a person.",
    stack: ["OpenAI / Claude APIs", "WhatsApp Business API", "Node.js", "Vector search"],
    icon: Bot,
    service: { label: "AI Nexus", href: "/services/ai-automation" },
  },
  {
    title: "Business Websites with Booking & Payments",
    shortTitle: "Business Websites",
    shortTag: "Booking & payments",
    problem: "A website that looks dated, is hard to update and doesn't turn visitors into enquiries.",
    build: "A fast, search-optimized website with online booking, enquiry forms and secure payments.",
    stack: ["Next.js", "Vercel", "Stripe", "Cal.com"],
    icon: Globe,
    service: { label: "Software & Application Development", href: "/services/application-development" },
  },
  {
    title: "Custom Web Apps & SaaS",
    shortTitle: "Custom Web Apps",
    shortTag: "SaaS & portals",
    problem: "Off-the-shelf software doesn't fit the way the business actually works.",
    build: "Web applications and SaaS products designed around your workflows, with user accounts, admin tools and integrations.",
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS / Azure"],
    icon: AppWindow,
    service: { label: "Software & Application Development", href: "/services/application-development" },
  },
  {
    title: "Cloud Setup & IT Support",
    shortTitle: "Cloud & IT",
    shortTag: "Microsoft 365 & Azure",
    problem: "Email, files, devices and access are managed ad hoc, with security gaps and no clear ownership.",
    build: "Microsoft 365 and cloud setup, secure access, backups, device management and ongoing support.",
    stack: ["Microsoft 365", "Azure", "Intune", "Entra ID"],
    icon: Cloud,
    service: { label: "Managed Technology", href: "/services/managed-technology" },
  },
  {
    title: "Reporting Dashboards",
    shortTitle: "Dashboards",
    shortTag: "Power BI & custom",
    problem: "Managers wait for manual reports and still don't trust the numbers.",
    build: "Dashboards connected to your business data, showing the figures each team needs in real time.",
    stack: ["Power BI", "SQL", "Custom dashboards"],
    icon: ChartColumn,
    service: { label: "Data Services", href: "/services/data-services" },
  },
];
