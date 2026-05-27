# Contract: Newsletter Subscribe (Phase 3, optional off-ramp)

Backs the optional "regulator-action newsletter" off-ramp (FR-053). External service; the page only collects an email and a locale and starts a double opt-in. Anonymous — no profiling, no third-party trackers.

- **Base URL**: `VITE_INTAKE_BASE_URL` (or a dedicated `VITE_NEWSLETTER_BASE_URL`), TLS required.
- **Consumer**: a small handler in the off-ramp component.

## POST /v1/newsletter

**Request** — `application/json`
```json
{ "email": "string", "locale": "ro" }
```

**Responses**

`202 Accepted` (confirmation email sent — double opt-in)
```json
{ "status": "pending_confirmation" }
```

`400 Bad Request`
```json
{ "error": "invalid_email", "message": "string" }
```

`409 Conflict`
```json
{ "error": "already_subscribed", "message": "string" }
```

`429` / `5xx` — as in the upload-intake contract.

## Rules

- Double opt-in only; the address is never considered subscribed until the emailed confirmation is followed.
- No name or other PII is requested. The signup is not a lead-gen funnel and is not tied to any upload (FR-053, Non-Goals).
- The confirmation/result message is plain-language (B1) and announced accessibly.
- If the operator chooses not to run a newsletter, this off-ramp is omitted and another off-ramp artifact (sample report or abuse-pattern guide) satisfies FR-053 instead.
