import { teamLocations } from "@/app/data/global-presence";

export const siteUrl = "https://www.dawoodtech.com";
export const foundingYear = 2022;
export const contactEmail = "info@dawoodtech.com";
export const linkedInUrl = "https://www.linkedin.com/company/dawoodtech/";
export const contactPhone = {
  display: "224-598-7275",
  href: "tel:+12245987275",
  schema: "+1-224-598-7275",
} as const;
export const contactPresence = teamLocations.map(({ city, countryState }) => `${city}, ${countryState.split(", ").at(-1)}`);
export const legalUpdated = "September 21, 2026";

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/services/ai-automation", label: "AI Solutions" },
  { href: "/work", label: "What We Build" },
  { href: "/company", label: "About Us" },
  { href: "/careers", label: "Careers" },
];

export const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export const capabilities = [
  {
    code: "01", slug: "technology-consulting", title: "Technology Consulting",
    tagline: "Assessments, architecture and implementation roadmaps.",
    summary: "Technology assessments, architecture decisions and implementation roadmaps based on business requirements and existing systems.",
    introduction: "We assess existing systems, document requirements and define architecture, platform and delivery priorities before or alongside implementation.",
    items: ["Technology strategy", "Digital transformation consulting", "Technology assessments", "Solution architecture", "Systems and platform advisory", "Cloud strategy", "Technology roadmapping"],
    platforms: ["Microsoft 365", "Microsoft Azure", "AWS", "Google Cloud", "Salesforce"],
    industries: ["FinTech", "HealthTech", "Retail & E-commerce", "Construction & Infrastructure"],
  },
  {
    code: "02", slug: "ai-automation", title: "AI Nexus", listedUnderServices: false,
    tagline: "AI agents, chatbots and automation for your website, WhatsApp and internal systems.",
    summary: "AI applications and workflow automation integrated into defined business processes with appropriate controls.",
    introduction: "We identify repeatable workflows, evaluate where AI or automation is appropriate, and build the applications, integrations and controls required for production use.",
    items: ["AI consulting", "AI application development", "AI agents and chatbots", "AI integration", "Intelligent automation", "Workflow automation", "Business process automation", "AI-enabled business applications"],
    platforms: ["OpenAI", "Microsoft Azure", "Databricks", "Power BI", "Python"],
    industries: ["FinTech", "HealthTech", "Retail & E-commerce", "Construction & Infrastructure"],
  },
  {
    code: "03", slug: "cloud-devops", title: "Cloud & DevOps",
    tagline: "Cloud architecture, migration and deployment pipelines.",
    summary: "Cloud architecture, migration, infrastructure automation and deployment pipelines for business applications.",
    introduction: "We design, migrate and maintain cloud environments, including infrastructure, deployment workflows, monitoring and security controls.",
    items: ["Cloud consulting", "Cloud architecture", "Cloud migration", "Cloud infrastructure", "DevOps", "Cloud optimization", "Infrastructure automation", "Managed cloud"],
    platforms: ["Microsoft Azure", "AWS", "Google Cloud", "Docker", "GitHub"],
    industries: ["Media & Entertainment", "FinTech", "Retail & E-commerce", "Logistics & Transportation"],
  },
  {
    code: "04", slug: "application-development", title: "Software & Application Development",
    tagline: "Websites, custom software, SaaS products, web and mobile apps.",
    summary: "Website design and development, custom software, SaaS products, web and mobile apps, APIs and integrations — built and supported by Dawood Technologies.",
    introduction: "We design and build websites, custom software, SaaS products, web and mobile applications, APIs and integrations around your business requirements.",
    items: ["Website design & development", "Custom software development", "SaaS product development", "Web application development", "Mobile application development", "Enterprise application development", "Customer and employee portals", "API development and integration", "E-commerce development", "CMS & website management", "Application modernization", "UI/UX engineering"],
    platforms: ["Next.js", "React", "Node.js", "TypeScript", "Python", "Shopify", "GitHub", "Docker"],
    ctaHeading: "Let's talk about your software project.",
    industries: ["Construction & Infrastructure", "Trade & Commerce", "Retail & E-commerce"],
  },
  {
    code: "05", slug: "enterprise-erp", title: "Enterprise & ERP",
    tagline: "CRM, ERP and business systems that connect your operations.",
    summary: "CRM, ERP and workflow systems configured and integrated around day-to-day business operations.",
    introduction: "We select, configure and connect CRM, ERP and workflow platforms around business data, responsibilities and operating processes.",
    items: ["CRM solutions", "ERP solutions", "Systems integration", "Workflow automation", "Business process digitization", "Platform implementation", "Application integration", "Enterprise support"],
    platforms: ["NetSuite", "Salesforce", "Microsoft 365", "Power BI"],
    industries: ["Construction & Infrastructure", "Trade & Commerce", "Retail & E-commerce"],
  },
  {
    code: "06", slug: "data-services", title: "Data Services",
    tagline: "Integration, reporting and dashboards for decisions.",
    summary: "Data pipelines, integrations, reporting and analytics for operational and management information.",
    introduction: "We organize data from business systems, build integrations and reporting pipelines, and deliver dashboards and analysis for operational use.",
    items: ["Data engineering", "Business intelligence", "Data visualization", "Data analytics", "Data strategy", "Reporting solutions", "Data integration", "Operational analytics"],
    platforms: ["Power BI", "Databricks", "Microsoft Azure", "Google Cloud", "Python"],
    industries: ["FinTech", "Retail & E-commerce", "Construction & Infrastructure", "Logistics & Transportation", "Trade & Commerce"],
  },
  {
    code: "07", slug: "cybersecurity", title: "Cybersecurity",
    tagline: "Risk assessments and practical security controls.",
    summary: "Security assessments and controls for identities, applications, cloud environments and infrastructure.",
    introduction: "We assess security risks and implement prioritized controls across user access, applications, cloud environments and infrastructure.",
    items: ["Security assessments", "Application security", "Cloud security", "Identity and access management", "Security hardening", "Vulnerability management", "Security monitoring", "Security architecture"],
    platforms: ["Microsoft Azure", "Microsoft 365", "AWS", "Google Cloud", "GitHub"],
    industries: ["Construction & Infrastructure", "Trade & Commerce", "Retail & E-commerce"],
  },
  {
    code: "08", slug: "managed-technology", title: "Managed Technology",
    tagline: "Monitoring, support and continuous improvement.",
    summary: "Ongoing monitoring, administration, support and maintenance for applications and infrastructure.",
    introduction: "We operate and maintain deployed systems through monitoring, administration, incident support, updates and planned improvements.",
    items: ["Managed IT", "Application support", "Infrastructure management", "Systems administration", "Technology operations", "Monitoring and maintenance", "Platform support", "Continuous improvement"],
    platforms: ["Microsoft 365", "Microsoft Azure", "AWS", "Google Cloud"],
    industries: ["Construction & Infrastructure", "Trade & Commerce", "Retail & E-commerce"],
  },
  {
    code: "09", slug: "quality-assurance", title: "Quality Assurance & Testing",
    tagline: "Manual and automated testing so software works before your customers use it.",
    summary: "Manual and automated testing so software works before your customers use it.",
    introduction: "We test web, mobile and enterprise applications throughout development and before every release, so issues are found early and releases go out with confidence.",
    items: ["Functional testing", "Test automation", "Regression testing", "Performance and load testing", "API testing", "Mobile app testing", "Accessibility testing", "Release and UAT support"],
    platforms: ["GitHub", "Docker", "Python"],
    industries: ["FinTech", "HealthTech", "Retail & E-commerce", "EdTech", "Logistics & Transportation"],
  },
  {
    code: "10", slug: "product-design-mvp", title: "Product Design & MVP Development",
    tagline: "From idea to a working first version, designed around real users.",
    summary: "From idea to a working first version, designed around real users.",
    introduction: "We help founders and businesses turn an idea into a usable product: research, UX/UI design, clickable prototypes and a minimum viable product built to test with real users and grow.",
    items: ["Product discovery workshops", "UX research", "UI design", "Clickable prototypes", "Design systems", "MVP development", "User testing", "Product roadmap"],
    platforms: ["Next.js", "React", "Node.js", "TypeScript"],
    industries: ["FinTech", "HealthTech", "EdTech", "PropTech", "Retail & E-commerce"],
  },
] as const;

