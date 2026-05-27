# Feature Specification: Loan-Analysis Landing Page

**Feature Branch**: `001-loan-analysis-landing`  
**Created**: 2026-05-27  
**Status**: Draft  
**Input**: User description: "Build a landing page for a legal-tech platform that analyzes microfinance loan contracts and reports, in plain language, whether the borrower was charged unfair, abusive, or unlawful terms — predatory interest, undisclosed fees, hidden charges, abusive clauses, or overpayments — and what, if anything, the borrower may be entitled to recover or how they are legally protected." (Extended with detailed section, accessibility, off-ramp, success, non-goal, and tone requirements.)

## Clarifications

### Session 2026-05-27 (initial)

- Q: How is the platform funded, and does it earn money from anything? → A: The automated check is free. The platform earns a contingency fee — a percentage of funds recovered for the borrower — under a separate, opt-in agreement offered after the report. Recovery is pursued through official letters to regulating bodies or through a legal process; the same fee applies regardless of route. Letters and filings are sent in the borrower's name under the license of paid legal professionals.
- Q: At the primary call to action, what does the borrower do? → A: The borrower uploads their contract directly on the page; the automated analysis is initiated from the page.
- Q: Which legal market and primary language does the page target? → A: Moldova. The page is written in Romanian; legal claims, abuse patterns, and entity registration are grounded in Moldovan consumer-credit / microfinance law.

### Session 2026-05-27 (extended brief incorporated)

- The detailed seven-section structure (Hero, Why this exists, How it works, Who we are / funding, What happens with your contract, Report contents + after, FAQ) plus accountability footer, accessibility/language rules, off-ramp, success criteria, non-goals, and overall feeling were incorporated.
- Q: The extended brief's section 4 says "We do not take a percentage of any refund," contradicting the contingency-fee answer above. Which governs? → A: The contingency-fee model governs. The section-4 line "We do not take a percentage of any refund" is **overridden**; section 4 instead discloses the contingency fee honestly. The non-goal "Not a lead-gen funnel for paid legal services" is **reframed**: the free check and self-serve options stand alone, and the optional paid recovery service is disclosed, not hidden.
- Q: How should the work be structured for phased delivery? → A: One spec (this file) restructured into three independently shippable phases.
- Q: Which languages, native-speaker reviewed? → A: Romanian only for now. The architecture must support adding languages later; any language added must be reviewed by native speakers, never auto-translated.

## Phased Delivery

The page is a single deliverable built in three independently shippable phases. The rendered page always follows the canonical section order (see FR-001); earlier phases may ship with later-phase sections absent, but every section that is present keeps its canonical position.

- **Phase 1 (P1) — Credible, functional core**: Hero (§1), How it works (§3), Who we are / funding (§4), What happens with your contract (§5), Footer, the contract-upload entry point, and a sample report (linked from the hero). A visitor can understand and trust the service and start a check.
- **Phase 2 (P2) — Recognition and outcomes**: Why this exists (§2) and Report contents + after-report paths (§6). Converts unaware and resigned borrowers.
- **Phase 3 (P3) — Objections, off-ramps, and reach**: FAQ (§7), off-ramp artifacts for unready visitors, and multilingual readiness.

## User Scenarios & Testing *(mandatory)*

The page must work for three borrower groups treated as equally important: borrowers who suspect nothing, borrowers who suspect something but cannot verify it, and borrowers who know they were treated badly but assume there is no path forward. The dominant blockers are ignorance, friction, normalization, and resignation. Validation is conveyed by accurate description, never by stated reassurance; no section asks the reader to feel a specific emotion.

### User Story 1 - Phase 1: Trust the service and start a check (Priority: P1)

A borrower lands on the page and, within one scroll, understands what the service is, who runs it, how it is funded, and what will happen to their contract. They can then upload the contract to begin a free automated check, or view a sample report first.

**Why this priority**: This is the institutional-credibility minimum viable page. The premise of the product is that substantive credibility — not soft visuals — earns trust. Without a credible, functional core, no later content matters.

**Independent Test**: Load the page as a first-time visitor and confirm the hero states what the service does (not what it avoids), one trust signal, two CTAs, and a below-fold line naming the legal entity and funding source. Confirm the how-it-works, who-we-are/funding, privacy, and footer sections are present, and that a contract can be uploaded and a sample report viewed.

