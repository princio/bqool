import { CriterionCategory } from "./criterion";
import { CoherenceLevels } from "./grade";

export type PenmarkCategory = Exclude<CriterionCategory, "concept">;

/** AI-generated yes/no evaluation of a single boolean question against a student answer. */
export interface AnswerBooleanQ {
  id: number;

  /* FK booleanq_id Many-to-One */
  /* FK answer_id Many-to-One */

  rationale: string;
  citations: string[];
  satisfied: boolean;

  reviews: number;
}

/** AI-generated yes/no evaluation of a single boolean question against a student answer. */
export interface AnswerPenmark {
  id: number;

  /* FK answer_id Many-to-One */

  category: PenmarkCategory;

  rationale: string;
  citations: string[];

  severity: number;
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

  verdict: {
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
}