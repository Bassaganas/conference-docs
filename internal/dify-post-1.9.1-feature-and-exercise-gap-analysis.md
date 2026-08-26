# Dify Post-1.9.1 Feature and Exercise Gap Analysis

Status: internal planning baseline  
Baseline: Dify `1.9.1` (`cd47a47c3b4acc4d4457b73777722602c33bc950`)  
Compared targets: repository-supported `1.13.3` and `1.16.1`  
Evidence: official Dify documentation and official `langgenius/dify` GitHub releases  
Scope: workshop-relevant changes after `1.9.1`, through `1.16.1`

## Executive decision

The workshop should not respond to every Dify release by adding another UI tour. The
highest-value change is to turn the existing RAG exercises into an observable lifecycle:

1. ingest or update deterministic source data;
2. wait for indexing to reach a terminal state;
3. prove retrieval quality against a small benchmark;
4. prove grounding, citations, and no-match behavior;
5. inspect traces and exercise a controlled failure path; and
6. preserve a versioned, repeatable configuration.

The `1.9.1` material already names many important RAG concepts. It covers embeddings,
chunk size and overlap, high-quality indexing, vector retrieval, top-k, metadata
filtering, grounded prompts, parent-child retrieval, query rewriting, routing, and
iteration. Its main gap is therefore not conceptual breadth. Its main gap is that these
concepts are configured without enough measurable acceptance evidence.

The recommended backlog is:

| Priority | Decision | Main exercise impact |
| --- | --- | --- |
| P0 | Add indexing lifecycle, retrieval benchmark, grounding/no-match checks, traces, and failure handling | Exercises 2, 2.1, 3, and 4 |
| P1 | Make Knowledge Pipeline orchestration, update/re-index, parent-child, Summary Index, and version control hands-on | Exercises 2, 2.1, 3, and 4 |
| P2 | Add optional automation, multimodal retrieval, human approval, external observability, and operator tooling | Extensions or advanced exercise |
| P3 | Defer Agent beta, MCP publishing, collaboration-only UI, database choices, and broad infrastructure changes | Separate workshop or operator guide |

## Scope and evidence rules

### Interpretation of "since 2025"

This analysis treats Dify `1.9.1`, released on 29 September 2025, as the comparison
baseline because that is the immutable legacy version maintained by this repository.
It includes stable releases after that tag through the repository's current frozen
target, `1.16.1`.

### What "all changes" means here

Dify's release records contain thousands of pull requests. This document provides a
complete inventory at the capability-family level for changes that can affect this
workshop, a production RAG design, or an upgrade of the documented environment. It does
not enumerate translation corrections, cosmetic changes, test-only refactors, or every
dependency bump. Those items are grouped under UI, maintenance, or security unless they
change learner behavior, compatibility, or operational safety.

Each item is classified as one of:

- **New capability**: a learner or operator can perform something unavailable in
  `1.9.1`.
- **Improvement**: an existing capability gains meaningful behavior or usability.
- **Reliability fix**: the documented design already existed, but later releases fix a
  failure mode that affects confidence in it.
- **Operational or security change**: relevant to production and upgrades, but not a
  reason to add a learner UI step.
- **Current-doc capability**: documented in the live Dify manual, but its first stable
  release was not established by the reviewed release notes. It must be verified on the
  frozen target before an exercise depends on it.

Official release notes are the source of truth for version attribution. The live manual
is the source of truth for current behavior, not proof that a feature exists in every
supported release.

## What the 1.9.1 workshop already covers

| Existing material | Current coverage | Production gap |
| --- | --- | --- |
| Exercise 1: model setup | Azure model provider, LLM, embedding model, first chatbot | No explicit credential boundary, model compatibility check, or rollback/version evidence |
| Exercise 2: manual ingestion | Chunk size, overlap, embeddings, high-quality index, vector retrieval, top-k | No indexing-state gate, failed-document diagnosis, retrieval benchmark, rerank comparison, or immutable chunk-mode warning |
| Exercise 2.1: API ingestion | Jira ingestion, structured metadata, dataset creation/selection, manual versus API comparison | No idempotent update contract, indexing polling, retry/backoff, re-index path, metadata schema validation, or partial-failure evidence |
| Exercise 3: grounded Chatflow | Knowledge Retrieval, metadata filter, context wiring, grounded prompt, publish | No fixed query suite, score/rank evidence, citation inspection, no-match threshold, trace inspection, or failure branch |
| Exercise 4: advanced prompting | Parent-child concept, rewriting, multi-query retrieval, Parameter Extractor, Question Classifier, Iteration, If/Else | Mostly exploratory; no objective output contract, bounded iteration policy, error behavior, A/B comparison, or release/version checkpoint |

