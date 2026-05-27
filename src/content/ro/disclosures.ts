/**
 * Required disclosure slots (T022 schema; values filled in T024).
 *
 * Operator-supplied facts use operatorTodo() placeholders — present so the
 * structural validation passes, flagged so T065 blocks launch until replaced.
 * Spec-fixed values (the stripped/retained field lists per FR-024/FR-033, the
 * lender-never-contacted guarantee per FR-037, the free-check + contingency
 * model per FR-030) are stated directly.
 */
import type { DisclosureSet } from '../../types';
import { operatorTodo } from '../operatorTodo';
import { PATHS } from '../../routes/paths';

export const disclosures: DisclosureSet = {
  legalEntity: {
    registeredName: operatorTodo('denumirea juridică înregistrată'),
    nature: operatorTodo('natura entității (de exemplu, SRL sau organizație neguvernamentală)'),
    jurisdiction: 'Moldova',
    registrationNumber: operatorTodo('numărul de înregistrare (IDNO)'),
    contactEmail: operatorTodo('adresa de e-mail de contact'),
    postalAddress: operatorTodo('adresa poștală'),
    regulatoryStanding: operatorTodo('statutul de reglementare, dacă există'),
  },

  funding: {
    freeCheck: true,
    contingencyFeePercent: operatorTodo('procentul comisionului de succes'),
    recoveryRoutes: ['regulator_letters', 'legal_process'],
    underLicensedProfessionals: true,
    fundingSource: operatorTodo('sursa care menține verificarea gratuită'),
  },

  // At least one party, at least one licensed legal professional (FR-028, FR-031).
  people: [
    {
      name: operatorTodo('numele profesionistului juridic licențiat'),
      role: operatorTodo('rolul (de exemplu, avocat coordonator)'),
      credential: operatorTodo('legitimația verificabilă (membru al baroului, nr.)'),
      credentialType: 'bar',
      profileLink: null,
      isLicensedLegalProfessional: true,
    },
    {
      name: operatorTodo('numele persoanei sau organizației partenere'),
      role: operatorTodo('rolul în proiect'),
      credential: operatorTodo('afilierea sau acreditarea verificabilă'),
      credentialType: 'ngo',
      profileLink: null,
      isLicensedLegalProfessional: false,
    },
  ],

  model: {
    provider: operatorTodo('furnizorul modelului (intern sau terț, numit)'),
    knownFailureModes: [
      'Analiza acoperă reglementările din Republica Moldova și nu evaluează contracte din alte jurisdicții.',
      'Sistemul cunoaște reglementările până la o anumită dată și poate să nu reflecte modificări legislative foarte recente.',
      'Documentele scanate sau fotografiate de calitate slabă pot fi citite incomplet, iar unele formate sunt tratate mai puțin bine.',
    ],
  },

  privacy: {
    // FR-024 / FR-033 — exact fields, from the spec.
    fieldsStripped: ['numele', 'codul numeric personal', 'adresa', 'numărul de cont', 'blocul de semnătură'],
    fieldsRetained: ['numele creditorului', 'datele', 'sumele'],
    processingLocation: 'server',
    thirdPartyProvider: operatorTodo('furnizorul terț care primește textul contractului, dacă există'),
    retentionContract: operatorTodo('durata de păstrare a contractului'),
    retentionReport: operatorTodo('durata de păstrare a raportului'),
    deletionMethod: operatorTodo('modul în care utilizatorul își șterge datele'),
    usedForTraining: false,
    sharedSoldAggregated: false,
    lenderContacted: false, // FR-037
    dataHandlingDocUrl: PATHS.dataHandling,
  },
};
