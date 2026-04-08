# bqool — Shared Type Definitions

See [SHARED_CONVENTIONS.md](./SHARED_CONVENTIONS.md) for cross-repo conventions.

---

## What this repo is

`bqool` is the shared types package for the BooleanCorrector system.
It defines all domain interfaces consumed by backend, runner, and frontend.

---

## Source-of-truth hierarchy

Changes flow downstream, never upstream:

```
bqool  →  bqool-backend-types  →  bqool-backend
              (& bqool-frontend, bqool-runner, ...)
```

- `bqool` defines the domain. Edit it when the domain model is wrong.
- `bqool-backend-types` defines API contracts built from `bqool` types. Edit it when the API shape is wrong.
- `bqool-backend` is an implementation. **Never edit types to match what the implementation returns** — fix the implementation to match the types.

When the implementation disagrees with the types, the implementation is the bug.

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
`category` is the label; grading behavior is driven by `Criterion.severity`. Severity semantics:

| severity | satisfied | unsatisfied |
|----------|-----------|-------------|
| > 0      | correct   | error (positive trait missing) |
| < 0      | error     | neutral (error absent) |

### BooleanQ

A yes/no question derived from a Criterion, optionally used by AI to evaluate a student answer.
A `BooleanQ` carries only its `text` text; severity lives on the parent `Criterion`.

### BooleanQAnswer

The generated yes/no evaluation of a single `BooleanQ` against an `Answer`.

### Penmark

A generated annotation on an `Answer` (non-concept categories only) carrying a rationale, citations, and a severity without a reference to criterion.


## Answer grade

### GradeParams

Grade calculation parameters live on `Question.grade_params`.
See the comment in `src/grade.ts` for the full formula.


## Student test grade

### Grid

A grid containing three evaluations macros used as the base for the final verdict on the test (**not on the single answer**).

Each test has its own grid, and each student_test has its own grid-verdict.