# bqool — Shared Type Definitions

See [SHARED_CONVENTIONS.md](./SHARED_CONVENTIONS.md) for cross-repo conventions.

---

## What this repo is

`bqool` is the shared types package for the BooleanCorrector system.
It defines all domain interfaces consumed by backend, runner, and frontend.

---

## FK Comment Convention

Every interface field that represents a database relationship uses a comment:

- Real FK (column exists in DB): `/* FK Many-to-One */`
- Reverse relation (resolved via join): `/* (reverse) FK One-to-Many */`

---

## Naming

- Field names use `snake_case`
- `booleanq` / `booleanqs` are treated as proper nouns (entity names), not compound words

---

## Domain Model

### Criterion

A single rubric entry (concept, expression, or code) used to evaluate a student answer.
`category` is the label; grading behavior is driven by `BooleanQ.severity`.

### BooleanQ

A yes/no question derived from a Criterion. Severity semantics:

| severity | satisfied | unsatisfied |
|----------|-----------|-------------|
| > 0      | correct   | error (positive trait missing) |
| < 0      | error     | neutral (error absent) |

### GradeParams

Grade calculation parameters live on `Question.grade_params`.
See the comment in `src/grade.ts` for the full formula.
