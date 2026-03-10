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
  school_class_id: number;
  school_class_name: string;
}

export interface QuestionRow {
  id: number;
  name: string;
  text: string | null;
  expected_answer: string | null;
  booleanqs_total?: number;
}

export interface NavAttemptSummary {
  id: number;
  grade_min: number | null;
  grade_max: number | null;
  open_count: number;
  edit_count: number;
  last_edit: string | null;
  workdir: string;
}

export interface SiblingScore {
  grade_min: number | null;
  grade_max: number | null;
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
  attempt: NavAttemptSummary | null;
  test: {
    id: number;
    name: string;
    current_index: number;
    questions: {
      id: number;
      name: string;
      number: number | null;
      has_answer: boolean;
      attempt_summary: { grade_min: number | null; grade_max: number | null } | null;
    }[];
  } | null;
}

export interface AnswerData {
  text: string | null;
  blank: boolean;
  student: StudentDetail;
  question: QuestionRow;
  siblings: StudentSummary[];
}

// ── API response types ──────────────────────────────────────────────

export interface OkResponse { ok: boolean }
export interface OkIdResponse { ok: boolean; id: number }

export interface QuestionDetail {
  tests: { id: number; name: string; school_class_id: number; school_class_name: string }[];
  test: { id: number; name: string } | null;
  school_class: { id: number; name: string } | null;
  question: QuestionRow;
  students: {
    id: number;
    name: string;
    school_class_id: number;
    school_class_name: string;
    has_answer: boolean;
    attempt_id: number | null;
    grade: number | null;
  }[];
  answers: Record<string, string>;
  attempt_count: number;
}

export interface TestDetail {
  test: { id: number; name: string };
  school_class: { id: number; name: string };
  questions: { id: number; name: string; number: number | null; text: string; expected_answer: string }[];
  students: StudentSummary[];
}

export interface StudentTestData {
  test: { id: number; name: string };
  school_class: { id: number; name: string };
  student: StudentSummary;
  questions: { question_id: number; question_name: string; score: null }[];
  media: null;
  fascia: null;
}

export interface StudentTestsData {
  student: StudentSummary;
  school_class: { id: number; name: string };
  tests: {
    id: number;
    name: string;
    questions: {
      id: number;
      name: string;
      score: null;
      word_count: number;
      blank: boolean;
      has_answer: boolean;
    }[];
    media: number | null;
    fascia: null;
  }[];
}

export interface StudentTestAttemptsData {
  test: { id: number; name: string; school_class_name: string; school_class_id: number };
  student: StudentSummary;
  final_grade: number | null;
  attempts: {
    question_id: number;
    question_name: string;
    question_text: string;
    question_number: number | null;
    attempt: import('./attempt').AttemptDetail | null;
  }[];
}
