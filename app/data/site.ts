export const siteUrl = "https://www.dawoodtech.com";
export const foundingYear = 2026;
export const contactEmail = "info@dawoodtech.com";
export const contactPhone = {
  display: "224-598-7275",
  href: "tel:+12245987275",
  schema: "+1-224-598-7275",
} as const;
export const contactPresence = ["Chicago, Illinois", "Karachi, Pakistan"] as const;
export const legalUpdated = "September 21, 2026";

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/solutions", label: "Solutions" },
  { href: "/work", label: "Work" },
  { href: "/company", label: "Company" },
];

export const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export const capabilities = [
  {
    code: "01", slug: "technology-consulting", title: "Technology Consulting",
    summary: "Technology assessments, architecture decisions and implementation roadmaps based on business requirements and existing systems.",
    introduction: "We assess existing systems, document requirements and define architecture, platform and delivery priorities before or alongside implementation.",
    items: ["Technology strategy", "Digital transformation consulting", "Technology assessments", "Solution architecture", "Systems and platform advisory", "Cloud strategy", "Technology roadmapping"],
    platforms: [],
    engineeringTechnologies: [],
    industries: ["FinTech", "HealthTech", "Retail & E-commerce", "Manufacturing & Infrastructure", "Professional Services"],
  },
  {
    code: "02", slug: "ai-automation", title: "AI & Automation",
    summary: "AI applications and workflow automation integrated into defined business processes with appropriate controls.",
    introduction: "We identify repeatable workflows, evaluate where AI or automation is appropriate, and build the applications, integrations and controls required for production use.",
    items: ["AI consulting", "AI application development", "AI integration", "Intelligent automation", "Workflow automation", "Business process automation", "AI-enabled business applications"],
    platforms: [{ name: "Microsoft Azure", category: "Cloud" }, { name: "AWS", category: "Cloud" }, { name: "Google Cloud", category: "Cloud" }],
    engineeringTechnologies: ["Python"],
    industries: ["FinTech", "HealthTech", "Retail & E-commerce", "Manufacturing & Infrastructure", "Professional Services"],
  },
  {
    code: "03", slug: "cloud-devops", title: "Cloud & DevOps",
    summary: "Cloud architecture, migration, infrastructure automation and deployment pipelines for business applications.",
    introduction: "We design, migrate and maintain cloud environments, including infrastructure, deployment workflows, monitoring and security controls.",
    items: ["Cloud consulting", "Cloud architecture", "Cloud migration", "Cloud infrastructure", "DevOps", "Cloud optimization", "Infrastructure automation", "Managed cloud"],
    platforms: [{ name: "AWS", category: "Cloud" }, { name: "Microsoft Azure", category: "Cloud" }, { name: "Google Cloud", category: "Cloud" }, { name: "Vercel", category: "Application delivery" }],
    engineeringTechnologies: ["Docker", "GitHub"],
    industries: ["Media & Entertainment", "FinTech", "Retail & E-commerce", "Logistics & Supply Chain", "Professional Services"],
  },
  {
    code: "04", slug: "application-development", title: "Application Development",
    summary: "Web and mobile applications, internal platforms, APIs and integrations built around defined users and workflows.",
    introduction: "We turn business requirements into maintainable web applications, mobile applications, internal platforms, APIs and system integrations.",
    items: ["Web application development", "Mobile application development", "Enterprise application development", "Customer and employee portals", "API development and integration", "E-commerce development", "Application modernization", "UI/UX engineering"],
    platforms: [{ name: "Vercel", category: "Application delivery" }, { name: "Shopify", category: "Commerce" }],
    engineeringTechnologies: ["TypeScript", "Python", "React", "Next.js", "Node.js"],
    industries: ["Manufacturing & Infrastructure", "International Trade & Commerce", "Retail & Commerce", "Professional Services"],
  },
  {
    code: "05", slug: "enterprise-erp", title: "Enterprise & ERP",
    summary: "CRM, ERP and workflow systems configured and integrated around day-to-day business operations.",
    introduction: "We select, configure and connect CRM, ERP and workflow platforms around business data, responsibilities and operating processes.",
    items: ["CRM solutions", "ERP solutions", "Systems integration", "Workflow automation", "Business process digitization", "Platform implementation", "Application integration", "Enterprise support"],
    platforms: [{ name: "Salesforce", category: "Enterprise" }, { name: "Microsoft Dynamics 365", category: "Enterprise" }],
    engineeringTechnologies: [],
    industries: ["Manufacturing & Infrastructure", "International Trade & Commerce", "Retail & Commerce", "Professional Services"],
  },
  {
    code: "06", slug: "data-services", title: "Data Services",
    summary: "Data pipelines, integrations, reporting and analytics for operational and management information.",
    introduction: "We organize data from business systems, build integrations and reporting pipelines, and deliver dashboards and analysis for operational use.",
    items: ["Data engineering", "Business intelligence", "Data visualization", "Data analytics", "Data strategy", "Reporting solutions", "Data integration", "Operational analytics"],
    platforms: [{ name: "Power BI", category: "Data & Analytics" }],
    engineeringTechnologies: ["Python"],
    industries: ["FinTech", "Retail & E-commerce", "Manufacturing & Infrastructure", "Logistics & Supply Chain", "International Trade & Commerce"],
  },
  {
    code: "07", slug: "cybersecurity", title: "Cybersecurity",
    summary: "Security assessments and controls for identities, applications, cloud environments and infrastructure.",
    introduction: "We assess security risks and implement prioritized controls across user access, applications, cloud environments and infrastructure.",
    items: ["Security assessments", "Application security", "Cloud security", "Identity and access management", "Security hardening", "Vulnerability management", "Security monitoring", "Security architecture"],
    platforms: [],
    engineeringTechnologies: [],
    industries: ["Manufacturing & Infrastructure", "International Trade & Commerce", "Retail & Commerce", "Professional Services"],
  },
  {
    code: "08", slug: "managed-technology", title: "Managed Technology",
    summary: "Ongoing monitoring, administration, support and maintenance for applications and infrastructure.",
    introduction: "We operate and maintain deployed systems through monitoring, administration, incident support, updates and planned improvements.",
    items: ["Managed IT", "Application support", "Infrastructure management", "Systems administration", "Technology operations", "Monitoring and maintenance", "Platform support", "Continuous improvement"],
    platforms: [],
    engineeringTechnologies: [],
    industries: ["Manufacturing & Infrastructure", "International Trade & Commerce", "Retail & Commerce", "Agriculture & Dairy", "Professional Services"],
  },
] as const;

