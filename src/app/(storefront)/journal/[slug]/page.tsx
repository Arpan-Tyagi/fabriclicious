import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const ARTICLE_DATABASE: Record<string, {
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  pastel: string;
}> = {
  "mastering-true-bias": {
    title: "Mastering the True Bias: Cutting and Stabilizing Silk Charmeuse",
    category: "Craftsmanship",
    readTime: "8 min read",
    excerpt: "An atelier guide to calculating diagonal grainline ease, preventing seam puckering, and calibrating needle tension.",
    pastel: "bg-pastel-sky/40",
    content: `
Cutting on the true bias involves laying pattern pieces at a 45-degree angle to the fabric's warp and weft threads. This orientation transforms woven silk into an elastic, fluid mesh that contours to the body, requiring 25% to 30% additional yardage.

## Technical Table: Needle, Thread & Stitch Calibration

| Fabric Type | GSM Range | Recommended Needle | Thread Type | Stitch Length | Pressing Temperature |
| ----------- | --------- | ------------------ | ----------- | ------------- | -------------------- |
| Silk Charmeuse | 80–100 GSM | Schmetz Microtex 60/8 | Fine Silk / 100wt Poly | 1.8–2.0 mm | Low Dry Heat (120°C) |
| Normandy Linen | 160–220 GSM | Universal or Jeans 80/12 | 50wt Mercerized Cotton | 2.5–2.8 mm | High Steam (200°C) |
| Worsted Suiting | 240–320 GSM | Microtex 80/12 or 90/14 | 100% Core-Spun Poly | 2.5 mm | Medium Steam + Clapper |
    `
  },
  "anatomy-of-drape-silk-satin": {
    title: "The Physics of Fluidity: Working with 85 GSM Mulberry Silk Satin",
    category: "Textile Physics",
    readTime: "6 min read",
    excerpt: "Master seam stabilization, Microtex needle pairing, and bias cutting tension for ultra-fluid silk drapes.",
    pastel: "bg-pastel-rose/40",
    content: `
# The Physics of Fluidity: Working with 85 GSM Mulberry Silk Satin

Silk satin woven from pure Mulberry filaments possesses a unique fluid drape index ($0.88\\text{ Fd}$) that demands precise tension control and cutting protocols in the atelier.

## 1. Loom Relaxation & Table Preparation
Before making a single cut into pure silk satin, unroll the required meterage onto a wool-felt cutting surface and allow it to rest for at least 18 hours. This neutralizes storage warp tension.

- **Cutting Surface**: Wool felt or friction matting (prevents silk slippage)
- **Shearing Tool**: 10-inch razor-edge tailor's shears or fresh rotary blade
- **Pinning**: Use ultra-fine glass-head silk pins ($0.4\\text{ mm}$) exclusively within seam allowances

## 2. Seam Stabilization & Stitching Dynamics
- **Needle Specification**: Microtex 60/8 or 70/10 sharp point
- **Thread Selection**: 100% fine silk thread or 120-weight extra-fine polyester
- **Stitch Length**: 1.5 to 2.0 mm with light presser foot pressure ($1.5\\text{ kg}$)
- **Stay Taping**: Apply lightweight bias fusible stay tape along necklines and armholes prior to assembly

## 3. Pressing & Steaming Protocols
Silk satin reacts instantly to thermal variance. Always use a dry pressing cloth (organza or fine muslin) with iron temperatures capped at 130°C (Silk setting). Never spray direct steam onto the satin face to avoid water spotting.
    `
  },
  "belgian-flax-linen-tailoring-guide": {
    title: "Bespoke Linen Construction: Pressing Protocols & Canvas Interfacing",
    category: "Tailoring Masterclass",
    readTime: "8 min read",
    excerpt: "Why high-GSM Belgian flax linen demands traditional haircloth interfacing and steam molding.",
    pastel: "bg-pastel-sage/40",
    content: `
# Bespoke Linen Construction: Pressing Protocols & Canvas Interfacing

Belgian flax linen is prized for its high tensile strength, breathability, and natural luster. However, its crisp hand requires specialized structural techniques for bespoke jacket chest pieces.

## 1. Pre-Shrinking & Grain Alignment
Flax fibers absorb moisture rapidly. Cold-soak the linen yardage in distilled water for 30 minutes, flat-drape to dry, and steam-press thoroughly to lock dimensional stability before layout.

## 2. Floating Haircloth Interfacing
- **Canvas Weight**: Light to medium horsehair limestone ($180\\text{ GSM}$)
- **Pad Stitching**: Hand-pad stitch the lapel roll using fine linen thread at 6mm spacing
- **Tape Edge**: Fell-stitch 6mm cotton stay tape along the roll line and front edge under slight tension

## 3. Crease Setting & Steam Shaping
Linen holds sharp pressed creases exceptionally well. Use high steam pressure (3.5 bar) with a wooden clapper to set razor-sharp trouser pleats and lapel edges.
    `
  },
  "herringbone-tweed-pattern-matching": {
    title: "Precision Chevron Matching Across Harris Tweed Tailored Lapels",
    category: "Craftsmanship",
    readTime: "10 min read",
    excerpt: "Eliminating pattern shear on heavy woolen weaves with friction chalking and stay-stitching.",
    pastel: "bg-pastel-sky/40",
    content: `
# Precision Chevron Matching Across Harris Tweed Tailored Lapels

Heavy woolen Harris Tweed ($480\\text{ GSM}$) features prominent herringbone chevrons that must align perfectly across jacket fronts, lapels, and welt pockets.

## 1. Single-Ply Layout Protocol
Never cut heavy tweed folded double. Lay out the yardage single-ply face up, locking each chevron peak to corresponding chalk lines across left and right panels.

## 2. Friction Chalking & Stay-Stitching
- **Chalk Type**: Pipeclay tailor's chalk (brushes out cleanly without grease residue)
- **Basting**: Hand-baste matching chevrons every 25mm prior to machine sewing
- **Seam Construction**: Standard 80/12 universal needle with 2.8mm stitch length

## 3. Bulk Reduction at Seam Intersections
Trim seam allowances diagonally at lapel corners and press open using a tailor's ham and heavy sleeve board to achieve flat, razor-sharp edges.
    `
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLE_DATABASE[slug];
  const title = article ? article.title : slug.replace(/-/g, " ");
  return {
    title: `${title} | Fabriclicious Editorial Journal`,
  };
}

export default async function JournalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: blog } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  const fallback = ARTICLE_DATABASE["mastering-true-bias"] || ARTICLE_DATABASE["anatomy-of-drape-silk-satin"];

  const title = blog?.title || fallback.title;
  const excerpt = blog?.excerpt || fallback.excerpt;
  const content = blog?.content_markdown || fallback.content;
  const category = fallback.category;
  const readTime = fallback.readTime;

  return (
    <article className="min-h-screen bg-linen py-16 px-6 md:px-12 pt-32">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Navigation Back */}
        <Link href="/journal" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-loam hover:text-umber transition-colors">
          <span>← Back to Editorial Journal</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-6 border-b border-hemp pb-8">
          <div className="flex items-center gap-3 font-mono text-xs text-loam">
            <span className="px-3 py-1 bg-loam/10 rounded-full uppercase border border-loam/30">
              {category}
            </span>
            <span>•</span>
            <span className="text-umber/60">{readTime}</span>
            <span>•</span>
            <span className="text-umber/60">Mithila Enterprises Archive</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl text-umber tracking-tight leading-tight">
            {title}
          </h1>

          <p className="font-sans text-lg md:text-xl text-umber/75 font-light leading-relaxed">
            {excerpt}
          </p>
        </header>

        {/* Article Markdown Body */}
        <div className="prose prose-lg max-w-none font-sans text-umber/85 leading-relaxed space-y-6">
          <div className="bg-limestone border border-hemp rounded-3xl p-8 md:p-12 space-y-6">
            {content.split("\\n\\n").map((paragraph: string, idx: number) => {
              if (paragraph.startsWith("# ")) {
                return <h1 key={idx} className="font-serif text-3xl text-umber mt-6 mb-4">{paragraph.replace("# ", "")}</h1>;
              }
              if (paragraph.startsWith("## ")) {
                return <h2 key={idx} className="font-serif text-2xl text-umber mt-6 mb-3">{paragraph.replace("## ", "")}</h2>;
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <ul key={idx} className="list-disc pl-6 space-y-2 text-sm text-umber/80">
                    {paragraph.split("\\n").map((line: string, lIdx: number) => (
                      <li key={lIdx}>{line.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith("|")) {
                const rows = paragraph.split("\\n");
                return (
                  <div key={idx} className="overflow-x-auto my-6">
                    <table className="w-full text-left text-sm text-umber border-collapse border border-hemp">
                      <thead>
                        <tr>
                          {rows[0].split("|").filter(Boolean).map((cell, cIdx) => (
                            <th key={cIdx} className="border border-hemp px-4 py-2 bg-loam/10">{cell.trim()}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.slice(2).map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.split("|").filter(Boolean).map((cell, cIdx) => (
                              <td key={cIdx} className="border border-hemp px-4 py-2">{cell.trim()}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              return <p key={idx} className="text-sm md:text-base leading-relaxed text-umber/80">{paragraph}</p>;
            })}
          </div>
        </div>

        {/* Footer Call to Action */}
        <div className="bg-umber text-linen rounded-3xl p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-loam">Textile Curation</span>
            <h3 className="font-serif text-3xl text-linen mt-1">Ready to inspect our fabric archive?</h3>
            <p className="font-sans text-xs text-linen/70 mt-1">Browse continuous rolls cut to your exact fractional yardage.</p>
          </div>
          <Link href="/fabrics" className="px-6 py-3.5 bg-linen text-umber rounded-full font-mono text-xs uppercase tracking-wider hover:bg-loam hover:text-linen transition-colors text-center shrink-0">
            Explore Archive →
          </Link>
        </div>
      </div>
    </article>
  );
}
