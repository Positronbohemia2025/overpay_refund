/**
 * Newsletter client (T052 / contracts/newsletter-subscribe.md).
 * Anonymous, double opt-in (the address is not subscribed until the emailed
 * confirmation is followed). The page only collects an email and a locale.
 */
import { env } from './env';

export type NewsletterStatus =
  | 'pending'
  | 'alreadySubscribed'
  | 'invalidEmail'
  | 'serverError'
  | 'rateLimited'
  | 'networkError';

export interface NewsletterResult {
  status: NewsletterStatus;
}

function statusFromResponse(httpStatus: number, errorCode?: string): NewsletterStatus {
  if (httpStatus === 202) return 'pending';
  if (errorCode === 'invalid_email' || httpStatus === 400) return 'invalidEmail';
  if (errorCode === 'already_subscribed' || httpStatus === 409) return 'alreadySubscribed';
  if (httpStatus === 429) return 'rateLimited';
  return 'serverError';
}

export async function subscribeNewsletter(args: {
  email: string;
  locale: string;
}): Promise<NewsletterResult> {
  try {
    const response = await fetch(`${env.newsletterBaseUrl}/v1/newsletter`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: args.email.trim(), locale: args.locale }),
    });
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    return { status: statusFromResponse(response.status, data.error) };
  } catch {
    return { status: 'networkError' };
  }
}
