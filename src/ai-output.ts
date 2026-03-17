/** AI correction output for a single BooleanQ evaluation */
export interface AiBooleanQResult {
  id: number;
  answer: boolean;
  citations: string[];
  rationale: string;
}

/** AI correction output for item-level evaluation (multi-question) */
export interface AiItemCorrectionOutput {
  'booleanq-questions': AiBooleanQResult[];
}

/** AI coherence evaluation output */
export interface AiCoherenceOutput {
  level: number;
  rationale: string;
}
