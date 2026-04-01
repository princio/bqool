import { Answer, AnswerBooleanQ } from "./answer";
import { Question } from "./question";
import { BooleanQ } from "./booleanq";
import { Criterion } from "./criterion";
export declare namespace Derived {
    /** Concept enriched with derived evaluation state from AnswerBooleanQs */
    interface AnswerCriterion extends Criterion {
        booleanq: (BooleanQ & {
            answer: AnswerBooleanQ;
        })[];
    }
    interface AnswerCorrection {
        answer: Answer;
        question: Question;
        criteria: AnswerCriterion[];
    }
    interface Rubric {
        question: Question;
        criteria: Criterion[];
    }
}
//# sourceMappingURL=derived.d.ts.map