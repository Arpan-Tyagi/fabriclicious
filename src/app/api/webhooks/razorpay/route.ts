import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/env";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

const supabaseAdmin = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const orderId = payment.notes?.orderId;
      
      if (!orderId) {
        return NextResponse.json({ error: "Order ID missing in notes" }, { status: 400 });
      }

      // Start transaction via RPC to deduct inventory safely
      const { error: deductionError } = await supabaseAdmin.rpc("deduct_inventory_for_order", {
        p_order_id: orderId
      });

      if (deductionError) {
        // RACE CONDITION FIRED: Trigger Refund!
        await razorpay.payments.refund(payment.id, {
          amount: payment.amount,
          speed: "optimum"
        });

        console.error("Inventory Race Condition: Refunded payment", payment.id);
        
        await supabaseAdmin
          .from("orders")
          .update({ status: "refunded" })
          .eq("id", orderId);
          
        // Dispatch Apology Email via Resend
        if (env.RESEND_API_KEY) {
          const { Resend } = await import("resend");
          const resend = new Resend(env.RESEND_API_KEY);
          await resend.emails.send({
            from: "atelier@fabriclicious.com",
            to: payment.email || "patron@fabriclicious.com",
            subject: "Fabriclicious - Inventory Constraint (Refund Issued)",
            html: "<p>We sincerely apologize, but the requested yardage was secured by another atelier immediately prior to your transaction completing. A full refund has been initiated.</p>"
          });
        }

        return NextResponse.json({ status: "refunded_due_to_inventory" });
      }

      // Success: Mark order as processing
      await supabaseAdmin
        .from("orders")
        .update({ status: "processing" })
        .eq("id", orderId);

      // Dispatch Confirmation via Resend
      if (env.RESEND_API_KEY) {
        const { Resend } = await import("resend");
        const resend = new Resend(env.RESEND_API_KEY);
        await resend.emails.send({
          from: "atelier@fabriclicious.com",
          to: payment.email || "patron@fabriclicious.com",
          subject: `Fabriclicious - Order Confirmation ${orderId}`,
          html: "<p>Your fabric cut is now on the cutting table. You will receive dispatch details shortly.</p>"
        });
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
