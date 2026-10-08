import type { Metadata } from "next";

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}` | "/";
};

export function createPageMetadata({ title, description, path }: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Dawood Technologies",
      title,
      description,
      url: path,
      images: [{ url: "/dawood-technologies-logo.png", width: 2125, height: 281, alt: "Dawood Technologies" }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [{ url: "/favicon.png", alt: "Dawood Technologies brand mark" }],
    },
  };
}
