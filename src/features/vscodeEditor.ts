/**
 * VS Code Style Editor (Monaco)
 *
 * 设计要点
 * --------
 * 站点（Vue）把代码绑定在 CodeMirror 实例上，原生「提交评测」「在线自测」
 * 都从那里取值。因此**不能**直接替换 CodeMirror，否则站点读到空代码。
 *
 * 这里采用「编辑层叠加」：
 *   - CodeMirror 保持原样并隐藏，作为唯一的真实数据源（single source of truth）
 *   - Monaco 覆盖在它的位置上，用户实际编辑 Monaco
 *   - Monaco → CodeMirror：实时写回，让站点/脚本始终拿到最新代码
 *   - CodeMirror → Monaco：反向同步（站点重置代码、切换语言时）
 *   - 关闭开关时彻底还原，不留痕迹
 */

import { saveConfig } from '../core/config.js';
import type { Config } from '../core/config.js';
import { NewAlert, openCustomDialog } from '../core/api.js';

const MONACO_CDN = 'https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/monaco-editor/0.45.0/min';
const WRAP_ID = 'hoj-vscode-wrap';
const HOST_ID = 'hoj-vscode-host';

type MonacoNS = any;

let _monacoLoading: Promise<MonacoNS> | null = null;
let _editor: any = null;
let _cm: any = null;
let _wrap: HTMLElement | null = null;
let _mounting = false;         // await 期间的挂载哨兵，防止重复挂载
let _appliedTheme = '';        // 已应用的主题，避免重复 setTheme 触发 observer
let _appliedFontSize = 0;
let _appliedTabSize = 0;
let _syncing = false;          // 防止双向同步互相触发
let _failedKey = '';           // 失败过的 (url|cm) 组合，避免每帧重试刷屏
let _lastSyncAt = 0;
let _disposers: Array<() => void> = [];
let _cmListener: (() => void) | null = null;
let _activeCm: any = null;
/** 重新测量并同步容器高度（供外部在窗口/布局变化时调用） */
let _syncHeight: (() => void) | null = null;
/** 待应用的设置（编辑器就绪前暂存，避免面板改动丢失） */
let _pendingSettings: { theme: string; fontSize: number; tabSize: number } | null = null;

/* ============================================================
 * Monaco 加载
 * ============================================================ */

/**
 * 取页面真正的 window。
 * userscript 沙箱里的 window 与页面 window 不是同一个对象：
 * 脚本由 <script> 注入后，loader 会把 require/monaco 挂到**页面** window 上，
 * 沙箱侧读 window.require 永远是 undefined（这正是之前的报错原因）。
 */
