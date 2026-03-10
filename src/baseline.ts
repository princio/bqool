export interface RubricConceptRow {
  id: number;
  question_id: number;
  name: string;
  definition: string;
  position: number;
  required: number; // 1 = required (counts toward grade), 0 = optional
}

export interface BaselineExpressionRow {
  id: number;
  question_id: number;
  name: string;
  type: string;
}

export interface BaselineCodeRow {
  id: number;
  question_id: number;
  expression: string;
  type: string;
  correct_form: string;
}

export interface BaselineErrorRow {
  id: number;
  question_id: number;
  name: string;
  description: string;
}

export interface BaselineBooleanQRow {
  id: number;
  item_type: string;
  item_id: number;
  text: string;
  italian_text: string;
  parent_name?: string;
  parent_description?: string;
}

export interface BaselineExportData {
  question_id: string;
  concepts: (RubricConceptRow & { booleanqs: BaselineBooleanQRow[] })[];
  expressions: (BaselineExpressionRow & { booleanqs: BaselineBooleanQRow[] })[];
  code: (BaselineCodeRow & { booleanqs: BaselineBooleanQRow[] })[];
  errors: (BaselineErrorRow & { booleanqs: BaselineBooleanQRow[] })[];
  students: string[];
  answers: Record<string, string>;
}

export interface BaselineDetail {
  question_id: number;
  question_name: string;
  question_text: string;
  created_at: string;
  updated_at: string;
  students: {
    id: number;
    name: string;
    school_class_id: number;
    school_class: string;
    has_answer: boolean;
    not_answered: boolean;
    answer: string | null;
  }[];
}

export interface ReviewData {
  attemptId: number;
  question_id: number;
  student_id: number;
  student_name: string;
  answer_text: string;
  eval: {
    concepts: import('./attempt').AttemptConceptRow[];
    expressions: import('./attempt').AttemptExpressionRow[];
    code: import('./attempt').AttemptCodeRow[];
    coherence: { level: number; rationale: string } | null;
    errors: import('./attempt').AttemptErrorRow[];
  };
  suggestions: Record<string, unknown>;
  modifications: BaselineModification[];
  booleanq: BaselineBooleanQRow[];
  warnings: string[];
}

export interface BaselineModification {
  item_type: string;
  item_id: number;
  field: string;
  current: string;
  proposed: string;
}

// ── Population response types ────────────────────────────────────────

export interface PopulationReviewData {
  question_id: number;
  population_id: string;
  concepts: unknown[];
  expressions: unknown[];
  code: unknown[];
  errors: unknown[];
}

export interface CreatePopulationResponse {
  id: string;
  path: string;
  relativePath: string;
  question_id: number;
}

export interface ConfirmPopulationResult {
  executed: number;
  errors: string[];
}

export interface PopulationListItem {
  id: string;
  path: string;
  has_output: boolean;
}

export interface SyncBaselinePayload {
  concepts?: { name: string; definition: string }[];
  expressions?: { name: string; type: string }[];
  code?: { expression: string; type: string; correct_form: string }[];
  errors?: { name: string; description: string }[];
}
