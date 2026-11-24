import { MetadataRoute } from "next";
import { ATELIER_JOURNAL_ARTICLES } from "@/data/journalArticles";
import { CATEGORY_EDITORIAL_DATA } from "@/data/categoryEditorial";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/env";

export const dynamic = "force-dynamic";

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
      priority: 0.85,
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

  // Clean canonical category routes (e.g. /category/linen)
  const categorySlugs = Object.keys(CATEGORY_EDITORIAL_DATA);
  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((cat) => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Atelier Masterclass Journal routes
  const journalSlugs = new Set(Object.keys(ATELIER_JOURNAL_ARTICLES));

  // Dynamic Product and Blog routes from Supabase
  let dynamicProductRoutes: MetadataRoute.Sitemap = [];

  try {
    const supabase = createClient(
      env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key"
    );

    // Fetch published products
    const { data: dbProducts } = await supabase
      .from("products")
      .select("slug, updated_at")
      .eq("is_published", true);

    if (dbProducts && dbProducts.length > 0) {
      dynamicProductRoutes = dbProducts.map((product) => ({
        url: `${baseUrl}/fabrics/${product.slug}`,
        lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    }

    // Fetch any database-driven published blog posts
    const { data: dbBlogs } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("is_published", true);

    if (dbBlogs && dbBlogs.length > 0) {
      dbBlogs.forEach((blog) => {
        journalSlugs.add(blog.slug);
      });
    }
  } catch (error) {
    console.error("Error fetching dynamic routes for sitemap:", error);
  }

  const allJournalRoutes: MetadataRoute.Sitemap = Array.from(journalSlugs).map((slug) => ({
    url: `${baseUrl}/journal/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...dynamicProductRoutes,
    ...allJournalRoutes,
  ];
}
