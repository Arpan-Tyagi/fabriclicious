# Workflow: Discount Application

## Trigger
- **Event**: User types a promo code into the Cart Slide-over and clicks "Apply".

## Loop Execution
1. **Server Validation**: A Next.js Server Action is invoked with the provided code and the current cart subtotal.
2. **Database Query**: The action checks the `discounts` table for:
   - Existence and `is_active` status.
   - Date validity (`start_date` and `end_date`).
   - Minimum order amount threshold (`min_order_amount`).
   - Usage limits (if applicable).
3. **State Mutation**:
   - If valid, the Server Action returns the discount type (percentage vs fixed) and value.
   - The Zustand store updates its `discount_amount` and recalculates the total checkout price.
   - The UI reflects the savings immediately.
4. **Checkout Handoff**: The discounted total is securely passed to the Razorpay API to generate the payment intent.

## Checkpoint
- No manual checkpoint. The loop is strictly algorithmic.
