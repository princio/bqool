import { Answer } from "./answer";
import { GridScore } from "./grid";
import { Student } from "./student";
import { Test } from "./test";

export interface StudentTest {
  id: number;

  student: Student;
  test: Test;

  grid: GridScore;

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