**Acceptance Scenarios**:

1. **Given** a first-time visitor, **When** they read the hero, **Then** a single (non-stacked) headline states what the product does, a one-paragraph subhead states that analysis is automated and the contract is anonymized before review, a primary CTA "Check my contract" and a secondary CTA "See a sample report" are present, and one line below the hero fold names the legal entity and funding source and that checking is free.
2. **Given** a visitor reading "How it works", **When** they read the three steps, **Then** each step states what happens, who or what performs it, and what the borrower sees; step 1 lists which fields are stripped and which are retained and where the file is processed; step 2 states the analysis is performed by software not humans and names any third-party model provider; step 3 describes the report.
3. **Given** a visitor checking who is accountable, **When** they reach "Who we are and how we are funded" high in the page, **Then** named people or partner organizations with verifiable credentials, the legal entity (registered name, Moldovan jurisdiction, registration number, contact), the funding source, and a "what we are not" block are all present; **And** the footer repeats the legal entity, jurisdiction, registration number, a real contact email and postal address, and the required links and disclaimer.
4. **Given** a privacy-cautious visitor, **When** they read "What happens with your contract", **Then** the exact fields stripped and retained are named, where analysis runs is stated (naming any third-party provider that receives contract text), retention and deletion are stated, training/sharing/selling use is stated, and it is stated that the lender is never contacted and no action is taken without explicit authorization.
5. **Given** a visitor ready to act, **When** they use the primary CTA, **Then** they can upload a contract and the upload widget announces its status to assistive technology; **And** unsupported documents are reported clearly rather than failing silently.

---

### User Story 2 - Phase 2: Recognize the situation and understand the outcome (Priority: P2)

An unaware borrower reads concrete descriptions of how microfinance contracts are structured and recognizes their own situation. Any borrower reads what the report will contain and what happens after each possible outcome, including the optional recovery path.

**Why this priority**: Recognition converts the unaware; a described, non-dead-end outcome converts the resigned. The brief states that without the "what comes after" section the page promises clarity and architects a dead end.

**Independent Test**: Present the "Why this exists" and "Report contents + after" sections and confirm a reader who suspected nothing can match a named pattern to their loan, and that a reader can state what the report contains and the defined next step for each of the three outcomes.

**Acceptance Scenarios**:

1. **Given** a visitor who never suspected a problem, **When** they read "Why this exists", **Then** three to four named patterns are described in plain prose (one explanatory sentence each), and a closing line states that a borrower who paid on time every time can still be substantially overpaying with no visible signal — with no blame-absolving or "many people don't realize" phrasing.
2. **Given** a visitor reading "What the report contains", **When** they review it, **Then** the report is described as a deliverable: a clause-by-clause summary marked compliant/questionable/likely unlawful with regulation cited where applicable, an overpayment estimate with the calculation shown, a calm note on whether timing affects options, and a recommended next step.
3. **Given** likely unlawful charges are found, **When** the visitor reads "what comes after", **Then** the page states a clear next path (referral to a vetted professional, a draft regulator complaint, or a draft demand letter the borrower can send), states whether it costs money and to whom, and discloses the optional contingency-fee recovery agreement (a percentage of funds recovered, via regulator letters or legal process, under licensed professionals).
4. **Given** findings are ambiguous, **When** the visitor reads the outcome, **Then** the page names what additional information would resolve the ambiguity and how to obtain a human review.
5. **Given** nothing clearly unlawful is found, **When** the visitor reads the outcome, **Then** they receive a one-page summary of what was checked and what to watch for, framed as not a dead end.

---

### User Story 3 - Phase 3: Resolve objections and leave with value (Priority: P3)

A skeptical reader finds plain answers to the questions they actually ask first. A visitor who is not ready to upload leaves with something useful instead of facing an upload-or-leave dead end. Readers are told which languages the page supports.

**Why this priority**: Objection-handling and off-ramps broaden trust and reach beyond the motivated visitor, and serve people who are not yet ready to act. They build on a page that is already credible and functional.

