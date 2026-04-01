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