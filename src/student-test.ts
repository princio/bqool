import { Answer } from "./answer";
import { GridScore } from "./grid";
import { Student } from "./student";
import { Test } from "./test";

export interface StudentTest {
  id: number;

  student: Student;
  test: Test;

  grid: GridScore | null;

  grade_value: number | null;
  grade_rationale: string | null;

  bonus_value: number | null;
  bonus_rationale: string | null;

  answers: Answer[];
}