**Independent Test**: Present the FAQ and the off-ramp options and confirm a skeptical reader gets honest answers to "what's the catch", "who sees my data", and "what happens after the report", and that a non-uploading visitor can obtain a sample report, an abuse-pattern guide, or a regulator-action newsletter.

**Acceptance Scenarios**:

1. **Given** a skeptical reader, **When** they read the FAQ, **Then** the ten listed questions appear in the given order, each answered in two to four plain sentences ending in a period rather than a call to action.
2. **Given** a visitor not ready to upload, **When** they reach an off-ramp, **Then** at least one of a downloadable plain-language abuse-pattern guide, an anonymous newsletter of recent Moldovan regulator actions against MFOs, or a clearly labeled sample report is available, presented as an alternative rather than a lead-gen funnel.
3. **Given** any visitor, **When** they look for language support, **Then** the page names the languages it supports (Romanian at launch), and any additional language present has been reviewed by native speakers rather than auto-translated.

---

### Edge Cases

- A visitor reads only the hero and the footer: they still learn what the service does, that it is automated, that checking is free, and that a named, registered entity is accountable.
- A visitor has reduced-motion enabled: all non-essential motion is removed and no content depends on motion to be understood.
- A keyboard-only or screen-reader visitor: every section, the upload widget (with spoken status), the CTAs, and the footer disclosures are reachable and announced; focus states are visible.
- A visitor uploads an unsupported or poorly-handled format: expectations are set before upload (per the named failure modes) and the limitation is communicated, not silent.
- A visitor no longer has the original contract, took the loan years ago, or is still repaying: the FAQ answers each of these directly.
- A claim in the copy cannot be verified: the claim is removed rather than softened.
- A visitor decides not to upload: they are not left at a dead end; an off-ramp gives them value.

## Requirements *(mandatory)*

### Cross-cutting requirements (all phases)

- **FR-001**: The rendered page MUST follow the canonical section order: (1) Hero, (2) Why this exists, (3) How it works, (4) Who we are and how we are funded, (5) What happens with your contract, (6) What the report contains and what comes after, (7) FAQ, then the accountability footer. Sections from later phases MAY be absent in earlier phases, but present sections MUST keep this order.
- **FR-002**: All copy MUST use declarative subject-verb-object sentences and MUST NOT use exclamation points, urgency language, countdowns, or scarcity framing.
- **FR-003**: The page MUST convey validation through accurate description and MUST NOT use therapeutic or reassurance phrasing (for example "that is not your fault," "many people do not realize," "we believe," "feel seen"), and MUST NOT use shame- or fear-based framing.
- **FR-004**: No section MUST ask the reader to feel a specific emotion; recognition, relief, and confidence must arise from the accuracy of the description.
- **FR-005**: The page MUST NOT use the anonymous "we" to refer to who is responsible for the service outside ordinary body copy.
- **FR-006**: Every factual claim on the page MUST be verifiable; unverifiable claims MUST be removed rather than hedged.
- **FR-007**: All copy MUST target a plain-language B1 / approximately grade-8 reading level, with idioms removed.
- **FR-008**: The page MUST render in light mode only; a dark mode MUST NOT be provided.
- **FR-009**: The page MUST use a soft neutral palette (muted slate, dusty blue, warm gray, off-white) with exactly one accent color (calm teal or muted indigo), used only for calls to action, focus states, and links.
- **FR-010**: The page MUST use a humanist sans-serif typeface for body text at a minimum size of 16–18px with high contrast; a quiet serif MAY be used for headlines only if it adds warmth without ornament.
- **FR-011**: The page MUST use rounded corners in the 12–20px range and soft shadows, MUST NOT use hard borders as the primary separation device, and MUST use generous whitespace and long vertical rhythm without dense copy walls.
- **FR-012**: Iconography, where used, MUST be thin-stroke and monochrome; diagrams are permitted only when they convey information.
- **FR-013**: The page MUST limit motion to gentle state transitions, MUST honor the reduced-motion preference, and MUST NOT use parallax, autoplay, scroll-jacking, or animated anonymization previews.
- **FR-014**: The page MUST NOT use stock photography or testimonial photos; any testimonial MUST NOT display monetary amounts that read as winnings.
- **FR-015**: The page MUST NOT use aggressive fintech aesthetics, neon gradients, heavy glassmorphism, crypto/startup hype language, trust-badge clutter, corporate-banking gravitas (navy-and-gold, pillars), or legal-intimidation imagery (scales, gavels, courthouses).
- **FR-016**: The page MUST meet WCAG 2.2 AA for contrast, focus states (using the accent color), keyboard navigation, screen-reader support, and reduced motion.
- **FR-017**: The page targets current evergreen browsers and MUST stay responsive and legible across common mobile, tablet, and desktop widths (from ~360px up). Support for outdated browsers, old or low-end devices, and constrained networks is out of scope and is NOT enforced.
- **FR-018**: The overall presentation MUST read as a small, accountable institution that does one thing well and explains itself plainly — closer to a public-records portal or academic legal-aid project than a consumer fintech.