An important correction for future authoring: Knowledge Pipeline itself is not a
post-`1.9.1` feature. It was introduced in `1.9.0`, and `1.9.1` already added language
configuration to built-in pipeline templates. The workshop gap is that the legacy
exercise uses the simpler knowledge-base creation path instead of teaching the pipeline
as an observable ingestion architecture.

## Release delta ledger

### 1.9.2: workflow control and observability hardening

- **Improvement:** pause and resume workflow graph executions.
- **Improvement:** filter workflow runs by status and re-execute runs from logs.
- **Improvement:** OpenTelemetry and HTTP client tracing.
- **Reliability fix:** duplicate chunks and duplicate dataset pagination results.
- **Reliability fix:** token/usage accounting and external knowledge URL SSRF checks.
- **Operational change:** Weaviate client v4 requires a newer Weaviate server and may
  require gRPC port `50051`; upgrades may require re-indexing.

Workshop relevance: high for run evidence and upgrade notes; no new core exercise is
needed solely for `1.9.2`.

### 1.10.0: event-driven workflows

- **New capability:** Schedule, integration/plugin, and Webhook Trigger start nodes for
  Workflow applications. Chatflow, Agent, and basic chat did not gain triggers.
- **Improvement:** workflows can have trigger-specific input schemas instead of forcing
  every entry through the user-input Start node.
- **Improvement:** Iteration can flatten output.
- **Improvement:** workflow pause/resumption context and broadcast support matured.
- **Improvement:** MCP 2025-06-18 support and audio content for MCP tools.
- **Reliability fix:** document chunk-setting updates, weighted dataset settings,
  knowledge references, and Arize/Phoenix trace hierarchy/status.
- **Security:** dependency and compression-library fixes.

Workshop relevance: high for automating source synchronization, but secondary to
proving ingestion correctness first.

### 1.10.1 and 1.10.1-fix.1: platform and upgrade changes

- **New capability:** first-class MySQL support alongside PostgreSQL and OceanBase.
- **Improvement:** workflow editor responsiveness for substantially larger graphs.
- **Reliability fix:** weighted-score retrieval, SDK uploads, OpenAPI, webhook inputs,
  pipeline publishing, metadata counts, and workflow/runtime edge cases.
- **Operational change:** API and worker images run as non-root UID `1001`; local
  storage ownership must be updated before upgrade.
- **Security:** the fix release updates React, Next.js, and backend dependencies for
  published vulnerabilities.

Workshop relevance: operator note only. Database selection and host permission repair
do not belong in the RAG learner flow.

### 1.11.0: multimodal knowledge and stronger workflow contracts

- **New capability:** image extraction and attachment-to-chunk association in knowledge
  bases.
- **New capability:** multimodal embeddings enable text-to-image, image-to-image, and
  image-to-text retrieval; text embeddings can still pass extracted images to a
  vision-capable LLM.
- **New capability:** Knowledge Base pipeline outputs support multimodal General and
  Parent-Child structures.
- **New capability:** Start nodes can define JSON Schema.
- **Improvement:** workflow logs are created at run start, not only at completion.
- **Improvement:** HTTP responses can expose a trace ID.
- **Improvement:** Graph Engine pause/resume and workflow editor performance.
- **Reliability fix:** parent-child retrieval sessions, missing child chunks,
  multimodal pipeline runs, score thresholds on affected vector stores, and database
  session handling.
- **Security:** credential display and dependency vulnerabilities were fixed.

Workshop relevance: valuable only if workshop fixtures contain information carried by
images. It must not be added as a decorative demo.

### 1.11.1 through 1.11.4: RAG and security stabilization

- **Improvement:** faster Excel extraction and document save paths.
- **New capability (`1.11.2`):** InterSystems IRIS vector database and Aliyun SLS
  workflow logging.
- **New capability (`1.11.3`):** batch document re-index action.
- **Improvement (`1.11.3`):** PDF image extraction and MCP embedded resources.
- **Reliability fix:** metadata-filter rename preservation, `not in` processing,
  multimodal retrieval tests, extractor failures, hit testing, and pipeline deletion.
