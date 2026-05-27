/** Flatten a nested i18n catalog into a record of dotted-key → string. */
export function flattenStrings(obj: unknown, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  if (typeof obj === 'string') {
    out[prefix || '.'] = obj;
    return out;
  }
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      Object.assign(out, flattenStrings(v, prefix ? `${prefix}.${k}` : k));
    }
  }
  return out;
}

/** Merge several catalogs into one flat record, namespacing by catalog name. */
export function flattenCatalogs(catalogs: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [ns, cat] of Object.entries(catalogs)) {
    Object.assign(out, flattenStrings(cat, ns));
  }
  return out;
}
