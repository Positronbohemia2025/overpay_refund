# UX acceptance checklist

A short usability script for the success criteria that depend on a human
reader, not on automated checks. Run it with three people (one for each
borrower persona — unaware, suspicious-but-stuck, resigned). All items are
release-blocking.

## Setup

- Use the production build (`npm run build && npm run preview`) on a typical
  laptop and a 360-px-wide mobile viewport.
- Tester opens the home page cold. **No briefing.** They read aloud what they
  see and answer questions after each task.

## Tasks

### SC-001 — One-scroll comprehension (≥ 90% can answer all six)

After the tester has scrolled once, ask them, without scrolling back:

- [ ] What is this service?
- [ ] Why might it apply to me?
- [ ] Who runs it?
- [ ] How is it funded?
- [ ] What happens to my contract?
- [ ] What do I get from trying it?

### SC-002 — The skeptic gets honest answers without hype

Ask the tester to find, without help:

- [ ] An answer to "What's the catch?" (free check + optional contingency fee).
- [ ] An answer to "Who actually sees my data?" (software, not humans;
      anonymized; what is stripped/retained).
- [ ] An answer to "What happens after the report?" (the three outcome paths).

Confirm none of the three answers required scrolling past therapeutic or hype
language.

### SC-003 — All required disclosures present and findable (≤ 20 s each)

Time the tester finding each of:

- [ ] Legal entity name + Moldovan jurisdiction + registration number.
- [ ] Real contact email and postal address.
- [ ] The contingency-fee model (free check + percentage of recovered funds).
- [ ] At least one named, licensed legal professional with credentials.
- [ ] The model provider (or "in-house") and its known failure modes.
- [ ] Where the file is processed and that the lender is never contacted.

### SC-004 — Non-uploader leaves with value

- [ ] Tester who refuses to upload can obtain a sample report.
- [ ] Tester can download the abuse-pattern guide.
- [ ] Tester can subscribe to the regulator-action newsletter (double opt-in).

### SC-005 — Each persona finds its section + next step

Each of the three personas should be able to point at a section written for
their situation and describe the next step it offers:

- [ ] Unaware borrower → §2 (Why this exists) + sample report or upload.
- [ ] Suspicious-but-stuck borrower → §3 + §5 + the report's three outcomes.
- [ ] Resigned borrower → §6 (the likely-unlawful path) + the contingency-fee
      disclosure in §4.

### SC-006 — Reach upload in one action

- [ ] From a cold load of the home page, the tester can start the upload in a
      single click or tap on the primary CTA. The widget receives focus and
      announces its first state to assistive technology.

## Sign-off

Tester: _________________ Date: _________________

Outcome:
- [ ] All boxes checked → ready to release for this checklist.
- [ ] Any unchecked → file the gap and re-run after the fix.
