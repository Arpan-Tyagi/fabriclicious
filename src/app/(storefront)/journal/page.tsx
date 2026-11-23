import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ATELIER_JOURNAL_ARTICLES, JournalArticle } from "@/data/journalArticles";

export const metadata = {
  title: "Editorial Journal & Sartorial Masterclasses | Fabriclicious Atelier",
  description:
    "Daily haute couture masterclasses, textile physics manuals, needle calibrations, and bespoke tailoring guides curated by Mithila Enterprises.",
  alternates: {
    canonical: "/journal",
  },
};

export const revalidate = 0;

export default async function StorefrontJournalPage() {
  const supabase = await createClient();
  const { data: dbBlogs } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  // Fallback to our 14 editorial masterclasses
  const articles: JournalArticle[] =
    dbBlogs && dbBlogs.length > 0
      ? dbBlogs.map((b) => ({
          slug: b.slug,
          title: b.title,
          category: "Atelier Masterclass",
          readTime: "7 min read",
          excerpt: b.excerpt,
          publishDay: "Archived",
          publishSlot: "Morning" as const,
          targetKeyword: "bespoke fabric tailoring",
          pastel: "bg-pastel-sky/40",
          content: b.content_markdown,
        }))
      : Object.values(ATELIER_JOURNAL_ARTICLES);

  const featured = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-linen py-16 px-6 md:px-12 pt-32">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Editorial Header */}
        <div className="border-b border-hemp pb-8 space-y-4 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-loam">
            Mithila Enterprises Journal // 2 Daily Masterclasses
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-umber tracking-tight leading-[0.95]">
            Sartorial Notes &amp; <br />
            <span className="italic font-serif font-normal text-umber/80">Textile Physics.</span>
          </h1>
          <p className="font-sans text-base text-umber/70 leading-relaxed font-light">
            Twice daily masterclasses on grainline orientation, drape dynamics, seam stabilization, and needle gauge calibrations for discerning couturiers.
          </p>
        </div>

        {/* Featured Hero Article */}
        {featured && (
          <Link href={`/journal/${featured.slug}`} className="block group">
            <div className="bg-limestone border border-hemp rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group-hover:border-loam/50 transition-colors duration-300">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-loam bg-loam/10 px-3 py-1 rounded-full border border-loam/30">
                    {featured.publishDay} // {featured.publishSlot} Masterclass
                  </span>
                  <span className="font-mono text-xs text-umber/50">{featured.readTime}</span>
                </div>
                <h2 className="font-serif text-3xl md:text-5xl text-umber group-hover:text-loam transition-colors">
                  {featured.title}
                </h2>
                <p className="font-sans text-sm md:text-base text-umber/70 leading-relaxed font-light max-w-2xl">
                  {featured.excerpt}
                </p>
                <div className="pt-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-loam group-hover:translate-x-1 transition-transform">
                  <span>Read Masterclass</span>
                  <span>&rarr;</span>
                </div>
              </div>

              <div
                className={`lg:col-span-5 h-64 lg:h-full min-h-[260px] ${featured.pastel} rounded-2xl border border-hemp/60 flex items-center justify-center p-8 text-center`}
              >
                <div className="space-y-2">
                  <span className="font-serif italic text-3xl text-umber/80">
                    &ldquo;Haute Couture begins at the loom.&rdquo;
                  </span>
                  <p className="font-mono text-[10px] uppercase text-umber/50 tracking-widest">
                    {featured.category} // Atelier Protocol
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* 2 Daily Masterclasses Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-hemp pb-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-loam">
              This Week&apos;s 14 Atelier Masterclasses (2 Published Daily)
            </h3>
            <span className="font-mono text-[11px] text-umber/60 uppercase">
              {articles.length} Volumes Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/journal/${article.slug}`}
                className="group flex flex-col justify-between bg-limestone/50 border border-hemp rounded-2xl p-6 hover:border-loam/50 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-umber/50">
                    <span className="text-loam font-medium">
                      {article.publishDay} // {article.publishSlot}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-umber/60 bg-hemp/20 px-2.5 py-0.5 rounded">
                    {article.category}
                  </span>

                  <h3 className="font-serif text-xl text-umber group-hover:text-loam transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs text-umber/70 leading-relaxed font-light line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-hemp/30 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-loam group-hover:text-umber transition-colors">
                  <span>Explore Protocol</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
