import { CriterionCategory } from "./criterion";
import { CoherenceLevels, FormatLevels } from "./grade";
import { Question } from "./question";
import { Student } from "./student";


/** A student's free-text response to a question. */
export interface Answer {
  id: number;

  student: Student;
  question: Question;

  created_at: string;
  updated_at: string | null;

  is_locked: boolean;
  is_blank: boolean;

  text: string;

  format: {
    level: FormatLevels | null;
    rationale: string | null;
  }
  coherence: {
    level: CoherenceLevels | null;
    rationale: string | null;
  }
  grade: {
    value: number | null;
    rationale: string | null;
  }
}
