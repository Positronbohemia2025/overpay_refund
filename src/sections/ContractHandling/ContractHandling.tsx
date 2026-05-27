import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Section } from '../../components/Section/Section';
import { Panel } from '../../components/Panel/Panel';
import { disclosures } from '../../content/ro/disclosures';
import styles from './ContractHandling.module.css';

/**
 * §5 What happens with your contract (T029 / FR-032–FR-037). Privacy as
 * specifics, not adjectives — a clean panel. Fields, processing location +
 * third party, retention + deletion, training/sharing, and the
 * lender-never-contacted guarantee all read from the disclosure set. No animated
 * preview. Links to the detailed data-handling document.
 */
export function ContractHandling() {
  const { t } = useTranslation('contract');
  const { privacy } = disclosures;

  return (
    <Section id="contract-handling" titleId="contract-handling-title" width="narrow">
      <h2 id="contract-handling-title" className={styles.title}>
        {t('title')}
      </h2>
      <p className={styles.intro}>{t('intro')}</p>

      <Panel as="div" className={styles.panel}>
        <div>
          <p className={styles.label}>{t('strippedLabel')}</p>
          <ul className={styles.fields}>
            {privacy.fieldsStripped.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className={styles.label}>{t('retainedLabel')}</p>
          <ul className={styles.fields}>
            {privacy.fieldsRetained.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <p>{t('processing')}</p>
        {privacy.thirdPartyProvider && (
          <p>{t('thirdParty', { provider: privacy.thirdPartyProvider })}</p>
        )}
        <p>{t('retention', { contract: privacy.retentionContract, report: privacy.retentionReport })}</p>
        <p>{t('deletion', { method: privacy.deletionMethod })}</p>
        <p>{t('trainingNo')}</p>
        <p>{t('sharingNo')}</p>
        <p className={styles.guarantee}>{t('lenderNever')}</p>
      </Panel>

      <p className={styles.docLink}>
        <Link to={privacy.dataHandlingDocUrl}>{t('docLink')}</Link>
      </p>
    </Section>
  );
}
