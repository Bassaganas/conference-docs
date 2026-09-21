---
name: screenshot-docs
description: "Capture or refresh conference workshop screenshots by service. Use when Dify, provisioning, Jira ingestion API, LOTR SUT, exercise steps, or visible credentials and URLs change; supports rerun dify, provisioning, jira-api, sut, or all."
user-invocable: true
argument-hint: 'rerun <dify|provisioning|jira-api|sut|all>'
---

# Conference Screenshot Docs

Use `docs/screenshots.manifest.json` as the capture queue. Screenshots are documentation evidence, not decorative assets.

## Procedure

1. Read `documentation_versions` in `docs/screenshots.manifest.json` and target only the entry with `strategy: current` unless a historical capture is explicitly approved.
2. Run `npm run screenshots:check` to verify the manifest and every MDX asset reference.
3. Run `npm run screenshots:plan -- <service>` to print the selected shot groups.
4. Confirm the declared environment is available. Prefer local or disposable workshop state; ask before navigating live services.
5. Reproduce each group's fixture and state at `1440x900`. Capture `390x844` only when the workflow is supported on mobile.
6. Replace every declared output for the selected group. Keep raw and annotated derivatives separate where annotations are needed.
7. Redact API keys, model/provider credentials, student credentials, private origins, cloud identifiers, personal data, tunnel hostnames, bearer tokens, and browser/terminal history.
8. Update `captured_at`, `source_revision`, and `service_version` in the manifest. For local/self-hosted models also record the runtime/plugin version, exact model ID and digest, approved endpoint topology, and reviewed output list without recording the endpoint secret or live tunnel URL.
9. If a temporary proxy or tunnel was used, stop it after capture, clear temporary credentials, and verify that the former public endpoint is unreachable. Keep that failed reachability check with the capture evidence.
10. Run `npm run check` and inspect every image at rendered documentation width.

## Service Boundaries

- `provisioning`: classroom assignment, instance URL, and credential presentation owned by `cloud-classroom-provisioning`.
- `dify`: model setup, knowledge, chatflow, retrieval, and advanced block UI.
- `jira-api`: deployed Swagger and ingestion request/response state.
- `sut`: LOTR SUT UI only if a future conference exercise uses it; owner is `lotr_sut`.

A service or source change marks screenshots stale. It does not authorize deployment, provisioning, credential rotation, or other mutation.

## Quality Gate

- Every manifest output exists and every MDX image reference resolves.
- Captures show deterministic synthetic/public data and the current UI.
- One image communicates one action or expected state.
- Alt text states the workflow result.
- No sensitive values remain.
- Typecheck and Docusaurus build pass.
