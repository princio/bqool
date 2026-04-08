import { CriterionCategory } from "./criterion";

export type PenmarkCategory = Exclude<CriterionCategory, "concept">;

/** AI-generated yes/no evaluation of a single boolean question against a student answer. */
export interface Penmark {
  id: number;

  /* FK answer_id Many-to-One */

  category: PenmarkCategory;

  rationale: string;
  citations: string[];

  severity: number;
}