- **Security:** critical React/Next.js upgrades, XSS, SSRF, CSV injection, CORS/SSL,
  Swagger production exposure, and Node.js runtime requirements.

Workshop relevance: re-indexing and metadata-filter regression coverage should become
acceptance checks. Vector database additions should stay out of learner exercises.

### 1.12.0 and 1.12.1: Summary Index

- **New capability:** Summary Index generates configurable LLM summaries for chunks and
  embeds them as an additional retrieval layer.
- **New capability:** summaries can use text and images, can be edited/regenerated, and
  work with General and Parent-Child structures.
- **Constraint:** Summary Index requires high-quality indexing.
- **Improvement:** generation is asynchronous so base indexing is not blocked.
- **Improvement:** Qdrant full-text multi-keyword search.
- **Improvement:** workflow context registration/read and OpenTelemetry for single runs.
- **Reliability fix:** loop/iteration single-node runs, parent-child vector migration,
  hybrid search, chunk expansion, and workflow state persistence.
- **Security:** SQL injection, SSRF, remote-code-execution dependency, parser, and
  authentication dependency fixes.

Workshop relevance: high as a measured retrieval experiment, not as an assumed quality
upgrade. Generated summaries can omit qualifiers or introduce misleading terminology,
so the exercise must compare retrieval results and inspect summaries.

### 1.13.0 through 1.13.3: human review and execution architecture

- **New capability (`1.13.0`):** Human Input pauses a workflow, presents editable form
  data, and routes by actions such as approve, reject, or escalate.
- **Improvement:** workflow streaming and resume paths move to Celery workers and Redis
  Pub/Sub.
- **Operational change:** self-hosted/custom queue configurations must consume
  `workflow_based_app_execution`; API token tracking may require the `api_token` queue.
- **Improvement:** knowledge-pipeline Service API routes, workflow run-history refresh,
  and large indexing-task database-session handling.
- **New capability (`1.13.1`):** original dataset documents can be downloaded by signed
  URL or batch ZIP.
- **Operational change (`1.13.1`):** LLM summary generation has a dedicated
  `dataset_summary` queue; workers must consume it.
- **Breaking behavior (`1.13.1`):** draft variables become user-scoped and old draft
  values do not carry forward; Human Input email content uses Markdown rendering.
- **Reliability fix:** metadata batch editing, metadata filter extraction, citation
  visibility, conversation variables after Human Input, and Knowledge Retrieval UI.
- **Critical reliability fix (`1.13.2`):** regressions in LLM/Question Classifier prompt
  transformation and Knowledge Retrieval.
- **Improvement (`1.13.3`):** model parameters can reference variables.
- **Reliability fix (`1.13.3`):** citation metadata and chunk preview behavior.
- **Security:** parameterized vector-store SQL, HITL email sanitization, conversation
  ownership checks, and stale credential cleanup.

Workshop relevance: Human Input is useful for governed content publication or
low-confidence escalation. It should not replace deterministic RAG acceptance tests.

### 1.14.x: collaboration, HITL APIs, and RAG hardening

- **New capability:** real-time collaboration and shared workflow editing.
- **New capability:** API support around Human Input lifecycle.
- **Improvement:** external observability and tracing coverage.
- **Improvement:** editable Question Classifier labels and indexing validation.
- **Reliability fix:** RAG deduplication, metadata-filter preservation, retrieved-file
  access, summary regeneration, and pipeline execution stability.
- **Security and operations:** continued data-path and runtime hardening.

Workshop relevance: RAG fixes justify using the latest patch release. Collaboration is
a facilitation feature, not a production RAG learning objective.

### 1.15.0: operator tooling and deeper runtime evidence

- **New capability:** `difyctl` command-line administration.
- **Improvement:** richer Human Input forms and streamed reasoning display.
- **Improvement:** support for long-running model calls.
- **Improvement:** embedded-image extraction from Excel files.
- **Improvement:** deeper retrieval and workflow tracing.
- **Operations:** broader controls for maintaining and diagnosing deployments.

Workshop relevance: tracing is high value; `difyctl` belongs in an optional operator
appendix unless learners administer the Dify runtime.

### 1.16.0 and 1.16.1: Agent expansion and Knowledge Tracing

