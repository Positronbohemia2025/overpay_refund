# overpay Development Guidelines

## Stack

Static HTML landing page, one fully self-contained file per language. No
framework, no build step, no dependencies. Each language page contains all
markup, inlined CSS, and a small vanilla-JS island (theme toggle, mobile menu,
recovery estimator).

## Project Structure

```text
index.html        # language router — JS/meta redirect to /ro/ or /ru/ (noindex)
ro/index.html     # Romanian page (content baked in, fully standalone)
ru/index.html     # Russian page (content baked in, fully standalone)
.nojekyll         # serve files verbatim on GitHub Pages
fonts/            # self-hosted Inter woff2 subsets (optional; system font fallback)
docs/             # standalone document pages
```

## Internationalization (i18n)

- There is **no shared template and no build step** — `ro/index.html` and
  `ru/index.html` are independent files. **Any content/markup change must be made
  in both**, keeping the two structurally identical (only the human-readable text
  differs). The structure was originally generated from a single source, but the
  generator is intentionally not kept.
- Language is chosen by the root `index.html` router: a saved choice
  (`localStorage` `overpay.lang`) wins, else the browser's preferred language
  (`navigator.languages`, matched to `ro`/`ru`), else Romanian. Each language
  page re-saves `overpay.lang` on load so the choice sticks.
- The in-page language switch is plain cross-links between `../ro/` and `../ru/`
  (no client-side text swapping), so there is no translation flash.
- Each page hardcodes `<html lang>`, `<title>`, `<meta name="description">`, and
  `<link rel="alternate" hreflang>` for its own language.

## Preview

```bash
python3 -m http.server 4173
```

## Code Style

- Self-contained language pages (`ro/index.html`, `ru/index.html`). Keep CSS and
  JS inlined unless the files grow unwieldy.
- CSS custom properties drive theming (`:root` for light, `[data-theme='dark']`
  for dark). Theme is persisted to `localStorage` under `overpay.theme` and
  applied pre-paint by the inline script in `<head>` to avoid FOUC.
- Vanilla JS only. No external scripts.

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
