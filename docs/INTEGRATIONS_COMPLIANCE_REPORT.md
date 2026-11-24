# Integrations & Statutory Compliance Report

**Platform:** Fabriclicious Digital Platform  
**Date:** 2026-11-24  
**Audit Standard:** Indian Statutory & Commercial Integration Specification (Step 4 Audit)  
**Harness:** Antigravity 2.0 / Gemini 3.8 / `/indian-gst-crm-audit`  

---

## 1. Razorpay Payments, Webhooks & Refund State Machine

- **HMAC-SHA256 Signature Verification:** Verified using `crypto.timingSafeEqual` in `src/app/api/webhooks/razorpay/route.ts` over the raw unparsed body. Tampered bodies and forged signatures rejected with 400.
- **Webhook Idempotency & Deduplication:** Backed by `public.webhook_events` keyed on `x-razorpay-event-id`. Replayed events immediately return `{ status: "already_processed" }` with HTTP 200, preventing duplicate order records or stock double-deductions.
- **Server-Side Price Recomputation:** Cart totals are strictly recalculated server-side; client manipulation to ₹1 is rejected.
- **Inventory Concurrency Rollback:** If continuous bolt yardage is exhausted prior to webhook confirmation, the route automatically executes an atomic Razorpay refund and marks the order `refunded`.

---

## 2. Indian GST 2.0 Textile Tax Engine & CGST Rule 46

- **Tax Engine Implementation:** `src/lib/services/gstInvoice.ts`.
- **Statutory Rate Alignment (GST 2.0 - Sept 22, 2025):**
  - Unstitched woven and knitted fabrics (HSN 5007 Silk, 5208 Cotton, 5407 Synthetic): **Flat 5% GST** regardless of value.
  - Stitched apparel (Chapters 61–62): 5% up to ₹2,500; **18% cliff** on full value above ₹2,500.
- **Place of Supply Logic:**
  - Intra-state (`supplier_state_code === delivery_state_code`): 2.5% CGST + 2.5% SGST.
  - Inter-state (`supplier_state_code !== delivery_state_code`): 5.0% IGST.
- **CGST Rule 46 Compliance:**
  - "TAX INVOICE" header, Supplier & Buyer GSTIN, delivery address, Place of Supply code.
  - Consecutive FY invoice serial number $\le$16 characters: `FAB/26-27/000142` (15 chars).
  - HSN code, UQC (`MTR`), quantity, taxable value, tax split, Reverse Charge: "N".

---

## 3. Dual-Channel OTP, TRAI DLT & Transactional Email

- **OTP Parameters:** 6 digits CSPRNG, hashed storage, 10-minute TTL, single-use, max 5 verification attempts without reset on resend.
- **WhatsApp Cloud API:** Authentication Template category (no marketing/emojis/links).
- **TRAI DLT SMS Fallback:** Bound to PE ID `1701159823450987654` and Header `FABRIC`. Uses typed pre-tags `{#numeric#}` and `{#alphanumeric#}`. Documented in `docs/DLT_OPS_CHECKLIST.md`.
- **Email Deliverability:** Isolated transactional stream (Resend), SPF configured within 10-lookup limit, 2048-bit DKIM, DMARC staging.

---

## 4. Multi-Channel Lead CRM & Ad Attribution

- **Website Contact Us:** Protected by rate-limiting and Cloudflare Turnstile token verification.
- **Meta Lead Ads:** GET challenge verified; POST `X-Hub-Signature-256` verified in constant time; async Graph API retrieval; deduplication on `leadgen_id`.
- **Google Ads Lead Forms:** Constant-time `google_key` validation; `is_test` segregation; deduplication on `lead_id`.
- **Formula Injection Defense:** All exported leads and orders sanitized using `src/lib/utils/exportSanitizer.ts` with quoted tab-prefixing (`"\t=..."`).

---

## 5. India DPDP Rules 2025 & E-Commerce Rules 2020

- **Unbundled Consent:** Independent checkboxes for Order Updates, Marketing Communications, and Third-Party Delivery.
- **Split Retention Schedule:** Tax invoices retained 6–8 years per GST Act; non-statutory interaction logs anonymized after 48-hour notice.
- **Public Disclosures:** Legal entity name, registered office address, GSTIN, and Grievance Officer contacts declared in platform footer.
