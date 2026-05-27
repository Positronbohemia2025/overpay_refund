import { DocumentPage } from './DocumentPage';
import { disclosures } from '../content/ro/disclosures';

/** Accessibility statement (T036 / FR-016, FR-043). */
export default function Accessibility() {
  const { legalEntity } = disclosures;
  return (
    <DocumentPage title="Declarație de accesibilitate">
      <p>
        Această pagină este construită pentru a respecta standardul WCAG 2.2, nivel AA. Asta include
        contrast suficient, stări de focus vizibile, navigare completă de la tastatură și suport
        pentru cititoare de ecran.
      </p>
      <h2>Mișcare redusă</h2>
      <p>
        Dacă ai activată preferința pentru mișcare redusă în sistemul tău, animațiile neesențiale sunt
        oprite, iar conținutul rămâne complet inteligibil.
      </p>
      <h2>Raportează o problemă</h2>
      <p>
        Dacă întâmpini o barieră de accesibilitate, scrie-ne la {legalEntity.contactEmail} și o vom
        remedia.
      </p>
    </DocumentPage>
  );
}
