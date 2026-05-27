import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Panel } from '../components/Panel/Panel';
import styles from './SampleReport.module.css';

/**
 * Sample report (T035 / FR-041). A clearly-labeled model report with fictional,
 * anonymized data, reachable from the hero's secondary CTA. It shows the report
 * as a deliverable: clause-by-clause status with regulation cited, an
 * overpayment estimate with the calculation shown, a calm timing note, and a
 * recommended next step. A downloadable copy lives in public/docs.
 */
const clauses = [
  {
    clause: 'Dobândă anuală efectivă (DAE)',
    status: 'likely_unlawful' as const,
    note: 'DAE reală depășește 300% prin comisioane separate, peste limita admisă pentru acest tip de credit.',
    regulation: 'Legea privind contractele de credit pentru consumatori',
  },
  {
    clause: 'Comision de administrare lunar',
    status: 'questionable' as const,
    note: 'Comisionul nu este explicat în contract și nu apare în calculul DAE prezentat.',
    regulation: null,
  },
  {
    clause: 'Asigurare „opțională”',
    status: 'likely_unlawful' as const,
    note: 'Asigurarea a fost adăugată fără un acord separat și clar al împrumutatului.',
    regulation: 'Norme privind consimțământul informat',
  },
  {
    clause: 'Penalitate de întârziere',
    status: 'compliant' as const,
    note: 'Penalitatea se încadrează în limitele permise.',
    regulation: null,
  },
];

const statusLabel: Record<string, string> = {
  compliant: 'Probabil conform',
  questionable: 'Discutabil',
  likely_unlawful: 'Probabil nelegal',
};

export default function SampleReport() {
  const { t } = useTranslation('common');
  return (
    <article className={styles.report}>
      <Link to="/" className={styles.back}>
        ← {t('actions.back')}
      </Link>
      <p className={styles.badge}>Exemplu — date fictive</p>
      <h1 className={styles.title}>Raport-model</h1>
      <p className={styles.lede}>
        Acesta este un exemplu de raport, cu date fictive, care arată ce primești după verificare.
      </p>

      <section aria-labelledby="clauses-title">
        <h2 id="clauses-title" className={styles.sectionTitle}>
          Analiză clauză cu clauză
        </h2>
        <ul className={styles.clauses}>
          {clauses.map((c) => (
            <li key={c.clause}>
              <Panel as="div" className={styles.clause}>
                <div className={styles.clauseHead}>
                  <span className={styles.clauseName}>{c.clause}</span>
                  <span className={styles.status} data-status={c.status}>
                    {statusLabel[c.status]}
                  </span>
                </div>
                <p className={styles.clauseNote}>{c.note}</p>
                {c.regulation && <p className={styles.reg}>Reglementare: {c.regulation}</p>}
              </Panel>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="estimate-title">
        <h2 id="estimate-title" className={styles.sectionTitle}>
          Estimarea sumei plătite în plus
        </h2>
        <Panel as="div" className={styles.estimate}>
          <p>Calculul este arătat, nu doar rezultatul:</p>
          <ul className={styles.calc}>
            <li>Sumă împrumutată: 5 000 MDL</li>
            <li>Total plătit până acum: 11 200 MDL</li>
            <li>Total legal estimat (dobândă + comisioane permise): 8 900 MDL</li>
            <li>
              <strong>Diferență estimată plătită în plus: 2 300 MDL</strong>
            </li>
          </ul>
        </Panel>
      </section>

      <section aria-labelledby="timing-title">
        <h2 id="timing-title" className={styles.sectionTitle}>
          Despre termene
        </h2>
        <p className={styles.note}>
          Faptul că împrumutul a fost luat acum câțiva ani nu închide neapărat opțiunile. Termenele
          depind de tipul cererii; un profesionist poate confirma situația ta.
        </p>
      </section>

      <section aria-labelledby="next-title">
        <h2 id="next-title" className={styles.sectionTitle}>
          Pasul recomandat
        </h2>
        <p className={styles.note}>
          Pe baza acestui exemplu, pasul recomandat este o scrisoare către organismul de reglementare,
          însoțită de calculul de mai sus. Raportul tău real va include opțiunile potrivite cazului tău.
        </p>
      </section>

      <p className={styles.download}>
        <a href="/docs/raport-model.html" target="_blank" rel="noreferrer">
          Deschide raportul-model pentru tipărire
        </a>
      </p>
    </article>
  );
}
