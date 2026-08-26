import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'docs', 'screenshots.manifest.json');
const versionsPath = path.join(root, 'versions.json');
const expectedExerciseFiles = [
  'intro.md',
  '02_dataset.mdx',
  'exercise-1-llm-configuration.mdx',
  'exercise-2-knowledge-ingestion.mdx',
  'exercise-2-api-knowledge-ingestion.mdx',
  'exercise-3-ai-chatbot-setup.mdx',
  'exercise-4-advanced-prompting.mdx',
];

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

function readManifest() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (manifest.schema_version !== 1 || !manifest.documentation_versions || !manifest.services) {
    throw new Error('manifest requires schema_version 1, documentation_versions, and services');
  }
  return manifest;
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function validatePath(relativePath, owner) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    fail(`${owner} references missing path: ${relativePath}`);
  }
}

function checkDocumentationVersions(manifest) {
  const configuredVersions = JSON.parse(fs.readFileSync(versionsPath, 'utf8'));
  const manifestVersions = Object.keys(manifest.documentation_versions);
  const historicalVersions = manifestVersions.filter((version) => version !== 'current');

  if (JSON.stringify(configuredVersions) !== JSON.stringify(historicalVersions)) {
    fail(`versions.json must match manifest history: ${historicalVersions.join(', ')}`);
  }

  for (const [versionName, version] of Object.entries(manifest.documentation_versions)) {
    if (!version.label || !version.dify_version || !version.strategy || !version.docs_directory || !version.route) {
      fail(`documentation version ${versionName} has incomplete routing metadata`);
      continue;
    }
    if (!/^[0-9a-f]{40}$/.test(version.source_revision ?? '')) {
      fail(`documentation version ${versionName} requires an immutable source revision`);
    }
    if (versionName === 'latest' || version.dify_version === 'latest') {
      fail('floating latest cannot be a published documentation version');
    }
    if (version.capture_status !== 'planned') {
      validatePath(version.screenshot_root, `documentation version ${versionName}`);
    }

    const docsDirectory = path.join(root, version.docs_directory);
    validatePath(version.docs_directory, `documentation version ${versionName}`);
    for (const exerciseFile of expectedExerciseFiles) {
      if (!fs.existsSync(path.join(docsDirectory, exerciseFile))) {
        fail(`documentation version ${versionName} is missing exercise flow file: ${exerciseFile}`);
      }
    }
  }
}

function checkDocAssets(manifest) {
  let docsCount = 0;
  const assetPattern = /require\(['"]((?:\.\.\/)+static\/[^'"]+)['"]\)/g;

  for (const [versionName, version] of Object.entries(manifest.documentation_versions)) {
    const docsDirectory = path.join(root, version.docs_directory);
    const docs = walk(docsDirectory).filter((file) => /\.(md|mdx)$/.test(file));
    docsCount += docs.length;
    for (const file of docs) {
      const content = fs.readFileSync(file, 'utf8');
      for (const match of content.matchAll(assetPattern)) {
        const resolvedAsset = path.resolve(path.dirname(file), match[1]);
        if (!fs.existsSync(resolvedAsset)) {
          fail(`${path.relative(root, file)} references missing path: ${path.relative(root, resolvedAsset)}`);
        }
      }
    }
    if (docs.length !== expectedExerciseFiles.length) {
      fail(`documentation version ${versionName} has ${docs.length} exercises; expected ${expectedExerciseFiles.length}`);
    }
  }
  return docsCount;
}

function check(manifest) {
  checkDocumentationVersions(manifest);
  const docsCount = checkDocAssets(manifest);

  for (const [serviceName, service] of Object.entries(manifest.services)) {
    if (!service.owner || !service.capture_environment || !Array.isArray(service.shots)) {
      fail(`${serviceName} requires owner, capture_environment, and shots`);
      continue;
    }
    for (const shot of service.shots) {
      if (!shot.id || !shot.state || !shot.fixture) {
        fail(`${serviceName} has an incomplete shot group`);
      }
      for (const target of shot.target_docs ?? []) validatePath(target, shot.id);
      if (shot.status !== 'planned') {
        for (const output of shot.outputs ?? []) validatePath(output, shot.id);
        for (const directory of shot.output_directories ?? []) validatePath(directory, shot.id);
      }
    }
  }

  if (!process.exitCode) {
    const versionCount = Object.keys(manifest.documentation_versions).length;
    console.log(`OK: ${docsCount} docs across ${versionCount} Dify versions and screenshot manifest are coherent`);
  }
}

function plan(manifest, requestedService) {
  const names = requestedService === 'all' ? Object.keys(manifest.services) : [requestedService];
  for (const name of names) {
    const service = manifest.services[name];
    if (!service) {
      fail(`unknown service '${name}'. Choose: ${Object.keys(manifest.services).join(', ')}, all`);
      continue;
    }
    console.log(`\n[${name}] owner=${service.owner} environment=${service.capture_environment}`);
    if (service.shots.length === 0) console.log('  no shots currently registered');
    for (const shot of service.shots) {
      const outputs = [...(shot.outputs ?? []), ...(shot.output_directories ?? [])];
      console.log(`  ${shot.id}: ${shot.state}`);
      console.log(`    fixture: ${shot.fixture}`);
      console.log(`    outputs: ${outputs.join(', ')}`);
      console.log(`    status: ${shot.status ?? 'current'}`);
      console.log(`    captured_at: ${shot.captured_at ?? 'PENDING'}`);
      console.log(`    source_revision: ${shot.source_revision ?? 'PENDING'}`);
    }
  }
}

const manifest = readManifest();
const [command = 'check', service = 'all'] = process.argv.slice(2);

if (command === 'check') check(manifest);
else if (command === 'plan') plan(manifest, service);
else fail(`unknown command '${command}'. Use check or plan`);
