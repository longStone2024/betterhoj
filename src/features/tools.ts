/**
 * Tools Feature (Small Widgets)
 * Matches reference implementation exactly
 */

import { NewTool } from '../core/ui/tool.js';
import { WebI18n } from '../core/i18n.js';
import { saveConfig } from '../core/config.js';
import type { Config } from '../core/config.js';
import { GM_getValue, GM_setValue } from '../core/storage.js';

const _tools: Record<string, NewTool | null> = {
  keystroke: null,
  pagetime: null,
  clock: null
};

let _pageTimeTimer: number | null = null;
let _pageTimeVisible = !document.hidden;
let _pageTimeLast = Date.now();

function getPageTimeKey(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `hoj_pagetime_${d.getFullYear()}-${m}-${day}`;
}

export function startPageTimeTracker(): void {
  if (_pageTimeTimer) return;

  const tick = () => {
    const now = Date.now();
    if (_pageTimeVisible) {
      const delta = Math.floor((now - _pageTimeLast) / 1000);
      if (delta > 0) {
        const total = (GM_getValue(getPageTimeKey(), 0) | 0) + delta;
        GM_setValue(getPageTimeKey(), total);
      }
    }
    _pageTimeLast = now;
  };

  const onVis = () => {
    tick();
    _pageTimeVisible = !document.hidden;
    _pageTimeLast = Date.now();
  };

  document.addEventListener('visibilitychange', onVis);
  window.addEventListener('blur',  () => { tick(); _pageTimeVisible = false; _pageTimeLast = Date.now(); });
  window.addEventListener('focus', () => { tick(); _pageTimeVisible = true;  _pageTimeLast = Date.now(); });

  _pageTimeTimer = window.setInterval(tick, 1000);

  window.addEventListener('beforeunload', tick);

  (startPageTimeTracker as any)._stop = () => {
    if (_pageTimeTimer) { clearInterval(_pageTimeTimer); _pageTimeTimer = null; }
    document.removeEventListener('visibilitychange', onVis);
  };
}

let settingsPanel: HTMLElement | null = null;
export function setSettingsPanel(p: HTMLElement | null) { settingsPanel = p; }

/** 当前生效的配置（由 initAllTools 注入，供 onClose 回调使用） */
let _toolConfig: Config | null = null;

function closeToolAndSync(configKey: string): void {
  const cfg = _toolConfig;
  if (!cfg) return;
  (cfg as any)[configKey] = false;
  saveConfig(cfg);
  if (settingsPanel) {
    const checkbox = settingsPanel.querySelector(`[data-key="${configKey}"]`) as HTMLInputElement | null;
    if (checkbox) checkbox.checked = false;
  }
  initAllTools(cfg);
}

export function initAllTools(config: Config): void {
  _toolConfig = config;
  if (!config.ToolsEnabled) {
    Object.keys(_tools).forEach(k => { if (_tools[k]) { _tools[k]!.destroy(); _tools[k] = null; } });
    return;
  }

  const want = {
    keystroke: !!config.ToolsKeystroke,
    pagetime:  !!config.ToolsPageTime,
    clock:     !!config.ToolsClock,
  };
  const factories = {
    keystroke: initKeystrokeTool,
    pagetime:  initPageTimeTool,
    clock:     initClockTool,
  };

  Object.keys(want).forEach(k => {
    if (want[k] && !_tools[k]) _tools[k] = factories[k]();
    if (!want[k] && _tools[k]) { _tools[k]!.destroy(); _tools[k] = null; }
  });
}

/* ============================================================
 * 1. 按键显示
 * ============================================================ */
function initKeystrokeTool(): NewTool {
  const tool = new NewTool({
    id: 'keystroke',
    title: WebI18n.t('tools.keystroke'),
    icon: '⌨️',
    width: 240,
    height: 90,
    minWidth: 140,
    minHeight: 60,
    left: 20,
    top: window.innerHeight - 200,
    onClose: () => closeToolAndSync('ToolsKeystroke')
  });
  const body = tool.bodyEl;
  body.style.cssText += 'display:flex;flex-direction:row;align-items:center;gap:6px;padding-top:10px;overflow:hidden;';

  const MAX_ALIVE    = 5;
  const LIFETIME     = 5000;
  const OUT_DURATION = 400;

  const aliveKeys: HTMLElement[] = [];

  const fmt = (e: KeyboardEvent): string | null => {
    const k = e.key;
    if (['Control','Shift','Alt','Meta','CapsLock'].includes(k)) return null;
    if (k === ' ') return 'Space';
    if (k === 'Enter') return '↵';
    if (k === 'Tab') return 'Tab';
    if (k === 'Backspace') return '⌫';
    if (k === 'Escape') return 'Esc';
    return k;
  };

  const fadeOutAndRemove = (el: HTMLElement) => {
    if (!el || !el.parentNode) return;
    if ((el as any)._hojTimer) { clearTimeout((el as any)._hojTimer); (el as any)._hojTimer = null; }

    const idx = aliveKeys.indexOf(el);
    if (idx >= 0) aliveKeys.splice(idx, 1);

    el.classList.remove('hoj-key--in');
    el.classList.add('hoj-key--out');
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, OUT_DURATION);
  };

  const onKey = (e: KeyboardEvent) => {
    const t = fmt(e);
    if (!t) return;

    const el = document.createElement('span');
    el.className = 'hoj-key';
    el.textContent = t;

    body.appendChild(el);
    aliveKeys.push(el);

    requestAnimationFrame(() => el.classList.add('hoj-key--in'));

    (el as any)._hojTimer = setTimeout(() => {
      (el as any)._hojTimer = null;
      fadeOutAndRemove(el);
    }, LIFETIME);

    while (aliveKeys.length > MAX_ALIVE) {
      fadeOutAndRemove(aliveKeys[0]);
    }
  };

  document.addEventListener('keydown', onKey, true);
  tool.setCleanup(() => document.removeEventListener('keydown', onKey, true));
  return tool;
}

