# Website & Blog Readability Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Audit and rewrite all 16 blog masterclasses, category editorial data, and core website pages into simple, clear, easy-to-understand English (Flesch-Kincaid Grade 6–8 readability) so that readers with basic English proficiency can easily learn and buy, while strictly preserving technical accuracy, search keywords, and the 1,000–1,500 word count per article.

**Architecture:**
1. **Readability Audit & Rules:** Establish plain-language translation rules (replace academic jargon like "hygroscopic tension dynamics" with "how the fabric absorbs moisture and changes shape", explain textile terms in simple words like "GSM = how heavy the fabric is").
2. **Website Core Copy Simplification:** Simplify `src/app/(storefront)/page.tsx`, `src/app/(storefront)/about/page.tsx`, and `src/data/categoryEditorial.ts` so hero text, manifesto, and fabric buying guides are crystal clear.
3. **Blog Batches 1 & 2 Simplification (Articles 1–8):** Rewrite Articles 1 to 8 in clear, accessible English with short sentences, simple vocabulary, and clear step-by-step instructions (maintaining 1,000–1,500 words per post).
4. **Blog Batches 3 & 4 Simplification (Articles 9–16):** Rewrite Articles 9 to 16 in clear, accessible English (maintaining 1,000–1,500 words per post).
5. **Quality & Verification Gate:** Verify all 16 articles meet $\ge 1,000$ words with `scripts/check_words.py`, verify 0 broken links with `scripts/audit_articles.py`, confirm 0 lint errors, run full Next.js build, and push to GitHub.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Python test scripts.

**Spec:** User request: "audit the blogs and the website content ensure that we use simple working [wording] such that a reader who is not that good in english can also understand it make the language more simplier and easier to understand".

---

## Global Constraints
- **Word Count Invariant:** All 16 articles MUST remain between **1,000 and 1,500 words** (verified via `scripts/check_words.py`).
- **Readability Floor:** Target Flesch-Kincaid reading ease 65+ (plain English, short sentences, active voice, everyday words).
- **SEO & Keyword Preservation:** Every post must retain its primary `targetKeyword` and core AEO question-answer headings.
- **Link Integrity:** All internal category links must point to valid canonical category hubs (`/category/linen`, `/category/cotton`, `/category/viscose`, `/category/wool`, `/category/tweed`, `/category/velvet`, `/swatches`, `/fabrics`).
- **Zero Build Errors:** `npm run lint` and `npm run build` must compile with 0 errors.

---

## Review Focus
1. **Clarity for ESL / Basic English Readers:** Are complex sentences broken into short, punchy sentences? Are esoteric Latin/Greek derived words replaced with everyday English equivalents?
2. **Term Explanations:** When terms like "GSM", "weft", "warp", "selvedge", or "bias" appear, are they immediately explained in simple terms?
3. **Word Count Compliance:** Does every single article maintain at least 1,000 words without padding or fluff?
4. **Tone Balance:** Does the writing feel warm, helpful, practical, and premium rather than condescending or dumbed-down?
5. **Conversion Value:** Do the simplified "Where to Buy" and "How to Order" sections make it effortless for a beginner or boutique owner to order swatches and meterage?

---

## Task Structure

### Task 1: Simplify Website Core Copy & Category Editorial Content
**Files:**
- Modify: `src/app/(storefront)/page.tsx`
- Modify: `src/app/(storefront)/about/page.tsx`
- Modify: `src/data/categoryEditorial.ts`
- Test: `npm run lint`

- [ ] Step 1.1: Rewrite the pinned manifesto in `src/app/(storefront)/page.tsx` in plain, warm, friendly English.
- [ ] Step 1.2: Rewrite Foundation 01, 02, and 03 in `src/app/(storefront)/about/page.tsx` so any reader understands what makes Fabriclicious special.
- [ ] Step 1.3: Simplify category descriptions, feel, usage, buying guide, and AEO answers in `src/data/categoryEditorial.ts` (linen, cotton, viscose, wool, velvet, tweed, etc.).
- [ ] Step 1.4: Verify with `npm run lint`.

---

### Task 2: Simplify Batch 1 Blog Masterclasses (Articles 1–4)
**Files:**
- Modify: `src/data/articles/batch1.ts`
- Test: `python scripts/check_words.py src/data/articles/batch1.ts`

