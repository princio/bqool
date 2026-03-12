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

export interface BatchRunState {
  questionId: number;
  itemType?: string;
  phase: 'idle' | 'creating' | 'correcting' | 'importing' | 'done' | 'stopped';
  concurrency: number;
  answers: { answerId: number; studentName: string; status: string; error?: string }[];
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

export interface ItemEvalJob {
  answerId: number;
  studentName: string;
  itemId: number;
  itemName: string;
  status: 'pending' | 'running' | 'done' | 'error';
  error?: string;
  started_at?: string;
  finished_at?: string;
}

export interface ItemEvalBatchState {
  questionId: number;
  itemType: string;
  phase: 'idle' | 'running' | 'done' | 'stopped';
  concurrency: number;
  jobs: ItemEvalJob[];
  completed: number;
  total: number;
  running: number;
  log: string[];
}

export interface PersistSessionOutputResult {
  ok: boolean;
  length: number;
}
