/**
 * CPH (Competitive Programming Helper) Integration
 * Sends problem data to CPH extension via localhost
 */

import type { Config } from '../core/config.js';
import { parseProblemContext, fetchProblemDetail, parseExamples } from './problemContext.js';

const CPH_PORT = 27121;

function randomUUID(): string {
  if (crypto?.randomUUID) return crypto.randomUUID();
  if (crypto?.getRandomValues) {
    const b = new Uint8Array(16); crypto.getRandomValues(b);
    b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
    const h = Array.from(b, x => x.toString(16).padStart(2, '0')).join('');
    return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export function sendToCPH(data: any, port: number): Promise<{ success: boolean; message: string; status: number }> {
  return new Promise(res => {
    // @ts-ignore - GM_xmlhttpRequest is provided by userscript environment
    GM_xmlhttpRequest({
      method: 'POST',
      url: `http://localhost:${port}/`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
      onload: r => res(r.status === 200 ? { message: '发送成功', success: true, status: 200 } : { message: `错误：CPH 返回状态码 ${r.status}`, success: false, status: r.status }),
      onerror: () => res({ message: `连接失败\n请确认 CPH 插件已启动，且端口为 ${port}`, success: false, status: 502 }),
      ontimeout: () => res({ message: '连接超时，请检查插件状态', success: false, status: 504 })
    });
  });
}

function getProblemUrlForCPH(problemId: string): string {
  // CF format: /problem/CF-123A
  const m = problemId.match(/^CF-(\d+)([A-Z])$/i);
  if (m) {
    const contest = m[1];
    const index = m[2];
    return `https://codeforces.com/problemset/problem/${contest}/${index}`;
  }
  return window.location.href;
}

export function buildCPHData(data: any, config: Config): any {
  const p = data?.data?.problem || data?.data?.problems?.[0];
  if (!p) return null;
  const rawTests = parseExamples(p.examples || '');
  if (!rawTests.length) return null;

  const ctx = parseProblemContext();
  const problemId = ctx?.problemId || p.problemId || '';
  let problemUrl = window.location.href;
  if (config.realCPHurl) {
    problemUrl = getProblemUrlForCPH(problemId);
  }
  
  return {
    name: `HOJ - ${problemId}`,
    url: problemUrl,
    memoryLimit: p.memoryLimit || 0,
    timeLimit: p.timeLimit || 0,
    group: 'HOJ',
    tests: rawTests.map((t, i) => ({ input: t.input, output: t.output, id: i })),
    testType: 'single',
    input: { type: 'stdin' },
    output: { type: 'stdout' },
    languages: { java: { mainClass: 'Main', taskClass: '' } },
    batch: { id: randomUUID(), size: 1 }
  };
}
