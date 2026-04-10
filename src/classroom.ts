import { Student } from "./student";

export interface Classroom {
  id: number;
  name: string;

  students: Student[];
}
