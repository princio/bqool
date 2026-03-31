/** Criterion categories: key concept, language expression quality, or code correctness. */
export type CriterionCategory = 'concept' | 'expression' | 'code' | 'error';

/** A single rubric entry used to evaluate a student answer. */
export interface Criterion {
  id: number;

  /* FK question_id Many-to-One */

  name: string;
  definition: string;
  category: CriterionCategory;

  position: number;
  required: boolean;
  /* booleanqs (reverse) FK One-to-Many */
}

/**
 * A yes/no question derived from a rubric entry, used by AI to evaluate a student answer.
 *
 * severity > 0: satisfied → correct,   unsatisfied → error (positive trait missing)
 * severity < 0: satisfied → error, unsatisfied → neutral (error absent)
 */
export interface BooleanQ {
  id: number;

  /* FK criterion_id Many-to-One */

  text: string;

  severity: number;
}
