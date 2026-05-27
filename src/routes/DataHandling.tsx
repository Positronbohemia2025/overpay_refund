import { DocumentPage } from './DocumentPage';
import { disclosures } from '../content/ro/disclosures';

/**
 * Data-handling document (T036 / FR-032, FR-034–FR-037). The detailed version of
 * §5, aligned to the same PrivacyDisclosure so the page and this document agree.
 */
export default function DataHandling() {
  const { privacy } = disclosures;
  return (
    <DocumentPage title="Cum tratăm datele">
      <p>
        Documentul tău este încărcat printr-o conexiune criptată. Înainte de analiză, câmpurile care
        te identifică sunt eliminate pe server. Analiza rulează pe server.
      </p>
      <h2>Ce se elimină</h2>
      <ul>
        {privacy.fieldsStripped.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <h2>Ce se păstrează pentru context</h2>
      <ul>
        {privacy.fieldsRetained.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <h2>Păstrare și ștergere</h2>
      <p>
        Contractul este păstrat {privacy.retentionContract}, iar raportul este păstrat{' '}
        {privacy.retentionReport}. Îți poți șterge datele astfel: {privacy.deletionMethod}.
      </p>
      <h2>Folosire</h2>
      <p>
        Datele din contract nu sunt folosite pentru a antrena vreun model și nu sunt vândute,
        partajate sau agregate. Creditorul nu este contactat niciodată de către platformă, iar nicio
        acțiune nu este întreprinsă în numele tău fără acordul tău explicit.
      </p>
    </DocumentPage>
  );
}
