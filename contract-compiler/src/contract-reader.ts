import { Project, SyntaxKind, type SourceFile } from 'ts-morph'
import * as path from 'path'
import * as fs from 'fs'
import { CONTRACTS_SRC } from './paths.js'
import { ContractEndpoint } from './contract-endpoint.js'

export class ContractReader {
  private readonly project: Project

  constructor() {
    this.project = new Project({ skipAddingFilesFromTsConfig: true })
  }

  read(): Map<string, ContractEndpoint> {
    const endpoints = new Map<string, ContractEndpoint>()

    for (const fileName of fs.readdirSync(CONTRACTS_SRC)) {
      if (!fileName.endsWith('.ts')) continue
      if (fileName === 'index.ts' || fileName === 'common.ts') continue

      const source = this.project.addSourceFileAtPath(path.join(CONTRACTS_SRC, fileName))
      const prefix = this.extractModulePrefix(source)

      for (const namespace of source.getModules()) {
        const endpoint = new ContractEndpoint(namespace, fileName, prefix)
        endpoints.set(endpoint.name, endpoint)
      }
    }

    return endpoints
  }

  private extractModulePrefix(source: SourceFile): string {
    for (const variableStatement of source.getVariableStatements()) {
      if (!variableStatement.isExported()) continue
      for (const declaration of variableStatement.getDeclarations()) {
        if (!declaration.getName().endsWith('Prefix')) continue
        const initializer = declaration.getInitializer()
        if (initializer?.isKind(SyntaxKind.StringLiteral)) {
          return initializer.getLiteralValue()
        }
      }
    }
    return ''
  }
}
