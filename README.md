# BQC — Boolean Question Corrector

AI-assisted grading of open-ended student answers, built for Italian secondary schools.

Teachers write a question and break it into a structured rubric. Students submit written answers. An AI pass evaluates each answer against the rubric and proposes a grade. **The teacher reviews and can override at every step** — the system proposes, it never decides.

This repository (`bqool`) holds the shared domain model and is the entry point to the system. The runtime lives in three sibling repositories:

| Repository | Role |
|---|---|
| **bqool** (this repo) | Domain types + contract compiler |
| [bqool-contracts](https://github.com/princio/bqool-contracts) | HTTP API contracts, built from the domain types |
| [bqc-backend](https://github.com/princio/bqc-backend) | NestJS + TypeORM API server |
| [bqool-frontend-v2](https://github.com/princio/bqool-frontend-v2) | React 19 teacher-facing SPA |

---

## The idea

Grading free-text answers is slow and inconsistent. Grading them with an LLM directly is fast and *also* inconsistent — and unaccountable, because you can't explain why a grade came out the way it did.

BQC splits the problem. The teacher decomposes a question into **criteria**, and each criterion into **BooleanQs** — yes/no questions narrow enough that an LLM answers them reliably:

> *Does the answer mention that the TCP handshake requires three messages?*

The AI only ever answers yes/no. The grade is then computed from those booleans by a deterministic, inspectable formula. This means:

- every point of the grade traces back to a specific rubric item,
- the teacher can correct one boolean and see the grade recompute,
- the formula is tunable per question, not baked into a prompt.

## Domain model

```
Classroom
├── Students
└── Tests
    ├── Questions
    │   └── Criteria
    │       └── BooleanQs
    └── StudentTest
        └── Answers (one per question)
            └── Correction (virtual entity)
                ├── Penmarks
                └── BooleanQAnswers (one per booleanq)
```

**Criterion** — one rubric entry (a concept, an expression, or a code fragment). Grading behaviour is driven by its `severity`:

| severity | satisfied | unsatisfied |
|---|---|---|
| `> 0` | correct | error — a positive trait is missing |
| `< 0` | error | neutral — the error is simply absent |

**BooleanQ** — a yes/no question derived from a criterion. It carries only its text; severity lives on the parent criterion.

**BooleanQAnswer** — the AI's yes/no verdict for one BooleanQ against one answer.

**Penmark** — an annotation on an answer with a rationale, citations into the student's text, and a severity, but no criterion reference. This is how the system flags things the rubric didn't anticipate.

**Correction** is a *virtual* entity: it has no table of its own, and is assembled from the penmarks and booleanq-answers belonging to an answer.

The grade formula (concept scoring with proportional or capped scaling, a gamma curve, severity-weighted criteria adjustment, coherence bonus, rounded to the nearest 0.5 and clamped) is documented in [`src/grade.ts`](src/grade.ts). Its parameters live per-question on `Question.grade_params`, so two questions in the same test can be weighted differently.

Test-level verdicts use a separate **Grid** — see [GRID.md](GRID.md).

---

## Architecture: one direction of truth

The interesting constraint in this codebase is that types flow strictly downstream:

```
bqool  →  bqool-contracts  →  bqc-backend
                           →  bqool-frontend-v2
```

- `bqool` defines the domain. It changes when the domain model is wrong.
- `bqool-contracts` defines the API surface, built from `bqool` types. It changes when the API shape is wrong.
- The backend and frontend are *implementations*.

The rule that follows: **never edit a type to match what an implementation returns.** If a service returns something the contract doesn't describe, the service is the bug. Types are not a description of the code — the code is an obligation imposed by the types.

Enforcing that by convention alone doesn't survive contact with a deadline, so it's enforced mechanically.

### The contract compiler

```bash
npm run contract-compiler
```

[`contract-compiler/`](contract-compiler/) parses the whole system with [ts-morph](https://ts-morph.com) and checks that the implementations actually honour the contracts:

- **`ContractReader`** — reads `bqool-contracts` and extracts every declared endpoint: method, path, params, query, request and response types.
- **`BackendValidator`** — walks the NestJS controllers and verifies each declared route exists with a matching signature.
- **`FrontendValidator`** — walks the frontend's API layer and verifies each call targets a declared path with the right params and query.

It exits non-zero on drift, so a route that exists in the contract but was never implemented — or a frontend call to a path nobody serves — fails before runtime. This is the piece I'd point at first: it turns a documentation convention into a build-time guarantee across four repositories.

Type compatibility itself is left to `tsc`; the compiler covers what the type system can't see, namely the string-keyed relationship between an HTTP route and the code on either end of it.

---

## Running the system

Each repository is independent and linked via npm `file:` dependencies, so build order matters:

```bash
git clone https://github.com/princio/bqool.git
git clone https://github.com/princio/bqool-contracts.git
git clone https://github.com/princio/bqc-backend.git
git clone https://github.com/princio/bqool-frontend-v2.git

cd bqool          && npm install && npm run build
cd ../bqool-contracts && npm install && npm run build
cd ../bqc-backend   && npm install
cd ../bqool-frontend-v2 && npm install
```

With all four checked out as siblings, [mprocs](https://github.com/pvolok/mprocs) runs the stack:

```yaml
procs:
  backend:
    shell: "cd bqc-backend && npm run start:dev"
  frontend:
    shell: "cd bqool-frontend-v2 && npm run dev"
  build-contracts:
    shell: "cd bqool-contracts && npm run build"
    autostart: false
  build-bqool:
    shell: "cd bqool && npm run build"
    autostart: false
```

The two build processes are `autostart: false` on purpose: after editing a type you rebuild upstream manually and watch the downstream typecheck fail, which is the feedback loop the whole layering exists to produce.

---

## This repository

```
src/                   domain interfaces — one file per entity
  grade.ts             grade formula + GradeParams
  derived.ts           types computed from, not stored alongside, the domain
contract-compiler/     cross-repo contract validation (ts-morph)
```

```bash
npm install
npm run build              # tsc
npm run contract-compiler  # validate backend + frontend against contracts
```

### Conventions

- Field names are `snake_case`.
- `booleanq` / `booleanqs` are proper nouns — entity names, not compound words. They are never split or camel-cased into `booleanQ`.
- Every field representing a database relationship is annotated: `/* FK Many-to-One */` for a real foreign key, `/* (reverse) FK One-to-Many */` for a relation resolved via join. The domain types therefore double as the schema documentation.
- All student-facing content is Italian, second person singular. All code, field names, and API keys are English.

See [SHARED_CONVENTIONS.md](SHARED_CONVENTIONS.md) for the conventions shared across the four repositories.

---

## Stack

TypeScript throughout. NestJS 10, TypeORM and better-sqlite3 on the server; React 19, Vite, Tailwind 4, react-router 7 and i18next on the client; ts-morph and tsx for the contract compiler; zod for runtime validation, puppeteer for PDF export, Jest for tests.

## Status

Working prototype, used against real classroom data during development. Not a product.