function _pageWindow(): any {
  // @ts-ignore - unsafeWindow 由 userscript 环境提供
  return (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
}

function loadMonaco(): Promise<MonacoNS> {
  const w = _pageWindow();
  if (w.monaco) return Promise.resolve(w.monaco);
  if (_monacoLoading) return _monacoLoading;

  _monacoLoading = new Promise((resolve, reject) => {
    // AMD loader
    if (!w.require || !w.require.config) {
      const s = document.createElement('script');
      s.src = `${MONACO_CDN}/vs/loader.js`;
      s.async = true;
      s.onload = () => initMonaco(resolve, reject);
      s.onerror = () => reject(new Error('Monaco loader 加载失败'));
      (document.head || document.documentElement).appendChild(s);
    } else {
      initMonaco(resolve, reject);
    }
  });

  return _monacoLoading;
}

function initMonaco(resolve: (m: MonacoNS) => void, reject: (e: Error) => void): void {
  const w = _pageWindow();
  try {
    // 兜底：loader.js 尚未就绪时，require 可能还没挂上
    if (!w.require || typeof w.require.config !== 'function') {
      reject(new Error('AMD loader 未就绪（require.config 不可用）'));
      return;
    }
    w.require.config({ paths: { vs: `${MONACO_CDN}/vs` } });
    w.require(['vs/editor/editor.main'], () => {
      if (w.monaco) resolve(w.monaco);
      else reject(new Error('Monaco 未挂载到页面 window'));
    }, (err: any) => reject(new Error('Monaco 模块加载失败: ' + (err && err.message ? err.message : err))));
  } catch (e) {
    reject(e as Error);
  }
}

/* ============================================================
 * 工具
 * ============================================================ */

/** 找到当前题目页的 CodeMirror 实例（与原版一致的选择器优先级） */
function findCodeMirror(): any {
  const el = (document.querySelector('.vue-codemirror-wrap .CodeMirror')
    || document.querySelector('.CodeMirror')) as any;
  if (el && el.CodeMirror && typeof el.CodeMirror.getValue === 'function') {
    return el.CodeMirror;
  }
  for (const ta of Array.from(document.querySelectorAll('textarea')) as any[]) {
    if (ta.CodeMirror && typeof ta.CodeMirror.getValue === 'function') {
      return ta.CodeMirror;
    }
  }
  return null;
}

/** HOJ 语言名 → Monaco language id */
function toMonacoLang(lang: string | null | undefined): string {
  const s = String(lang || '').toLowerCase();
  if (/c\+\+|cpp|g\+\+|gcc/.test(s)) return 'cpp';
  if (/^c(\s|$)|^c\b/.test(s)) return 'c';
  if (/python|pypy|^py\d?/.test(s)) return 'python';
  if (/java(?!script)/.test(s)) return 'java';
  if (/javascript|node|^js$/.test(s)) return 'javascript';
  if (/^go|golang/.test(s)) return 'go';
  if (/rust/.test(s)) return 'rust';
  if (/c#|csharp/.test(s)) return 'csharp';
  if (/php/.test(s)) return 'php';
  if (/ruby/.test(s)) return 'ruby';
  if (/kotlin/.test(s)) return 'kotlin';
  if (/scala/.test(s)) return 'scala';
  if (/swift/.test(s)) return 'swift';
  if (/pascal|delphi/.test(s)) return 'pascal';
  if (/haskell/.test(s)) return 'haskell';
  return 'cpp';
}

/** 读取站点原生语言选择框当前值 */
function currentLanguage(): string | null {
  const el = document.querySelector('#js-right-header .select-row .el-select .el-input__inner') as HTMLInputElement | null;
  if (el && el.value) return el.value.trim();
  const item = document.querySelector('#js-right-header .select-row .el-select-dropdown__item.selected');
  if (item) return (item.textContent || '').trim();
  return null;
}

/** 读取 HOJ 保存的编辑器设置（主题/字号/Tab），失败时用默认值 */
/* ---------- 站点编辑器设置（主题 / 字号 / Tab） ---------- */

/** 站点的 CodeMirror 主题名 → Monaco 主题 */
const THEME_CM_TO_MONACO: Record<string, string> = {
  'monokai': 'vs-dark',
  'molarized light': 'vs',
  'molarized dark': 'vs-dark',
  'material': 'vs-dark',
  'idea': 'vs',
  'eclipse': 'vs',
  'base16-dark': 'vs-dark',
  'cobalt': 'vs-dark',
  'dracula': 'vs-dark',
  'solarized': 'vs',
  'default': 'vs-dark'
};

/** Monaco 主题 → 站点存储里记的值（反向写回时用） */
function monacoThemeToStored(monacoTheme: string): string {
  return monacoTheme === 'vs' ? 'molarized light' : 'monokai';
}

/** 站点保存编辑器设置的 localStorage key */
function _settingKey(): string | null {
  const m = window.location.pathname.match(/^\/problem\/([^\/?#]+)/);
  if (!m) return null;
  return `hojProblemCodeAndSetting_NoContest_${decodeURIComponent(m[1])}`;
}

function _readSiteSettings(): any {
  const key = _settingKey();
  if (!key) return {};
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) || {}) : {};
  } catch { return {}; }
}

function _writeSiteSettings(patch: Record<string, any>): void {
  const key = _settingKey();
  if (!key) return;
  try {
    const cur = _readSiteSettings();
    Object.assign(cur, patch);
    // 补齐 HOJ 约定字段，避免写残缺数据
    if (typeof cur.language !== 'string') cur.language = 'C++';
    if (typeof cur.theme !== 'string') cur.theme = 'monokai';
    if (typeof cur.fontSize !== 'string') cur.fontSize = '14px';
    if (typeof cur.tabSize !== 'number') cur.tabSize = 4;
    localStorage.setItem(key, JSON.stringify(cur));
  } catch (e) {
    console.warn('[VSCode] 写入站点编辑器设置失败:', e);
  }
}

/**
 * 读取生效的编辑器设置。
 *
 * 【唯一真源】脚本设置面板（config.VSCode*）。
 * 站点 localStorage 里的 theme/fontSize/tabSize 只在面板从未设置过时
 * 作为一次性初始值，之后一律以面板为准 —— 面板改了必须立刻反映到编辑器。
 */
function readEditorSettings(config: Config): { theme: string; fontSize: number; tabSize: number; themeName: string } {
  // ---- 主题 ----
  // config.VSCodeTheme 存**站点主题名**（monokai / dracula / ...），
  // 与齿轮弹窗里的选项完全同一套，再映射成 Monaco 主题。
  let themeName = String(config.VSCodeTheme || '').trim().toLowerCase();

  // 兼容早期版本存过的 Monaco 主题名
  if (themeName === 'vs' || themeName === 'vs-dark' || themeName === 'hc-black') {
    themeName = monacoThemeToStored(themeName).toLowerCase();
  }
  // 仍然不认识 → 用站点存储兜底，再不行用 monokai
  if (!THEME_CM_TO_MONACO[themeName]) {
    const site = _readSiteSettings();
    const siteTheme = typeof site.theme === 'string' ? site.theme.toLowerCase().trim() : '';
    themeName = THEME_CM_TO_MONACO[siteTheme] ? siteTheme : 'monokai';
  }

  const theme = THEME_CM_TO_MONACO[themeName] || 'vs-dark';

  // ---- 字号 ----
  const cfgFont = parseInt(String(config.VSCodeFontSize || ''), 10);
  const fontSize = Math.max(10, Math.min(32, Number.isFinite(cfgFont) && cfgFont > 0 ? cfgFont : 14));

  // ---- Tab ----
  const cfgTab = Number(config.VSCodeTabSize);
  const tabSize = Math.max(1, Math.min(8, Number.isFinite(cfgTab) && cfgTab > 0 ? cfgTab : 4));

  return { theme, fontSize, tabSize, themeName };
}

/* ============================================================
 * 接管站点齿轮按钮 → 打开我们自己的编辑器设置弹窗
 *
 * 不再去改站点那个 el-popover（它的 el-select 是 Vue 托管的，
 * 用 DOM 伪造 selected 类无法真正改变 Vue 状态，改完还会被覆盖）。
 * 这里直接在捕获阶段拦掉齿轮的 click，打开自己的 Dialog。
 * ============================================================ */

/** 当前生效的配置（供弹窗使用） */
let _hookConfig: Config | null = null;

/**
 * 找到站点右上角的齿轮按钮。
 *
 * 真实结构（来自站点源码 CodeMirror.vue）：
 *   #js-right-header
 *     └ .select-row.fl-right
 *         └ span.el-popover__reference-wrapper
 *             └ button.el-button.el-popover__reference > i.el-icon-s-tools
 *
 * 注意 #js-right-header 里可能有多个 .el-popover__reference，
 * 必须挑「带齿轮图标」的那一个，否则会误拦上传按钮。
 */
function findGearButton(): HTMLElement | null {
  const header = document.querySelector('#js-right-header');
  if (!header) return null;

  // 1) 最精确：齿轮图标所在的 button
  const icon = header.querySelector('i.el-icon-s-tools');
  if (icon) {
    const btn = icon.closest('button');
    if (btn) return btn as HTMLElement;
  }

  // 2) 次选：.select-row.fl-right 里的 el-popover__reference
  const ref = header.querySelector('.select-row.fl-right .el-popover__reference')
    || header.querySelector('.fl-right .el-popover__reference');
  if (ref) {
    const btn = ref.closest('button') || ref;
    return btn as HTMLElement;
  }

  return null;
}

/** 主题选项（与站点一致） */
const THEME_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'monokai', label: 'Monokai' },
  { value: 'molarized light', label: 'Molarized Light' },
  { value: 'material', label: 'Material' },
  { value: 'idea', label: 'IDEA' },
  { value: 'eclipse', label: 'Eclipse' },
  { value: 'base16-dark', label: 'Base16-dark' },
  { value: 'cobalt', label: 'Cobalt' },
  { value: 'dracula', label: 'Dracula' }
];

