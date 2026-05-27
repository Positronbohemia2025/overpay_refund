import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './Disclosure.module.css';

/**
 * Accessible expand/collapse (T018). A header button toggles aria-expanded and
 * controls the panel via aria-controls; the panel is hidden with [hidden] so it
 * is removed from the accessibility tree when collapsed (WCAG 4.1.2).
 */
interface DisclosureProps {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  /** Heading level for the trigger wrapper, for correct document outline. */
  headingLevel?: 2 | 3 | 4;
}

export function Disclosure({
  summary,
  children,
  defaultOpen = false,
  headingLevel = 3,
}: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();
  const Heading = `h${headingLevel}` as const;

  return (
    <div className={styles.disclosure}>
      <Heading className={styles.heading}>
        <button
          type="button"
          id={buttonId}
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.summary}>{summary}</span>
          <span className={styles.icon} aria-hidden="true" data-open={open} />
        </button>
      </Heading>
      <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel} hidden={!open}>
        <div className={styles.panelInner}>{children}</div>
      </div>
    </div>
  );
}
