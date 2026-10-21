// First-touch attribution: where a visitor came from, kept for the tab's session and sent with a
// sign-up as MailerLite custom fields through the subscribe proxy.
//
// Ported from the product site (testingfantasy-classroom-platform,
// apps/product-web/src/attribution.ts) with the same rules. What is kept is deliberately small
// and never a full address: four utm_* parameters, the referring site's host name (only when it
// is another site) and the landing page's path. Each value is at most 100 characters of a narrow
// character set, so it cannot carry a scheme, a query string, an "@" (an email address) or
// markup. The subscribe proxy (cloud-classroom-provisioning functions/aws/mailerlite_proxy.py,
// ATTRIBUTION_FIELDS) holds the same rules server side and rejects anything else.
//
// sessionStorage, not a cookie: nothing is sent anywhere until the visitor signs up, and it is
// gone when the tab closes. First touch: the first page of the session writes it, later pages
// do not.
//
// Docusaurus renders every page at build time (SSR), where there is no window or
// sessionStorage. Call captureAttribution only in the browser (an effect, an event handler or a
// client module guarded by ExecutionEnvironment.canUseDOM).

export const ATTRIBUTION_KEY = 'tf_attribution';
export const MAX_LENGTH = 100;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;

export interface Attribution {
  readonly utm_source?: string;
  readonly utm_medium?: string;
  readonly utm_campaign?: string;
  readonly utm_content?: string;
  readonly referrer_host?: string;
  readonly landing_page?: string;
}

/** The fields a sign-up sends to MailerLite: the proxy's attribution allow-list, exactly. */
export const SUBSCRIBER_FIELDS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'referrer_host',
  'landing_page',
  'signup_placement',
] as const;
export type SubscriberField = (typeof SUBSCRIBER_FIELDS)[number];
export type AttributionFields = Partial<Record<SubscriberField, string>>;

const UTM_VALUE = /^[A-Za-z0-9 ._~+/-]+$/;
const HOST = /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*$/;
const PATH = /^\/[A-Za-z0-9._~/-]*$/;
const SLUG = /^[a-z0-9][a-z0-9_-]*$/;

/** A utm value as it may be kept, or undefined. Anything with an "@" or a scheme is dropped whole. */
export function cleanUtm(raw: string | null | undefined): string | undefined {
  if (raw === null || raw === undefined) return undefined;
  const value = raw.trim();
  if (value === '' || value.includes('@') || /[a-z][a-z0-9+.-]*:/i.test(value)) return undefined;
  // Characters outside the set become "_", runs collapse, then the cap.
  const safe = value.replace(/[^A-Za-z0-9 ._~+/-]+/g, '_').replace(/\s+/g, ' ').slice(0, MAX_LENGTH).trim();
  return safe !== '' && UTM_VALUE.test(safe) ? safe : undefined;
}

export function cleanHost(raw: string | null | undefined): string | undefined {
  if (raw === null || raw === undefined) return undefined;
  const host = raw.trim().toLowerCase();
  return host.length > 0 && host.length <= MAX_LENGTH && HOST.test(host) ? host : undefined;
}

export function cleanPath(raw: string | null | undefined): string | undefined {
  if (raw === null || raw === undefined) return undefined;
  const path = raw.split(/[?#]/, 1)[0] ?? '';
  return path.length > 0 && path.length <= MAX_LENGTH && PATH.test(path) ? path : undefined;
}

export function cleanSlug(raw: string | null | undefined): string | undefined {
  if (raw === null || raw === undefined) return undefined;
  const slug = raw.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, MAX_LENGTH);
  return slug !== '' && SLUG.test(slug) ? slug : undefined;
}

/** The referring site's host, or undefined for none, an unreadable one, or this site itself. */
export function referrerHost(referrer: string, ownHost: string): string | undefined {
  if (referrer === '') return undefined;
  try {
    const host = new URL(referrer).hostname;
    return host === ownHost ? undefined : cleanHost(host);
  } catch {
    return undefined;
  }
}

/** What one landing says: the utm parameters of its address, the referring host, the path. */
export function readLanding(href: string, referrer: string): Attribution {
  const url = new URL(href);
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = cleanUtm(url.searchParams.get(key));
    if (value !== undefined) out[key] = value;
  }
  const host = referrerHost(referrer, url.hostname);
  if (host !== undefined) out['referrer_host'] = host;
  const path = cleanPath(url.pathname);
  if (path !== undefined) out['landing_page'] = path;
  return out;
}

/** Re-validates a stored record: storage is the visitor's to edit, so nothing is trusted. */
export function sanitise(record: unknown): Attribution {
  if (record === null || typeof record !== 'object') return {};
  const raw = record as Record<string, unknown>;
  const text = (key: string): string | undefined => (typeof raw[key] === 'string' ? (raw[key] as string) : undefined);
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = cleanUtm(text(key));
    if (value !== undefined) out[key] = value;
  }
  const host = cleanHost(text('referrer_host'));
  if (host !== undefined) out['referrer_host'] = host;
  const path = cleanPath(text('landing_page'));
  if (path !== undefined) out['landing_page'] = path;
  return out;
}

interface SessionStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function session(): SessionStore | null {
  try {
    return typeof window === 'undefined' ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

/** First touch: keeps the first landing of the session, and returns what is kept. */
export function captureAttribution(
  href: string,
  referrer: string,
  store: SessionStore | null = session(),
): Attribution {
  if (store === null) return readLanding(href, referrer);
  try {
    const stored = store.getItem(ATTRIBUTION_KEY);
    if (stored !== null) return sanitise(JSON.parse(stored) as unknown);
    const landing = readLanding(href, referrer);
    store.setItem(ATTRIBUTION_KEY, JSON.stringify(landing));
    return landing;
  } catch {
    return readLanding(href, referrer);
  }
}

/** The MailerLite custom fields of a sign-up: the stored attribution and which form or button. */
export function subscriberFields(attribution: Attribution, placement: string | undefined): AttributionFields {
  const out: AttributionFields = {};
  for (const key of SUBSCRIBER_FIELDS) {
    if (key === 'signup_placement') continue;
    const value = attribution[key];
    if (value !== undefined) out[key] = value;
  }
  const slug = cleanSlug(placement);
  if (slug !== undefined) out.signup_placement = slug;
  return out;
}

/** Browser only: the first touch of this session (captured now if this is the first page). */
export function currentAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  try {
    return captureAttribution(window.location.href, document.referrer);
  } catch {
    return {};
  }
}
