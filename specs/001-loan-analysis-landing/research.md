# Phase 0 Research: Loan-Analysis Landing Page

All technical-context unknowns are resolved below. The stack (React + Vite + TypeScript + strict CSS Modules) was set by the user; remaining decisions are how to meet the spec's accessibility, performance, privacy, and i18n constraints within that stack.

## 1. Rendering strategy

- **Decision**: Plain React + Vite client-side single-page app (no prerendering). React Router covers the landing page and the footer document routes; the upload widget is lazy-loaded.
- **Rationale**: Old-device and slow-network support was taken out of scope ("do not enforce"), which removes the reason to add a prerender/SSG layer. A plain Vite SPA is the simplest expression of the chosen stack and matches the "simple minimalistic" intent.
- **Alternatives considered**: `vite-react-ssg` static prerendering — previously planned to meet a strict performance/old-device bar; dropped now that the bar is relaxed. It remains an easy add-on later if SEO or first-paint becomes a priority. Astro / Eleventy / plain HTML — offered earlier and not selected.

## 2. Styling system

- **Decision**: CSS Modules exclusively, fed by global design tokens in `styles/tokens.css` (CSS custom properties for the neutral palette, the single accent, radii 12–20px, soft shadows, type scale, spacing). No Tailwind, no CSS-in-JS.
- **Rationale**: User mandate ("strictly CSS modules, no Tailwind"). Centralizing the palette and radii/shadow rules as tokens makes the single-accent constraint (FR-009) and the no-hard-border / soft-shadow rules (FR-011) enforceable in one place and trivially auditable.
- **Alternatives considered**: Tailwind (rejected by user), styled-components/Emotion (rejected: runtime JS cost conflicts with the perf budget), plain global CSS (rejected: no scoping, collision risk across 8 sections).

## 3. Internationalization

- **Decision**: `i18next` + `react-i18next` with JSON resource catalogs under `src/i18n/locales/<code>/`. Romanian (`ro`) ships at launch and is the default/fallback. Each locale carries a `reviewedByNativeSpeaker` flag surfaced in the data model; the footer names supported languages. Per-locale routes are added as languages are added.
- **Rationale**: Satisfies FR-054 (named languages, native-reviewed, never auto-translated) and keeps translation work in reviewer-friendly JSON. Structuring i18n now avoids a costly retrofit even though only Romanian launches.
- **Alternatives considered**: Hand-rolled context catalog (lighter but reinvents plurals/interpolation and the loading story), `next-intl`/FormatJS (framework-specific or heavier than needed).
- **Note**: Romanian requires the `latin-ext` Unicode subset for ș/ț (comma-below). The font subset and any content-lint must use the correct code points.

## 4. Routing & supporting pages

- **Decision**: React Router for the landing page plus the footer-linked routes (sample report, about, data-handling, methodology, terms, accessibility), client-rendered.
- **Rationale**: FR-042–FR-044 require real footer links to these documents. A router also hosts per-locale paths cleanly.
- **Alternatives considered**: Single monolithic page with anchor links only (rejected: the footer documents are distinct deliverables, not page sections).

## 5. Upload widget (the one island)

- **Decision**: A native `<input type="file">` wrapped in a small custom component + hook. Client-side validation of type and size, an `aria-live` status region announcing states ("Reading clauses", "Checking interest rates"), and a multipart POST to the external intake endpoint (see `contracts/upload-intake.md`). Lazy-loaded and code-split so it does not affect first paint.
- **Rationale**: Meets FR-038–FR-040 and the screen-reader status requirement (FR-039, SC-008) with minimal JS. The analysis backend is out of scope, so the widget's responsibility ends at a validated, consented handoff.
- **Alternatives considered**: Dropzone/upload libraries (rejected: bundle weight for behavior the File API already provides), full form libraries like React Hook Form (rejected: overkill for one file + two consent checkboxes).

## 6. Typography & fonts