// Directory visibility is separate from route existence and contextual references.
export const serviceDirectory = capabilities.filter((item) => !("listedUnderServices" in item) || item.listedUnderServices);

// The Dawood operating businesses whose technology our team built and runs (shown on /company).
export const operatingBusinesses = [
  {
    slug: "dawood-rcc-pipe",
    name: "Dawood RCC Pipe",
    industry: "Construction & Infrastructure",
    image: "/work/rcc-pipe.png",
    domain: "dawoodrccpipe.com",
    about: "Our family's RCC pipe manufacturing business, established in Karachi in 1967. We built and run its website, product catalogue, quote requests, inventory and business records in one place.",
    built: ["Company website", "Product catalogue", "Inventory", "CRM", "ERP", "Reporting"],
    supported: "Website, ERP, CRM and managed IT — live and supported every day.",
  },
  {
    slug: "dawood-traders",
    name: "Dawood Traders",
    industry: "Trade & Commerce",
    image: "/work/traders.png",
    domain: "dawoodtraderspk.com",
    about: "Our international trading and export business. We built and run the systems that manage its product range, buyer relationships, enquiries and records.",
    built: ["Company website", "Product range", "Inventory", "CRM & enquiries", "ERP", "Records & reporting"],
    supported: "Website, ERP, CRM and managed IT — live and supported every day.",
  },
] as const;

