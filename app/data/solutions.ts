// Shared by the /work (Solutions) page and the homepage Solutions teaser.
// `id` is the section anchor on /work, e.g. /work#erp.
type Solution = {
  id: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  intro: string;
  challenge: string;
  deliver: string;
  changes: string;
  features: { title: string; text: string }[];
  builtWith: string[];
};

export const solutions: Solution[] = [
  {
    id: "erp",
    title: "ERP & Inventory Systems",
    shortTitle: "ERP & Inventory",
    eyebrow: "For manufacturers, traders and distributors",
    intro: "One accurate picture of stock, orders, production and invoicing.",
    challenge: "Stock, orders and invoices live in separate spreadsheets, so nobody trusts the numbers.",
    deliver: "A central system for inventory, purchasing, sales, production and invoicing, with role-based access.",
    changes: "Teams work from the same live data, and managers see where stock and cash are tied up.",
    features: [
      { title: "Inventory & warehouses", text: "Stock levels, transfers and reorder alerts" },
      { title: "Sales & purchasing", text: "Quotes, orders, suppliers and approvals" },
      { title: "Production", text: "Bills of materials and work orders" },
      { title: "Finance & reporting", text: "Invoicing and live management reports" },
    ],
    builtWith: ["Next.js", "Node.js", "PostgreSQL", "NetSuite", "Microsoft 365"],
  },
  {
    id: "ai-assistants",
    title: "AI Assistants & Agents",
    shortTitle: "AI Assistants",
    eyebrow: "For website, WhatsApp and Microsoft Teams",
    intro: "Answer every customer and employee question, day or night.",
    challenge: "The same questions arrive all day, including outside business hours.",
    deliver: "Assistants that answer from approved information, capture enquiries and act in your systems.",
    changes: "Faster replies for customers and more time for your team, with handover to a person when needed.",
    features: [
      { title: "Customer assistants", text: "Answers, enquiries and call booking" },
      { title: "Internal knowledge", text: "Staff questions answered from company documents" },
      { title: "Connected actions", text: "Updates in your CRM, ERP or helpdesk" },
      { title: "Human handover", text: "Conversation logs and escalation rules" },
    ],
    builtWith: ["OpenAI", "Claude", "WhatsApp Business", "Node.js"],
  },
  {
    id: "websites",
    title: "Business Websites",
    shortTitle: "Business Websites",
    eyebrow: "For companies that need to win customers online",
    intro: "A fast, modern website that turns visitors into enquiries.",
    challenge: "The current site looks dated, is hard to update and rarely produces leads.",
    deliver: "A search-optimized website with clear messaging, enquiry forms, online booking and secure payments.",
    changes: "More enquiries from search, a site your team can update, and a brand that looks as good as your work.",
    features: [
      { title: "Design & content", text: "Clear structure and messaging" },
      { title: "Search optimization", text: "Fast pages built for Google and Bing" },
      { title: "Booking & payments", text: "Calendars, forms and secure checkout" },
      { title: "Easy updates", text: "Content your team can manage" },
    ],
    builtWith: ["Next.js", "Vercel", "Stripe", "Cal.com", "Shopify"],
  },
  {
    id: "web-apps",
    title: "Web Apps & SaaS",
    shortTitle: "Web Apps & SaaS",
    eyebrow: "For founders and teams with a process to digitize",
    intro: "Software designed around the way your business actually works.",
    challenge: "Off-the-shelf tools don't fit the workflow, so work happens in email and spreadsheets.",
    deliver: "Web applications and SaaS products with user accounts, admin tools, integrations and analytics.",
    changes: "One place for the work, fewer manual steps, and a product you own and can grow.",
    features: [
      { title: "Customer & partner portals", text: "Self-service access for your users" },
      { title: "Admin & workflows", text: "Approvals, roles and audit trails" },
      { title: "Integrations", text: "APIs and connections to your existing tools" },
      { title: "SaaS foundations", text: "Subscriptions, multi-tenant setup and analytics" },
    ],
    builtWith: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Azure"],
  },
  {
    id: "cloud-it",
    title: "Cloud & IT",
    shortTitle: "Cloud & IT",
    eyebrow: "For businesses that rely on email, files and devices every day",
    intro: "Secure, managed IT that just works.",
    challenge: "Email, files, devices and access are managed ad hoc, with security gaps and no clear owner.",
    deliver: "Microsoft 365 and cloud setup, secure access, backups, device management and ongoing support.",
    changes: "Fewer interruptions, protected data and a named team responsible for your technology.",
    features: [
      { title: "Microsoft 365", text: "Email, Teams and file sharing set up properly" },
      { title: "Security & access", text: "Multi-factor sign-in and access policies" },
      { title: "Backups & recovery", text: "Data protected and recoverable" },
      { title: "Ongoing support", text: "Monitoring, updates and help when needed" },
    ],
    builtWith: ["Microsoft 365", "Azure", "Intune", "Entra ID", "AWS"],
  },
  {
    id: "dashboards",
    title: "Dashboards",
    shortTitle: "Dashboards",
    eyebrow: "For managers who need numbers they can trust",
    intro: "The figures each team needs, live and in one place.",
    challenge: "Reports are built by hand every week, and different teams quote different numbers.",
    deliver: "Dashboards connected to your business systems, with clear metrics for each team.",
    changes: "Decisions based on current data, and hours of manual reporting saved every week.",
    features: [
      { title: "Connected data", text: "Sales, stock, finance and operations together" },
      { title: "Team views", text: "The right metrics for each role" },
      { title: "Automatic refresh", text: "No manual report building" },
      { title: "Secure sharing", text: "Access controlled by role" },
    ],
    builtWith: ["Power BI", "Databricks", "SQL", "Python"],
  },
];
