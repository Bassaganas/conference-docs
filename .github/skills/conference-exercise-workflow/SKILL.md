---
name: conference-exercise-workflow
description: "Canonical conference-docs exercise workflow. Use when adding or changing Docusaurus exercises, Dify DSLs, Jira ingestion examples, datasets, screenshots, or exercise ordering while keeping all artifacts coherent."
user-invocable: true
argument-hint: 'Exercise number and learning outcome or requested change'
---

# Conference Exercise Workflow

The verified service contract is canonical. MDX and screenshots explain that contract; they do not invent it.

## Version targeting

- Read `documentation_versions` in `docs/screenshots.manifest.json` before editing an exercise.
- Route additions and increments to the entry with `strategy: current` and its `docs_directory` (currently `versioned_docs/version-1.16.1/**`).
- Leave historical version directories, historical sidebars, and unversioned source copies unchanged unless the user explicitly requests and approves a backport.
- Keep the screenshot target and asset root on the same current Dify version. Do not infer the target from a URL, branch name, or the version of a local service.

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
- When a model endpoint is used, verify reachability from the Dify backend. Never document a learner laptop's `localhost` as the endpoint for remote or containerized Dify.

## 3. Update the Exercise

- Keep one primary page under the current `docs_directory` per outcome. Preserve the existing exercise number and sidebar order when a focused subsection is sufficient.
- Include prerequisites, objective, numbered actions, expected result, troubleshooting, completion check, and next step.
- Use current filenames and request shapes. Keep examples synthetic and executable.
- Add or update only the current-version sidebar when a page or learning order changes.
- Add or update public fixtures and DSLs in the same change.

## 4. Synchronize Screenshots

- Update `docs/screenshots.manifest.json` before capture.
- Run `/screenshot-docs rerun dify`, `provisioning`, `jira-api`, `sut`, or `all`.
- Reproduce the declared fixture/state and replace every output in the selected shot group.
- Preserve raw captures separately from annotations; redact credentials, keys, identifiers, private origins, and personal data.
- Update `captured_at`, `source_revision`, and service version after review.
- For local or self-hosted model captures, record the approved endpoint topology, provider/plugin version, runtime version, model ID and digest, and the exact output list without recording secrets or tunnel URLs.
- If a temporary proxy or tunnel is used, verify authentication before capture, tear it down afterward, clear temporary credentials, and record a failed reachability check.

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