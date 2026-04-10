import { BooleanQ } from "./booleanq";
import { Question } from "./question";

/** Criterion categories: key concept, language expression quality, or code correctness. */
export type CriterionCategory = 'concept' | 'expression' | 'code' | 'error';

/** A single rubric entry used to evaluate a student answer. */
export interface Criterion {
  id: number;

  question: Question;

  name: string;
  definition: string;
  category: CriterionCategory;

  position: number;
  required: boolean;

  severity: number;

  booleanqs: BooleanQ;
}