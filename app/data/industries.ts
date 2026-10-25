import { Building2, CreditCard, GraduationCap, HeartPulse, Megaphone, MonitorPlay, Package, Plane, Ship, Trophy } from "lucide-react";

// Shared by the /industries page and the homepage industry pills.
export const industries = [
  { title: "Construction & Infrastructure", text: "Manufacturing, inventory, ERP and operations systems.", icon: Package, platforms: ["NetSuite", "Power BI", "Microsoft 365"] },
  { title: "Trade & Commerce", text: "Products, clients, enquiries and records in one system.", icon: Ship, platforms: ["Shopify", "NetSuite", "Salesforce"] },
  { title: "FinTech", text: "Secure applications, integrations and controlled data workflows.", icon: CreditCard, platforms: ["Microsoft Azure", "AWS", "Databricks", "Salesforce"] },
  { title: "Aviation", text: "Ground handling, GSE coordination, cargo and workforce scheduling.", icon: Plane, platforms: ["Microsoft Azure", "Power BI", "Databricks"] },
  { title: "EdTech", text: "Learning platforms, portals and education workflows.", icon: GraduationCap, platforms: ["Microsoft 365", "Google Cloud", "AWS"] },
  { title: "HealthTech", text: "Secure data workflows and operational systems.", icon: HeartPulse, platforms: ["Microsoft Azure", "AWS", "Power BI"] },
  { title: "PropTech", text: "Property workflows, CRM integration and analytics.", icon: Building2, platforms: ["Salesforce", "Power BI", "Shopify"] },
  { title: "Media & Entertainment", text: "Content platforms, audiences and cloud infrastructure.", icon: MonitorPlay, platforms: ["AWS", "Google Cloud", "Databricks"] },
  { title: "Sports", text: "Digital platforms, fan experiences, web and mobile apps, and performance data.", icon: Trophy, platforms: ["AWS", "Databricks", "Power BI"] },
  { title: "AdTech", text: "Campaign workflows, reporting, automation and data integration.", icon: Megaphone, platforms: ["Google Cloud", "AWS", "Databricks"] },
];
