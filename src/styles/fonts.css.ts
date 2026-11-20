/**
 * Font-related CSS
 */

export const HOJ_SHOW_VERSION_CSS = `
body::after {
  content: "Smart HOJ 27 Beta 4.6 JavaScript Version";
  position: fixed; top: 0; left: 0; z-index: 9999;
  color: #000; background-color: #fff;
  padding: 0 3px 0 3px; opacity: 0.25; font-size: 10px;
}
`;

export const HOJ_BETTER_NOT_FOUND_CSS = `
.container-error-404 {
  background-image: url(https://vjudge.net/static/bundle/b3bb0b0cf13cd630088c.jpg);
  background-repeat: no-repeat;
  background-position: top;
  height: 351px !important;
}
.container-error-404 > * { display: none !important; }
.card {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
  opacity: 1;
}
`;

export const HOJ_MEMORIZING_FONT = `
*:not(pre, pre *, code, code *, .CodeMirror *, textarea, i, .katex, .katex *, [class*=" el-icon-"], [class^="el-icon-"], [class^="example-"] pre, .tex-formula, .tex-span) {
  font-family: "Sans Forgetica Regular", "Noto Sans SC", sans-serif !important;
}
pre, pre *, code, code *, .CodeMirror *, textarea, [class^="example-"] pre {
  font-family: "Sans Forgetica Regular", "Noto Sans SC", sans-serif !important;
}
`;

export const HOJ_HIDE_NEW_HOJ = `
.el-menu.el-menu--horizontal .el-menu-item[data-v-35116184]:not(:has(~ .el-menu-item[data-v-35116184])) {
  display: none;
}
`;

// Font resource IDs
export const FONT_LINK_ID = {
  google: 'hoj-font-google',
  forgetica: 'hoj-font-forgetica'
};

/**
 * Load CSS from @resource and inject as <style>
 */
export function loadStyleFromResource(id: string, resName: string): void {
  if (document.getElementById(id)) return;

  let cssText = '';
  try {
    // @ts-ignore - GM_getResourceText provided by userscript
    if (typeof GM_getResourceText === 'function') {
      // @ts-ignore
      cssText = GM_getResourceText(resName) || '';
    }
  } catch (e) {
    console.warn(`[Font] Failed to read @resource "${resName}":`, e);
  }

  if (!cssText) {
    console.warn(`[Font] Falling back to remote <link>: ${resName}`);
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = resName === 'hoj-font-google'
      ? 'https://fonts.googleapis.com/css2?' +
        'family=Noto+Sans+SC:wght@100..900&' +
        'family=JetBrains+Mono&' +
        'family=Fira+Code:wght@300..700&' +
        'family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&' +
        'display=swap'
      : 'https://db.onlinewebfonts.com/c/eb08ac6d35598e6ced424eb52373a55a?family=Sans+Forgetica+Regular';
    (document.head || document.documentElement).appendChild(link);
    return;
  }

  const style = document.createElement('style');
  style.id = id;
  style.textContent = cssText;
  (document.head || document.documentElement).appendChild(style);
  console.log(`[Font] Loaded from @resource: ${resName} (${cssText.length} chars)`);
}

/** Load base fonts (always) */
export function loadBaseFonts(): void {
  loadStyleFromResource(FONT_LINK_ID.google, 'hoj-font-google');
}

/**
 * Toggle memorizing font (Sans Forgetica)
 */
export function syncMemorizingFont(config: { MemorizingFont: boolean; Open: boolean }): void {
  const styleId = 'hoj-smart-style-memorizing-font';
  const old = document.getElementById(styleId);
  if (old) old.remove();

  if (config.MemorizingFont && config.Open) {
    loadStyleFromResource(FONT_LINK_ID.forgetica, 'hoj-font-forgetica');

    const s = document.createElement('style');
    s.id = styleId;
    s.textContent = HOJ_MEMORIZING_FONT;
    (document.head || document.documentElement).appendChild(s);
  } else {
    const el = document.getElementById(FONT_LINK_ID.forgetica);
    if (el) el.remove();
  }
}