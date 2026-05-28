# overpay — loan-analysis landing page

A single static HTML landing page, in Romanian, for a Moldovan microfinance
contract-analysis service. The page explains the common abuse patterns and
includes an interactive recovery estimator. No build step, no JavaScript
framework — just one self-contained `index.html` with inlined CSS and a small
vanilla-JS island for the theme toggle, mobile menu, and estimator.

## Structure

| What | Where |
|------|-------|
| The page (markup + inlined CSS + JS) | [`index.html`](index.html) |
| Self-hosted Inter font subsets | [`fonts/`](fonts/) (see [`fonts/README.md`](fonts/README.md)) |
| Standalone document pages | [`docs/`](docs/) |

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 4173
# then visit http://localhost:4173
```

## Deploy

GitHub Pages publishes the repository root via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to
`main`.

## License

Internal — not yet published.
