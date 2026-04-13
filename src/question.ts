import { Answer } from "./answer";
import { Criterion } from "./criterion";
import { GradeParams } from "./grade";
import { Test } from "./test";

/** A teacher-authored question within a test. */
export interface Question {
  id: number;

  test: Test;

  position: number | null;
  name: string;
  text: string;

  expected_answer: string | null;

  grade_params: GradeParams | null;

  criteria: Criterion[];
  answers: Answer[];
}
