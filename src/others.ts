import { Answer } from "./answer";
import { GradeParams } from "./grade";
import { Criterion } from "./rubric";

export interface Classroom {
  id: number;
  name: string;

  students: Student[]; /* (reverse) FK One-to-Many */
}

export interface Student {
  id: number;
  classroom: Classroom;  /* FK Many-to-One */
  name: string;
}

/** A teacher-authored question within a test. */
export interface Question {
  id: number;
  
  test: Test; /* FK Many-to-One */

  position: number;
  name: string;
  text: string;

  expected_answer: string | null;

  grade_params: GradeParams;

  criteria: Criterion[]; /* (reverse) FK One-to-Many */
  answers: Answer[]; /* (reverse) FK One-to-Many */
}

/** A test assigned to a classroom, containing one or more questions. */
export interface Test {
  id: number;
  
  classroom: Classroom; /* FK Many-to-One */
  
  name: string;

  questions: Question[]; /* (reverse) FK One-to-Many */
}

export interface StudentTest {
  id: number;
  
  student: Student; /* FK Many-to-One */
  test: Test;       /* FK Many-to-One */

  grade: {
    value: number | null;
    rationale: string | null;
  };
  bonus: {
    value: number | null;
    rationale: string | null;
  };

  answers: Answer[]; /* (reverse) FK One-to-Many */
}
