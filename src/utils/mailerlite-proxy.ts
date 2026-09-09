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
): Promise<Response> {
  return fetch(MAILERLITE_PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, fields, groups, tags }),
  });
}
