import { CriterionCategory } from "./rubric";
import { CoherenceLevels } from "./grade";
export type PenmarkCategory = Exclude<CriterionCategory, "concept">;
/** AI-generated yes/no evaluation of a single boolean question against a student answer. */
export interface AnswerBooleanQ {
    id: number;
    rationale: string;
    citations: string[];
    satisfied: boolean;
    reviews: number;
}
/** AI-generated yes/no evaluation of a single boolean question against a student answer. */
export interface AnswerPenmark {
    id: number;
    category: PenmarkCategory;
    rationale: string;
    citations: string[];
    severity: number;
}
/** A student's free-text response to a question. */
export interface Answer {
    id: number;
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