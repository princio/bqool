import { Answer } from "./answer";
import { Question } from "./question";
import { BooleanQ } from "./booleanq";
import { Criterion } from "./criterion";
import { BooleanQAnswer } from "./booleanq_answer";


export namespace Derived {

  /** Concept enriched with derived evaluation state from AnswerBooleanQs */
  export interface AnswerCriterion extends Criterion {
    booleanq: (BooleanQ & { answer: BooleanQAnswer })[];
  }
  
  export interface AnswerCorrected {
    answer: Answer;
    question: Question;
    criteria: AnswerCriterion[];
  }

  export interface Rubric {
    question: Question;
    criteria: Criterion[];
  }
}