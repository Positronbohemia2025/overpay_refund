import { useTranslation } from 'react-i18next';
import { Section } from '../../components/Section/Section';
import { Panel } from '../../components/Panel/Panel';
import { abusePatterns, patternsClosingLine } from '../../content/ro/patterns';
import styles from './WhyThisExists.module.css';

/**
 * §2 Why this exists (T043 / FR-046, FR-047). Renders the named abuse patterns
 * (one declarative sentence each) and ends with the fixed closing line. No
 * blame-absolving phrasing — recognition comes from the accuracy of the
 * description.
 */
export function WhyThisExists() {
  const { t } = useTranslation('why');

  return (
    <Section id="why-this-exists" titleId="why-this-exists-title">
      <h2 id="why-this-exists-title" className={styles.title}>
        {t('title')}
      </h2>
      <p className={styles.intro}>{t('intro')}</p>

      <ul className={styles.patterns}>
        {abusePatterns.map((p) => (
          <li key={p.id}>
            <Panel as="article" className={styles.pattern}>
              <h3 className={styles.patternTitle}>{p.title}</h3>
              <p className={styles.patternText}>{p.explanation}</p>
            </Panel>
          </li>
        ))}
      </ul>

      <p className={styles.closing}>{patternsClosingLine}</p>
    </Section>
  );
}
