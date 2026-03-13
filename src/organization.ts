export interface SchoolClassSummary {
  id: number;
  name: string;
  students_count: number;
  tests: { id: number; name: string; questions: { id: number; name: string }[] }[];
}

export interface SchoolClassDetail {
  id: number;
  name: string;
  students: StudentSummary[];
  tests: { id: number; name: string; questions_count: number }[];
}

export interface StudentSummary {
  id: number;
  name: string;
}

export interface StudentDetail {
  id: number;
  name: string;
  classroom_id: number;
  classroom_name: string;
}

export interface QuestionRow {
  id: number;
  name: string;
  text: string | null;
  expected_answer: string | null;
  booleanqs_total?: number;
}

export interface NavAnswerSummary {
  id: number;
  grade: number | null;
  workdir: string;
}

export interface SiblingScore {
  grade: number | null;
  coherence_level: number;
  concepts_present: number;
  concepts_total: number;
  completeness_sum: number;
  completeness_max: number;
  expressions_pos: number;
  expressions_neg: number;
  code_correct: number;
  code_error: number;
  errors_count: number;
}

export interface NavData {
  student: StudentSummary;
  question: QuestionRow;
  siblings: (StudentSummary & { score: SiblingScore | null })[];
  answer: NavAnswerSummary | null;
  test: {
    id: number;
    name: string;
    current_index: number;
    questions: {
      id: number;
      name: string;
      number: number | null;
      has_answer: boolean;
      answer_summary: { grade: number | null } | null;
    }[];
  } | null;
}

export interface AnswerData {
  text: string | null;
  isblank: boolean;
  student: StudentDetail;
  question: QuestionRow;
  siblings: StudentSummary[];
}

// ── API response types ──────────────────────────────────────────────

export interface OkResponse { ok: boolean }
export interface OkIdResponse { ok: boolean; id: number }

export interface QuestionListItem {
  id: number;
  name: string;
  text: string;
  expected_answer: string;
  tests: { id: number; name: string; classroom_name: string; question_id: number }[];
  concepts_count: number;
  nr_concepts_count: number;
  graded_count: number;
  blank_count: number;
  not_typed_count: number;
  todo_count: number;
}

export interface QuestionDetailStudent {
  id: number;
  name: string;
  classroom_id: number;
  classroom: string;
  has_answer: boolean;
  isblank: boolean;
  word_count: number;
  question_id: number | null;
  answer_id: number | null;
  grade: number | null;
  coherence_level: number | null;
  concepts_total: number | null;
  concepts_present: number | null;
  expressions_pos: number | null;
  expressions_neg: number | null;
  errors_count: number | null;
  concepts_completeness_sum: number | null;
  nr_concepts_present: number | null;
  nr_concepts_completeness_sum: number | null;
  codes_correct: number | null;
  codes_wrong: number | null;
  review_count: number;
  grade_bonus: number | null;
  protected: number | null;
  has_output: boolean;
  suggestions_count: number | null;
}

export interface QuestionDetail {
  tests: { id: number; name: string; classroom_id: number; classroom_name: string; question_id: number }[];
  test: { id: number; name: string } | null;
  classroom: { id: number; name: string } | null;
  question: QuestionRow;
  students: QuestionDetailStudent[];
  answers: Record<string, string>;
  answer_count: number;
}

export interface TestDetail {
  test: { id: number; name: string };
  classroom: { id: number; name: string };
  questions: {
    id: number; name: string; number: number | null; text: string; expected_answer: string;
    rubric_count: number; nr_rubric_count: number; expression_count: number; code_count: number; error_count: number;
  }[];
  students: StudentSummary[];
}

export interface StudentTestData {
  test: { id: number; name: string };
  classroom: { id: number; name: string };
  student: StudentSummary;
  questions: { question_id: number; question_name: string; score: null }[];
  media: null;
  fascia: null;
}

export interface StudentTestsData {
  student: StudentSummary;
  classroom: { id: number; name: string };
  tests: {
    id: number;
    name: string;
    questions: {
      id: number;
      name: string;
      score: null;
      word_count: number;
      isblank: boolean;
      has_answer: boolean;
    }[];
    media: number | null;
    fascia: null;
  }[];
}

export interface StudentTestAnswersData {
  test: { id: number; name: string; classroom_name: string; classroom_id: number };
  student: StudentSummary;
  final_grade: number | null;
  answers: {
    question_id: number;
    question_name: string;
    question_text: string;
    question_number: number | null;
    answer: import('./answer').AnswerDetail | null;
  }[];
}
