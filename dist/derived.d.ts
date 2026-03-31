import { Answer, AnswerBooleanQ } from "./answer";
import { Question } from "./others";
import { BooleanQ, Criterion } from "./rubric";
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
}
//# sourceMappingURL=derived.d.ts.map