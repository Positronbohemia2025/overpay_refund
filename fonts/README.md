# Self-hosted fonts

The page uses **Inter**, self-hosted (no font CDN — privacy + performance, research §6).
Add these woff2 subset files here; the `@font-face` rules inlined in
`index.html` reference them and `index.html` preloads the primary
`latin-ext` weight.

| File | Weight | Subset | Notes |
|------|--------|--------|-------|
| `inter-latin-400.woff2` | 400 | latin | body |
| `inter-latin-ext-400.woff2` | 400 | latin-ext | **Romanian ș/ț** (U+0218–021B), preloaded |
| `inter-latin-600.woff2` | 600 | latin | headings |
| `inter-latin-ext-600.woff2` | 600 | latin-ext | headings, Romanian diacritics |

Generate the subsets from the upstream Inter release with a tool such as
`fonttools`/`pyftsubset`, keeping the `latin` and `latin-ext` ranges only.

Until the files are added, the system humanist-sans fallback in `--font-body`
renders the page legibly (`font-display: swap` avoids invisible text). The
`latin-ext` subset is required so Romanian comma-below diacritics render correctly.