### Phase 1 — Hero (§1)

- **FR-019**: The hero MUST open with what the product does, not what it does not do, and MUST present a single headline (one of the approved candidates), not stacked headlines.
- **FR-020**: The hero MUST include a one-paragraph subhead (not three defensive bullets) stating that the service analyzes microfinance contracts for unlawful interest, undisclosed fees, and refund-entitling clauses, that the analysis is automated, that the contract is anonymized before review, and that the result belongs to the borrower.
- **FR-021**: The hero MUST present exactly one trust signal and exactly two calls to action: a primary "Check my contract" (begins upload) and a secondary "See a sample report".
- **FR-022**: A single line below the hero fold MUST name the legal entity, its nature, the jurisdiction, the funding source, and that there is no charge to check the contract.

### Phase 1 — How it works (§3)

- **FR-023**: The "How it works" section MUST present three steps; each step MUST state what happens, who or what performs it, and what the borrower sees.
- **FR-024**: Step 1 (Upload) MUST state which identifying fields are stripped before analysis (name, ID number, address, account number, signature block), which are retained for context (lender name, dates, amounts), and where the file is processed.
- **FR-025**: Step 2 (Automated analysis) MUST state that the analysis is performed by a software system and not by humans, MUST name any third-party model provider used, and MUST state that checks apply Moldovan regulations.
- **FR-026**: Step 3 (Report) MUST state that the borrower receives a report covering what is likely compliant, what is questionable, what may entitle them to a refund or legal protection, and what professional follow-up is available.

### Phase 1 — Who we are and how we are funded (§4)

- **FR-027**: This section MUST be placed high in the page (not buried) and MUST contain four blocks: who built it, the legal entity, funding, and "what we are not".
- **FR-028**: The "who built it" block MUST name the people or partner organizations responsible with verifiable credentials (e.g., bar membership, NGO affiliation, academic post, regulatory registration) and MUST link to a longer "about" page.
- **FR-029**: The "legal entity" block MUST state the registered name, Moldovan jurisdiction, registration number, and contact.
- **FR-030**: The "funding" block MUST name the source that keeps the check free, and MUST name here (not in the footer) the paid recovery service and its contingency fee — a percentage of funds recovered for the borrower under a separate opt-in agreement.
- **FR-031**: The "what we are not" block MUST distinguish the service from adjacent ones: it is not a debt consolidator, not a settlement service, and not a law firm (it acts under the license of named legal professionals), and checking the contract is free. It MUST NOT claim the platform never takes a percentage of a refund.

### Phase 1 — What happens with your contract (§5)

- **FR-032**: This section MUST state privacy as specifics, not adjectives, presented as a clean panel or short list, and MUST link to a detailed data-handling document.
- **FR-033**: It MUST name the exact fields stripped and the exact fields retained during anonymization.
- **FR-034**: It MUST state where analysis runs (client-side, server-side, or third-party API) and MUST name any third-party model provider that receives contract text.
- **FR-035**: It MUST state how long the contract and the report are retained and how the borrower deletes them.
- **FR-036**: It MUST state whether contract data is used to train any model and whether it is shared, sold, or aggregated.
- **FR-037**: It MUST state that the lender is never contacted by the platform and that no action is taken on the borrower's behalf without explicit authorization.

### Phase 1 — Contract upload entry & sample report

