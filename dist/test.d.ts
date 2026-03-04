import { Classroom } from "./classroom";
import { Question } from "./question";
import { Student } from "./student";
/** A test assigned to a classroom, containing one or more questions. */
export interface Test {
    id: number;
    name: string;
    classroom: Classroom;
    questions: Question[];
}
export interface StudentTest {
    student: Student;
    test: Test;
    grade: {
        value: number;
        rationale: string;
    };
    bonus: {
        value: number;
        rationale: string;
    };
}
//# sourceMappingURL=test.d.ts.map