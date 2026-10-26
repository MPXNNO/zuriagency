import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: Array<[string, number, MetadataRoute.Sitemap[number]["changeFrequency"]]> = [
    ["", 1, "weekly"],
    ["/marketing-influence", 0.95, "monthly"],
    ["/talents", 0.9, "weekly"],
    ["/contact", 0.85, "yearly"],
    ["/strategie-entreprise", 0.8, "monthly"],
    ["/management-sportif", 0.8, "monthly"],
    ["/fondateur", 0.6, "yearly"],
    ["/collaborations", 0.5, "weekly"],
    ["/mentions-legales", 0.1, "yearly"],
    ["/confidentialite", 0.1, "yearly"],
  ];
  return pages.map(([path, priority, changeFrequency]) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority }));
}
