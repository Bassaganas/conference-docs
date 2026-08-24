---
name: screenshot-docs
description: "Capture or refresh conference workshop screenshots by service. Use when Dify, provisioning, Jira ingestion API, LOTR SUT, exercise steps, or visible credentials and URLs change; supports rerun dify, provisioning, jira-api, sut, or all."
user-invocable: true
argument-hint: 'rerun <dify|provisioning|jira-api|sut|all>'
---

# Conference Screenshot Docs

Use `docs/screenshots.manifest.json` as the capture queue. Screenshots are documentation evidence, not decorative assets.

## Procedure

1. Run `npm run screenshots:check` to verify the manifest and every MDX asset reference.
2. Run `npm run screenshots:plan -- <service>` to print the selected shot groups.
3. Confirm the declared environment is available. Prefer local or disposable workshop state; ask before navigating live services.
4. Reproduce each group's fixture and state at `1440x900`. Capture `390x844` only when the workflow is supported on mobile.
5. Replace every declared output for the selected group. Keep raw and annotated derivatives separate where annotations are needed.
6. Redact API keys, model/provider credentials, student credentials, private origins, cloud identifiers, personal data, and browser/terminal history.
7. Update `captured_at`, `source_revision`, and `service_version` in the manifest.
8. Run `npm run check` and inspect every image at rendered documentation width.

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
