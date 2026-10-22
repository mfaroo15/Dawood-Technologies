export const aiNexusMetadata = {
  title: "AI Nexus | Artificial Intelligence & Automation | Dawood Technologies",
  description: "Explore practical AI consulting, intelligent automation, AI integration, business applications, and responsible AI implementation from Dawood Technologies.",
  path: "/services/ai-automation",
} as const;

// These are proposed engagement scopes, not claims of completed AI projects.
export const aiServiceAreas = [
  {
    title: "AI Consulting & Strategy",
    description: "Start with the process, not a preferred technology. An assessment can identify useful opportunities, test readiness and feasibility, and set a practical sequence for implementation. The recommendation may be AI, conventional automation, or a change to existing systems.",
    scope: ["Business process assessment and opportunity identification", "Data, system and team readiness; technical feasibility", "Solution planning, priorities and implementation roadmaps"],
  },
  {
    title: "Generative AI Applications",
    description: "Explore applications that work with approved business information and clearly defined users. Possible scopes include knowledge assistants, document summarization and support interfaces built into business software, using suitable existing models rather than developing foundation models.",
    scope: ["Internal knowledge assistants and AI chat interfaces", "Document summarization and business information retrieval", "AI-assisted customer support and custom web applications"],
  },
  {
    title: "Intelligent Workflow Automation",
    description: "Separate predictable business rules from tasks that may benefit from AI. A proposed workflow can combine APIs, task routing and notifications, with people reviewing exceptions and approving important actions.",
    scope: ["Process automation, approvals and document processing", "Task routing, administrative work and system notifications", "Human review, exception handling and approval boundaries"],
  },
  {
    title: "AI Integration & Business Applications",
    description: "Consider AI as a capability within the software people already use. Integration planning covers the application, its APIs, access permissions and the changes needed to make the capability useful in an operational workflow.",
    scope: ["API-based integrations and internal business applications", "Employee portals, customer applications and CRM workflows", "Existing software enhancements and AI-enabled operational tools"],
  },
  {
    title: "Data & AI-Assisted Analytics",
    description: "Reliable information comes before an AI interface. A potential engagement can prepare and validate operational data, connect reporting systems and assess how natural-language access or AI-assisted reporting could help users find relevant information.",
    scope: ["Business data preparation, quality checks and validation", "Reporting integrations and AI-assisted reporting", "Natural-language information access and operational analytics"],
  },
  {
    title: "AI Governance & Risk Management",
    description: "Define the practical controls needed for a proposed AI-enabled workflow. Scope review can identify data risks, approval responsibilities and the evidence needed to understand how the system is being used. Any governance work must fit the team's confirmed delivery capability and the agreed engagement.",
    scope: ["Data access controls and sensitive information handling", "AI usage guidelines and named human oversight", "Output testing, validation and approval workflows", "Activity logging and traceability where supported", "Risk identification and ongoing review responsibilities"],
  },
  {
    title: "AI Implementation & Ongoing Support",
    description: "Plan the work required to move an agreed idea into day-to-day use. Development, testing and deployment need an operational handover, with maintenance, monitoring and future improvements scoped around the systems involved and the support arrangement.",
    scope: ["Application configuration, development and integration", "Testing, deployment, documentation and handover", "Maintenance, monitoring where supported and planned improvements"],
  },
] as const;

export const aiApplications = [
  { title: "Internal Knowledge Access", text: "When information is spread across company documents, an assistant could retrieve relevant passages from approved sources. Showing the source alongside an answer can help employees check information before using it." },
  { title: "Document Processing", text: "Repeatedly reading and re-keying business documents takes time. Extraction or summarization tools could prepare information for review, helping a team organize incoming work while retaining checks for accuracy and exceptions." },
  { title: "Workflow Assistance", text: "Requests can stall when responsibilities or next steps are unclear. Rules, APIs and, where useful, AI could help classify work and route it to the right person, leaving approvals with the responsible employee." },
  { title: "Customer Support Assistance", text: "Support staff often need to locate the same product or process information. A proposed assistant could retrieve approved guidance or prepare a draft response, giving the employee useful context while keeping escalation and review available." },
  { title: "Business Reporting", text: "Operational questions do not always arrive in the language of a dashboard. A controlled natural-language interface could help users find approved reporting information, with access restrictions and validation against the underlying data." },
] as const;

export const aiDeliverySteps = [
  { title: "Understand", text: "Identify the users, business requirements, process challenges and systems involved." },
  { title: "Evaluate", text: "Compare AI, traditional automation and other options against feasibility, data readiness and risk." },
  { title: "Build", text: "Design and develop the agreed scope, with clear acceptance criteria and review points." },
  { title: "Integrate", text: "Connect the solution to its environment and test permissions, information flows and exceptions." },
  { title: "Operate", text: "Document, deploy and hand over the solution, then support improvements according to the engagement." },
] as const;

export const aiFaqs = [
  { question: "How do we determine whether AI is right for our business?", answer: "Begin with a specific process or information problem. Review the available data, current systems, users and consequences of mistakes. AI should be compared with simpler automation and existing software improvements before selecting an approach." },
  { question: "Can AI be integrated into our existing applications?", answer: "That depends on the application's APIs, permissions, hosting and data arrangements. A technical review can establish what integration is feasible and what changes would be needed before development is agreed." },
  { question: "Does every automation project require artificial intelligence?", answer: "No. Fixed rules, approval workflows and API integrations are often sufficient. AI is worth considering when a task involves information or variation that those simpler approaches cannot handle appropriately." },
  { question: "How are sensitive business data and access permissions considered?", answer: "Scope review should identify what information is involved, who may access it, where processing would occur and what retention rules apply. Access restrictions and provider arrangements need to be agreed before sensitive data is used." },
  { question: "Can employees review AI-generated outputs before decisions are made?", answer: "Human review can be part of the proposed workflow. The engagement should define which outputs need approval, who is responsible and how uncertain or unexpected results are escalated before actions are taken." },
  { question: "What support is available after implementation?", answer: "Support is defined in the engagement. It may include documentation, maintenance, issue investigation and planned improvements, with monitoring where supported. Coverage hours, response expectations and responsibilities are agreed rather than assumed." },
] as const;
