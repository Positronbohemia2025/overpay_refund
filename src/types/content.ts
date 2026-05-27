/**
 * Content schema (data-model.md). This page has no database; its "data model" is
 * the structured content that drives the sections and feeds translation/QA.
 * Each entity's validation rules trace to a functional requirement (FR-xxx) and
 * are enforced by the build-time content validation in tests/content/.
 */

export type LocaleCode = string; // BCP-47, e.g. "ro"

/** A supported page language (data-model: Locale). */
export interface Locale {
  code: LocaleCode;
  /** Endonym shown in the picker/footer. */
  label: string;
  dir: 'ltr' | 'rtl';
  isDefault: boolean;
  /** FR-054: a locale MUST NOT be published unless a native speaker reviewed it. */
  reviewedByNativeSpeaker: boolean;
}

/** FR-029, FR-042, SC-003 — all fields required or the build fails. */
export interface LegalEntity {
  registeredName: string;
  /** The kind of entity (e.g. "societate cu răspundere limitată", NGO) — FR-022. */
  nature: string;
  jurisdiction: 'Moldova';
  registrationNumber: string;
  contactEmail: string;
  postalAddress: string;
  regulatoryStanding: string | null;
}

/** FR-030, FR-031 — free check + honestly-disclosed contingency fee. */
export interface FundingModel {
  freeCheck: true;
  /** Operator-supplied; a number (percent) or a range string. */
  contingencyFeePercent: number | string;
  recoveryRoutes: Array<'regulator_letters' | 'legal_process'>;
  underLicensedProfessionals: true;
  /** What keeps the check free (grant, the recovery fee, etc.). */
  fundingSource: string;
}

export type CredentialType = 'bar' | 'ngo' | 'academic' | 'regulatory' | 'other';

/** FR-028, FR-031 — at least one licensed legal professional, all with credentials. */
export interface ResponsibleParty {
  name: string;
  role: string;
  credential: string;
  credentialType: CredentialType;
  profileLink: string | null;
  isLicensedLegalProfessional: boolean;
}

/** FR-012, FR-013, FR-025 — named provider + known failure modes. */
export interface ModelDisclosure {
  /** "in_house" or a named third-party provider. */
  provider: 'in_house' | string;
  /** MUST include jurisdictional limits, training-data recency, hard formats. */
  knownFailureModes: string[];
}

export type ProcessingLocation = 'client' | 'server' | 'third_party_api';

/** FR-024, FR-032–FR-037 — drives §5. Privacy as specifics, not adjectives. */
export interface PrivacyDisclosure {
  fieldsStripped: string[];
  fieldsRetained: string[];
  processingLocation: ProcessingLocation;
  /** Named if it receives contract text (FR-034). */
  thirdPartyProvider: string | null;
  retentionContract: string;
  retentionReport: string;
  deletionMethod: string;
  usedForTraining: boolean;
  sharedSoldAggregated: boolean;
  /** FR-037 — MUST be false. */
  lenderContacted: false;
  dataHandlingDocUrl: string;
}

/** The full required disclosure set surfaced across §1, §3, §4, §5, footer. */
export interface DisclosureSet {
  legalEntity: LegalEntity;
  funding: FundingModel;
  people: ResponsibleParty[];
  model: ModelDisclosure;
  privacy: PrivacyDisclosure;
}

/** FR-046, FR-047 — drives §2 (3–4 items). */
export interface AbusePattern {
  id: string;
  title: string;
  /** One sentence, plain prose, no blame-absolving phrasing. */
  explanation: string;
}

/** FR-052, SC-013 — drives §7 (exactly 10, in order). */
export interface FaqItem {
  order: number; // 1..10, unique
  question: string;
  answer: string; // 2–4 sentences ending in a period, never a CTA
}

export type ClauseStatus = 'compliant' | 'questionable' | 'likely_unlawful';

/** FR-048 — drives §6 and the sample report. */
export interface ReportStructure {
  clauseStatuses: ClauseStatus[];
  regulationCitedWhenApplicable: true;
  overpaymentEstimate: { shown: true; calculationShown: true };
  timingNote: string;
  recommendedNextStep: string;
}

export type Outcome = 'likely_unlawful' | 'ambiguous' | 'nothing_found';

/** FR-049–FR-051 — drives §6 (3 paths). */
export interface AfterReportPath {
  outcome: Outcome;
  description: string;
  cost: string | null;
  payee: string | null;
  /** Required when outcome === "ambiguous" (FR-050). */
  humanReviewPath: string | null;
}

export type OffRampType = 'sample_report' | 'abuse_pattern_guide' | 'regulator_newsletter';

/** FR-041, FR-053 — drives the off-ramp + hero secondary CTA. */
export interface OffRampArtifact {
  type: OffRampType;
  label: string;
  /** URL for documents; the literal "action" for the newsletter form. */
  href: string;
}
