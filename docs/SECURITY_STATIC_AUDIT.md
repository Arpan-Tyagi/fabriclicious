# Deep Static Security, OWASP 2025 / ASVS 5.0 & Supply-Chain Audit Report

**Date:** 2026-11-24  
**Audit Standard:** OWASP Top 10:2025, OWASP ASVS 5.0 Level 2, Next.js 2025–2026 Advisory Standard  
**Harness:** Antigravity 2.0 / Gemini 3.8  

---

## 1. Executive Summary & Threat Model

The static security analysis systematically scanned Next.js App Router route handlers, React Server Components, server actions, Supabase database schemas, environment variables, and external webhook endpoints. The primary vulnerabilities discovered and patched center on **middleware-only authorization bypasses**, **PostgreSQL RLS privilege escalation**, and **webhook timing attacks**.

---

## 2. Verified Vulnerabilities & Remediation Matrix

| Finding ID | Severity | OWASP 2025 / ASVS 5.0 ID | Verifier Quorum | File:Line | Attack Scenario | Exact Patch Summary |
| :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| **SEC-001** | **CRITICAL** | A01:2025 (Broken Access Control) / ASVS V8.2 | 3/3 Panel (Reachability, Impact, Defenses) | `src/app/admin/*` & `src/middleware.ts:45-60` | **Next.js Middleware Authorization Bypass (CVE-2025-29927 / CVE-2026-64642):** Attacker crafts requests with `x-middleware-subrequest` or proxy traversal headers, bypassing middleware route checks and accessing admin dashboards and mutations unauthenticated. | **Patched:** Built `src/lib/dal/auth.ts` (`import 'server-only'`) and enforced `requireAdmin()` directly inside all Server Components, Server Actions (`updateOrderStatus`, `createProduct`, `createBlog`), and Route Handlers. |
| **SEC-002** | **CRITICAL** | A01:2025 (Broken Access Control) / ASVS V8.3 | 3/3 Panel | `supabase/migrations/20260330_init_schema.sql:195-197` | **PostgreSQL RLS Profile Role Privilege Escalation:** Policy `Users can update their own profile` allowed authenticated users to update their own `role` column to `'admin'` via PostgREST, gaining full admin privileges across the entire database. | **Patched:** Created locked `public.user_roles` table, updated `is_admin()` to read from `user_roles`, and restricted `profiles` UPDATE policy with strict `WITH CHECK` enforcing immutable role. |
| **SEC-003** | **HIGH** | A01:2025 / ASVS V8.1 | 3/3 Panel | `supabase/migrations/20260330_init_schema.sql:179, 188` | **Unrestricted Public Order Injection:** Policies `System can create orders` and `System can create order items` with `WITH CHECK (TRUE)` permitted arbitrary anonymous inserts into orders and order items via PostgREST. | **Patched:** Replaced with authenticated session-bound policies asserting `auth.uid() = user_id`. |
| **SEC-004** | **CRITICAL** | A01:2025 / ASVS V8.1 | 3/3 Panel | `supabase/migrations/20260330_init_schema.sql:218, 225` | **Cross-Tenant Support Data Leak (Horizontal IDOR):** Permissive `FOR ALL USING (TRUE)` on `support_conversations` and `support_messages` exposed all customer support inquiries and messages to all users. | **Patched:** Replaced with strict owner-scoped isolation: `auth.uid() = user_id OR public.is_admin()`. |
| **SEC-005** | **HIGH** | A07:2025 (Identification & Auth) / ASVS V6.4 | 3/3 Panel | `src/app/api/webhooks/razorpay/route.ts:31` | **Webhook Timing Attack & Replay:** Signature comparison used plain `!==` string comparison, vulnerable to timing analysis. Missing event deduplication allowed replay attacks. | **Patched:** Implemented `crypto.timingSafeEqual` with byte-length validation and event deduplication against `public.webhook_events`. |
| **SEC-006** | **HIGH** | A03:2025 (Injection) / ASVS V5.3 | 3/3 Panel | CRM and Order Export Features | **Spreadsheet Formula Injection:** Attacker inputs benign-looking names starting with `=cmd|'/c calc'!A1` or `=HYPERLINK` into lead or order forms, executing arbitrary formulas when exported CSV is opened in Excel. | **Patched:** Built `src/lib/utils/exportSanitizer.ts` with OWASP-recommended quoted tab prefixing (`"\t=..."`). |
| **SEC-007** | **MEDIUM** | A05:2025 (Security Misconfiguration) / ASVS V14.4 | 3/3 Panel | `supabase/migrations/20260330_init_schema.sql:148-156` | **PostgreSQL Search Path Hijacking:** Functions declared without `SET search_path = ''` allow malicious users with schema creation privileges to hijack operators or functions. | **Patched:** Added explicit `SET search_path = ''` to `is_admin()`, `allocate_continuous_fabric_cut()`, and `handle_new_user()`. |
| **SEC-008** | **MEDIUM** | A05:2025 / ASVS V14.2 | 3/3 Panel | `next.config.ts:1-12` | **Missing Security Headers & Source Maps:** Production configuration omitted HSTS, X-Content-Type-Options, and X-Frame-Options headers. | **Patched:** Configured strict HTTP security headers and disabled `productionBrowserSourceMaps` in `next.config.ts`. |

---

## 3. Supply-Chain & Dependency Hygiene

- **Next.js & React Release Tracking:** Monitored against CVE-2025-29927, CVE-2025-55182 (React2Shell), and CVE-2026-64642. The implementation of the server-only DAL guarantees protection regardless of routing-layer edge vulnerabilities.
- **Client Bundle Secret Leak Audit:** Verified zero private keys or server tokens carry `NEXT_PUBLIC_` prefixes. All server credentials (`RAZORPAY_KEY_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `META_APP_SECRET`, `GEMINI_API_KEY`) remain strictly encapsulated within the server environment.
- **HTML Sanitization:** Verified all occurrences of `dangerouslySetInnerHTML` in `src/` are strictly limited to `application/ld+json` static structured data schemas.
