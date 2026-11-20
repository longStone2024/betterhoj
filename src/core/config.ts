/**
 * Configuration management
 * Handles default config, loading/saving, and config groups for import/export
 */

import { GM_getValue, GM_setValue } from './storage.js';
import { deepClone } from './utils.js';

export const STORAGE_KEY = 'smart_hoj_cfg_v2';

export const DEFAULT_CONFIG = {
  Open: false,
  // ============ Switches ============
  SmoothScroll: true,
  SmoothSwitch: true,
  BetterNotFound: true,
  LiquidGlassUI: false,
  DarkMode: false,
  MouseGlow: true,
  HideNewHOJ: true,

  // ============ Background ============
  ImageSource: 'Source1',
  BuiltinBackground: 'Custom',
  CustomBackground: 'None',

  // ============ Card ============
  CardBackground: 'Default',
  CardBlurRadius: 'Default',
  CardRadius: 'Default',

  // ============ List ============
  ListBackground: 'Default',
  ListBackgroundGreen: 'Default',
  ListBackgroundHover: 'Default',

  // ============ Code Block ============
  CodeBlockBackground: 'Default',
  CodeBlockRadius: 'Default',

  // ============ Input ============
  InputAreaBackground: 'Default',
  InputAreaRadius: 'Default',

  // ============ Button ============
  ButtonBackground: 'Default',
  ButtonBackgroundHover: 'Default',
  ButtonBackgroundActive: 'Default',
  ButtonRadius: 'Default',

  // ============ Tag ============
  TagRadius: 'Default',

  // ============ Tooltip ============
  TooltipBackground: 'Default',
  TooltipRadius: 'Default',

  // ============ Judge Detail ============
  JudgeDetailBlockRadius: 'Default',

  // ============ Text Colors ============
  TextDark: 'Default',
  TextDarkDisabled: 'Default',
  TextLight: 'Default',
  TextBlue: 'Default',
  TextLink: 'Default',
  SelectText: 'Default',

  // ============ Font ============
  MemorizingFont: false,
  SansFont: 'Default',
  MonoFont: 'Default',

  // ============ Login ============
  AutoLogin: false,
  DefaultUsername: '',
  DefaultPassword: '',

  // ============ Check-in ============
  CheckInEnabled: true,
  CheckInAutoPopup: true,

  // ============ Redirect ============
  EnableRedirect: false,
  AutoRedirectHost: 'ssf.hdoi.cn',
  AutoRedirectProtocol: '',

  // ============ Custom Tag ============
  CustomRankTag: '',
  CustomRankTagColor: '#18BE6A',

  // ============ CPH ============
  realCPHurl: true,

  // ============ Tools ============
  ToolsEnabled: true,
  ToolsKeystroke: false,
  ToolsPageTime: false,
  ToolsClock: false,

  // ============ Recommendations ============
  hdnoipCFName: '',

  // ============ Navbar Layout ============
  NavbarLayout: null,

  // ============ Snippets ============
  SnippetPanelHotkey: 'Ctrl+Alt+S',
  Snippets: [],

  // ============ Auto Save Code ============
  AutoSaveCode: false,
  AutoSaveCodeInterval: '30',

  // ============ VS Code Editor ============
  VSCodeEditor: false,
  VSCodeTheme: 'monokai',
  VSCodeFontSize: '14',
  VSCodeTabSize: '4',

  // ============ Settings Panel ============
  SettingsFullscreen: false,

  // ============ Vditor ============
  VditorDiscussionPublish: true,
  VditorDiscussionEdit: true,
  VditorGroupCreate: true,
  VditorUploadMode: 'disabled', // 'disabled' | 'admin' | 'group'
  VditorUploadGid: '',

  // ============ Version ============
  ShowVersion: false,

  // ============ Performance ============
  // 高性能模式：关闭 Dialog/通知的淡出动画与 mask 模糊
  PerfMode: false
};

export type Config = typeof DEFAULT_CONFIG;

// ============================================================
// Config Groups for Import/Export UI
// ============================================================
export interface ConfigGroup {
  id: string;
  name: string; // i18n key prefix, e.g., 'group.general'
  scope: 'smart' | 'better';
  keys: (keyof Config)[];
}

