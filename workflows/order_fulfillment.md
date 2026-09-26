# Workflow: Order Fulfillment

## Trigger
- **Event**: Razorpay successful payment webhook (`payment.captured` or `order.paid`).

## Loop Execution
1. **Webhook Reception**: Next.js route handler receives Razorpay webhook. Basic payload validation.
2. **Inventory Deduction**: Deduct exact fractional meters and swatch counts from `product_variants.total_meters_available` in Supabase.
3. **Order Status Mutation**: Update `orders.status` to `processing`.
4. **Omnichannel Dispatch**: Trigger `OmnichannelDispatcher` to send Order Confirmation via Resend (email) and WhatsApp.

## Checkpoints
- **Admin Review**: Admin sees the order in the 'pending cuts queue' on the Dashboard.
- **Action**: Admin manually changes status to `cut_in_progress` -> Dispatches WhatsApp notification.
- **Action**: Admin manually adds tracking number and changes status to `dispatched` -> Dispatches Email & WhatsApp.
