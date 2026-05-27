import { lazy, Suspense, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';
import { Panel } from '../../components/Panel/Panel';
import { Section } from '../../components/Section/Section';
import { disclosures } from '../../content/ro/disclosures';
import { PATHS } from '../../routes/paths';
import styles from './Hero.module.css';

// FR-038: the upload widget is the one lazy-loaded island — its chunk is fetched
// only when the visitor acts on the primary CTA, so it never affects first paint.
const UploadWidget = lazy(() => import('../../components/UploadWidget/UploadWidget'));

export function Hero() {
  const { t } = useTranslation('hero');
  const { t: tc } = useTranslation('common');
  const [showUpload, setShowUpload] = useState(false);
  const uploadHeadingRef = useRef<HTMLHeadingElement>(null);

  const openUpload = () => {
    setShowUpload(true);
    // Move focus to the revealed widget so keyboard/SR users land on it (SC-006).
    requestAnimationFrame(() => uploadHeadingRef.current?.focus());
  };

  const { legalEntity, funding } = disclosures;

  return (
    <Section id="hero" titleId="hero-headline" width="narrow">
      <div className={styles.hero}>
        <h1 id="hero-headline" className={styles.headline}>
          {t('headline')}
        </h1>
        <p className={styles.subhead}>{t('subhead')}</p>
        <p className={styles.trust}>{t('trustSignal')}</p>

        <div className={styles.ctas}>
          <Button onClick={openUpload} aria-expanded={showUpload} aria-controls="hero-upload">
            {tc('actions.checkContract')}
          </Button>
          <Button as="link" to={PATHS.sampleReport} variant="secondary">
            {tc('actions.seeSample')}
          </Button>
        </div>

        {showUpload && (
          <Panel as="div" id="hero-upload" className={styles.uploadPanel}>
            <h2 className={styles.uploadHeading} tabIndex={-1} ref={uploadHeadingRef}>
              {t('uploadHeading')}
            </h2>
            <Suspense fallback={<p>…</p>}>
              <UploadWidget locale="ro" />
            </Suspense>
          </Panel>
        )}
      </div>

      <p className={styles.belowFold}>
        {t('belowFold', {
          entity: legalEntity.registeredName,
          nature: legalEntity.nature,
          funding: funding.fundingSource,
        })}
      </p>
    </Section>
  );
}
