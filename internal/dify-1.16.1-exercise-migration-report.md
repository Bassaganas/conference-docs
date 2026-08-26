# Dify 1.16.1 Exercise Migration Report

## Outcome

The Dify 1.9.1 workshop exercises were migrated to an immutable `version-1.16.1` documentation release and executed on the authorized disposable Dify instance.

| Exercise | Live verification | Persistent artifact |
| --- | --- | --- |
| 1 - LLM configuration | Azure OpenAI plugin installed; chat and embedding defaults configured; workflow completed successfully | `static/dify-dsls/ex1_solved-1.16.1.yml` |
| 2 - Manual Knowledge ingestion | Two Jira files indexed; REST-266 retrieved with key, summary, and description together | `static/img/dify/1.16.1/ex2/` |
| 2.1 - API ingestion | Service 2.1.0 processed one file, created 23 issue documents, and reported no failures | API key revoked after verification |
| 3 - Grounded chatbot | REST-266 answer grounded with citations; out-of-scope query returned the required fallback | `static/dify-dsls/ex3_solved-1.16.1.yml` |
| 4 - Advanced workflow | Specific issue, multi-issue Iteration, test-generation If/Else, and unrelated classifier routes passed | `static/dify-dsls/ex4_sample-1.16.1.yml` |

## Runtime baseline

- Dify: `1.16.1`
- Revision: `6f8ed69ee15f9a2e7189ca066275e973d091d1e9`
- Azure OpenAI plugin: `langgenius/azure_openai` `0.0.69`
- Reasoning model: `gpt-35-turbo-16k`
- Embedding model: `text-embedding-3-large`
- Exported DSL version: `0.7.0`

All three exported DSLs were scanned for secrets and clean-reimported through Dify's 1.16.1 import API. Each import returned HTTP 200, status `completed`, DSL `0.7.0`, and no warnings.

## Compatibility findings

### Workflow synchronization

The remote deployment emits `ws://localhost/socket.io` for workflow synchronization. A remote browser can remain on **Syncing data** because that URL points at the participant's machine. The authorized test automation rewrote the socket origin to the instance's secure `wss://` origin. This remains a provisioning/runtime configuration defect; no cloud resources were modified.

### Manual upload and chunking

The browser upload flow MIME-sniffed the legacy `.txt` Jira fixtures as JSON during automation and rejected them. Dify's authenticated upload endpoint accepted the same fixtures when sent explicitly as `text/plain`.

The default single-newline delimiter produced 1,635 field-level chunks. Re-indexing with a blank-line delimiter, 2,000-character maximum, and 200-character overlap produced 44 issue chunks plus three summary chunks. REST-266 then retrieved as one coherent context at score 0.64.

### API-ingested metadata

The Jira service created a disposable `Jira_API_Basic_*` dataset with 23 available documents and 23 `issue_key` metadata values. Documentation uses the name pattern rather than the generated suffix. The short-lived Dify Service API key was revoked and its local secret file deleted after validation.

### Advanced workflow migration

Exercise 4 required these 1.16.1 fixes:

- normalize Parameter Extractor output to `issue_keys`;
- bind Iteration to `issue_keys` and query retrieval with the current `item`;
- accept both flat object lists and legacy nested lists in Code nodes; and
- filter test-generation retrieval with `issue_key is {{iteration.item}}`.

These changes are included in the versioned export.

## Evidence and safety

Thirty-seven live screenshots are stored under `static/img/dify/1.16.1/ex1` through `ex4`. They include full-flow orientation and focused views for model setup, chunking, retrieval, metadata, route results, and traces. Review found no credentials, API keys, provider endpoints, or private service origins in the published set.

The 1.9.1 release and its assets remain unchanged.
