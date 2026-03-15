export const EXPRESSION_POSITIVE = 'positive';
export const EXPRESSION_NEGATIVE = 'negative';

export const CODE_CORRECT = 'correct';
export const CODE_WRONG = 'wrong';
export const CODE_PARTIAL = 'partial';

// Rubrica & Baseline item types
export const RB_ITEM_TYPE_CONCEPT    = 'concept'    as const;
export const RB_ITEM_TYPE_EXPRESSION = 'expression' as const;
export const RB_ITEM_TYPE_CODE       = 'code'       as const;
export const RB_ITEM_TYPE_ERROR      = 'error'      as const;
export type  RbItemType = typeof RB_ITEM_TYPE_CONCEPT | typeof RB_ITEM_TYPE_EXPRESSION
                        | typeof RB_ITEM_TYPE_CODE    | typeof RB_ITEM_TYPE_ERROR;

export const RUBRIC_ITEM_TYPES = [
  { type: RB_ITEM_TYPE_CONCEPT,    prefix: 'C', dataKey: 'concepts',    hasSeverity: false, defaultSeverity: 0,  showSeverityInPrompt: false },
  { type: RB_ITEM_TYPE_EXPRESSION, prefix: 'V', dataKey: 'expressions', hasSeverity: true,  defaultSeverity: 0,  showSeverityInPrompt: true  },
  { type: RB_ITEM_TYPE_CODE,       prefix: 'K', dataKey: 'code',        hasSeverity: true,  defaultSeverity: 0,  showSeverityInPrompt: true  },
  { type: RB_ITEM_TYPE_ERROR,      prefix: 'E', dataKey: 'errors',      hasSeverity: true,  defaultSeverity: -2, showSeverityInPrompt: false },
] as const;
export type RubricItemTypeDescriptor = (typeof RUBRIC_ITEM_TYPES)[number];

// Spawn types (claude_session.spawn_type)
export const SPAWN_TYPE_MONOLITHIC  = 'monolithic'  as const;
export const SPAWN_TYPE_RECHECK     = 'recheck'     as const;
export const SPAWN_TYPE_RB_SEEKER   = 'rb-seeker'   as const;
export const SPAWN_TYPE_TYPE_BATCH  = 'type-batch'  as const;
// Correction spawn types
export const SPAWN_TYPE_CORRECTION_ITEM      = 'correction-item'      as const;
export const SPAWN_TYPE_CORRECTION_BOOLEANQ  = 'correction-booleanq'  as const;
export const SPAWN_TYPE_CORRECTION_COHERENCE = 'correction-coherence' as const;
export const SPAWN_TYPE_PENMARK_CORRECTION   = 'penmark-correction'   as const;
export const SPAWN_TYPE_PENMARK_ITEM_FORK    = 'penmark-item-fork'    as const;
/** @deprecated Use SPAWN_TYPE_CORRECTION_ITEM */
export const SPAWN_TYPE_RB_ITEM     = SPAWN_TYPE_CORRECTION_ITEM;
/** @deprecated Use SPAWN_TYPE_CORRECTION_BOOLEANQ */
export const SPAWN_TYPE_RB_BOOLEANQ = SPAWN_TYPE_CORRECTION_BOOLEANQ;
export type SpawnType = typeof SPAWN_TYPE_MONOLITHIC | typeof SPAWN_TYPE_RECHECK
                      | typeof SPAWN_TYPE_RB_SEEKER
                      | typeof SPAWN_TYPE_CORRECTION_ITEM | typeof SPAWN_TYPE_CORRECTION_BOOLEANQ
                      | typeof SPAWN_TYPE_CORRECTION_COHERENCE
                      | typeof SPAWN_TYPE_TYPE_BATCH
                      | typeof SPAWN_TYPE_PENMARK_CORRECTION | typeof SPAWN_TYPE_PENMARK_ITEM_FORK;
