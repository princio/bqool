/** A single level row within an indicator's evaluation table. */
export interface GridLevel {
    rationale: string;
    level: number;
}
/** An evaluation indicator with competencies and scoring levels. */
export interface GridIndicator {
    name: string;
    descriptors: string[];
    levels: GridLevel[];
    weight: number | null;
}
/** The full evaluation grid: a collection of indicators. */
export interface Grid {
    id: number;
    indicators: GridIndicator[];
}
export interface GridEvaluated {
    weights: number[] | null;
    levels: number[];
}
//# sourceMappingURL=grid.d.ts.map