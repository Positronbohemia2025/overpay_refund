/**
 * Operator-supplied content marker (research §11, data-model.md).
 *
 * Several required disclosures are real values the operator must supply before
 * launch (registered entity name, registration number, contact, contingency-fee
 * percentage, named people/credentials, model provider, retention durations).
 * They are seeded with a clearly-flagged placeholder so the structural content
 * validation (T023) passes — the slots ARE present — while the operator-content
 * completeness check (T065) detects the markers and BLOCKS release until real,
 * verifiable values replace them. Nothing ships silently empty.
 */
export const OPERATOR_TODO_PREFIX = 'TODO(operator):';

export function operatorTodo(label: string): string {
  return `${OPERATOR_TODO_PREFIX} ${label}`;
}

export function isOperatorTodo(value: unknown): boolean {
  return typeof value === 'string' && value.startsWith(OPERATOR_TODO_PREFIX);
}

/** Recursively collect every operator-placeholder string found in a value. */
export function collectOperatorTodos(value: unknown, path = ''): string[] {
  if (typeof value === 'string') {
    return isOperatorTodo(value) ? [`${path}: ${value}`] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => collectOperatorTodos(v, `${path}[${i}]`));
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) =>
      collectOperatorTodos(v, path ? `${path}.${k}` : k),
    );
  }
  return [];
}
