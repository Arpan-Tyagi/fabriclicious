import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ATELIER_JOURNAL_ARTICLES } from "@/data/journalArticles";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ATELIER_JOURNAL_ARTICLES[slug];

  const title = article ? article.title : slug.replace(/-/g, " ");
  const description = article
    ? article.excerpt
    : "Haute couture masterclass and tailoring protocols by Fabriclicious Atelier.";

  return {
    title: `${title} | Fabriclicious Editorial Masterclass`,
    description,
    alternates: {
      canonical: `/journal/${slug}`,
    },
    openGraph: {
      title: `${title} | Fabriclicious Atelier`,
      description,
      url: `https://www.fabriclicious.com/journal/${slug}`,
      type: "article",
    },
  };
}

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: dbBlog } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  const article = ATELIER_JOURNAL_ARTICLES[slug];

  if (!dbBlog && !article) {
    notFound();
  }

  const title = dbBlog?.title || article?.title || "";
  const excerpt = dbBlog?.excerpt || article?.excerpt || "";
  const content = dbBlog?.content_markdown || article?.content || "";
  const category = article?.category || "Tailoring Masterclass";
  const readTime = article?.readTime || "7 min read";
  const publishDay = article?.publishDay || "Archive";
  const publishSlot = article?.publishSlot || "Morning";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    url: `https://www.fabriclicious.com/journal/${slug}`,
    datePublished: "2026-11-23T08:00:00Z",
    dateModified: "2026-11-23T08:00:00Z",
    author: {
      "@type": "Organization",
      name: "Fabriclicious Master Archivists",
      url: "https://www.fabriclicious.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Fabriclicious",
      logo: {
        "@type": "ImageObject",
        url: "https://www.fabriclicious.com/images/logo-horizontal.svg",
      },
    },
    articleSection: category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.fabriclicious.com/journal/${slug}`,
    },
  };

  return (
    <article className="min-h-screen bg-linen py-16 px-6 md:px-12 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Navigation Back */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-loam hover:text-umber transition-colors"
        >
          <span>&larr; Back to Editorial Journal</span>
        </Link>

        {/* Masterclass Header */}
        <header className="space-y-6 border-b border-hemp pb-10">
          <div className="flex items-center gap-4 text-xs font-mono text-loam">
            <span className="uppercase tracking-widest bg-loam/10 px-3 py-1 rounded-full border border-loam/20">
              {publishDay} // {publishSlot} Masterclass
            </span>
            <span className="text-hemp">//</span>
            <span className="uppercase tracking-widest">{category}</span>
            <span className="text-hemp">//</span>
            <span>{readTime}</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl text-umber tracking-tight leading-[1.05]">
            {title}
          </h1>

          <p className="font-serif italic text-xl md:text-2xl text-umber/80 leading-relaxed border-l-2 border-loam pl-6 py-1">
            {excerpt}
          </p>
        </header>

        {/* Markdown-style Clean Content */}
        <div className="prose prose-neutral max-w-none font-sans text-umber/90 leading-relaxed space-y-8 text-base md:text-lg font-light">
          {content
            .trim()
            .split("\n\n")
            .map((paragraph, idx) => {
              const trimmed = paragraph.trim();

              if (trimmed.startsWith("## ")) {
                return (
                  <h2
                    key={idx}
                    className="font-serif text-2xl md:text-3xl text-umber tracking-tight pt-6 border-b border-hemp/50 pb-3"
                  >
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }

              if (trimmed.startsWith("# ")) {
                return null;
              }

              if (trimmed.startsWith("- ")) {
                const items = trimmed.split("\n- ").map((item) => item.replace("- ", "").trim());
                return (
                  <ul key={idx} className="list-disc pl-6 space-y-2 text-base text-umber/80">
                    {items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                );
              }

              if (trimmed.startsWith("|")) {
                const rows = trimmed
                  .split("\n")
                  .filter((r) => !r.includes("---"))
                  .map((r) =>
                    r
                      .split("|")
                      .map((c) => c.trim())
                      .filter(Boolean)
                  );

                if (rows.length === 0) return null;
                const headerRow = rows[0];
                const bodyRows = rows.slice(1);

                return (
                  <div key={idx} className="overflow-x-auto my-6 border border-hemp rounded-2xl bg-limestone p-4">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-hemp text-loam uppercase tracking-wider">
                          {headerRow.map((cell, cIdx) => (
                            <th key={cIdx} className="pb-3 pr-4 font-semibold">
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-hemp/30 text-umber/80">
                        {bodyRows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-3 pr-4">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              return (
                <p key={idx} className="leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
        </div>

        {/* Swatch & Yardage Atelier CTA Box */}
        <div className="bg-limestone border border-hemp rounded-3xl p-8 md:p-10 space-y-6">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-loam">
            The Atelier Swatch Protocol
          </div>
          <h3 className="font-serif text-2xl md:text-3xl text-umber">
            Inspect Fiber Structure Before You Cut.
          </h3>
          <p className="font-sans text-sm text-umber/70 leading-relaxed">
            Every fabric featured in our masterclasses is available as a 10&times;10 cm specimen swatch with 100% investment credit toward your continuous yardage order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/swatches"
              className="inline-flex items-center justify-center bg-loam text-linen px-6 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-umber transition-colors"
            >
              Order Swatch Specimen Tray &rarr;
            </Link>
            <Link
              href="/fabrics"
              className="inline-flex items-center justify-center border border-hemp bg-linen text-umber px-6 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest hover:border-loam transition-colors"
            >
              Explore Full Fabric Archive
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
