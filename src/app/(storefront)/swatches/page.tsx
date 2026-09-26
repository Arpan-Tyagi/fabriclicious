"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function SwatchesPage() {
  const { openCart, addItem } = useCartStore();

  const curatedSampleFabrics = [
    { id: "sw-1", title: "Belgian Flax Linen", weave: "Plain Weave", gsm: 220, category: "Linen", priceDisplay: "₹4.00", variantId: "var-linen-01", colorName: "Natural" },
    { id: "sw-2", title: "Mulberry Silk Satin", weave: "Satin Weave", gsm: 85, category: "Silk", priceDisplay: "₹4.00", variantId: "var-silk-01", colorName: "Obsidian" },
    { id: "sw-3", title: "Merino Wool Twill", weave: "Twill Weave", gsm: 340, category: "Wool", priceDisplay: "₹4.00", variantId: "var-wool-01", colorName: "Oatmeal" },
    { id: "sw-4", title: "Cotton Velvet", weave: "Pile Weave", gsm: 290, category: "Velvet", priceDisplay: "₹4.00", variantId: "var-velvet-01", colorName: "Emerald" },
    { id: "sw-5", title: "English Harris Tweed", weave: "Herringbone", gsm: 480, category: "Tweed", priceDisplay: "₹4.00", variantId: "var-tweed-01", colorName: "Charcoal" }
  ];

  const handleAddSwatch = (swatch: typeof curatedSampleFabrics[0]) => {
    addItem({
      id: `${swatch.variantId}-swatch`,
      variantId: swatch.variantId,
      title: swatch.title,
      colorName: swatch.colorName,
      isSwatch: true,
      lengthMeters: null,
      price: 4.00,
      image: "/placeholder.jpg"
    });
    openCart();
  };

  return (
    <div className="min-h-screen bg-linen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="font-serif text-5xl text-umber tracking-tight">The Tactile Archive. Touch Before You Cut.</h1>
          <p className="font-sans text-sm text-umber/70">
            Digital screens show color; your hands understand structure. Curate up to five 10&times;10 cm specimen swatches to evaluate weight, surface nap, and bias elasticity against your pattern sketches.
          </p>
        </div>

        {/* Swatch Credit Rule Banner */}
        <div className="bg-limestone border border-hemp rounded-3xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="font-mono text-xs text-loam uppercase">Step 01</span>
            <h4 className="font-serif text-xl text-umber">Curate Your Swatch Tray</h4>
            <p className="font-sans text-xs text-umber/70">Select up to five 10&times;10 cm specimen swatches for a flat nominal fee of $4.00 each.</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-xs text-loam uppercase">Step 02</span>
            <h4 className="font-serif text-xl text-umber">Inspect Under Atelier Light</h4>
            <p className="font-sans text-xs text-umber/70">Test the hand-feel, pull the grain along the bias, observe true dye color, and test drape.</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-xs text-loam uppercase">Step 03</span>
            <h4 className="font-serif text-xl text-umber">100% Investment Credit</h4>
            <p className="font-sans text-xs text-umber/70">Order 2.0 meters or more of sampled fabric, and your sampling fee is automatically deducted.</p>
          </div>
        </div>

        {/* Swatch Portfolio Box Callout */}
        <div className="bg-loam text-linen rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden text-left">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 space-y-4">
            <h3 className="font-serif text-2xl md:text-3xl text-center md:text-left">The Atelier Swatch Portfolio ($20.00)</h3>
            <ul className="space-y-3 font-sans text-sm md:text-base text-linen/90 max-w-2xl mt-4 list-disc list-inside">
              <li>Five generous 10&times;10 cm swatches cut along the grainline.</li>
              <li>Specimen Cards detailing GSM, weave type, needle pairing, and shrinkage rates.</li>
              <li>A unique, personalized $20.00 credit code automatically applied to your next continuous fabric purchase over 2.0 meters.</li>
            </ul>
          </div>
        </div>

        {/* Curated Swatch Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-end border-b border-hemp pb-4">
            <h2 className="font-serif text-3xl text-umber">Featured Atelier Swatches</h2>
            <Link href="/fabrics" className="font-mono text-xs uppercase text-loam underline hover:text-umber">
              View Full Archive →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {curatedSampleFabrics.map((swatch) => (
              <div key={swatch.id} className="bg-limestone border border-hemp rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] uppercase text-umber/60 px-2.5 py-1 bg-linen rounded-full border border-hemp">
                      {swatch.category}
                    </span>
                    <span className="font-mono text-xs text-loam font-medium">{swatch.priceDisplay}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-umber mt-3">{swatch.title}</h3>
                  <p className="font-mono text-xs text-umber/60 mt-1">{swatch.weave} • {swatch.gsm} GSM</p>
                </div>

                <div className="pt-4 border-t border-hemp/60 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-umber/70">In Stock</span>
                  <button
                    onClick={() => handleAddSwatch(swatch)}
                    className="px-4 py-2 bg-umber text-linen rounded-full text-xs font-mono uppercase hover:bg-loam transition-colors"
                  >
                    + Request Sample
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Trigger Section */}
        <div className="bg-limestone border border-hemp rounded-3xl p-8 text-center space-y-4">
          <h3 className="font-serif text-2xl text-umber">Ready to Review Your Swatch Tray?</h3>
          <p className="font-sans text-xs text-umber/70 max-w-md mx-auto">
            Manage active sample selections in your slide-over studio tray at any time during browsing.
          </p>
          <div className="pt-2">
            <button
              onClick={openCart}
              className="px-6 py-3 bg-umber text-linen rounded-full text-xs font-mono uppercase tracking-wider hover:bg-loam transition-colors"
            >
              Open Swatch & Cart Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
