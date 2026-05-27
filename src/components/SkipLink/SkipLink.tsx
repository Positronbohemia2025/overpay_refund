import { useTranslation } from 'react-i18next';
import styles from './SkipLink.module.css';

/** Keyboard skip link to the main landmark (FR-016, WCAG 2.4.1). */
export function SkipLink({ targetId = 'main-content' }: { targetId?: string }) {
  const { t } = useTranslation('common');
  return (
    <a href={`#${targetId}`} className={styles.skipLink}>
      {t('skipToContent')}
    </a>
  );
}
