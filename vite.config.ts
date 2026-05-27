import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Client-rendered SPA. The UploadWidget is lazy-loaded (see src/sections/Hero),
// so it is naturally code-split into its own chunk and does not affect first paint.
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    sourcemap: true,
  },
});
