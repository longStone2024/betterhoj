/**
 * Storage wrapper for GM functions
 * Provides a consistent API with fallbacks
 */

// Re-export GM functions with proper types
export const GM_getValue = (
  key: string,
  defaultValue: any = null
): any => {
  // @ts-ignore - GM_getValue is provided by userscript environment
  return typeof window.GM_getValue === 'function' ? window.GM_getValue(key, defaultValue) : defaultValue;
};

export const GM_setValue = (
  key: string,
  value: any
): void => {
  // @ts-ignore - GM_setValue is provided by userscript environment
  if (typeof window.GM_setValue === 'function') window.GM_setValue(key, value);
};

export const GM_getResourceText = (
  name: string
): string => {
  // @ts-ignore
  return typeof window.GM_getResourceText === 'function' ? window.GM_getResourceText(name) : '';
};

export const GM_getResourceURL = (
  name: string
): string => {
  // @ts-ignore
  return typeof window.GM_getResourceURL === 'function' ? window.GM_getResourceURL(name) : '';
};

export const GM_addStyle = (
  css: string
): void => {
  // @ts-ignore
  if (typeof window.GM_addStyle === 'function') window.GM_addStyle(css);
};

export const GM_xmlhttpRequest = (
  details: any
): any => {
  // @ts-ignore
  return typeof window.GM_xmlhttpRequest === 'function' ? window.GM_xmlhttpRequest(details) : Promise.reject(new Error('GM_xmlhttpRequest not available'));
};

export const GM_setClipboard = (
  text: string,
  info?: string
): void => {
  // @ts-ignore
  if (typeof window.GM_setClipboard === 'function') window.GM_setClipboard(text, info);
};

export const GM_registerMenuCommand = (
  name: string,
  fn: () => void,
  accessKey?: string
): number => {
  // @ts-ignore
  return typeof window.GM_registerMenuCommand === 'function' ? window.GM_registerMenuCommand(name, fn, accessKey) : 0;
};

export const GM_unregisterMenuCommand = (
  menuId: number
): void => {
  // @ts-ignore
  if (typeof window.GM_unregisterMenuCommand === 'function') window.GM_unregisterMenuCommand(menuId);
};

export const unsafeWindow = window;

// Polyfill for environments without GM functions
if (typeof window.GM_getValue === 'undefined') {
  console.warn('[BetterHOJ] GM functions not available, using localStorage fallback');
}