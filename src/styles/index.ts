/**
 * CSS Injection Orchestration
 * Builds CSS variables from config and injects all styles
 */

import { CORE_CSS } from './core.css.js';
import { HOJ_LIQUIDGLASS_CORE_CSS } from './liquidglass.css.js';
import { HOJ_DARKMODE_CORE_CSS } from './darkmode.css.js';
import { HOJ_SETTING_CSS } from './settings.css.js';
import {
  HOJ_SHOW_VERSION_CSS,
  HOJ_BETTER_NOT_FOUND_CSS,
  HOJ_HIDE_NEW_HOJ,
  loadBaseFonts,
  syncMemorizingFont
} from './fonts.css.js';
import { 
  applyBackground, 
  syncDynamicWallpaperTimer, 
  removeRowStripe, 
  initCardGlow,
  isDynamicWallpaper,
  isDynamicAvailable,
  syncDynamicWallpaperOptions
} from './background.js';

export { 
  applyBackground, 
  syncDynamicWallpaperTimer, 
  removeRowStripe, 
  initCardGlow,
  isDynamicWallpaper,
  isDynamicAvailable,
  syncDynamicWallpaperOptions
};
import type { Config } from '../core/config.js';

const SMART_STYLE_ID = 'hoj-smart-style';
const SHOW_VERSION_ID = 'hoj-smart-style-show-version';
const BETTER_NOT_FOUND_ID = 'hoj-smart-style-better-not-found';
const HIDE_NEW_HOJ_ID = 'hoj-smart-style-hide-new-hoj';

/**
 * Build CSS variables from config
 */
export function buildVars(config: Config): Record<string, string> {
  const enabled = !!config.Open;
  const isDark = enabled && !!config.DarkMode;
  const isLG = enabled && !!config.LiquidGlassUI;
  const isDarkLG = isDark && isLG;

  const mode = isDarkLG ? 'DL' : isDark ? 'D' : isLG ? 'L' : 'N';

  const T = {
    cardBg: { N: '#FFFFFFB0', L: '#FFFFFF4A', D: '#37373FB0', DL: '#37373F6A' },
    cardBlur: { N: '20px', L: '10px', D: '20px', DL: '10px' },
    cardRadius: { N: '15px', L: '15px', D: '15px', DL: '15px' },

    listBg: { N: 'transparent', L: 'transparent', D: 'transparent', DL: 'transparent' },
    listBgGreen: { N: '#E6FFDF60', L: '#E6FFDF60', D: '#E6FFDF60', DL: '#E6FFDF60' },
    listBgHover: { N: '#FFFFFF60', L: '#FFFFFF60', D: '#37373F60', DL: '#37373F60' },

    codeBg: { N: '#FFFFFFB0', L: '#FFFFFF4A', D: '#37373FB0', DL: '#37373F6A' },
    codeRadius: { N: '10px', L: '10px', D: '10px', DL: '10px' },

    inputBg: { N: '#FFFFFFB0', L: '#FFFFFF4A', D: '#37373FB0', DL: '#37373F6A' },
    inputRadius: { N: '10px', L: '10px', D: '10px', DL: '10px' },

    btnBg: { N: '#FFFFFFB0', L: '#FFFFFF4A', D: '#37373FB0', DL: '#37373F6A' },
    btnBgHover: { N: '#FFFFFFD0', L: '#FFFFFF4A', D: '#37373FD0', DL: '#37373F6A' },
    btnBgActive: { N: '#409EFF', L: '#409EFF', D: '#409EFF', DL: '#409EFF' },
    btnRadius: { N: '6px', L: '6px', D: '6px', DL: '6px' },

    tagRadius: { N: '6px', L: '6px', D: '6px', DL: '6px' },
    tooltipBg: { N: '#FFFFFFB0', L: '#FFFFFF4A', D: '#37373FB0', DL: '#37373F6A' },
    tooltipRadius: { N: '10px', L: '10px', D: '10px', DL: '10px' },
    judgeRadius: { N: '10px', L: '10px', D: '10px', DL: '10px' },

    textDark: { N: '#24292E', L: '#24292E', D: '#FFFFFF', DL: '#FFFFFF' },
    textDarkDisabled: { N: '#24292EB0', L: '#24292EB0', D: '#FFFFFFB0', DL: '#FFFFFFB0' },
    textLight: { N: '#FFFFFF', L: '#FFFFFF', D: '#24292E', DL: '#24292E' },
    textBlue: { N: '#0B459B', L: '#0B459B', D: '#409EFF', DL: '#409EFF' },
    textLink: { N: '#0B459B', L: '#0B459B', D: '#409EFF', DL: '#409EFF' },
    selectText: { N: '#3498DB60', L: '#3498DB60', D: '#3498DB60', DL: '#3498DB60' },
  };

  const pick = (user: string, key: keyof typeof T) =>
    (user && user !== 'Default') ? user : T[key][mode];

  const v: Record<string, string> = {
    '--hoj-card-bg': pick(config.CardBackground, 'cardBg'),
    '--hoj-card-blur': pick(config.CardBlurRadius, 'cardBlur'),
    '--hoj-card-radius': pick(config.CardRadius, 'cardRadius'),

    '--hoj-list-bg': pick(config.ListBackground, 'listBg'),
    '--hoj-list-bg-green': pick(config.ListBackgroundGreen, 'listBgGreen'),
    '--hoj-list-bg-hover': pick(config.ListBackgroundHover, 'listBgHover'),

    '--hoj-code-bg': pick(config.CodeBlockBackground, 'codeBg'),
    '--hoj-code-radius': pick(config.CodeBlockRadius, 'codeRadius'),

    '--hoj-input-bg': pick(config.InputAreaBackground, 'inputBg'),
    '--hoj-input-radius': pick(config.InputAreaRadius, 'inputRadius'),

    '--hoj-button-bg': pick(config.ButtonBackground, 'btnBg'),
    '--hoj-button-bg-hover': pick(config.ButtonBackgroundHover, 'btnBgHover'),
    '--hoj-button-bg-active': pick(config.ButtonBackgroundActive, 'btnBgActive'),
    '--hoj-button-radius': pick(config.ButtonRadius, 'btnRadius'),

    '--hoj-tag-radius': pick(config.TagRadius, 'tagRadius'),
    '--hoj-tooltip-bg': pick(config.TooltipBackground, 'tooltipBg'),
    '--hoj-tooltip-radius': pick(config.TooltipRadius, 'tooltipRadius'),
    '--hoj-judge-radius': pick(config.JudgeDetailBlockRadius, 'judgeRadius'),

    '--hoj-text-dark': pick(config.TextDark, 'textDark'),
    '--hoj-text-dark-disabled': pick(config.TextDarkDisabled, 'textDarkDisabled'),
    '--hoj-text-light': pick(config.TextLight, 'textLight'),
    '--hoj-text-blue': pick(config.TextBlue, 'textBlue'),
    '--hoj-text-link': pick(config.TextLink, 'textLink'),
    '--hoj-select-text': pick(config.SelectText, 'selectText'),

    '--hoj-sans-font': (config.SansFont && config.SansFont !== 'Default')
      ? config.SansFont : '"Noto Sans SC", sans-serif',
    '--hoj-mono-font': (config.MonoFont && config.MonoFont !== 'Default')
      ? config.MonoFont : '"Fira Code", monospace',

    '--hoj-bg-color': isDark ? '#27272F' : '#F8F8F9',
    '--hoj-lg-card-bg': pick(config.CardBackground, 'cardBg'),
    '--hoj-hpm-card-bg': isDark ? '#373747EE' : '#FFFFFFEE',
    '--hoj-scrollbar-bg': isDark ? '#444' : '#BBB',
    '--hoj-scrollbar-bg-hover': isDark ? '#666' : '#999',
  };

  return v;
}

