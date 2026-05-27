import { useTranslation } from 'react-i18next';
import { Section } from '../../components/Section/Section';
import { Panel } from '../../components/Panel/Panel';
import { disclosures } from '../../content/ro/disclosures';
import styles from './HowItWorks.module.css';

/**
 * §3 How it works (T027 / FR-023–FR-026). Three steps; the field lists and the
 * model provider are read from the disclosure set so §3 can never drift from §5
 * or §4. Each step says what happens, who/what performs it, and what the user sees.
 */
export function HowItWorks() {
  const { t } = useTranslation('howItWorks');
  const { privacy, model } = disclosures;

  return (
    <Section id="how-it-works" titleId="how-it-works-title" tone="sunken">
      <h2 id="how-it-works-title" className={styles.title}>
        {t('title')}
      </h2>
      <ol className={styles.steps}>
        <li>
          <Panel as="article">
            <h3 className={styles.stepTitle}>{t('step1.title')}</h3>
            <p>{t('step1.what')}</p>
            <p className={styles.fieldLabel}>{t('step1.strippedLabel')}</p>
            <ul className={styles.fields}>
              {privacy.fieldsStripped.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className={styles.fieldLabel}>{t('step1.retainedLabel')}</p>
            <ul className={styles.fields}>
              {privacy.fieldsRetained.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className={styles.note}>{t('step1.where')}</p>
            <p className={styles.note}>{t('step1.see')}</p>
          </Panel>
        </li>
        <li>
          <Panel as="article">
            <h3 className={styles.stepTitle}>{t('step2.title')}</h3>
            <p>{t('step2.what')}</p>
            <p className={styles.fieldLabel}>{t('step2.providerLabel')}</p>
            <p>{model.provider}</p>
            <p className={styles.note}>{t('step2.see')}</p>
          </Panel>
        </li>
        <li>
          <Panel as="article">
            <h3 className={styles.stepTitle}>{t('step3.title')}</h3>
            <p>{t('step3.what')}</p>
            <p className={styles.note}>{t('step3.see')}</p>
          </Panel>
        </li>
      </ol>
    </Section>
  );
}
