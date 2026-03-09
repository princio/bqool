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

// Spawn types (claude_session.spawn_type)
export const SPAWN_TYPE_MONOLITHIC = 'monolithic' as const;
export const SPAWN_TYPE_RECHECK    = 'recheck'    as const;
export const SPAWN_TYPE_POPULATION = 'population' as const;
export const SPAWN_TYPE_BOOLEANQ   = 'booleanq'   as const;
export const SPAWN_TYPE_ITEM       = 'item'        as const;
export const SPAWN_TYPE_TYPE_BATCH = 'type-batch'  as const;
