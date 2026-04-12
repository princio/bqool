import { Project, SyntaxKind, type SourceFile } from 'ts-morph'
import * as path from 'path'
import * as fs from 'fs'
import { BACKEND_MODULES } from './paths.js'
import type { ContractEndpoint } from './contract-endpoint.js'
import {
  type ValidationResult,
  resultOk, resultMissing, resultPathMismatch, resultMethodMismatch, resultMissingBody,
} from './result.js'
import { normalizePath } from './utils.js'

interface BackendRoute {
  contractName: string
  httpMethod: string
  fullPath: string
  hasBody: boolean
  returnType: string
  file: string
  line: number
}

const METHOD_DECORATORS: Record<string, string> = {
  Get: 'GET', Post: 'POST', Put: 'PUT', Patch: 'PATCH', Delete: 'DELETE',
}

const CONTRACT_PATTERN = /@contract\s+(\w+)/

export class BackendValidator {
  private readonly project: Project

  constructor() {
    this.project = new Project({ skipAddingFilesFromTsConfig: true })
  }

  validate(contracts: Map<string, ContractEndpoint>): ValidationResult[] {
    const results: ValidationResult[] = []
    const routes = this.extractRoutes(contracts)
    const matchedContracts = new Set<string>()

    for (const route of routes) {
      const contract = contracts.get(route.contractName)
      if (!contract) {
        results.push({ level: 'error', source: 'backend', contractName: route.contractName, message: 'unknown contract', kind: 'generic' })
        continue
      }

      matchedContracts.add(route.contractName)

      if (contract.method && route.httpMethod !== contract.method) {
        results.push(resultMethodMismatch('backend', route.contractName, contract.method, route.httpMethod))
      }

      if (contract.path) {
        const normalizedContract = normalizePath(contract.path)
        const normalizedBackend = normalizePath(route.fullPath)
        if (normalizedContract !== normalizedBackend) {
          results.push(resultPathMismatch('backend', route.contractName, normalizedContract, normalizedBackend))
        }
      }

      if (contract.hasBody && !route.hasBody) {
        results.push(resultMissingBody('backend', route.contractName))
      }

      results.push(resultOk('backend', route.contractName, `${route.httpMethod} ${route.fullPath}`))
    }

    for (const [name, contract] of contracts) {
      if (!matchedContracts.has(name) && contract.method) {
        results.push(resultMissing('backend', name))
      }
    }

    return results
  }

  private extractRoutes(contracts: Map<string, ContractEndpoint>): BackendRoute[] {
    const routes: BackendRoute[] = []

    for (const moduleDirName of fs.readdirSync(BACKEND_MODULES)) {
      const moduleDir = path.join(BACKEND_MODULES, moduleDirName)
      const controllerFile = path.join(moduleDir, `${moduleDirName}.controller.ts`)
      if (!fs.existsSync(controllerFile)) continue

      const source = this.project.addSourceFileAtPath(controllerFile)
      const controllerPrefix = this.extractControllerPrefix(source, contracts)

      for (const classDeclaration of source.getClasses()) {
        for (const classMethod of classDeclaration.getMethods()) {
          // Try @contract comment first
          let contractName: string | null = null
          for (const comment of classMethod.getLeadingCommentRanges()) {
            const match = comment.getText().match(CONTRACT_PATTERN)
            if (match) contractName = match[1]
          }

          // Fallback: infer from return type Promise<Namespace.Response>
          if (!contractName) {
            const returnTypeText = classMethod.getReturnTypeNode()?.getText() ?? ''
            const returnMatch = returnTypeText.match(/Promise<(\w+)\.Response>/)
            if (returnMatch) contractName = returnMatch[1]
          }

          if (!contractName) continue

          let httpMethod: string | null = null
          let decoratorPath = ''

          for (const decorator of classMethod.getDecorators()) {
            const decoratorName = decorator.getName()
            if (!(decoratorName in METHOD_DECORATORS)) continue

            httpMethod = METHOD_DECORATORS[decoratorName]
            const args = decorator.getArguments()
            if (args.length > 0) {
              const argument = args[0]
              if (argument.isKind(SyntaxKind.StringLiteral)) {
                decoratorPath = argument.getLiteralValue()
              } else if (argument.isKind(SyntaxKind.PropertyAccessExpression)) {
                const namespaceName = argument.getExpression().getText()
                const contract = contracts.get(namespaceName)
                if (contract?.path) {
                  decoratorPath = contract.path.startsWith(controllerPrefix)
                    ? contract.path.slice(controllerPrefix.length)
                    : contract.path
                } else {
                  decoratorPath = `[${argument.getText()}]`
                }
              }
            }
            break
          }

          if (!httpMethod) continue

          let hasBody = false
          for (const parameter of classMethod.getParameters()) {
            for (const decorator of parameter.getDecorators()) {
              if (decorator.getName() === 'Body') hasBody = true
            }
          }

          routes.push({
            contractName,
            httpMethod,
            fullPath: controllerPrefix + '/' + decoratorPath,
            hasBody,
            returnType: classMethod.getReturnType().getText(),
            file: path.basename(controllerFile),
            line: source.getLineAndColumnAtPos(classMethod.getStart()).line,
          })
        }
      }
    }

    return routes
  }

  private extractControllerPrefix(source: SourceFile, contracts: Map<string, ContractEndpoint>): string {
    for (const classDeclaration of source.getClasses()) {
      for (const decorator of classDeclaration.getDecorators()) {
        if (decorator.getName() !== 'Controller') continue
        const args = decorator.getArguments()
        if (args.length === 0) return ''

        const argument = args[0]
        if (argument.isKind(SyntaxKind.StringLiteral)) {
          return argument.getLiteralValue()
        }
        if (argument.isKind(SyntaxKind.Identifier)) {
          for (const contract of contracts.values()) {
            if (contract.file === path.basename(source.getFilePath()).replace('.controller.ts', '.ts')) {
              const firstSegments = contract.path?.match(/^(\/[^/:]+)/)
              if (firstSegments) return firstSegments[1]
            }
          }
          return `[${argument.getText()}]`
        }
      }
    }
    return ''
  }
}
