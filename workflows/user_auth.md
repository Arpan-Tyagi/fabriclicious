# Workflow: User Authentication & Cart Sync

## Trigger
- **Event**: User attempts to checkout, or explicitly clicks "Login/Register".

## Loop Execution
1. **Authentication**: User logs in or signs up via Supabase Auth (Magic Link, Email/Password, or Google/Apple OAuth).
2. **Onboarding (If New User)**: After initial auth, if the `profiles` table lacks `first_name`, `last_name`, or `phone_number`, redirect user to an onboarding form.
3. **Cart Sync**: 
   - Upon successful login, the `carts` table in Supabase is queried.
   - Any items in the local Zustand `localStorage` are merged into the Supabase `carts` table.
   - The Zustand store shifts to pulling/pushing updates directly to the Supabase database.

## Checkpoint
- No manual admin checkpoint. The loop is autonomous.
