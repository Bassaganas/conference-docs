import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildRoot = path.join(root, 'build');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'screenshots.manifest.json'), 'utf8'));
const representativeSlugs = ['intro', 'exercise-3-ai-chatbot-setup'];

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

function outputPath(route, slug) {
  const normalizedRoute = route.replace(/^\/|\/$/g, '');
  return path.join(buildRoot, normalizedRoute, slug, 'index.html');
}

for (const [versionName, version] of Object.entries(manifest.documentation_versions)) {
  for (const slug of representativeSlugs) {
    const file = outputPath(version.route, slug);
    if (!fs.existsSync(file)) fail(`${versionName} is missing built route ${version.route}${slug}/`);
  }
}

const builtJavaScript = fs.readdirSync(path.join(buildRoot, 'assets', 'js'))
  .filter((file) => file.endsWith('.js'))
  .map((file) => fs.readFileSync(path.join(buildRoot, 'assets', 'js', file), 'utf8'))
  .join('\n');

for (const version of Object.values(manifest.documentation_versions)) {
  if (!builtJavaScript.includes(version.label)) fail(`built selector is missing label: ${version.label}`);
}

if (!process.exitCode) {
  console.log(`OK: ${Object.keys(manifest.documentation_versions).length} Dify documentation versions have built routes and selector labels`);
}