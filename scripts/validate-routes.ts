/**
 * Validates that src/backend-routes.ts stays in sync with the NestJS
 * controllers in the backend repo.
 *
 * Usage:
 *   npm run validate-routes [-- --backend=<path>]
 *
 * The backend path defaults to the BACKEND_DIR env var, then falls back to
 * the sibling `../bqool-backend` directory.
 *
 * Exit codes:
 *   0 — in sync (warnings about extra declared routes are non-fatal)
 *   1 — controller routes are missing from backend-routes.ts
 */

import { readFileSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

// ── Config ────────────────────────────────────────────────────────────────────

const ROOT = resolve(__dirname, '..');

const backendArg = process.argv.find(a => a.startsWith('--backend='))?.slice('--backend='.length);
const BACKEND_DIR = backendArg
  ? resolve(backendArg)
  : process.env.BACKEND_DIR
    ? resolve(process.env.BACKEND_DIR)
    : resolve(ROOT, '../bqool-backend');

const CONTROLLERS_DIR = join(BACKEND_DIR, 'src/modules');
const ROUTES_FILE = join(ROOT, 'src/backend-routes.ts');

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

// ── Extract from backend-routes.ts ───────────────────────────────────────────

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

console.log(`\nBackend: ${BACKEND_DIR}`);

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

console.log(`Controllers: ${controllerRoutes.size} routes   backend-routes.ts: ${declaredRoutes.size} routes\n`);

const missingInRoutes = [...controllerRoutes].filter(r => !declaredRoutes.has(r)).sort();
const extraInRoutes   = [...declaredRoutes].filter(r => !controllerRoutes.has(r)).sort();

if (extraInRoutes.length) {
  console.warn('⚠️  Declared in backend-routes.ts but no matching controller:');
  for (const r of extraInRoutes) console.warn(`     ${r}`);
  console.warn('');
}

if (missingInRoutes.length) {
  console.error('❌  In controllers but missing from backend-routes.ts:');
  for (const r of missingInRoutes) console.error(`     ${r}`);
  console.error('');
  process.exit(1);
}

console.log('✅  Routes are in sync.');
