# Phase 1 Data Model: Loan-Analysis Landing Page

This page has no database. The "data model" is (a) the structured **content model** that drives the sections and feeds translation/QA, and (b) the **client-side upload state machine**. All entities are typed in `src/types/` and validated by build-time content checks and unit tests. Validation rules trace to functional requirements (FR-xxx) and success criteria (SC-xxx).

## Content entities

### Locale
- `code`: string (BCP-47, e.g. `ro`)
- `label`: string (endonym shown in the language picker/footer)
- `dir`: `"ltr" | "rtl"` (Romanian: `ltr`)
- `isDefault`: boolean
- `reviewedByNativeSpeaker`: boolean
- **Rules**: exactly one `isDefault`; `ro` ships at launch with `reviewedByNativeSpeaker: true`. A locale with `reviewedByNativeSpeaker: false` MUST NOT be published (FR-054). Footer lists every published locale (FR-043).

### LegalEntity *(disclosure — required)*
- `registeredName`, `jurisdiction` (= "Moldova"), `registrationNumber`, `contactEmail`, `postalAddress`: string (all required)
- `regulatoryStanding`: string | null
- **Rules**: all required fields non-empty or the build fails (FR-029, FR-042, SC-003). Surfaced both high in the page (§4) and in the footer.

### FundingModel *(disclosure — required)*
- `freeCheck`: boolean (= true)
- `contingencyFeePercent`: number | string (operator-supplied; e.g. `25` or a range)
- `recoveryRoutes`: array of `"regulator_letters" | "legal_process"` (both)
- `underLicensedProfessionals`: boolean (= true)
- **Rules**: `freeCheck` true; `contingencyFeePercent` present and disclosed in §4 (not only the footer) (FR-030). The copy MUST NOT claim "no percentage of any refund" (FR-031) — enforced by the tone/claims lint banned-phrase list.

### ResponsibleParty *(disclosure — required, 1..n)*
- `name`, `role`: string
- `credential`: string
- `credentialType`: `"bar" | "ngo" | "academic" | "regulatory" | "other"`
- `profileLink`: URL | null
- `isLicensedLegalProfessional`: boolean
- **Rules**: at least one party; at least one with `isLicensedLegalProfessional: true` (the recovery service operates under their license — FR-031, FR-049). Each has a verifiable credential (FR-028). Links to a longer about page exist (FR-028).

### ModelDisclosure *(disclosure — required)*
- `provider`: `"in_house"` | string (named third-party provider)
- `knownFailureModes`: string[] — MUST include jurisdictional limits, training-data recency, and poorly-handled contract formats
- **Rules**: provider explicitly named (FR-012, FR-025); failure modes listed (FR-013). "Analysis is performed by software, not humans" stated in §3 and §1 subhead (FR-020, FR-025).

### PrivacyDisclosure *(disclosure — required)* — drives §5
- `fieldsStripped`: string[] — includes name, ID number, address, account number, signature block (FR-024, FR-033)
- `fieldsRetained`: string[] — includes lender name, dates, amounts (FR-024, FR-033)
- `processingLocation`: `"client" | "server" | "third_party_api"`
- `thirdPartyProvider`: string | null — named if it receives contract text (FR-034)
- `retentionContract`, `retentionReport`: string (duration)
- `deletionMethod`: string (how the borrower deletes) (FR-035)
- `usedForTraining`: boolean (FR-036)
- `sharedSoldAggregated`: boolean (FR-036)
- `lenderContacted`: boolean — MUST be false (FR-037)
- `dataHandlingDocUrl`: URL (FR-032)
- **Rules**: `lenderContacted === false`; if `processingLocation === "third_party_api"` then `thirdPartyProvider` required.

### AbusePattern *(content — 3..4)* — drives §2
- `id`: string
- `title`: string
- `explanation`: string (one sentence, plain prose)
- **Rules**: 3–4 items (FR-046), drawn from the approved set (200–600% APR via itemized fees; penalty-on-penalty interest; early-repayment charges; "optional" insurance without consent; default rollover). `explanation` is a single sentence; no blame-absolving phrasing (FR-046, FR-003). §2 ends with the fixed declarative line (FR-047).

### FaqItem *(content — exactly 10)* — drives §7
- `order`: integer 1..10 (unique)
- `question`: string
- `answer`: string
- **Rules**: exactly the 10 questions from FR-052 in that order; `answer` is 2–4 sentences and ends with a period, never a CTA (FR-052, SC-013). Enforced by the FAQ content lint.

