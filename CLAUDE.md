# overpay Development Guidelines

## Stack

Single static HTML landing page. No framework, no build step, no dependencies.
`index.html` contains all markup, inlined CSS, and a small vanilla-JS island
(theme toggle, mobile menu, recovery estimator).

## Project Structure

```text
index.html        # the entire page
fonts/            # self-hosted Inter woff2 subsets (optional; system font fallback)
docs/             # standalone document pages
```

## Preview

```bash
python3 -m http.server 4173
```

## Code Style

- One self-contained `index.html`. Keep CSS and JS inlined unless the file grows
  unwieldy.
- CSS custom properties drive theming (`:root` for light, `[data-theme='dark']`
  for dark). Theme is persisted to `localStorage` under `overpay.theme` and
  applied pre-paint by the inline script in `<head>` to avoid FOUC.
- Vanilla JS only. No external scripts.

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
