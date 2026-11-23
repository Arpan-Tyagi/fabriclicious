import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { MacroWeaveLoupe } from "@/components/MacroWeaveLoupe";
import { FabricCutSelector } from "@/components/FabricCutSelector";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} | Bespoke Continuous Textiles`,
    description: `Bespoke continuous natural textile in ${formattedTitle}. Precision cut from 0.5m with 100% credited swatch sampling. Direct mill provenance and single-dye lot integrity.`,
    alternates: {
      canonical: `/fabrics/${slug}`,
    },
    openGraph: {
      title: `${formattedTitle} | Fabriclicious Atelier`,
      description: `Bespoke natural textile cut continuously from 0.5m. Swatch fee 100% credited on continuous yardage.`,
      url: `https://www.fabriclicious.com/fabrics/${slug}`,
      images: ["/placeholder-fabric.jpg"],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select(`
      *,
      variants:product_variants (*)
    `)
    .eq("slug", slug)
    .single();

  if (!product) {
    notFound();
  }

  const defaultImage = product.variants?.[0]?.images?.[0] || "/placeholder-fabric.jpg";
  const pricePerMeter = product.variants?.[0]?.price_per_meter || 48.0;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title || "Bespoke Atelier Fabric",
    description: product.description || "Continuous luxury textile cut from 0.5 meters.",
    image: `https://www.fabriclicious.com${defaultImage}`,
    brand: {
      "@type": "Brand",
      name: "Fabriclicious",
    },
    material: product.weave || "Natural Fiber",
    offers: {
      "@type": "Offer",
      url: `https://www.fabriclicious.com/fabrics/${slug}`,
      priceCurrency: "USD",
      price: pricePerMeter,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "GSM (Weight)",
        value: `${product.gsm || 82} GSM`,
      },
      {
        "@type": "PropertyValue",
        name: "Usable Width",
        value: `${product.width_cm || 140} cm`,
      },
      {
        "@type": "PropertyValue",
        name: "Weave Structure",
        value: product.weave || "Satin Weave",
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Left: 400% Macro Weave Loupe */}
      <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen sticky top-0 bg-limestone">
        <MacroWeaveLoupe imageSrc={defaultImage} />
      </div>

      {/* Right: Product Details & FabricCutSelector */}
      <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 bg-linen">
        <div className="max-w-xl mx-auto">
          <div className="mb-12">
            <div className="font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-loam mb-6 flex items-center gap-3">
              <span>100% NATURAL LUXURY FIBER</span>
              <span className="text-hemp">//</span>
              <span>EUROPEAN HERITAGE MILLS</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tighter mb-6 leading-none">
              {product.title}
            </h1>
            <blockquote className="pl-5 border-l-2 border-hemp mb-6 py-1">
              <p className="font-serif text-xl md:text-2xl italic text-umber/90 leading-relaxed">
                Single-bolt continuous cut curated from Europe&apos;s heritage family looms.
              </p>
            </blockquote>
            <p className="font-sans text-base md:text-lg text-umber/70 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-y-4 font-mono text-xs uppercase tracking-widest text-umber/60 border-t border-b border-hemp py-6">
              <div>Weight</div>
              <div className="text-umber">{product.gsm} GSM</div>
              <div>Weave</div>
              <div className="text-umber">{product.weave}</div>
              <div>Drape</div>
              <div className="text-umber">{product.drape?.replace("_", " ")}</div>
              <div>Width</div>
              <div className="text-umber">{product.width_cm} cm</div>
            </div>
          </div>

          <FabricCutSelector product={product} variant={product.variants?.[0]} />

          {/* Structured Atelier Technical Accordion */}
          <div className="mt-16 space-y-6">
            <h3 className="font-serif text-2xl text-umber">Atelier Technical Specifications</h3>

            <div className="border border-hemp rounded-2xl overflow-hidden bg-limestone">
              <div className="p-6 border-b border-hemp">
                <h4 className="font-mono text-xs uppercase tracking-widest text-loam mb-4">
                  Mechanical &amp; Physical Parameters
                </h4>
                <ul className="space-y-3 font-sans text-sm text-umber/80">
                  <li>
                    <strong className="text-umber font-medium">Fiber Composition:</strong> 100%
                    High-Grade Natural Fibers.
                  </li>
                  <li>
                    <strong className="text-umber font-medium">Weight &amp; Density:</strong>{" "}
                    {product.gsm} GSM (Grams per Square Meter).
                  </li>
                  <li>
                    <strong className="text-umber font-medium">Usable Width:</strong>{" "}
                    {product.width_cm} cm within selvage boundaries.
                  </li>
                  <li>
                    <strong className="text-umber font-medium">Weave Type:</strong> {product.weave}.
                  </li>
                  <li>
                    <strong className="text-umber font-medium">Drape Coefficient:</strong> Grade 01
                    &mdash; Fluid Fall Dynamics.
                  </li>
                </ul>
              </div>

              <div className="p-6 border-b border-hemp">
                <h4 className="font-mono text-xs uppercase tracking-widest text-loam mb-4">
                  Tailor&apos;s Machine &amp; Calibration
                </h4>
                <ul className="space-y-3 font-sans text-sm text-umber/80">
                  <li>
                    <strong className="text-umber font-medium">Needle Selection:</strong> Schmetz
                    Microtex or Universal matched to GSM density.
                  </li>
                  <li>
                    <strong className="text-umber font-medium">Pressing Protocol:</strong> Low to
                    medium dry heat with natural press cloth.
                  </li>
                  <li>
                    <strong className="text-umber font-medium">Recommended Seam Finishes:</strong>{" "}
                    French seams or flat-felled tailored edges.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
