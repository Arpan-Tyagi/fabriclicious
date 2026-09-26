"use client";

import { useState, useActionState } from "react";
import { createProduct, generateProductSpecs } from "./actions";

export default function NewProductStudio() {
  const [state, formAction, isPending] = useActionState(createProduct, null);
  const [compositionFields, setCompositionFields] = useState([{ fiber: "Silk", percentage: 100 }]);
  const [specs, setSpecs] = useState<any>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAI = async () => {
    const raw = prompt("Enter raw fabric details (e.g. 'Heavy black silk satin from Italy, 200gsm, 140cm width'):");
    if (!raw) return;
    setIsGenerating(true);
    try {
      const generated = await generateProductSpecs(raw);
      setSpecs(generated);
    } catch (e) {
      alert("AI Generation failed.");
    }
    setIsGenerating(false);
  };

  const totalPct = compositionFields.reduce((acc, f) => acc + (Number(f.percentage) || 0), 0);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-serif text-4xl mb-2">Product Studio</h1>
          <p className="font-mono text-xs uppercase text-umber/60">Create a new luxury textile</p>
        </div>
        <button 
          type="button"
          onClick={handleAI}
          disabled={isGenerating}
          className="bg-loam text-umber px-6 py-2 rounded-full font-medium"
        >
          {isGenerating ? "Analyzing..." : "✨ AI Auto-Fill"}
        </button>
      </div>

      <form action={formAction} className="space-y-8 bg-limestone p-8 rounded-2xl border border-hemp shadow-sm">
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-umber/70">Title</label>
            <input name="title" defaultValue={specs.title} required className="luxury-input" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-umber/70">Slug</label>
            <input name="slug" defaultValue={specs.slug} required className="luxury-input" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-umber/70">Description</label>
          <textarea name="description" defaultValue={specs.description} required rows={4} className="luxury-input resize-none" />
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-umber/70">Price /m</label>
            <input name="price" type="number" step="0.01" required className="luxury-input" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-umber/70">GSM</label>
            <input name="gsm" type="number" defaultValue={specs.gsm} required className="luxury-input" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-umber/70">Width (cm)</label>
            <input name="width_cm" type="number" defaultValue={specs.width_cm} required className="luxury-input" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-umber/70">Drape</label>
            <select name="drape" defaultValue={specs.drape || "fluid"} className="luxury-input">
              <option value="ultra_fluid">Ultra Fluid</option>
              <option value="fluid">Fluid</option>
              <option value="moderate">Moderate</option>
              <option value="structured">Structured</option>
              <option value="rigid">Rigid</option>
            </select>
          </div>
        </div>

        {/* Dynamic Composition Array */}
        <div className="pt-6 border-t border-hemp">
          <div className="flex justify-between items-center mb-4">
            <label className="text-xs uppercase tracking-widest text-umber/70">Fiber Composition</label>
            <span className={`text-xs font-mono ${totalPct === 100 ? "text-laurel" : "text-loam"}`}>
              Total: {totalPct}%
            </span>
          </div>
          
          <div className="space-y-4">
            {compositionFields.map((field, idx) => (
              <div key={idx} className="flex gap-4">
                <select 
                  name="fiber[]" 
                  value={field.fiber}
                  onChange={e => {
                    const newF = [...compositionFields];
                    newF[idx].fiber = e.target.value;
                    setCompositionFields(newF);
                  }}
                  className="flex-1 border-b border-hemp py-2"
                >
                  <option value="Silk">Silk</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Linen">Linen</option>
                  <option value="Wool">Wool</option>
                  <option value="Cashmere">Cashmere</option>
                  <option value="Viscose">Viscose</option>
                </select>
                <input 
                  type="number" 
                  name="percentage[]" 
                  value={field.percentage}
                  onChange={e => {
                    const newF = [...compositionFields];
                    newF[idx].percentage = parseInt(e.target.value) || 0;
                    setCompositionFields(newF);
                  }}
                  className="w-32 border-b border-hemp py-2 text-right"
                />
                <button 
                  type="button" 
                  onClick={() => setCompositionFields(compositionFields.filter((_, i) => i !== idx))}
                  className="text-loam hover:text-umber font-mono text-xl px-2"
                >
                  ×
                </button>
              </div>
            ))}
            <button 
              type="button"
              onClick={() => setCompositionFields([...compositionFields, { fiber: "Silk", percentage: 0 }])}
              className="text-xs uppercase font-medium text-loam hover:text-umber"
            >
              + Add Fiber
            </button>
          </div>
        </div>

        {state?.error && <p className="text-loam text-sm font-medium">{state.error}</p>}

        <div className="flex items-center justify-between pt-8 border-t border-hemp">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="is_published" className="accent-umber w-4 h-4" />
            <span className="text-sm font-medium">Publish immediately</span>
          </label>
          <button 
            type="submit" 
            disabled={isPending || totalPct !== 100}
            className="luxury-button disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save to Database"}
          </button>
        </div>

      </form>
    </div>
  );
}
