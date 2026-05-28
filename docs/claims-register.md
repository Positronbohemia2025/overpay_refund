# Claims register

Every factual claim on the page maps to a verifiable source. Unverifiable claims
are removed (FR-006), not softened. This file is the audit trail for SC-012.

The structural lint (tests/content/claimsRegister.test.ts) verifies the table
parses and every row has a non-empty source. The release-blocking check
(tests/release/operator-content.test.ts) additionally requires every source to
be a real citation, not an operator placeholder.

| ID | Claim | Source |
|----|-------|--------|
| C001 | DAE poate atinge 200–600% când comisioanele sunt listate separat | TODO(operator): citare la rapoarte BNM / Legea privind contractele de credit pentru consumatori |
| C002 | Dobânda penalizatoare aplicată peste alta crește rapid suma datorată | TODO(operator): citare la cadrul legal aplicabil din Republica Moldova |
| C003 | Un comision la rambursarea anticipată poate anula economia împrumutatului | TODO(operator): citare la reglementarea privind rambursarea anticipată |
| C004 | Asigurarea „opțională” atașată fără acord clar este o practică neconformă | TODO(operator): citare la cadrul privind consimțământul informat |
| C005 | Împrumutatul are dreptul, de regulă, să solicite o copie a contractului de la creditor | TODO(operator): citare la dreptul de acces la documentele contractuale |
| C006 | Termenele de prescripție depind de tipul cererii | TODO(operator): citare la regulile de prescripție aplicabile |
| C007 | Platforma nu contactează niciodată creditorul | Politică internă: secțiunea „Ce se întâmplă cu contractul tău” + termenii serviciului |
| C008 | Datele din contract nu sunt folosite pentru a antrena modele | Politică internă: declarația privind tratarea datelor |
| C009 | Recuperarea se face prin scrisori către organismele de reglementare sau printr-un proces legal, sub licența unor juriști | Politică internă: acordul opțional de recuperare (Termenii) |
| C010 | Pagina respectă WCAG 2.2, nivel AA | Declarația de accesibilitate publicată pe site |
| C011 | Anonimizarea fișierului are loc pe server, înainte de analiză | Politică internă: documentul „Cum tratăm datele” |
| C012 | Serviciul este oferit în limba română la lansare | Configurația platformei: registrul de locale (`src/i18n/locales.ts`) |
| C013 | Entitatea juridică este înregistrată în Republica Moldova | TODO(operator): registrul juridic (IDNO + extras CIS) |
| C014 | Verificarea contractului este gratuită | Politică internă: termenii serviciului |
| C015 | Serviciul opțional de recuperare percepe un comision de succes, un procent din sumele recuperate | Politică internă: acordul opțional de recuperare (Termenii) |

## How to update

- Add a new row whenever a factual claim is added to the page.
- Use an `OPERATOR_TODO` marker on the source until the operator supplies a real
  citation; the release gate fails until every source is real.
- Remove claims whose source cannot be produced — never soften the wording on
  the page in lieu of a source (FR-006).
