import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/db";
import { getAllIdeaSlugs } from "@/lib/ideas-db";
import { CATEGORY_CONFIG } from "@/lib/categories";
import { POPULAR_COMPARISONS, canonicalComparisonSlug } from "@/lib/comparisons";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ai-directory-seven.vercel.app";
  const [slugs, ideaSlugs] = await Promise.all([
    getAllSlugs(),
    getAllIdeaSlugs(),
  ]);

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

  const comparePages = POPULAR_COMPARISONS.map(([a, b]) => ({
    url: `${baseUrl}/compare/${canonicalComparisonSlug(a, b)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const ideaPages = ideaSlugs.map((slug) => ({
    url: `${baseUrl}/ideas/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/ideas`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/category`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...ideaPages,
    ...categoryPages,
    ...comparePages,
    ...toolPages,
  ];
}
