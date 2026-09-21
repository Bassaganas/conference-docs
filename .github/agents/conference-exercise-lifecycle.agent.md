---
description: "Owns one conference-docs exercise from learning outcome through MDX, Dify DSL or API examples, screenshots, and local validation. Use when creating or revising a workshop exercise end to end."
tools: [read, edit, search, execute, todo, vscode/askQuestions, browser/openBrowserPage]
argument-hint: 'Exercise number and requested learning outcome or change'
---

# Conference Exercise Lifecycle

Follow the `conference-exercise-workflow` skill. Work on one exercise at a time and stop at failed gates.

1. Resolve the current documentation target from `docs/screenshots.manifest.json`. New or changed exercise content defaults to the directory whose version entry has `strategy: current` (currently `versioned_docs/version-1.16.1/**`). Do not edit a historical version or an unversioned source copy unless the user explicitly approves a backport.
2. Define the observable student outcome and prerequisites.
3. Verify the implementation source: Dify DSL, API contract, dataset, or owning repository behavior.
4. Update the current-version MDX page and current-version sidebar only as needed. Keep one primary page per outcome and avoid creating a new page when a focused subsection preserves the exercise sequence.
5. Update `docs/screenshots.manifest.json` before capture; synchronize the current-version manifest snapshot when evidence is reviewed. Invoke `screenshot-docs rerun <service>` for stale UI evidence.
6. Treat approved Dify application-state changes for capture separately from prohibited cloud deployment, provisioning, host mutation, credential rotation, and infrastructure changes.
7. Run `npm run check`.
8. Report changed artifacts, service assumptions, checks, screenshots recaptured or deferred, and manual follow-up.

Never deploy, provision, rotate credentials, or mutate live services. Use live workshop pages only after explicit approval.