export const CONFIG_GROUPS: ConfigGroup[] = [
  // ---------- Smart HOJ Groups ----------
  { id: 'general', name: 'group.general', scope: 'smart',
    keys: ['Open', 'SmoothScroll', 'SmoothSwitch', 'BetterNotFound',
           'LiquidGlassUI', 'DarkMode', 'MouseGlow', 'HideNewHOJ'] },
  { id: 'background', name: 'group.background', scope: 'smart',
    keys: ['ImageSource', 'BuiltinBackground', 'CustomBackground'] },
  { id: 'card', name: 'group.card', scope: 'smart',
    keys: ['CardBackground', 'CardBlurRadius', 'CardRadius'] },
  { id: 'list', name: 'group.list', scope: 'smart',
    keys: ['ListBackground', 'ListBackgroundGreen', 'ListBackgroundHover'] },
  { id: 'code', name: 'group.codeBlock', scope: 'smart',
    keys: ['CodeBlockBackground', 'CodeBlockRadius'] },
  { id: 'input', name: 'group.input', scope: 'smart',
    keys: ['InputAreaBackground', 'InputAreaRadius'] },
  { id: 'button', name: 'group.button', scope: 'smart',
    keys: ['ButtonBackground', 'ButtonBackgroundHover',
           'ButtonBackgroundActive', 'ButtonRadius'] },
  { id: 'misc', name: 'group.misc', scope: 'smart',
    keys: ['TagRadius', 'TooltipBackground', 'TooltipRadius', 'JudgeDetailBlockRadius'] },
  { id: 'text', name: 'group.text', scope: 'smart',
    keys: ['TextDark', 'TextDarkDisabled', 'TextLight', 'TextBlue', 'TextLink', 'SelectText'] },
  { id: 'font', name: 'group.font', scope: 'smart',
    keys: ['MemorizingFont', 'SansFont', 'MonoFont'] },
  { id: 'version', name: 'group.version', scope: 'smart',
    keys: ['ShowVersion'] },
  { id: 'perf', name: 'group.perf', scope: 'better',
    keys: ['PerfMode'] },

  // ---------- Better HOJ Groups ----------
  { id: 'login', name: 'group.login', scope: 'better',
    keys: ['AutoLogin', 'DefaultUsername', 'DefaultPassword'] },
  { id: 'checkin', name: 'group.checkin', scope: 'better',
    keys: ['CheckInEnabled', 'CheckInAutoPopup'] },
  { id: 'redirect', name: 'group.redirect', scope: 'better',
    keys: ['EnableRedirect', 'AutoRedirectHost'] },
  { id: 'tag', name: 'group.tag', scope: 'better',
    keys: ['CustomRankTag', 'CustomRankTagColor'] },
  { id: 'cph', name: 'group.cph', scope: 'better',
    keys: ['realCPHurl'] },
  { id: 'tools', name: 'group.tools', scope: 'better',
    keys: ['ToolsEnabled', 'ToolsKeystroke', 'ToolsPageTime', 'ToolsClock'] },
  { id: 'vscode', name: 'group.vscode', scope: 'better',
    keys: ['VSCodeEditor', 'VSCodeTheme', 'VSCodeFontSize', 'VSCodeTabSize'] },
  { id: 'recommend', name: 'group.recommend', scope: 'better',
    keys: ['hdnoipCFName'] },
  { id: 'navbar', name: 'group.navbar', scope: 'better',
    keys: ['NavbarLayout'] },
  { id: 'snippet', name: 'group.snippet', scope: 'better',
    keys: ['SnippetPanelHotkey', 'Snippets'] },
];

// Keys that contain sensitive data (passwords, tokens)
export const IE_SENSITIVE_KEYS = new Set<keyof Config>([
  'DefaultPassword',
]);

/**
 * Find config group by key
 */
export function findGroupByKey(key: keyof Config): ConfigGroup | null {
  return CONFIG_GROUPS.find(g => g.keys.includes(key)) || null;
}

/**
 * Get keys for a preset
 */
export function presetToKeys(
  preset: 'all' | 'smart' | 'better' | 'favorites' | 'snippet',
  availableKeys: (keyof Config)[]
): Set<keyof Config> {
  const keys = new Set<keyof Config>();

  if (preset === 'favorites') return keys;

  availableKeys.forEach(k => {
    if (preset === 'all') { keys.add(k); return; }
    if (preset === 'snippet') {
      if (k === 'Snippets' || k === 'SnippetPanelHotkey') keys.add(k);
      return;
    }
    const g = findGroupByKey(k);
    if (!g) { if (preset === 'all') keys.add(k); return; }
    if (preset === 'smart' && g.scope === 'smart') keys.add(k);
    if (preset === 'better' && g.scope === 'better') keys.add(k);
  });
  return keys;
}

/**
 * Check if preset includes favorites
 */
export function presetIncludesFavorites(preset: string): boolean {
  return preset === 'all' || preset === 'better' || preset === 'favorites';
}

/**
 * Load config from GM storage (with localStorage fallback)
 */
export function loadConfig(): Config {
  try {
    let raw = GM_getValue(STORAGE_KEY, null);
    if (raw === null) {
      const legacy = localStorage.getItem(STORAGE_KEY);
      if (legacy) {
        raw = legacy;
        GM_setValue(STORAGE_KEY, legacy);
      }
    }
    if (!raw) return deepClone(DEFAULT_CONFIG);
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return { ...deepClone(DEFAULT_CONFIG), ...parsed };
  } catch (e) {
    return deepClone(DEFAULT_CONFIG);
  }
}

/**
 * Save config to GM storage (with localStorage backup)
 */
export function saveConfig(config: Config): void {
  try {
    GM_setValue(STORAGE_KEY, JSON.stringify(config));
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(config)); } catch (e) {}
  } catch (e) {
    console.error('[BetterHOJ] Save config failed:', e);
  }
}