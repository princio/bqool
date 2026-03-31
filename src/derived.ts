import { Answer, AnswerBooleanQ } from "./answer";
import { Question } from "./others";
import { BooleanQ, Criterion } from "./rubric";


export namespace Derived {

  /** Concept enriched with derived evaluation state from AnswerBooleanQs */
  export interface AnswerCriterion extends Criterion {
    booleanq: (BooleanQ & { answer: AnswerBooleanQ })[];
  }
  
  export interface AnswerCorrection {
    answer: Answer;
    question: Question;
    criteria: AnswerCriterion[];
  }
}