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
    summary: "Independent technology consulting: we review your current systems, clarify what you need and set out a practical architecture and roadmap before you invest.",
    introduction: "We assess existing systems, document requirements and define architecture, platform and delivery priorities before or alongside implementation.",
    items: ["Technology strategy", "Digital transformation consulting", "Technology assessments", "Solution architecture", "Systems and platform advisory", "Cloud strategy", "Technology roadmapping"],
    platforms: ["Microsoft 365", "Microsoft Azure", "AWS", "Google Cloud", "Salesforce"],
    whoFor: ["Owners planning a new system who want an outside view before committing budget.", "Teams whose tools have grown piecemeal and no longer fit together.", "Companies preparing a move to the cloud or a new ERP and unsure where to begin."],
    outcomes: ["A written assessment of what works today and what is holding you back.", "A recommended architecture, with the options explained in plain language.", "A phased roadmap your team can act on, with or without us."],
    faqs: [
      { question: "Do we have to hire you to build what you recommend?", answer: "No. The roadmap is yours to keep. You can deliver it in-house, with another supplier or with us." },
      { question: "What do you need from us to get started?", answer: "Time with the people who use your systems day to day, any existing documentation, and a clear view of the goals behind the project." },
      { question: "Can you review a proposal from another vendor?", answer: "Yes. We can assess a quote or solution design you have received and point out risks, gaps or simpler alternatives." },
    ],
    ctaText: "Describe the decision in front of you and we'll suggest how to approach it.",
    industries: ["FinTech", "HealthTech", "Retail & E-commerce", "Construction & Infrastructure"],
  },
  {
    code: "02", slug: "ai-automation", title: "AI Solutions", listedUnderServices: false,
    tagline: "AI agents, chatbots and automation for your website, WhatsApp and internal systems.",
    summary: "AI assistants, chatbots and workflow automation connected to your own data and systems, with clear controls and people kept in charge of the decisions.",
    introduction: "We identify repeatable workflows, evaluate where AI or automation is appropriate, and build the applications, integrations and controls required for production use.",
    items: ["AI consulting", "AI application development", "AI agents and chatbots", "AI integration", "Intelligent automation", "Workflow automation", "Business process automation", "AI-enabled business applications"],
    platforms: ["OpenAI", "Microsoft Azure", "Databricks", "Power BI", "Python"],
    whoFor: ["Businesses answering the same customer questions across the web, WhatsApp and email.", "Teams spending hours re-typing details from invoices, orders or forms.", "Managers who want to ask questions of business data without waiting for a report."],
    outcomes: ["An assistant that replies from information you have approved.", "Repetitive admin handled automatically, with exceptions passed to your staff.", "Clear rules on what the AI can see, do and hand back to a person."],
    faqs: [
      { question: "Will the assistant make things up?", answer: "We design assistants to answer only from sources you approve and to pass the conversation to a person when they cannot find a reliable answer." },
      { question: "Where is our data processed?", answer: "We agree the hosting region and AI provider with you before development starts, and limit the data each tool can reach." },
      { question: "Can it reply in more than one language?", answer: "Yes. Assistants can be set up for the languages your customers use, and we test each one before launch." },
    ],
    ctaText: "Show us a task that eats up your team's time and we'll explore where AI fits.",
    industries: ["FinTech", "HealthTech", "Retail & E-commerce", "Construction & Infrastructure"],
  },
  {
    code: "03", slug: "cloud-devops", title: "Cloud & DevOps",
    tagline: "Cloud architecture, migration and deployment pipelines.",
    summary: "Cloud architecture, migration, CI/CD pipelines and infrastructure automation.",
    introduction: "We design, migrate and maintain cloud environments, including infrastructure, deployment workflows, monitoring and security controls.",
    items: ["CI/CD pipelines", "Cloud consulting", "Cloud architecture", "Cloud migration", "Cloud infrastructure", "DevOps", "Cloud optimization", "Infrastructure automation", "Managed cloud"],
    platforms: ["Microsoft Azure", "AWS", "Google Cloud", "Docker", "GitHub"],
    whoFor: ["Companies still running key applications on ageing office servers.", "Development teams whose releases are manual, slow or risky.", "Businesses with a cloud bill that keeps growing without a clear reason."],
    outcomes: ["A cloud environment that is documented, secured and easy to hand over.", "Repeatable deployments that take the manual steps out of each release.", "Monitoring and alerts that flag problems before users notice them."],
    faqs: [
      { question: "Which cloud provider should we choose?", answer: "It depends on the tools you already use, your team's skills and where your customers are. We compare the options for your case rather than pushing one platform." },
      { question: "Will moving to the cloud cause downtime?", answer: "We migrate in stages, test each step and schedule the switch-over for a quiet period to keep disruption low." },
      { question: "Can you look after the environment once it's live?", answer: "Yes. We can monitor, patch and tune it as an ongoing service, or train your own team to run it." },
    ],
    ctaText: "Tell us where your applications run today and we'll map out the move.",
    industries: ["Media & Entertainment", "FinTech", "Retail & E-commerce", "Logistics & Transportation"],
  },
  {
    code: "04", slug: "application-development", title: "Software & Application Development",
    tagline: "Websites, custom software, SaaS products, web and mobile apps.",
    summary: "Custom websites, web and mobile apps, SaaS products and integrations, designed around your workflows and supported by the same team after launch.",
    introduction: "We design and build websites, custom software, SaaS products, web and mobile applications, APIs and integrations around your business requirements.",
    items: ["Website design & development", "Custom software development", "SaaS product development", "Web application development", "Mobile application development", "Enterprise application development", "Customer and employee portals", "API development and integration", "E-commerce development", "CMS & website management", "Application modernization", "UI/UX engineering"],
    platforms: ["Next.js", "React", "Node.js", "TypeScript", "Python", "Shopify", "GitHub", "Docker"],
    whoFor: ["Businesses that need a website which brings in enquiries, not just a brochure.", "Companies whose processes don't fit off-the-shelf software.", "Founders and teams turning a proven idea into a SaaS product."],
    outcomes: ["Software shaped around the way your people actually work.", "Clean, documented code that you own outright.", "A team that stays involved for fixes and new features after go-live."],
    faqs: [
      { question: "Do you build mobile apps as well as websites?", answer: "Yes. We build responsive websites, web applications and mobile apps, and they can share one back end." },
      { question: "Which technologies do you use?", answer: "Mostly Next.js, React, Node.js and TypeScript, with other tools when a project or an existing system calls for them." },
      { question: "Can you take over an application someone else built?", answer: "Yes. We start with a code review, explain what we find and agree a plan for fixes and improvements." },
    ],
    ctaText: "Walk us through what you want to build and we'll suggest a sensible first release.",
    ctaHeading: "Let's talk about your software project.",
    industries: ["Construction & Infrastructure", "Trade & Commerce", "Retail & E-commerce"],
  },
  {
    code: "05", slug: "enterprise-erp", title: "Enterprise & ERP",
    tagline: "CRM, ERP and business systems that connect your operations.",
    summary: "ERP and CRM selection, setup and integration that links inventory, sales, finance and customer records, so your whole team works from one system.",
    introduction: "We select, configure and connect CRM, ERP and workflow platforms around business data, responsibilities and operating processes.",
    items: ["CRM solutions", "ERP solutions", "Systems integration", "Workflow automation", "Business process digitization", "Platform implementation", "Application integration", "Enterprise support"],
    platforms: ["NetSuite", "Salesforce", "Microsoft 365", "Power BI"],
    whoFor: ["Manufacturers and distributors tracking stock and orders in spreadsheets.", "Sales teams losing leads between email inboxes and notebooks.", "Growing companies whose separate tools no longer talk to each other."],
    outcomes: ["One shared record of customers, orders and inventory.", "Fewer manual hand-offs between sales, operations and accounts.", "Reports drawn from live data instead of copied figures."],
    faqs: [
      { question: "Do you build a custom ERP or set up an existing one?", answer: "Both. We weigh platforms such as NetSuite or Microsoft tools against a custom build and recommend the route that suits your processes." },
      { question: "Can our existing data be moved across?", answer: "Yes. We clean, map and import customer, product and transaction records, then check them with your team before go-live." },
      { question: "How do you train our staff?", answer: "Through short role-based sessions and written guides, so each person learns the parts of the system they use." },
    ],
    ctaText: "Share how orders, stock and accounts flow today and we'll show where one system helps.",
    industries: ["Construction & Infrastructure", "Trade & Commerce", "Retail & E-commerce"],
  },
  {
    code: "06", slug: "data-services", title: "Data Services",
    tagline: "Integration, reporting and dashboards for decisions.",
    summary: "Data integration, reporting and dashboards that bring figures from your business systems into one trusted view for quicker, better-informed decisions.",
    introduction: "We organize data from business systems, build integrations and reporting pipelines, and deliver dashboards and analysis for operational use.",
    items: ["Data engineering", "Business intelligence", "Data visualization", "Data analytics", "Data strategy", "Reporting solutions", "Data integration", "Operational analytics"],
    platforms: ["Power BI", "Databricks", "Microsoft Azure", "Google Cloud", "Python"],
    whoFor: ["Managers who wait days for reports put together by hand.", "Companies with data spread across ERP, CRM and spreadsheets.", "Teams that disagree on the numbers because each uses a different source."],
    outcomes: ["Dashboards that refresh automatically from your systems.", "Agreed definitions for the figures that matter most.", "Data pipelines that are documented and easy to extend."],
    faqs: [
      { question: "Which reporting tools do you use?", answer: "Often Power BI, and custom dashboards when reports need to sit inside your own application." },
      { question: "Can you combine data from several systems?", answer: "Yes. We connect sources such as your ERP, CRM, spreadsheets and databases and reconcile them into one model." },
      { question: "Who gets to see which reports?", answer: "Access is set by role, so each person sees the figures relevant to their work and nothing more." },
    ],
    ctaText: "Tell us which numbers are hard to get and we'll plan how to bring them together.",
    industries: ["FinTech", "Retail & E-commerce", "Construction & Infrastructure", "Logistics & Transportation", "Trade & Commerce"],
  },
  {
    code: "07", slug: "cybersecurity", title: "Cybersecurity",
    tagline: "Risk assessments and practical security controls.",
    summary: "Practical security reviews and fixes for accounts, applications, cloud and devices, ranked by risk so the most important gaps are closed first.",
    introduction: "We assess security risks and implement prioritized controls across user access, applications, cloud environments and infrastructure.",
    items: ["Security assessments", "Application security", "Cloud security", "Identity and access management", "Security hardening", "Vulnerability management", "Security monitoring", "Security architecture"],
    platforms: ["Microsoft Azure", "Microsoft 365", "AWS", "Google Cloud", "GitHub"],
    whoFor: ["Small and mid-sized businesses without a dedicated security team.", "Companies that grew quickly and never reviewed who can access what.", "Teams preparing for a customer security questionnaire or audit."],
    outcomes: ["A clear picture of your main security risks, in order of importance.", "Stronger sign-in and access controls across your key systems.", "A short list of fixes your team understands and can maintain."],
    faqs: [
      { question: "Where do you start?", answer: "With a review of accounts, devices, cloud settings and critical applications, followed by a prioritised list of fixes." },
      { question: "Do you only advise, or fix issues as well?", answer: "Either. Many clients ask us to put the agreed controls in place and then keep an eye on them." },
      { question: "Can you help with security questionnaires from customers?", answer: "Yes. We help you gather accurate answers and supporting evidence for the questionnaires you receive." },
    ],
    ctaText: "Let us know what worries you most about security and we'll suggest where to begin.",
    industries: ["Construction & Infrastructure", "Trade & Commerce", "Retail & E-commerce"],
  },
  {
    code: "08", slug: "managed-technology", title: "Managed Technology",
    tagline: "Monitoring, support and continuous improvement.",
    summary: "Ongoing monitoring, maintenance and support for your applications, cloud and Microsoft 365, with a named contact who knows how your systems connect.",
    introduction: "We operate and maintain deployed systems through monitoring, administration, incident support, updates and planned improvements.",
    items: ["Managed IT", "Application support", "Infrastructure management", "Systems administration", "Technology operations", "Monitoring and maintenance", "Platform support", "Continuous improvement"],
    platforms: ["Microsoft 365", "Microsoft Azure", "AWS", "Google Cloud"],
    whoFor: ["Businesses without an in-house IT team.", "Companies whose systems were set up by someone who is no longer around.", "Teams that want updates and backups handled without chasing anyone."],
    outcomes: ["Systems kept patched, backed up and monitored.", "One point of contact for every support request.", "Small improvements delivered steadily instead of in rushed projects."],
    faqs: [
      { question: "What does managed technology cover?", answer: "Monitoring, updates, backups, user support and small improvements for the applications and services we agree on together." },
      { question: "Can you support systems you didn't build?", answer: "Yes. We document what you have first, then take over support once we understand how it fits together." },
      { question: "How do we raise a support request?", answer: "By email or a shared support channel, and your named contact keeps you updated until it is resolved." },
    ],
    ctaText: "Tell us what you run today and we'll suggest a support plan that fits.",
    industries: ["Construction & Infrastructure", "Trade & Commerce", "Retail & E-commerce"],
  },
  {
    code: "09", slug: "quality-assurance", title: "Quality Assurance & Testing",
    tagline: "Manual and automated testing so software works before your customers use it.",
    summary: "Manual and automated testing for web, mobile and enterprise software, covering features, performance, APIs and accessibility before each release.",
    introduction: "We test web, mobile and enterprise applications throughout development and before every release, so issues are found early and releases go out with confidence.",
    items: ["Functional testing", "Test automation", "Regression testing", "Performance and load testing", "API testing", "Mobile app testing", "Accessibility testing", "Release and UAT support"],
    platforms: ["GitHub", "Docker", "Python"],
    whoFor: ["Product teams shipping updates often and worried about breaking things.", "Companies launching a new application to customers or staff.", "Teams without dedicated testers who rely on developers to check their own work."],
    outcomes: ["Problems found before your customers run into them.", "Automated checks that run on every new release.", "Clear defect reports your developers can act on quickly."],
    faqs: [
      { question: "Do you test software built by another team?", answer: "Yes. We can join your release process as an independent QA team, whoever writes the code." },
      { question: "Do we need manual or automated testing?", answer: "Usually both. Automation covers the checks you repeat, while manual testing catches usability problems and edge cases." },
      { question: "Can you test for accessibility?", answer: "Yes. We check pages and app screens against common accessibility guidelines and explain how to fix what we find." },
    ],
    ctaText: "Tell us how you release software today and we'll suggest where testing helps most.",
    industries: ["FinTech", "HealthTech", "Retail & E-commerce", "EdTech", "Logistics & Transportation"],
  },
  {
    code: "10", slug: "product-design-mvp", title: "Product Design & MVP Development",
    tagline: "From idea to a working first version, designed around real users.",
    summary: "Product discovery, UX and UI design, clickable prototypes and MVP development that turn a new idea into a first version that real users can try.",
    introduction: "We help founders and businesses turn an idea into a usable product: research, UX/UI design, clickable prototypes and a minimum viable product built to test with real users and grow.",
    items: ["Product discovery workshops", "UX research", "UI design", "Clickable prototypes", "Design systems", "MVP development", "User testing", "Product roadmap"],
    platforms: ["Next.js", "React", "Node.js", "TypeScript"],
    whoFor: ["Founders with an idea who need help shaping it into a product.", "Businesses exploring a new digital service for their customers.", "Teams that want to test demand before funding a full build."],
    outcomes: ["A clear product scope and priorities agreed early.", "Designs and prototypes tested with real users.", "A working first version ready to put in front of customers."],
    faqs: [
      { question: "What is an MVP?", answer: "A minimum viable product is the smallest version of your idea that real users can try, so you learn what works before building more." },
      { question: "Do we need designs before development starts?", answer: "It helps. We usually design and test the key screens first and then build, which avoids costly changes later." },
      { question: "Can the MVP grow into the full product?", answer: "Yes. We build it on a foundation that can be extended, not as a throwaway prototype." },
    ],
    ctaText: "Share your product idea and we'll suggest the smallest version worth building.",
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