const FONT_OPTIONS = ['12px', '14px', '16px', '18px', '20px'];
const TAB_OPTIONS = [
  { value: 2, label: '2 个空格' },
  { value: 4, label: '4 个空格' },
  { value: 8, label: '8 个空格' }
];

/** 把小节标题样式套用给弹窗内的分组 */
function sectionLabel(text: string): HTMLElement {
  const el = document.createElement('div');
  el.textContent = text;
  el.style.cssText = 'font-size:12px;font-weight:600;opacity:.7;margin:14px 0 6px;';
  return el;
}

/** 生成一行「标签 + 按钮组」 */
function optionRow<T>(
  label: string,
  options: Array<{ value: T; label: string }>,
  current: T,
  onPick: (v: T) => void
): HTMLElement {
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;flex-direction:column;gap:6px;';

  const nameEl = document.createElement('div');
  nameEl.textContent = label;
  nameEl.style.cssText = 'font-size:13px;font-weight:600;opacity:.85;';
  row.appendChild(nameEl);

  const group = document.createElement('div');
  group.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;';

  const btns: Array<{ el: HTMLButtonElement; value: T }> = [];

  /** 按选中状态重绘所有按钮（样式集中管理，避免逐条字符串替换出错） */
  const paint = (selected: T) => {
    btns.forEach(({ el, value }) => {
      const on = String(value) === String(selected);
      el.style.cssText = [
        'padding:5px 12px',
        'font-size:12px',
        'font-family:inherit',
        'cursor:pointer',
        'border-radius:5px',
        'transition:background .12s,border-color .12s,color .12s',
        on
          ? 'background:#409EFF;border:1px solid #409EFF;color:#fff;font-weight:600;'
          : 'background:transparent;border:1px solid rgba(0,0,0,.15);color:inherit;'
      ].join(';');
    });
  };

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = opt.label;
    btn.dataset.value = String(opt.value);
    btn.addEventListener('click', () => {
      paint(opt.value);
      onPick(opt.value);
    });
    btns.push({ el: btn, value: opt.value });
    group.appendChild(btn);
  });

  paint(current);

  row.appendChild(group);
  return row;
}

