import { GradeParams } from "./grade";

/** A teacher-authored question within a test. */
export interface Question {
  id: number;

  /* FK test_id Many-to-One */

  position: number;
  name: string;
  text: string;

  expected_answer: string | null;

  grade_params: GradeParams | null;

  /* criteria (reverse) FK One-to-Many */
  /* answers  (reverse) FK One-to-Many */
}
