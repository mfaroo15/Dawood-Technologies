import type { IconifyIcon } from "@iconify/types";
import { Cloud, Database, Server, Users, type LucideIcon } from "lucide-react";
import databricks from "@iconify-icons/logos/databricks-icon";
import docker from "@iconify-icons/logos/docker-icon";
import github from "@iconify-icons/logos/github-icon";
import nextjs from "@iconify-icons/logos/nextjs-icon";
import nodejs from "@iconify-icons/logos/nodejs-icon";
import python from "@iconify-icons/logos/python";
import react from "@iconify-icons/logos/react";
import shopify from "@iconify-icons/logos/shopify";
import typescript from "@iconify-icons/logos/typescript-icon";
import styles from "./TechnologyLogo.module.css";

// Their trademark rules restrict logo use: never their logos, only the plain name with a neutral icon.
const neutralIcons: Record<string, LucideIcon> = {
  AWS: Server,
  "Microsoft Azure": Cloud,
  "Google Cloud": Cloud,
  Oracle: Database,
  Salesforce: Users,
};

// Full-color logos from the CC0 "logos" collection (gilbarbara), shown exactly as published.
// Vendors whose logo terms don't allow use on a services website have no entry and are
// shown as a text wordmark instead.
const logos: Record<string, IconifyIcon> = {
  Shopify: shopify,
  Databricks: databricks,
  "Next.js": nextjs,
  React: react,
  "Node.js": nodejs,
  TypeScript: typescript,
  Python: python,
  Docker: docker,
  GitHub: github,
};

export function hasLogo(name: string) {
  return name in logos;
}

export function hasNeutralIcon(name: string) {
  return name in neutralIcons;
}

// The mark only (neutral tile, logo or wordmark), sized by the parent through --mark-height.
// A neutral tile is decorative, so it needs its plain-text name shown beside it.
export function TechnologyLogo({ name }: { name: string }) {
  const NeutralIcon = neutralIcons[name];
  if (NeutralIcon) return <span className={styles.tile} aria-hidden="true"><NeutralIcon size={16} strokeWidth={1.75} /></span>;
  const logo = logos[name];
  if (!logo) return <span className={styles.wordmark} role="img" aria-label={name}>{name}</span>;
  return (
    <svg className={styles.mark} role="img" aria-label={name} viewBox={`0 0 ${logo.width ?? 24} ${logo.height ?? 24}`} focusable="false" dangerouslySetInnerHTML={{ __html: logo.body }} />
  );
}
