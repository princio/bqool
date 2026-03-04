import { Question } from "./others";

/** Criterion categories: key concept, language expression quality, or code correctness. */
export type CriterionCategory = 'concept' | 'expression' | 'code';

/** A single rubric entry used to evaluate a student answer. */
export interface Criterion {
  id: number;

  question: Question; /* FK Many-to-One */

  name: string;
  definition: string;
  category: CriterionCategory;

  position: number;
  required: boolean;

  booleanqs: BooleanQ[]; /* (reverse) FK One-to-Many */
}

/**
 * A yes/no question derived from a rubric entry, used by AI to evaluate a student answer.
 *
 * severity > 0: satisfied → correct,   unsatisfied → error (positive trait missing)
 * severity < 0: satisfied → error, unsatisfied → neutral (error absent)
 */
export interface BooleanQ {
  id: number;

  criterion: Criterion; /* FK Many-to-One */

  text: string;

  severity: number;
}
