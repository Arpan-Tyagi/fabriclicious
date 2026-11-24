import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ATELIER_JOURNAL_ARTICLES } from "@/data/journalArticles";

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(ATELIER_JOURNAL_ARTICLES).map((slug) => ({
    slug,
  }));
}

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

// Token-based inline markdown formatter supporting Links, Bold, Code, and Italics
function renderFormattedText(text: string) {
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    if (!part) return null;

    // Link [label](url)
    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const [, label, url] = match;
        return (
          <Link
            key={i}
            href={url}
            className="text-loam font-medium underline underline-offset-4 decoration-loam/40 hover:text-umber hover:decoration-umber transition-colors"
          >
            {label}
          </Link>
        );
      }
    }

    // Bold **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={i} className="font-semibold text-umber">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Inline Code `text`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={i}
          className="font-mono text-xs bg-hemp/25 text-umber px-1.5 py-0.5 rounded border border-hemp/40"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Italic *text*
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return (
        <em key={i} className="italic text-umber/90">
          {part.slice(1, -1)}
        </em>
      );
    }

    return part;
  });
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
  const publishDate =
    article?.publishDate ||
    (dbBlog?.created_at ? dbBlog.created_at.split("T")[0] : "2026-11-24");

  // Related articles calculation
  const allArticles = Object.values(ATELIER_JOURNAL_ARTICLES).filter((a) => a.slug !== slug);
  const sameCategory = allArticles.filter((a) => a.category === category);
  const otherArticles = allArticles.filter((a) => a.category !== category);
  const relatedArticles = [...sameCategory, ...otherArticles].slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    url: `https://www.fabriclicious.com/journal/${slug}`,
    datePublished: `${publishDate}T08:00:00Z`,
    dateModified: `${publishDate}T08:00:00Z`,
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Atelier",
        item: "https://www.fabriclicious.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Editorial Journal",
        item: "https://www.fabriclicious.com/journal",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://www.fabriclicious.com/journal/${slug}`,
      },
    ],
  };

  return (
    <article className="min-h-screen bg-linen py-16 px-6 md:px-12 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-loam/70 flex items-center gap-2">
          <Link href="/" className="hover:text-umber transition-colors">
            Atelier
          </Link>
          <span className="text-hemp">/</span>
          <Link href="/journal" className="hover:text-umber transition-colors">
            Editorial Journal
          </Link>
          <span className="text-hemp">/</span>
          <span className="text-umber truncate max-w-xs md:max-w-md font-medium">
            {title}
          </span>
        </nav>

        {/* Masterclass Header */}
        <header className="space-y-6 border-b border-hemp pb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-loam">
            <span className="uppercase tracking-widest bg-loam/10 px-3 py-1 rounded-full border border-loam/20">
              {publishDate} {"//"} {publishDay} {"//"} {publishSlot} Masterclass
            </span>
            <span className="text-hemp">{"//"}</span>
            <span className="uppercase tracking-widest">{category}</span>
            <span className="text-hemp">{"//"}</span>
            <span>{readTime}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-umber tracking-tight leading-[1.08]">
            {title}
          </h1>

          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-umber/80 leading-relaxed border-l-2 border-loam pl-6 py-1">
            {excerpt}
          </p>
        </header>

        {/* Markdown-style Clean Content with Full Token Formatting */}
        <div className="font-sans text-umber/90 leading-relaxed space-y-6 text-base md:text-lg font-light max-w-prose">
          {content
            .trim()
            .split("\n\n")
            .map((paragraph: string, idx: number) => {
              const trimmed = paragraph.trim();

              // Horizontal Rule Divider
              if (trimmed === "---") {
                return <hr key={idx} className="border-t border-hemp/60 my-10" />;
              }

              // H2 Headings
              if (trimmed.startsWith("## ")) {
                const headingText = trimmed.replace("## ", "").trim();

                // Highlighted AEO Sourcing Callout Card
                if (
                  headingText.toLowerCase().includes("where to buy") ||
                  headingText.toLowerCase().includes("where to source")
                ) {
                  return (
                    <div
                      key={idx}
                      className="bg-limestone border border-loam/30 rounded-3xl p-6 md:p-8 my-8 shadow-sm space-y-4"
                    >
                      <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-loam bg-loam/10 px-3 py-1 rounded-full border border-loam/20">
                        <span>Atelier Sourcing Protocol</span>
                      </div>
                      <h2 className="font-serif text-2xl md:text-3xl text-umber tracking-tight">
                        {headingText}
                      </h2>
                    </div>
                  );
                }

                return (
                  <h2
                    key={idx}
                    className="font-serif text-2xl md:text-3xl text-umber tracking-tight pt-8 border-b border-hemp/50 pb-3"
                  >
                    {headingText}
                  </h2>
                );
              }

              // H3 Subheadings
              if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={idx}
                    className="font-serif text-xl md:text-2xl text-umber tracking-tight pt-4"
                  >
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }

              // H4 Sub-sections
              if (trimmed.startsWith("#### ")) {
                return (
                  <h4
                    key={idx}
                    className="font-serif text-lg md:text-xl text-umber tracking-tight pt-3 font-medium"
                  >
                    {trimmed.replace("#### ", "")}
                  </h4>
                );
              }

              // Filter out duplicate H1s
              if (trimmed.startsWith("# ")) {
                return null;
              }

              // Blockquotes
              if (trimmed.startsWith("> ")) {
                const quoteText = trimmed.replace(/^>\s*/gm, "");
                return (
                  <blockquote
                    key={idx}
                    className="border-l-2 border-loam bg-limestone/60 pl-6 py-4 my-6 italic text-umber/90 rounded-r-xl"
                  >
                    {renderFormattedText(quoteText)}
                  </blockquote>
                );
              }

              // Unordered List (- item)
              if (trimmed.startsWith("- ")) {
                const items = trimmed
                  .split("\n- ")
                  .map((item: string) => item.replace(/^- /, "").trim());

                return (
                  <ul key={idx} className="list-disc pl-6 space-y-2.5 my-4 text-base md:text-lg text-umber/85">
                    {items.map((it: string, i: number) => (
                      <li key={i}>{renderFormattedText(it)}</li>
                    ))}
                  </ul>
                );
              }

              // Ordered List (1. item \n 2. item)
              if (/^\d+\.\s/.test(trimmed)) {
                const items = trimmed
                  .split(/\n(?=\d+\.\s)/)
                  .map((s) => s.replace(/^\d+\.\s*/, "").trim());

                return (
                  <ol key={idx} className="list-decimal pl-6 space-y-2.5 my-4 text-base md:text-lg text-umber/85">
                    {items.map((it: string, i: number) => (
                      <li key={i}>{renderFormattedText(it)}</li>
                    ))}
                  </ol>
                );
              }

              // Markdown Tables
              if (trimmed.startsWith("|")) {
                const rows = trimmed
                  .split("\n")
                  .filter((r: string) => !r.includes("---"))
                  .map((r: string) =>
                    r
                      .split("|")
                      .map((c: string) => c.trim())
                      .filter(Boolean)
                  );

                if (rows.length === 0) return null;
                const headerRow = rows[0];
                const bodyRows = rows.slice(1);

                return (
                  <div
                    key={idx}
                    className="overflow-x-auto my-8 border border-hemp rounded-2xl bg-limestone p-4 md:p-6 shadow-sm max-w-full"
                  >
                    <table className="w-full text-left text-xs md:text-sm font-mono">
                      <thead>
                        <tr className="border-b border-hemp text-loam uppercase tracking-wider">
                          {headerRow.map((cell: string, cIdx: number) => (
                            <th key={cIdx} className="pb-3 pr-4 font-semibold">
                              {renderFormattedText(cell)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-hemp/30 text-umber/85">
                        {bodyRows.map((row: string[], rIdx: number) => (
                          <tr key={rIdx} className="hover:bg-hemp/10 transition-colors">
                            {row.map((cell: string, cIdx: number) => (
                              <td key={cIdx} className="py-3 pr-4">
                                {renderFormattedText(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              // Standard Paragraph
              return (
                <p key={idx} className="leading-relaxed">
                  {renderFormattedText(trimmed)}
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
          <p className="font-sans text-sm md:text-base text-umber/70 leading-relaxed font-light">
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

        {/* Related Masterclasses Section */}
        {relatedArticles.length > 0 && (
          <section className="space-y-6 pt-10 border-t border-hemp/50">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-loam">
                Related Atelier Masterclasses
              </h3>
              <Link
                href="/journal"
                className="font-mono text-xs text-loam hover:text-umber transition-colors"
              >
                View All Masterclasses &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/journal/${rel.slug}`}
                  className="group bg-limestone/60 border border-hemp rounded-2xl p-5 flex flex-col justify-between hover:border-loam/50 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-umber/50">
                      <span>{rel.publishDate}</span>
                      <span>{rel.readTime}</span>
                    </div>
                    <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-umber/60 bg-hemp/20 px-2 py-0.5 rounded">
                      {rel.category}
                    </span>
                    <h4 className="font-serif text-lg text-umber group-hover:text-loam transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="pt-4 mt-2 border-t border-hemp/30 font-mono text-[10px] uppercase tracking-widest text-loam group-hover:text-umber flex items-center justify-between">
                    <span>Read Protocol</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
