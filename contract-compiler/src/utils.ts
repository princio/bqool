export function normalizePath(inputPath: string): string {
  const cleaned = inputPath.replace(/\/+/g, '/').replace(/\/+$/, '')
  return cleaned.startsWith('/') ? cleaned : '/' + cleaned
}
