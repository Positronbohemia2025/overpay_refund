import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';
import { Section } from '../../components/Section/Section';
import styles from './Hero.module.css';

/**
 * Informational hero. Left column: headline, subhead, single CTA pointing at
 * the on-page calculator. Right column: a decorative "contract analysis"
 * preview card (aria-hidden — illustrative only).
 */
export function Hero() {
  const { t } = useTranslation('hero');

  return (
    <Section id="hero" titleId="hero-headline" width="wide" className={styles.heroSection}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <h1 id="hero-headline" className={styles.headline}>
            {t('headlineLead')}{' '}
            <span className={styles.accentWord}>{t('headlineAccent')}</span>{' '}
            {t('headlineTail')}
          </h1>

          <p className={styles.subhead}>{t('subhead')}</p>

          <div className={styles.ctas}>
            <Button as="anchor" href="#estimator">
              <CalcIcon />
              {t('cta')}
            </Button>
          </div>
        </div>

        <aside className={styles.previewWrap} aria-hidden="true">
          <div className={styles.preview}>
            <div className={styles.previewHeader}>
              <span className={styles.docIcon}>
                <DocIcon />
              </span>
              <span className={styles.previewBadge}>
                <WarnIcon /> {t('mockCard.violationsBadge')}
              </span>
            </div>

            <div className={styles.previewSkeleton}>
              <span className={styles.skelLine} />
              <span className={`${styles.skelLine} ${styles.skelShort}`} />
            </div>

            <div className={styles.previewQuote}>
              <p className={styles.quoteText}>{t('mockCard.clauseQuote')}</p>
              <div className={styles.quoteMeta}>
                <span className={styles.quoteFlag}>{t('mockCard.clauseFlag')}</span>
                <span className={styles.quoteLaw}>{t('mockCard.clauseLawRef')}</span>
              </div>
            </div>

            <div className={styles.previewSkeleton}>
              <span className={styles.skelLine} />
            </div>

            <div className={styles.previewEstimate}>
              <div>
                <p className={styles.estimateLabel}>{t('mockCard.estimateLabel')}</p>
                <p className={styles.estimateValue}>{t('mockCard.estimateValue')}</p>
              </div>
              <span className={styles.estimateCheck}>
                <CheckIcon />
              </span>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function CalcIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="11" x2="8" y2="11" />
      <line x1="12" y1="11" x2="12" y2="11" />
      <line x1="16" y1="11" x2="16" y2="11" />
      <line x1="8" y1="15" x2="8" y2="15" />
      <line x1="12" y1="15" x2="12" y2="15" />
      <line x1="16" y1="15" x2="16" y2="15" />
      <line x1="8" y1="19" x2="16" y2="19" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="14" y2="17" />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
