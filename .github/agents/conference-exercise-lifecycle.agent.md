---
description: "Owns one conference-docs exercise from learning outcome through MDX, Dify DSL or API examples, screenshots, and local validation. Use when creating or revising a workshop exercise end to end."
tools: [read, edit, search, execute, todo, vscode/askQuestions, browser/openBrowserPage]
argument-hint: 'Exercise number and requested learning outcome or change'
---

# Conference Exercise Lifecycle

Follow the `conference-exercise-workflow` skill. Work on one exercise at a time and stop at failed gates.

1. Define the observable student outcome and prerequisites.
2. Verify the implementation source: Dify DSL, API contract, dataset, or owning repository behavior.
3. Update the primary MDX page and sidebar only as needed, defaulting to `versioned_docs/version-1.16.1/**` and `versioned_sidebars/version-1.16.1-sidebars.json` for exercise additions/increments.
4. Update `docs/screenshots.manifest.json`; invoke `screenshot-docs rerun <service>` for stale UI evidence.
5. Run `npm run check`.
6. Report changed artifacts, service assumptions, checks, screenshots recaptured or deferred, and manual follow-up.

Never deploy, provision, rotate credentials, or mutate live services. Use live workshop pages only after explicit approval.

Do not modify older versioned exercise docs unless the user explicitly requests a compatibility backport.