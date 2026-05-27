# Contract: Upload Intake

The boundary between this landing page and the out-of-scope analysis backend. The page's only responsibility is to hand off a validated, consented contract file; everything after (anonymization, analysis, report generation) is the backend's responsibility and is described to the user in §5 but not implemented here.

- **Base URL**: configured via `VITE_INTAKE_BASE_URL` (TLS required).
- **Consumer**: `src/lib/uploadClient.ts` (the UploadWidget island).
- **Auth**: none from the borrower (anonymous, no account). The endpoint should apply its own rate limiting / abuse protection.

## POST /v1/submissions

Create a new analysis submission.

**Request** — `multipart/form-data`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `file` | binary | yes | The contract document. |
| `locale` | string | yes | BCP-47, e.g. `ro`. Selects report language. |
| `consent_anonymized_processing` | boolean | yes | Must be `true`; mirrors the §5 disclosure that the file is anonymized before analysis. |
| `consent_terms` | boolean | yes | Must be `true`. |

**Client-side preconditions (enforced before the request — FR-040)**
- `file.mimeType` ∈ configurable allowlist (default: `application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `image/jpeg`, `image/png`).
- `0 < file.sizeBytes ≤ maxUploadBytes` (default 15 MB).
- Both consents `true` (FR-037 — no action without explicit authorization).

**Responses**

`202 Accepted`
```json
{ "submissionId": "string", "status": "queued" }
```

`400 Bad Request`
```json
{ "error": "missing_consent" | "empty_file" | "invalid_locale", "message": "string" }
```

`413 Payload Too Large`
```json
{ "error": "file_too_large", "maxBytes": 15728640, "message": "string" }
```

`415 Unsupported Media Type`
```json
{ "error": "unsupported_format", "accepted": ["application/pdf", "..."], "message": "string" }
```

`429 Too Many Requests` — `{ "error": "rate_limited", "retryAfterSeconds": 0 }`

`5xx` — `{ "error": "server_error", "message": "string" }`

**Client mapping**: `202` → `accepted` (store `submissionId`); `4xx/5xx`/network → `rejected` with a plain-language, B1-level message and a matching `rejectReason`. Every state change is announced via the `aria-live` region (FR-039).

## Privacy & handling rules (page-side guarantees)

- The file is held only in memory and sent once over TLS; the page never persists it (consistent with §5).
- No PII is placed in the URL, query string, or any client log.
- The lender is never contacted, and no further action is taken, by virtue of this submission (FR-037). Any recovery action requires the separate, explicit recovery agreement (out of scope here).
- No third-party analytics observe the upload.