- **New capability:** new Agent application/runtime experience and Agent DSL export.
- **Improvement:** generated workflow construction and MCP integration.
- **Improvement:** workflow archive/export and operational reliability.
- **New capability (`1.16.1`):** Knowledge Tracing for RAG inspection.
- **Improvement (`1.16.1`):** workflow node locator and block selection.
- **Reliability fix (`1.16.1`):** RAG cleaner/splitter behavior.
- **Security:** additional platform hardening.

Workshop relevance: Knowledge Tracing directly supports Exercise 3 acceptance. The new
Agent path is a different application architecture and should not displace the grounded
Chatflow workshop without a separate learning objective and sandbox threat model.

## Current documentation capabilities requiring a version gate

The live manual documents the capabilities below. They are useful planning inputs, but
the exact endpoint or UI must be validated on each frozen workshop version before it is
made mandatory.

| Capability in current docs | Production value | Versioning action |
| --- | --- | --- |
| Knowledge Pipeline API with blocking or SSE streaming execution | Automates observable extraction, chunking, and indexing across local files, online documents, crawlers, and drives | Verify request/response schema on `1.13.3` and `1.16.1`; do not backport to `1.9.1` instructions without runtime proof |
| Indexing status stages (`waiting`, `parsing`, `cleaning`, `splitting`, `indexing`, `completed`) | Replaces timing guesses with a terminal-state gate | Verify endpoint and failure statuses on both supported targets |
| Document create, update, and re-index APIs | Enables idempotent synchronization and repair | Verify update semantics, document identity, and asynchronous status behavior |
| Chunk and child-chunk CRUD APIs | Enables controlled parent-child maintenance | Verify that manual mutation remains consistent with the configured chunk mode |
| Metadata field CRUD, built-in metadata toggle, and batch updates | Establishes a governed metadata contract | Verify rename/delete effects and batch atomicity on the frozen target |
| Knowledge-base tags | Improves operator discovery, not retrieval filtering by itself | Keep optional unless the workshop manages many datasets |
| Retrieval API and Retrieval Testing records | Provides benchmark evidence and production-query history | Make mandatory after response fields are frozen in workshop fixtures/tests |
| Error strategies and `error_type`/`error_message` variables | Supports graceful degradation and diagnosable failures | Confirm node-specific support; current docs list LLM, HTTP, Code, and Tool nodes |
| Run History, node Last Run, production Logs, and Test With Params | Reproduces failures and identifies latency/token bottlenecks | Use the UI available on each frozen release and capture release-specific screenshots |
| App version control and rollback | Separates draft from live behavior and permits recovery | Applies to Chatflow and Workflow, not every app or knowledge pipeline artifact |
| Schedule, integration, and webhook triggers | Enables scheduled or event-driven synchronization | Workflow only; test and production webhook URLs must stay separate |
| Human Input web/email forms and timeout branch | Adds controlled approval or escalation | Web-app delivery is unavailable for trigger-started workflows; use email/API flow or redesign |
| External observability integrations | Correlates retrieval, model, and workflow behavior | Select one supported integration only when credentials and data-export policy are available |

## Prioritized exercise changes

### P0: required for a production-ready RAG workshop

#### P0.1 Add an indexing lifecycle gate to Exercises 2 and 2.1

**Change**

- After each upload or API ingestion, record the dataset ID, document ID, source ID,
  checksum or update key, and request timestamp.
- Poll indexing status until a documented terminal success or failure state. Do not use
  a fixed sleep or visual assumption.
- Record stage, elapsed time, chunk count, and error text.
- Re-submit the same source and prove the chosen contract: no duplicate, explicit
  replacement, or a new version linked to the original.
- Add one malformed or unsupported fixture and require the learner to diagnose it
  without leaving the whole batch in an ambiguous state.

**Acceptance evidence**

- Success fixture reaches a terminal indexed state and is retrievable.
- Failure fixture produces a visible terminal error with document/source identity.
- Re-run does not create unexplained duplicate documents or chunks.
- The API response and final indexing state are saved without secrets.

**Why**

The current Exercise 2.1 proves that an HTTP request was accepted, not that the data was
indexed correctly. Asynchronous ingestion needs state observation, idempotency, and
repair before it is production-ready.

#### P0.2 Add a deterministic retrieval benchmark to Exercises 2 and 3

**Change**

- Add a small versioned query set with expected source document, expected metadata,
  required answer facts, forbidden claims, and an explicit no-answer case.