- **Decision**: Self-host Inter (humanist sans) as a subset covering `latin` + `latin-ext`, in woff2, `font-display: swap`, with the primary weight preloaded. Body text 16–18px (FR-010). A quiet serif for headings is optional and deferred unless it earns its weight.
- **Rationale**: Self-hosting avoids a third-party font CDN (privacy + perf + no extra connection), and the `latin-ext` subset renders Romanian diacritics correctly. `swap` + preload protect LCP.
- **Alternatives considered**: Google Fonts CDN (rejected: third-party request to a privacy-sensitive audience, extra RTT), pure system font stack (kept as the fallback chain, acceptable but less controlled).

## 7. Performance strategy

- **Decision**: No enforced performance budget. Apply sensible defaults only: lazy-load the upload widget, keep dependencies minimal, and use inline SVG/text for the few permitted diagrams. Lighthouse may be run for information but is not a gate.
- **Rationale**: Old-device/slow-network support is out of scope ("do not enforce"). Accessibility remains a hard gate; performance does not.
- **Alternatives considered**: A hard Lighthouse/LCP/JS budget (the earlier plan) — dropped per the updated requirement.

## 8. Accessibility strategy

- **Decision**: Semantic HTML and landmark structure; `eslint-plugin-jsx-a11y` in lint; axe assertions per section/route in tests; visible focus states using the accent token; a skip link; `prefers-reduced-motion` handled in `global.css`; the `aria-live` upload announcer. Target WCAG 2.2 AA.
- **Rationale**: FR-016, FR-013, FR-039; verified by SC-008/SC-009.
- **Alternatives considered**: Manual-only auditing (rejected: not repeatable in CI).

## 9. Testing & content QA

- **Decision**: Vitest + React Testing Library (component/unit), `vitest-axe`/`@axe-core` (a11y), Playwright + Lighthouse (e2e + perf/a11y budgets). Plus content-lint scripts: (a) tone lint — fail on exclamation marks and a banned-phrase list (therapeutic/urgency/hype) per FR-002/FR-003/SC-007; (b) FAQ format — exactly the 10 questions in order, answers 2–4 sentences ending in a period per FR-052/SC-013; (c) reading-level estimate flagging copy above ~B1/grade-8 per FR-007/SC-011; (d) a claims register mapping each factual claim to a source per FR-006/SC-012.
- **Rationale**: Several success criteria are content properties, not code behavior; they need automated checks plus human review.
- **Alternatives considered**: Trusting review alone (rejected: tone/FAQ/claims rules regress silently as copy changes).

## 10. Privacy & analytics

- **Decision**: No third-party analytics, tag managers, or trackers by default. If measurement is later required, use a privacy-first, cookieless approach and disclose it in §5 / data-handling. The page never contacts the lender and takes no action without explicit consent (FR-037), reflected in the upload consent flow.
- **Rationale**: The audience is privacy-sensitive; trackers would contradict the page's credibility premise and §5 disclosures.
- **Alternatives considered**: Standard analytics (rejected on trust and consistency grounds).

## 11. Operator-supplied content (out-of-band dependencies)

Not technical unknowns, but build cannot finalize copy without them: registered entity name + registration number + contact email + postal address; regulatory standing; the named model provider (or "in-house"); the contingency-fee percentage; the responsible individuals and licensed legal professionals with verifiable credentials; the funding source that keeps the check free; and the citations behind each legal claim (Moldovan consumer-credit / microfinance law). These are modeled as required, slot-typed content (see `data-model.md`) so the page fails its content checks if any are missing.

## 12. External integration boundaries

- **Upload intake**: external service; the page depends only on the contract in `contracts/upload-intake.md` (configured via `VITE_INTAKE_BASE_URL`).
- **Newsletter (Phase 3)**: external service; see `contracts/newsletter-subscribe.md`. Double opt-in, anonymous.
- **Sample report & abuse-pattern guide**: static documents shipped in `public/docs/`.
