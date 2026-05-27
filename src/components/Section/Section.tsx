import type { ReactNode } from 'react';
import styles from './Section.module.css';

/**
 * Section layout helper: consistent vertical rhythm, readable measure, and a
 * labelled landmark. Keeps the long vertical rhythm / generous whitespace rule
 * (FR-011) in one place so every landing-page section is spaced the same way.
 */
interface SectionProps {
  id: string;
  titleId?: string;
  tone?: 'default' | 'sunken';
  width?: 'default' | 'narrow';
  children: ReactNode;
}

export function Section({ id, titleId, tone = 'default', width = 'default', children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={[styles.section, tone === 'sunken' ? styles.sunken : ''].filter(Boolean).join(' ')}
    >
      <div className={width === 'narrow' ? styles.innerNarrow : styles.inner}>{children}</div>
    </section>
  );
}
