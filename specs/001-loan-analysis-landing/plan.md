# Implementation Plan: Loan-Analysis Landing Page

**Branch**: `001-loan-analysis-landing` | **Date**: 2026-05-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-loan-analysis-landing/spec.md`

## Summary

A single-page, Romanian-language marketing-and-intake site for a Moldovan microfinance contract-analysis service, plus a small set of supporting document pages linked from the footer. The page explains what the service does, who is accountable, how it is funded (free check + optional contingency-fee recovery), and what happens to an uploaded contract, then lets the borrower upload a contract to start a free automated check. Built in three shippable phases (credible core → recognition + outcomes → objections + off-ramps).

**Technical approach**: React + Vite + TypeScript with strictly CSS Modules and CSS custom-property design tokens (no utility frameworks). A plain client-side single-page app — React Router covers the landing page plus the footer document pages, and the upload widget is lazy-loaded. Old/low-end devices and constrained networks are out of scope, so no prerendering or performance gate is imposed; accessibility remains a hard requirement. i18n is structured from day one (Romanian at launch) so additional, native-reviewed languages can be added without restructuring. The contract-analysis backend is out of scope; the page integrates with it through a defined upload-intake contract.

## Technical Context

**Language/Version**: TypeScript 5.x, React 19, Node.js 20+ (build/test only; runtime output is static)
**Primary Dependencies**: Vite 6+, React Router, `i18next` + `react-i18next` (JSON resource catalogs). No CSS framework — CSS Modules + design tokens only. No CSS-in-JS.
**Storage**: None server-side from this page. Client-side: `localStorage` only for a language preference. The uploaded file is held in memory and POSTed to the external intake endpoint; never persisted by the page.
**Testing**: Vitest + React Testing Library (unit/component), `vitest-axe`/`@axe-core` (accessibility), Playwright (e2e), plus content-lint scripts (tone, FAQ format, reading level, claims register).
**Target Platform**: Current evergreen browsers; mobile-first and responsive from ~360px up. Outdated browsers, old/low-end devices, and constrained networks are out of scope.
**Project Type**: Web — client-rendered React single-page app + supporting document routes; the upload widget is lazy-loaded.
**Performance Goals**: No enforced performance budget. Sensible defaults only — lazy-load the upload widget and keep dependencies minimal. (Old-device/slow-network targets are out of scope.)
**Constraints**: WCAG 2.2 AA; light-mode only; exactly one accent color; CSS Modules only; B1/grade-8 Romanian copy; honor `prefers-reduced-motion`; no third-party analytics/trackers or font CDNs by default (privacy-sensitive audience); Romanian text requires the `latin-ext` font subset (ș/ț comma-below diacritics).
**Scale/Scope**: One landing page (7 sections + footer) + ~6 supporting routes (sample report, about, data-handling, methodology, terms, accessibility). 1 language at launch, i18n-ready. Low traffic profile typical of a marketing-and-intake page.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution (`.specify/memory/constitution.md`) is the unpopulated template — it contains only placeholders, so there are no ratified, project-specific principles to gate against. Default engineering principles are applied and all pass:

- **Simplicity / YAGNI**: No state manager, no CSS framework, no component library, no prerender/SSG layer. Dependencies are limited to routing and i18n. **PASS**
- **Accessibility-first**: WCAG 2.2 AA is a first-class requirement, enforced by `eslint-plugin-jsx-a11y` and axe in tests. **PASS**
- **Performance**: No enforced budget — old/low-end devices and constrained networks are out of scope per the updated requirements. The upload widget is lazy-loaded and dependencies kept minimal. **PASS**
- **No hidden behavior**: No trackers; the upload boundary is an explicit, documented contract. **PASS**

Complexity Tracking is empty (see below): with the performance constraint relaxed, no architectural workarounds are needed.

Re-check after Phase 1: design introduces no new violations. **PASS** (see end of Phase 1).

## Project Structure

### Documentation (this feature)

```text
specs/001-loan-analysis-landing/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (content & client-state model)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (external interface contracts)
│   ├── upload-intake.md
│   └── newsletter-subscribe.md
├── checklists/
│   └── requirements.md  # Spec quality checklist (from /speckit.specify)
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
overpay/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── public/
│   ├── fonts/                     # self-hosted Inter subset (latin + latin-ext), woff2
│   └── docs/                      # sample-report, abuse-pattern guide (PDF/printable)
├── src/
│   ├── main.tsx                   # entry + hydration
│   ├── App.tsx                    # router shell + layout (SkipLink, LiveRegion provider)
│   ├── routes/
│   │   ├── Home.tsx               # the landing page; composes the 7 sections in canonical order
│   │   ├── SampleReport.tsx
│   │   ├── About.tsx
│   │   ├── DataHandling.tsx
│   │   ├── Methodology.tsx
│   │   ├── Terms.tsx
│   │   └── Accessibility.tsx
│   ├── sections/                  # one folder per landing-page section (Component + .module.css)
│   │   ├── Hero/
│   │   ├── WhyThisExists/
│   │   ├── HowItWorks/
│   │   ├── WhoWeAreFunding/
│   │   ├── ContractHandling/
│   │   ├── ReportAndAfter/
│   │   ├── Faq/
│   │   └── SiteFooter/
│   ├── components/                # shared primitives, each with a .module.css
│   │   ├── Button/                # primary (accent) + secondary variants
│   │   ├── Panel/                 # rounded, soft-shadow container (no hard borders)
│   │   ├── Disclosure/            # accessible expand/collapse for FAQ
│   │   ├── SkipLink/
│   │   ├── LiveRegion/            # aria-live announcer (upload status)
│   │   ├── LanguagePicker/
│   │   └── UploadWidget/          # THE hydrated island — lazy-loaded
│   ├── i18n/
│   │   ├── index.ts               # i18next init
│   │   └── locales/ro/            # JSON catalogs: common, hero, sections, faq, disclosures
│   ├── content/
│   │   └── ro/                    # structured content: patterns.ts, faq.ts, disclosures.ts
│   ├── styles/
│   │   ├── tokens.css             # design tokens: palette (1 accent), radii(12–20), shadows, type scale, spacing
│   │   ├── reset.css
│   │   └── global.css             # base + prefers-reduced-motion handling
│   ├── lib/
│   │   ├── uploadClient.ts        # multipart POST to intake endpoint (contract)
│   │   ├── validateUpload.ts      # client-side type/size checks
│   │   └── env.ts                 # VITE_INTAKE_BASE_URL etc.
│   └── types/                     # shared TS types (content schema, upload state)
├── tests/
│   ├── unit/                      # vitest + RTL
│   ├── a11y/                      # axe checks per section/route
│   ├── content/                   # tone lint, FAQ format, reading-level, claims register
│   └── e2e/                       # playwright + lighthouse budget
└── .github/ or ci/                # CI: lint, test, a11y, lighthouse, content-lint
```

**Structure Decision**: Client-rendered React single-page app. Sections are self-contained component folders (component + scoped CSS Module) composed by `routes/Home.tsx` in the canonical order required by FR-001. `components/UploadWidget` is lazy-loaded. Footer-linked documents are real routes under `routes/`. All visual values flow from `styles/tokens.css`; CSS Modules consume them via `var(--token)`, enforcing the single-accent palette and the 12–20px radius / soft-shadow / no-hard-border rules in one place.

## Complexity Tracking

None. React + Vite is the user-selected stack; the performance tension noted in earlier drafts was removed when old-device and slow-network support were taken out of scope, so no prerendering layer or budget workaround is needed.
