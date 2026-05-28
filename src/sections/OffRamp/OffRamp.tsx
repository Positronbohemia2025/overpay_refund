import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Section } from '../../components/Section/Section';
import { Panel } from '../../components/Panel/Panel';
import { Newsletter } from '../../components/Newsletter/Newsletter';
import { PATHS } from '../../routes/paths';
import styles from './OffRamp.module.css';

/**
 * Off-ramp (T053 / FR-053). Three alternatives for a visitor not ready to
 * upload: a labeled sample report, a downloadable abuse-pattern guide, and an
 * anonymous newsletter of regulator actions. Presented as alternatives — not a
 * lead-gen funnel (Non-Goals). Each panel describes the artifact factually.
 */
export function OffRamp() {
  const { t } = useTranslation('offramp');

  return (
    <Section id="off-ramp" titleId="off-ramp-title">
      <h2 id="off-ramp-title" className={styles.title}>
        {t('title')}
      </h2>
      <p className={styles.intro}>{t('intro')}</p>

      <div className={styles.grid}>
        <Panel as="article" className={styles.card}>
          <h3 className={styles.cardTitle}>{t('sampleReport.title')}</h3>
          <p className={styles.cardBody}>{t('sampleReport.description')}</p>
          <Link to={PATHS.sampleReport} className={styles.cardLink}>
            {t('sampleReport.action')}
          </Link>
        </Panel>

        <Panel as="article" className={styles.card}>
          <h3 className={styles.cardTitle}>{t('guide.title')}</h3>
          <p className={styles.cardBody}>{t('guide.description')}</p>
          <a
            href="/docs/ghid-modele-abuz.html"
            className={styles.cardLink}
            target="_blank"
            rel="noreferrer"
          >
            {t('guide.action')}
          </a>
        </Panel>

        <Panel as="article" className={styles.card}>
          <h3 className={styles.cardTitle}>{t('newsletter.title')}</h3>
          <p className={styles.cardBody}>{t('newsletter.description')}</p>
          <Newsletter locale="ro" />
        </Panel>
      </div>
    </Section>
  );
}
