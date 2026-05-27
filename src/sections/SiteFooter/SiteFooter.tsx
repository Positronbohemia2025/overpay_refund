import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { disclosures } from '../../content/ro/disclosures';
import { getPublishedLocales } from '../../i18n/locales';
import { PATHS } from '../../routes/paths';
import styles from './SiteFooter.module.css';

/**
 * Accountability footer (T030 / FR-042–FR-045). Repeats the legal entity, real
 * contact + postal address, and regulatory standing; links to the required
 * documents and the supported languages; carries the guidance-not-verdict
 * disclaimer. It is NOT a conversion CTA — the closing line is a statement, not
 * a button (FR-045).
 */
export function SiteFooter() {
  const { t } = useTranslation('footer');
  const { t: tc } = useTranslation('common');
  const { legalEntity } = disclosures;
  const locales = getPublishedLocales();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <p className={styles.entity}>
            {t('entityLine', {
              entity: legalEntity.registeredName,
              registration: legalEntity.registrationNumber,
            })}
          </p>
          <p className={styles.meta}>
            {t('contactLabel')} {legalEntity.contactEmail}
          </p>
          <p className={styles.meta}>
            {t('addressLabel')} {legalEntity.postalAddress}
          </p>
          {legalEntity.regulatoryStanding && (
            <p className={styles.meta}>
              {t('regulatoryLabel')} {legalEntity.regulatoryStanding}
            </p>
          )}
        </div>

        <nav className={styles.col} aria-label={t('linksTitle')}>
          <h2 className={styles.colTitle}>{t('linksTitle')}</h2>
          <ul className={styles.links}>
            <li>
              <Link to={PATHS.dataHandling}>{tc('nav.dataHandling')}</Link>
            </li>
            <li>
              <Link to={PATHS.methodology}>{tc('nav.methodology')}</Link>
            </li>
            <li>
              <Link to={PATHS.terms}>{tc('nav.terms')}</Link>
            </li>
            <li>
              <Link to={PATHS.accessibility}>{tc('nav.accessibility')}</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>{t('languagesTitle')}</h2>
          <ul className={styles.links}>
            {locales.map((l) => (
              <li key={l.code}>{l.label}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.disclaimer}>{t('disclaimer')}</p>
        <p className={styles.closing}>{t('closingLine')}</p>
      </div>
    </footer>
  );
}
