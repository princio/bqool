// School class
export interface CreateSchoolClassRequest { name: string }
export interface AddStudentRequest { name: string }

// Question
export interface CreateQuestionRequest { name: string; text?: string; expected_answer?: string; test_id?: number }
export interface UpdateQuestionRequest { name?: string; text?: string; expected_answer?: string }
export interface UpdateAnswerRequest { text?: string; blank?: boolean }

// Test
export interface CreateTestRequest { class_id: number; name: string }
export interface UpdateTestRequest { name: string }
export interface AddQuestionToTestRequest { root_question_id: number; copy_baseline?: boolean }
export interface UpdateQuestionNumberRequest { number: number | null }

// Rubric concept
export interface CreateRubricConceptRequest { name: string; definition: string }

// BooleanQ
export interface CreateBooleanQRequest { item_type: string; item_id: number; text: string; italian_text?: string }
export interface UpdateBooleanQRequest { text?: string; italian_text?: string }

// Expression
export interface CreateExpressionRequest { name: string; type: string }

// Code
export interface CreateCodeRequest { expression: string; type: string }

// Error
export interface CreateErrorRequest { name: string; description: string }

// Answer grade
export interface SetGradeRequest { grade: number }
export interface SetBonusRequest { bonus: number | null }

// BooleanQ answer
export interface UpsertBooleanQAnswerRequest { answer?: boolean; citation?: string; rationale?: string }
