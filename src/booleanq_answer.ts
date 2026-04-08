
/** AI-generated yes/no evaluation of a single boolean question against a student answer. */
export interface BooleanQAnswer {
  id: number;

  /* FK booleanq_id Many-to-One */
  /* FK answer_id Many-to-One */

  rationale: string;
  citations: string[];
  satisfied: boolean;

  reviews: number;
}