import { Answer } from "./answer";
import { GradeParams } from "./grade";
import { Criterion } from "./rubric";
export interface Classroom {
    id: number;
    name: string;
    students: Student[];
}
export interface Student {
    id: number;
    classroom: Classroom;
    name: string;
}
/** A teacher-authored question within a test. */
export interface Question {
    id: number;
    test: Test;
    position: number;
    name: string;
    text: string;
    expected_answer: string | null;
    grade_params: GradeParams;
    criteria: Criterion[];
    answers: Answer[];
}
/** A test assigned to a classroom, containing one or more questions. */
export interface Test {
    id: number;
    classroom: Classroom;
    name: string;
    questions: Question[];
}
export interface StudentTest {
    id: number;
    student: Student;
    test: Test;
    grade: {
        value: number | null;
        rationale: string | null;
    };
    bonus: {
        value: number | null;
        rationale: string | null;
    };
    answers: Answer[];
}
//# sourceMappingURL=others.d.ts.map