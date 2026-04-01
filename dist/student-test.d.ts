import { GridEvaluated } from "./grid";
export interface StudentTest {
    id: number;
    grid_evaulated: GridEvaluated;
    grade: {
        value: number | null;
        rationale: string | null;
    };
    bonus: {
        value: number | null;
        rationale: string | null;
    };
}
//# sourceMappingURL=student-test.d.ts.map