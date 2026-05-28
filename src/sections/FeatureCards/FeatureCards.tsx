import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../../components/Section/Section';
import styles from './FeatureCards.module.css';

/**
 * Three illustrative patterns we look for in contracts: hidden fees, illegal
 * interest, abusive penalties. Static content; copy lives in features.json.
 */
export function FeatureCards() {
  const { t } = useTranslation('features');

  const cards: Array<{ key: string; toneClass: string; icon: ReactNode }> = [
    { key: 'hiddenFees', toneClass: styles.toneRed, icon: <SearchDollarIcon /> },
    { key: 'illegalRates', toneClass: styles.toneOrange, icon: <TrendIcon /> },
    { key: 'abusivePenalties', toneClass: styles.toneEmerald, icon: <GavelIcon /> },
  ];

  return (
    <Section id="features" titleId="features-title" width="wide" className={styles.sectionWrap}>
      <header className={styles.header}>
        <h2 id="features-title" className={styles.title}>
          {t('title')}
        </h2>
        <p className={styles.subhead}>{t('subhead')}</p>
      </header>

      <div className={styles.grid}>
        {cards.map((card) => (
          <article key={card.key} className={styles.card}>
            <span className={`${styles.iconWrap} ${card.toneClass}`} aria-hidden="true">
              {card.icon}
            </span>
            <h3 className={styles.cardTitle}>{t(`cards.${card.key}.title`)}</h3>
            <p className={styles.cardBody}>{t(`cards.${card.key}.body`)}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function SearchDollarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <path d="M11 7v8" />
      <path d="M13 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H9" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="15 7 21 7 21 13" />
    </svg>
  );
}

function GavelIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M14 4l6 6" />
      <path d="M11 7l6 6" />
      <path d="M8 10l6 6" />
      <path d="M16 14l-9 7" />
    </svg>
  );
}
