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
  tone?: 'default' | 'sunken' | 'elevated';
  width?: 'default' | 'narrow' | 'wide';
  className?: string;
  children: ReactNode;
}

const toneClass = { default: '', sunken: 'sunken', elevated: 'elevated' } as const;
const widthClass = { default: 'inner', narrow: 'innerNarrow', wide: 'innerWide' } as const;

export function Section({
  id,
  titleId,
  tone = 'default',
  width = 'default',
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={[styles.section, styles[toneClass[tone]], className].filter(Boolean).join(' ')}
    >
      <div className={styles[widthClass[width]]}>{children}</div>
    </section>
  );
}