/**
 * 提交一次编辑器设置改动。
 *
 * 单一真源是 config（面板），流程：
 *   1. 写入 config 并持久化
 *   2. 同步写一份到站点 localStorage（让站点刷新后也能记住）
 *   3. 刷新设置面板里对应的下拉框，两处显示始终一致
 *   4. 立即应用到 Monaco
 */
export function commitEditorSetting(patch: {
  theme?: string;
  fontSize?: string;
  tabSize?: number;
}): void {
  const cfg = _hookConfig;
  if (!cfg) return;

  if (patch.theme !== undefined) cfg.VSCodeTheme = patch.theme;
  if (patch.fontSize !== undefined) {
    const n = parseInt(String(patch.fontSize), 10);
    if (Number.isFinite(n) && n > 0) cfg.VSCodeFontSize = String(n);
  }
  if (patch.tabSize !== undefined) {
    const n = Number(patch.tabSize);
    if (Number.isFinite(n) && n > 0) cfg.VSCodeTabSize = String(n);
  }

  saveConfig(cfg);

  // 顺带同步到站点存储（不影响读取优先级）
  const sitePatch: Record<string, any> = {};
  // patch.theme 本身就是站点主题名（monokai/dracula/...），直接写入即可
  if (patch.theme !== undefined) sitePatch.theme = patch.theme;
  if (patch.fontSize !== undefined) sitePatch.fontSize = `${parseInt(patch.fontSize, 10)}px`;
  if (patch.tabSize !== undefined) sitePatch.tabSize = Number(patch.tabSize);
  if (Object.keys(sitePatch).length) _writeSiteSettings(sitePatch);

  // 刷新面板控件，避免两处不一致（面板此刻可能正开着）
  syncPanelControls(cfg);   // 同步立即生效（不依赖动态 import）
  refreshPanelUI();         // 再走完整刷新（含 el-select 显示文本、颜色预览）

  // 立即应用到编辑器
  applyEditorSettingsNow();
}

/**
 * 刷新设置面板 UI。
 * 用动态 import 避免 vscodeEditor ↔ panel 的循环依赖。
 */
function refreshPanelUI(): void {
  import('../settings/panel.ts')
    .then(m => {
      try { m.refreshSettingsPanel(); } catch (_) {}
    })
    .catch(() => {});
}

