import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Unit/component + a11y (axe) tests run in jsdom; content-lint tests are plain
// node assertions but share this config. e2e (Playwright) is configured separately.
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
  },
});
