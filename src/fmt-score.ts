export function fmtScore(score: number): string {
  const base = Math.floor(score);
  const frac = score - base;

  if (frac === 0) return `${base}`;
  if (frac <= 0.4) return `${base}+`;
  if (frac <= 0.6) return `${base}½`;
  if (frac <= 0.8) return `${base}/${base + 1}`;
  return `${base + 1}-`;
}
