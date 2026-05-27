import { DocumentPage } from './DocumentPage';
import { disclosures } from '../content/ro/disclosures';

/**
 * About — the longer "who built it" page (T036 / FR-028). Lists the responsible
 * people and partners with their verifiable credentials, drawn from the same
 * disclosure set as §4 so the two never drift.
 */
export default function About() {
  const { people, legalEntity } = disclosures;
  return (
    <DocumentPage title="Despre noi">
      <p>
        Serviciul este construit pentru oamenii din Republica Moldova care au luat credite de la
        instituții de microfinanțare și vor să știe, în limbaj clar, dacă au fost taxați corect.
        Entitatea responsabilă este {legalEntity.registeredName}, înregistrată în Republica Moldova.
      </p>
      <h2>Echipa și partenerii</h2>
      <ul>
        {people.map((p, i) => (
          <li key={i}>
            <strong>{p.name}</strong> — {p.role}. {p.credential}
          </li>
        ))}
      </ul>
      <p>
        Serviciul funcționează sub coordonarea unor juriști licențiați. Verificarea contractului este
        gratuită. Serviciul de recuperare este opțional și este descris pe pagina principală.
      </p>
    </DocumentPage>
  );
}