export const industries = [
  { code: "01", basis: "operating", title: "Construction & Infrastructure", text: "Technology supporting operational businesses across manufacturing, construction, infrastructure and related environments.", needs: ["Business applications", "Digital presence", "Reporting", "Technology infrastructure"] },
  { code: "02", basis: "operating", title: "International Trade & Commerce", text: "Technology supporting digital operations, business systems, communications and infrastructure for organizations operating across markets.", needs: ["Business systems", "Digital presence", "Communications", "Technology infrastructure"] },
  { code: "03", basis: "team", title: "FinTech", text: "Team experience and technology applications involving secure systems, data, integrations and controlled workflows.", needs: ["Secure applications", "Systems integration", "Data workflows", "Automation"] },
  { code: "04", basis: "team", title: "EdTech", text: "Team experience and technology applications for learning platforms, portals, content and education workflows.", needs: ["Learning platforms", "Portals", "Content systems", "Workflow support"] },
  { code: "05", basis: "team", title: "Aviation", text: "Team experience and technology applications across passenger, operational and enterprise environments, including systems supporting airport ground handling teams and service coordination.", needs: ["Digital experiences", "Ground Handling technology", "Ground Support Equipment (GSE) and service coordination systems", "Baggage and cargo workflow systems", "Catering and aircraft service operations software", "Workforce and operational scheduling", "Maintenance and operational tracking", "Enterprise systems integration and operational visibility"] },
  { code: "06", basis: "team", title: "Sports", text: "Team experience and technology applications spanning digital platforms, fan experiences and operational data.", needs: ["Digital platforms", "Fan Experiences", "Web and mobile applications", "Data and analytics"] },
  { code: "07", basis: "team", title: "Media & Entertainment", text: "Team experience and technology applications involving content, audiences, analytics and scalable infrastructure.", needs: ["Content platforms", "Audience applications", "Analytics", "Cloud infrastructure"] },
  { code: "08", basis: "team", title: "HealthTech", text: "Team experience and technology applications involving secure data workflows, operational systems and automation.", needs: ["Digital applications", "Secure data workflows", "Operational systems", "Automation"] },
  { code: "09", basis: "team", title: "PropTech", text: "Team experience and technology applications for property workflows, CRM integration, analytics and customer experiences.", needs: ["Property workflows", "CRM integration", "Operational systems", "Analytics"] },
  { code: "10", basis: "team", title: "AdTech", text: "Team experience and technology applications involving campaign workflows, reporting, automation and data integration.", needs: ["Campaign workflows", "Data integration", "Analytics", "Automation"] },
] as const;

