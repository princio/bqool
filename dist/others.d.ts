import { GradeParams } from "./grade";
export interface Classroom {
    id: number;
    name: string;
}
export interface Student {
    id: number;
    name: string;
}
/** A teacher-authored question within a test. */
export interface Question {
    id: number;
    position: number;
    name: string;
    text: string;
    expected_answer: string | null;
    grade_params: GradeParams | null;
}
/** A test assigned to a classroom, containing one or more questions. */
export interface Test {
    id: number;
    name: string;
}
export interface StudentTest {
    id: number;
    grade: {
        value: number | null;
        rationale: string | null;
    };
    bonus: {
        value: number | null;
        rationale: string | null;
    };
}
//# sourceMappingURL=others.d.ts.map