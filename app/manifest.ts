import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dawood Technologies",
    short_name: "Dawood Tech",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f17",
    theme_color: "#1268e8",
    icons: [
      { src: "/logo-square-192.png", sizes: "192x192", type: "image/png" },
      { src: "/logo-square.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
