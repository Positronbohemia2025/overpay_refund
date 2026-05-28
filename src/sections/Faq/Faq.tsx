import { useTranslation } from 'react-i18next';
import { Section } from '../../components/Section/Section';
import { Disclosure } from '../../components/Disclosure/Disclosure';
import { faqItems } from '../../content/ro/faq';
import styles from './Faq.module.css';

/**
 * §7 FAQ (T050 / FR-052, SC-013). The ten questions appear in the canonical
 * order; each answer is 2–4 plain sentences ending in a period — never a CTA.
 * The accessible Disclosure primitive keeps the heading outline correct and
 * announces expanded/collapsed state.
 */
export function Faq() {
  const { t } = useTranslation('faq');

  return (
    <Section id="faq" titleId="faq-title" width="narrow">
      <h2 id="faq-title" className={styles.title}>
        {t('title')}
      </h2>
      <p className={styles.intro}>{t('intro')}</p>
      <div className={styles.list}>
        {faqItems.map((item) => (
          <Disclosure key={item.order} summary={item.question} headingLevel={3}>
            <p>{item.answer}</p>
          </Disclosure>
        ))}
      </div>
    </Section>
  );
}
