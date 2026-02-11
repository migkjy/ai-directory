import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/db";
import { CATEGORY_CONFIG } from "@/lib/categories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ai-directory.apppro.kr";
  const slugs = await getAllSlugs();

  const toolPages = slugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryPages = Object.keys(CATEGORY_CONFIG).map((cat) => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/category`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...categoryPages,
    ...toolPages,
  ];
}
