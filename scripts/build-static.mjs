// Build a self-contained no-JS static HTML page from the React source.
//
// Pipeline:
//   1. Vite SSR build of src/static-entry.tsx → a Node-importable bundle
//      that also emits the CSS bundle (ssrEmitAssets).
//   2. Import the bundle, call ReactDOMServer.renderToStaticMarkup on the
//      default export → HTML string with CSS-Module hashed class names.
//   3. Read the emitted CSS file, inline it into a single <style> block.
//   4. Copy public/ assets (fonts, favicon, og.png) to dist/.
//   5. Write dist/index.html. No <script> tags, no separate JS files.

import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import {
  cp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { join, resolve } from 'node:path';

const root = process.cwd();
const SSR_OUT = resolve(root, '.tmp-ssr-build');
const DIST = resolve(root, 'dist');

async function buildSsr() {
  await build({
    root,
    plugins: [react()],
    logLevel: 'warn',
    build: {
      ssr: 'src/static-entry.tsx',
      ssrEmitAssets: true,
      cssCodeSplit: false,
      outDir: SSR_OUT,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          format: 'esm',
          entryFileNames: 'static-entry.mjs',
          assetFileNames: 'assets/[name][extname]',
        },
      },
    },
  });
}

async function loadComponent() {
  const entryUrl = pathToFileURL(join(SSR_OUT, 'static-entry.mjs')).href;
  const mod = await import(entryUrl);
  if (typeof mod.default !== 'function') {
    throw new Error('static-entry.tsx must default-export a React component');
  }
  return mod.default;
}

async function readBundledCss() {
  const assetsDir = join(SSR_OUT, 'assets');
  if (!existsSync(assetsDir)) {
    throw new Error(`Expected CSS in ${assetsDir} but the directory is missing`);
  }
  const files = await readdir(assetsDir);
  const cssFiles = files.filter((f) => f.endsWith('.css'));
  if (cssFiles.length === 0) {
    throw new Error('No CSS file was emitted by the SSR build');
  }
  const chunks = await Promise.all(
    cssFiles.map((f) => readFile(join(assetsDir, f), 'utf8')),
  );
  return chunks.join('\n');
}

function htmlShell({ body, css }) {
  return `<!doctype html>
<html lang="ro">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
    <meta name="theme-color" content="#f6f7f9" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#0b1220" media="(prefers-color-scheme: dark)" />
    <meta
      name="description"
      content="Analiză automată a contractelor de microcreditare din Moldova: află dacă ai fost taxat cu dobânzi, comisioane sau clauze nelegale."
    />
    <link
      rel="preload"
      href="/fonts/inter-latin-ext-400.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <title>Verifică-ți contractul de credit</title>
    <style>${css}</style>
  </head>
  <body>${body}</body>
</html>
`;
}

async function copyPublicAssets() {
  const publicDir = resolve(root, 'public');
  if (!existsSync(publicDir)) return;
  await cp(publicDir, DIST, { recursive: true });
}

async function main() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  await buildSsr();
  const StaticHome = await loadComponent();
  const body = renderToStaticMarkup(createElement(StaticHome));
  const css = await readBundledCss();

  await copyPublicAssets();
  await writeFile(join(DIST, 'index.html'), htmlShell({ body, css }), 'utf8');
  await rm(SSR_OUT, { recursive: true, force: true });

  console.log(`Static build complete → dist/index.html`);
  console.log(`  body: ${body.length} bytes, css: ${css.length} bytes`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
