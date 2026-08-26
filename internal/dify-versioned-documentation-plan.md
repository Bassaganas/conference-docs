# Dify Versioned Documentation Plan

Status: Phase 1 versioning foundation implemented; release-specific captures pending
Scope: `conference-docs` workshop documentation for supported Dify releases

## Decision

Use native Docusaurus documentation versioning. The release selector in the header must select a local documentation version, not link to Dify source repositories.

Each supported Dify release will retain the same workshop sequence and learning outcomes while owning its release-specific:

- visible labels and navigation instructions;
- feature availability and compatibility notes;
- screenshots and screenshot provenance;
- Dify DSL compatibility notes or release-specific DSL files when imports differ;
- troubleshooting guidance and completion evidence.

The supported documentation catalog is:

| Documentation label | Dify release | Runtime strategy | Intended route | Evidence state |
| --- | --- | --- | --- | --- |
| August 2026 | `1.16.1` | `current` | `/docs/` | Runtime deployment and capture pending |
| March 2026 | `1.13.3` | `previous` | `/docs/1.13.3/` | Exact capture environment must be verified |
| September 2025 | `1.9.1` | `legacy` | `/docs/1.9.1/` | Exact capture environment must be verified |

No floating `latest` documentation version will be published. A floating instance may be used for reconnaissance, but its screenshots cannot become release evidence until its exact image, source revision, and service version are known.

## Information architecture

Configure the Docusaurus docs plugin and navbar to use `docsVersionDropdown`.

- Keep `docs/` as the August 2026 Dify `1.16.1` source.
- Snapshot March 2026 into `versioned_docs/version-1.13.3/`.
- Snapshot September 2025 into `versioned_docs/version-1.9.1/`.
- Add `versions.json` and generated versioned sidebar files.
- Preserve the existing exercise order in every version:
  1. Introduction and environment access.
  2. Dataset.
  3. Exercise 1: model configuration.
  4. Exercise 2: manual knowledge ingestion.
  5. Exercise 2.1: API knowledge ingestion.
  6. Exercise 3: grounded Chatflow.
  7. Exercise 4: advanced prompting and retrieval.
- Replace the external GitHub release links in the current header dropdown with local version routes.
- Keep source commit links in a release provenance callout inside each version, where they provide evidence without acting as navigation.

Native version snapshots intentionally freeze learner instructions. Common conceptual corrections must be applied to every supported version, while UI-specific changes are made only in the affected version.

## Content contract per exercise

Every versioned exercise must preserve its objective, prerequisites, numbered flow, expected result, completion check, and transition to the next exercise. Differences must be explicit and local.

For each release, verify and document:

| Area | Release-specific evidence |
| --- | --- |
| Admin setup | Setup screen, account flow, and post-setup landing page |
| Model providers | Settings location, plugin installation flow, Azure OpenAI fields, and system model selection |
| Knowledge | Creation flow, chunking controls, indexing method, retrieval settings, metadata controls, and API-key location |
| Studio and Chatflow | Application creation, node names, node configuration panels, variable selectors, preview, trace, and publish controls |
| Advanced blocks | Availability and configuration of Parameter Extractor, Question Classifier, Iteration, If/Else, and metadata filtering |
| DSL imports | Schema version, node compatibility, provider identifiers, and any migration warning |
| Troubleshooting | Only errors and remedies reproduced on that release |

Do not fork conceptual explanations merely because a label moved. Fork instructions, screenshots, or compatibility notes only when the learner action or visible result differs.

## Screenshot ownership

Move Dify-owned images to release-specific roots:

```text
static/img/dify/1.16.1/ex1/
static/img/dify/1.16.1/ex2/
static/img/dify/1.16.1/ex3/
static/img/dify/1.16.1/ex4/
static/img/dify/1.13.3/ex1/
...
static/img/dify/1.9.1/ex4/
```

Provisioning, Jira API, datasets, and conceptual diagrams remain shared unless their owning service or visible contract changes. The current mixed `static/img/ex*` directories must not be copied wholesale because they contain both shared and Dify-owned assets.

Upgrade the screenshot manifest to describe releases explicitly. Each Dify capture record must include:

- Dify release and dated documentation label;
- runtime strategy;
- immutable source revision;
- immutable image-lock identity when available;
- approved capture environment;
- capture timestamp and viewport;
- fixture and expected UI state;
- release-specific outputs and target versioned documents;
- redactions and reviewer status.

The screenshot checker must validate all versioned MDX trees and reject:

- a Dify screenshot referenced by more than one release unless marked release-independent;
- missing release metadata;
- floating `latest` as a published service version;
- an output stored outside its declared release root;
- a completed capture with null provenance.

## Supplied instance assessment

