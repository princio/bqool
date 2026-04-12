import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const WORKSPACE = path.resolve(__dirname, '..', '..', '..')
export const CONTRACTS_SRC = path.join(WORKSPACE, 'bqool-contracts', 'src')
export const BACKEND_MODULES = path.join(WORKSPACE, 'bqool-backend', 'src', 'modules')
export const FRONTEND_API = path.join(WORKSPACE, 'bqool-frontend-v2', 'src', 'api', 'api.ts')
