import { SyntaxKind, type ModuleDeclaration } from 'ts-morph'

export class ContractEndpoint {
  readonly name: string
  readonly file: string
  readonly method: string | null
  readonly path: string | null
  readonly hasParams: boolean
  readonly hasQuery: boolean
  readonly hasBody: boolean
  readonly hasResponse: boolean
  readonly paramKeys: string[]
  readonly queryKeys: string[]

  constructor(namespace: ModuleDeclaration, file: string, prefix: string = '') {
    this.name = namespace.getName()!
    this.file = file

    this.method = this.extractStringConst(namespace, 'method')
    const rawPath = this.extractStringConst(namespace, 'path')
    this.path = rawPath ? prefix + rawPath : null

    this.hasParams = this.hasMember(namespace, 'Params')
    this.hasQuery = this.hasMember(namespace, 'Query')
    this.hasBody = this.hasMember(namespace, 'Body')
    this.hasResponse = this.hasMember(namespace, 'Response')

    this.paramKeys = this.extractInterfaceKeys(namespace, 'Params')
    this.queryKeys = this.extractInterfaceKeys(namespace, 'Query')
  }

  private extractStringConst(namespace: ModuleDeclaration, constName: string): string | null {
    for (const variableStatement of namespace.getVariableStatements()) {
      for (const declaration of variableStatement.getDeclarations()) {
        if (declaration.getName() !== constName) continue
        const initializer = declaration.getInitializer()
        if (!initializer) continue

        if (initializer.isKind(SyntaxKind.AsExpression)) {
          const expression = initializer.getExpression()
          if (expression.isKind(SyntaxKind.StringLiteral)) {
            return expression.getLiteralValue()
          }
        }
        if (initializer.isKind(SyntaxKind.StringLiteral)) {
          return initializer.getLiteralValue()
        }
      }
    }
    return null
  }

  private hasMember(namespace: ModuleDeclaration, memberName: string): boolean {
    return namespace.getTypeAlias(memberName) !== undefined
      || namespace.getInterface(memberName) !== undefined
  }

  private extractInterfaceKeys(namespace: ModuleDeclaration, memberName: string): string[] {
    const iface = namespace.getInterface(memberName)
    if (iface) {
      return iface.getProperties().map(property => property.getName())
    }

    const alias = namespace.getTypeAlias(memberName)
    if (alias) {
      const typeText = alias.getTypeNode()?.getText() ?? ''
      if (typeText === 'IdParams') return ['id']
    }

    return []
  }
}
