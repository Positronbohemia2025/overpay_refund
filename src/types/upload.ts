/**
 * Client-side upload state machine (data-model.md).
 * The widget's responsibility ends at a validated, consented handoff to the
 * external intake endpoint; it announces only the stages it controls (FR-039).
 */
import type { LocaleCode } from './content';

export type UploadStatus =
  | 'idle'
  | 'fileSelected'
  | 'validating'
  | 'invalid'
  | 'uploading'
  | 'accepted'
  | 'rejected';

export type RejectReason =
  | 'unsupported_format'
  | 'file_too_large'
  | 'empty_file'
  | 'missing_consent'
  | 'network_error'
  | 'server_error'
  | 'rate_limited'
  | null;

export interface SelectedFile {
  name: string;
  sizeBytes: number;
  mimeType: string;
}

export interface UploadConsents {
  /** Mirrors the §5 disclosure that the file is anonymized before analysis. */
  anonymizedProcessing: boolean;
  terms: boolean;
}

export interface UploadSubmission {
  file: SelectedFile | null;
  locale: LocaleCode;
  consents: UploadConsents;
  status: UploadStatus;
  /** Mirrored into the aria-live region (FR-039). */
  statusMessage: string;
  rejectReason: RejectReason;
  submissionId: string | null;
}
