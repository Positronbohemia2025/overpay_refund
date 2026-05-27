# Quickstart: Loan-Analysis Landing Page

## Prerequisites
- Node.js 20+ and a package manager (pnpm recommended; npm works).
- An intake endpoint URL for local testing (or the dev mock).

## Setup
```bash
pnpm install
cp .env.example .env.local   # set VITE_INTAKE_BASE_URL
```

## Common commands
```bash
pnpm dev            # Vite dev server (HMR)
pnpm build          # vite build → dist/
pnpm preview        # serve the built output locally
pnpm test           # Vitest unit/component + a11y (axe)
pnpm test:e2e       # Playwright e2e (Lighthouse optional, informational)
pnpm lint           # ESLint (incl. jsx-a11y) + stylelint
pnpm lint:content   # tone, FAQ format, reading-level, claims-register checks
pnpm typecheck      # tsc --noEmit
```

## Environment variables
- `VITE_INTAKE_BASE_URL` — base URL of the analysis intake service (`contracts/upload-intake.md`).
- `VITE_NEWSLETTER_BASE_URL` — optional; defaults to the intake base (Phase 3).
- `VITE_MAX_UPLOAD_BYTES` — optional override of the 15 MB default.

## Where things live
- **Design tokens** (palette, radii, shadows, type scale): `src/styles/tokens.css`. The single accent color is one token; change it in one place.
- **Sections** (canonical order, FR-001): `src/sections/*`, composed by `src/routes/Home.tsx`.
- **Upload island**: `src/components/UploadWidget/` (lazy-loaded; the only hydrated interactive component).
- **Content & disclosures**: `src/content/ro/` (patterns, FAQ, report structure, after-report paths) and the typed disclosure slots (legal entity, funding, people, model, privacy).
- **Copy strings (i18n)**: `src/i18n/locales/ro/*.json`.
- **Footer documents**: `src/routes/{SampleReport,About,DataHandling,Methodology,Terms,Accessibility}.tsx`; downloadable artifacts in `public/docs/`.

## Adding a language
1. Add `src/i18n/locales/<code>/` with the translated JSON catalogs and translated content.
2. Have a **native speaker** review it; set `reviewedByNativeSpeaker: true` in the locale entry (FR-054). Unreviewed locales are not published.
3. Add the locale to the router and the footer language list.
4. Confirm the font subset covers the new script.

## Operator content checklist (build blocks without these)
Provide real, verifiable values for: registered entity name + registration number + contact email + postal address; regulatory standing; named model provider (or "in-house"); contingency-fee percentage; responsible individuals + licensed legal professionals with credentials; the funding source that keeps the check free; and the Moldovan law citations behind each legal claim. The content checks fail if any required slot is empty (see `data-model.md`).

## Quality gates (CI)
- **Accessibility**: WCAG 2.2 AA — axe in unit tests + Lighthouse Accessibility = 100 (SC-008).
- **Performance**: No enforced budget. Old/low-end devices and constrained networks are out of scope; just keep the bundle sensible and lazy-load the upload widget.
- **Reduced motion**: with `prefers-reduced-motion`, no non-essential motion (SC-009).
- **Content**: no exclamation points / banned phrases; FAQ = the 10 questions in order with 2–4-sentence period-terminated answers; copy at ~B1; every claim in the claims register (SC-007, SC-011, SC-012, SC-013).
- **Responsive**: legible at 360px width on current browsers (SC-010).
