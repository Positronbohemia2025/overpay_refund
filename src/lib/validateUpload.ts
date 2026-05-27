/**
 * Client-side upload validation (T031 / FR-040, contracts/upload-intake.md).
 * Preconditions enforced before any request: MIME allowlist, size bounds,
 * non-empty file, and both consents. Failures are surfaced, never silent.
 */
import { env } from './env';
import type { RejectReason, SelectedFile, UploadConsents } from '../types';

export const ALLOWED_MIME_TYPES: readonly string[] = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
];

export interface ValidationResult {
  ok: boolean;
  reason: RejectReason;
}

export function validateFile(file: SelectedFile): ValidationResult {
  if (!ALLOWED_MIME_TYPES.includes(file.mimeType)) {
    return { ok: false, reason: 'unsupported_format' };
  }
  if (file.sizeBytes <= 0) {
    return { ok: false, reason: 'empty_file' };
  }
  if (file.sizeBytes > env.maxUploadBytes) {
    return { ok: false, reason: 'file_too_large' };
  }
  return { ok: true, reason: null };
}

export function validateConsents(consents: UploadConsents): ValidationResult {
  // FR-037: no action without explicit authorization — both consents required.
  if (!consents.anonymizedProcessing || !consents.terms) {
    return { ok: false, reason: 'missing_consent' };
  }
  return { ok: true, reason: null };
}