The following instances were approved for read-only inspection:

| Instance | User description | Observed state | Permitted use now |
| --- | --- | --- | --- |
| `dify-i-09f6e49ffb70173df.testingfantasy.com` | latest Dify image | Public setup page; setup reports `not_started`; exact version not publicly identified | UI reconnaissance only after setup ownership is agreed |
| `dify-i-00198099278cb495b.testingfantasy.com` | current stable pin | Public setup page; setup reports `not_started`; exact version not publicly identified | Candidate pinned capture environment after exact release verification |

Both instances currently require admin initialization. Creating an admin account, installing providers, uploading datasets, importing DSLs, or publishing applications mutates the instance and is outside read-only inspection. Capture work therefore requires explicit approval for disposable-instance mutation and a secure credential handoff that does not enter source, screenshots, terminal logs, or agent context.

Before assigning either instance to a documentation version, verify its exact release from the provisioning record, container image digest, or trusted authenticated Dify version display. Similar setup pages are not sufficient evidence.

## Phased delivery

### Phase 1: Versioning foundation

Implementation status: complete. The native version routes, frozen snapshots, release catalog, cross-version exercise checks, and built-route checks are in place. Historical pages retain capture-pending notices until reviewed release-specific evidence replaces inherited assets.

1. Add Docusaurus native version configuration and local version dropdown.
2. Create the `1.13.3` and `1.9.1` snapshots from the common exercise flow.
3. Add release provenance callouts and remove language implying that one screenshot set fits every release.
4. Separate shared images from Dify-owned images.
5. Extend the screenshot manifest and checker for release-aware ownership.
6. Add a route/build smoke test that opens the same exercise in all three documentation versions.

Exit criterion: all three routes build, preserve identical exercise order, and resolve only their declared assets. Pending captures are visibly marked as pending and are not represented as verified.

### Phase 2: Existing pinned releases

1. Obtain the immutable version and digest mapping for both supplied instances.
2. Approve disposable mutation or replace them with preconfigured disposable instances.
3. Reproduce the deterministic workshop fixture on the matching pinned release.
4. Execute every exercise in order and record UI and DSL differences.
5. Capture, redact, review, and register each release-specific screenshot set.
6. Update only the matching versioned MDX where learner actions differ.

Exit criterion: each published legacy route has complete provenance, release-matched screenshots, and a successful end-to-end exercise run.

### Phase 3: August 2026 Dify `1.16.1`

Start only after the `cloud-classroom-provisioning` release-freeze changes are deployed and a disposable `current` instance is created from the immutable `1.16.1` contract.

1. Verify commit `6f8ed69ee15f9a2e7189ca066275e973d091d1e9`, image lock, `linux/amd64`, and selected strategy.
2. Initialize the disposable instance using approved credentials.
3. Run the full workshop flow with the deterministic fixtures and release-matched DSLs.
4. Capture and review all Dify shot groups.
5. Replace pending `1.16.1` evidence and make August 2026 the default route only after acceptance passes.

Exit criterion: the default documentation has complete `1.16.1` evidence and no screenshot inherited from an unverified release.

## Validation matrix

For every supported release:

1. Build its route and verify previous/next navigation follows the workshop sequence.
2. Check every local asset and downloadable DSL.
3. Import the release-matched DSLs and inspect migration warnings.
4. Complete manual ingestion, API ingestion, retrieval, grounded Chatflow, and advanced-block checks.
5. Compare documented labels and screenshots with the actual release.
6. Run `npm run screenshots:check`, `npm run typecheck`, and `npm run build`.
7. Run browser smoke tests for the version selector and one representative page from each exercise.

## Risks and controls

- **Floating runtime drift:** never publish evidence from `latest`; resolve it to an immutable release first.
- **False version mapping:** require trusted runtime or provisioning evidence before capture.
- **Content drift between versions:** keep the same sidebar contract and use a cross-version exercise-order test.
- **Screenshot leakage:** use synthetic fixtures and mandatory redaction review.
- **DSL incompatibility:** validate imports separately per release rather than assuming backward compatibility.
- **Premature default:** do not present August 2026 as fully evidenced until the deployed pinned runtime is captured.
- **Live-instance mutation:** require explicit approval and disposable ownership before setup or data creation.

## Immediate decisions required

1. Confirm the exact immutable release behind each supplied instance.
2. Confirm whether those uninitialized instances are disposable and may be configured for capture.
3. Decide whether incomplete release routes remain unpublished or are published with an explicit capture-pending banner.
4. Confirm that `1.13.3` and `1.9.1` remain the two supported historical documentation versions.

Until those decisions are resolved, Phase 1 can establish the versioning structure, but release-specific screenshots and feature claims cannot be completed responsibly.