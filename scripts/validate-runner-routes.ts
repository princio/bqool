/**
 * Validates that src/runner-routes.ts stays in sync with the NestJS
 * controllers in the runner repo.
 *
 * Usage:
 *   npm run validate-runner-routes [-- --runner=<path>]
 *
 * The runner path defaults to the RUNNER_DIR env var, then falls back to
 * the sibling `../bqool-runner` directory.
 *
 * Exit codes:
 *   0 — in sync (warnings about extra declared routes are non-fatal)
 *   1 — controller routes are missing from runner-routes.ts
 */

import { readFileSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

// ── Config ────────────────────────────────────────────────────────────────────

const ROOT = resolve(__dirname, '..');

const runnerArg = process.argv.find(a => a.startsWith('--runner='))?.slice('--runner='.length);
const RUNNER_DIR = runnerArg
  ? resolve(runnerArg)
  : process.env.RUNNER_DIR
    ? resolve(process.env.RUNNER_DIR)
    : resolve(ROOT, '../bqool-runner');

const CONTROLLERS_DIR = join(RUNNER_DIR, 'src/modules');
const ROUTES_FILE = join(ROOT, 'src/runner-routes.ts');

// ── Helpers ───────────────────────────────────────────────────────────────────

function findControllers(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findControllers(full));
    else if (entry.isFile() && entry.name.endsWith('.controller.ts')) results.push(full);
  }
  return results;
}

/**
 * Normalise a route path for comparison:
 *   :param  →  *
 *   ${...}  →  *
 *   collapse duplicate slashes, strip leading/trailing slash
 */
function normalize(path: string): string {
  return path
    .replace(/:[a-zA-Z_][a-zA-Z0-9_]*/g, '*')
    .replace(/\$\{[^}]+\}/g, '*')
    .replace(/\/+/g, '/')
    .replace(/^\/|\/$/g, '');
}

// ── Extract from controllers ──────────────────────────────────────────────────

function extractFromController(content: string): string[] {
  const prefixMatch = content.match(/@Controller\('([^']*)'\)/);
  const prefix = prefixMatch?.[1] ?? '';

  const routes: string[] = [];
  let m: RegExpExecArray | null;

  // @Get('path'), @Post('path'), …
  const withArg = /@(?:Get|Post|Put|Patch|Delete)\('([^']*)'\)/g;
  while ((m = withArg.exec(content)) !== null) {
    const full = prefix ? `${prefix}/${m[1]}` : m[1];
    routes.push(normalize(full));
  }

  // @Get(), @Post(), … — resolves to just the prefix
  const noArg = /@(?:Get|Post|Put|Patch|Delete)\(\s*\)/g;
  while ((m = noArg.exec(content)) !== null) {
    routes.push(normalize(prefix || '/'));
  }

  return routes;
}

// ── Extract from runner-routes.ts ─────────────────────────────────────────────

function extractFromRoutesFile(content: string): string[] {
  const routes: string[] = [];
  const tpl = /`\$\{BASE\}(\/[^`]*)`/g;
  let m: RegExpExecArray | null;
  while ((m = tpl.exec(content)) !== null) {
    routes.push(normalize(m[1]));
  }
  return routes;
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log(`\nRunner: ${RUNNER_DIR}`);

const controllerRoutes = new Set<string>();
for (const file of findControllers(CONTROLLERS_DIR)) {
  const content = readFileSync(file, 'utf-8');
  for (const r of extractFromController(content)) {
    if (r) controllerRoutes.add(r);
  }
}

const declaredRoutes = new Set(
  extractFromRoutesFile(readFileSync(ROUTES_FILE, 'utf-8')).filter(Boolean),
);

console.log(`Controllers: ${controllerRoutes.size} routes   runner-routes.ts: ${declaredRoutes.size} routes\n`);

const missingInRoutes = [...controllerRoutes].filter(r => !declaredRoutes.has(r)).sort();
const extraInRoutes   = [...declaredRoutes].filter(r => !controllerRoutes.has(r)).sort();

if (extraInRoutes.length) {
  console.warn('⚠️  Declared in runner-routes.ts but no matching controller:');
  for (const r of extraInRoutes) console.warn(`     ${r}`);
  console.warn('');
}

if (missingInRoutes.length) {
  console.error('❌  In controllers but missing from runner-routes.ts:');
  for (const r of missingInRoutes) console.error(`     ${r}`);
  console.error('');
  process.exit(1);
}

console.log('✅  Routes are in sync.');
