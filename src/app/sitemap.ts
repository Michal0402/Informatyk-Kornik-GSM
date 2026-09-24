import type { MetadataRoute } from "next";
import { company } from "@/config/company";

const routes = [
  "",
  "/serwis-komputerowy-kornik",
  "/serwis-telefonow-kornik",
  "/naprawa-laptopow-kornik",
  "/polityka-prywatnosci",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${company.siteUrl}${path || "/"}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/polityka-prywatnosci" ? 0.3 : 0.8,
  }));
}
