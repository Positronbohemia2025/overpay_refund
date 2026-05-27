---
description: "Task list for Loan-Analysis Landing Page implementation"
---

# Tasks: Loan-Analysis Landing Page

**Input**: Design documents from `/specs/001-loan-analysis-landing/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Stack**: React 19 + Vite + TypeScript, strictly CSS Modules + CSS custom-property design tokens (no Tailwind, no CSS-in-JS), React Router (client-rendered SPA), i18next/react-i18next (Romanian at launch). The upload widget is the one lazy-loaded interactive component. Backend analysis is out of scope; the page integrates via the upload-intake contract.

**Tests**: This feature has explicit, testable success criteria for accessibility (SC-008), reduced motion (SC-009), responsive legibility (SC-010), and content quality (SC-007, SC-011, SC-012, SC-013). The accessibility and content-lint verification tasks below are **required by those success criteria** — they are acceptance gates, not speculative TDD. No full unit-test-first suite is mandated.

**Organization**: Tasks are grouped by user story (= delivery phase) so each phase can be implemented, tested, and demoed independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: US1 / US2 / US3 for user-story phases; Setup/Foundational/Polish have no story label
- File paths are relative to the repo root (`/Users/mihaciobanu/Dev/overpay/`)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and tooling

- [X] T001 Initialize Vite + React 19 + TypeScript project at repo root: `package.json` (deps: react, react-dom, react-router-dom, i18next, react-i18next; devDeps: vite, @vitejs/plugin-react, vitest, @testing-library/react, @testing-library/jest-dom, vitest-axe, @playwright/test, eslint, typescript-eslint, eslint-plugin-jsx-a11y, stylelint, prettier), `index.html`, `vite.config.ts`, `tsconfig.json` (strict mode)
- [X] T002 [P] Configure ESLint (typescript-eslint + eslint-plugin-jsx-a11y) and Prettier in `eslint.config.js` and `.prettierrc`
- [X] T003 [P] Configure stylelint for CSS Modules in `stylelint.config.cjs`
- [X] T004 [P] Configure Vitest + React Testing Library + axe in `vitest.config.ts` and `tests/setup.ts`
- [X] T005 [P] Configure Playwright in `playwright.config.ts`
- [X] T006 Create source/test/asset directory structure: `src/{routes,sections,components,i18n,content,styles,lib,types}`, `tests/{unit,a11y,content,e2e}`, `public/{fonts,docs}`
- [X] T007 [P] Add environment handling: `.env.example` (`VITE_INTAKE_BASE_URL`, `VITE_MAX_UPLOAD_BYTES`) and `src/lib/env.ts`
- [X] T008 [P] Scaffold content-lint scripts in `tests/content/` (tone, faq-format, reading-level, claims-register) and wire `lint:content` script in `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Design system, app shell, i18n, shared primitives, and content schema that every section depends on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T009 [P] Define design tokens in `src/styles/tokens.css`: soft neutral palette + exactly ONE accent color; radii scale 12–20px; soft shadows; type scale (body 16–18px); spacing scale (FR-009, FR-010, FR-011)
- [X] T010 [P] Base styles in `src/styles/reset.css` and `src/styles/global.css`: base typography, `prefers-reduced-motion` handling, visible focus-visible states using the accent token (FR-013, FR-016)
- [X] T011 [P] Self-host Inter subset (latin + latin-ext for ș/ț) in `public/fonts/`, add `@font-face` + preload of primary weight in `index.html` (no font CDN)
- [X] T012 [P] Shared TypeScript types in `src/types/` for the content schema (Locale, disclosures, AbusePattern, FaqItem, ReportStructure, AfterReportPath, OffRampArtifact) and the UploadSubmission state machine, per data-model.md
- [X] T013 i18n setup in `src/i18n/index.ts` (i18next init, `ro` default + fallback) and a locale registry carrying `reviewedByNativeSpeaker` (FR-054) — depends on T012
- [X] T014 App shell in `src/main.tsx` and `src/App.tsx`: React Router, page layout, mount SkipLink and the LiveRegion provider
- [X] T015 Router skeleton in `src/routes/`: stub routes for `Home`, `SampleReport`, `About`, `DataHandling`, `Methodology`, `Terms`, `Accessibility` — depends on T014
- [X] T016 [P] `Button` primitive (primary=accent, secondary=subordinate) in `src/components/Button/` + `.module.css` — depends on T009
- [X] T017 [P] `Panel` primitive (rounded, soft shadow, no hard border) in `src/components/Panel/` + `.module.css` — depends on T009
- [X] T018 [P] `Disclosure` primitive (accessible expand/collapse) in `src/components/Disclosure/` + `.module.css` — depends on T009
- [X] T019 [P] `SkipLink` primitive in `src/components/SkipLink/` + `.module.css`
- [X] T020 [P] `LiveRegion` aria-live announcer in `src/components/LiveRegion/` + `.module.css`
- [X] T021 [P] `LanguagePicker` primitive in `src/components/LanguagePicker/` + `.module.css` — depends on T013
- [X] T022 Typed disclosure content slots in `src/content/ro/disclosures.ts` (LegalEntity, FundingModel, ResponsibleParty[], ModelDisclosure, PrivacyDisclosure) with required-field types and `TODO(operator)` placeholders — depends on T012
- [X] T023 Build-time content validation in `tests/content/` asserting data-model gates: required disclosure slots present, exactly one accent token, published locales all `reviewedByNativeSpeaker` — depends on T022

