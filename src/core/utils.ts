/**
 * Utility functions shared across modules
 */

/**
 * Escape HTML to prevent XSS
 */
export function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

/**
 * Compare semantic version strings
 * Returns -1 if a < b, 1 if a > b, 0 if equal
 */
export function cmpVersion(a: string, b: string): number {
  const pa = String(a).split('.').map(n => parseInt(n, 10) || 0);
  const pb = String(b).split('.').map(n => parseInt(n, 10) || 0);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const va = pa[i] ?? 0;
    const vb = pb[i] ?? 0;
    if (va !== vb) return va < vb ? -1 : 1;
  }
  return 0;
}

/**
 * Format a value for display (used in import/export)
 */
export function fmtVal(v: unknown): string {
  if (v === null) return 'null';
  if (v === undefined) return 'undefined';
  if (typeof v === 'object') {
    try { return JSON.stringify(v); } catch { return String(v); }
  }
  return String(v);
}

/**
 * Check if a value is a valid color
 */
export function isColorValue(v: unknown): boolean {
  if (!v || typeof v !== 'string') return false;
  const str = v.trim();
  if (str === '' || str === 'Default') return false;
  if (/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(str)) return true;
  if (/^(rgb|rgba|hsl|hsla)\(/i.test(str)) return true;
  if (/^[a-z]+$/i.test(str)) return true;
  return false;
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Get today's date string in YYYY-MM-DD format
 */
export function getTodayDateStr(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

/**
 * Check if element matches a selector or is contained by one
 */
export function matchesOrContained(el: Element | null, selector: string): boolean {
  if (!el) return false;
  if (el.matches(selector)) return true;
  return el.closest(selector) !== null;
}

/**
 * Sleep utility
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Format time duration
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}
/**
 * 复制文本到剪贴板（GM_setClipboard → navigator.clipboard → execCommand 兜底）
 */
export async function copyToClipboard(text: string): Promise<void> {
  // @ts-ignore - GM_setClipboard provided by userscript environment
  if (typeof GM_setClipboard !== 'undefined') {
    // @ts-ignore
    GM_setClipboard(text);
    return;
  }
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  return new Promise((res, rej) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px;';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy') ? res() : rej(new Error('copy failed')); }
    catch (e) { rej(e); }
    finally { document.body.removeChild(ta); }
  });
}
