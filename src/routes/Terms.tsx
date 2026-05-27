import { DocumentPage } from './DocumentPage';

/** Terms of service (T036). Plain-language summary of how the service is offered. */
export default function Terms() {
  return (
    <DocumentPage title="Termeni">
      <p>
        Verificarea contractului este gratuită. Nu este nevoie de cont și nu se cere plată în avans.
        Raportul îți aparține.
      </p>
      <h2>Serviciul de recuperare</h2>
      <p>
        Serviciul de recuperare este opțional și este oferit printr-un acord separat, pe care îl
        accepți doar dacă vrei. Acesta percepe un comision de succes — un procent din sumele
        recuperate. Recuperarea se face prin scrisori către organismele de reglementare sau printr-un
        proces legal, în numele tău, sub licența unor juriști.
      </p>
      <h2>Natura analizei</h2>
      <p>
        Analiza oferă orientare, nu un verdict juridic. Faptul că o clauză este marcată drept probabil
        nelegală nu garantează rezultatul unui demers; pentru a acționa, poate fi nevoie de un
        profesionist calificat.
      </p>
    </DocumentPage>
  );
}