/** 兜底：直接改面板里的下拉框（refreshPanelUI 失败时也保证一致） */
function syncPanelControls(cfg: Config): void {
  try {
    const panel = document.getElementById('hoj-settings-panel');
    if (!panel) return;

    const t = panel.querySelector('select[data-key="VSCodeTheme"]') as HTMLSelectElement | null;
    if (t) t.value = String(cfg.VSCodeTheme || 'monokai');

    const f = panel.querySelector('select[data-key="VSCodeFontSize"]') as HTMLSelectElement | null;
    if (f) f.value = String(parseInt(String(cfg.VSCodeFontSize || ''), 10) || 14);

    const s = panel.querySelector('select[data-key="VSCodeTabSize"]') as HTMLSelectElement | null;
    if (s) s.value = String(Number(cfg.VSCodeTabSize) || 4);
  } catch (e) {
    console.warn('[VSCode] 同步面板控件失败:', e);
  }
}

/** 打开「编辑器设置」弹窗 */
export function openEditorSettingsDialog(): void {
  const cfg = _hookConfig;

  // 当前值一律以面板（config）为准
  // 主题值与面板、THEME_OPTIONS 完全同一套（站点主题名）
  const themeVal = String(cfg?.VSCodeTheme || 'monokai').toLowerCase().trim();
  const curTheme = THEME_OPTIONS.some(o => o.value === themeVal) ? themeVal : 'monokai';

  const fontVal = String(parseInt(String(cfg?.VSCodeFontSize || ''), 10) || 14);
  const curFont = FONT_OPTIONS.includes(fontVal) ? fontVal : '14';

  const tabVal = Number(cfg?.VSCodeTabSize) || 4;
  const curTab = TAB_OPTIONS.some(o => o.value === tabVal) ? tabVal : 4;

  const wrap = document.createElement('div');

  const tip = document.createElement('div');
  tip.textContent = '这些设置与「Better HOJ 设置面板」共用同一份配置，改动会立即应用并保存。';
  tip.style.cssText = 'font-size:12px;opacity:.65;line-height:1.6;margin-bottom:4px;';
  wrap.appendChild(tip);

  /* ---- 主题 ---- */
  wrap.appendChild(sectionLabel('主题'));
  wrap.appendChild(optionRow(
    '代码配色',
    THEME_OPTIONS,
    curTheme,
    (v) => { commitEditorSetting({ theme: v }); }
  ));

  /* ---- 字体大小 ---- */
  wrap.appendChild(sectionLabel('字体大小'));
  wrap.appendChild(optionRow(
    '编辑器字号',
    FONT_OPTIONS.map(f => ({ value: f, label: f })),
    curFont,
    (v) => { commitEditorSetting({ fontSize: v }); }
  ));

  /* ---- Tab 长度 ---- */
  wrap.appendChild(sectionLabel('Tab 长度'));
  wrap.appendChild(optionRow(
    'Tab 宽度',
    TAB_OPTIONS,
    curTab,
    (v) => { commitEditorSetting({ tabSize: v }); }
  ));

  openCustomDialog({
    title: '编辑器设置',
    bodyEl: wrap,
    width: '420px',
    maxHeight: '70vh'
  });
}


/**
 * 读存储并立即应用到 Monaco。
 * 供面板与齿轮弹窗共用。
 */
export function applyEditorSettingsNow(config?: Config): void {
  if (config) _hookConfig = config;
  const cfg = _hookConfig;
  if (!cfg) return;

  const next = readEditorSettings(cfg);

  // 编辑器还没就绪（未挂载 / 正在加载）时**不能丢弃**这次改动：
  // 记进 _pendingSettings，等挂载完成后由 applyPendingSettings() 补上。
  if (!_editor) {
    _pendingSettings = next;
    console.log('[VSCode] 编辑器未就绪，已暂存设置:', next);
    return;
  }

  applySettingsToEditor(next);
}

/** 把一组设置真正写进 Monaco（幂等：值没变就不碰 DOM） */
function applySettingsToEditor(next: { theme: string; fontSize: number; tabSize: number }): void {
  if (!_editor) return;

  const themeChanged = next.theme !== _appliedTheme;
  const sizeChanged = next.fontSize !== _appliedFontSize || next.tabSize !== _appliedTabSize;
  if (!themeChanged && !sizeChanged) return;

  try {
    const w = _pageWindow();
    if (themeChanged) {
      w.monaco?.editor?.setTheme(next.theme);
      _appliedTheme = next.theme;
    }
    if (sizeChanged) {
      _editor.updateOptions({ fontSize: next.fontSize, tabSize: next.tabSize });
      _appliedFontSize = next.fontSize;
      _appliedTabSize = next.tabSize;
    }
    console.log('[VSCode] 已应用编辑器设置:', next);
  } catch (e) {
    console.warn('[VSCode] 应用编辑器设置失败:', e);
  }
}

