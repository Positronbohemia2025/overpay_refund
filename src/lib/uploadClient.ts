/**
 * Upload client (T032 / contracts/upload-intake.md).
 * Multipart POST to the external intake endpoint; maps 202 → accepted and any
 * 4xx/5xx/network failure → rejected with a matching reason. The page's
 * responsibility ends at this validated, consented handoff — it never persists
 * the file and never observes backend analysis stages.
 */
import { env } from './env';
import type { RejectReason, SelectedFile } from '../types';

export interface UploadResult {
  accepted: boolean;
  submissionId: string | null;
  reason: RejectReason;
}

interface UploadArgs {
  file: File;
  locale: string;
  consentAnonymizedProcessing: boolean;
  consentTerms: boolean;
}

/** Map the contract's error codes to our client reject reasons. */
function reasonFromStatus(status: number, errorCode?: string): RejectReason {
  switch (errorCode) {
    case 'unsupported_format':
      return 'unsupported_format';
    case 'file_too_large':
      return 'file_too_large';
    case 'empty_file':
      return 'empty_file';
    case 'missing_consent':
    case 'invalid_locale':
      return 'missing_consent';
    case 'rate_limited':
      return 'rate_limited';
    default:
      break;
  }
  if (status === 413) return 'file_too_large';
  if (status === 415) return 'unsupported_format';
  if (status === 429) return 'rate_limited';
  return 'server_error';
}

export async function submitUpload({
  file,
  locale,
  consentAnonymizedProcessing,
  consentTerms,
}: UploadArgs): Promise<UploadResult> {
  const form = new FormData();
  form.append('file', file);
  form.append('locale', locale);
  form.append('consent_anonymized_processing', String(consentAnonymizedProcessing));
  form.append('consent_terms', String(consentTerms));

  try {
    const response = await fetch(`${env.intakeBaseUrl}/v1/submissions`, {
      method: 'POST',
      body: form,
    });

    if (response.status === 202) {
      const data = (await response.json().catch(() => ({}))) as { submissionId?: string };
      return { accepted: true, submissionId: data.submissionId ?? null, reason: null };
    }

    const data = (await response.json().catch(() => ({}))) as { error?: string };
    return { accepted: false, submissionId: null, reason: reasonFromStatus(response.status, data.error) };
  } catch {
    return { accepted: false, submissionId: null, reason: 'network_error' };
  }
}

export type { SelectedFile };
