export const metadata = {
  title: "Return Policy & Atelier Cut Integrity",
  description: "Inspection protocols, swatch evaluations, and custom-cut returns policy.",
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-linen py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4 border-b border-hemp pb-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-loam">
            Quality Assurance &amp; Integrity
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-umber tracking-tight">
            Return &amp; Replacement Policy
          </h1>
          <p className="font-sans text-sm text-umber/70 leading-relaxed">
            Because natural textiles are custom cut to the exact centimeter per bespoke order, standard returns differ from off-the-rack garments. We hold our textiles to rigorous artisanal inspection standards.
          </p>
        </header>

        <section className="space-y-8 font-sans text-sm text-umber/80 leading-relaxed">
          <div className="border border-hemp rounded-2xl p-8 bg-limestone space-y-4">
            <h2 className="font-serif text-2xl text-umber">The 14-Day Defect Guarantee</h2>
            <p>
              If your fabric arrives with a structural flaw, warp imperfection, or dye variation exceeding historical artisan tolerances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Notify our atelier within <strong>14 days of delivery</strong> with photos of the uncut length.</li>
              <li>We will arrange a complimentary courier pickup and issue an immediate replacement or full refund.</li>
              <li>Fabrics must remain uncut, unwashed, and unpressed to qualify for full return credit.</li>
            </ul>
          </div>

          <div className="border border-hemp rounded-2xl p-8 bg-limestone space-y-4">
            <h2 className="font-serif text-2xl text-umber">Order Swatches Before You Cut</h2>
            <p>
              Colors on digital screens can vary based on display calibration. We strongly advocate ordering 10&times;10 cm swatch sets before ordering significant yardage. 100% of your swatch fee is credited toward your continuous roll purchase.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
