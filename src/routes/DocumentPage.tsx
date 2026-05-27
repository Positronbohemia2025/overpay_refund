import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './DocumentPage.module.css';

/**
 * Shared scaffold for the footer-linked document routes (about, data-handling,
 * methodology, terms, accessibility, sample report). Real content is filled in
 * T035/T036; this gives every page a consistent measure, heading, and a way back.
 */
export function DocumentPage({ title, children }: { title: string; children: ReactNode }) {
  const { t } = useTranslation('common');
  return (
    <article className={styles.doc}>
      <Link to="/" className={styles.back}>
        ← {t('actions.back')}
      </Link>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.body}>{children}</div>
    </article>
  );
}
