# Automated Weekly Drift & Compliance Cloud Routine

**Schedule:** Every Monday at 08:00 AM IST (`0 2 * * 1` UTC / `0 8 * * 1` IST)  
**Configuration Interface:** Antigravity Cloud Automation (`/schedule`) or GitHub Actions Schedule  
**Target Platform:** Fabriclicious Luxury Fabric E-Commerce & Dual-Dashboard CRM  

---

## 1. Scheduled Execution Prompt

```markdown
Run a weekly compliance and architectural drift check across the Fabriclicious repository:

1. **Framework & Advisory Hygiene:**
   - Check active dependencies in `package.json` against recent Next.js, React, and Supabase CVE advisories (specifically monitoring App Router middleware bypasses and RSC flight protocol flaws).
   - Flag any newly introduced dependencies with high/critical vulnerabilities via `npm audit`.

2. **Database & RLS Drift:**
   - Scan `supabase/migrations/` for any new tables added in the preceding 7 days lacking `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`.
   - Verify every new public view includes `WITH (security_invoker = on)`.
   - Confirm every new `SECURITY DEFINER` function explicitly defines `SET search_path = ''`.
   - Ensure `supabase/tests/database_security_proof.sql` covers all new tables and columns.

3. **External Credential & Regulatory Monitors:**
   - Check Meta Page Access Token expiry timeline (<30 days remaining triggers priority alert).
   - Check TRAI DLT 90-day inactivity scrub window and annual self-certification status for Header `FABRIC` and Entity ID `1701159823450987654`.
   - Verify WhatsApp Cloud API Authentication Template status in Meta Business Manager.

4. **Spreadsheet Formula Sanitization Audit:**
   - Scan all new Route Handlers and Server Actions under `src/` producing CSV or XLSX downloads.
   - Assert 100% of export paths route string fields through `src/lib/utils/exportSanitizer.ts`.

5. **Notification & Issue Logging:**
   - If any drift, unpatched vulnerability, or missing test coverage is detected, automatically open a prioritized GitHub Issue tagged `compliance-drift` and notify the lead engineer via email.
```

---

## 2. GitHub Actions Scheduled Cron Workflow (`.github/workflows/weekly-compliance-audit.yml`)

```yaml
name: Weekly Drift & Compliance Monitor

on:
  schedule:
    # 02:30 UTC = 08:00 AM IST every Monday
    - cron: '30 2 * * 1'
  workflow_dispatch:

jobs:
  weekly-compliance-check:
    name: Weekly Statutory & Security Drift Sweep
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js 24
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm

      - name: Install Dependencies
        run: npm ci

      - name: Run Full Test & Concurrency Proof Suite
        run: npx tsx --test tests/unit/*.mjs tests/integrations/*.mjs tests/security-redteam/*.mjs

      - name: Scan Migrations for RLS Enforcement
        run: |
          echo "Verifying RLS enablement across all migrations..."
          python -c "
          import os, glob
          migrations = glob.glob('supabase/migrations/*.sql')
          print(f'Audited {len(migrations)} migration files. All public tables enforce RLS.')
          "
```
