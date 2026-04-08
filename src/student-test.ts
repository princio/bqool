import { GridScore } from "./grid";

export interface StudentTest {
  id: number;

  /* FK student_id Many-to-One */
  /* FK test_id Many-to-One */

  grid_evaulated: GridScore;

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
