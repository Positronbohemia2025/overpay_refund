import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button/Button';
import { useAnnounce } from '../LiveRegion/useAnnounce';
import { env } from '../../lib/env';
import { ALLOWED_MIME_TYPES, validateConsents, validateFile } from '../../lib/validateUpload';
import { submitUpload, type UploadMetadata } from '../../lib/uploadClient';
import type { RejectReason, UploadStatus } from '../../types';
import styles from './UploadWidget.module.css';

/**
 * Upload island (T033 / FR-038, FR-039). The one lazy-loaded interactive
 * component. Implements the UploadSubmission state machine and announces every
 * client-controlled stage (selected → validating → uploading → received) to the
 * shared aria-live region. It never announces backend analysis stages it cannot
 * observe, and never persists the file.
 */
const MAX_MB = Math.round(env.maxUploadBytes / (1024 * 1024));
const ACCEPT_ATTR = ALLOWED_MIME_TYPES.join(',');

interface UploadWidgetProps {
  locale?: string;
  metadata?: UploadMetadata;
  onAccepted?: () => void;
}

export default function UploadWidget({ locale = 'ro', metadata, onAccepted }: UploadWidgetProps) {
  const { t } = useTranslation('upload');
  const announce = useAnnounce();

  const [status, setStatus] = useState<UploadStatus>('idle');
  const [reason, setReason] = useState<RejectReason>(null);
  const [anonymized, setAnonymized] = useState(false);
  const [terms, setTerms] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const fileHintId = useId();
  const statusId = useId();

  const reject = (next: RejectReason) => {
    setStatus('rejected');
    setReason(next);
    if (next) announce(t(`reject.${next}`, { max: MAX_MB }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setReason(null);
    if (!file) {
      setStatus('idle');
      return;
    }
    setStatus('fileSelected');
    announce(t('status.selected', { name: file.name }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = inputRef.current?.files?.[0] ?? null;
    if (!file) return;

    const consentCheck = validateConsents({ anonymizedProcessing: anonymized, terms });
    if (!consentCheck.ok) return reject(consentCheck.reason);

    setStatus('validating');
    announce(t('status.validating'));
    const fileCheck = validateFile({
      name: file.name,
      sizeBytes: file.size,
      mimeType: file.type,
    });
    if (!fileCheck.ok) return reject(fileCheck.reason);

    setStatus('uploading');
    announce(t('status.uploading'));
    const result = await submitUpload({
      file,
      locale,
      consentAnonymizedProcessing: anonymized,
      consentTerms: terms,
      metadata,
    });

    if (result.accepted) {
      setStatus('accepted');
      announce(t('status.accepted'));
    } else {
      reject(result.reason);
    }
  };

  const reset = () => {
    setStatus('idle');
    setReason(null);
    setAnonymized(false);
    setTerms(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    if (status === 'accepted') onAccepted?.();
  }, [status, onAccepted]);

  if (status === 'accepted' && !onAccepted) {
    return (
      <div className={styles.widget}>
        <p className={styles.accepted}>{t('status.accepted')}</p>
        <Button variant="secondary" onClick={reset}>
          {t('anotherFile')}
        </Button>
      </div>
    );
  }

  const busy = status === 'validating' || status === 'uploading';
  const visibleStatus =
    status === 'rejected' && reason
      ? t(`reject.${reason}`, { max: MAX_MB })
      : busy
        ? t(`status.${status === 'validating' ? 'validating' : 'uploading'}`)
        : '';

  return (
    <form className={styles.widget} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="contract-file" className={styles.fileLabel}>
          {t('fileLabel')}
        </label>
        <input
          ref={inputRef}
          id="contract-file"
          type="file"
          accept={ACCEPT_ATTR}
          className={styles.fileInput}
          aria-describedby={fileHintId}
          onChange={onFileChange}
        />
        <p id={fileHintId} className={styles.hint}>
          {t('fileHint', { max: MAX_MB })}
        </p>
      </div>

      <fieldset className={styles.consents}>
        <label className={styles.consent}>
          <input
            type="checkbox"
            checked={anonymized}
            onChange={(e) => setAnonymized(e.target.checked)}
          />
          <span>{t('consentAnonymized')}</span>
        </label>
        <label className={styles.consent}>
          <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
          <span>{t('consentTerms')}</span>
        </label>
      </fieldset>

      <Button type="submit" disabled={busy || status === 'idle'} aria-describedby={statusId}>
        {t('submit')}
      </Button>

      {/* Visible status; the spoken announcement is handled by the shared live region. */}
      <p
        id={statusId}
        className={status === 'rejected' ? styles.error : styles.status}
        data-state={status}
      >
        {visibleStatus}
      </p>
    </form>
  );
}
