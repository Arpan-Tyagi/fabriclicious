import { createClient } from "@/lib/supabase/server";
import { CatalogClient } from "@/components/CatalogClient";
import { CategoryEditorial } from "@/components/CategoryEditorial";
import { CATEGORY_EDITORIAL_DATA } from "@/data/categoryEditorial";

export const revalidate = 300;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function FabricsPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const categoryParam = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  
  const supabase = await createClient();
  
  // Fetch published products and their default variant image
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      id, title, slug, base_price_per_meter, gsm, weave, drape,
      variants:product_variants (
        id, color_name, color_hex, images
      )
    `)
    .eq("is_published", true);

  if (error) {
    console.error("Error fetching catalog:", error);
  }

  // Format data for the client
  let formattedProducts = (products || []).map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    price: p.base_price_per_meter,
    gsm: p.gsm,
    weave: p.weave,
    drape: p.drape,
    image: p.variants?.[0]?.images?.[0] || "/placeholder-fabric.jpg",
    colors: p.variants?.map((v: any) => v.color_hex) || []
  }));

  let currentEditorial = null;

  if (categoryParam) {
    const lowerCat = categoryParam.toLowerCase();
    
    if (CATEGORY_EDITORIAL_DATA[lowerCat]) {
      currentEditorial = CATEGORY_EDITORIAL_DATA[lowerCat];
    } else {
      // Fallback for unrecognized categories
      currentEditorial = {
        title: categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) + ".",
        description: `Explore our premium selection of ${lowerCat} textiles.`,
        usage: "Various applications depending on weave and weight.",
        whenToBuy: "Year-round staple.",
        feel: "Varies by specific composition.",
        buyingGuide: "Contact our atelier for specific recommendations."
      };
    }
    
    // Filter products using word boundaries to reduce false positives
    const catRegex = new RegExp(`\\b${lowerCat}\\b`, 'i');
    formattedProducts = formattedProducts.filter(p => 
      catRegex.test(p.title) || catRegex.test(p.slug)
    );
  }

  return (
    <div className="w-full">
      {currentEditorial ? (
        <CategoryEditorial data={currentEditorial} />
      ) : (
        <div className="px-6 md:px-10 pb-24 pt-32">
          <div className="mb-24 md:w-2/3">
            <h1 className="font-serif text-6xl md:text-8xl tracking-tighter mb-8 text-umber">
              The Archive.
            </h1>
            <p className="font-sans text-umber/60 max-w-xl text-lg leading-relaxed">
              Explore our curated selection of high-end textiles. Filter by weight, weave, and drape to find the exact foundation for your next collection.
            </p>
          </div>
        </div>
      )}

      <div className="px-6 md:px-10 pb-24 mt-12">
        <CatalogClient initialProducts={formattedProducts} />
      </div>
    </div>
  );
}
