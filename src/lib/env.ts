/**
 * Typed access to the build-time environment (T007).
 * The intake/newsletter base URLs and the max upload size are the only knobs;
 * everything else about the page is static.
 */

const DEFAULT_MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // 15 MB (contracts/upload-intake.md)

function readNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const env = {
  /** Base URL of the external analysis intake service. */
  intakeBaseUrl: import.meta.env.VITE_INTAKE_BASE_URL ?? '',
  /** Newsletter endpoint base URL; falls back to the intake base. */
  newsletterBaseUrl:
    import.meta.env.VITE_NEWSLETTER_BASE_URL ?? import.meta.env.VITE_INTAKE_BASE_URL ?? '',
  /** Maximum accepted upload size in bytes. */
  maxUploadBytes: readNumber(import.meta.env.VITE_MAX_UPLOAD_BYTES, DEFAULT_MAX_UPLOAD_BYTES),
} as const;
