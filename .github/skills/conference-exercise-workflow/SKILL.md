---
name: conference-exercise-workflow
description: "Canonical conference-docs exercise workflow. Use when adding or changing Docusaurus exercises, Dify DSLs, Jira ingestion examples, datasets, screenshots, or exercise ordering while keeping all artifacts coherent."
user-invocable: true
argument-hint: 'Exercise number and learning outcome or requested change'
---

# Conference Exercise Workflow

The verified service contract is canonical. MDX and screenshots explain that contract; they do not invent it.

## 1. Define One Outcome

- Read the target MDX, preceding/following exercises, referenced DSL/dataset, and owning service contract.
- State one observable learner outcome and completion check.
- Keep the progression: environment/model setup, manual ingestion, API ingestion, grounded chatbot, advanced retrieval/prompting.
- Split an exercise when it combines unrelated outcomes. Do not create another page that repeats the same steps.

## 2. Verify Implementation Inputs

- Dify workflow behavior comes from the matching file under `static/dify-dsls/` when one exists.
- Dataset names and examples come from `static/dataset/`.
- Provisioning and ingestion API behavior comes from `cloud-classroom-provisioning`; reference it without copying secrets or infrastructure logic.
- LOTR SUT behavior is external and must have a separate manifest service entry if introduced.

## 3. Update the Exercise

- Keep one primary latest-version page under `versioned_docs/version-1.16.1/` per outcome.
- Default rule: when adding or incrementing exercises, edit only `versioned_docs/version-1.16.1/**` unless the user explicitly asks for compatibility updates in older versions.
- Include prerequisites, objective, numbered actions, expected result, troubleshooting, completion check, and next step.
- Use current filenames and request shapes. Keep examples synthetic and executable.
- Add the page to `versioned_sidebars/version-1.16.1-sidebars.json` in learning order. Update `sidebars.ts` only if the user explicitly requests unversioned docs changes.
- Add or update public fixtures and DSLs in the same change.

## 4. Synchronize Screenshots

- Update `docs/screenshots.manifest.json` before capture.
- Ensure every new or changed shot `target_docs` entry points only to `versioned_docs/version-1.16.1/**` for latest-version exercise work.
- Run `/screenshot-docs rerun dify`, `provisioning`, `jira-api`, `sut`, or `all`.
- Reproduce the declared fixture/state and replace every output in the selected shot group.
- Preserve raw captures separately from annotations; redact credentials, keys, identifiers, private origins, and personal data.
- Update `captured_at`, `source_revision`, and service version after review.

## 5. Validate

- `npm run screenshots:check`
- `npm run typecheck`
- `npm run build`

## Done

- The exercise has one outcome and an observable completion check.
- MDX matches DSL/API/dataset behavior.
- Every local asset reference exists.
- Manifest-owned screenshots are current or explicitly marked pending.
- Typecheck and Docusaurus build pass.