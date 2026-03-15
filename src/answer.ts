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

export interface BooleanAnswerRow {
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
  booleanqs: BooleanAnswerRow[];
  baseline_expressions: { id: number; name: string; severity: number }[];
  baseline_concepts: { id: number; name: string; definition?: string; required?: number }[];
  baseline_codes: { id: number; name: string }[];
  baseline_errors: { id: number; name: string }[];
  rubric_booleanq: import('./rubric').RubricBooleanQRow[];
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

/** Categories for updating existing correction data */
export type UpdateCorrectionCategory = 'boolean_answer' | 'answer' | 'coherence';

/** Categories for creating free-form correction items */
export type FreeCorrectionCategory = 'expression' | 'code' | 'error';

export interface ExportCorrectionData {
  answer_id: number;
  exported_at: string;
  coherence_level: number;
  coherence_rationale: string;
  grade: number | null;
  grade_bonus: number | null;
  grade_rationale: string;
  booleanq: unknown[];
}

export interface ImportCorrectionResult {
  ok: boolean;
  counts: { booleanq: number };
}

export interface InitAnswerItemsResult {
  ok: boolean;
  created: { booleanq: number };
}

export interface CreateOrphanCorrectionItemResult {
  ok: boolean;
  id: number;
  category: FreeCorrectionCategory;
}

export interface ConfirmReviewResult {
  executed: number;
  errors: string[];
}

// ── AI output types ──────────────────────────────────────────────────

/** AI correction output for a single BooleanQ evaluation */
export interface AiBooleanQResult {
  id: number;
  answer: boolean;
  citations: string[];
  rationale: string;
}

/** AI correction output for item-level evaluation (multi-question) */
export interface AiItemCorrectionOutput {
  'booleanq-questions': AiBooleanQResult[];
}

/** AI coherence evaluation output */
export interface AiCoherenceOutput {
  level: number;
  rationale: string;
}

/** Group of BooleanQ results within one rubric item (from AI output file) */
export interface AiCorrectionItemGroup {
  booleanqs?: Partial<AiBooleanQResult>[];
  domande?: Partial<AiBooleanQResult>[];
}

/** Full AI correction output file shape (concepts + expressions + code + errors + coherence) */
export interface AiFullCorrectionOutput {
  concepts?: AiCorrectionItemGroup[];
  expressions?: AiCorrectionItemGroup[];
  code?: AiCorrectionItemGroup[];
  errors?: AiCorrectionItemGroup[];
  coherence?: Partial<AiCoherenceOutput>;
  suggestions?: Record<string, unknown>;
}

/** Resolved rubric item from AI review (with matched baseline) */
export interface ResolvedRubricItem {
  name: string;
  booleanqs?: { id: number; answer: boolean; citations?: string[]; rationale?: string }[];
  rubric_concept_id?: number | null;
  rubric_expression_id?: number | null;
  rubric_code_id?: number | null;
  rubric_error_id?: number | null;
  baseline?: { id: number; name: string; severity?: number; definition?: string } | null;
  [key: string]: unknown;
}

/** Baseline item proposed by AI for adding to rubric */
export interface BaselineProposal {
  name?: string;
  expression?: string;
  type?: string;
  severity?: number;
  definition?: string;
  description?: string;
}

/** Confirm review payload from frontend */
export interface ConfirmReviewPayload {
  eval: {
    concepts: ResolvedRubricItem[];
    expressions: ResolvedRubricItem[];
    code: ResolvedRubricItem[];
    errors: ResolvedRubricItem[];
    coherence: (AiCoherenceOutput & { livello?: number }) | null;
    booleanqs?: AiBooleanQResult[];
  };
  baseline: {
    concepts: BaselineProposal[];
    expressions: BaselineProposal[];
    code: BaselineProposal[];
    errors: BaselineProposal[];
  };
}

// ── Controller response types ────────────────────────────────────────

/** Response for toggling answer protection */
export interface ToggleProtectionResponse { ok: boolean; protected: number }

/** Response for batch answer creation */
export interface BatchCreateResponse { ok: boolean; created: number }

/** Response for batch answer reset */
export interface BatchResetResponse { ok: boolean; reset: number }

/** Response for workdir status check */
export interface WorkdirStatusResponse { workdir_mtime: string | null; output_mtime: string | null }

/** Response for workdir recreation */
export interface RecreateWorkdirResponse { ok: boolean; workdir: string }

/** Response for AI item correction */
export interface CorrectItemResponse { ok: boolean; count: number }

/** Response for AI item preview (wraps multiple BooleanQ results) */
export interface PreviewItemResponse { results: AiBooleanQResult[] }

// ── Score / results types ────────────────────────────────────────────

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
