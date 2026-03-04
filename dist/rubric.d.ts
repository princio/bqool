import { Question } from "./others";
/** Criterion categories: key concept, language expression quality, or code correctness. */
export type CriterionCategory = 'concept' | 'expression' | 'code';
/** A single rubric entry used to evaluate a student answer. */
export interface Criterion {
    id: number;
    question: Question;
    name: string;
    definition: string;
    category: CriterionCategory;
    position: number;
    required: boolean;
    booleanqs: BooleanQ[];
}
/**
 * A yes/no question derived from a rubric entry, used by AI to evaluate a student answer.
 *
 * severity > 0: satisfied → correct,   unsatisfied → error (positive trait missing)
 * severity < 0: satisfied → error, unsatisfied → neutral (error absent)
 */
export interface BooleanQ {
    id: number;
    criterion: Criterion;
    text: string;
    severity: number;
}
//# sourceMappingURL=rubric.d.ts.map