- [ ] Step 2.1: Simplify Article 1 (`anatomy-of-drape-silk-satin`): Explain silk movement, why it slips, resting rules, rotary cutter tips, and simple 5mm French seams in plain words.
- [ ] Step 2.2: Simplify Article 2 (`mastering-true-bias`): Explain bias cutting, the 45-degree angle, why bias dresses stretch, and hanging rules in simple English.
- [ ] Step 2.3: Simplify Article 3 (`belgian-flax-linen-tailoring-guide`): Explain European flax, why linen gets softer, pre-washing rules, and simple needle choices.
- [ ] Step 2.4: Simplify Article 4 (`fabric-gsm-weight-selection-guide`): Explain GSM in plain English ("fabric weight in grams per square meter = how light or heavy it feels") and practical project tables.
- [ ] Step 2.5: Verify each article in Batch 1 has 1,000–1,500 words via `scripts/check_words.py`.

---

### Task 3: Simplify Batch 2 Blog Masterclasses (Articles 5–8)
**Files:**
- Modify: `src/data/articles/batch2.ts`
- Test: `python scripts/check_words.py src/data/articles/batch2.ts`

- [ ] Step 3.1: Simplify Article 5 (`herringbone-tweed-pattern-matching`): Explain how to match chevrons and stripes simply, single-layer cutting, and ironing tips.
- [ ] Step 3.2: Simplify Article 6 (`single-dye-lot-integrity-continuous-cuts`): Explain why ordering continuous cloth from the same roll prevents color mismatching.
- [ ] Step 3.3: Simplify Article 7 (`tailoring-without-puckering-wool-twill`): Explain why seams pucker (needle pulling cloth) and 5 easy steps to stop puckering.
- [ ] Step 3.4: Simplify Article 8 (`normandy-flax-vs-commercial-linen`): Explain why French flax lasts longer than cheap supermarket linen without complex chemistry jargon.
- [ ] Step 3.5: Verify each article in Batch 2 has 1,000–1,500 words via `scripts/check_words.py`.

---

### Task 4: Simplify Batch 3 Blog Masterclasses (Articles 9–12)
**Files:**
- Modify: `src/data/articles/batch3.ts`
- Test: `python scripts/check_words.py src/data/articles/batch3.ts`

- [ ] Step 4.1: Simplify Article 9 (`giza-cotton-poplin-shirting-masterclass`): Explain long-staple Egyptian cotton, why it stays smooth, and simple shirt sewing tips.
- [ ] Step 4.2: Simplify Article 10 (`the-swatch-sampling-protocol`): Explain how to test small fabric swatches at home (burn test, wash test, drape test) simply.
- [ ] Step 4.3: Simplify Article 11 (`como-silk-finishing-hems-seams`): Explain how to sew neat hems and seams on slippery silk with easy step-by-step guidance.
- [ ] Step 4.4: Simplify Article 12 (`architectural-velvet-pile-direction`): Explain velvet pile ("the soft fuzzy direction"), nap down vs. nap up, and how to iron velvet without crushing it.
- [ ] Step 4.5: Verify each article in Batch 3 has 1,000–1,500 words via `scripts/check_words.py`.

---

### Task 5: Simplify Batch 4 Blog Masterclasses (Articles 13–16)
**Files:**
- Modify: `src/data/articles/batch4.ts`
- Test: `python scripts/check_words.py src/data/articles/batch4.ts`

- [ ] Step 5.1: Simplify Article 13 (`sustainable-textile-provenance-natural-fibers`): Explain natural fibers vs plastic polyester, microplastics, and why cotton/linen/wool are healthy.
- [ ] Step 5.2: Simplify Article 14 (`the-bespoke-atelier-wardrobe-blueprint`): Explain the 5 essential fabrics for a classic wardrobe (linen, cotton, wool, silk, tweed) with clear meterage tables.
- [ ] Step 5.3: Simplify Article 15 (`buy-linen-fabric-online-meter-guide`): The beginner-friendly guide to buying pure linen by the meter online, checking GSM, and washing before cutting.
- [ ] Step 5.4: Simplify Article 16 (`wholesale-fabric-low-moq-sourcing-guide`): The small brand's guide to buying fabric rolls with low minimums (10–25 meters), transparent prices, and GST bills.
- [ ] Step 5.5: Verify each article in Batch 4 has 1,000–1,500 words via `scripts/check_words.py`.

---

### Task 6: Comprehensive Verification & GitHub Push
**Files:**
- Test: `python scripts/check_words.py`
- Test: `python scripts/audit_articles.py`
- Test: `npm run lint`
- Test: `npm run build`

- [ ] Step 6.1: Run `python scripts/check_words.py` to confirm all 16 articles meet $\ge 1,000$ words.
- [ ] Step 6.2: Run `python scripts/audit_articles.py` to confirm 0 broken links and clean formatting.
- [ ] Step 6.3: Run `npm run lint` to verify 0 errors.
- [ ] Step 6.4: Run `npm run build` to verify 100% static generation across all 54 routes.
- [ ] Step 6.5: Commit and push changes to `origin/master`.
