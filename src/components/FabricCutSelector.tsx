"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { MagneticButton } from "@/components/MagneticButton";
import { CursorTarget } from "@/components/CursorTarget";

export function FabricCutSelector({ product, variant }: { product: any, variant: any }) {
  const [length, setLength] = useState(product.minimum_cut);
  const addItem = useCartStore(state => state.addItem);
  const items = useCartStore(state => state.items);
  const isSwatchDrawerFull = useCartStore(state => state.isSwatchDrawerFull);

  const yardageInCart = items
    .filter(item => item.variantId === variant.id && !item.isSwatch)
    .reduce((sum, item) => sum + (item.lengthMeters || 0), 0);

  const totalMetersAvailable = variant.total_meters_available || 0;
  const remainingMetersAvailable = Math.max(0, totalMetersAvailable - yardageInCart);
  const maxSelectable = Math.min(remainingMetersAvailable, 50.0);
  const calculatedYardagePrice = Math.round((length * product.base_price_per_meter) * 100) / 100;

  const updateLength = (newLength: number) => {
    const clamped = Math.max(product.minimum_cut, Math.min(newLength, maxSelectable));
    setLength(Math.round(clamped * 10) / 10);
  };

  const handleAddYardage = async () => {
    await addItem({
      id: crypto.randomUUID(),
      variantId: variant.id,
      title: product.title,
      colorName: variant.color_name,
      isSwatch: false,
      lengthMeters: length,
      price: calculatedYardagePrice,
      image: variant.images?.[0] || "/placeholder-fabric.jpg"
    });
  };

  const handleAddSwatch = async () => {
    if (isSwatchDrawerFull) return;
    
    await addItem({
      id: crypto.randomUUID(),
      variantId: variant.id,
      title: product.title,
      colorName: variant.color_name,
      isSwatch: true,
      lengthMeters: null,
      price: product.swatch_price,
      image: variant.images?.[0] || "/placeholder-fabric.jpg"
    });
  };

  const exceedsStock = length > totalMetersAvailable;

  return (
    <div className="space-y-8 bg-limestone p-8 rounded-[2rem] border border-hemp shadow-sm">
      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-umber mb-1">Select Cut Length (Continuous Meters)</h3>
        <p className="font-sans text-xs text-umber/60 mb-6">
          Cut from single Bolt #SLK-042. Minimum order: 0.5m. Adjusts in 0.1m increments. Orders over 2.0m qualify for automatic swatch credit redemption.
        </p>
        <div className="flex items-center gap-6">
          <CursorTarget mode="stepper" text="-">
            <button 
              onClick={() => updateLength(length - product.cut_step)}
              className="w-12 h-12 rounded-full border border-hemp flex items-center justify-center text-umber hover:bg-linen transition-colors"
            >
              -
            </button>
          </CursorTarget>
          <div className="font-serif text-3xl min-w-24 text-center text-umber">
            {length.toFixed(1)} <span className="text-sm font-sans text-bark">m</span>
          </div>
          <CursorTarget mode="stepper" text="+">
            <button 
              onClick={() => updateLength(length + product.cut_step)}
              className="w-12 h-12 rounded-full border border-hemp flex items-center justify-center text-umber hover:bg-linen transition-colors"
            >
              +
            </button>
          </CursorTarget>
        </div>
        <CursorTarget mode="stepper" text="CUT" className="mt-6">
          <input 
            type="range"
            min={product.minimum_cut}
            max={maxSelectable}
            step={product.cut_step}
            value={length}
            onChange={(e) => updateLength(parseFloat(e.target.value))}
            className="w-full accent-umber bg-hemp rounded-lg h-2 cursor-pointer"
          />
        </CursorTarget>
        <p className="font-sans text-xs text-umber/60 mt-4 italic">
          Need cutting advice? Bias cuts require 20–30% additional yardage for diagonal pattern alignment.
        </p>
      </div>

      <div className="pt-6 border-t border-hemp flex flex-col gap-4">
        <MagneticButton strength={0.25} as="div" cursorText="ACQUIRE">
          <button 
            onClick={handleAddYardage}
            disabled={exceedsStock}
            className="luxury-button w-full flex justify-between disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{exceedsStock ? 'Exceeds Continuous Bolt Stock' : 'Acquire Cut'}</span>
            <span>₹{calculatedYardagePrice.toFixed(2)}</span>
          </button>
        </MagneticButton>
        
        {product.swatch_available && (
          <div className="space-y-2 mt-4">
            <MagneticButton strength={0.25} as="div" cursorText="SWATCH">
              <button 
                onClick={handleAddSwatch}
                disabled={isSwatchDrawerFull}
                className="w-full flex justify-between items-center px-6 py-3.5 rounded-full border border-hemp bg-linen font-medium text-umber hover:bg-loam hover:text-linen transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative"
              >
                <span>Order Tactile Specimen (10x10 cm)</span>
                <span>₹{product.swatch_price.toFixed(2)}</span>
                
                {isSwatchDrawerFull && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-umber text-linen text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Swatch bundle limit reached (5/5)
                  </span>
                )}
              </button>
            </MagneticButton>
            <p className="font-sans text-[10px] text-umber/50 text-center leading-tight mt-2 px-4">
              Cut with pinking shears to preserve selvage integrity. Delivered in an archival protective folder with printed sewing recommendations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
