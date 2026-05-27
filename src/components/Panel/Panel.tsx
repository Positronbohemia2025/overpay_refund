import type { ElementType, ReactNode } from 'react';
import styles from './Panel.module.css';

/**
 * Panel primitive (T017 / FR-011): rounded corners + soft shadow, never a hard
 * border as the primary separator. `as` lets a panel be a semantic <section>,
 * <article>, etc. without losing the look.
 */
interface PanelProps {
  as?: ElementType;
  tone?: 'surface' | 'sunken';
  className?: string;
  children: ReactNode;
  id?: string;
  'aria-labelledby'?: string;
  'aria-label'?: string;
}

export function Panel({
  as: Tag = 'div',
  tone = 'surface',
  className,
  children,
  ...rest
}: PanelProps) {
  return (
    <Tag className={[styles.panel, styles[tone], className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  );
}
