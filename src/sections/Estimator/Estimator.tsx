import { useId, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';
import { Section } from '../../components/Section/Section';
import {
  estimateRecovery,
  formatMDL,
  type LenderType,
} from '../../lib/estimator';
import styles from './Estimator.module.css';

interface State {
  loan: number;
  paid: number;
  lender: LenderType;
}

type Action =
  | { type: 'setLoan'; value: number }
  | { type: 'setPaid'; value: number }
  | { type: 'setLender'; value: LenderType };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setLoan':
      return { ...state, loan: action.value };
    case 'setPaid':
      return { ...state, paid: action.value };
    case 'setLender':
      return { ...state, lender: action.value };
  }
}

const INITIAL: State = { loan: 10000, paid: 22000, lender: 'ifn' };
const LENDER_OPTIONS: LenderType[] = ['ifn', 'bank', 'p2p'];

export function Estimator() {
  const { t } = useTranslation('estimator');
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const { recovery } = estimateRecovery(state);

  const loanLabelId = useId();
  const paidLabelId = useId();
  const lenderLabelId = useId();

  const onKeyRadio = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next =
      e.key === 'ArrowRight'
        ? (idx + 1) % LENDER_OPTIONS.length
        : (idx - 1 + LENDER_OPTIONS.length) % LENDER_OPTIONS.length;
    dispatch({ type: 'setLender', value: LENDER_OPTIONS[next] });
    requestAnimationFrame(() => {
      const buttons = document.querySelectorAll<HTMLButtonElement>(`[data-lender-radio="true"]`);
      buttons[next]?.focus();
    });
  };

  return (
    <Section id="estimator" titleId="estimator-title" width="wide" className={styles.sectionWrap}>
      <header className={styles.header}>
        <h2 id="estimator-title" className={styles.title}>
          {t('title')}
        </h2>
        <p className={styles.subhead}>{t('subhead')}</p>
      </header>

      <div className={styles.panel}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <div className={styles.controlRow}>
              <label htmlFor={loanLabelId} className={styles.controlLabel}>
                {t('loanLabel')}
              </label>
              <output className={styles.controlValue}>{formatMDL(state.loan)}</output>
            </div>
            <input
              id={loanLabelId}
              type="range"
              min={1000}
              max={50000}
              step={500}
              value={state.loan}
              onChange={(e) => dispatch({ type: 'setLoan', value: Number(e.target.value) })}
              aria-valuetext={t('loanValuetext', { value: formatMDL(state.loan) })}
              className={styles.range}
            />
            <div className={styles.scale}>
              <span>1k</span>
              <span>50k</span>
            </div>
          </div>

          <div className={styles.control}>
            <div className={styles.controlRow}>
              <label htmlFor={paidLabelId} className={styles.controlLabel}>
                {t('paidLabel')}
              </label>
              <output className={styles.controlValue}>{formatMDL(state.paid)}</output>
            </div>
            <input
              id={paidLabelId}
              type="range"
              min={1000}
              max={100000}
              step={500}
              value={state.paid}
              onChange={(e) => dispatch({ type: 'setPaid', value: Number(e.target.value) })}
              aria-valuetext={t('paidValuetext', { value: formatMDL(state.paid) })}
              className={styles.range}
            />
            <div className={styles.scale}>
              <span>1k</span>
              <span>100k</span>
            </div>
          </div>

          <div className={styles.lenderGroup}>
            <span id={lenderLabelId} className={styles.controlLabel}>
              {t('lenderLabel')}
            </span>
            <div role="radiogroup" aria-labelledby={lenderLabelId} className={styles.lenderRow}>
              {LENDER_OPTIONS.map((option, i) => {
                const checked = state.lender === option;
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={checked}
                    tabIndex={checked ? 0 : -1}
                    data-lender-radio="true"
                    className={`${styles.lenderOption} ${checked ? styles.lenderOptionChecked : ''}`}
                    onClick={() => dispatch({ type: 'setLender', value: option })}
                    onKeyDown={(e) => onKeyRadio(e, i)}
                  >
                    {t(`lenderOptions.${option}`)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.result}>
          <p className={styles.resultLabel}>{t('resultLabel')}</p>
          <p
            className={styles.resultValue}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className={styles.resultNumber}>{formatMDL(recovery)}</span>
            <span className={styles.resultSuffix}>{t('resultSuffix')}</span>
          </p>
          <p className={styles.resultDisclaimer}>{t('resultDisclaimer')}</p>
          <Button as="anchor" href="#upload" className={styles.resultCta}>
            {t('cta')}
            <ArrowIcon />
          </Button>
        </div>
      </div>
    </Section>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
