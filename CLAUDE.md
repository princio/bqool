# BooleanCorrector — Shared Context

This file is the canonical source of cross-cutting conventions for the
BooleanCorrector system. It is **vendored** into each repo manually.
Do not auto-sync or reference it externally — copy it deliberately.

---

## What is BooleanCorrector

**BooleanCorrector** is an AI-assisted student answer evaluation system
for Italian education. Teachers create questions, students submit text
answers (in Italian), and the system uses AI to evaluate answers against
a structured rubric, with teacher review at every step.

---

## System Topology

| Repo               | Role                                              | Consumes          |
|--------------------|---------------------------------------------------|-------------------|
| `backend`          | Core API (NestJS + DB)                            | `runner-types`    |
| `runner`           | Standalone AI execution service                   | —                 |
| `frontend`         | Teacher/student UI                                | `backend-types`   |
| `backend-types`    | API contract: backend ↔ frontend                  | —                 |
| `runner-types`     | API contract: backend ↔ runner-job                | —                 |

Each repo is a sandbox. No repo imports code from another at dev time.
`*-types` repos are the only cross-repo dependencies, published explicitly.

---

## Language Conventions

- All **student-facing content** must be in Italian, second person
  singular ("tu").
- All **code, field names, API keys, and metadata** must be in English.
- i18n: always add keys to both `dev.json` and `it.json` in the same
  commit. Never leave one out of sync.

---

## TypeScript Conventions

### Type everything explicitly

- All exported functions and methods must have explicit return types.
- Never use `Promise<any>`, `Promise<unknown>`, or `as any` to silence
  type errors — fix the type instead.
- Enable strict mode in every repo (`"strict": true` in tsconfig).

### No inline return types on public API boundaries

Public-facing method return types must use named interfaces defined in
the appropriate `*-types` repo. Never write `Promise<{ ok: boolean }>` 
on a public method — define a named type and import it.

Internal/private methods may use inline types for simple one-off shapes.

### Naming: verb + noun

Use verb + noun patterns that describe the action and its target:
```typescript
// BAD — vague
findAll()
update(id)
prepare()

// GOOD — specific
listTestsWithStudentCounts()
updateQuestionOrdering(questionId, order)
initializeAnswerWorkdir(answerId)
```

Thin adapter methods (REST controllers, route handlers) may use short
REST-style names (`list`, `getById`, `create`) when the class name
already provides the noun context.

---

## What This File Is Not

This file does not contain:
- Commands (each repo defines its own)
- Architecture details (each repo owns its own)
- Framework-specific rules (belong in the repo that uses that framework)

If you find yourself adding framework or repo-specific content here,
stop — it belongs in that repo's own `CLAUDE.md`.