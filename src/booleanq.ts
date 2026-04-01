
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
