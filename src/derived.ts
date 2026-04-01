import { Answer, AnswerBooleanQ } from "./answer";
import { Question } from "./question";
import { BooleanQ } from "./booleanq";
import { Criterion } from "./criterion";


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

  export interface Rubric {
    question: Question;
    criteria: Criterion[];
  }
}