import { GradeParams } from "./grade";

export interface Classroom {
  id: number;
  name: string;
}

export interface Student {
  id: number;
  
  /* FK classroom_id Many-to-One */

  name: string;
}

/** A teacher-authored question within a test. */
export interface Question {
  id: number;

  /* FK test_id Many-to-One */

  position: number;
  name: string;
  text: string;

  expected_answer: string | null;

  grade_params: GradeParams;

  /* criteria (reverse) FK One-to-Many */
  /* answers  (reverse) FK One-to-Many */
}

/** A test assigned to a classroom, containing one or more questions. */
export interface Test {
  id: number;

  /* FK classroom_id Many-to-One */

  name: string;
}

export interface StudentTest {
  id: number;

  /* FK student_id Many-to-One */
  /* FK test_id Many-to-One */

  grade: {
    value: number | null;
    rationale: string | null;
  };
  bonus: {
    value: number | null;
    rationale: string | null;
  };
  /* answers  (reverse) FK One-to-Many */
}
