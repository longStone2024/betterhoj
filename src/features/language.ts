/**
 * Language Trigger Feature
 * Replaces native language select with custom trigger supporting HOJ and CF languages
 */

import { openCustomDialog, NewAlert } from '../core/api.js';
import { WebI18n } from '../core/i18n.js';
import type { Config } from '../core/config.js';

const HOJ_LANG_STORAGE_KEY = 'hojIndividualLanguageAndSetting';

// 20 种规范语言名 —— 这些字符串会**原样发给后端**，必须与站点完全一致
// 注意：是 Python3 / Python2 / PyPy3 / PyPy2（无空格），不是 "Python 3"
const HOJ_CANONICAL_LANGS = [
  'C++', 'C++ With O2', 'C++ 17', 'C++ 17 With O2',
  'C++ 20', 'C++ 20 With O2', 'C', 'C With O2',
  'Python3', 'Python2', 'Java', 'Golang', 'C#', 'PHP',
  'PyPy2', 'PyPy3', 'JavaScript Node', 'JavaScript V8',
  'Ruby', 'Rust'
];

// Codeforces 远程题语言（isRemote=true 且 pid 以 CF- 开头时使用）
const CF_LANGS = [
  'GNU G++17', 'GNU G++20', 'GNU G++23',
  'Clang++17 Diagnostics', 'Microsoft Visual C++ 2017',
  'C# Mono 6.8', 'C# 8, .NET Core 3.1',
  'D DMD32 v2.091.0',
  'Go 1.15.6',
  'Haskell GHC 8.10.1',
  'Java 1.8.0_241', 'Java 11.0.6',
  'Kotlin 1.4.0',
  'OCaml 4.02.1',
  'Delphi 7', 'Free Pascal 3.0.2', 'PascalABC.NET 3.4.2',
  'Perl 5.20.1',
  'PHP 7.2.13',
  'Python 2.7.18', 'Python 3.9.1', 'PyPy 2.7 (7.3.0)', 'PyPy 3.7 (7.3.0)',
  'Ruby 3.0.0',
  'Rust 1.49.0',
  'Scala 2.12.8',
  'JavaScript V8 4.8.0', 'Node.js 12.6.3'
];

// Grouped languages for UI —— 与原版逐字一致
export const HOJ_ALL_LANGS_GROUPED = [
  { name: 'C++',        langs: ['C++', 'C++ With O2', 'C++ 17', 'C++ 17 With O2', 'C++ 20', 'C++ 20 With O2'] },
  { name: 'C',          langs: ['C', 'C With O2'] },
  { name: 'Python',     langs: ['Python3', 'Python2', 'PyPy3', 'PyPy2'] },
  { name: 'Java',       langs: ['Java'] },
  { name: 'Golang',     langs: ['Golang'] },
  { name: 'C#',         langs: ['C#'] },
  { name: 'PHP',        langs: ['PHP'] },
  { name: 'JavaScript', langs: ['JavaScript Node', 'JavaScript V8'] },
  { name: 'Ruby',       langs: ['Ruby'] },
  { name: 'Rust',       langs: ['Rust'] }
];

export const CF_LANG_GROUPED = [
  { name: 'C++',        langs: ['GNU G++17', 'GNU G++20', 'GNU G++23',
                                'Clang++17 Diagnostics',
                                'Microsoft Visual C++ 2017'] },
  { name: 'C#',         langs: ['C# Mono 6.8', 'C# 8, .NET Core 3.1'] },
  { name: 'D',          langs: ['D DMD32 v2.091.0'] },
  { name: 'Go',         langs: ['Go 1.15.6'] },
  { name: 'Haskell',    langs: ['Haskell GHC 8.10.1'] },
  { name: 'Java',       langs: ['Java 1.8.0_241', 'Java 11.0.6'] },
  { name: 'Kotlin',     langs: ['Kotlin 1.4.0'] },
  { name: 'OCaml',      langs: ['OCaml 4.02.1'] },
  { name: 'Pascal',     langs: ['Delphi 7', 'Free Pascal 3.0.2',
                                'PascalABC.NET 3.4.2'] },
  { name: 'Perl',       langs: ['Perl 5.20.1'] },
  { name: 'PHP',        langs: ['PHP 7.2.13'] },
  { name: 'Python',     langs: ['Python 2.7.18', 'Python 3.9.1',
                                'PyPy 2.7 (7.3.0)', 'PyPy 3.7 (7.3.0)'] },
  { name: 'Ruby',       langs: ['Ruby 3.0.0'] },
  { name: 'Rust',       langs: ['Rust 1.49.0'] },
  { name: 'Scala',      langs: ['Scala 2.12.8'] },
  { name: 'JavaScript', langs: ['JavaScript V8 4.8.0', 'Node.js 12.6.3'] }
];

let _hojSelectedLang: string | null = null;
let _hojSelectedCFLang: string | null = null;
let _hojUseCFLang = false;

