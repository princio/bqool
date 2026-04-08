import { CriterionCategory } from "./criterion";
import { CoherenceLevels } from "./grade";


export interface Verdict {
    coherence: {
      level: CoherenceLevels | null;
      rationale: string | null;
    }
    grade: {
      value: number | null;
      bonus: number | null;
      rationale: string | null;
    }
}

/** A student's free-text response to a question. */
export interface Answer {
  id: number;

  /* FK student_id Many-to-One */
  /* FK question_id Many-to-One */

  created_at: string;
  updated_at: string | null;
  is_locked: boolean;

  text: string;
  is_blank: boolean;

  verdict: Verdict;
}
