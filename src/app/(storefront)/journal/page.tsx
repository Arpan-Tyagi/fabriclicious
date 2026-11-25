import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FABRIC_JOURNAL_ARTICLES, JournalArticle } from "@/data/journalArticles";

export const metadata = {
  title: "Fabric Journal & Sewing Guides | Fabriclicious",
  description:
    "Clear sewing tutorials, fabric care guides, needle advice, and fabric buying guides by Mithila Enterprises.",
  alternates: {
    canonical: "/journal",
  },
};

export const revalidate = 3600;

interface JournalPageProps {
  searchParams?: Promise<{ category?: string }>;
}

export default async function StorefrontJournalPage({ searchParams }: JournalPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const activeCategory = resolvedSearchParams?.category;

  const supabase = await createClient();
  const { data: dbBlogs } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  // Fallback to our masterclasses, sorted in reverse chronological order with slot tie-breaking
  const rawArticles: JournalArticle[] =
    dbBlogs && dbBlogs.length > 0
      ? dbBlogs.map((b) => ({
          slug: b.slug,
          title: b.title,
          category: "Fabric Guide",
          readTime: "7 min read",
          excerpt: b.excerpt,
          publishDay: "Archived",
          publishSlot: "Morning" as const,
          publishDate: b.created_at ? b.created_at.split("T")[0] : "2026-11-24",
          targetKeyword: "bespoke fabric tailoring",
          pastel: "bg-pastel-sky/40",
          content: b.content_markdown,
        }))
      : Object.values(FABRIC_JOURNAL_ARTICLES);

  const sortedArticles = [...rawArticles].sort((a, b) => {
    const dateComp = b.publishDate.localeCompare(a.publishDate);
    if (dateComp !== 0) return dateComp;
    const slotWeight = (slot: string) => (slot === "Evening" ? 2 : 1);
    return slotWeight(b.publishSlot) - slotWeight(a.publishSlot);
  });

  // Extract unique categories for filter pills
  const categories = [
    "All",
    ...Array.from(new Set(rawArticles.map((a) => a.category).filter(Boolean))),
  ];

  const filteredArticles = activeCategory && activeCategory !== "All"
    ? sortedArticles.filter((a) => a.category === activeCategory)
    : sortedArticles;

  const featured = !activeCategory || activeCategory === "All" ? filteredArticles[0] : null;
  const gridArticles = featured ? filteredArticles.slice(1) : filteredArticles;

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
            Twice daily masterclasses on grainline orientation, drape dynamics, seam stabilization, and wholesale sourcing protocols for discerning couturiers.
          </p>
        </div>

        {/* Featured Hero Article (Shown on 'All' view) */}
        {featured && (
          <Link href={`/journal/${featured.slug}`} className="block group">
            <div className="bg-limestone border border-hemp rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group-hover:border-loam/50 transition-colors duration-300">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-loam bg-loam/10 px-3 py-1 rounded-full border border-loam/30">
                    {featured.publishDate} {"//"} {featured.publishDay} {"//"} {featured.publishSlot}
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
                    {featured.category} {"//"} Sewing Guide
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Masterclasses Grid with Category Filtering */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-hemp pb-4 gap-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-loam">
              Fabric Guides &amp; Sewing Tutorials
            </h3>
            <span className="font-mono text-[11px] text-umber/60 uppercase">
              {filteredArticles.length} of {sortedArticles.length} Volumes Shown
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isSelected = (!activeCategory && cat === "All") || activeCategory === cat;
              return (
                <Link
                  key={cat}
                  href={cat === "All" ? "/journal" : `/journal?category=${encodeURIComponent(cat)}`}
                  className={`font-mono text-xs uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all duration-200 ${
                    isSelected
                      ? "bg-loam text-linen border-loam shadow-sm"
                      : "bg-limestone/50 text-umber/70 border-hemp hover:border-loam/50 hover:text-umber"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* Articles Grid */}
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
                      {article.publishDate} {"//"} {article.publishDay}
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