/** 挂载完成后调用：把暂存的设置刷进去 */
function applyPendingSettings(): void {
  if (!_pendingSettings || !_editor) return;
  const p = _pendingSettings;
  _pendingSettings = null;
  applySettingsToEditor(p);
}

/**
 * 接管齿轮按钮（幂等，每次 tryInject 调用都安全）。
 * 用 dataset 标记避免重复绑定。
 */
export function hookSiteEditorSettings(config?: Config): void {
  // 保证齿轮弹窗能读写面板配置（即使编辑器还没挂载）
  if (config) _hookConfig = config;

  const btn = findGearButton();
  if (!btn) return;
  if (btn.dataset.hojVscodeGearHooked === '1') return;

  btn.dataset.hojVscodeGearHooked = '1';

  // capture 阶段拦掉，阻止站点弹出它自己的 el-popover
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    openEditorSettingsDialog();
  }, true);

  console.log('[VSCode] 已接管站点齿轮按钮');
}

/* ============================================================
 * 挂载 / 卸载
 * ============================================================ */

/**
 * 在 CodeMirror 上方挂载 Monaco。
 * 已挂载则只同步参数。
 */
export async function mountVSCodeEditor(config: Config): Promise<boolean> {
  if (!config.VSCodeEditor) return false;
  _hookConfig = config;

  // 关键：await loadMonaco() 期间 _editor 仍为 null，
  // 若此时又被 tryInject 调进来，会重复创建 wrap 并无限触发 MutationObserver。
  if (_mounting) return false;

  const cm = findCodeMirror();
  if (!cm) return false;                     // 编辑器还没渲染好

  const cmEl = cm.getWrapperElement?.() as HTMLElement | null;
  if (!cmEl) return false;

  // 已经挂载且绑定的是同一个 CodeMirror → 只更新设置
  if (_editor && _cm === cm && _wrap?.isConnected) {
    applyEditorOptions(config);
    return true;
  }

  // 绑定了别的实例（切题重建）→ 先清理
  if (_editor) destroyVSCodeEditor();

  let monaco: MonacoNS;
  _mounting = true;
  try {
    monaco = await loadMonaco();
  } catch (e) {
    console.error('[VSCode] Monaco 加载失败:', e);
    _mounting = false;
    _monacoLoading = null;          // 允许下次重试
    _failedKey = String(window.location.pathname);
    NewAlert('VS Code 编辑器加载失败，已回退到原生编辑器', 'error');
    return false;
  }

  _cm = cm;

  /* ---------- 容器 ---------- */
  // 高度必须沿用站点给 CodeMirror 设定的值，不能写死。
  // 站点在 resizeWatchHeight() 里动态计算：
  //   problemRightHight = problemLeftHight - 95 - (jsRightHeaderH - 36) - (jsRightBottomH - 48)
  // 并通过 editor.setSize('100%', this.height) 写到 .CodeMirror 的 inline style 上。
  const wrap = document.createElement('div');
  wrap.id = WRAP_ID;
  wrap.style.cssText = 'position:relative;width:100%;height:100%;min-height:0;';

  const host = document.createElement('div');
  host.id = HOST_ID;
  host.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';

  wrap.appendChild(host);

  // 关键：不要用 display:none 隐藏 CodeMirror。
  // 站点计算高度时会读 js-right-header / js-right-bottom 的 offsetHeight，
  // 而 display:none 会让父链上的块塌陷，导致左右两栏高度对不齐。
  // 改为「原地隐藏但保留占位」：visibility + position:absolute 不参与布局，
  // 同时把它的高度同步给 wrap，保证视觉高度与站点计算完全一致。
  // 隐藏前先量一次真实高度并缓存：
  // 一旦设成 height:0，后续 getBoundingClientRect() 就量不到了。
  cmEl.parentNode?.insertBefore(wrap, cmEl);
  let _cmHeight = Math.round(cmEl.getBoundingClientRect().height || cmEl.offsetHeight || 0);

  /**
   * 读取站点当前设定的编辑器高度。
   * 站点 resizeWatchHeight() 会调用 editor.setSize('100%', h)，
   * CodeMirror 把高度写成 .CodeMirror 元素上的 inline style（形如 "585px"）。
   * 我们不清掉它，只读不用，避免破坏站点的后续计算。
   */
  const readSiteHeight = (): number => {
    const inlineH = parseFloat(String(cmEl.style.height || '').replace('px', ''));
    if (Number.isFinite(inlineH) && inlineH > 0) return Math.round(inlineH);

    const liveH = cmEl.offsetHeight || cmEl.getBoundingClientRect().height || 0;
    if (liveH > 0) return Math.round(liveH);

    return _cmHeight;   // 兜底：用挂载时缓存的值
  };

  const syncHeightFromCM = () => {
    const h = readSiteHeight();
    if (h > 0) _cmHeight = h;
    if (_cmHeight > 0) {
      wrap.style.height = _cmHeight + 'px';
      if (_editor && typeof _editor.layout === 'function') {
        try { _editor.layout(); } catch (_) {}
      }
    }
  };

  // 初始应用
  if (_cmHeight > 0) wrap.style.height = _cmHeight + 'px';

  // 隐藏 CodeMirror 但保留它的高度信息：
  //   - 不设 display:none（会让父链塌陷，站点测不到 js-right-* 高度）
  //   - 不设 height:0（会覆盖站点 setSize 写入的值）
  //   - 用 visibility + 绝对定位脱离文档流，零占位但不破坏测量
  cmEl.style.position = 'absolute';
  cmEl.style.left = '-99999px';
  cmEl.style.top = '0';
  cmEl.style.visibility = 'hidden';
  cmEl.style.pointerEvents = 'none';

  _wrap = wrap;
  _syncHeight = syncHeightFromCM;

  /* ---------- 创建 Monaco ---------- */
  const settings = readEditorSettings(config);
  const lang = toMonacoLang(currentLanguage());

  _editor = monaco.editor.create(host, {
    value: cm.getValue(),
    language: lang,
    theme: settings.theme,
    fontSize: settings.fontSize,
    tabSize: settings.tabSize,
    insertSpaces: true,
    automaticLayout: true,          // 容器尺寸变化时自动布局
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    fontFamily: '"JetBrains Mono", "Fira Code", "Source Code Pro", Consolas, monospace',
    renderWhitespace: 'selection',
    smoothScrolling: true,
    cursorBlinking: 'smooth',
    wordWrap: 'off'
  });

  /* ---------- 跟随站点的高度重算 ---------- */
  // 站点在 resizeWatchHeight() 里会重设 CodeMirror 高度；
  // 监听 .CodeMirror 的尺寸变化，实时同步给 wrap。
  try {
    const ro = new ResizeObserver(() => { _syncHeight?.(); });
    ro.observe(cmEl);
    _disposers.push(() => ro.disconnect());
  } catch (_) {
    // 老浏览器不支持就没有实时跟随，窗口 resize 兜底
  }
  const onWinResize = () => { _syncHeight?.(); };
  window.addEventListener('resize', onWinResize);
  _disposers.push(() => window.removeEventListener('resize', onWinResize));

  /* ---------- Monaco → CodeMirror ---------- */
  const sub = _editor.onDidChangeModelContent(() => {
    if (_syncing) return;
    _syncing = true;
    try {
      const v = _editor.getValue();
      if (_cm.getValue() !== v) {
        const cur = _cm.getCursor?.();
        _cm.setValue(v);
        // 尽量保持光标位置，避免整篇替换后跳到开头
        if (cur && _cm.setCursor) {
          try { _cm.setCursor(cur); } catch (_) {}
        }
      }
    } finally {
      _syncing = false;
    }
  });
  _disposers.push(() => sub.dispose());

  /* ---------- CodeMirror → Monaco ---------- */
  _cmListener = () => {
    if (_syncing) return;
    _syncing = true;
    try {
      const v = _cm.getValue();
      if (_editor.getValue() !== v) _editor.setValue(v);
    } finally {
      _syncing = false;
    }
  };
  _cm.on('change', _cmListener);
  _activeCm = _cm;

  /* ---------- 跟随站点语言切换，更新 Monaco 语法 ---------- */
  const langTimer = window.setInterval(() => {
    if (!_editor) return;
    const want = toMonacoLang(currentLanguage());
    const model = _editor.getModel();
    if (model && model.getLanguageId() !== want) {
      monaco.editor.setModelLanguage(model, want);
    }
  }, 1500);
  _disposers.push(() => clearInterval(langTimer));

  // 记录已应用的设置，避免后续重复 setTheme
  _appliedTheme = settings.theme;
  _appliedFontSize = settings.fontSize;
  _appliedTabSize = settings.tabSize;

  _mounting = false;

  // 补上挂载期间用户在面板里改过的设置
  applyPendingSettings();

  console.log('[VSCode] 编辑器已挂载，语言 =', lang);
  return true;
}

