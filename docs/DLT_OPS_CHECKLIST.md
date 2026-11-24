# TRAI DLT & Telecom Regulatory Operations Checklist

**Entity:** Fabriclicious Luxury Textiles Private Limited  
**Audit Standard:** Telecom Regulatory Authority of India (TRAI) Telecom Commercial Communications Customer Preference Regulations (TCCCPR)  
**Effective Standard:** 2025–2026 Directives (PE-TM Chain Binding & Typed Variable Tags)  

---

## 1. Principal Entity & Header Registration

| Configuration Element | Production Value / Identifier | Registration Status | Notes |
| :--- | :--- | :---: | :--- |
| **Principal Entity (PE) ID** | `1701159823450987654` | **APPROVED** | Registered with Access Provider (Jio / Airtel DLT). |
| **6-Character Brand Header** | `FABRIC` / `FBRCLC` | **APPROVED** | Suffix `-T` (Transactional) or `-S` (Service) assigned. |
| **PE-TM Chain Binding** | Primary Aggregator -> Delivery Operator | **COMPLIANT** | Capped at <=2 telemarketer hops per TRAI Dec 11, 2024 mandate. |
| **URL & Callback Whitelisting** | `https://fabriclicious.com`, `https://fbcl.in` | **WHITELISTED** | Registered on DLT portal per Oct 1, 2024 directive. |
| **Annual Self-Certification** | Completed for FY 2026–2027 | **ACTIVE** | 90-day inactivity scrub monitor enabled. |

---

## 2. DLT SMS Templates with Mandatory Typed Pre-Tags

Per TRAI's November 18, 2025 Direction, legacy `{#var#}` tags are banned and scrubbed. All templates strictly use typed tags:

### Template 1: User Registration / Login OTP
- **Template ID:** `1707168923401122334`
- **Template Category:** Service Implicit
- **DLT Approved Content:**
  ```text
  {#numeric#} is your secret verification OTP for Fabriclicious. Valid for 10 minutes. Please do not share this code with anyone. {#cbn#}
  ```
- **Tag Validation:** `{#numeric#}` strictly validated for 6-digit CSPRNG OTP.

### Template 2: Order Cut in Progress Notification
- **Template ID:** `1707168923401122335`
- **Template Category:** Service Implicit
- **DLT Approved Content:**
  ```text
  Your atelier order #{#alphanumeric#} is on the cutting table. Bolt #{#alphanumeric#} is being measured to your requested {#numeric#} meters along the grainline. Track status: {#url#} - Fabriclicious
  ```

### Template 3: Parcel Dispatched Timeline
- **Template ID:** `1707168923401122336`
- **Template Category:** Service Implicit
- **DLT Approved Content:**
  ```text
  Your continuous fabric parcel for Order #{#alphanumeric#} has been rolled on hardwood tubes and dispatched. Tracking Number: {#alphanumeric#}. Track live: {#url#} - Fabriclicious
  ```

---

## 3. Fallback Mechanics & WhatsApp Primary Channel

1. **Primary Route:** WhatsApp Cloud API Authentication Template (`fabriclicious_auth_otp`).
2. **Fallback Window:** If WhatsApp message status does not transition to `delivered` within 15 seconds, the automated dispatcher fires the DLT-registered SMS via the bound aggregator.
3. **Entropy & Lockout:** 6 digits CSPRNG, stored hashed (SHA-256 with salt), 10-minute TTL, single-use, max 5 attempts lockout.
