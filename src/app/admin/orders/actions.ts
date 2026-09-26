"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { OmnichannelDispatcher } from "@/lib/services/OmnichannelDispatcher";

export async function updateOrderStatus(orderId: string, newStatus: string) {
  const supabase = await createClient();
  
  const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single();
  if (!order) throw new Error("Order not found");

  const oldStatus = order.status;

  const { error } = await supabase.from('orders').update({ status: newStatus, updated_at: new Date().toISOString() }).eq('id', orderId);
  if (error) throw new Error(error.message);

  if (oldStatus !== newStatus) {
    if (newStatus === 'cut_in_progress') {
      const { data: orderItems } = await supabase
        .from('order_items')
        .select(`quantity, length, inventory_rolls(bolt_id)`)
        .eq('order_id', orderId)
        .limit(1);

      const firstItem = orderItems?.[0];
      let boltId = "UNKNOWN";
      if (firstItem?.inventory_rolls) {
        // Handle both single object and array returned by PostgREST
        const roll: any = Array.isArray(firstItem.inventory_rolls) 
          ? firstItem.inventory_rolls[0] 
          : firstItem.inventory_rolls;
        if (roll?.bolt_id) boltId = roll.bolt_id;
      }
      const cutLength = firstItem?.length || firstItem?.quantity || "0";

      await OmnichannelDispatcher.sendWhatsAppTemplate(
        order.customer_phone,
        "fabriclicious_cut_in_progress",
        [boltId.toString(), cutLength.toString()]
      );
    } else if (newStatus === 'dispatched') {
      const trackingUrl = `https://courier.com/track/${order.tracking_number || "PENDING"}`;
      await OmnichannelDispatcher.sendWhatsAppTemplate(
        order.customer_phone,
        "fabriclicious_dispatched",
        [order.tracking_number || "PENDING", trackingUrl]
      );
      if (order.customer_email) {
        await OmnichannelDispatcher.sendEmail(
          order.customer_email,
          `Your Fabriclicious Order #${order.order_number} has been Dispatched`,
          "OrderConfirmationEmail",
          { customer_name: order.customer_name || "Customer", order_number: order.order_number?.toString() || "" }
        );
      }
    }
  }

  revalidatePath("/admin/orders");
}
