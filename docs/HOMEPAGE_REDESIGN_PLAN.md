# Homepage Redesign Plan — DevPilot

**Goal:** Raise the landing page from 4/10 to 8/10+ SaaS quality in one focused pass.

**Scope:** Single file: `frontend/app/page.tsx`. No new dependencies. Static export must keep passing.

---

## Target Improvements (ranked by impact)

### 1. Hero — Product Visual (High)
- Replace gradient blob with a **styled code diff panel** (like the sample review but prettier, higher in the fold)
- Show the *actual* DevPilot review UI: files changed, inline comments, severity badges
- Keep headline + subhead + primary CTA above the fold

### 2. Social Proof Bar (High)
- Row under hero: logos/avatars + one credibility line
- Options: “Used by 50+ repos in preview”, “Backed by NVIDIA Inception”, “GitHub-native”, “SOC-2 ready (in progress)”
- Keep it one line, subtle, but present

### 3. Sample Review → Interactive Demo Card (High)
- Convert current plain-text diff into a **styled card** with:
  - File path + line numbers
  - Syntax-highlighted code (use CSS only, no lib)
  - Inline comment bubble with severity dot (red/amber/green)
  - “Accepted” / “Dismissed” pill actions visible
- This *is* the product — make it look real

### 4. Pricing Cards — Visual Hierarchy (Medium)
- Starter = recommended: distinct border, subtle glow, “Most Popular” badge
- Feature lists: add tiny icons (✓ → small check icon, or category dots)
- CTA buttons: primary (filled) for recommended, outline for others
- Hover: subtle lift + border color shift

### 5. How It Works — Visual Steps (Medium)
- Add tiny illustration per step (SVG inline, 48x48, brand color)
- Current cards are text-only — a visual anchor per step helps scan

### 6. FAQ — Accordion Style (Low)
- Replace static Q&A with `<details>/<summary>` native accordion
- Keeps page shorter, feels more polished

### 7. Footer — Trust Signals (Low)
- Add mini badges: “Open Source First”, “No Code Stored”, “SOC-2 Pending”
- Keep links clean

---

## Non-Goals (Explicitly Out)
- New npm packages
- Animation libraries (Framer Motion, etc.)
- Backend/API calls
- CMS or dynamic content
- A/B test infra

---

## Implementation Order (single commit)

1. **Hero diff panel** — inline SVG/CSS, ~80 lines
2. **Social proof bar** — one flex row, ~15 lines
3. **Sample review card rewrite** — replace existing section, ~60 lines
4. **Pricing card polish** — badge, hover, button styles, ~40 lines
5. **How It Works icons** — 3 inline SVGs, ~30 lines
6. **FAQ accordion** — native HTML, ~25 lines
7. **Footer badges** — ~15 lines
8. **Build + push**

---

## CSS Strategy
- All new styles via existing Tailwind classes + `style=` for one-off gradients
- No new CSS files
- Keep bundle size identical

---

## Verification Checklist
- [ ] `npx next build` passes
- [ ] Page loads on GitHub Pages (200)
- [ ] No console errors
- [ ] Mobile viewport renders without horizontal scroll
- [ ] Primary CTA visible above fold on 1366px width
- [ ] Sample review card renders correctly at 375px width

---

## Time Estimate
~45 minutes total implementation. Single push triggers auto-deploy.