import { Classroom } from "./classroom";

export interface Student {
  id: number;

  classroom: Classroom;

  name: string;
}
