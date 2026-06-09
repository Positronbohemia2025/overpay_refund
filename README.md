# overpay — loan-analysis landing page

A static HTML landing page for a Moldovan microfinance contract-analysis
service, available in Romanian and Russian. The page explains the common abuse
patterns and includes an interactive recovery estimator. No build step, no
JavaScript framework — each language is a self-contained HTML file with inlined
CSS and a small vanilla-JS island for the theme toggle, mobile menu, and
estimator.

## Structure

| What | Where |
|------|-------|
| Language router (redirects to `ro`/`ru`) | [`index.html`](index.html) |
| Romanian page | [`ro/index.html`](ro/index.html) |
| Russian page | [`ru/index.html`](ru/index.html) |
| Self-hosted Inter font subsets | [`fonts/`](fonts/) (see [`fonts/README.md`](fonts/README.md)) |
| Standalone document pages | [`docs/`](docs/) |

The two language pages are independent (no shared template, no build). **Edit
content in both.**

## Language selection

The root [`index.html`](index.html) redirects to the visitor's language: a saved
choice wins, otherwise the browser's preferred language (`ro`/`ru`), otherwise
Romanian. Visiting a language page saves that choice for next time.

## Local preview

Serve the folder (root redirects, so visit a language path directly to skip it):

```bash
python3 -m http.server 4173
# then visit http://localhost:4173/ro/  or  /ru/
```

## Deploy

GitHub Pages publishes the repository root via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to
`main`.

## License

Internal — not yet published.
