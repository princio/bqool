export interface AnswerRow {
  id: number;
  question_id: number;
  student_id: number;
  text: string;
  isblank: number;
  grade: number | null;
  grade_bonus: number | null;
  grade_rationale: string;
  coherence_level: number;
  coherence_rationale: string;
  protected: number;
  created_at: string;
  updated_at: string | null;
}

export interface PenmarkBooleanQRow {
  id: number;
  answer_id: number;
  rubric_booleanq_id: number;
  answer: number;
  citations: string[];
  rationale: string;
  reviewed_count: number;
  booleanq_text?: string;
  item_type?: string;
  rubric_item_id?: number;
}

export interface AnswerDetail extends AnswerRow {
  student_name: string;
  question_name: string;
  question_text: string;
  workdir: string;
  generated_prompt: string;
  booleanqs: PenmarkBooleanQRow[];
  baseline_expressions: { id: number; name: string; severity: number }[];
  baseline_concepts: { id: number; name: string; definition?: string; required?: number }[];
  baseline_codes: { id: number; name: string }[];
  baseline_errors: { id: number; name: string }[];
  rubric_booleanq: import('./baseline').RubricBooleanQRow[];
}

// ── Pipeline response types ──────────────────────────────────────────

export interface PrepareAnswerResponse {
  id: number;
  question_id: number;
  student_id: number;
  student_name: string;
  workdir: string;
  relativePath: string;
}

export interface ImportAnswerOutputResult {
  preview: boolean;
  executed?: number;
  errors?: string[];
  warnings: string[];
  suggestions?: Record<string, unknown> | null;
  data?: unknown;
}

export interface ExportEvalData {
  answer_id: number;
  exported_at: string;
  coherence_level: number;
  coherence_rationale: string;
  grade: number | null;
  grade_bonus: number | null;
  grade_rationale: string;
  booleanq: unknown[];
}

export interface ImportEvalResult {
  ok: boolean;
  counts: { booleanq: number };
}

export interface InitAnswerItemsResult {
  ok: boolean;
  created: { booleanq: number };
}

export interface CreateOrphanEvalItemResult {
  ok: boolean;
  id: number;
  category: string;
}

export interface ConfirmReviewResult {
  executed: number;
  errors: string[];
}

export interface TestRisultatiData {
  test: { id: number; name: string };
  questions: { id: number; name: string; number: number | null }[];
  students: {
    id: number;
    name: string;
    final_grade: number | null;
    scores: Record<number, {
      grade: number | null; grade_bonus: number | null;
      isblank: boolean; word_count: number; status: 'blank' | 'filled' | 'to_fill';
      booleanq_yes?: number;
    }>;
  }[];
}
