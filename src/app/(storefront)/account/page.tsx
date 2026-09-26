import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function AccountPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  const { data: orders } = await supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false });
  const { data: credits } = await supabase.from("swatch_credits").select("*");

  const activeOrders = orders || [];
  const activeCredits = credits || [];

  const activeCreditTotal = activeCredits.filter((c: any) => !c.is_redeemed).reduce((acc: number, c: any) => acc + (parseFloat(c.credit_amount) || 4.00), 0);

  return (
    <div className="min-h-screen bg-linen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Banner */}
        <div className="bg-limestone border border-hemp rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-loam">Atelier Patron Portal</span>
            <h1 className="font-serif text-4xl text-umber tracking-tight mt-1">
              {user?.email ? user.email.split("@")[0] : "Haute Couture Member"}
            </h1>
            <p className="font-sans text-sm text-umber/70 mt-1">
              {user?.email || "patron@fabriclicious.com"} • Fabriclicious Client Access
            </p>
          </div>

          <div className="flex items-center gap-4 bg-linen p-4 rounded-2xl border border-hemp">
            <div>
              <p className="font-mono text-xs text-umber/60 uppercase">Active Swatch Credit</p>
              <p className="font-serif text-2xl text-umber font-medium">₹{activeCreditTotal.toFixed(2)}</p>
            </div>
            <span className="font-mono text-xs text-loam bg-loam/10 px-3 py-1 rounded-full border border-loam/30">
              Redeemable
            </span>
          </div>
        </div>

        {/* Swatch Credit Ledger Explanation */}
        <div className="bg-limestone border border-hemp rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-serif text-xl text-umber">Swatch-to-Yardage Credit Ledger</h3>
            <p className="font-sans text-xs text-umber/70 max-w-xl">
              Every swatch sample acquired (₹4.00 value) automatically converts into a direct credit redeemable against future unbroken bolt cuts of that fabric.
            </p>
          </div>
          <Link href="/fabrics" className="px-5 py-2.5 bg-umber text-linen rounded-full text-xs font-mono uppercase tracking-wider hover:bg-loam transition-colors text-center shrink-0">
            Browse Archive
          </Link>
        </div>

        {/* Order History & Live Status Tracker */}
        <div className="space-y-6">
          <h2 className="font-serif text-3xl text-umber">Order History & Cutting Timeline</h2>
          <div className="space-y-4">
            {activeOrders.map((order: any) => (
              <div key={order.id} className="bg-limestone border border-hemp rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hemp/60 pb-4">
                  <div>
                    <span className="font-mono text-xs text-loam uppercase">{order.order_number}</span>
                    <p className="font-serif text-lg text-umber">Total: ₹{parseFloat(order.total_amount).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono px-3 py-1 rounded-full uppercase ${
                      order.status === "dispatched" ? "bg-emerald-100 text-emerald-800" :
                      order.status === "cut_in_progress" ? "bg-amber-100 text-amber-800" :
                      "bg-zinc-100 text-zinc-800"
                    }`}>
                      {order.status === "cut_in_progress" ? "Bolt On Cutting Table" : order.status}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.order_items?.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center text-sm font-sans text-umber/80">
                      <span>{item.title}</span>
                      <span className="font-mono text-xs text-umber/60">
                        {item.is_swatch ? "Swatch Sample (₹4.00)" : `${item.length_meters}m continuous cut`}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Status Timeline Progress Bar */}
                <div className="pt-2 border-t border-hemp/40">
                  <p className="font-mono text-[10px] uppercase text-umber/50 mb-2">Fulfillment Pipeline</p>
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
                    <div className={`p-2 rounded-lg border ${order.status === "pending" || order.status === "cut_in_progress" || order.status === "dispatched" ? "bg-loam/20 text-umber border-loam" : "bg-linen text-umber/40 border-hemp"}`}>
                      1. Pending Order
                    </div>
                    <div className={`p-2 rounded-lg border ${order.status === "cut_in_progress" || order.status === "dispatched" ? "bg-loam/20 text-umber border-loam" : "bg-linen text-umber/40 border-hemp"}`}>
                      2. Cut in Progress
                    </div>
                    <div className={`p-2 rounded-lg border ${order.status === "dispatched" ? "bg-loam/20 text-umber border-loam" : "bg-linen text-umber/40 border-hemp"}`}>
                      3. Dispatched
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
