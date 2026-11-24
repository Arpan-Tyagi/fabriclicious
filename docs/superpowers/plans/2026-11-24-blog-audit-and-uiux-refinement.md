# Editorial Blog Audit & UI/UX Presentation Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify heading hierarchy, markdown syntax, and internal category linking across all 16 long-form masterclasses, and elevate the reading UI/UX presentation in `JournalDetailPage` and `StorefrontJournalPage` with a bespoke markdown parser (ordered lists, formatted tables, horizontal dividers, AEO callouts) and refined luxury editorial typography.

**Architecture:** 
1. Standardize markdown syntax in `src/data/articles/batch4.ts` (unify `##`/`###` heading levels, repair 11 category links to active canonicals).
2. Harden `src/data/categoryEditorial.ts` with alias fallbacks for `pure-linen`, `pure-cotton`, `pure-silk`, `wool-suiting`, and `silk`.
3. Overhaul `src/app/(storefront)/journal/[slug]/page.tsx` with a multi-token markdown renderer supporting ordered lists (`<ol>`), unordered lists (`<ul>`), styled tables (`<table>` with parsed cell tokens), section dividers (`<hr>`), blockquotes (`<blockquote>`), code spans (`<code>`), italic emphasis (`*...*`), and illuminated AEO callout cards.
4. Enhance `src/app/(storefront)/journal/page.tsx` with tie-breaking publication slot sorting, category pill filtering, and luxury editorial grid styling.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Lucide React, Supabase PostgreSQL, Schema.org BlogPosting / BreadcrumbList JSON-LD.

**Spec:** Antigravity luxury e-commerce standard (`AGENTS.md` / `GEMINI.md`), UI/UX Pro Max typography guidelines (65-75 char line lengths, 1.625 line height, high contrast, responsive table scrolling).

---

## Global Constraints
- **Word Count Invariant:** All 16 articles MUST maintain $\ge 1,000$ words (verified via `scripts/check_words.py`).
- **Zero AI Buzzwords:** Zero instances of synthetic phrasing ("game-changer", "testament to", "elevate", "delve").
- **Zero Build/Lint Errors:** `npm run lint` and `npm run build` must exit code 0.
- **Link Integrity:** 100% of internal links must resolve to active routes without 404s or empty catalog responses.

---

## Review Focus
1. **Ordered List Rendering:** Ensure all 129 sequential steps across the 16 masterclasses render with clear decimal numbers (`1.`, `2.`, `3.`) and indentation, never running together in a single paragraph block.
2. **Table Parsing & Mobile Scroll:** Ensure comparison matrix tables scroll horizontally on small viewports without breaking page layout, and parse bold/link tokens inside table cells.
3. **Heading Consistency:** Verify that `## ` creates styled section titles and `### ` creates subsections with proportional typography across all 16 articles.
4. **Category Link Resolution:** Ensure all links to `/category/...` in batch 4 navigate to active categories with live products and rich editorial content.
5. **AEO Highlighting:** Verify that "Where to Buy / Where to Source" sections render as distinctive atelier trust cards with direct action buttons.

---

## Task Structure

### Task 1: Normalize Heading Hierarchy & Fix Category Links in Batch 4
**Files:**
- Modify: `src/data/articles/batch4.ts`
- Test: `scripts/audit_articles.py`

- [ ] Step 1.1: Promote primary `### ` headings in `batch4.ts` to `## ` to match Batches 1, 2, and 3.
- [ ] Step 1.2: Promote `#### ` subheadings to `### `.
- [ ] Step 1.3: Update non-standard category links (`/category/pure-linen` -> `/category/linen`, `/category/pure-cotton` -> `/category/cotton`, `/category/pure-silk` -> `/category/viscose`, `/category/wool-suiting` -> `/category/wool`).
- [ ] Step 1.4: Run `python scripts/audit_articles.py` to confirm 0 broken links and unified heading hierarchy.
- [ ] Step 1.5: Run `python scripts/check_words.py src/data/articles/batch4.ts` to verify all 4 articles remain $\ge 1,000$ words.

---

### Task 2: Implement Robust Category Slug Aliases in Category Editorial Data
**Files:**
- Modify: `src/data/categoryEditorial.ts`
- Test: `node -e "const { CATEGORY_EDITORIAL_DATA } = require('./src/data/categoryEditorial.ts'); console.log(Object.keys(CATEGORY_EDITORIAL_DATA));"`

- [ ] Step 2.1: Add alias mappings in `CATEGORY_EDITORIAL_DATA` for `pure-linen` (pointing to linen data), `pure-cotton` (cotton), `pure-silk` (viscose/silk), `wool-suiting` (wool), and `silk` (viscose).
- [ ] Step 2.2: Ensure `generateStaticParams` in `src/app/(storefront)/category/[slug]/page.tsx` continues to generate static params cleanly.
- [ ] Step 2.3: Verify via test script that all aliases return valid metadata and editorial payloads.

---

### Task 3: Overhaul Journal Detail Markdown Renderer & Luxury Typography
**Files:**
- Modify: `src/app/(storefront)/journal/[slug]/page.tsx`
- Test: `npm run build`

- [ ] Step 3.1: Expand `renderFormattedText` to handle bold (`**text**`), italic (`*text*`), inline code (`` `text` `` or `'text'`), and internal links (`[text](url)`).
- [ ] Step 3.2: Implement ordered list parser (`1. `, `2. `) rendering `<ol className="list-decimal pl-6 space-y-2.5 my-4 text-umber/85">` with nested item parsing.
- [ ] Step 3.3: Implement horizontal rule parser (`---`) rendering `<hr className="border-t border-hemp/60 my-10" />`.
- [ ] Step 3.4: Implement table cell formatter so that markdown inside table cells (bold headers, links, unit specs) is parsed with `renderFormattedText`.
- [ ] Step 3.5: Implement AEO Callout block: When an `## ` header begins with "Where to Buy" or "Where to Source", render it as an illuminated Atelier Specimen Card with direct swatch/yardage CTAs.
- [ ] Step 3.6: Add breadcrumbs (`Home / Editorial Journal / [Article Title]`) and structured `BreadcrumbList` JSON-LD schema.
- [ ] Step 3.7: Add "Related Atelier Masterclasses" section at the end of each post to drive continuous engagement across the cluster.

---

### Task 4: Enhance Journal Archive Page (`/journal`)
**Files:**
- Modify: `src/app/(storefront)/journal/page.tsx`
- Test: `npm run build`

- [ ] Step 4.1: Refine publication slot sorting with tie-breaking logic so same-day Evening articles precede Morning articles.
- [ ] Step 4.2: Add category badges and quick filter navigation for the 16 volumes.
- [ ] Step 4.3: Add reading time metrics and swatch sampling micro-links on each card.

---

### Task 5: Comprehensive Verification & Git Push
**Files:**
- Test: `python scripts/check_words.py`
- Test: `python scripts/audit_articles.py`
- Test: `npm run lint`
- Test: `npm run build`

- [ ] Step 5.1: Run `python scripts/check_words.py` to confirm all 16 articles meet $\ge 1,000$ words.
- [ ] Step 5.2: Run `python scripts/audit_articles.py` to confirm 0 broken links and 0 unhandled syntax tokens.
- [ ] Step 5.3: Run `npm run lint` to verify 0 errors.
- [ ] Step 5.4: Run `npm run build` to verify clean static page generation across all routes.
- [ ] Step 5.5: Stage all changes, commit with `feat(journal): audit and elevate blog markdown parsing, typography, and category routing`, and push to `origin/master`.