- Compare vector, full-text, and hybrid retrieval where supported.
- Compare baseline top-k and score threshold settings; enable reranking for the settings
  whose top-k/threshold behavior depends on the rerank phase.
- Record returned chunk IDs, rank, score, source, metadata, and latency.
- Define pass criteria before tuning. A useful minimum is correct source in top 3 for
  every answerable query and zero accepted chunks for the no-answer query.

**Acceptance evidence**

- A machine-readable result table for every query/configuration combination.
- A short decision explaining the selected retrieval mode and rejected alternatives.
- No-match behavior that does not manufacture an answer.

**Why**

Top-k and chunk-size discussions become production controls only when measured against
known questions. This also prevents Summary Index, reranking, or parent-child mode from
being adopted because a UI label sounds better.

#### P0.3 Make grounding, citations, and traces explicit in Exercise 3

**Change**

- Require the final answer to cite the retrieved source and preserve enough metadata to
  identify the originating document/chunk.
- Run one answerable, one filtered, one conflicting-source, and one no-match query.
- Inspect the Knowledge Retrieval node trace and the final model prompt/context.
- Record retrieval latency, model latency, token use, selected chunks, and citation
  metadata. On `1.16.1`, use Knowledge Tracing when available.
- Verify that a metadata filter cannot be bypassed by query wording.

**Acceptance evidence**

- Every factual answer maps to an allowed retrieved chunk.
- The no-match case returns the workshop's fallback response.
- The trace ID or run ID links the final answer to retrieval evidence.

**Why**

A plausible answer is not proof of a grounded answer. Trace and citation evidence make
retrieval regressions, leakage, and prompt-context errors diagnosable.

#### P0.4 Add controlled error paths to Exercises 2.1, 3, and 4

**Change**

- Exercise 2.1: distinguish validation errors, transient upstream errors, Dify API
  errors, and indexing failures. Retry only transient failures with bounded backoff.
- Exercise 3: add a fail branch or safe fallback around a deliberately failing HTTP,
  Tool, or LLM node and expose a non-sensitive diagnostic identifier.
- Exercise 4: configure Iteration behavior deliberately (`terminated`,
  `continue-on-error`, or abnormal-output removal) and explain the resulting output
  cardinality.
- Use `error_type` and `error_message` for routing/logging while keeping internal error
  text out of end-user responses.

**Acceptance evidence**

- A forced transient failure recovers within the retry budget.
- A permanent failure terminates or routes to the expected branch.
- Successful batch items remain identifiable when another item fails.

**Why**

Production pipelines fail partially. Silent continuation and unbounded retries are both
unsafe; the workshop should teach an explicit failure contract.

### P1: next workshop revision

#### P1.1 Reframe Exercise 2 around Knowledge Pipeline orchestration

Build a visible path from data source through extraction and chunking to the Knowledge
Base node. Keep manual upload as the simplest entrance, then show that the same processing
contract can accept another source. Require a single-file test run, variable inspection,
history-log review, configuration checklist, and published pipeline.

This improves the workshop by making extraction, cleaning, chunking, indexing, and
storage separate observable decisions. It also provides the architecture needed for the
API lifecycle in Exercise 2.1.

#### P1.2 Add update, re-index, and metadata governance to Exercise 2.1

Define a stable metadata schema for the Jira fixture, including field names, types,
required values, and source identity. Add one update to an existing issue, prove stale
content is replaced or versioned as intended, perform a re-index, and verify that
metadata filters still work after a field rename/update. Include delete behavior only if
the workshop owns a deterministic cleanup contract.

This turns one-time ingestion into synchronization and protects retrieval boundaries
that depend on project, issue type, status, or other metadata.

#### P1.3 Make parent-child and Summary Index measured experiments

Replace Exercise 4's conceptual parent-child section with an A/B run using the same
fixture and query set:

- General chunks versus Parent-Child chunks.
- Baseline index versus Summary Index where the release supports it.
- Inspect child match and returned parent context.
- Inspect generated summaries for omitted constraints or unsupported statements.
- Compare hit rate, context size, latency, and token use.

Retain the mode that passes the benchmark at acceptable cost. Do not require Summary
Index merely because it is newer.

#### P1.4 Add workflow version and rollback evidence to Exercises 3 and 4

Name the accepted draft, add release notes containing the benchmark result, publish it,
make a controlled regression, restore the accepted version into a draft, and re-run one
smoke query. Keep the exported DSL as an additional portable artifact, not a replacement
for release-specific runtime evidence.