/** 已挂载时更新主题/字号/Tab */
function applyEditorOptions(config: Config): void {
  if (!_editor) return;
  const s = readEditorSettings(config);

  // 关键：setTheme / updateOptions 都会改动 DOM，
  // 而 syncVSCodeEditor 由 MutationObserver 驱动 —— 值没变就绝不能碰。
  const themeChanged = s.theme !== _appliedTheme;
  const sizeChanged = s.fontSize !== _appliedFontSize || s.tabSize !== _appliedTabSize;
  if (!themeChanged && !sizeChanged) return;

  const w = _pageWindow();
  try {
    if (themeChanged) {
      w.monaco?.editor?.setTheme(s.theme);
      _appliedTheme = s.theme;
    }
    if (sizeChanged) {
      _editor.updateOptions({ fontSize: s.fontSize, tabSize: s.tabSize });
      _appliedFontSize = s.fontSize;
      _appliedTabSize = s.tabSize;
    }
  } catch (e) {
    console.warn('[VSCode] 更新编辑器选项失败:', e);
  }
}

/** 彻底卸载并还原站点原生编辑器 */
export function destroyVSCodeEditor(): void {
  _disposers.forEach(fn => { try { fn(); } catch (_) {} });
  _disposers = [];

  if (_activeCm && _cmListener) {
    try { _activeCm.off('change', _cmListener); } catch (_) {}
  }
  _cmListener = null;
  _activeCm = null;

  if (_editor) {
    try { _editor.dispose(); } catch (_) {}
    _editor = null;
  }

  if (_wrap) {
    const cmEl = _cm?.getWrapperElement?.() as HTMLElement | null;
    if (cmEl) cmEl.style.display = '';       // 还原 CodeMirror
    _wrap.remove();
    _wrap = null;
  }

  _cm = null;
  _syncHeight = null;
  _pendingSettings = null;
  _syncing = false;
  _mounting = false;
  _appliedTheme = '';
  _appliedFontSize = 0;
  _appliedTabSize = 0;
  // 允许下次重新接管站点弹窗
  document.querySelectorAll('[data-hoj-vscode-hooked]').forEach(el => {
    delete (el as HTMLElement).dataset.hojVscodeHooked;
  });
}