**Checkpoint**: Design system, shell, i18n, primitives, and content schema ready — user stories can begin

---

## Phase 3: User Story 1 - Trust the service and start a check (Priority: P1) 🎯 MVP

**Goal**: A credible, functional page — a visitor understands within one scroll what the service is, who runs it, how it is funded, and what happens to their contract, and can upload a contract or view a sample report.

**Independent Test**: Load the page; confirm the hero states what the service does with one trust signal, two CTAs, and a below-fold entity+funding+free line; the how-it-works, who-we-are/funding, privacy, and footer sections are present; a contract can be uploaded (status announced to screen readers); and the sample report opens. (Sections §1, §3, §4, §5, Footer.)

### Implementation for User Story 1

- [ ] T024 [P] [US1] Fill disclosure content in `src/content/ro/disclosures.ts`: legal entity (name/jurisdiction=Moldova/reg#/contact), funding (free check + contingency fee %, recovery routes, under licensed professionals — no "no % of refund" claim), people (incl. ≥1 licensed legal professional, credentials), model (named provider + 3 failure modes), privacy (fields stripped/retained, processing location, retention, deletion, training/sharing, lender-never-contacted) — real operator values or flagged placeholders (FR-024–FR-037)
- [ ] T025 [P] [US1] Romanian copy for hero/how-it-works/who/privacy/footer in `src/i18n/locales/ro/*.json`
- [ ] T026 [US1] Hero section in `src/sections/Hero/` + `.module.css`: single (non-stacked) headline, one-paragraph subhead (automated + anonymized + result is yours), one trust signal, primary CTA "Check my contract" + secondary "See a sample report", below-fold line naming entity + funding + free check (FR-019–FR-022)
- [ ] T027 [US1] HowItWorks section in `src/sections/HowItWorks/` + `.module.css`: 3 steps (upload — fields stripped/retained + where processed; automated analysis — software not humans + named provider + Moldovan regs; report contents) (FR-023–FR-026)
- [ ] T028 [US1] WhoWeAreFunding section in `src/sections/WhoWeAreFunding/` + `.module.css`: 4 blocks (who built it + credentials + about link; legal entity; funding with contingency fee disclosed here; "what we are not" — not debt consolidator/settlement/law firm, free to check) placed high in the page (FR-027–FR-031)
- [ ] T029 [US1] ContractHandling section §5 in `src/sections/ContractHandling/` + `.module.css`: privacy specifics as a clean Panel (fields stripped/retained; processing location + any third-party provider; retention + deletion; training/sharing/aggregation; lender never contacted; no animated preview) + link to data-handling doc (FR-032–FR-037)
- [ ] T030 [US1] SiteFooter in `src/sections/SiteFooter/` + `.module.css`: entity + jurisdiction + reg#; real contact email + postal address; regulatory standing; links to data handling/methodology/terms/accessibility/languages; guidance-not-verdict disclaimer; non-CTA closing line (FR-042–FR-045)
- [ ] T031 [P] [US1] Upload validation in `src/lib/validateUpload.ts`: MIME allowlist, max size, empty-file check, missing-consent check (FR-040, contracts/upload-intake.md)
- [ ] T032 [P] [US1] Upload client in `src/lib/uploadClient.ts`: multipart POST to `VITE_INTAKE_BASE_URL` per contracts/upload-intake.md; map 202 → accepted, 4xx/5xx/network → rejected with plain-language reason
- [ ] T033 [US1] UploadWidget island in `src/components/UploadWidget/` + `.module.css`: native file input, two consent checkboxes, the UploadSubmission state machine, aria-live status messages for the client-controlled stages (selected → validating → uploading → received/queued); lazy-loadable — depends on T020, T031, T032 (FR-038, FR-039)
- [ ] T034 [US1] Wire the hero primary CTA to lazy-load and open the UploadWidget in `src/routes/Home.tsx` / Hero (FR-021, FR-038)
- [ ] T035 [P] [US1] SampleReport route content in `src/routes/SampleReport.tsx` + sample document in `public/docs/`, reachable from the hero secondary CTA (FR-041)
- [ ] T036 [P] [US1] Footer document pages with real content: `src/routes/{DataHandling,Methodology,Terms,Accessibility,About}.tsx` (DataHandling aligns with §5; About is the longer "who built it" page) (FR-028, FR-043)
- [ ] T037 [US1] Compose `src/routes/Home.tsx` with US1 sections in canonical order: Hero → HowItWorks → WhoWeAreFunding → ContractHandling → SiteFooter (FR-001)
- [ ] T038 [P] [US1] Accessibility tests in `tests/a11y/` for US1 sections (axe) + assert the upload widget announces each state change to the live region (SC-008)
- [ ] T039 [P] [US1] Content lint in `tests/content/` for US1 copy: no exclamation points / banned phrases, the "no percentage of any refund" phrase is banned, and all required disclosure slots are present (FR-002, FR-031, SC-007)

**Checkpoint**: User Story 1 is a fully functional, credible MVP page that accepts an upload — demoable on its own.

---

## Phase 4: User Story 2 - Recognize the situation and understand the outcome (Priority: P2)

**Goal**: The unaware borrower recognizes their situation from concrete patterns (§2), and any borrower understands what the report contains and what happens after each outcome, including the optional recovery path (§6).

**Independent Test**: Show §2 and §6; a reader who suspected nothing can match a named pattern to their loan, and any reader can state what the report contains and the defined next step for each of the three outcomes.

### Implementation for User Story 2

- [ ] T040 [P] [US2] Abuse-pattern content in `src/content/ro/patterns.ts`: 3–4 named patterns, one explanatory sentence each (from the approved set), plus the fixed closing declarative line; no blame-absolving phrasing (FR-046, FR-047)
- [ ] T041 [P] [US2] Report + after-report content in `src/content/ro/report.ts`: clause statuses (compliant/questionable/likely-unlawful + regulation cited), overpayment estimate with calculation shown, calm timing note, recommended next step; three outcome paths (likely-unlawful → next paths + cost/payee + contingency disclosure; ambiguous → resolving info + human review; nothing-found → one-page summary, not a dead end) (FR-048–FR-051)
- [ ] T042 [P] [US2] Romanian copy for §2 and §6 in `src/i18n/locales/ro/*.json`
- [ ] T043 [US2] WhyThisExists section in `src/sections/WhyThisExists/` + `.module.css` (renders patterns + closing line) — depends on T040
- [ ] T044 [US2] ReportAndAfter section in `src/sections/ReportAndAfter/` + `.module.css` (report deliverable + three outcome paths) — depends on T041
- [ ] T045 [US2] Insert §2 (after Hero) and §6 (after ContractHandling) into `src/routes/Home.tsx` in canonical order (FR-001) — depends on T043, T044
- [ ] T046 [P] [US2] Accessibility tests in `tests/a11y/` for §2 and §6 (SC-008)
- [ ] T047 [P] [US2] Content lint in `tests/content/`: patterns are single sentences, no "many people don't realize"/blame phrasing, and the after-report content discloses the contingency fee (FR-003, FR-049, SC-007)

**Checkpoint**: User Stories 1 and 2 both work independently; the page now converts the unaware and the resigned.

---

## Phase 5: User Story 3 - Resolve objections and leave with value (Priority: P3)

**Goal**: A skeptical reader finds plain answers (FAQ §7); a visitor not ready to upload gets value via an off-ramp; supported languages are named and the architecture is language-ready.

**Independent Test**: Show the FAQ and off-ramps; the 10 questions appear in order with 2–4-sentence period-terminated answers; a non-uploading visitor can obtain a sample report, an abuse-pattern guide, or a newsletter; the footer names supported languages (Romanian).

### Implementation for User Story 3

- [ ] T048 [P] [US3] FAQ content in `src/content/ro/faq.ts`: exactly the 10 questions from FR-052 in order, each answered in 2–4 plain sentences ending in a period (not a CTA)
- [ ] T049 [P] [US3] Romanian copy for FAQ and off-ramp in `src/i18n/locales/ro/*.json`
- [ ] T050 [US3] Faq section in `src/sections/Faq/` + `.module.css` using the Disclosure primitive, rendering the 10 items in order — depends on T048, T018
- [ ] T051 [P] [US3] Abuse-pattern guide document in `public/docs/` + labeled download link (FR-053)
- [ ] T052 [P] [US3] Newsletter signup in `src/components/Newsletter/` + `src/lib/newsletterClient.ts` per contracts/newsletter-subscribe.md (email + locale, double opt-in messaging, anonymous, plain-language result)
- [ ] T053 [US3] OffRamp section in `src/sections/OffRamp/` + `.module.css` presenting sample report + guide + newsletter as alternatives (not a funnel) — depends on T051, T052 (FR-053, Non-Goals)
- [ ] T054 [US3] Insert §7 (Faq, before footer) and the off-ramp into `src/routes/Home.tsx` in canonical order — depends on T050, T053 (FR-001)
- [ ] T055 [US3] Multilingual readiness: footer names supported languages (ro) and wires the LanguagePicker; document the add-a-language flow (review gate) in `quickstart.md`; ensure unreviewed locales are not published (FR-054) — depends on T021
- [ ] T056 [P] [US3] FAQ-format content lint in `tests/content/`: exactly 10 questions in the required order, answers 2–4 sentences ending in a period, no CTA (FR-052, SC-013)
- [ ] T057 [P] [US3] Accessibility tests in `tests/a11y/` for FAQ and off-ramp (SC-008)

**Checkpoint**: All three user stories are independently functional; the full page is complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Whole-page acceptance gates tied to the cross-cutting requirements and success criteria

- [ ] T058 [P] Reduced-motion audit in `tests/e2e/`: with `prefers-reduced-motion`, no non-essential motion plays and all content remains understandable (SC-009, FR-013)
- [ ] T059 [P] Responsive verification in `tests/e2e/`: all sections and disclosures legible at 360px width on current browsers (SC-010, FR-017)
- [ ] T060 [P] Full WCAG 2.2 AA pass: axe across all routes + manual keyboard/focus + screen-reader review (SC-008, FR-016)
- [ ] T061 [P] Reading-level check (~B1/grade-8) for all Romanian copy in `tests/content/` (SC-011, FR-007)
- [ ] T062 [P] Build the claims register in `docs/claims-register.md` mapping each factual claim to a verifiable source, and lint that no unmapped claim ships (SC-012, FR-006)
- [ ] T063 [P] Tone & imagery audit: zero exclamation/urgency/therapeutic/emotional-ask phrasing; no prohibited imagery (stock/testimonial photos, scales/gavels/courthouses, navy-gold gravitas, neon/glassmorphism); exactly one accent token in use (SC-007, FR-002–FR-005, FR-014, FR-015)
- [ ] T064 UX acceptance checklist in `docs/`: usability script verifying one-scroll understanding (SC-001), honest skeptic answers to catch/data/after-report (SC-002), all disclosures findable incl. funding within 20s (SC-003), non-uploader value via off-ramp (SC-004), each persona finds its section + next step (SC-005), and reaching upload from the hero in one action (SC-006)
- [ ] T065 Operator-content completeness check: confirm every required disclosure slot holds a real, verifiable value before launch (legal entity, model provider, contingency %, named licensed professionals, funding source, law citations) — blocks release
- [ ] T066 [P] Write `README.md` and run the `quickstart.md` validation (install, dev, build, preview, test, lint, lint:content)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Stories (Phases 3–5)**: All depend on Foundational
  - US1 (P1) is the MVP; US2 and US3 build on the same shell but are independently testable
  - Recommended order P1 → P2 → P3; with multiple developers they can run in parallel after Phase 2
- **Polish (Phase 6)**: Depends on the user stories being implemented

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2. No dependency on other stories.
- **US2 (P2)**: Starts after Phase 2. Adds §2/§6 to `Home.tsx`; independently testable. Only soft conflict with US1 is `src/routes/Home.tsx` composition (T045 vs T037) — sequence those edits.
- **US3 (P3)**: Starts after Phase 2. Adds §7/off-ramp to `Home.tsx`; independently testable. Same `Home.tsx` sequencing note (T054).

### Within Each User Story

- Content + i18n copy (mostly [P]) → section components → composition into `Home.tsx` → a11y/content verification
- The shared `src/routes/Home.tsx` is touched by T037, T045, T054 — these must be sequenced, not parallel

### Parallel Opportunities

- Setup: T002–T005, T007, T008 in parallel after T001
- Foundational: T009–T012 in parallel; primitives T016–T021 in parallel once tokens (T009) exist
- US1: T024, T025, T031, T032, T035, T036 in parallel; sections T026–T030 are separate files (parallelizable) but all precede composition T037
- US2: T040, T041, T042 in parallel
- US3: T048, T049, T051, T052 in parallel
- Polish: T058–T063, T066 in parallel

---

## Parallel Example: User Story 1

```bash
# Content and plumbing (different files, no interdependencies):
Task: "Fill disclosure content in src/content/ro/disclosures.ts"
Task: "Romanian copy for hero/how-it-works/who/privacy/footer in src/i18n/locales/ro/*.json"
Task: "Upload validation in src/lib/validateUpload.ts"
Task: "Upload client in src/lib/uploadClient.ts"
Task: "SampleReport route content in src/routes/SampleReport.tsx"
Task: "Footer document pages in src/routes/{DataHandling,Methodology,Terms,Accessibility,About}.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 (Setup) and Phase 2 (Foundational)
2. Complete Phase 3 (US1)
3. **STOP and VALIDATE**: a credible page that explains itself and accepts an upload
4. Demo / deploy

### Incremental Delivery

1. Setup + Foundational → shell ready
2. US1 → credible core + upload (MVP) → demo
3. US2 → recognition + outcomes → demo
4. US3 → FAQ + off-ramps + language readiness → demo
5. Polish → run all acceptance gates (a11y, reduced motion, responsive, tone, reading level, claims, comprehension)

---

## Notes

- The rendered page always follows the canonical section order (FR-001); earlier phases ship with later-phase sections absent but present sections keep their order. `Home.tsx` edits (T037 → T045 → T054) are sequential for this reason.
- Final copy is blocked on operator-supplied disclosure values (T065). The content schema (T022) and validation (T023, T039) fail loudly if a required slot is empty, so the build cannot silently ship missing disclosures.
- `[P]` = different files, no incomplete dependencies. Commit after each task or logical group.
- Accessibility and content-lint tasks are acceptance gates required by the success criteria, not optional extras.
