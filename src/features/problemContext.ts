/**
 * Problem Context Utilities
 * Parses URL to determine problem context and fetches problem details
 */

export type ProblemContext = 
  | { type: 'contest'; cid: string; displayId: string }
  | { type: 'training'; tid: string; displayId: string }
  | { type: 'problem'; problemId: string; gid?: string }
  | null;

/**
 * Parse problem context from URL
 * @returns Problem context or null if not a problem page
 */
export function parseProblemContext(): ProblemContext {
  const path = window.location.pathname;

  // 1) Contest problem: /contest/{cid}/problem/{displayId}
  let m = path.match(/\/contest\/(\d+)\/problem\/([^\/?#]+)/);
  if (m) return { type: 'contest', cid: m[1], displayId: m[2] };

  // 2) Training problem: /training/{tid}/problem/{displayId}
  m = path.match(/\/training\/(\d+)\/problem\/([^\/?#]+)/);
  if (m) return { type: 'training', tid: m[1], displayId: m[2] };

  // 3) Group problem: /group/{gid}/problem/{problemId}/...
  m = path.match(/\/group\/(\d+)\/problem\/([^\/?#]+)/);
  if (m) return { type: 'problem', problemId: m[2], gid: m[1] };

  // 4) Regular problem: /problem/{problemId} or /problem:{problemId}
  m = path.match(/\/problem[\/:]([^\/?#]+)/);
  if (m) return { type: 'problem', problemId: m[1] };

  return null;
}

/**
 * Get problem ID from URL
 */
export function getProblemIdFromUrl(): string {
  const ctx = parseProblemContext();
  if (!ctx) return '';
  return ctx.type === 'contest' ? ctx.displayId : ctx.problemId;
}

/**
 * Fetch problem detail from API
 */
export async function fetchProblemDetail(): Promise<any> {
  const token = localStorage.getItem('token') || '';
  const ctx = parseProblemContext();
  if (!ctx) return Promise.reject(new Error('无法从 URL 中识别题目'));

  let url;
  if (ctx.type === 'contest') {
    url = `${window.location.origin}/api/get-contest-problem-details`
      + `?displayId=${encodeURIComponent(ctx.displayId)}`
      + `&cid=${encodeURIComponent(ctx.cid)}`
      + `&containsEnd=true`;
  } else {
    url = `${window.location.origin}/api/get-problem-detail`
      + `?problemId=${encodeURIComponent(ctx.problemId)}`;
    if (ctx.gid) url += `&gid=${encodeURIComponent(ctx.gid)}`;
  }

  console.log('[BetterHOJ] fetchProblemDetail →', url);

  return fetch(url, {
    method: 'GET',
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
    credentials: 'include'
  }).then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)));
}

/**
 * HTML entity decoder
 */
export function decodeHtmlEntities(s: string): string {
  if (!s || typeof s !== 'string') return s || '';
  if (!s.includes('&')) return s;
  const ta = document.createElement('textarea');
  ta.innerHTML = s;
  return ta.value;
}

/**
 * Parse examples from problem (<input>...</input><output>...</output>)
 */
export function parseExamples(str: string): Array<{ input: string; output: string }> {
  const tests: Array<{ input: string; output: string }> = [];
  if (!str || typeof str !== 'string') return tests;

  const re = /<input>([\s\S]*?)<\/input>\s*<output>([\s\S]*?)<\/output>/g;
  let m;
  while ((m = re.exec(str)) !== null) {
    const input = decodeHtmlEntities(m[1]).replace(/^\s+|\s+$/g, '');
    // Keep leading spaces in output, only trim trailing newlines
    const output = decodeHtmlEntities(m[2]).replace(/\n+$/, '');
    tests.push({ input, output });
  }
  return tests;
}