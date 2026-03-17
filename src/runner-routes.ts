/**
 * API route constants for the bqool runner.
 *
 * This file is the ground-truth for all runner endpoints consumed by other repos.
 * It must be kept in sync with bqool-runner controllers.
 *
 * All paths include the `/api` prefix. Parameterized routes are functions.
 *
 * @example
 *   fetch(RUNNER_API.jobs.one(42))
 *   fetch(RUNNER_API.correction.item)
 */

const BASE = '/api';

export const RUNNER_API = {
  // ── Jobs ──────────────────────────────────────────────────────────────────
  jobs: {
    list:   `${BASE}/jobs`,
    create: `${BASE}/jobs`,
    one:    (id: number) => `${BASE}/jobs/${id}`,
    stop:   (id: number) => `${BASE}/jobs/${id}/stop`,
  },

  // ── Queue ─────────────────────────────────────────────────────────────────
  queue: {
    status:  `${BASE}/queue/status`,
    stopAll: `${BASE}/queue/stop-all`,
  },

  // ── Correction ────────────────────────────────────────────────────────────
  correction: {
    booleanq:  `${BASE}/correction/booleanq`,
    item:      `${BASE}/correction/item`,
    coherence: `${BASE}/correction/coherence`,
    seed:      `${BASE}/correction/seed`,
    fork:      `${BASE}/correction/fork`,
  },

  // ── Rubric seek ───────────────────────────────────────────────────────────
  rubricSeek: {
    run: `${BASE}/rubric-seek/run`,
  },

  // ── Rubric merge ──────────────────────────────────────────────────────────
  rubricMerge: {
    createWorkdir: `${BASE}/rubric-merge/create-workdir`,
    status:        `${BASE}/rubric-merge/status`,
    importOutput:  `${BASE}/rubric-merge/import-output`,
  },
} as const;
