import { DocumentPage } from './DocumentPage';
import { disclosures } from '../content/ro/disclosures';

/**
 * Methodology document (T036). How the automated analysis works and where it has
 * known limits — the model's failure modes are read from the disclosure set.
 */
export default function Methodology() {
  const { model } = disclosures;
  return (
    <DocumentPage title="Metodologie">
      <p>
        Analiza este realizată de un sistem software, nu de oameni. Sistemul compară clauzele
        contractului cu reglementările din Republica Moldova privind creditele de consum și
        microfinanțarea, apoi marchează fiecare clauză drept probabil conformă, discutabilă sau
        probabil nelegală, cu reglementarea citată acolo unde se aplică.
      </p>
      <h2>Limite cunoscute</h2>
      <ul>
        {model.knownFailureModes.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
      <p>
        Raportul oferă orientare, nu un verdict juridic. Pentru a acționa, poate fi nevoie de un
        profesionist calificat.
      </p>
    </DocumentPage>
  );
}
