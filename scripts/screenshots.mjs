import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'docs', 'screenshots.manifest.json');

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

function readManifest() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (manifest.schema_version !== 1 || !manifest.services) {
    throw new Error('manifest requires schema_version 1 and services');
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

function check(manifest) {
  const docs = walk(path.join(root, 'docs')).filter((file) => /\.(md|mdx)$/.test(file));
  const assetPattern = /require\(['"]\.\.\/static\/([^'"]+)['"]\)/g;

  for (const file of docs) {
    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(assetPattern)) {
      validatePath(path.join('static', match[1]), path.relative(root, file));
    }
  }

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

  if (!process.exitCode) console.log(`OK: ${docs.length} docs and screenshot manifest are coherent`);
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
