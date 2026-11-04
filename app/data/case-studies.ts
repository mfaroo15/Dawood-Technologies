import { Bell, Check, LineChart, Lock, type LucideIcon } from "lucide-react";

export type CaseStudySlug = "rcc-pipe-manufacturer" | "commodities-trader";

export type CaseStudy = {
  slug: CaseStudySlug;
  label: string;
  title: string;
  text: string;
  chips: string[];
  /** Listed under "What we built" on the case study page. */
  built: string[];
  visual: "blue" | "green";
  metaTitle: string;
  metaDescription: string;
};

// Anonymized: these pages name neither business.
export const caseStudies: CaseStudy[] = [
  {
    slug: "rcc-pipe-manufacturer",
    label: "Manufacturing · Karachi",
    title: "ERP, CRM and website for an RCC pipe manufacturer",
    text: "We built the company's website and the systems that run its day-to-day operations: products, inventory, customer records and enquiry handling, all in one place.",
    chips: ["Website", "ERP", "CRM", "Inventory", "Enquiry management"],
    built: ["Website", "ERP", "CRM", "Products", "Inventory", "Customer records", "Enquiry management"],
    visual: "blue",
    metaTitle: "RCC Pipe Manufacturer Case Study",
    metaDescription: "How we built and run the website, ERP and CRM for an RCC pipe manufacturer in Karachi: products, inventory, customer records and enquiries.",
  },
  {
    slug: "commodities-trader",
    label: "Trading · Karachi",
    title: "Website and operations system for an agricultural commodities trader",
    text: "A public website plus an internal system to manage products, stock, customer accounts, enquiries and records, all in one place.",
    chips: ["Website", "ERP", "CRM", "Inventory", "Records"],
    built: ["Website", "ERP", "CRM", "Products", "Stock", "Customer accounts", "Enquiries", "Records"],
    visual: "green",
    metaTitle: "Commodities Trader Case Study",
    metaDescription: "How we built and run the website and operations system for an agricultural commodities trader in Karachi: products, stock, customer accounts and records.",
  },
];

export const caseStudyStatus = "In use daily · run and supported by our team";
export const caseStudySupport = "Our team runs, maintains and improves the systems as the business grows.";
export const caseStudyNote = "Business names withheld. Screens shown are illustrative.";
export const caseStudyCta = {
  heading: "Want something like this built for your business?",
  text: "Share what you want to build and we'll show you how we'd approach it.",
};

export const psx = {
  name: "PSX Sharia Alerts",
  badge: "Live · Running 24/7",
  tagline: "Shariah-compliant stock alerts for the Pakistan Stock Exchange",
  text: "A mobile alerts service for busy investors. Set the price you want to buy or sell at, and get notified as the stock gets closer, so you never miss an opportunity.",
  problem: "Investors who only buy Shariah-compliant stocks have to watch prices all day and check compliance by hand.",
  points: [
    { icon: Check, text: "300+ Shariah-compliant stocks from the official KMI All Share list" },
    { icon: Bell, text: "Buy, sell and dual alerts with 10%, 5% and 2% early warnings" },
    { icon: LineChart, text: "Live KSE-100 and KMI-30 with morning, midday and closing reports" },
    { icon: Lock, text: "Invite-only: private watchlists and per-user time zones" },
  ] satisfies { icon: LucideIcon; text: string }[],
  chips: ["Automation", "Mobile notifications", "Cloud-hosted", "Real-time monitoring", "Scheduled reporting"],
  steps: ["Set your target", "We monitor the market", "You get notified"],
  technology: ["Automation", "Cloud-hosted", "Real-time monitoring", "Scheduled reporting"],
  disclaimer: "Market information only, not investment advice. Not affiliated with or endorsed by Pakistan Stock Exchange Limited.",
};
