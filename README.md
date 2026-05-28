# overpay — loan-analysis landing page

A single-page, Romanian-language marketing-and-intake site for a Moldovan
microfinance contract-analysis service. The page explains what the service does,
who is accountable, how it is funded, and what happens to an uploaded contract;
the borrower can then upload a contract to start a free automated check.

The full feature specification, plan, data model, contracts, and task list live
under [`specs/001-loan-analysis-landing/`](specs/001-loan-analysis-landing/).

## Prerequisites

- Node.js 20 +
- npm (pnpm also works)
- An intake-endpoint URL for local testing (or a mock)

## Setup

```bash
npm install
cp .env.example .env.local        # set VITE_INTAKE_BASE_URL
```

Optional: download the Inter `woff2` subsets into [`public/fonts/`](public/fonts/README.md) for self-hosted typography. The page falls back to the system humanist-sans stack until they're present.

## Commands

```bash
npm run dev          # Vite dev server with HMR
npm run build        # type-check (tsc -b) + production bundle to dist/
npm run preview      # serve the production build locally on :4173
npm test             # vitest: unit + a11y (axe)
npm run test:e2e     # Playwright: reduced-motion + 360-px + WCAG sweep
npm run lint         # ESLint (incl. jsx-a11y strict) + stylelint
npm run lint:content # tone, FAQ format, reading-level, claims register
npm run lint:release # release-blocking — operator content + claim sources (see below)
npm run typecheck    # tsc -b across app + node configs
```

Playwright needs its browser binaries the first time: `npx playwright install chromium`.

## Quality gates

The default CI run is `lint + typecheck + lint:content + test + build`, and that
must stay green at all times.

### Release-blocking gates

`npm run lint:release` is a **separate gate** that must pass before each release:

- every required disclosure slot must hold a real, verifiable value
  (`src/content/ro/disclosures.ts`);
- every row in `docs/claims-register.md` must have a real source citation, not
  an operator placeholder.

The release gate is intentionally **expected to fail** in the current working
tree because the disclosures still carry `TODO(operator): …` markers in place
of operator-supplied facts (registered name, registration number, contact,
contingency-fee percentage, named legal professionals, etc.). The operator fills
those, then the release gate passes. See
[`docs/ux-acceptance.md`](docs/ux-acceptance.md) for the human checklist that
goes with this automated one.

### e2e gates

Run `npm run test:e2e` after a production build. The Playwright suite verifies:

- with `prefers-reduced-motion: reduce`, no non-essential motion plays and
  the page remains fully understandable (SC-009);
- every section and disclosure stays legible at a 360 px viewport (SC-010);
- axe finds no blocking WCAG 2.2 AA violations across the home page and every
  footer-linked document (SC-008).

## Where things live

| What | Where |
|------|-------|
| Design tokens (palette, radii, shadows, type scale) | [`src/styles/tokens.css`](src/styles/tokens.css) |
| Sections in canonical order (FR-001) | [`src/sections/*`](src/sections/) composed by [`src/routes/Home.tsx`](src/routes/Home.tsx) |
| Upload island (lazy-loaded) | [`src/components/UploadWidget/`](src/components/UploadWidget/) |
| Disclosure schema | [`src/content/ro/disclosures.ts`](src/content/ro/disclosures.ts) |
| Abuse patterns + report content | [`src/content/ro/patterns.ts`](src/content/ro/patterns.ts), [`src/content/ro/report.ts`](src/content/ro/report.ts), [`src/content/ro/faq.ts`](src/content/ro/faq.ts) |
| Copy (i18n JSON) | [`src/i18n/locales/ro/*.json`](src/i18n/locales/ro/) |
| Static documents | [`public/docs/`](public/docs/) (sample report, abuse-pattern guide) |
| Claims register | [`docs/claims-register.md`](docs/claims-register.md) |

## Adding a language

The architecture supports adding languages; only native-speaker-reviewed
locales are ever exposed (FR-054 — enforced by
[`getPublishedLocales`](src/i18n/locales.ts)).

1. Create `src/i18n/locales/<code>/` with translated JSON catalogs and translated
   structured content (`patterns.ts`, `faq.ts`, `report.ts`, `disclosures.ts`).
2. Have a native speaker review every string.
3. Register the locale in [`src/i18n/locales.ts`](src/i18n/locales.ts) with
   `reviewedByNativeSpeaker: true`. Unreviewed locales are filtered out at the
   single source-of-truth and never reach the UI.
4. Confirm the font subset covers any new script (see
   [`public/fonts/README.md`](public/fonts/README.md)).

## License

Internal — not yet published.
