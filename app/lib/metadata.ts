import type { Metadata } from "next";

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}` | "/";
};

// 1200x630 share image used by every page.
export const shareImage = { url: "/og-image.png", width: 1200, height: 630, alt: "Dawood Technologies: Technology built around how businesses operate." };

export function createPageMetadata({ title, description, path }: PageMetadata): Metadata {
  return {
    title: title.includes("Dawood Technologies") ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Dawood Technologies",
      title,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}