/** 是否已挂载 */
export function isVSCodeEditorMounted(): boolean {
  return !!(_editor && _wrap?.isConnected);
}

/** 供外部取当前代码（优先 Monaco） */
export function getEditorValue(): string {
  if (_editor) return _editor.getValue();
  const cm = findCodeMirror();
  return cm ? cm.getValue() : '';
}

/**
 * 根据当前页面/配置同步：题目页且开关打开→挂载，否则→卸载。
 * 由 tryInject 反复调用，内部保证幂等。
 */
export function syncVSCodeEditor(config: Config): void {
  _hookConfig = config;   // 面板/弹窗始终有可用的配置对象

  const isProblemPage =
    /^\/problem[\/:][^\/?#]+/.test(window.location.pathname) ||
    /^\/training\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname) ||
    /^\/contest\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname) ||
    /^\/group\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname);

  if (!isProblemPage || !config.VSCodeEditor) {
    if (_wrap || _editor) destroyVSCodeEditor();
    _failedKey = '';
    return;
  }

  // 接管站点齿轮弹窗。
  // 放在节流之前：弹窗弹出后用户可能立刻点击，不能被 300ms 节流挡掉。
  // 内部靠 dataset 标记保证幂等，开销只是一次 querySelectorAll。
  hookSiteEditorSettings(config);

  // 以下为编辑器挂载逻辑，由 MutationObserver 高频驱动，需要节流。
  const now = Date.now();
  if (now - _lastSyncAt < 300) return;
  _lastSyncAt = now;

  // 本页已失败过 → 不再重试（切换题目/重新开启时重置）
  if (_failedKey === String(window.location.pathname)) return;
  if (_mounting || _editor) { mountVSCodeEditor(config); return; }

  void mountVSCodeEditor(config);
}
