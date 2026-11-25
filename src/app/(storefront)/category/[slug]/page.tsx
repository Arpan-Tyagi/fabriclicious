import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CategoryEditorial } from "@/components/CategoryEditorial";
import { CatalogClient } from "@/components/CatalogClient";
import { CATEGORY_EDITORIAL_DATA } from "@/data/categoryEditorial";

export const revalidate = 300;

export async function generateStaticParams() {
  return Object.keys(CATEGORY_EDITORIAL_DATA).map((slug) => ({
    slug,
  }));
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lowerCat = slug.toLowerCase();
  const editorial = CATEGORY_EDITORIAL_DATA[lowerCat];

  const formattedName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const title = editorial?.metaTitle || `Buy ${formattedName} Fabric Online by the Meter | Fabriclicious`;
  const description =
    editorial?.metaDescription ||
    `Buy high-end continuous ${formattedName} textiles online by the meter. Fractional cuts from 0.5m with single-dye lot integrity and 100% credited swatch sampling.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/category/${lowerCat}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.fabriclicious.com/category/${lowerCat}`,
      type: "website",
      images: [
        {
          url: `/cat_${lowerCat}.jpg`,
          width: 1200,
          height: 630,
          alt: `${formattedName} Natural Fabric - Fabriclicious`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/cat_${lowerCat}.jpg`],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const lowerCat = slug.toLowerCase();
  const editorial = CATEGORY_EDITORIAL_DATA[lowerCat];

  const formattedName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const supabase = await createClient();

  // Fetch all published products with variants
  const { data: rawProducts } = await supabase
    .from("products")
    .select(`
      id, title, slug, base_price_per_meter, gsm, weave, drape,
      variants:product_variants (
        id, color_name, color_hex, images
      )
    `)
    .eq("is_published", true);

  // Filter products by category using regex matching on title or slug
  const catRegex = new RegExp(`\\b${lowerCat}\\b`, "i");
  const filteredProducts = (rawProducts || [])
    .filter((p) => catRegex.test(p.title) || catRegex.test(p.slug))
    .map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      price: p.base_price_per_meter,
      gsm: p.gsm,
      weave: p.weave,
      drape: p.drape,
      image: p.variants?.[0]?.images?.[0] || "/placeholder-fabric.jpg",
      colors: p.variants?.map((v: any) => v.color_hex) || [],
    }));

  const currentEditorial = editorial || {
    slug: lowerCat,
    title: `${formattedName}.`,
    metaTitle: `Buy ${formattedName} Fabric Online`,
    metaDescription: `Curated continuous cuts of ${formattedName}.`,
    targetKeyword: `buy ${lowerCat} fabric online`,
    gsmRange: "Varies by weave",
    description: `Explore our collection of master-milled natural ${lowerCat} textiles. Sourced directly from European looms with single dye-lot continuity.`,
    usage: "Bespoke tailoring, shirting, couture dresses, and transitional wear.",
    whenToBuy: "Available year-round with continuous bolt replenishment.",
    feel: "Natural tactile hand-feel, uncompromised by synthetic dilution.",
    buyingGuide: "Inspect fiber composition, GSM weight, and yarn twist before cutting.",
    aeoAnswer: `Pure ${lowerCat} fabric is available online by the meter or in wholesale bolts at Fabriclicious, cut continuously from 0.5 meters from single dye lots.`,
  };

  // Structured Data Schema for Category Collection Page
  const collectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://www.fabriclicious.com/category/${lowerCat}#webpage`,
        url: `https://www.fabriclicious.com/category/${lowerCat}`,
        name: currentEditorial.metaTitle,
        description: currentEditorial.metaDescription,
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.fabriclicious.com/#website",
        },
        breadcrumb: {
          "@id": `https://www.fabriclicious.com/category/${lowerCat}#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.fabriclicious.com/category/${lowerCat}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.fabriclicious.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Fabrics Archive",
            item: "https://www.fabriclicious.com/fabrics",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${formattedName} Fabrics`,
            item: `https://www.fabriclicious.com/category/${lowerCat}`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `https://www.fabriclicious.com/category/${lowerCat}#itemlist`,
        numberOfItems: filteredProducts.length,
        itemListElement: filteredProducts.map((p, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: `https://www.fabriclicious.com/fabrics/${p.slug}`,
          name: p.title,
        })),
      },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-linen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Breadcrumb Navigation Bar */}
      <div className="px-6 md:px-12 pt-28 pb-4 border-b border-hemp/50 bg-limestone/80">
        <nav
          aria-label="Breadcrumb"
          className="max-w-7xl mx-auto flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-umber/60"
        >
          <Link href="/" className="hover:text-umber transition-colors">
            Home
          </Link>
          <span className="text-hemp font-light">/</span>
          <Link href="/fabrics" className="hover:text-umber transition-colors">
            Fabrics Archive
          </Link>
          <span className="text-hemp font-light">/</span>
          <span className="text-umber font-medium">{formattedName}</span>
        </nav>
      </div>

      {/* Editorial Hero Section */}
      <CategoryEditorial data={currentEditorial} />

      {/* AEO / GEO Direct Answer & Sourcing Fact Block */}
      <section className="bg-linen py-12 px-6 md:px-12 border-b border-hemp">
        <div className="max-w-7xl mx-auto bg-limestone border border-hemp rounded-3xl p-8 md:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-loam" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-loam font-semibold">
              Fabric Buying &amp; Sewing Guide // {currentEditorial.gsmRange}
            </span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-umber">
            Where to buy authentic {lowerCat} fabric online by the meter?
          </h2>
          <p className="font-sans text-base md:text-lg text-umber/80 leading-relaxed font-light">
            {currentEditorial.aeoAnswer}
          </p>
          <div className="pt-2 flex flex-wrap gap-6 text-xs font-mono text-umber/60">
            <span>• CUT POLICY: From 0.5 unbroken meters</span>
            <span>• DYE INTEGRITY: 100% Single Dye Lot</span>
            <span>• SAMPLING: Swatch fee credited on yardage</span>
          </div>
        </div>
      </section>

      {/* Live Catalog Product Grid */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 border-b border-hemp pb-6">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl text-umber tracking-tight">
                Current {formattedName} Rolls
              </h2>
              <p className="font-mono text-xs uppercase tracking-widest text-umber/60 mt-2">
                Showing {filteredProducts.length} certified continuous bolt runs
              </p>
            </div>
            <Link
              href="/swatches"
              className="font-mono text-xs uppercase tracking-widest text-loam underline hover:text-umber transition-colors"
            >
              Order Sample Swatch Tray ($4.00) &rarr;
            </Link>
          </div>

          {filteredProducts.length > 0 ? (
            <CatalogClient initialProducts={filteredProducts} />
          ) : (
            <div className="bg-limestone border border-hemp rounded-2xl p-16 text-center space-y-4">
              <h3 className="font-serif text-2xl text-umber">
                New {formattedName} Bolts Arriving from Loom
              </h3>
              <p className="font-sans text-sm text-umber/70 max-w-md mx-auto">
                Our European mill runs are currently resting on cutting tables. Reserve your continuous yardage directly with our textile concierge.
              </p>
              <div className="pt-4">
                <Link
                  href="/fabrics"
                  className="inline-flex items-center justify-center bg-loam text-linen px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-umber transition-colors"
                >
                  Explore All Available Fabrics
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* B2B Bulk Sourcing & Swatch Bridge Banner */}
      <section className="bg-loam text-linen py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-linen/60">
              B2B Wholesale & Custom Bolt Runs
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-linen">
              Sourcing {formattedName} in Bulk for Boutique Collections?
            </h3>
            <p className="font-sans text-sm md:text-base text-linen/80 leading-relaxed font-light">
              We allocate full unbroken factory rolls (20 to 100+ meters) for fashion houses, sewing studios, and independent apparel labels. Benefit from tiered volume pricing, single dye-lot guarantees, and GST-compliant commercial invoicing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-start md:justify-end">
            <Link
              href="/swatches"
              className="inline-flex items-center justify-center bg-linen text-umber px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-limestone transition-colors text-center"
            >
              Order Swatch Specimen Tray
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center border border-linen/40 text-linen px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest hover:border-linen transition-colors text-center"
            >
              Inquire for Wholesale Bolts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