This makes prompt and graph changes auditable and provides a practical rollback path.

### P2: optional extensions

#### P2.1 Triggered synchronization

After the API ingestion path is idempotent and observable, add either a schedule trigger
for periodic Jira synchronization or a webhook trigger for a deterministic event. Teach
test versus production URLs, payload schema, required fields, authentication at the
upstream boundary, deduplication, and trigger-source logs.

Do not combine this with Human Input web-app delivery; current docs state that web-app
delivery is unavailable for trigger-started workflows.

#### P2.2 Multimodal knowledge

Add only when a fixture has answer-critical diagrams or screenshots. Compare a text-only
baseline with image extraction plus a vision embedding/rerank/model path. Verify image
size/count limits, attachment-to-chunk association, retrieval of the expected image, and
behavior when the image is unavailable.

#### P2.3 Human approval for governed actions

Use Human Input to review a generated publication, remediation instruction, or
low-confidence escalation. Include approve, revise, reject, and timeout branches. Do not
insert manual approval into ordinary read-only question answering, where it adds latency
without reducing a meaningful risk.

#### P2.4 External observability and operator CLI

Offer a facilitator/operator extension that exports a single trace to one approved
observability backend and correlates ingestion, retrieval, and generation by run/trace
ID. Add `difyctl` only if workshop participants own deployment operations. Document data
export, retention, and credential constraints before enabling either feature.

### P3: defer or separate

| Capability | Decision | Reason |
| --- | --- | --- |
| New Agent runtime and Agent DSL | Separate workshop | Different application and sandbox threat model; distracts from deterministic RAG |
| MCP server publishing and broad MCP upgrades | Separate integration exercise | Useful for tool distribution, not required for the current knowledge-ingestion/chatflow path |
| Real-time collaboration, snippets, node locator, editor cosmetics | Do not add learner steps | Authoring productivity and facilitation improvements, not RAG acceptance controls |
| MySQL, IRIS, Hologres, Qdrant-specific, and other vector-store additions | Operator architecture note | Provider choice belongs to deployment ownership and needs workload-specific evaluation |
| Node.js, UID, Celery queue, Redis Pub/Sub, and migration changes | Upgrade runbook | Critical for operators, but this repository documents the classroom rather than owning Dify runtime mutation |
| Generic UI changes and localization | Screenshot maintenance only | Update release-specific captures when controls move; do not present UI drift as a learning objective |

## Proposed exercise sequence

| Exercise | Revised learner outcome | Primary artifact |
| --- | --- | --- |
| 1 | Configure compatible LLM/embedding models and record a versioned model contract without exposing credentials | Model/provider compatibility record |
| 2 | Build and test an observable Knowledge Pipeline; choose chunk/index/retrieval settings from evidence | Published pipeline DSL plus single-file run evidence |
| 2.1 | Synchronize Jira data idempotently; poll indexing; validate metadata; repair/re-index a changed record | Ingestion run report with IDs, states, and failure case |
| 3 | Pass a fixed retrieval/grounding benchmark with citations, no-match behavior, metadata isolation, and traces | Benchmark table and accepted app version |
| 4 | Compare advanced retrieval/routing strategies under bounded iteration and explicit errors, then justify one design | A/B decision record and rollback proof |

## Suggested implementation order

1. Create deterministic retrieval fixtures and a machine-readable expected-results file.
2. Add the indexing-state and idempotency contract to the Jira ingestion path.
3. Add benchmark execution and result capture before changing retrieval features.
4. Add trace, citation, metadata-boundary, and no-match acceptance to Exercise 3.
5. Add failure injection and bounded retry/iteration behavior.
6. Convert Exercise 2 to explicit Knowledge Pipeline orchestration.
7. Add parent-child and Summary Index A/B variants.
8. Add app version/rollback evidence and release-specific screenshots.
9. Add optional trigger, multimodal, HITL, and observability extensions only after the
   required path is deterministic.

## Release and documentation gates

Before merging any recommended exercise change:

- Confirm the feature on both `1.13.3` and `1.16.1`, or mark the page with a version
  guard and keep separate instructions/DSLs.
- Export and test the relevant DSL on the exact frozen service version.
- Record `captured_at`, `source_revision`, and `service_version` for new screenshots.
- Test positive, negative, no-match, and retry/failure paths against deterministic
  fixtures.
