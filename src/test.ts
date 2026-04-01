
/** A test assigned to a classroom, containing one or more questions. */
export interface Test {
  id: number;

  /* FK grid_id Many-to-One */

  name: string;

}