- **FR-038**: The page MUST accept a contract document upload directly on the page and initiate the automated check from there; the check MUST be free with no account or up-front payment required.
- **FR-039**: The upload widget MUST announce its status clearly to screen readers (for example "Reading clauses", "Checking interest rates").
- **FR-040**: The page MUST set expectations about supported contract formats and MUST communicate clearly when an uploaded document cannot be processed.
- **FR-041**: A clearly labeled sample report MUST be available and reachable from the hero's secondary CTA.

### Phase 1 — Footer

- **FR-042**: The footer MUST state the legal entity, jurisdiction, and registration number; a real contact email and real postal address; and regulatory standing where applicable.
- **FR-043**: The footer MUST link to data handling, methodology, terms, an accessibility statement, and the languages supported.
- **FR-044**: The footer MUST include a short disclaimer that the analysis is guidance, not a legal verdict, and that a qualified professional may be needed for action.
- **FR-045**: The footer MUST NOT be a conversion call to action; a single closing line stated as a statement (not a button), such as "When you are ready, upload your contract.", is permitted.

### Phase 2 — Why this exists (§2)

- **FR-046**: This section MUST describe three to four named abuse patterns in plain prose with one explanatory sentence each, drawn from: effective annual rates of 200–600% obscured by separately itemized service/processing/insurance fees; penalty interest compounded on penalty interest; early-repayment charges that erase the borrower's saving; "optional" insurance attached without informed consent; rollover clauses that extend the loan at unfavorable terms by default.
- **FR-047**: This section MUST end with one declarative line stating that a borrower who paid the lender on time, every time, can still be substantially overpaying without any visible signal that something is wrong.

### Phase 2 — Report contents and what comes after (§6)

