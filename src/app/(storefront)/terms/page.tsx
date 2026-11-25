export const metadata = {
  title: "Terms of Service | Fabriclicious",
  description: "Terms governing custom textile fractional cuts, orders, and commercial usage.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-linen py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4 border-b border-hemp pb-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-loam">
            Legal Terms &amp; Conditions
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-umber tracking-tight">
            Terms of Service
          </h1>
          <p className="font-sans text-sm text-umber/70 leading-relaxed">
            Fabriclicious is a digital fabric store and brand operated as a venture of Mithila Enterprises. By accessing our services, you agree to these bespoke terms.
          </p>
        </header>

        <section className="space-y-8 font-sans text-sm text-umber/80 leading-relaxed">
          <div className="border border-hemp rounded-2xl p-8 bg-limestone space-y-4">
            <h2 className="font-serif text-2xl text-umber">1. Fractional Continuous Cutting</h2>
            <p>
              Fabric lengths are measured and cut by hand using professional calibrated cutting tables. A cutting variance of &plusmn;1.5% is recognized within industry standards. Continuous cuts are guaranteed unbroken across single lengths up to whole bolt capacities.
            </p>
          </div>

          <div className="border border-hemp rounded-2xl p-8 bg-limestone space-y-4">
            <h2 className="font-serif text-2xl text-umber">2. Commercial &amp; Designer Allocations</h2>
            <p>
              Designers, couturiers, and fashion houses utilizing our textiles for runway collections or client commissions retain full copyright over their garment silhouettes. Mill trademarks and provenance certification are available upon request for accredited design houses.
            </p>
          </div>

          <div className="border border-hemp rounded-2xl p-8 bg-limestone space-y-4">
            <h2 className="font-serif text-2xl text-umber">3. Contact Information</h2>
            <p>
              For legal inquiries and bulk fabric orders, please contact Mithila Enterprises / Fabriclicious via our customer support.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
