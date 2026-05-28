import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Single-file build: vite-plugin-singlefile inlines the bundled JS and CSS
// into dist/index.html so the deploy artifact is one self-contained HTML.
// Fonts and other binary assets in public/ stay as separate files (inlining
// them as base64 inflates the HTML by ~33% with no benefit).
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    target: 'es2022',
    // Sourcemaps and code-splitting are incompatible with the single-file
    // output; the plugin disables splitting itself and we drop sourcemaps
    // to keep the artifact lean.
    sourcemap: false,
  },
});
