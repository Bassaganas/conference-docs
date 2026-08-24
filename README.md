# Testus Patronus Conference Docs

This Docusaurus site owns the conference workshop narrative, Dify DSLs, public datasets, and visual walkthroughs. Runtime and infrastructure behavior remain owned by their application and provisioning repositories.

## Installation

```bash
npm ci
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run check
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Adding or Updating an Exercise

Use `/conference-exercise-workflow <exercise>` as the canonical flow:

1. Define one observable learning outcome.
2. Verify the owning Dify DSL, dataset, provisioning contract, or Jira API behavior.
3. Update one primary MDX page and its sidebar position.
4. Update `docs/screenshots.manifest.json` and refresh affected screenshots.
5. Run `npm run check`.

Plan a service-specific recapture without browsing:

```bash
npm run screenshots:plan -- dify
npm run screenshots:plan -- provisioning
npm run screenshots:plan -- jira-api
npm run screenshots:plan -- sut
npm run screenshots:plan -- all
```

Live service access and deployment require explicit approval. Documentation work must not provision or mutate cloud resources.
