#!/usr/bin/env tsx
/**
 * Contract validation script.
 *
 * Reads bqool-contracts as the source of truth, then validates that:
 * - Backend controllers implement matching routes
 * - Frontend api.ts calls matching paths with correct params/query
 *
 * Usage: npx tsx contract-compiler/validate.ts
 */

import { ContractReader } from './src/contract-reader.js'
import { BackendValidator } from './src/backend-validator.js'
import { FrontendValidator } from './src/frontend-validator.js'
import { printReport } from './src/report.js'

function main(): number {
  const contracts = new ContractReader().read()
  const backendResults = new BackendValidator().validate(contracts)
  const frontendResults = new FrontendValidator().validate(contracts)
  return printReport(contracts, backendResults, frontendResults)
}

process.exit(main())
