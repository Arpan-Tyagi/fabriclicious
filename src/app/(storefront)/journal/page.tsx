import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Editorial Journal | Fabriclicious Atelier",
  description: "Couture sewing masterclasses, textile physics guides, and sartorial craftsmanship insights from Mithila Enterprises.",
};

export const revalidate = 0;

export default async function StorefrontJournalPage() {
  const supabase = await createClient();
  const { data: blogs } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  const articles = blogs && blogs.length > 0 ? blogs : [
    {
      id: "blog-1",
      slug: "anatomy-of-drape-silk-satin",
      title: "The Physics of Fluidity: Working with 85 GSM Mulberry Silk Satin",
      excerpt: "Master seam stabilization, Microtex needle pairing, and bias cutting tension for ultra-fluid silk drapes.",
      content_markdown: "Full article on silk draping physics...",
      created_at: "2026-09-15T10:00:00Z",
      readTime: "6 min read",
      category: "Textile Physics",
      pastel: "bg-pastel-rose/40"
    },
    {
      id: "blog-2",
      slug: "belgian-flax-linen-tailoring-guide",
      title: "Bespoke Linen Construction: Pressing Protocols & Canvas Interfacing",
      excerpt: "Why high-GSM Belgian flax linen demands traditional haircloth interfacing and steam molding.",
      content_markdown: "Full article on linen tailoring...",
      created_at: "2026-09-12T14:30:00Z",
      readTime: "8 min read",
      category: "Tailoring Masterclass",
      pastel: "bg-pastel-sage/40"
    },
    {
      id: "blog-3",
      slug: "herringbone-tweed-pattern-matching",
      title: "Precision Chevron Matching Across Harris Tweed Tailored Lapels",
      excerpt: "Eliminating pattern shear on heavy woolen weaves with friction chalking and stay-stitching.",
      content_markdown: "Full article on tweed chevron matching...",
      created_at: "2026-09-08T09:15:00Z",
      readTime: "10 min read",
      category: "Craftsmanship",
      pastel: "bg-pastel-sky/40"
    }
  ];

  return (
    <div className="min-h-screen bg-linen py-16 px-6 md:px-12 pt-32">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Header */}
        <div className="border-b border-hemp pb-8 space-y-4 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-loam">Mithila Enterprises Journal</span>
          <h1 className="font-serif text-5xl md:text-7xl text-umber tracking-tight leading-[0.95]">
            Sartorial Notes & <br />
            <span className="italic font-serif font-normal text-umber/80">Textile Physics.</span>
          </h1>
          <p className="font-sans text-base text-umber/70 leading-relaxed font-light">
            In-depth guides on fabric drape, seam stabilization, bias layout, and bespoke tailoring protocols curated by our master archivists.
          </p>
        </div>

        {/* Featured Hero Article */}
        {articles.length > 0 && (
          <Link href={`/journal/${articles[0].slug}`} className="block group">
            <div className="bg-limestone border border-hemp rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group-hover:border-loam/50 transition-colors duration-300">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-loam bg-loam/10 px-3 py-1 rounded-full border border-loam/30">
                    Featured Masterclass
                  </span>
                  <span className="font-mono text-xs text-umber/50">
                    {articles[0].readTime || "6 min read"}
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-5xl text-umber group-hover:text-loam transition-colors">
                  {articles[0].title}
                </h2>
                <p className="font-sans text-sm md:text-base text-umber/70 leading-relaxed font-light max-w-2xl">
                  {articles[0].excerpt}
                </p>
                <div className="pt-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-loam group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <span>→</span>
                </div>
              </div>

              <div className="lg:col-span-5 h-64 lg:h-full min-h-[260px] bg-pastel-rose/50 rounded-2xl border border-hemp/60 flex items-center justify-center p-8 text-center">
                <div className="space-y-2">
                  <span className="font-serif italic text-3xl text-umber/80">"Haute Couture begins at the loom."</span>
                  <p className="font-mono text-[10px] uppercase text-umber/50 tracking-widest">Atelier Sewing Note #014</p>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Article Grid */}
        <div className="space-y-8">
          <h2 className="font-serif text-3xl text-umber">Archive Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article: any) => (
              <Link key={article.id} href={`/journal/${article.slug}`} className="group block">
                <div className="bg-limestone border border-hemp rounded-2xl p-6 h-full flex flex-col justify-between space-y-6 group-hover:border-loam/50 transition-colors">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center font-mono text-[10px] text-umber/60">
                      <span className="uppercase tracking-wider text-loam px-2.5 py-0.5 bg-linen rounded-full border border-hemp">
                        {article.category || "Editorial"}
                      </span>
                      <span>{article.readTime || "5 min read"}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-umber group-hover:text-loam transition-colors">
                      {article.title}
                    </h3>
                    <p className="font-sans text-xs text-umber/70 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-hemp/60 flex items-center justify-between font-mono text-[11px] text-loam uppercase tracking-wider">
                    <span>Explore Guide</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
