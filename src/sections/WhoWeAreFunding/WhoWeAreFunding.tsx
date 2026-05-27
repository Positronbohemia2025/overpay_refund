import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Section } from '../../components/Section/Section';
import { Panel } from '../../components/Panel/Panel';
import { disclosures } from '../../content/ro/disclosures';
import { PATHS } from '../../routes/paths';
import styles from './WhoWeAreFunding.module.css';

/**
 * §4 Who we are and how we are funded (T028 / FR-027–FR-031). Placed high in the
 * page. Four blocks: who built it (people + credentials + about link), the legal
 * entity, funding (free check + the contingency fee disclosed HERE, not only in
 * the footer), and "what we are not". Never claims it takes no percentage.
 */
export function WhoWeAreFunding() {
  const { t } = useTranslation('who');
  const { people, legalEntity, funding } = disclosures;

  return (
    <Section id="who-we-are" titleId="who-we-are-title">
      <h2 id="who-we-are-title" className={styles.title}>
        {t('title')}
      </h2>
      <div className={styles.grid}>
        <Panel as="article" className={styles.block}>
          <h3 className={styles.blockTitle}>{t('whoBuilt.title')}</h3>
          <p>{t('whoBuilt.intro')}</p>
          <ul className={styles.people}>
            {people.map((p, i) => (
              <li key={i} className={styles.person}>
                <p className={styles.personName}>{p.name}</p>
                <p className={styles.personMeta}>
                  {t('whoBuilt.roleLabel')} {p.role}
                </p>
                <p className={styles.personMeta}>
                  {t('whoBuilt.credentialLabel')} {p.credential}
                </p>
              </li>
            ))}
          </ul>
          <Link to={PATHS.about}>{t('whoBuilt.aboutLink')}</Link>
        </Panel>

        <Panel as="article" className={styles.block}>
          <h3 className={styles.blockTitle}>{t('legalEntity.title')}</h3>
          <dl className={styles.entity}>
            <dt>{t('legalEntity.registeredNameLabel')}</dt>
            <dd>{legalEntity.registeredName}</dd>
            <dt>{t('legalEntity.jurisdictionLabel')}</dt>
            <dd>{legalEntity.jurisdiction}</dd>
            <dt>{t('legalEntity.registrationLabel')}</dt>
            <dd>{legalEntity.registrationNumber}</dd>
            <dt>{t('legalEntity.contactLabel')}</dt>
            <dd>{legalEntity.contactEmail}</dd>
          </dl>
        </Panel>

        <Panel as="article" className={styles.block}>
          <h3 className={styles.blockTitle}>{t('funding.title')}</h3>
          <p>{t('funding.free', { fundingSource: funding.fundingSource })}</p>
          <p>{t('funding.contingency', { fee: String(funding.contingencyFeePercent) })}</p>
        </Panel>

        <Panel as="article" className={styles.block}>
          <h3 className={styles.blockTitle}>{t('whatWeAreNot.title')}</h3>
          <p>{t('whatWeAreNot.body')}</p>
        </Panel>
      </div>
    </Section>
  );
}
