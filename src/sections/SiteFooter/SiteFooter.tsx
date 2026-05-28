import { useTranslation } from 'react-i18next';
import styles from './SiteFooter.module.css';

/**
 * Minimal informational footer: legal disclaimer + copyright. No contact info,
 * no entity branding, no social links — the landing is informational only.
 */
export function SiteFooter() {
  const { t } = useTranslation('footer');
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.disclaimer}>{t('disclaimer')}</p>
        <p className={styles.copyright}>{t('copyright')}</p>
      </div>
    </footer>
  );
}
