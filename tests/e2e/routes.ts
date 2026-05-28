/** The set of pages exercised by every e2e suite. */
export const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'sample-report', path: '/raport-model' },
  { name: 'about', path: '/despre' },
  { name: 'data-handling', path: '/date' },
  { name: 'methodology', path: '/metodologie' },
  { name: 'terms', path: '/termeni' },
  { name: 'accessibility', path: '/accesibilitate' },
] as const;