/* ============================================================
 * 2. 今日使用时间
 * ============================================================ */
function initPageTimeTool(): NewTool {
  const tool = new NewTool({
    id: 'pagetime',
    title: WebI18n.t('tools.time'),
    icon: '⏱️',
    width: 200,
    height: 90,
    minWidth: 140,
    minHeight: 70,
    left: 20,
    top: window.innerHeight - 330,
    onClose: () => closeToolAndSync('ToolsPageTime')
  });
  const body = tool.bodyEl;
  body.style.cssText += 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;';

  const timeEl = document.createElement('div');
  timeEl.style.cssText = 'font-size:22px;font-weight:700;font-variant-numeric:tabular-nums;';
  const labelEl = document.createElement('div');
  labelEl.style.cssText = 'font-size:11px;opacity:.6;';
  labelEl.textContent = '页面活跃时长';
  body.append(timeEl, labelEl);

  const render = (t: number) => {
    const h = String(Math.floor(t / 3600)).padStart(2, '0');
    const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0');
    const s = String(t % 60).padStart(2, '0');
    timeEl.textContent = `${h}:${m}:${s}`;
  };

  render(GM_getValue(getPageTimeKey(), 0) | 0);

  const timer = window.setInterval(() => {
    render(GM_getValue(getPageTimeKey(), 0) | 0);
  }, 1000);

  tool.setCleanup(() => clearInterval(timer));
  return tool;
}

/* ============================================================
 * 3. 时钟
 * ============================================================ */
function initClockTool(): NewTool {
  const tool = new NewTool({
    id: 'clock',
    title: WebI18n.t('tools.clock'),
    icon: '🕐',
    width: 200,
    height: 100,
    minWidth: 140,
    minHeight: 70,
    left: 20,
    top: 80,
    onClose: () => closeToolAndSync('ToolsClock')
  });
  const body = tool.bodyEl;
  body.style.cssText += 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;';
  const timeEl = document.createElement('div');
  timeEl.style.cssText = 'font-size:26px;font-weight:700;font-variant-numeric:tabular-nums;';
  const dateEl = document.createElement('div');
  dateEl.style.cssText = 'font-size:12px;opacity:.65;';
  body.append(timeEl, dateEl);

  const week = ['周日','周一','周二','周三','周四','周五','周六'];
  const tick = () => {
    const d = new Date();
    timeEl.textContent = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
    dateEl.textContent = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${week[d.getDay()]}`;
  };
  tick();
  const timer = window.setInterval(tick, 1000);
  tool.setCleanup(() => clearInterval(timer));
  return tool;
}

/* ============================================================
 * 辅助：等待选择器 / 把设置面板嵌进小组件
 * ============================================================ */

/**
 * 等待某个选择器在 DOM 中出现，出现后立即执行 callback
 * 若 timeout 毫秒内未出现则放弃
 */
export function waitForSelector(
  selector: string,
  callback: (el: Element) => void,
  timeout = 15000
): void {
  const existing = document.querySelector(selector);
  if (existing) { callback(existing); return; }

  const start = Date.now();
  const obs = new MutationObserver(() => {
    const el = document.querySelector(selector);
    if (el) {
      obs.disconnect();
      callback(el);
    } else if (Date.now() - start > timeout) {
      obs.disconnect();
    }
  });
  obs.observe(document.body, { childList: true, subtree: true });
}

/**
 * 把设置面板内联嵌入小组件容器（脱离 fixed 右上角定位）
 */
export function mountSettingsInto(container: HTMLElement): void {
  if (!settingsPanel) return;
  const p = settingsPanel;

  // 内联定位覆盖：脱离 fixed 右上角，融入小组件
  p.style.position = 'static';
  p.style.top = 'auto';
  p.style.right = 'auto';
  p.style.left = 'auto';
  p.style.width = '100%';
  p.style.height = 'auto';
  p.style.maxHeight = 'none';
  p.style.overflowY = 'visible';
  p.style.boxShadow = 'none';
  p.style.background = 'transparent';
  (p.style as any).backdropFilter = 'none';
  p.style.display = 'block';

  if (p.parentNode !== container) {
    container.innerHTML = '';
    container.appendChild(p);
  }
}
