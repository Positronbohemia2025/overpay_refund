import { lazy, Suspense, useId, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Section } from '../../components/Section/Section';
import { useAnnounce } from '../../components/LiveRegion/useAnnounce';
import { LENDERS } from '../../content/ro/lenders';
import { PATHS } from '../../routes/paths';
import styles from './UploadSection.module.css';

const UploadWidget = lazy(() => import('../../components/UploadWidget/UploadWidget'));

type Step = 1 | 2 | 3;

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  lenderId: string;
}

export function UploadSection() {
  const { t } = useTranslation('upload');
  const announce = useAnnounce();

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    phone: '',
    lenderId: '',
  });

  const firstNameId = useId();
  const lastNameId = useId();
  const phoneId = useId();
  const lenderId = useId();

  const onStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    announce(`${t('section.steps.upload')}`);
  };

  const onAccepted = () => {
    setStep(3);
    announce(`${t('section.steps.confirm')}`);
  };

  const stepKeys: Array<{ n: Step; label: string }> = [
    { n: 1, label: t('section.steps.details') },
    { n: 2, label: t('section.steps.upload') },
    { n: 3, label: t('section.steps.confirm') },
  ];

  return (
    <Section id="upload" titleId="upload-title" width="wide" className={styles.sectionWrap}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <h2 id="upload-title" className={styles.headline}>
            {t('section.headlineLead')}{' '}
            <span className={styles.accentWord}>{t('section.headlineAccent')}</span>
          </h2>
          <p className={styles.subhead}>{t('section.subhead')}</p>
          <ul className={styles.trustList}>
            <TrustItem icon={<ShieldIcon />} title={t('section.trust.confidentialTitle')} body={t('section.trust.confidentialBody')} />
            <TrustItem icon={<WalletIcon />} title={t('section.trust.noUpfrontTitle')} body={t('section.trust.noUpfrontBody')} />
            <TrustItem icon={<BoltIcon />} title={t('section.trust.fastTitle')} body={t('section.trust.fastBody')} />
          </ul>
        </div>

        <div className={styles.card}>
          <ol className={styles.stepper} aria-label="Progres">
            {stepKeys.map(({ n, label }, i) => {
              const active = n === step;
              const done = n < step;
              return (
                <li
                  key={n}
                  className={`${styles.stepItem} ${active ? styles.stepActive : ''} ${done ? styles.stepDone : ''}`}
                  aria-current={active ? 'step' : undefined}
                >
                  <span className={styles.stepCircle}>
                    {done ? <CheckIcon /> : n}
                  </span>
                  <span className={styles.stepLabel}>{label}</span>
                  {i < stepKeys.length - 1 && <span className={styles.stepConnector} aria-hidden="true" />}
                </li>
              );
            })}
          </ol>

          {step === 1 && (
            <form className={styles.form} onSubmit={onStep1Submit} noValidate>
              <div className={styles.row}>
                <Field
                  id={firstNameId}
                  label={t('section.form.firstName')}
                  placeholder={t('section.form.firstNamePlaceholder')}
                  value={form.firstName}
                  onChange={(v) => setForm((f) => ({ ...f, firstName: v }))}
                  autoComplete="given-name"
                  required
                />
                <Field
                  id={lastNameId}
                  label={t('section.form.lastName')}
                  placeholder={t('section.form.lastNamePlaceholder')}
                  value={form.lastName}
                  onChange={(v) => setForm((f) => ({ ...f, lastName: v }))}
                  autoComplete="family-name"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor={phoneId} className={styles.label}>
                  {t('section.form.phone')}
                </label>
                <div className={styles.phoneRow}>
                  <span className={styles.phonePrefix}>{t('section.form.phonePrefix')}</span>
                  <input
                    id={phoneId}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    pattern="[0-9 ]{6,}"
                    placeholder={t('section.form.phonePlaceholder')}
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className={`${styles.input} ${styles.phoneInput}`}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor={lenderId} className={styles.label}>
                  {t('section.form.lender')}
                </label>
                <select
                  id={lenderId}
                  value={form.lenderId}
                  onChange={(e) => setForm((f) => ({ ...f, lenderId: e.target.value }))}
                  className={styles.input}
                >
                  <option value="">{t('section.form.lenderPlaceholder')}</option>
                  {LENDERS.map((l) => (
                    <option key={l.id} value={l.id}>{l.label}</option>
                  ))}
                </select>
              </div>

              <Button type="submit" className={styles.submit}>
                {t('section.form.continueCta')}
              </Button>

              <p className={styles.consentNote}>
                <Trans
                  i18nKey="section.form.consentNote"
                  t={t}
                  components={{ a: <Link to={PATHS.terms} className={styles.consentLink} /> }}
                  values={{ terms: t('section.form.termsLink') }}
                />
              </p>
            </form>
          )}

          {step === 2 && (
            <Suspense fallback={<p className={styles.loading}>…</p>}>
              <UploadWidget
                locale="ro"
                metadata={{
                  firstName: form.firstName,
                  lastName: form.lastName,
                  phone: `+373${form.phone.replace(/\s+/g, '')}`,
                  lenderId: form.lenderId || null,
                }}
                onAccepted={onAccepted}
              />
            </Suspense>
          )}

          {step === 3 && (
            <div className={styles.confirm}>
              <span className={styles.confirmIcon} aria-hidden="true">
                <CheckIcon big />
              </span>
              <h3 className={styles.confirmTitle}>{t('section.confirm.title')}</h3>
              <p className={styles.confirmBody}>{t('section.confirm.body')}</p>
              {/* <Link to={PATHS.sampleReport} className={styles.confirmLink}>
                {t('section.confirm.sampleLink')}
              </Link> */}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
}

function Field({ id, label, placeholder, value, onChange, autoComplete, required }: FieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        className={styles.input}
      />
    </div>
  );
}

interface TrustItemProps {
  icon: React.ReactNode;
  title: string;
  body: string;
}

function TrustItem({ icon, title, body }: TrustItemProps) {
  return (
    <li className={styles.trustItem}>
      <span className={styles.trustIcon} aria-hidden="true">{icon}</span>
      <div className={styles.trustText}>
        <p className={styles.trustTitle}>{title}</p>
        <p className={styles.trustBody}>{body}</p>
      </div>
    </li>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h18v12H3z" />
      <path d="M16 13h2" />
      <path d="M3 7l2-4h14l2 4" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function CheckIcon({ big = false }: { big?: boolean }) {
  const size = big ? 28 : 14;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
