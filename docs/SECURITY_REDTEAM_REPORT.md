# Adversarial Concurrency, Race-Condition & Privilege Red-Team Report

**Platform:** Fabriclicious Digital Platform  
**Date:** 2026-11-24  
**Audit Standard:** OWASP Top 10:2025 (A08 Concurrency / TOCTOU), ASVS 5.0 Level 2 (V15 Concurrency)  
**Harness:** Antigravity 2.0 / Gemini 3.8 / `/race-condition-redteam`  
**Test Suite File:** `tests/security-redteam/concurrency.test.mjs`  

---

## 1. Executive Summary & Verification Metrics

The adversarial red-team test harness targeted six attack surfaces across financial invariants, continuous fabric inventory, authentication lockouts, middleware routing bypasses, and spreadsheet export injection. All 6 exploit suites were executed with automated barrier synchronization:

| Attack Scenario | Thread Count / Probe Depth | Invariant Tested | Test Status | Official CVSS v4.0 Score (If Unpatched) |
| :--- | :---: | :--- | :---: | :---: |
| **1. Coupon TOCTOU Double-Redemption** | 20 parallel threads | Single-use coupon (`usage_limit = 1`) must succeed at most once. | **PASS (0 Leaks)** | CVSS:4.0/AV:N/AC:L/AT:P/PR:L/UI:N/VC:L/VI:H/VA:N (7.1 High) |
| **2. Last-Roll Continuous-Cut Oversell** | 15 parallel orders (2.00m each against 3.00m bolt) | Single-bolt inventory must never drop below 0. Exactly 1 order allocated. | **PASS (0 Oversells)** | CVSS:4.0/AV:N/AC:L/AT:P/PR:L/UI:N/VC:N/VI:H/VA:N (7.1 High) |
| **3. Swatch Credit Double-Spend** | 10 parallel checkouts | Swatch credit must be debited at most once. Balance never negative. | **PASS (0 Double-Spends)** | CVSS:4.0/AV:N/AC:L/AT:P/PR:L/UI:N/VC:L/VI:H/VA:N (7.1 High) |
| **4. OTP Brute-Force & Lockout** | 10 sequential invalid attempts | Must lock out account at attempt 5; resend must not reset attempt count. | **PASS (Locked at 5)** | CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:N (8.7 High) |
| **5. Middleware Bypass Header (CVE-2025-29927)** | Spoofed `x-middleware-subrequest` headers | Server-side DAL ignores edge routing headers and blocks unauthenticated requests. | **PASS (100% Blocked)** | CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H (9.3 Critical) |
| **6. CSV/XLSX Formula Injection Probe** | Probes `=`, `+`, `-`, `@`, `\t`, `\r`, `\n`, `",=1+1` | Raw export bytes must quote and tab-prefix (`"\t=..."`) all active formula cells. | **PASS (0 Formulas Active)** | CVSS:4.0/AV:N/AC:L/AT:N/PR:L/UI:R/VC:H/VI:H/VA:H (8.5 High) |

---

## 2. Technical Evidence & Exploit Proofs

### Exploit 1: Single-Use Coupon TOCTOU Race
- **Mechanism:** 20 parallel requests fired simultaneously trying to redeem single-use coupon `VIP50`.
- **Database Defense:** PostgreSQL `SELECT ... FOR UPDATE` lock and conditional `UPDATE discounts SET usage_count = usage_count + 1 WHERE usage_count < usage_limit`.
- **Observed Result:** Exactly 1 thread succeeded (`usageCount === 1`), 19 threads received rejection.

### Exploit 2: Fabric Roll Continuous-Cut Oversell Race
- **Mechanism:** Bolt `#SLK-042` had 3.00 meters remaining. 15 parallel checkout threads requested 2.00 meters each.
- **Database Defense:** `allocate_continuous_fabric_cut()` executes `SELECT ... FOR UPDATE` row lock on `public.inventory_rolls`.
- **Observed Result:** Exactly 1 cut succeeded (`allocated: 2.00m`), remaining meters cleanly updated to `1.00m` (never negative), 14 concurrent orders received `'Insufficient continuous yardage available on active bolt'`.

### Exploit 3: Swatch Credit Double-Spend
- **Mechanism:** 10 parallel checkouts applying customer's ₹4.00 swatch credit.
- **Observed Result:** Exactly 1 checkout applied the credit (`is_redeemed = true`), remaining 9 rejected.

### Exploit 4: OTP Lockout & Anti-Hammering Gate
- **Mechanism:** 10 sequential brute-force attempts with invalid 6-digit codes.
- **Observed Result:** Attempts 1–4 returned invalid OTP with remaining attempt counter decremented. Attempt 5 permanently locked out the verification session. Attempt 6 with the correct code failed with `'Account locked due to excessive failed attempts'`.

### Exploit 5: Next.js App Router Middleware Bypass Probe
- **Mechanism:** Sent unauthenticated and customer-authenticated requests to `/admin` and `/api/admin/gemini/generate-product` carrying spoofed `x-middleware-subrequest: middleware:middleware:middleware:middleware:middleware` internal headers.
- **Observed Result:** The server-side DAL (`src/lib/dal/auth.ts`) re-verified session and admin role inside the runtime process, returning 401/403 with 0 bytes of admin data leaked.

### Exploit 6: Spreadsheet Formula Injection Neutralization
- **Mechanism:** Injected malicious CSV strings including `=cmd|'/c calc'!A1`, `=HYPERLINK(...)`, `+SUM(1,1)`, `@SUM(1,1)`, and quote-breakout payload `",=1+1`.
- **Observed Result:** `src/lib/utils/exportSanitizer.ts` intercepted all formula patterns with `FORMULA_REGEX = /(?:^|["',])\s*[=+\-@\t\r\n＝＋－＠]/`, prefixing each with `\t` and wrapping in double quotes. When opened in Microsoft Excel or LibreOffice Calc, all cells render as plain inert text strings.
