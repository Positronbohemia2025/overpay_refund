// Adds vitest-axe's `toHaveNoViolations` matcher to the vitest Assertion type
// (registered at runtime in tests/setup.ts). vitest 3 reads matcher types from
// the 'vitest' module augmentation rather than the legacy global Vi namespace.
import type { AxeMatchers } from 'vitest-axe/matchers';

// `T` must match vitest's Assertion<T = any> exactly for declaration merging,
// and the augmenting interfaces are deliberately empty.
/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
declare module 'vitest' {
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
