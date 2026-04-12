export type ResultLevel = 'ok' | 'warning' | 'error' | 'missing'
export type ResultKind = 'path-mismatch' | 'method-mismatch' | 'missing-key' | 'spread' | 'missing-body' | 'generic'
export type ResultSource = 'backend' | 'frontend'

export interface ValidationResult {
  level: ResultLevel
  source: ResultSource
  contractName: string
  message: string
  kind: ResultKind
  expected?: string
  actual?: string
  keyType?: string
  keyName?: string
  line?: number
}

export function resultOk(source: ResultSource, contractName: string, message: string): ValidationResult {
  return { level: 'ok', source, contractName, message, kind: 'generic' }
}

export function resultMissing(source: ResultSource, contractName: string): ValidationResult {
  return { level: 'missing', source, contractName, message: '', kind: 'generic' }
}

export function resultPathMismatch(source: ResultSource, contractName: string, expected: string, actual: string): ValidationResult {
  return { level: 'error', source, contractName, message: '', kind: 'path-mismatch', expected, actual }
}

export function resultMethodMismatch(source: ResultSource, contractName: string, expected: string, actual: string): ValidationResult {
  return { level: 'error', source, contractName, message: '', kind: 'method-mismatch', expected, actual }
}

export function resultMissingKey(source: ResultSource, contractName: string, keyType: string, keyName: string, line: number): ValidationResult {
  return { level: 'warning', source, contractName, message: '', kind: 'missing-key', keyType, keyName, line }
}

export function resultSpread(source: ResultSource, contractName: string, line: number): ValidationResult {
  return { level: 'warning', source, contractName, message: '', kind: 'spread', line }
}

export function resultMissingBody(source: ResultSource, contractName: string): ValidationResult {
  return { level: 'warning', source, contractName, message: '', kind: 'missing-body' }
}
