import { GradeParams } from "./grade";
/** A teacher-authored question within a test. */
export interface Question {
    id: number;
    position: number;
    name: string;
    text: string;
    expected_answer: string | null;
    grade_params: GradeParams | null;
}
//# sourceMappingURL=question.d.ts.map