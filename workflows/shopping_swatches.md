# Workflow: Shopping & Swatch Drawer

## Trigger
- **Event**: User clicks "Acquire Cut" or "Request Swatch" on the `FabricCutSelector` UI component.

## Loop Execution
1. **Local State Mutation**: 
   - Item is pushed to the global Zustand cart state.
   - If user is authenticated, a background sync pushes the delta to the Supabase `carts` table.
2. **Swatch Constraint Check**: 
   - The Zustand store calculates the total number of swatch items currently in the cart.
   - If `swatch_count >= 5`, a global state boolean `isSwatchDrawerFull` is set to `true`.
   - The `FabricCutSelector` observes this state and immediately disables the "Request Swatch" mode across all product pages, showing a tooltip: "Swatch bundle limit reached (5/5)".
3. **Cart Recalculation**: 
   - Total calculation equals `SUM(fractional_meters * base_price) + (swatch_count * 4.00)`.

## Checkpoint
- No admin checkpoint. 
- **User Checkpoint**: The Swatch Drawer and Cart slide-over act as the visual brief for the user to review their selections before proceeding to the Razorpay checkout loop.
