import { Answer } from "./answer";
import { BooleanQ } from "./booleanq";

/** AI-generated yes/no evaluation of a single boolean question against a student answer. */
export interface BooleanQAnswer {
  id: number;

  answer: Answer;
  booleanq: BooleanQ;

  rationale: string;
  citations: string[];

  is_satisfied: boolean;

  reviews: number;
}