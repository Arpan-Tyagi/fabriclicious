import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { MacroWeaveLoupe } from "@/components/MacroWeaveLoupe";
import { FabricCutSelector } from "@/components/FabricCutSelector";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return {
    title: "Como Silk Charmeuse | 82 GSM Satin Weave | Fabriclicious Atelier",
    description: "Bespoke 100% Grade 6A Italian silk charmeuse in Smoked Umber. 82 GSM, ultra-fluid drape. Cut continuously from 0.5m. Swatch fee 100% credited on orders over 2m.",
  };
}
export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left: 400% Macro Weave Loupe */}
      <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen sticky top-0 bg-limestone">
        <MacroWeaveLoupe imageSrc={defaultImage} />
      </div>

      {/* Right: Product Details & FabricCutSelector */}
      <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 bg-linen">
        <div className="max-w-xl mx-auto">
          <div className="mb-12">
            <div className="font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-loam mb-6 flex items-center gap-3">
              <span>100% GRADE 6A MULBERRY SILK</span>
              <span className="text-hemp">//</span>
              <span>COMO, ITALY</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tighter mb-6 leading-none">
              Como Liquid Silk Charmeuse in Smoked Umber
            </h1>
            <blockquote className="pl-5 border-l-2 border-hemp mb-6 py-1">
              <p className="font-serif text-xl md:text-2xl italic text-umber/90 leading-relaxed">
                A weighted satin with a cool, fluid glide and an incandescent, subtle luster.
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
              <div className="text-umber">{product.drape.replace('_', ' ')}</div>
              <div>Width</div>
              <div className="text-umber">{product.width_cm} cm</div>
            </div>
          </div>

          <FabricCutSelector 
            product={product} 
            variant={product.variants?.[0]} 
          />

          {/* Structured Atelier Technical Accordion */}
          <div className="mt-16 space-y-6">
            <h3 className="font-serif text-2xl text-umber">Atelier Technical Specifications</h3>
            
            <div className="border border-hemp rounded-2xl overflow-hidden bg-limestone">
              <div className="p-6 border-b border-hemp">
                <h4 className="font-mono text-xs uppercase tracking-widest text-loam mb-4">Mechanical &amp; Physical Parameters</h4>
                <ul className="space-y-3 font-sans text-sm text-umber/80">
                  <li><strong className="text-umber font-medium">Fiber Composition:</strong> 100% Grade 6A Long-Filament Mulberry Silk.</li>
                  <li><strong className="text-umber font-medium">Weight &amp; Density:</strong> 82 GSM (Grams per Square Meter) // 19 Momme.</li>
                  <li><strong className="text-umber font-medium">Usable Width:</strong> 140 cm (55 inches) within selvage boundaries.</li>
                  <li><strong className="text-umber font-medium">Weave Type:</strong> 5-End Satin Weave (High-luster warp face, matte crepe back).</li>
                  <li><strong className="text-umber font-medium">Drape Coefficient:</strong> Grade 01 &mdash; Ultra Fluid (High fall velocity, minimal self-support).</li>
                  <li><strong className="text-umber font-medium">Opacity:</strong> Semi-Opaque (Lining optional for blouses; recommended for structured skirts).</li>
                </ul>
              </div>

              <div className="p-6 border-b border-hemp">
                <h4 className="font-mono text-xs uppercase tracking-widest text-loam mb-4">Tailor's Sewing Machine &amp; Tool Calibration</h4>
                <ul className="space-y-3 font-sans text-sm text-umber/80">
                  <li><strong className="text-umber font-medium">Needle Selection:</strong> Schmetz Microtex Size 60/8 or 70/10. Sharp points prevent yarn snagging.</li>
                  <li><strong className="text-umber font-medium">Thread Calibration:</strong> Gütermann 100% Silk Thread or Extra-Fine Polyester Filament.</li>
                  <li><strong className="text-umber font-medium">Stitch Length:</strong> 1.8mm to 2.0mm for fine silk seams.</li>
                  <li><strong className="text-umber font-medium">Pressing Protocol:</strong> Low dry heat (Silk setting). Always use a dry silk organza press cloth; avoid direct steam to prevent water spotting.</li>
                  <li><strong className="text-umber font-medium">Recommended Seam Finishes:</strong> French seams (5mm width) or delicate hand-rolled hems.</li>
                </ul>
              </div>

              <div className="p-6">
                <h4 className="font-mono text-xs uppercase tracking-widest text-loam mb-4">Garment Silhouette Suitability Matrix</h4>
                <ul className="space-y-3 font-sans text-sm text-umber/80">
                  <li><strong className="text-umber font-medium">Highly Recommended:</strong> 1930s bias-cut slip dresses, cowl necklines, luxury camisoles, lingerie slips, draped evening gowns.</li>
                  <li><strong className="text-umber font-medium">Not Suitable For:</strong> Tailored blazers, pleat-front trousers, structured outerwear, or upholstery.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
