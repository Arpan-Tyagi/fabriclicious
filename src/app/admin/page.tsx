import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch orders for metrics calculation
  const { data: orders } = await supabase.from("orders").select("*, order_items(*)");
  const { data: rolls } = await supabase.from("inventory_rolls").select("*, product_variants(title)");

  const totalRevenue = orders?.reduce((acc: number, order: any) => acc + (parseFloat(order.total_amount) || 0), 0) || 0;
  const pendingOrdersCount = orders?.filter((order: any) => order.status === "pending" || order.status === "cut_in_progress").length || 0;
  
  // Calculate total meters cut today
  const todayStr = new Date().toISOString().split("T")[0];
  const metersCutToday = orders?.reduce((acc: number, order: any) => {
    const isToday = order.created_at?.startsWith(todayStr);
    if (!isToday) return acc;
    const orderMeters = order.order_items?.reduce((itemAcc: number, item: any) => itemAcc + (parseFloat(item.length_meters) || 0), 0) || 0;
    return acc + orderMeters;
  }, 0) || 0;

  // Filter low-bolt remnant warnings
  const remnantWarnings = rolls?.filter((roll: any) => roll.status === "remnant_discounted" || (roll.available_meters <= 1.0 && roll.status === "in_stock")) || [];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-hemp pb-6">
        <div>
          <h1 className="font-serif text-4xl text-umber tracking-tight">Atelier Command Center</h1>
          <p className="font-mono text-xs uppercase tracking-widest text-umber/60 mt-1">
            Real-time Metrics & Inventory Roll Intelligence
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/products/new" className="px-5 py-2.5 bg-umber text-linen rounded-full text-xs font-mono uppercase tracking-wider hover:bg-loam transition-colors">
            + New Product
          </Link>
          <Link href="/admin/blogs/new" className="px-5 py-2.5 border border-hemp text-umber rounded-full text-xs font-mono uppercase tracking-wider hover:border-umber transition-colors">
            + Write Article
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-hemp/60 pb-3 text-xs font-mono uppercase tracking-wider overflow-x-auto">
        <Link href="/admin" className="px-4 py-2 bg-umber text-linen rounded-full">
          Overview Metrics
        </Link>
        <Link href="/admin/orders" className="px-4 py-2 text-umber/70 hover:text-umber hover:bg-limestone rounded-full transition-colors">
          Cut Queue
        </Link>
        <Link href="/admin/blogs" className="px-4 py-2 text-umber/70 hover:text-umber hover:bg-limestone rounded-full transition-colors">
          Editorial Studio
        </Link>
        <Link href="/admin/discounts" className="px-4 py-2 text-umber/70 hover:text-umber hover:bg-limestone rounded-full transition-colors">
          Discount & Trade Engine
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-limestone border border-hemp rounded-2xl space-y-2">
          <p className="font-mono text-xs uppercase tracking-wider text-umber/60">Gross Revenue</p>
          <p className="font-serif text-3xl font-medium text-umber">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-loam font-mono">+12.4% vs last cycle</p>
        </div>

        <div className="p-6 bg-limestone border border-hemp rounded-2xl space-y-2">
          <p className="font-mono text-xs uppercase tracking-wider text-umber/60">Meterage Cut Today</p>
          <p className="font-serif text-3xl font-medium text-umber">{metersCutToday.toFixed(1)} m</p>
          <p className="text-xs text-umber/60 font-mono">Continuous cuts on table</p>
        </div>

        <div className="p-6 bg-limestone border border-hemp rounded-2xl space-y-2">
          <p className="font-mono text-xs uppercase tracking-wider text-umber/60">Pending Fulfillment Queue</p>
          <p className="font-serif text-3xl font-medium text-umber">{pendingOrdersCount} Orders</p>
          <p className="text-xs text-bark font-mono">Requires physical roll allocation</p>
        </div>

        <div className="p-6 bg-limestone border border-hemp rounded-2xl space-y-2">
          <p className="font-mono text-xs uppercase tracking-wider text-umber/60">Low-Bolt Remnants</p>
          <p className="font-serif text-3xl font-medium text-umber">{remnantWarnings.length} Bolts</p>
          <p className="text-xs text-bark font-mono">Under 1.0m threshold</p>
        </div>
      </div>

      {/* Low-Bolt Remnant Warning Ledger */}
      <div className="bg-limestone border border-hemp rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-umber">Low-Bolt Remnant Warning Ledger</h2>
          <span className="font-mono text-xs px-3 py-1 bg-loam/10 text-loam rounded-full uppercase border border-loam/30">
            Auto-Remnant Discount Active
          </span>
        </div>

        <div className="divide-y divide-hemp/60">
          {remnantWarnings.map((roll: any) => (
            <div key={roll.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-medium text-umber">{roll.product_variants?.title || "Fabric Variant"}</p>
                <p className="font-mono text-xs text-umber/60">Roll Code: {roll.roll_code}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-linen bg-laurel px-3 py-1 rounded-full border border-hemp">
                  {roll.available_meters}m remaining
                </span>
                <Link href="/admin/discounts" className="text-xs font-mono uppercase text-loam underline hover:text-umber">
                  Manage Remnant Rate
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
