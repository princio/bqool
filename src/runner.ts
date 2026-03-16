// ── Runner types (shared between backend HTTP client and runner service) ──────

export interface RunnerJobRequest {
  /** Relative path under TMP_DIR, e.g. `question-5/seed/42_concept` */
  workdir_label: string;
  /** Files to write in the workdir (filename → content) */
  files?: Record<string, string>;
  /** Disable Claude auto-memory for this job */
  auto_memory_disabled?: boolean;
  /** User prompt for Claude */
  prompt: string;
  model?: string;
  system_prompt?: string;
  append_system_prompt?: string;
  json_schema?: object;
  output_format?: 'text' | 'json' | 'stream-json';
  session_id?: string;
  resume?: string;
  fork_session?: boolean;
  setting_sources?: string;
  no_session_persistence?: boolean;
  /** Opaque metadata stored by runner, queryable via tag.key=value */
  tags?: Record<string, string | number | null>;
}

export interface RunnerJobResponse {
  id: number;
  status: 'running';
  workdir: string;
}

export interface RunnerSession {
  id: number;
  workdir: string;
  prompt: string;
  system_prompt: string | null;
  model: string | null;
  pid: number | null;
  claude_session_id: string | null;
  status: 'running' | 'done' | 'error';
  exit_code: number | null;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
  /** Only included in GET /api/sessions/:id, null in list responses */
  stdout: string | null;
  /** Only included in GET /api/sessions/:id, null in list responses */
  stderr: string | null;
  error_message: string | null;
  tags: Record<string, string | number | null> | null;
}

export interface RunnerQueueStatus {
  concurrency: number;
  running: number;
  queued: number;
}

// ── Domain request types (raw domain data — no prompts) ───────────────────────

export interface CorrectionBooleanqRequest {
  answer_id: number;
  question_id: number;
  student_name: string;
  answer_text: string;
  item_type: string;
  item: { id: number; name: string; definition?: string; severity?: number };
  booleanq: { id: number; text: string };
  model?: string;
}

export interface CorrectionItemRequest {
  answer_id: number;
  question_id: number;
  student_name: string;
  answer_text: string;
  item_type: string;
  item: { id: number; name: string; definition?: string; severity?: number };
  booleanqs: { id: number; text: string }[];
  model?: string;
}

export interface CorrectionCoherenceRequest {
  answer_id: number;
  question_id: number;
  student_name: string;
  answer_text: string;
  model?: string;
}

export interface CorrectionSeedRequest {
  answer_id: number;
  question_id: number;
  student_name: string;
  answer_text: string;
  item_type: string;
  model?: string;
}

export interface CorrectionSeedResponse {
  session_id: string;
  workdir_label: string;
}

export interface CorrectionForkRequest {
  answer_id: number;
  question_id: number;
  student_name: string;
  item_type: string;
  item: { id: number; name: string; definition?: string; severity?: number };
  booleanqs: { id: number; text: string }[];
  parent_session_id: string;
  parent_workdir_label: string;
  model?: string;
}

export interface RubricSeekRequest {
  question_id: number;
  student_id: number;
  student_name: string;
  item_type: string;
  question_text: string;
  answer_text: string;
  model?: string;
}

// ── Rubric-merge workdir types ────────────────────────────────────────────────

export interface RubricMergeCreateWorkdirRequest {
  question_id: number;
  item_type: string;
}

export interface RubricMergeWorkdirResponse {
  workdir: string;
  relativePath: string;
}

export interface RubricMergeStatusResponse {
  hasMergeWorkdir: boolean;
  hasOutput: boolean;
  relativePath?: string;
}

export interface RubricMergeImportResponse {
  population_id: string;
}