- Keep API keys, provider credentials, account IDs, and sensitive source data out of
  fixtures, screenshots, logs, and traces.
- Treat current-doc behavior as unverified until the frozen runtime proves it.
- Add upgrade-only queue, storage, migration, and security requirements to the owning
  deployment/runbook documentation rather than silently embedding them in exercises.

## Production RAG impact summary

| Control | Risk reduced | Workflow improvement |
| --- | --- | --- |
| Indexing terminal-state gate | Accepted requests that never become searchable | Clear success/failure, duration, and repair path |
| Idempotent update/re-index | Duplicate or stale documents and chunks | Repeatable synchronization instead of one-time import |
| Governed metadata schema | Filter bypass, inconsistent labels, untraceable sources | Stable routing, access boundary, and source attribution |
| Retrieval benchmark | Subjective tuning and unnoticed regressions | Evidence-based chunking, search, rerank, and threshold decisions |
| No-match acceptance | Hallucinated answers outside the corpus | Predictable abstention/escalation behavior |
| Citations and Knowledge Tracing | Answers that cannot be audited | Source-to-answer lineage and faster diagnosis |
| Explicit retries/fail branches | Silent partial failure or runaway retries | Bounded recovery and actionable errors |
| Version/rollback evidence | Uncontrolled prompt/graph regressions | Reproducible releases and fast recovery |
| Triggered sync after idempotency | Manual drift and stale knowledge | Timely ingestion without duplicate side effects |
| Human approval at risk boundaries | Unsafe automated publication/action | Targeted governance without making every query manual |

## Official sources

### Release records

- [Dify `1.9.1` release](https://github.com/langgenius/dify/releases/tag/1.9.1)
- [Dify `1.9.2` release](https://github.com/langgenius/dify/releases/tag/1.9.2)
- [Dify `1.10.0` release](https://github.com/langgenius/dify/releases/tag/1.10.0)
- [Dify `1.10.1` release](https://github.com/langgenius/dify/releases/tag/1.10.1)
- [Dify `1.11.0` release](https://github.com/langgenius/dify/releases/tag/1.11.0)
- [Dify `1.12.0` release](https://github.com/langgenius/dify/releases/tag/1.12.0)
- [Dify `1.13.0` release](https://github.com/langgenius/dify/releases/tag/1.13.0)
- [Dify releases index](https://github.com/langgenius/dify/releases)

### Current official documentation

- [Official Dify documentation index](https://docs.dify.ai/llms.txt)
- [Build a custom Knowledge Pipeline](https://docs.dify.ai/en/self-host/use-dify/knowledge/knowledge-pipeline/readme)
- [Orchestrate a Knowledge Pipeline](https://docs.dify.ai/en/self-host/use-dify/knowledge/knowledge-pipeline/knowledge-pipeline-orchestration)
- [Run a Knowledge Pipeline through the API](https://docs.dify.ai/en/api-reference/knowledge-pipeline/run-pipeline)
- [Configure chunks](https://docs.dify.ai/en/self-host/use-dify/knowledge/create-knowledge/chunking-and-cleaning-text)
- [Configure indexing and retrieval](https://docs.dify.ai/en/self-host/use-dify/knowledge/create-knowledge/setting-indexing-methods)
- [Test knowledge retrieval](https://docs.dify.ai/en/self-host/use-dify/knowledge/test-retrieval)
- [Manage metadata](https://docs.dify.ai/en/self-host/use-dify/knowledge/metadata)
- [Handle workflow errors](https://docs.dify.ai/en/self-host/use-dify/build/predefined-error-handling-logic)
- [Inspect run history](https://docs.dify.ai/en/self-host/use-dify/debug/history-and-logs)
- [Inspect production logs](https://docs.dify.ai/en/self-host/use-dify/monitor/logs)
- [Manage app versions](https://docs.dify.ai/en/self-host/use-dify/build/version-control)
- [Use workflow triggers](https://docs.dify.ai/en/self-host/use-dify/nodes/trigger/overview)
- [Use Human Input](https://docs.dify.ai/en/self-host/use-dify/nodes/human-input)

## Relationship to other internal documents

- `dify-versioned-documentation-plan.md` remains the source for version ownership,
  release-specific DSLs, screenshots, and provenance.
- `rag-capability-assessment.md` remains the source for the broader production-readiness
  acceptance model.
- This document owns the post-`1.9.1` release delta and the prioritized exercise-change
  backlog.