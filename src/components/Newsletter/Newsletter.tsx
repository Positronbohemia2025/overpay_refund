import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button/Button';
import { useAnnounce } from '../LiveRegion/useAnnounce';
import { subscribeNewsletter, type NewsletterStatus } from '../../lib/newsletterClient';
import styles from './Newsletter.module.css';

/**
 * Newsletter signup (T052 / FR-053 + contracts/newsletter-subscribe.md).
 * Anonymous, double opt-in. Status is announced via the shared aria-live region
 * (FR-039 / SC-008). No PII beyond the email. Not a lead-gen funnel.
 */
export function Newsletter({ locale = 'ro' }: { locale?: string }) {
  const { t } = useTranslation('offramp');
  const announce = useAnnounce();
  const inputId = useId();
  const statusId = useId();

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<NewsletterStatus | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    const result = await subscribeNewsletter({ email, locale });
    setStatus(result.status);
    announce(t(`newsletter.status.${result.status}`));
    setBusy(false);
    if (result.status === 'pending') setEmail('');
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <label htmlFor={inputId} className={styles.label}>
        {t('newsletter.emailLabel')}
      </label>
      <div className={styles.row}>
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={t('newsletter.emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          aria-describedby={statusId}
          required
        />
        <Button type="submit" disabled={busy || email.trim() === ''}>
          {t('newsletter.submit')}
        </Button>
      </div>
      <p
        id={statusId}
        className={status && status !== 'pending' ? styles.error : styles.status}
        data-state={status ?? ''}
      >
        {status ? t(`newsletter.status.${status}`) : ''}
      </p>
    </form>
  );
}
