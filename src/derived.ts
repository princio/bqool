import { Answer as _Answer } from "./answer";
import { Question } from "./question";
import { Criterion as _Criterion } from "./criterion";
import { BooleanQAnswer } from "./booleanq_answer";
import { BooleanQ } from "./booleanq";
import { Penmark } from "./penmark";


export namespace Correction {

  export interface Criterion extends Omit<_Criterion, 'booleanqs'> {
    booleanqs: {
      question: BooleanQ;
      answer: BooleanQAnswer;
    }[]
  }

  export interface Answer {
    answer: _Answer;
    question: Omit<Question, 'criteria'>;
    criteria: Correction.Criterion[];
    penmarks: Penmark[];
  }
}