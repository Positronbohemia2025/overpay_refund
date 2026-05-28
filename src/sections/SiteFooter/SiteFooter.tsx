import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { disclosures } from '../../content/ro/disclosures';
import { PATHS } from '../../routes/paths';
import styles from './SiteFooter.module.css';

/**
 * Accountability footer (FR-042–FR-045). Four columns:
 *  1) Brand + tagline + socials
 *  2) Quick links (section anchors + sample report)
 *  3) Legal (terms, data handling, methodology, accessibility)
 *  4) Contact (phone, email, postal address)
 * Plus a bottom row with copyright + disclaimer.
 */
export function SiteFooter() {
  const { t } = useTranslation('footer');
  const { t: tc } = useTranslation('common');
  const { legalEntity } = disclosures;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.colBrand}>
          <Link to={PATHS.home} className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18" />
                <path d="M5 8h14" />
                <path d="M5 8l-3 7a4 4 0 0 0 8 0z" />
                <path d="M19 8l-3 7a4 4 0 0 0 8 0z" />
              </svg>
            </span>
            <span className={styles.brandText}>{tc('brand')}</span>
          </Link>
          <p className={styles.tagline}>{t('tagline')}</p>
          <div className={styles.socials} aria-label={t('socials.title')}>
            <button type="button" className={styles.social} aria-label={t('socials.telegram')}>
              <TelegramIcon />
            </button>
            <button type="button" className={styles.social} aria-label={t('socials.viber')}>
              <ChatIcon />
            </button>
            <button type="button" className={styles.social} aria-label={t('socials.facebook')}>
              <FbIcon />
            </button>
          </div>
        </div>

        <nav className={styles.col} aria-label={t('quickLinks.title')}>
          <h2 className={styles.colTitle}>{t('quickLinks.title')}</h2>
          <ul className={styles.links}>
            <li><a href="#features">{t('quickLinks.features')}</a></li>
            <li><a href="#estimator">{t('quickLinks.estimator')}</a></li>
            <li><a href="#upload">{t('quickLinks.upload')}</a></li>
            {/* <li><Link to={PATHS.sampleReport}>{t('quickLinks.sample')}</Link></li> */}
          </ul>
        </nav>

        <nav className={styles.col} aria-label={t('legal.title')}>
          <h2 className={styles.colTitle}>{t('legal.title')}</h2>
          <ul className={styles.links}>
            <li><Link to={PATHS.terms}>{t('legal.terms')}</Link></li>
            <li><Link to={PATHS.dataHandling}>{t('legal.dataHandling')}</Link></li>
            <li><Link to={PATHS.methodology}>{t('legal.methodology')}</Link></li>
            <li><Link to={PATHS.accessibility}>{t('legal.accessibility')}</Link></li>
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>{t('contact.title')}</h2>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <PinIcon /> <span>{legalEntity.postalAddress}</span>
            </li>
            <li className={styles.contactItem}>
              <PhoneSmIcon /> <span>+373 22 000 000</span>
            </li>
            <li className={styles.contactItem}>
              <MailIcon /> <span>{legalEntity.contactEmail}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          {t('copyright', { entity: legalEntity.registeredName })}
        </p>
        <p className={styles.disclaimer}>{t('disclaimer')}</p>
      </div>
    </footer>
  );
}

function PinIcon() {
  return <Sm><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Sm>;
}
function PhoneSmIcon() {
  return <Sm><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></Sm>;
}
function MailIcon() {
  return <Sm><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></Sm>;
}
function TelegramIcon() {
  return <Md><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></Md>;
}
function ChatIcon() {
  return <Md><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Md>;
}
function FbIcon() {
  return <Md><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></Md>;
}

function Sm({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function Md({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
