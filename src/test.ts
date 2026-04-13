import { Classroom } from "./classroom";
import { Grid } from "./grid";
import { Question } from "./question";
import { StudentTest } from "./student-test";

/** A test assigned to a classroom, containing one or more questions. */
export interface Test {
  id: number;
  name: string;

  classroom: Classroom;
  grid: Grid;

  /* (reverse) FK One-to-Many */
  questions: Question[];

  /* (reverse) FK One-to-Many */
  student_tests: StudentTest[];
}
