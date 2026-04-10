import { Answer } from "./answer";
import { Question } from "./question";
import { BooleanQ } from "./booleanq";
import { Criterion } from "./criterion";
import { BooleanQAnswer } from "./booleanq_answer";


export namespace Derived {

  export interface Correction {
    answer: Answer;
    question: Question;
    criteria: {
      criterion: Criterion;
      booleanq_answers: BooleanQAnswer[]
    }[];
  }

  export interface Rubric {
    question: Question;
    criteria: Criterion[];
  }
}