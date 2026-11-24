---
name: fabric-commerce-audit
description: Audits a luxury fabric e-commerce storefront, customer dashboard, and owner CRM against a 10-domain functional and architectural specification in Antigravity. Use when generating or verifying the master feature checklist, fabric meterage/roll/dye-lot mechanics, customer order flows, or owner CRM workflows.
---

# Fabric E-Commerce & Dual-Dashboard CRM Feature Auditor (Antigravity Edition)

Inspect the codebase to build a complete traceability matrix covering every operational requirement. For each requirement, locate the UI component, Server Action / API Route, Data Access Layer (DAL), and Database Schema using Antigravity tools (`read_file`, `run_command`, `write_file`, `edit_file`).

## Verification Domains

1. **User Identity & Auth:** Unique User ID generation (human-readable, e.g. `FAB-2026-000142`), returning-user login, password reset with expiring tokens, email/phone verification, Owner MFA.
2. **Fabric Catalog & Precision Ordering:** 0.5m fractional cut selector, single-bolt continuous cut enforcement, roll/dye-lot/shade assignment, remnant lifecycle auto-creation, digital swatch library, swatch recovery credit ledger.
3. **Order Immutability & Logging:** Complete frozen snapshot of buyer ID, billing/shipping address with state code, buyer GSTIN, SKU, title, colour, dye lot, cut length (`UQC: MTR`), HSN code, GST split, and coupon terms.
4. **Customer Dashboard:** Order management, live tracking timeline (AWB), Pre-Cut self-service cancellation vs. Post-Cut cancellation request queue, GST Tax Invoice PDF download, DPDP privacy controls.
5. **Owner CRM Dashboard:** Roll-level inventory (available/reserved/committed), order fulfillment cut-sheet view, cancellation approval/rejection queue, revenue & GST analytics, catalog CMS (with soft-archive), discount coupon engine.
6. **Multi-Channel Lead CRM:** Unified inbox for Contact Us, Meta Lead Ads, and Google Ads leads; deduplication on `leadgen_id`/`lead_id`; status pipeline; formula-injection-safe export.
7. **Performance & UX Standards:** Sub-second mobile LCP (<0.8s), 0.00 CLS, 0ms TBT, WCAG 2.1/2.2 AA compliance, tabular-nums for financial/meterage displays.

## Antigravity Execution Guidelines
- Use `run_command` with PowerShell or cross-platform Node/Python to search across `src/` and `supabase/migrations/`.
- Use `read_file` to inspect candidate components and verify implementation depth.
- If deep codebase exploration is required without cluttering the main context, invoke an Antigravity research subagent (`invoke_subagent` with `TypeName: "research"`).

## Output Standard
Write findings to `docs/PRODUCTION_CHECKLIST.md` with:
- Executive Summary (% complete per domain, count of blockers).
- Full Traceability Table (`ID`, `Requirement`, `Status`, `UI File`, `Server/DAL File`, `DB Migration`, `Gap & Remediation`).
- Top-10 Engineering Fix Queue.
