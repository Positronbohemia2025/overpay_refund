/** The set of pages exercised by every e2e suite. */
export const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'data-handling', path: '/data-handling' },
  { name: 'methodology', path: '/methodology' },
  { name: 'terms', path: '/terms' },
  { name: 'accessibility', path: '/accessibility' },
] as const;
