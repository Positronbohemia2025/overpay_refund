/**
 * Stylelint for CSS Modules + design tokens (T003).
 * The single-accent palette, radii, shadows, and spacing all flow from
 * src/styles/tokens.css; component CSS Modules consume them via var(--token).
 */
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    // CSS Modules pseudo-classes / properties.
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
    // Class names in modules are camelCase to match the JS import shape.
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*$',
      { message: 'Expected camelCase class name for CSS Modules' },
    ],
    // Tokens live in :root in tokens.css; allow custom-property definitions there.
    'custom-property-pattern': null,
    // We rely on the design-token color set, not literal hex, in component modules.
    'color-no-hex': null,
    'declaration-block-no-redundant-longhand-properties': null,
  },
  ignoreFiles: ['dist/**', 'coverage/**', 'node_modules/**'],
};
