# AGENTS.md — Luxury Fabric E-Commerce & Dual-Dashboard CRM Engineering Standard

## Architecture & Domain Identity
- **Stack:** Next.js (App Router, latest patched release), TypeScript (strict), Tailwind CSS, Supabase (PostgreSQL + Auth + Storage via `@supabase/ssr`), Razorpay, Shiprocket/Delhivery, WhatsApp Cloud API + TRAI DLT SMS, Resend/Postmark.
- **Domain:** Premium D2C & B2B fabric e-commerce featuring fractional meterage (0.5m increments), single-bolt continuous yardage, roll/dye-lot/shade continuity, remnant lifecycle tracking, and a swatch-recovery credit ledger.
- **Dual Command Surfaces:**
  1. Customer Dashboard: Profile with unique human-readable User ID (e.g. `FAB-2026-000142`), orders, live tracking, cut-boundary cancellations, GST PDF invoices, swatch credit, DPDP privacy controls.
  2. Owner CRM Dashboard: Roll inventory, catalog CMS with soft-archiving, orders/refunds, GST & net revenue analytics, multi-channel lead CRM (Contact Us, Meta Lead Ads, Google Ads).

## Non-Negotiable Security Invariants
1. **Server-Side Data Access Layer (DAL):**
   - 100% of data reads and writes MUST pass through an `import 'server-only'` DAL that re-verifies session validity and database role inside every Server Component, Server Action, and Route Handler.
   - Zero reliance on Next.js middleware for authorization (mitigating CVE-2025-29927 / CVE-2026-64642).
   - Zero `NEXT_PUBLIC_` prefixes on server secrets.
2. **Supabase PostgreSQL Row Level Security (RLS):**
   - 100% of public tables must have RLS enabled.
   - Explicit `REVOKE ALL ON TABLE ... FROM anon, authenticated;` (especially `TRUNCATE`) before selective grants.
   - All views created `WITH (security_invoker = on)`.
   - All `SECURITY DEFINER` functions must include `SET search_path = ''`.
   - Admin roles derived exclusively via `custom_access_token_hook` reading `public.user_roles` (never client-editable `user_metadata`).
   - Private storage bucket policies on `storage.objects` for invoice PDFs and exports.
3. **Atomic Concurrency & Anti-TOCTOU:**
   - Single-use coupons, swatch credits, fabric meterage deductions, and refund creations MUST execute atomically using PostgreSQL `SELECT ... FOR UPDATE`, conditional `UPDATE ... WHERE remaining_meters >= $qty`, or database `UNIQUE` constraints.
4. **Indian Statutory & Financial Compliance:**
   - GST 2.0: Flat 5% GST for unstitched fabrics (Chapters 50–60), sarees, and dress materials. 5%/18% cliff at ₹2,500 for stitched apparel (Ch. 61–62).
   - Mandatory CGST Rule 46 invoice fields with sequential ≤16-character FY invoice numbering.
   - Section 34 Credit Notes for post-invoice refunds.
   - Razorpay HMAC-SHA256 signature verification over raw request body with timing-safe comparison, deduplicated via `UNIQUE(x-razorpay-event-id)`.
   - OTP: 6 digits CSPRNG, stored hashed, 5–10 min TTL, single-use, max 5 attempts lockout, Turnstile siteverify, typed TRAI DLT templates (`{#numeric#}`, `{#alphanumeric#}`).
5. **Formula Injection Sanitization:**
   - All CRM and order CSV/XLSX exports must neutralize spreadsheet formula triggers (`=`, `+`, `-`, `@`, `\t`, `\r`, `\n`) using Excel-resistant quoted tab-prefixing (`"\t=..."`) or typed XLSX string cells.

## Audit & Verification Rules
- Evidence before assertions: Never claim a requirement is satisfied without citing exact file paths, line numbers, and passing test results.
- Full output enforcement: Deliver complete code, complete files, and complete analysis without truncation or placeholder comments (`// TODO`, `// implement here`).
