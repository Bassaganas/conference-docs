# Internal RAG Capability Assessment

Status: assessment baseline, not a learner-facing exercise
Scope: Testus Patronus conference Dify runtime

## Release and provenance baseline

- Default release: Dify `1.16.1`, frozen August 2026.
- Current source revision: `6f8ed69ee15f9a2e7189ca066275e973d091d1e9`.
- Dated compatibility choices: Dify `1.13.3` (March 2026) and Dify `1.9.1` (September 2025).
- Floating `latest` is not an allowed workshop release choice.
- Current runtime images are represented by the immutable `dify-images-1.16.1.lock.yml` contract in `cloud-classroom-provisioning`.
- Screenshot provenance is incomplete until real captures are reviewed: `captured_at`, `source_revision`, and `service_version` remain unset in the manifest.

## Capability matrix

| Capability | Evidence to inspect | Assessment question | Readiness state |
| --- | --- | --- | --- |
| Ingestion | Manual dataset flow and Jira API ingestion response | Can both ingestion paths create the intended knowledge bases without exposing credentials or private origins? | Verify with a disposable Dify `1.16.1` instance and deterministic dataset |
| Embeddings | Configured Azure embedding model and processed document state | Is the embedding provider configured, available to the selected tenant, and used consistently across the documented knowledge bases? | Verify provider configuration and one processed document |
| Retrieval | Retriever node, retrieval test results, and deterministic questions | Do relevant chunks appear for issue, module, and project questions, with a documented top-k and score behavior? | Verify against the public dataset and record representative results |
| Metadata filtering | API-ingested `issue_key` metadata and manual/automatic filtering controls | Does a filter return the requested issue or category without silently broadening the result set? | Verify exact-match and no-match cases |
| Grounded Chatflow behavior | `ex3_solved.yml`, context wiring, and out-of-scope prompt | Does the Chatflow pass retrieved context to the LLM and refuse to invent unsupported issue details? | Verify grounded and missing-context cases |
| Advanced blocks | `ex4_sample.yml` with classifier, extractor, iteration, and routing blocks | Do advanced paths preserve the intended query classification, metadata filters, iteration results, and fallback behavior? | Verify each enabled branch independently |
| Observability | Dify run trace, node inputs/outputs, retrieval evidence, and error response | Can an operator identify whether a failure occurred during ingestion, embedding, retrieval, prompt construction, or generation? | Verify trace visibility and redactable diagnostics |
| Acceptance and completion | Exercise outcomes, screenshot manifest, and release contract tests | Can the workshop be accepted using repeatable checks tied to Dify `1.16.1` rather than an unpinned runtime? | Verify all checks in a disposable environment |

## Required acceptance evidence

1. Record the checked-out Dify revision and selected strategy for the test instance.
2. Confirm the current image lock resolves all listed services to immutable digests on `linux/amd64`.
3. Ingest the deterministic Jira fixture through both the manual and API paths.
4. Confirm the configured embedding model processes the expected documents.
5. Run representative retrieval questions, including an exact `issue_key` filter and a no-match case.
6. Run the solved grounded Chatflow with both an answerable question and an unsupported issue reference.
7. Exercise the advanced DSL branches that are present in the fixture and preserve their traces or equivalent node-level evidence.
8. Capture and redact updated Dify and provisioning screenshots before populating manifest provenance fields.
9. Run `npm run screenshots:check`, `npm run typecheck`, and `npm run build` in `conference-docs`.
10. Run the focused release-freeze contract tests and the relevant EC2 manager browser regression.

## Gaps and risks

- Existing Dify and provisioning screenshots predate the frozen `1.16.1` baseline or have not yet been reviewed against it.
- The manifest intentionally has null capture provenance until reviewed captures exist.
- The public docs describe expected UI labels, but dated compatibility releases may use different labels or layouts.
- Retrieval quality depends on the configured embedding service and model availability; static DSL inspection cannot establish runtime quality.
- The API ingestion path depends on the separately owned Jira ingestion service and its public OpenAPI contract.
- Observability needs a reviewed trace from the disposable runtime; documentation and DSLs alone are insufficient evidence.
- Full Python tests, Docker Compose validation, and browser recapture require local tooling and an approved disposable environment.

## Completion decision

The workshop is production-ready for the frozen release only when the required acceptance evidence is attached to the release review, every critical capability has a passing result, and unresolved gaps have an explicit owner and mitigation. A green documentation build alone is not sufficient evidence of RAG runtime readiness.
