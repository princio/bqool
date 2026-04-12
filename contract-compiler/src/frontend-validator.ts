import { Project, SyntaxKind, type CallExpression, type PropertyAssignment } from 'ts-morph'
import * as fs from 'fs'
import { FRONTEND_API } from './paths.js'
import type { ContractEndpoint } from './contract-endpoint.js'
import {
  type ValidationResult,
  resultOk, resultMissing, resultPathMismatch, resultMethodMismatch,
  resultMissingKey, resultSpread,
} from './result.js'
import { normalizePath } from './utils.js'

interface FrontendBinding {
  contractName: string
  httpMethod: string
  path: string
  paramKeys: string[]
  queryKeys: string[]
  hasSpread: boolean
  responseType: string
  line: number
}

const METHOD_MAP: Record<string, string> = {
  get: 'GET', post: 'POST', put: 'PUT', patch: 'PATCH', del: 'DELETE',
}

const CONTRACT_PATTERN = /@contract\s+(\w+)/

export class FrontendValidator {
  private readonly project: Project

  constructor() {
    this.project = new Project({ skipAddingFilesFromTsConfig: true })
  }

  validate(contracts: Map<string, ContractEndpoint>): ValidationResult[] {
    const results: ValidationResult[] = []
    const bindings = this.extractBindings()
    const matchedContracts = new Set<string>()

    for (const binding of bindings) {
      const contract = contracts.get(binding.contractName)
      if (!contract) {
        results.push({ level: 'error', source: 'frontend', contractName: binding.contractName, message: 'unknown contract', kind: 'generic' })
        continue
      }

      matchedContracts.add(binding.contractName)

      if (contract.method && binding.httpMethod !== contract.method) {
        results.push(resultMethodMismatch('frontend', binding.contractName, contract.method, binding.httpMethod))
      }

      if (contract.path && normalizePath(binding.path) !== normalizePath(contract.path)) {
        results.push(resultPathMismatch('frontend', binding.contractName, normalizePath(contract.path), normalizePath(binding.path)))
      }

      if (contract.paramKeys.length > 0 && !binding.hasSpread) {
        for (const key of contract.paramKeys.filter(key => !binding.paramKeys.includes(key))) {
          results.push(resultMissingKey('frontend', binding.contractName, 'param', key, binding.line))
        }
      }

      if (contract.queryKeys.length > 0 && !binding.hasSpread) {
        for (const key of contract.queryKeys.filter(key => !binding.queryKeys.includes(key))) {
          results.push(resultMissingKey('frontend', binding.contractName, 'query', key, binding.line))
        }
      }

      if (binding.hasSpread) {
        results.push(resultSpread('frontend', binding.contractName, binding.line))
      }

      results.push(resultOk('frontend', binding.contractName, `${binding.httpMethod} ${binding.path}`))
    }

    for (const [name, contract] of contracts) {
      if (!matchedContracts.has(name) && contract.method) {
        results.push(resultMissing('frontend', name))
      }
    }

    return results
  }

  private extractBindings(): FrontendBinding[] {
    if (!fs.existsSync(FRONTEND_API)) return []

    const source = this.project.addSourceFileAtPath(FRONTEND_API)
    const bindings: FrontendBinding[] = []

    source.forEachDescendant(node => {
      if (!node.isKind(SyntaxKind.PropertyAssignment)) return

      const propertyAssignment = node.asKindOrThrow(SyntaxKind.PropertyAssignment)
      const line = source.getLineAndColumnAtPos(propertyAssignment.getStart()).line

      let contractName: string | null = null
      for (const comment of propertyAssignment.getLeadingCommentRanges()) {
        const match = comment.getText().match(CONTRACT_PATTERN)
        if (match) contractName = match[1]
      }
      if (!contractName) return

      const callExpression = this.findHttpCall(propertyAssignment)
      if (!callExpression) return

      const functionName = callExpression.getExpression().getText()
      const httpMethod = METHOD_MAP[functionName]
      if (!httpMethod) return

      const args = callExpression.getArguments()
      let apiPath = ''
      if (args.length > 0 && args[0].isKind(SyntaxKind.StringLiteral)) {
        apiPath = args[0].asKindOrThrow(SyntaxKind.StringLiteral).getLiteralValue()
      }

      const { paramKeys, queryKeys, hasSpread } = this.extractOptions(callExpression)

      const typeArgs = callExpression.getTypeArguments()
      const responseType = typeArgs.length > 0 ? typeArgs[0].getText() : ''

      bindings.push({ contractName, httpMethod, path: apiPath, paramKeys, queryKeys, hasSpread, responseType, line })
    })

    return bindings
  }

  private findHttpCall(node: PropertyAssignment): CallExpression | null {
    let result: CallExpression | null = null
    node.forEachDescendant(child => {
      if (result) return
      if (child.isKind(SyntaxKind.CallExpression)) {
        const functionName = child.getExpression().getText()
        if (functionName in METHOD_MAP) {
          result = child
        }
      }
    })
    return result
  }

  private extractOptions(callExpression: CallExpression): {
    paramKeys: string[]
    queryKeys: string[]
    hasSpread: boolean
  } {
    const paramKeys: string[] = []
    const queryKeys: string[] = []
    let hasSpread = false

    for (const argument of callExpression.getArguments()) {
      if (!argument.isKind(SyntaxKind.ObjectLiteralExpression)) continue

      for (const property of argument.asKindOrThrow(SyntaxKind.ObjectLiteralExpression).getProperties()) {
        if (!property.isKind(SyntaxKind.PropertyAssignment)) continue
        const propertyAssignment = property.asKindOrThrow(SyntaxKind.PropertyAssignment)
        const propertyName = propertyAssignment.getName()

        const initializer = propertyAssignment.getInitializer()
        if (!initializer?.isKind(SyntaxKind.ObjectLiteralExpression)) {
          if (initializer) {
            initializer.forEachDescendant(child => {
              if (child.isKind(SyntaxKind.SpreadAssignment)) hasSpread = true
            })
          }
          continue
        }

        const innerObject = initializer.asKindOrThrow(SyntaxKind.ObjectLiteralExpression)

        for (const innerProperty of innerObject.getProperties()) {
          if (innerProperty.isKind(SyntaxKind.SpreadAssignment)) {
            hasSpread = true
          } else if (innerProperty.isKind(SyntaxKind.PropertyAssignment)) {
            const key = innerProperty.asKindOrThrow(SyntaxKind.PropertyAssignment).getName()
            if (propertyName === 'params') paramKeys.push(key)
            else if (propertyName === 'query') queryKeys.push(key)
          } else if (innerProperty.isKind(SyntaxKind.ShorthandPropertyAssignment)) {
            const key = innerProperty.asKindOrThrow(SyntaxKind.ShorthandPropertyAssignment).getName()
            if (propertyName === 'params') paramKeys.push(key)
            else if (propertyName === 'query') queryKeys.push(key)
          }
        }
      }
    }

    return { paramKeys, queryKeys, hasSpread }
  }
}
