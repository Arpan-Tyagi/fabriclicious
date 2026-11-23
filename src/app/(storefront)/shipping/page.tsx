export const metadata = {
  title: "Shipping & Atelier Freight Protocols",
  description: "Worldwide continuous bolt freight, temperature-controlled transit, and swatch sample delivery.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-linen py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4 border-b border-hemp pb-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-loam">
            Atelier Logistics &amp; Provenance
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-umber tracking-tight">
            Shipping &amp; Secure Freight
          </h1>
          <p className="font-sans text-sm text-umber/70 leading-relaxed">
            Every continuous cut from Fabriclicious is wrapped in breathable acid-free glassine paper, secured on rolling tubes for delicate silks and wools, and protected in moisture-resistant exterior casing.
          </p>
        </header>

        <section className="space-y-8 font-sans text-sm text-umber/80 leading-relaxed">
          <div className="border border-hemp rounded-2xl p-8 bg-limestone space-y-4">
            <h2 className="font-serif text-2xl text-umber">Swatch Sampling Delivery</h2>
            <p>
              Curated swatch sets are dispatched via priority airmail within 24 business hours. Typical transit times:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Domestic (India):</strong> 2–4 business days via Express Courier.</li>
              <li><strong>International (North America / UK / Europe / UAE):</strong> 4–7 business days via DHL Express.</li>
              <li><strong>Swatch Investment Credit:</strong> 100% of your swatch fee is automatically applied as a credit toward any subsequent continuous yardage order of 2.0m or more.</li>
            </ul>
          </div>

          <div className="border border-hemp rounded-2xl p-8 bg-limestone space-y-4">
            <h2 className="font-serif text-2xl text-umber">Continuous Yardage Orders</h2>
            <p>
              To eliminate fold creases and preserve yarn integrity, fabrics ordered over 3.0 meters are rolled on reinforced recycled kraft cores rather than folded.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dispatch Window:</strong> All cuts are hand-measured and inspected within 48 hours of order confirmation.</li>
              <li><strong>Tracking:</strong> Complete real-time tracking is provided via SMS and email with signature confirmation required upon delivery.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
