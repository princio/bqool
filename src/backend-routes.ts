/**
 * API route constants for the bqool backend.
 *
 * This file is the ground-truth for all backend endpoints consumed by other repos
 * (frontend, runner, etc.). It must be kept in sync with bqool-backend controllers.
 *
 * All paths include the `/api` prefix. Parameterized routes are functions.
 *
 * @example
 *   fetch(API.classes.one(3))
 *   fetch(API.answers.ai.correctItem(5, 'concept', 12))
 */

const BASE = '/api';

export const API = {
  // ── Dashboard ────────────────────────────────────────────────────────────
  dashboard: `${BASE}/dashboard`,

  // ── Classes ──────────────────────────────────────────────────────────────
  classes: {
    list:    `${BASE}/classes`,
    one:     (id: number) => `${BASE}/classes/${id}`,
    students: {
      add:    (classId: number) => `${BASE}/classes/${classId}/students`,
      remove: (classId: number, studentId: number) => `${BASE}/classes/${classId}/students/${studentId}`,
    },
  },

  // ── Tests ────────────────────────────────────────────────────────────────
  tests: {
    list:    `${BASE}/tests`,
    one:     (id: number) => `${BASE}/tests/${id}`,
    detail:  (id: number) => `${BASE}/tests/${id}/detail`,
    results: (id: number) => `${BASE}/tests/${id}/results`,
    questions: {
      add:    (testId: number) => `${BASE}/tests/${testId}/questions`,
      update: (testId: number, questionId: number) => `${BASE}/tests/${testId}/questions/${questionId}`,
      remove: (testId: number, questionId: number) => `${BASE}/tests/${testId}/questions/${questionId}`,
    },
    students: {
      summary: (testId: number, studentId: number) => `${BASE}/tests/${testId}/students/${studentId}`,
      grade:   (testId: number, studentId: number) => `${BASE}/tests/${testId}/students/${studentId}/grade`,
    },
  },

  // ── Questions ────────────────────────────────────────────────────────────
  questions: {
    list:        `${BASE}/questions`,
    one:         (id: number) => `${BASE}/questions/${id}`,
    gradeParams: (id: number) => `${BASE}/questions/${id}/grade-params`,
  },

  // ── Students ─────────────────────────────────────────────────────────────
  students: {
    one:    (id: number) => `${BASE}/students/${id}`,
    tests:  (id: number) => `${BASE}/students/${id}/tests`,
    nav:    (id: number, questionId: number) => `${BASE}/students/${id}/questions/${questionId}/nav`,
    answer: (id: number, questionId: number) => `${BASE}/students/${id}/questions/${questionId}/answer`,
  },

  // ── Answers ──────────────────────────────────────────────────────────────
  answers: {
    create:       `${BASE}/answers`,
    one:          (id: number) => `${BASE}/answers/${id}`,
    protected:    (id: number) => `${BASE}/answers/${id}/protected`,
    grade:        (id: number) => `${BASE}/answers/${id}/grade`,
    bonus:        (id: number) => `${BASE}/answers/${id}/bonus`,
    workdir:      (id: number) => `${BASE}/answers/${id}/workdir`,
    workdirStatus:(id: number) => `${BASE}/answers/${id}/workdir-status`,
    byStudent:    `${BASE}/answers/by-student`,
    byTest:       `${BASE}/answers/by-test`,
    batch:        `${BASE}/answers/batch`,
    batchReset:   `${BASE}/answers/batch-reset`,
    correction:   (category: string, itemId: number) => `${BASE}/answers/correction/${category}/${itemId}`,

    ai: {
      importOutput:    (id: number) => `${BASE}/answers/${id}/ai/import-output`,
      reviewData:      (id: number) => `${BASE}/answers/${id}/ai/review-data`,
      reviewDraft:     (id: number) => `${BASE}/answers/${id}/ai/review-draft`,
      reviewConfirm:   (id: number) => `${BASE}/answers/${id}/ai/review/confirm`,
      correctBooleanq: (answerId: number, booleanqId: number) => `${BASE}/answers/${answerId}/ai/correct-booleanq/${booleanqId}`,
      previewBooleanq: (answerId: number, booleanqId: number) => `${BASE}/answers/${answerId}/ai/preview-booleanq/${booleanqId}`,
      correctItem:     (answerId: number, itemType: string, itemId: number) => `${BASE}/answers/${answerId}/ai/correct-item/${itemType}/${itemId}`,
      previewItem:     (answerId: number, itemType: string, itemId: number) => `${BASE}/answers/${answerId}/ai/preview-item/${itemType}/${itemId}`,
      assessCoherence: (answerId: number) => `${BASE}/answers/${answerId}/ai/assess-coherence`,
    },
  },

  // ── AI item-correction batch ──────────────────────────────────────────────
  aiItemCorrection: {
    run:    `${BASE}/ai/item-correction/run`,
    status: `${BASE}/ai/item-correction/status`,
    stop:   `${BASE}/ai/item-correction/stop`,
  },

  // ── Boolean answers ───────────────────────────────────────────────────────
  booleanAnswers: {
    init:   `${BASE}/boolean-answers/init`,
    one:    (booleanqId: number) => `${BASE}/boolean-answers/${booleanqId}`,
    review: (booleanqId: number) => `${BASE}/boolean-answers/${booleanqId}/review`,
  },

  // ── Penmarks ──────────────────────────────────────────────────────────────
  penmarks: {
    create: `${BASE}/penmarks`,
  },

  // ── Rubric ────────────────────────────────────────────────────────────────
  rubric: {
    detail: `${BASE}/rubric/detail`,
    export: `${BASE}/rubric/export`,
    sync:   `${BASE}/rubric/sync`,
  },

  rubricConcepts: {
    list: `${BASE}/rubric-concepts`,
    one:  (id: number) => `${BASE}/rubric-concepts/${id}`,
  },

  rubricBooleanqs: {
    list:   (itemType: string, itemId: number) => `${BASE}/rubric-booleanqs/${itemType}/${itemId}`,
    create: `${BASE}/rubric-booleanqs`,
    one:    (id: number) => `${BASE}/rubric-booleanqs/${id}`,
  },

  rubricItems: {
    one: (type: string, id: number) => `${BASE}/rubric-items/${type}/${id}`,
  },

  rubricExpressions: {
    create: `${BASE}/rubric-expressions`,
    one:    (id: number) => `${BASE}/rubric-expressions/${id}`,
  },

  rubricCodes: {
    create: `${BASE}/rubric-codes`,
    one:    (id: number) => `${BASE}/rubric-codes/${id}`,
  },

  rubricErrors: {
    create: `${BASE}/rubric-errors`,
    one:    (id: number) => `${BASE}/rubric-errors/${id}`,
  },

  // ── Rubric drafts (population / seek / merge) ─────────────────────────────
  rubricDrafts: {
    list:       `${BASE}/rubric-drafts`,
    create:     `${BASE}/rubric-drafts`,
    import:     (populationId: string) => `${BASE}/rubric-drafts/${populationId}/import`,
    reviewData: (populationId: string) => `${BASE}/rubric-drafts/${populationId}/review-data`,
    confirm:    (populationId: string) => `${BASE}/rubric-drafts/${populationId}/confirm`,

    batch: (itemType: string) => ({
      workdirs:    `${BASE}/rubric-draft/batch/${itemType}/workdirs`,
      run:         `${BASE}/rubric-draft/batch/${itemType}/run`,
      status:      `${BASE}/rubric-draft/batch/${itemType}/status`,
      stop:        `${BASE}/rubric-draft/batch/${itemType}/stop`,
      overview:    `${BASE}/rubric-draft/batch/${itemType}/overview`,
      mergeWorkdir:`${BASE}/rubric-draft/batch/${itemType}/merge-workdir`,
      mergeStatus: `${BASE}/rubric-draft/batch/${itemType}/merge-status`,
      importMerge: `${BASE}/rubric-draft/batch/${itemType}/import-merge`,
    }),
  },

  // ── Sessions ──────────────────────────────────────────────────────────────
  sessions: {
    list:    `${BASE}/sessions`,
    one:     (id: number) => `${BASE}/sessions/${id}`,
    persist: (id: number) => `${BASE}/sessions/${id}/persist`,
  },

  // ── Backups ───────────────────────────────────────────────────────────────
  backups: {
    list:    `${BASE}/backups`,
    create:  `${BASE}/backups`,
    export:  `${BASE}/backups/export`,
    import:  `${BASE}/backups/import`,
    restore: (id: number) => `${BASE}/backups/${id}/restore`,
    one:     (id: number) => `${BASE}/backups/${id}`,
  },

  // ── Import/Export ─────────────────────────────────────────────────────────
  importJson: `${BASE}/import-json`,

  // ── PDF ───────────────────────────────────────────────────────────────────
  pdf: {
    studentQuestion: `${BASE}/pdf/student-question`,
    studentTest:     `${BASE}/pdf/student-test`,
  },
} as const;
