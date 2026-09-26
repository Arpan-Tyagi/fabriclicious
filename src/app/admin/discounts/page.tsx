import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function DiscountsPage() {
  const supabase = await createClient();

  // Try fetching discounts or provide default mock ledger
  const { data: discounts } = await supabase.from("discounts").select("*");

  const activeDiscounts = discounts || [];
  const tradeAccounts: any[] = [];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-hemp pb-6">
        <div>
          <h1 className="font-serif text-4xl text-umber tracking-tight">Discount & Trade Engine</h1>
          <p className="font-mono text-xs uppercase tracking-widest text-umber/60 mt-1">
            Promotions, Remnant Automations & Trade Atelier Accounts
          </p>
        </div>
        <button className="px-5 py-2.5 bg-umber text-linen rounded-full text-xs font-mono uppercase tracking-wider hover:bg-loam transition-colors">
          + Create Promotion
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-hemp/60 pb-3 text-xs font-mono uppercase tracking-wider overflow-x-auto">
        <Link href="/admin" className="px-4 py-2 text-umber/70 hover:text-umber hover:bg-limestone rounded-full transition-colors">
          Overview Metrics
        </Link>
        <Link href="/admin/orders" className="px-4 py-2 text-umber/70 hover:text-umber hover:bg-limestone rounded-full transition-colors">
          Cut Queue
        </Link>
        <Link href="/admin/blogs" className="px-4 py-2 text-umber/70 hover:text-umber hover:bg-limestone rounded-full transition-colors">
          Editorial Studio
        </Link>
        <Link href="/admin/discounts" className="px-4 py-2 bg-umber text-linen rounded-full">
          Discount & Trade Engine
        </Link>
      </div>

      {/* Active Promotion Codes */}
      <div className="bg-limestone border border-hemp rounded-2xl p-6 space-y-4">
        <h2 className="font-serif text-2xl text-umber">Active Coupon Codes</h2>
        <div className="divide-y divide-hemp/60">
          {activeDiscounts.map((disc: any) => (
            <div key={disc.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-umber tracking-wider text-base bg-linen px-3 py-1 rounded-md border border-hemp">
                    {disc.code}
                  </span>
                  <span className="text-xs font-mono text-loam uppercase">
                    {disc.type === "percentage" ? `${disc.value}% OFF` : `₹${disc.value} FLAT CREDIT`}
                  </span>
                </div>
                <p className="text-xs text-umber/60 mt-1">{disc.target}</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-umber/70">{disc.usage_count} uses</span>
                <span className={`px-2.5 py-1 rounded-full ${disc.is_active ? "bg-laurel text-linen" : "bg-limestone text-umber"}`}>
                  {disc.is_active ? "Active" : "Disabled"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trade Atelier Accounts */}
      <div className="bg-limestone border border-hemp rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-umber">Trade Atelier Wholesale Ledger</h2>
          <span className="font-mono text-xs text-loam uppercase">B2B Trade Accounts</span>
        </div>
        <div className="divide-y divide-hemp/60">
          {tradeAccounts.map((account) => (
            <div key={account.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-medium text-umber">{account.name}</p>
                <p className="font-mono text-xs text-umber/60">{account.email}</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-loam font-medium">{account.discount_tier}</span>
                <span className={`px-2.5 py-1 rounded-full ${account.verified ? "bg-laurel text-linen" : "bg-limestone text-umber"}`}>
                  {account.verified ? "Verified Trade" : "Pending Verification"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