export const work = [
  {
    slug: "dawood-rcc-pipe",
    name: "Dawood RCC Pipe",
    sector: "Construction & Infrastructure",
    title: "Digital foundations for an operating infrastructure manufacturer",
    summary: "Digital presence and ongoing technology support for an established RCC pipe manufacturer.",
    logo: "/logos/dawood-rcc-pipe.png",
    website: "https://dawoodrccpipe.com",
    overview: "Dawood RCC Pipe required a clear public digital presence that reflects an established infrastructure manufacturing business and can be maintained as business needs evolve.",
    challenge: "The technology work needed to present essential company information clearly while keeping the platform simple enough to support over time.",
    built: ["Public website presence", "Structured company and product information", "Responsive user experience", "Ongoing website support"],
    approach: "The engagement prioritizes clear information architecture, maintainable implementation and continuity of support after launch.",
    system: ["Public experience", "Content and brand presentation", "Hosting and deployment", "Maintenance and updates"],
    outcome: "The business has a dedicated digital presence supported by Dawood Technologies.",
    support: "Dawood Technologies continues to support the website and related technology requirements as approved updates are needed.",
  },
  {
    slug: "dawood-traders",
    name: "Dawood Traders",
    sector: "International Trade & Commerce",
    title: "Technology supporting modern trade operations",
    summary: "Digital presence and technology support for international trade operations.",
    logo: "/logos/dawood-traders.png",
    website: "https://dawoodtraderspk.com",
    overview: "Dawood Traders needed a professional digital presence for an international trade business, with technology support aligned to ongoing operating requirements.",
    challenge: "The work needed to communicate the business clearly online without adding unnecessary system complexity or unsupported claims.",
    built: ["Public website presence", "Business information structure", "Responsive user experience", "Ongoing technology support"],
    approach: "The implementation is kept focused on credible business presentation, maintainability and continued support.",
    system: ["Public experience", "Business content structure", "Hosting and deployment", "Maintenance and updates"],
    outcome: "The business has a maintained digital presence supported by Dawood Technologies.",
    support: "Dawood Technologies provides continued support for published digital presence and approved technology updates.",
  },
] as const;

export const engineeringLayers = [
  { title: "Experience", items: ["Web Applications", "Mobile", "Internal Tools", "Customer Experiences"] },
  { title: "Application", items: ["Business Logic", "APIs", "Integrations", "Enterprise Applications"] },
  { title: "Data & Automation", items: ["Databases", "Analytics", "Data Pipelines", "Automation", "AI where appropriate"] },
  { title: "Infrastructure", items: ["Cloud", "Deployment", "Networking", "Security"] },
  { title: "Operations", items: ["Monitoring", "Support", "Maintenance", "Continuous Improvement"] },
] as const;

export const technologyCategories = [
  { title: "Cloud", logos: [
    { name: "AWS", category: "Cloud" },
    { name: "Microsoft Azure", category: "Cloud" },
    { name: "Google Cloud", category: "Cloud" },
  ] },
  { title: "Enterprise", logos: [
    { name: "Salesforce", category: "Enterprise" },
    { name: "Microsoft Dynamics 365", category: "Enterprise" },
  ] },
  { title: "Data & Analytics", logos: [
    { name: "Power BI", category: "Data & Analytics" },
  ] },
  { title: "Commerce", logos: [
    { name: "Shopify", category: "Commerce" },
  ] },
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
export const locations = ["Pakistan", "United States", "Remote engagements"];
export const values = ["Clarity", "Reliability", "Security", "Practical Innovation", "Long-Term Value"];
