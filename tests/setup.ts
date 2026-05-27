import '@testing-library/jest-dom/vitest';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as axeMatchers from 'vitest-axe/matchers';

// axe accessibility matchers (toHaveNoViolations) available in every test.
expect.extend(axeMatchers);

afterEach(() => {
  cleanup();
});
