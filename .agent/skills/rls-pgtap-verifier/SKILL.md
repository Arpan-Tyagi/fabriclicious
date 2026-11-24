---
name: rls-pgtap-verifier
description: Audits Supabase PostgreSQL Row Level Security policies, table grants, SECURITY DEFINER views/functions, RBAC JWT hooks, and Storage bucket policies in Antigravity, then writes and runs automated pgTAP SQL proof tests. Use when verifying database isolation, preventing cross-user data leaks, or auditing Supabase security.
---

# Supabase RLS, Grants & pgTAP Automated Proof Verifier (Antigravity Edition)

## Step 1: Static Schema & Migration Inventory
1. Scan `supabase/migrations/` for all tables in `public` using `read_file` or `run_command`. Confirm 100% have `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`.
2. Verify explicit `REVOKE ALL ON TABLE ... FROM anon, authenticated;` (especially `TRUNCATE`) before selective `GRANT SELECT, INSERT, UPDATE, DELETE`.
3. Verify all views have `WITH (security_invoker = on)`.
4. Verify all `SECURITY DEFINER` functions include `SET search_path = ''`.
5. Verify admin role checks read `public.user_roles` via `custom_access_token_hook` (never client-editable `user_metadata`).
6. Verify private storage bucket policies on `storage.objects` for invoice PDFs and exports.

## Step 2: Generate & Execute pgTAP Proofs
Write SQL proof tests in `supabase/tests/database_security_proof.sql` using pgTAP:
- Run assertions under 4 distinct roles: `anon`, `customer_a`, `customer_b`, and `owner_admin`.
- Invariant 1: `customer_b` reading `customer_a`'s orders or invoices returns 0 rows.
- Invariant 2: `anon` attempting `TRUNCATE`, `INSERT`, `UPDATE`, or `DELETE` on orders/inventory throws permission denied.
- Invariant 3: `customer_a` attempting to update `role` or `user_roles` throws permission denied.
- Invariant 4: `owner_admin` can read and manage all records.

## Step 3: Run Live Linter & Test Suite
Execute `run_command` with `npx supabase test db` and `npx supabase db advisors` locally (or run SQL verification scripts). Save the raw output and proof scorecard to `docs/RLS_PGTAP_PROOF.md`.

## Antigravity Adaptation Note
In Antigravity, when isolated context is required for database verification, delegate to an Antigravity subagent via `invoke_subagent` (`TypeName: "self"` or `"research"`).