- **FR-048**: This section MUST describe the report as a deliverable containing: a clause-by-clause summary marked compliant / questionable / likely unlawful with the regulation cited where applicable; an estimate of any overpayment with the calculation shown; a calm note on whether timing affects the borrower's options; and a recommended next step.
- **FR-049**: For a finding of likely unlawful charges or abusive clauses, the page MUST state a clear next path (e.g., referral to a vetted professional, a draft regulator complaint letter, or a draft demand letter the borrower can send), MUST state whether each costs money and to whom the money goes, and MUST disclose the optional contingency-fee recovery agreement (a percentage of recovered funds, pursued via regulator letters or a legal process, with letters and filings sent in the borrower's name under licensed legal professionals).
- **FR-050**: For an ambiguous finding, the page MUST name what additional information would resolve the ambiguity and how the borrower can obtain a human review.
- **FR-051**: For a finding of nothing clearly unlawful, the page MUST state that the borrower receives a one-page summary of what was checked and what to watch for, framed as not a dead end.

### Phase 3 — FAQ (§7), off-ramp, and languages

- **FR-052**: The FAQ MUST present these ten questions in this order, each answered in two to four plain sentences ending in a period (not a call to action): (1) Is this free? What is the catch? (2) Who actually reads my contract? (3) What happens to my contract after analysis? (4) Will my lender find out I checked? (5) I do not have the original contract anymore. Can I still check? (6) Is it too late if I took out the loan years ago? (7) I am still paying this loan. Does that matter? (8) What happens if the analysis finds nothing? (9) How is this different from asking a lawyer? (10) Do I need to take any action after I get the report?
- **FR-053**: The page MUST offer at least one off-ramp for a visitor who is not ready to upload: a downloadable plain-language guide to common MFO abuse patterns, an anonymous newsletter of recent Moldovan regulator actions against MFOs, or the clearly labeled sample report. These MUST be presented as alternatives, not lead-gen funnels.
- **FR-054**: The page MUST name the languages it supports (Romanian at launch). The architecture MUST support adding languages later, and any added language MUST be reviewed by native speakers in the relevant community and MUST NOT be auto-translated.

### Key Entities *(include if feature involves data)*

- **Borrower (visitor)**: The reader of the page. Three personas — unaware, suspicious-but-stuck, resigned — each with a distinct blocker.
- **Uploaded contract**: The document uploaded on the page to start the check; subject to the stated stripping, retention, and processing-location rules.
- **Abuse pattern**: A named, concretely described category of unfair, abusive, or unlawful term, grounded in Moldovan microfinance practice.
- **Disclosure set**: The required, verifiable disclosures — automated-analysis statement with provider and limits, legal entity, funding model (free check + contingency-fee recovery), responsible people/partners including licensed legal professionals.
- **Report**: The plain-language deliverable (clause-by-clause status, overpayment estimate with calculation, timing note, next step) plus the three outcome paths.
- **Recovery agreement**: The optional, opt-in arrangement under which the platform pursues recovery (regulator letters or legal process) for a percentage of recovered funds, under licensed legal professionals.
- **Off-ramp artifact**: The sample report, abuse-pattern guide, or regulator-action newsletter offered to non-uploading visitors.
- **Legal entity**: The registered organization accountable for the service (registered name, Moldovan jurisdiction, registration number, contact email and postal address).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Within one scroll, at least 90% of first-time visitors with no prior framing can state what the service is, why it might apply to them, who runs it, how it is funded, what happens to their contract, and what they receive from trying it.
- **SC-002**: A skeptical reader finds honest answers to "what is the catch", "who sees my data", and "what happens after the report" without scrolling past hype, verified in testing.
- **SC-003**: 100% of the required disclosures are present and findable; accountability is signaled above the fold and full legal-entity details appear in the footer, verified by audit.
- **SC-004**: A reader who decides not to upload can still obtain value (sample report, abuse-pattern guide, or newsletter) in testing.
- **SC-005**: All three borrower personas can point to at least one section written for their situation and describe the next step it offers them.
- **SC-006**: A motivated visitor can reach the contract-upload step from the hero in a single action (one click or tap).
- **SC-007**: A content audit finds zero exclamation points, zero urgency/scarcity terms, zero reassurance/therapeutic phrases, zero emotional asks, and zero prohibited imagery.
- **SC-008**: The page passes WCAG 2.2 AA automated and manual contrast and keyboard-operability checks with zero blocking violations, and the upload widget's status changes are announced to screen readers.
- **SC-009**: With reduced-motion enabled, no non-essential motion plays and all content remains fully understandable.
- **SC-010**: All required content and disclosures remain present and legible at a 360px-wide mobile viewport.
- **SC-011**: Copy is verified at a B1 / grade-8 reading level.
- **SC-012**: Every factual claim maps to a verifiable source in a claims audit; no unverifiable claim ships.
- **SC-013**: Every FAQ answer is two to four sentences and ends in a period, not a call to action, verified by audit.

## Non-Goals

- Not a marketing site for a law firm.
- Not an account or case-management surface; the page exists to convey what the service is and to start a first analysis.
- Not a funnel that withholds the report's value behind payment: the free check, the report, and the self-serve options (e.g., draft letters the borrower sends) stand alone. The optional paid recovery service (contingency fee) is disclosed plainly, not hidden, and is never a precondition for receiving the report. *(Reframes the brief's "not a lead-gen funnel for paid legal services" in light of the retained contingency-fee model.)*

## Assumptions

- The landing page hosts the contract-upload entry point and initiates the automated check; the analysis processing and report generation/delivery occur in a backend flow outside this page's UI scope, but the upload entry and its data-handling messaging are in scope.
- The optional recovery service (regulator letters, legal process, contingency-fee agreement) is described and disclosed on the page but executed in a separate post-report flow; the contingency-fee percentage is operator-supplied content.
- The actual values for the required disclosures — registered entity name and number, contact email and postal address, named model/provider, the contingency-fee percentage, the responsible individuals and licensed legal professionals, regulatory standing, and the funding source that keeps the check free — are real content supplied by the operator before launch. This spec requires each disclosure to be present, accurate, and verifiable; it does not invent the values.
- The page targets Moldova and launches in Romanian; legal-protection claims and abuse patterns are grounded in Moldovan consumer-credit / microfinance law. The architecture is built to add languages later.
- Anonymization of the uploaded contract is described on the page in text and performed in the backend flow; the page does not display animated anonymization previews.
- The page is a single marketing-and-intake page (content plus a contract-upload entry point); no borrower account or login exists on this page.
- Supporting pages and documents referenced by the page (about, data-handling, methodology, terms, accessibility statement, sample report, abuse-pattern guide) exist or are produced alongside it; their full content is outside this spec but the links and the sample report are in scope as described.
