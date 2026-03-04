import { Answer } from "./answer";
import { RubricEntry } from "./rubric";
/** A teacher-authored question within a test. */
export interface Question {
    id: number;
    name: string;
    text: string | null;
    expected_answer: string | null;
    rubric: RubricEntry[];
    answers: Answer[];
}
//# sourceMappingURL=question.d.ts.map