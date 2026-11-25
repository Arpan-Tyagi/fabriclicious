export const metadata = {
  title: "Privacy Policy | Fabriclicious",
  description: "Data handling, client confidentiality, and customer account privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-linen py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4 border-b border-hemp pb-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-loam">
            Client Confidentiality &amp; Privacy
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-umber tracking-tight">
            Privacy Policy
          </h1>
          <p className="font-sans text-sm text-umber/70 leading-relaxed">
            At Fabriclicious (a venture of Mithila Enterprises), we hold our clients&apos; bespoke commissions and pattern selections in strictest confidence.
          </p>
        </header>

        <section className="space-y-8 font-sans text-sm text-umber/80 leading-relaxed">
          <div className="border border-hemp rounded-2xl p-8 bg-limestone space-y-4">
            <h2 className="font-serif text-2xl text-umber">1. Information Collection</h2>
            <p>
              We collect information strictly necessary to fulfill your textile orders, swatch packages, and payment processing. We do not sell, rent, or monetize client data under any circumstances.
            </p>
          </div>

          <div className="border border-hemp rounded-2xl p-8 bg-limestone space-y-4">
            <h2 className="font-serif text-2xl text-umber">2. Payment Security</h2>
            <p>
              All online transactions are encrypted via PCI-DSS Level 1 certified gateways (Razorpay / Stripe). Financial details are processed through encrypted tokenization and are never stored on our servers.
            </p>
          </div>

          <div className="border border-hemp rounded-2xl p-8 bg-limestone space-y-4">
            <h2 className="font-serif text-2xl text-umber">3. Newsletter &amp; Rare Surplus Drops</h2>
            <p>
              Subscribing to &quot;Join Our Newsletter&quot; provides early access to rare fabric arrivals. You may unsubscribe at any time with a single click.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
