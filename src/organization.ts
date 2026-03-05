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
