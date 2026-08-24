# Conference Docs Guidelines

## Responsibility

This repository owns the Testus Patronus conference workshop narrative: ordered Docusaurus exercises, public sample datasets, importable Dify DSLs, and screenshots of Dify, provisioning, and Jira-ingestion workflows. It does not own the deployed Dify runtime, classroom provisioning, Jira ingestion API, LOTR SUT, or standalone Testus Patronus application code.

## Dependencies and Boundaries

- `cloud-classroom-provisioning` owns the AWS Testus Patronus classroom, Dify setup, provisioning UI, and deployed ingestion contracts.
- `testus-patronus` owns the independent FastAPI/React RAG application. Do not present it as the conference Dify runtime.
- `palantir-jenkins-ai` owns Fellowship exercises and documentation. Reuse its lifecycle principles, not its Fellowship-specific URLs or credentials.
- Keep external service URLs and expected UI states explicit in the screenshot manifest. A documentation change never authorizes cloud mutation or deployment.

## Exercise Contract

- Use `conference-exercise-workflow` as the single authoring procedure and `conference-exercise-lifecycle` for end-to-end exercise work.
- Each exercise has one observable outcome, one primary MDX page, deterministic public/synthetic fixtures, optional Dify DSL output, and manifest-owned screenshots.
- Treat Exercise 2 and Exercise 2.1 as sequential manual and API ingestion paths, not duplicate alternatives.
- Documentation must match the current Dify DSL, API request shape, dataset names, provisioning information, and visible UI.

## Validation and Safety

- Run `npm run check`, which validates referenced assets, typechecks, and builds Docusaurus.
- Run `npm run screenshots:check` after changing MDX, screenshot assets, or the manifest.
- Capture from a local or disposable workshop environment. Live capture requires explicit user approval and read-only navigation.
- Never commit API keys, Azure credentials, student credentials, private origins, cloud identifiers, customer documents, or personal data.
- Deployments and cloud changes are user-triggered and represented in the owning repository's IaC.