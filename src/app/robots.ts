import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/og"],
    },
    sitemap: "https://ai-directory-seven.vercel.app/sitemap.xml",
  };
}
