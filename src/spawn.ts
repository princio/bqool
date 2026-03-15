import type { SpawnType } from './constants';

export interface ClaudeSession {
  id: number;
  question_id: number;
  answer_id: number | null;
  student_name: string;
  spawn_type: SpawnType | string;
  command: string;
  workdir: string;
  pid: number | null;
  status: 'running' | 'done' | 'error';
  exit_code: number | null;
  started_at: string;
  finished_at: string | null;
  error_message: string | null;
  item_type: string | null;
  item_id: number | null;
  booleanq_id: number | null;
  model: string | null;
  stdout?: string;
  stderr?: string;
}

export type RunStatus = 'pending' | 'running' | 'done' | 'error';

export interface RunAnswerInfo {
  answerId: number;
  studentName: string;
  status: RunStatus;
  error?: string;
  pid?: number;
  process_alive?: boolean;
  started_at?: string;
  finished_at?: string;
  exit_code?: number | null;
  session_id?: number;
  stdout_lines?: string[];
  stderr_lines?: string[];
}

export interface BatchRunState {
  questionId: number;
  itemType?: string;
  phase: 'idle' | 'creating' | 'correcting' | 'rechecking' | 'importing' | 'done' | 'stopped';
  concurrency: number;
  answers: RunAnswerInfo[];
  completed: number;
  total: number;
  running: number;
  log: string[];
}

export interface PopBatchDirInfo {
  studentId: number;
  studentName: string;
  hasOutput: boolean;
}

export interface PopBatchOverview {
  dirs: PopBatchDirInfo[];
  counts: { total: number; withOutput: number };
}

export interface MergeWorkdirStatus {
  hasMergeWorkdir: boolean;
  hasOutput: boolean;
  relativePath?: string;
}

export interface ItemCorrectionJob {
  answerId: number;
  studentName: string;
  itemId: number;
  itemName: string;
  status: 'pending' | 'running' | 'done' | 'error';
  error?: string;
  started_at?: string;
  finished_at?: string;
}

export interface ItemCorrectionBatchState {
  questionId: number;
  itemType: string;
  phase: 'idle' | 'running' | 'done' | 'stopped';
  concurrency: number;
  jobs: ItemCorrectionJob[];
  completed: number;
  total: number;
  running: number;
  log: string[];
  model?: string;
  useSeedFork?: boolean;
  seedsCompleted?: number;
  seedsTotal?: number;
}

/** Response for batch workdir creation */
export interface BatchWorkdirResponse { created: number; skipped: number }

/** Response for merge workdir creation */
export interface MergeWorkdirResponse { workdir: string; relativePath: string }

/** Response for merge import */
export interface ImportMergeResponse { population_id: string }

export interface PersistSessionOutputResult {
  ok: boolean;
  length: number;
}