export const engineeringLayers = [
  { title: "Experience", items: ["Web Applications", "Mobile", "Internal Tools", "Customer Experiences"] },
  { title: "Application", items: ["Business Logic", "APIs", "Integrations", "Enterprise Applications"] },
  { title: "Data & Automation", items: ["Databases", "Analytics", "Data Pipelines", "Automation", "AI where appropriate"] },
  { title: "Infrastructure", items: ["Cloud", "Deployment", "Networking", "Security"] },
  { title: "Operations", items: ["Monitoring", "Support", "Maintenance", "Continuous Improvement"] },
] as const;

export const engineeringTechnologies = ["TypeScript", "Python", "React", "Next.js", "Node.js", "Docker", "GitHub"] as const;
export const contactServiceOptions = capabilities.map((item) => item.title);

export const solutions = [
  { label: "01", title: "Business Applications", text: "Custom systems for operational workflows, approvals, internal coordination and reporting.", services: ["Application development", "Systems integration", "Data services"] },
  { label: "02", title: "Customer & Employee Portals", text: "Authenticated portals that provide customers and employees with access to information, services and workflows.", services: ["Portal engineering", "Identity and access", "API integration"] },
  { label: "03", title: "CRM & Workflow Solutions", text: "CRM configuration, customer-data integration and workflow automation for sales and service teams.", services: ["CRM implementation", "Workflow automation", "Platform integration"] },
  { label: "04", title: "E-commerce Solutions", text: "Online stores connected with product, inventory, payment, customer and reporting systems.", services: ["Commerce development", "Shopify", "Systems integration"] },
  { label: "05", title: "Data & Analytics Solutions", text: "Data integration, reporting and dashboards for operational and management information.", services: ["Business intelligence", "Data integration", "Operational analytics"] },
  { label: "06", title: "AI-powered Business Solutions", text: "AI-assisted applications and automation for defined tasks, workflows and business rules.", services: ["AI integration", "Intelligent automation", "AI applications"] },
  { label: "07", title: "Cloud & Infrastructure Solutions", text: "Cloud architecture, deployment pipelines, monitoring and managed infrastructure for business applications.", services: ["Cloud architecture", "DevOps", "Managed cloud"] },
] as const;
