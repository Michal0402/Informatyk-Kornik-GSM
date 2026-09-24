import type { MetadataRoute } from "next";
import { company } from "@/config/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.seoName,
    short_name: company.name,
    description: company.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#080A0D",
    theme_color: "#080A0D",
    lang: "pl",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
