
/**
 * A yes/no question derived from a rubric entry, could be used by AI to evaluate a student answer.
 *
 */
export interface BooleanQ {
  id: number;

  /* FK criterion_id Many-to-One */

  text: string;
}
