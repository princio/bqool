import chalk from 'chalk'
import type { ContractEndpoint } from './contract-endpoint.js'
import type { ValidationResult } from './result.js'

const METHOD_COLORS: Record<string, (text: string) => string> = {
  GET: chalk.green,
  POST: chalk.yellow,
  PUT: chalk.blue,
  PATCH: chalk.cyan,
  DELETE: chalk.red,
}

function colorMethod(method: string): string {
  return (METHOD_COLORS[method] ?? chalk.white)(method.padEnd(7))
}

function header(title: string): void {
  const line = chalk.dim('─'.repeat(62))
  console.log()
  console.log(`  ${line}`)
  console.log(`  ${chalk.bold(title)}`)
  console.log(`  ${line}`)
  console.log()
}

function counters(ok: number, errors: number, warnings: number, missing: number): string {
  const parts: string[] = []
  parts.push(chalk.green(`${ok} ok`))
  if (errors > 0) parts.push(chalk.red(`${errors} errors`))
  if (warnings > 0) parts.push(chalk.yellow(`${warnings} warnings`))
  if (missing > 0) parts.push(chalk.dim(`${missing} missing`))
  return parts.join(chalk.dim('  |  '))
}

function printResult(icon: string, result: ValidationResult): void {
  const name = chalk.bold(result.contractName)

  switch (result.kind) {
    case 'path-mismatch':
      console.log(`  ${icon} ${name}  ${chalk.dim('path')}  ${chalk.red(result.expected)}  ${chalk.dim('→')}  ${chalk.yellow(result.actual)}`)
      break
    case 'method-mismatch':
      console.log(`  ${icon} ${name}  ${chalk.dim('method')}  ${chalk.red(result.expected)}  ${chalk.dim('→')}  ${chalk.yellow(result.actual)}`)
      break
    case 'missing-key':
      console.log(`  ${icon} ${name}  ${chalk.dim('missing')} ${chalk.yellow(result.keyType)} ${chalk.dim('key')} ${chalk.bold(result.keyName)}  ${chalk.dim(`line ${result.line}`)}`)
      break
    case 'spread':
      console.log(`  ${icon} ${name}  ${chalk.dim('has spread — keys not statically checkable')}  ${chalk.dim(`line ${result.line}`)}`)
      break
    case 'missing-body':
      console.log(`  ${icon} ${name}  ${chalk.dim('contract has Body but controller has no body param')}`)
      break
    default:
      console.log(`  ${icon} ${name}  ${result.message}`)
  }
}

function printSection(label: string, results: ValidationResult[]): number {
  const errors = results.filter(result => result.level === 'error')
  const warnings = results.filter(result => result.level === 'warning')
  const missing = results.filter(result => result.level === 'missing')
  const ok = results.filter(result => result.level === 'ok')

  if (errors.length > 0) {
    for (const result of errors) {
      printResult(chalk.red('✗'), result)
    }
    console.log()
  }

  if (warnings.length > 0) {
    for (const result of warnings) {
      printResult(chalk.yellow('⚠'), result)
    }
    console.log()
  }

  if (missing.length > 0) {
    console.log(`  ${chalk.dim('Not implemented:')} ${missing.map(r => chalk.dim(r.contractName)).join(chalk.dim(', '))}`)
    console.log()
  }

  console.log(`  ${chalk.dim(label + ':')} ${counters(ok.length, errors.length, warnings.length, missing.length)}`)

  return errors.length
}

export function printReport(
  contracts: Map<string, ContractEndpoint>,
  backendResults: ValidationResult[],
  frontendResults: ValidationResult[],
): number {
  header('CONTRACTS')

  const byFile = new Map<string, ContractEndpoint[]>()
  for (const endpoint of contracts.values()) {
    const list = byFile.get(endpoint.file) ?? []
    list.push(endpoint)
    byFile.set(endpoint.file, list)
  }

  for (const [file, endpoints] of byFile) {
    console.log(`  ${chalk.bold.white(file)} ${chalk.dim(`(${endpoints.length})`)}`)
    for (const endpoint of endpoints) {
      const method = colorMethod(endpoint.method ?? '???')
      const name = chalk.white(endpoint.name)
      const warn = (!endpoint.method || !endpoint.path) ? chalk.red(' [MISSING route]') : ''
      console.log(`    ${method} ${(endpoint.path ?? '???').padEnd(42)} ${name}${warn}`)
    }
    console.log()
  }
  console.log(`  ${chalk.dim('Total:')} ${chalk.bold(String(contracts.size))} endpoints`)

  header('BACKEND')
  const backendErrors = printSection('Backend', backendResults)

  header('FRONTEND')
  const frontendErrors = printSection('Frontend', frontendResults)

  const totalErrors = backendErrors + frontendErrors
  const allResults = [...backendResults, ...frontendResults]
  const totalOk = allResults.filter(r => r.level === 'ok').length
  const totalWarnings = allResults.filter(r => r.level === 'warning').length
  const totalMissing = allResults.filter(r => r.level === 'missing').length

  header('RESULT')
  if (totalErrors === 0) {
    console.log(`  ${chalk.bgGreen.black.bold(' PASS ')}  ${counters(totalOk, totalErrors, totalWarnings, totalMissing)}`)
  } else {
    console.log(`  ${chalk.bgRed.white.bold(' FAIL ')}  ${counters(totalOk, totalErrors, totalWarnings, totalMissing)}`)
  }
  console.log()

  return totalErrors > 0 ? 1 : 0
}
