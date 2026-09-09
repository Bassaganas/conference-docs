// Newsletter signups go through the TestingFantasy subscribe proxy, a Lambda function URL in
// the classroom AWS account (cloud-classroom-provisioning, module "mailerlite_proxy").
//
// The proxy is the only holder of the MailerLite API token and accepts exactly one operation:
// upsert a subscriber into allow-listed groups with allow-listed fields and tags. Browser code
// never talks to MailerLite directly, so no credential ships in this public repository or bundle.
//
// The URL is public by design (it is a form endpoint), so it is fine to commit it here.
export const MAILERLITE_PROXY_URL =
  'https://35l4w755w5u74ewufyv7w7bv3q0uyzja.lambda-url.eu-west-1.on.aws/';

const CORS_ALLOWED_ORIGINS = new Set([
  'https://www.testingfantasy.com',
  'https://testingfantasy.com',
  'https://docs-tp.testingfantasy.com',
  'https://docs.fellowship.testingfantasy.com',
]);

const supportsCorsToProxy = (): boolean => {
  if (typeof window === 'undefined') {
    return true;
  }
  if (window.location.origin.startsWith('http://localhost:')) {
    return true;
  }
  return CORS_ALLOWED_ORIGINS.has(window.location.origin);
};

const parseProxyError = async (response: Response): Promise<string> => {
  try {
    const payload = await response.json();
    if (payload && typeof payload.error === 'string' && payload.error.trim()) {
      return payload.error;
    }
  } catch {
    // Keep a generic error when the body is missing or not JSON.
  }
  return `http-${response.status}`;
};

export interface ProxySubscribeResult {
  ok: boolean;
  mode: 'confirmed' | 'opaque';
  error?: string;
}

export type SubscribeFields = Partial<{
  company: string;
  TeamSize: string;
  course_interest: string;
  timeline: string;
  source: string;
  message: string;
  interest_community: true;
  interest_courses: true;
  interest_platform: true;
}>;

/**
 * Upsert a subscriber. Returns the raw Response so callers can keep checking `response.ok`.
 * The proxy always adds the `testing-fantasy` tag and falls back to the main group when
 * `groups` is empty.
 */
export async function subscribeViaProxy(
  email: string,
  fields: SubscribeFields = {},
  groups: string[] = [],
  tags: string[] = ['workshop-attendee'],
): Promise<ProxySubscribeResult> {
  const payload = { email, fields, groups, tags };
  const payloadJson = JSON.stringify(payload);

  try {
    const response = await fetch(MAILERLITE_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payloadJson,
    });

    if (!response.ok) {
      return {
        ok: false,
        mode: 'confirmed',
        error: await parseProxyError(response),
      };
    }

    const body = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (body.ok !== true) {
      return {
        ok: false,
        mode: 'confirmed',
        error: body.error ?? 'invalid-response',
      };
    }

    return { ok: true, mode: 'confirmed' };
  } catch (error) {
    if (!supportsCorsToProxy()) {
      try {
        // Preview domains are intentionally not allow-listed in Lambda URL CORS.
        // `no-cors` still sends the request, but the response is opaque.
        await fetch(MAILERLITE_PROXY_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          body: payloadJson,
        });
        return { ok: true, mode: 'opaque' };
      } catch (fallbackError) {
        return {
          ok: false,
          mode: 'confirmed',
          error: fallbackError instanceof Error ? fallbackError.message : 'fallback-failed',
        };
      }
    }

    return {
      ok: false,
      mode: 'confirmed',
      error: error instanceof Error ? error.message : 'network-error',
    };
  }
}