export const HOJ_DEFAULT_LANG = 'C++';
export const CF_DEFAULT_LANG = 'GNU G++17';

/* 归一化规则：从上往下依次匹配，先命中先返回（与原版一致） */
const LANG_NORMALIZE_RULES: Array<{ canonical: string; match: RegExp }> = [
  { canonical: 'C++ 20 With O2', match: /c\+\+\s*20\s*with\s*o2/i },
  { canonical: 'C++ 17 With O2', match: /c\+\+\s*17\s*with\s*o2/i },
  { canonical: 'C++ With O2',    match: /^c\+\+\s*with\s*o2/i },
  { canonical: 'C++ 20',         match: /c\+\+\s*20/i },
  { canonical: 'C++ 17',         match: /c\+\+\s*17/i },
  { canonical: 'C++',            match: /^c\+\+\s*$/i },
  { canonical: 'C With O2',      match: /^c\s+with\s*o2/i },
  { canonical: 'C',              match: /^c\s*$/i },
  { canonical: 'PyPy3',          match: /^pypy\s*3/i },
  { canonical: 'PyPy2',          match: /^pypy\s*2/i },
  { canonical: 'Python3',        match: /^python\s*3|^py3/i },
  { canonical: 'Python2',        match: /^python\s*2|^py2/i },
  { canonical: 'Golang',         match: /^go(lang)?\s*$/i },
  { canonical: 'Java',           match: /^java\s*$/i },
  { canonical: 'C#',             match: /^c#|csharp/i },
  { canonical: 'PHP',            match: /^php/i },
  { canonical: 'JavaScript Node',match: /javascript.*node|node.*js/i },
  { canonical: 'JavaScript V8',  match: /javascript|v8/i },
  { canonical: 'Ruby',           match: /^ruby/i },
  { canonical: 'Rust',           match: /^rust/i }
];

/**
 * 将任意语言名归一化到 20 种规范之一；无法识别返回 null。
 * 返回值会**原样发给后端**，所以绝不能返回 "Python 3" 这类带空格的形式。
 */
function matchKnownLanguage(raw: string): string | null {
  const s = String(raw == null ? '' : raw).trim();
  if (!s) return null;

  // 已经是规范名 → 直接返回（避免被规则二次改写）
  if (HOJ_CANONICAL_LANGS.includes(s)) return s;

  for (const { canonical, match } of LANG_NORMALIZE_RULES) {
    if (match.test(s)) return canonical;
  }
  return null;
}

export function readStoredLanguage(): string | null {
  try {
    const raw = localStorage.getItem(HOJ_LANG_STORAGE_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    return matchKnownLanguage(obj?.language);
  } catch { return null; }
}

export function writeStoredLanguage(lang: string): void {
  try {
    const raw = localStorage.getItem(HOJ_LANG_STORAGE_KEY);
    const obj = raw ? JSON.parse(raw) : {};
    obj.language = lang;
    localStorage.setItem(HOJ_LANG_STORAGE_KEY, JSON.stringify(obj));
  } catch (e) {
    console.warn('[SubmitOverride] 写入语言失败:', e);
  }
}

export function readStoredCFLanguage(): string | null {
  try {
    const raw = localStorage.getItem(HOJ_LANG_STORAGE_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    const lang = obj?.cfLanguage;
    if (!lang) return null;
    return CF_LANGS.includes(lang) ? lang : null;
  } catch { return null; }
}

export function writeStoredCFLanguage(lang: string): void {
  try {
    const raw = localStorage.getItem(HOJ_LANG_STORAGE_KEY);
    const obj = raw ? JSON.parse(raw) : {};
    obj.cfLanguage = lang;
    localStorage.setItem(HOJ_LANG_STORAGE_KEY, JSON.stringify(obj));
  } catch (e) {
    console.warn('[SubmitOverride] 写入 CF 语言失败:', e);
  }
}

function normalizeLanguage(lang: string): string {
  return matchKnownLanguage(lang) || HOJ_DEFAULT_LANG;
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

export function openLanguagePicker(groups: Array<{ name: string; langs: string[] }>, isCF: boolean): void {
  const current = isCF
    ? (_hojSelectedCFLang || CF_DEFAULT_LANG)
    : (_hojSelectedLang || HOJ_DEFAULT_LANG);

  const wrap = document.createElement('div');
  wrap.className = 'hoj-lang-picker';

  groups.forEach(group => {
    const groupEl = document.createElement('div');
    groupEl.className = 'hoj-lang-picker__group';

    const titleEl = document.createElement('div');
    titleEl.className = 'hoj-lang-picker__title';
    titleEl.textContent = group.name;
    groupEl.appendChild(titleEl);

    const itemsEl = document.createElement('div');
    itemsEl.className = 'hoj-lang-picker__items';

    group.langs.forEach(lang => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hoj-lang-picker__item';
      if (lang === current) btn.classList.add('is-selected');
      btn.dataset.lang = lang;
      btn.textContent = lang;
      itemsEl.appendChild(btn);
    });

    groupEl.appendChild(itemsEl);
    wrap.appendChild(groupEl);
  });

  const close = openCustomDialog({
    title: WebI18n.t('submit.chooseLang'),
    bodyEl: wrap,
    width: '620px',
    maxHeight: '70vh'
  });

  wrap.addEventListener('click', (e) => {
    const item = (e.target as HTMLElement).closest('.hoj-lang-picker__item') as HTMLElement | null;
    if (!item) return;
    e.preventDefault();
    e.stopPropagation();

    const lang = item.dataset.lang || '';

    if (isCF) {
      _hojSelectedCFLang = lang;
      writeStoredCFLanguage(lang);
    } else {
      _hojSelectedLang = lang;
      writeStoredLanguage(lang);
    }

    const label = document.querySelector('#hoj-lang-trigger .hoj-lang-trigger__label');
    if (label) label.textContent = lang;

    close();
  });
}

function _getCurrentLanguage(): string | null {
  const langSelect = document.querySelector('#js-right-header .el-select') as HTMLSelectElement;
  return langSelect?.value || null;
}

function _hojSyncNativeSelect(lang: string): void {
  const nativeSelect = document.querySelector('#js-right-header .el-select') as HTMLSelectElement;
  if (!nativeSelect) return;

  // Try to find matching option
  for (const opt of nativeSelect.options) {
    if (opt.value === lang || matchKnownLanguage(opt.value) === lang) {
      nativeSelect.value = opt.value;
      nativeSelect.dispatchEvent(new Event('change'));
      nativeSelect.dispatchEvent(new Event('input'));
      break;
    }
  }
}

let languageTriggerInjected = false;

export function injectLanguageTrigger(): void {
  if (languageTriggerInjected) return;

  // Only inject on problem pages
  const isProblemPage = /^\/problem\/[^\/?#]+/.test(window.location.pathname);
  if (!isProblemPage) return;

  // Find the native language select in the right header (matching reference)
  const langSelect = document.querySelector('#js-right-header .el-select');
  if (!langSelect) return;

  languageTriggerInjected = true;
  
  // Hide the native select
  langSelect.style.display = 'none';

  // Determine if CF remote
  const isCFRemote = /^\/problem\/CF-/.test(window.location.pathname);
  _hojUseCFLang = isCFRemote;

  if (isCFRemote) {
    if (!_hojSelectedCFLang) {
      _hojSelectedCFLang = readStoredCFLanguage() || CF_DEFAULT_LANG;
      writeStoredCFLanguage(_hojSelectedCFLang);
    }
  } else {
    if (!_hojSelectedLang) {
      _hojSelectedLang = readStoredLanguage() || HOJ_DEFAULT_LANG;
      writeStoredLanguage(_hojSelectedLang);
    }
  }

  const trigger = document.createElement('button');
  trigger.id = 'hoj-lang-trigger';
  trigger.type = 'button';
  trigger.className = 'el-button el-button--default el-button--small';
  trigger.dataset.mode = isCFRemote ? 'cf' : 'hoj';
  trigger.innerHTML = `<i class="el-icon-arrow-down"></i><span class="hoj-lang-trigger__label"></span>`;
  trigger.querySelector('.hoj-lang-trigger__label')!.textContent =
    isCFRemote ? _hojSelectedCFLang || CF_DEFAULT_LANG : _hojSelectedLang || HOJ_DEFAULT_LANG;

  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const groups = isCFRemote ? CF_LANG_GROUPED : HOJ_ALL_LANGS_GROUPED;
    openLanguagePicker(groups, isCFRemote);
  });

  // Insert trigger after the native select (matching reference)
  langSelect.parentElement?.appendChild(trigger);
  console.log('[LanguageTrigger] 注入语言触发器');
}

export function updateTriggerLabel(): void {
  const trigger = document.getElementById('hoj-lang-trigger');
  if (!trigger) return;
  const label = trigger.querySelector('.hoj-lang-trigger__label');
  if (label) {
    label.textContent = _hojUseCFLang ? (_hojSelectedCFLang || CF_DEFAULT_LANG) : (_hojSelectedLang || HOJ_DEFAULT_LANG);
  }
}
/* ============================================================
 * 对外状态访问器（供「提交接管」复用）
 * ============================================================ */
export function getSelectedLang(): string | null { return _hojSelectedLang; }
export function setSelectedLang(lang: string): void { _hojSelectedLang = lang; }
export function getSelectedCFLang(): string | null { return _hojSelectedCFLang; }
export function setSelectedCFLang(lang: string): void { _hojSelectedCFLang = lang; }
export function getUseCFLang(): boolean { return _hojUseCFLang; }
export function setUseCFLang(v: boolean): void { _hojUseCFLang = v; }
export function normalizeLang(lang: string): string { return normalizeLanguage(lang); }
