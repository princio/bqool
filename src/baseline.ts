export interface RubricConceptRow {
  id: number;
  question_id: number;
  name: string;
  definition: string;
  position: number;
}

export interface BaselineExpressionRow {
  id: number;
  question_id: number;
  name: string;
  type: string;
}

export interface BaselineCodeRow {
  id: number;
  question_id: number;
  expression: string;
  type: string;
  correct_form: string;
}

export interface BaselineErrorRow {
  id: number;
  question_id: number;
  name: string;
  description: string;
}

export interface BaselineBooleanQRow {
  id: number;
  item_type: string;
  item_id: number;
  text: string;
  italian_text: string;
}

export interface BaselineItemWithBooleanQs {
  booleanqs: BaselineBooleanQRow[];
}
