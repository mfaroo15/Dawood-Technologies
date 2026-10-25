import { Building2, CreditCard, GraduationCap, HeartPulse, Megaphone, MonitorPlay, Package, Plane, Ship, ShoppingCart, Trophy, Truck } from "lucide-react";

// Shared by the /industries page and the homepage industry pills.
export const industries = [
  { title: "Construction & Infrastructure", text: "Manufacturing, inventory, ERP and operations systems.", icon: Package },
  { title: "Trade & Commerce", text: "Products, clients, enquiries and records in one system.", icon: Ship },
  { title: "FinTech", text: "Secure applications, integrations and controlled data workflows.", icon: CreditCard },
  { title: "Aviation", text: "Ground handling, GSE coordination, cargo and workforce scheduling.", icon: Plane },
  { title: "EdTech", text: "Learning platforms, portals and education workflows.", icon: GraduationCap },
  { title: "HealthTech", text: "Secure data workflows and operational systems.", icon: HeartPulse },
  { title: "PropTech", text: "Property workflows, CRM integration and analytics.", icon: Building2 },
  { title: "Media & Entertainment", text: "Content platforms, audiences and cloud infrastructure.", icon: MonitorPlay },
  { title: "Sports", text: "Digital platforms, fan experiences, web and mobile apps, and performance data.", icon: Trophy },
  { title: "Retail & E-commerce", text: "Online stores, inventory, order management, payments and customer systems working together.", icon: ShoppingCart },
  { title: "Logistics & Transportation", text: "Shipment tracking, fleet and warehouse systems, customer portals and operational reporting.", icon: Truck },
  { title: "AdTech", text: "Campaign workflows, reporting, automation and data integration.", icon: Megaphone },
];
