import { Criterion } from "./criterion";

/**
 * A yes/no question derived from a rubric entry, could be used by AI to evaluate a student answer.
 *
 */
export interface BooleanQ {
  id: number;

  criterion: Criterion;

  text: string;
}
