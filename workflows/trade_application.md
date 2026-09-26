# Workflow: Atelier Trade Upgrades

## Trigger
- **Event**: A registered customer applies for Trade status (via email or a future form), or the Admin identifies a high-volume buyer.

## Loop Execution
1. **Role Mutation**: The Admin navigates to the User Management section of the Dashboard, finds the customer's profile, and changes their `role` from `customer` to `atelier_trade`.
2. **Pricing Application**:
   - When the `atelier_trade` user logs in and adds items to their cart, a Server Action or RLS policy automatically identifies their role.
   - The checkout loop applies a global 20% trade discount to all continuous yardage cuts (swatches are excluded from trade discounts to prevent abuse of the fixed $4.00 fee).

## Checkpoint (Admin)
- **Review**: Admin reviews the customer's credentials (e.g., business license, portfolio) outside the system or via email.
- **Action**: Admin manually executes the role upgrade in the Dashboard.
