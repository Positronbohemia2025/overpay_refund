<!--
Sync Impact Report
- Version change: (template, unversioned) → 1.0.0  [initial ratification]
- Bump rationale: First concrete adoption of the constitution from the placeholder
  template; establishes the principle set and governance. Initial release = 1.0.0.
- Principles (all newly defined from template placeholders):
    I. Substance Over Reassurance
    II. Declarative, Non-Manipulative Tone
    III. Calm Institutional Visual System
    IV. Accessibility Is a Floor (NON-NEGOTIABLE)
    V. Privacy and Explicit Consent
    VI. Jurisdiction and Language Integrity
    VII. Plain Language
- Added sections: Technology Standards (non-gating); Development Workflow & Quality
  Gates; Governance.
- Removed sections: none (template placeholders replaced).
- Template alignment:
    ✅ .specify/templates/plan-template.md — Constitution Check is a dynamic per-feature
       gate; references the constitution, no edit needed.
    ✅ .specify/templates/spec-template.md — no new mandatory sections introduced; aligned.
    ✅ .specify/templates/tasks-template.md — principle-driven gates (a11y, content,
       disclosure) already fit the existing phase structure; aligned.
    ✅ .specify/templates/checklist-template.md, agent-file-template.md — not affected.
- Deferred / follow-up TODOs:
    ⚠ README.md does not exist yet (feature task T066) — add a one-line pointer to this
      constitution when it is created.
    ⚠ CLAUDE.md (agent context) MAY link this constitution in its manual-additions block.
-->
# Overpay Constitution

This constitution governs every user-facing surface of the platform — the landing page and any future feature (analysis UI, recovery flow, report viewer, supporting pages). Principles are non-negotiable gates checked during `/speckit.plan` and `/speckit.analyze`. Feature specs inherit these rather than restating them; a spec only records what is specific to that feature.

## Core Principles

### I. Substance Over Reassurance

Trust is earned by verifiable specifics, not by soft surfaces. Every factual claim MUST be verifiable; an unverifiable claim is removed, not softened. Accountability MUST be named (legal entity, responsible people, funding) — the anonymous "we" is not used to refer to who is responsible. Limits, automation, and how money is made MUST be disclosed plainly, not buried. Soft palette and whitespace never substitute for stated facts.

### II. Declarative, Non-Manipulative Tone

Copy MUST use declarative subject-verb-object sentences. It MUST NOT use exclamation points, urgency, scarcity, countdowns, hype ("10x", "revolutionary"), therapeutic or reassurance register ("that is not your fault", "we believe", "feel seen"), or shame/fear framing. No surface asks the reader to feel a specific emotion; recognition and confidence arise from accurate description.

### III. Calm Institutional Visual System

Light mode only. Exactly one accent color, used only for CTAs, focus states, and links, on a soft neutral palette. Styling is CSS Modules fed by central design tokens — no utility CSS frameworks, no CSS-in-JS. Rounded corners 12–20px, soft shadows, generous whitespace, no hard borders as primary separators. Humanist sans body text ≥16px. Iconography is thin-stroke monochrome; diagrams only when informative. Prohibited: stock/testimonial photography, scales/gavels/courthouses, navy-and-gold banking gravitas, neon gradients, heavy glassmorphism, trust-badge clutter. Motion is limited to gentle transitions and MUST honor `prefers-reduced-motion`; no parallax, autoplay, scroll-jacking, or animated previews.

### IV. Accessibility Is a Floor (NON-NEGOTIABLE)

Every surface MUST meet WCAG 2.2 AA: contrast, visible focus states (using the accent token), full keyboard operability, screen-reader support, and reduced-motion. Interactive components MUST announce their own status to assistive technology. Accessibility is a release gate, not a later enhancement.

### V. Privacy and Explicit Consent

The audience is privacy-sensitive; the product handles sensitive contracts. No third-party analytics, trackers, or font CDNs by default. Collect the minimum data, and disclose handling in specifics (fields, location, retention, deletion, training/sharing) rather than adjectives. The platform MUST NOT act on a user's behalf or contact any third party (e.g., a lender) without explicit, informed authorization. Any deviation is disclosed on the surface that collects the data.

### VI. Jurisdiction and Language Integrity

Legal claims, protections, and entity registration are grounded in the operating jurisdiction (Moldova) and MUST be accurate to it — no borrowed or generic legal assertions. The page launches in Romanian. Any additional language MUST be reviewed by a native speaker of the relevant community and MUST NOT be auto-translated; unreviewed locales are not published.

### VII. Plain Language

All user-facing copy MUST target a B1 / approximately grade-8 reading level, with idioms removed. Clarity for the least-resourced reader takes priority over register or polish.

## Technology Standards (non-gating)

Default stack for user-facing surfaces, recorded to avoid re-litigation: React + Vite + TypeScript, client-rendered, CSS Modules + design tokens, React Router, i18next. Dependencies are kept minimal. There is no enforced performance budget and old/low-end-device support is out of scope unless a feature states otherwise. These are standards, not principles: a feature MAY deviate when justified in its plan's Complexity Tracking. Principles I–VII may not be deviated from this way.

## Development Workflow & Quality Gates

- **Content gates**: automated checks for tone (no exclamation/banned phrases), FAQ/format rules where applicable, reading level (B1), and a claims register mapping each factual claim to a source. Copy that fails these does not ship.
- **Disclosure gate**: a surface that makes a trust claim MUST carry its required, verifiable disclosures; the build fails on empty required disclosure slots rather than shipping an unbacked claim.
- **Accessibility gate**: axe in tests plus a manual keyboard/screen-reader pass before release.
- **No silent trackers**: any analytics added later must be privacy-first and disclosed.

## Governance

This constitution supersedes other practices for user-facing surfaces. `/speckit.plan` MUST evaluate each feature against Principles I–VII in its Constitution Check, and `/speckit.analyze` MUST flag any conflict as CRITICAL. Violations are resolved by changing the spec, plan, or tasks — not by diluting a principle. Complexity or deviation from the Technology Standards MUST be justified in the plan's Complexity Tracking. Amending a principle requires an explicit edit to this file with a version bump and a dated entry; principle changes are MAJOR, new principles or material expansions are MINOR, and clarifications are PATCH.

**Version**: 1.0.0 | **Ratified**: 2026-05-27 | **Last Amended**: 2026-05-27
