/**
 * Auto Save Code Feature
 * 按原版实现：把编辑器内容写回 HOJ 自己的 localStorage 结构
 * （key = hojProblemCodeAndSetting_NoContest_{pid}），
 * 这样站点原生编辑器刷新后能直接恢复。
 */

import type { Config } from '../core/config.js';
import { readStoredLanguage } from './language.js';

let _autoSaveTimer: number | null = null;
let _leaveBound = false;

/** 当前题目 id（仅 /problem/{pid}，与原版一致） */
function _getAutoSaveProblemId(): string | null {
  const m = window.location.pathname.match(/^\/problem\/([^\/?#]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

/** 找到当前题目页的 CodeMirror 实例 */
function _findCodeMirror(): any {
  const cmEl = (document.querySelector('.vue-codemirror-wrap .CodeMirror')
    || document.querySelector('.CodeMirror')) as any;
  if (cmEl && cmEl.CodeMirror && typeof cmEl.CodeMirror.getValue === 'function') {
    return cmEl.CodeMirror;
  }
  // 兜底：扫描所有 textarea
  for (const ta of Array.from(document.querySelectorAll('textarea')) as any[]) {
    if (ta.CodeMirror && typeof ta.CodeMirror.getValue === 'function') {
      return ta.CodeMirror;
    }
  }
  return null;
}

/** 从右侧语言选择框读当前语言 */
function _getCurrentLanguage(): string | null {
  // 语言选择框在 #js-right-header 的第一个 .select-row 里
  const el = document.querySelector('#js-right-header .select-row .el-select .el-input__inner') as HTMLInputElement | null;
  if (el && el.value) return el.value.trim();
  return null;
}

/** 读现有 localStorage，兼容缺失/脏数据 */
function _readStoredSetting(key: string): any {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) || {}) : {};
  } catch {
    return {};
  }
}

/** 单次保存 */
function _autoSaveTick(): void {
  const pid = _getAutoSaveProblemId();
  if (!pid) return;

  const cm = _findCodeMirror();
  if (!cm) return;

  const key = `hojProblemCodeAndSetting_NoContest_${pid}`;
  const stored = _readStoredSetting(key);

  stored.code = cm.getValue();
  const lang = readStoredLanguage() || _getCurrentLanguage();
  if (lang) stored.language = lang;

  // 补齐 HOJ 约定的字段，避免写入残缺数据
  if (typeof stored.language !== 'string') stored.language = 'C++';
  if (typeof stored.theme !== 'string') stored.theme = 'solarized';
  if (typeof stored.fontSize !== 'string') stored.fontSize = '14px';
  if (typeof stored.tabSize !== 'number') stored.tabSize = 4;

  try {
    localStorage.setItem(key, JSON.stringify(stored));
    console.log(`[AutoSave] 已保存 ${key}（${stored.code.length} 字符）`);
  } catch (e) {
    console.warn('[AutoSave] 保存失败:', e);
  }
}

/** 停止定时器 */
export function stopAutoSaveCode(): void {
  if (_autoSaveTimer) {
    clearInterval(_autoSaveTimer);
    _autoSaveTimer = null;
    console.log('[AutoSave] 已停止');
  }
}

/** 根据 config 与当前 URL 重新同步定时器 */
export function syncAutoSaveCode(config: Config): void {
  stopAutoSaveCode();
  if (!config.AutoSaveCode) return;

  const pid = _getAutoSaveProblemId();
  if (!pid) return;

  const interval = Math.max(5, Number(config.AutoSaveCodeInterval) || 30);
  _autoSaveTimer = window.setInterval(_autoSaveTick, interval * 1000);
  console.log(`[AutoSave] 已启动，题目 ${pid}，间隔 ${interval} 秒`);

  // 离开页面前再存一次，避免最后一次编辑丢失
  if (!_leaveBound) {
    _leaveBound = true;

    const saveOnLeave = () => {
      if (config.AutoSaveCode) _autoSaveTick();
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) saveOnLeave();
    });
    window.addEventListener('pagehide', saveOnLeave);
    window.addEventListener('beforeunload', saveOnLeave);
  }
}
