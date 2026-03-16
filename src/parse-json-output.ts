/**
 * Parse the JSON output from `--output-format json` with `--json-schema`.
 *
 * Two formats are possible:
 * - Compact (standalone session): `{"result":null,"structured_output":{...},...}`
 * - Stream-json (fork/resume session): `[...,{"type":"result","structured_output":{...},...}]`
 *
 * In both cases the structured output lives in `structured_output`.
 */
export function parseJsonOutput<T = unknown>(stdout: string): T {
  const parsed = JSON.parse(stdout);
  if (Array.isArray(parsed)) {
    // stream-json format: find the last result message
    for (let i = parsed.length - 1; i >= 0; i--) {
      const msg = parsed[i];
      if (msg?.type === 'result') {
        return (msg.structured_output ?? msg.result) as T;
      }
    }
    throw new Error('No result message found in stream-json output');
  }
  return (parsed.structured_output ?? parsed.result) as T;
}