/**
 * Inject all CSS based on current config
 */
export function injectCss(config: Config): void {
  const vars = buildVars(config);
  let rootCss = ':root {\n';
  for (const [k, v] of Object.entries(vars)) rootCss += `  ${k}: ${v};\n`;
  rootCss += '}\n';

  const old = document.getElementById(SMART_STYLE_ID);
  if (old) old.remove();

  const s = document.createElement('style');
  s.id = SMART_STYLE_ID;

  if (config.Open) {
    let css = rootCss + CORE_CSS + HOJ_SETTING_CSS;

    if (config.DarkMode) {
      css += HOJ_DARKMODE_CORE_CSS;
    }
    if (config.LiquidGlassUI) {
      css += HOJ_LIQUIDGLASS_CORE_CSS;
    }

    s.textContent = css;
    loadBaseFonts();
  } else {
    s.textContent = rootCss + HOJ_SETTING_CSS;
  }

  (document.head || document.documentElement).appendChild(s);

  injectShowVersion(config);
  injectBetterNotFound(config);
  injectHideNewHOJ(config);
  syncMemorizingFont(config);

  applyBackground(config);
  syncDynamicWallpaperTimer(config);
  removeRowStripe();
  initCardGlow(config);
}

function injectShowVersion(config: Config): void {
  const old = document.getElementById(SHOW_VERSION_ID);
  if (old) old.remove();
  const s = document.createElement('style');
  s.id = SHOW_VERSION_ID;
  s.textContent = config.ShowVersion ? HOJ_SHOW_VERSION_CSS : '';
  (document.head || document.documentElement).appendChild(s);
}

function injectBetterNotFound(config: Config): void {
  const old = document.getElementById(BETTER_NOT_FOUND_ID);
  if (old) old.remove();
  const s = document.createElement('style');
  s.id = BETTER_NOT_FOUND_ID;
  s.textContent = (config.Open && config.BetterNotFound) ? HOJ_BETTER_NOT_FOUND_CSS : '';
  (document.head || document.documentElement).appendChild(s);
}

function injectHideNewHOJ(config: Config): void {
  const old = document.getElementById(HIDE_NEW_HOJ_ID);
  if (old) old.remove();
  const s = document.createElement('style');
  s.id = HIDE_NEW_HOJ_ID;
  s.textContent = (config.Open && config.HideNewHOJ) ? HOJ_HIDE_NEW_HOJ : '';
  (document.head || document.documentElement).appendChild(s);
}

/**
 * Apply smooth scroll/switch/dark/LG classes to documentElement
 */
export function applySmoothClasses(config: Config): void {
  const root = document.documentElement;
  const enabled = !!config.Open;

  root.classList.toggle('hoj-enabled', enabled);
  root.classList.toggle('hoj-smooth-scroll', enabled && !!config.SmoothScroll);
  root.classList.toggle('hoj-smooth-switch', enabled && !!config.SmoothSwitch);

  const isDark = enabled && !!config.DarkMode;
  const isLG = enabled && !!config.LiquidGlassUI;

  root.classList.toggle('hoj-dark-mode', isDark);
  root.classList.toggle('hoj-lg-active', isLG);
  root.classList.toggle('hoj-liquid-glass', isLG && !isDark);

  const isAdmin = enabled && /\/admin(\/|$)/.test(window.location.pathname);
  root.classList.toggle('hoj-admin', isAdmin);
}