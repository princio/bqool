import { BooleanQ, CriterionCategory } from "./rubric";
import { Question, Student } from "./others";
import { CoherenceLevels } from "./grade";
export type PenmarkCategory = Exclude<CriterionCategory, "concept">;
/** AI-generated yes/no evaluation of a single boolean question against a student answer. */
export interface AnswerBooleanQ {
    id: number;
    booleanq: BooleanQ;
    answer: Answer;
    rationale: string;
    citations: string[];
    satisfied: boolean;
    reviews: number;
}
/** AI-generated yes/no evaluation of a single boolean question against a student answer. */
export interface AnswerPenmark {
    id: number;
    answer: Answer;
    category: PenmarkCategory;
    rationale: string;
    citations: string[];
    severity: number;
}
/** A student's free-text response to a question. */
export interface Answer {
    id: number;
    student: Student;
    question: Question;
    created_at: string;
    updated_at: string | null;
    is_locked: boolean;
    text: string;
    is_blank: boolean;
    verdict: {
        coherence: {
            level: CoherenceLevels | null;
            rationale: string | null;
        };
        grade: {
            value: number | null;
            bonus: number | null;
            rationale: string | null;
        };
    };
}
//# sourceMappingURL=answer.d.ts.map