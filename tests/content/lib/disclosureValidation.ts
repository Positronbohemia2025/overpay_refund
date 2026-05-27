/**
 * Structural validation of the required disclosure set (data-model "Validation
 * summary"). Asserts every required slot is PRESENT (operator placeholders count
 * as present — emptiness is the failure). Whether the values are real, verifiable
 * operator content is a separate gate (T065 / operator-content completeness).
 */
import type { DisclosureSet } from '../../../src/types';

export interface DisclosureIssue {
  field: string;
  problem: string;
}

const REQUIRED_STRIPPED = ['numele', 'codul numeric personal', 'adresa', 'numărul de cont', 'blocul de semnătură'];
const REQUIRED_RETAINED = ['numele creditorului', 'datele', 'sumele'];

function isPresent(value: string): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateDisclosures(d: DisclosureSet): DisclosureIssue[] {
  const issues: DisclosureIssue[] = [];
  const require = (field: string, value: string) => {
    if (!isPresent(value)) issues.push({ field, problem: 'missing' });
  };

  // Legal entity (FR-022, FR-029, FR-042, SC-003)
  require('legalEntity.registeredName', d.legalEntity.registeredName);
  require('legalEntity.nature', d.legalEntity.nature);
  require('legalEntity.registrationNumber', d.legalEntity.registrationNumber);
  require('legalEntity.contactEmail', d.legalEntity.contactEmail);
  require('legalEntity.postalAddress', d.legalEntity.postalAddress);
  if (d.legalEntity.jurisdiction !== 'Moldova') {
    issues.push({ field: 'legalEntity.jurisdiction', problem: 'must be Moldova' });
  }

  // Funding (FR-030, FR-031)
  if (d.funding.freeCheck !== true) issues.push({ field: 'funding.freeCheck', problem: 'must be true' });
  require('funding.contingencyFeePercent', String(d.funding.contingencyFeePercent));
  require('funding.fundingSource', d.funding.fundingSource);
  for (const route of ['regulator_letters', 'legal_process'] as const) {
    if (!d.funding.recoveryRoutes.includes(route)) {
      issues.push({ field: 'funding.recoveryRoutes', problem: `missing ${route}` });
    }
  }

  // People (FR-028, FR-031)
  if (d.people.length < 1) issues.push({ field: 'people', problem: 'need at least one' });
  if (!d.people.some((p) => p.isLicensedLegalProfessional)) {
    issues.push({ field: 'people', problem: 'need a licensed legal professional' });
  }
  d.people.forEach((p, i) => {
    require(`people[${i}].name`, p.name);
    require(`people[${i}].role`, p.role);
    require(`people[${i}].credential`, p.credential);
  });

  // Model (FR-012, FR-013, FR-025)
  require('model.provider', d.model.provider);
  if (d.model.knownFailureModes.length < 3) {
    issues.push({ field: 'model.knownFailureModes', problem: 'need at least three' });
  }

  // Privacy (FR-024, FR-033, FR-034, FR-037)
  if (d.privacy.lenderContacted !== false) {
    issues.push({ field: 'privacy.lenderContacted', problem: 'must be false (FR-037)' });
  }
  for (const f of REQUIRED_STRIPPED) {
    if (!d.privacy.fieldsStripped.includes(f)) {
      issues.push({ field: 'privacy.fieldsStripped', problem: `missing ${f}` });
    }
  }
  for (const f of REQUIRED_RETAINED) {
    if (!d.privacy.fieldsRetained.includes(f)) {
      issues.push({ field: 'privacy.fieldsRetained', problem: `missing ${f}` });
    }
  }
  if (d.privacy.processingLocation === 'third_party_api' && !isPresent(d.privacy.thirdPartyProvider ?? '')) {
    issues.push({ field: 'privacy.thirdPartyProvider', problem: 'required for third_party_api' });
  }
  require('privacy.retentionContract', d.privacy.retentionContract);
  require('privacy.retentionReport', d.privacy.retentionReport);
  require('privacy.deletionMethod', d.privacy.deletionMethod);
  require('privacy.dataHandlingDocUrl', d.privacy.dataHandlingDocUrl);

  return issues;
}
