import { useTranslation } from 'react-i18next';
import { Section } from '../../components/Section/Section';
import { Panel } from '../../components/Panel/Panel';
import { reportStructure, afterReportPaths } from '../../content/ro/report';
import type { Outcome } from '../../types';
import styles from './ReportAndAfter.module.css';

/**
 * §6 What the report contains and what comes after (T044 / FR-048–FR-051).
 * Describes the deliverable's four parts, then the three outcome paths. The
 * likely-unlawful path states cost + payee and discloses the contingency-fee
 * recovery agreement; the ambiguous path names the human-review route.
 */
export function ReportAndAfter() {
  const { t } = useTranslation('report');
  const outcomeTitles = t('outcomes', { returnObjects: true }) as Record<Outcome, string>;

  return (
    <Section id="report-and-after" titleId="report-and-after-title" tone="sunken">
      <h2 id="report-and-after-title" className={styles.title}>
        {t('title')}
      </h2>

      <Panel as="div" className={styles.deliverable}>
        <h3 className={styles.subTitle}>{t('deliverableTitle')}</h3>
        <p>{t('deliverableIntro')}</p>
        <div className={styles.part}>
          <h4>{t('statusTitle')}</h4>
          <p>{t('statusBody')}</p>
        </div>
        <div className={styles.part}>
          <h4>{t('overpaymentTitle')}</h4>
          <p>{t('overpaymentBody')}</p>
        </div>
        <div className={styles.part}>
          <h4>{t('timingTitle')}</h4>
          <p>{reportStructure.timingNote}</p>
        </div>
        <div className={styles.part}>
          <h4>{t('nextStepTitle')}</h4>
          <p>{reportStructure.recommendedNextStep}</p>
        </div>
      </Panel>

      <h3 className={styles.afterTitle}>{t('afterTitle')}</h3>
      <ul className={styles.outcomes}>
        {afterReportPaths.map((path) => (
          <li key={path.outcome}>
            <Panel as="article" className={styles.outcome}>
              <h4 className={styles.outcomeTitle}>{outcomeTitles[path.outcome]}</h4>
              <p>{path.description}</p>
              {path.cost && (
                <p className={styles.meta}>
                  <span className={styles.metaLabel}>{t('costLabel')}</span> {path.cost}
                </p>
              )}
              {path.payee && (
                <p className={styles.meta}>
                  <span className={styles.metaLabel}>{t('payeeLabel')}</span> {path.payee}
                </p>
              )}
              {path.humanReviewPath && (
                <p className={styles.meta}>
                  <span className={styles.metaLabel}>{t('humanReviewLabel')}</span>{' '}
                  {path.humanReviewPath}
                </p>
              )}
            </Panel>
          </li>
        ))}
      </ul>
    </Section>
  );
}
