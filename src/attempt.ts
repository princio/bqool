import type { BaselineBooleanQRow } from './baseline';

export interface AttemptRow {
  id: number;
  question_id: number;
  student_id: number;
  grade_min: number | null;
  grade_max: number | null;
  bonus: number | null;
  grade_notes: string;
  coherence_level: number;
  coherence_rationale: string;
  open_count: number;
  edit_count: number;
  last_edit: string | null;
  protected: number;
}

export interface AttemptConceptRow {
  id: number;
  attempt_id: number;
  rubric_concept_id: number;
  present: number;
  completeness: number;
  citations_json: string;
  rationale: string;
  concept_name?: string;
  definition?: string;
  required?: number;
}

export interface AttemptExpressionRow {
  id: number;
  attempt_id: number;
  name: string;
  type: string;
  citations_json: string;
  rationale: string;
  baseline_expression_id?: number | null;
  baseline?: { id: number; name: string; type: string } | null;
}

export interface AttemptCodeRow {
  id: number;
  attempt_id: number;
  name: string;
  citation_json: string;
  type: string;
  correct_form: string;
  rationale: string;
  active: number;
  baseline_code_id?: number | null;
  baseline?: { id: number; expression: string; type: string; correct_form: string } | null;
}

export interface AttemptErrorRow {
  id: number;
  attempt_id: number;
  name: string;
  description: string;
  severity: number;
  citations_json: string;
  rationale: string;
  baseline_error_id?: number | null;
  baseline?: { id: number; name: string; description: string } | null;
}

export interface AttemptBooleanQAnswer {
  id: number;
  attempt_id: number;
  baseline_booleanq_id: number;
  answer: number;
  citation: string;
  rationale: string;
  review_count?: number;
  booleanq_text?: string;
  booleanq_italian_text?: string;
  item_type?: string;
  item_id?: number;
}

export interface AttemptDetail extends AttemptRow {
  student_name: string;
  question_name: string;
  question_text: string;
  workdir: string;
  answer_text: string;
  generated_prompt: string;
  concepts: AttemptConceptRow[];
  expressions: AttemptExpressionRow[];
  codes: AttemptCodeRow[];
  errors: AttemptErrorRow[];
  booleanq_answers: AttemptBooleanQAnswer[];
  baseline_expressions: { id: number; name: string; type: string }[];
  baseline_concepts: { id: number; name: string }[];
  baseline_codes: { id: number; expression: string }[];
  baseline_errors: { id: number; name: string }[];
  booleanq: BaselineBooleanQRow[];
}

export interface TestRisultatiData {
  test: { id: number; name: string };
  questions: { id: number; name: string; number: number | null }[];
  students: {
    id: number;
    name: string;
    final_grade: number | null;
    scores: Record<number, { grade_min: number | null; grade_max: number | null; bonus: number | null; blank: boolean }>;
  }[];
}