### ReportStructure *(content)* — drives §6 and the sample report
- `clauseStatuses`: enum set `["compliant", "questionable", "likely_unlawful"]`
- `regulationCitedWhenApplicable`: boolean (= true)
- `overpaymentEstimate`: `{ shown: true, calculationShown: true }`
- `timingNote`: string (calm, factual)
- `recommendedNextStep`: string
- **Rules**: report described as a deliverable with all four elements (FR-048); overpayment calculation is shown, not just a number.

### AfterReportPath *(content — 3)* — drives §6
- `outcome`: `"likely_unlawful" | "ambiguous" | "nothing_found"`
- `description`: string
- `cost`: string | null (states whether it costs money)
- `payee`: string | null (to whom money goes)
- `humanReviewPath`: string | null (required when `outcome === "ambiguous"`)
- **Rules**: `likely_unlawful` path names next steps (referral / draft regulator complaint / draft demand letter), states cost + payee, and discloses the contingency-fee agreement (FR-049). `ambiguous` names resolving info + human-review path (FR-050). `nothing_found` promises a one-page summary, framed as not a dead end (FR-051).

### OffRampArtifact *(content — 1..3)* — drives Phase 3 + hero secondary CTA
- `type`: `"sample_report" | "abuse_pattern_guide" | "regulator_newsletter"`
- `label`: string
- `href`: URL (for documents) | `action` (for newsletter)
- **Rules**: at least one present (FR-053); `sample_report` exists from Phase 1 and is reachable from the hero secondary CTA (FR-041, FR-021). Presented as alternatives, not funnels.

### DesignTokens *(reference)* — `styles/tokens.css`
- `palette`: neutrals (muted slate, dusty blue, warm gray, off-white) + exactly one accent (calm teal or muted indigo)
- `radii`: scale within 12–20px
- `shadows`: soft shadow set (no hard borders)
- `type`: scale with body 16–18px
- `spacing`: generous-whitespace scale
- **Rules**: exactly one accent value; accent used only for CTAs, focus states, links (FR-009). No hard-border token (FR-011).

## Client-side state

### UploadSubmission (state machine) — `components/UploadWidget`
States: `idle → fileSelected → validating → (invalid | uploading) → (accepted | rejected)`

- `file`: `{ name, sizeBytes, mimeType } | null`
- `locale`: string
- `consents`: `{ anonymizedProcessing: boolean, terms: boolean }`
- `status`: the state above
- `statusMessage`: string — mirrored into the `aria-live` region (FR-039)
- `rejectReason`: `"unsupported_format" | "file_too_large" | "empty_file" | "missing_consent" | "network_error" | null`
- `submissionId`: string | null (set on `accepted`)

**Transitions / rules**
- `fileSelected → validating`: check `mimeType` against the configurable allowlist and `sizeBytes` against the max; on failure → `invalid` with `rejectReason`, surfaced to the user, not silent (FR-040).
- `validating → uploading`: only when both consents are true (no action without explicit authorization — FR-037); otherwise `rejected: missing_consent`.
- `uploading → accepted`: on `202` from the intake endpoint; store `submissionId`.
- `uploading → rejected`: on `4xx/5xx` or network error, with a plain-language message.
- Every transition updates `statusMessage` so screen readers hear progress (SC-008). The file is never persisted client-side beyond the in-memory submission.

### LanguagePreference
- `code`: string, stored in `localStorage`; defaults to `ro`. Used to pick the initial locale; never used for tracking.

## Validation summary (build-time gates)

| Gate | Source |
|------|--------|
| All `LegalEntity` fields present | FR-029, FR-042, SC-003 |
| `FundingModel.contingencyFeePercent` present + disclosed in §4 | FR-030 |
| ≥1 `ResponsibleParty`, ≥1 licensed professional, all with credentials | FR-028, FR-031 |
| `ModelDisclosure.provider` named + 3 failure modes | FR-012, FR-013 |
| `PrivacyDisclosure.lenderContacted === false`; provider named if 3rd-party | FR-034, FR-037 |
| 3–4 `AbusePattern`, one-sentence explanations | FR-046 |
| Exactly 10 `FaqItem` in order; answers 2–4 sentences ending in period | FR-052, SC-013 |
| 3 `AfterReportPath` outcomes covered | FR-049–FR-051 |
| ≥1 `OffRampArtifact`; sample report present | FR-041, FR-053 |
| Exactly one accent token | FR-009 |
| Published locales all `reviewedByNativeSpeaker` | FR-054 |
