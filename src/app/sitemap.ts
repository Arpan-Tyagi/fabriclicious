import { MetadataRoute } from "next";
import { ATELIER_JOURNAL_ARTICLES } from "@/data/journalArticles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.fabriclicious.com";

  // Static core storefront routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/fabrics`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/swatches`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/returns`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // All 14 weekly atelier masterclasses
  const journalRoutes: MetadataRoute.Sitemap = Object.keys(ATELIER_JOURNAL_ARTICLES).map(
    (slug) => ({
      url: `${baseUrl}/journal/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    })
  );

  // Static categories for direct crawlability
  const categorySlugs = [
    "linen",
    "cotton",
    "viscose",
    "flannel",
    "corduroy",
    "twill",
    "suede",
    "velvet",
    "wool",
    "fleece",
    "tweed",
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((cat) => ({
    url: `${baseUrl}/fabrics?category=${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...journalRoutes];
}
