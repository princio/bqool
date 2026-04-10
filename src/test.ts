import { Classroom } from "./classroom";
import { Grid } from "./grid";

/** A test assigned to a classroom, containing one or more questions. */
export interface Test {
  id: number;
  name: string;

  classroom: Classroom;
  grid: Grid;
}
