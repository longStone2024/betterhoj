/**
 * Navbar Layout Feature
 * Allows users to customize the navigation bar order and visibility
 */

import { openCustomDialog, NewAlert, NewDialog } from '../core/api.js';
import { WebI18n, t } from '../core/i18n.js';
import type { Config } from '../core/config.js';

interface NavItem {
  key: string;
  visible: boolean;
}

const NAVBAR_ELEMENTS = [
  { key: 'logo',       labelKey: 'nav.item.logo',       selector: '.logo' },
  { key: 'home',       labelKey: 'nav.item.home',       matchText: ['首页', 'Home'] },
  { key: 'problems',   labelKey: 'nav.item.problems',   matchText: ['题目', 'Problem'] },
  { key: 'training',   labelKey: 'nav.item.training',   matchText: ['训练', 'Training'] },
  { key: 'contest',    labelKey: 'nav.item.contest',    matchText: ['比赛', 'Contest'] },
  { key: 'submission', labelKey: 'nav.item.submission', matchText: ['评测', 'Status'] },
  { key: 'rank',       labelKey: 'nav.item.rank',       matchText: ['排名', 'Rank'] },
  { key: 'discussion', labelKey: 'nav.item.discussion', matchText: ['讨论', 'Discussion'] },
  { key: 'team',       labelKey: 'nav.item.team',       matchText: ['团队', 'Group'] },
  { key: 'about',      labelKey: 'nav.item.about',      matchText: ['关于', 'About'] },
  { key: 'newui',      labelKey: 'nav.item.newui',      matchText: ['体验新版', 'Try New'] },
];

const MOBILE_NAV_ICON_MAP = {
  home:       'el-icon-s-home',
  problems:   'el-icon-s-grid',
  training:   'el-icon-s-claim',
  contest:    'el-icon-trophy',
  submission: 'el-icon-s-marketing',
  rank:       'el-icon-s-data',
  discussion: 'fa-comments',
  team:       'fa-users',
  about:      'el-icon-info',
  newui:      'el-icon-star-on',
};

const NEW_FRONT_TEXT_MAP = {
  home:       '首页',
  problems:   '题库',
  submission: '评测',
  training:   '题单',
  contest:    '比赛',
  team:       '团队',
  discussion: '讨论',
  rank:       '排名',
  newui:      '体验新版',
};

const NAVBAR_USER_SELECTORS = ['.drop-menu', '.drop-avatar'];

function getNavbarLayout(config: Config): NavItem[] {
  const defaults = NAVBAR_ELEMENTS.map(e => ({ key: e.key, visible: true }));
  const saved = config.NavbarLayout;
  if (!Array.isArray(saved) || !saved.length) return defaults;

  const valid = new Set(NAVBAR_ELEMENTS.map(e => e.key));
  const seen = new Set();
  const out = [];
  saved.forEach(item => {
    if (!item || typeof item !== 'object') return;
    if (!valid.has(item.key) || seen.has(item.key)) return;
    out.push({ key: item.key, visible: item.visible !== false });
    seen.add(item.key);
  });
  defaults.forEach(d => { if (!seen.has(d.key)) out.push(d); });
  return out;
}

function saveNavbarLayout(config: Config, layout: NavItem[]): void {
  config.NavbarLayout = layout.map(x => ({ key: x.key, visible: !!x.visible }));
}

// ---- Collect elements for old UI ----
function collectNavbarElements(menu: HTMLElement): Map<string, HTMLElement> {
  const map = new Map();

  NAVBAR_ELEMENTS.forEach(def => {
    if (!def.selector) return;
    const el = menu.querySelector(def.selector);
    if (el) map.set(def.key, el as HTMLElement);
  });

  const textDefs = NAVBAR_ELEMENTS.filter(d => d.matchText);
  menu.querySelectorAll(':scope > li.el-menu-item, :scope > li.el-submenu').forEach(li => {
    const titleEl = li.querySelector(':scope > .el-submenu__title');
    const ownText = (titleEl ? titleEl.textContent : li.textContent || '').trim();

    for (const def of textDefs) {
      if (map.has(def.key)) continue;
      const texts = Array.isArray(def.matchText) ? def.matchText : [def.matchText];
      if (texts.some(tx => tx && ownText.includes(tx))) {
        map.set(def.key, li as HTMLElement);
        break;
      }
    }
  });

  return map;
}

// ---- Apply old UI layout ----
function applyNavbarLayoutInternal(config: Config): void {
  const menu = document.querySelector('#header ul.el-menu.el-menu--horizontal, #header ul.el-menu--horizontal') as HTMLElement;
  if (!menu) return;

  const layout = getNavbarLayout(config);
  const elMap = collectNavbarElements(menu);

  const expected = [];
  layout.forEach(item => {
    const el = elMap.get(item.key);
    if (el) expected.push({ el, visible: item.visible });
  });
  if (!expected.length) return;

  let needsRebuild = false;
  const expectedEls = new Set(expected.map(x => x.el));
  const domOrder = [];
  for (const child of menu.children) {
    if (expectedEls.has(child)) domOrder.push(child);
  }

  if (domOrder.length !== expected.length) {
    needsRebuild = true;
  } else {
    for (let i = 0; i < expected.length; i++) {
      if (domOrder[i] !== expected[i].el) { needsRebuild = true; break; }
    }
  }
  if (!needsRebuild) {
    for (const { el, visible } of expected) {
      const wantHidden = visible ? '0' : '1';
      const curHidden  = el.dataset.hojNavHidden || '0';
      if (wantHidden !== curHidden) { needsRebuild = true; break; }
    }
  }
  if (!needsRebuild) return;

  let anchor = null;
  for (const sel of NAVBAR_USER_SELECTORS) {
    const el = menu.querySelector(sel);
    if (el && el.parentNode === menu) { anchor = el; break; }
  }

  expected.forEach(({ el }) => {
    if (el.parentNode === menu) menu.removeChild(el);
  });

  if (anchor) {
    let ref = anchor;
    for (let i = expected.length - 1; i >= 0; i--) {
      const { el, visible } = expected[i];
      el.style.display = visible ? '' : 'none';
      el.dataset.hojNavHidden = visible ? '0' : '1';
      menu.insertBefore(el, ref);
      ref = el;
    }
  } else {
    expected.forEach(({ el, visible }) => {
      el.style.display = visible ? '' : 'none';
      el.dataset.hojNavHidden = visible ? '0' : '1';
      menu.appendChild(el);
    });
  }

  console.log('[NavbarLayout] 已应用布局:', layout.map(x => `${x.visible ? '+' : '-'}${x.key}`).join(' '));
}

// ---- Mobile drawer ----
function collectMobileDrawerElements(): Map<string, HTMLElement> {
  const map = new Map();
  const drawer = document.querySelector('.mu-drawer');
  if (!drawer) return map;

  let list = null;
  for (const child of drawer.children) {
    if (child.tagName === 'UL' && child.classList.contains('mu-list')) { list = child; break; }
  }
  if (!list) return map;

  const settingsBtn = list.querySelector(':scope > #hoj-mobile-settings-btn');
  if (settingsBtn) map.set('settings', settingsBtn as HTMLElement);

  list.querySelectorAll(':scope > li').forEach(li => {
    if (li.id === 'hoj-mobile-settings-btn') return;
    for (const [key, iconClass] of Object.entries(MOBILE_NAV_ICON_MAP)) {
      if (map.has(key)) continue;
      const hit = [...li.querySelectorAll('i')]
        .some(i => i.classList && i.classList.contains(iconClass));
      if (hit) { map.set(key, li as HTMLElement); break; }
    }
  });

  return map;
}

function applyMobileDrawerLayout(config: Config): void {
  const drawer = document.querySelector('.mu-drawer');
  if (!drawer) return;

  let list = null;
  for (const child of drawer.children) {
    if (child.tagName === 'UL' && child.classList.contains('mu-list')) { list = child; break; }
  }
  if (!list) return;

  const layout = getNavbarLayout(config);
  const elMap = collectMobileDrawerElements();
  if (!elMap.size) return;

  const expected = [];
  layout.forEach(item => {
    const el = elMap.get(item.key);
    if (el) expected.push({ el, visible: item.visible });
  });
  if (!expected.length) return;

  let needsRebuild = false;
  const expectedEls = new Set(expected.map(x => x.el));
  const domOrder = [];
  for (const child of list.children) {
    if (expectedEls.has(child)) domOrder.push(child);
  }
  if (domOrder.length !== expected.length) {
    needsRebuild = true;
  } else {
    for (let i = 0; i < expected.length; i++) {
      if (domOrder[i] !== expected[i].el) { needsRebuild = true; break; }
    }
  }
  if (!needsRebuild) {
    for (const { el, visible } of expected) {
      const wantHidden = visible ? '0' : '1';
      const curHidden  = el.dataset.hojNavHidden || '0';
      if (wantHidden !== curHidden) { needsRebuild = true; break; }
    }
  }
  if (!needsRebuild) return;

  expected.forEach(({ el }) => {
    if (el.parentNode === list) list.removeChild(el);
  });
  expected.forEach(({ el, visible }) => {
    el.style.display = visible ? '' : 'none';
    el.dataset.hojNavHidden = visible ? '0' : '1';
    list.appendChild(el);
  });

  console.log('[NavbarLayout] 移动端布局已应用');
}

// ---- New frontend ----
function _findNewNavContainer(): HTMLElement | null {
  const nav = document.querySelector('nav[data-v-9dacc850]')
    || document.querySelector('nav[data-v-7b0404d0]');
  if (!nav) return null;
  return nav.querySelector('div.flex.flex-row') as HTMLElement | null;
}

function _collectNewFrontElements(): Map<string, HTMLElement> {
  const map = new Map();
  const wrap = _findNewNavContainer();
  if (!wrap) return map;

  const settingsBtn = wrap.querySelector('#hoj-new-settings-btn');
  if (settingsBtn) map.set('settings', settingsBtn as HTMLElement);

  const backOldBtn = wrap.querySelector('#hoj-back-old-btn');
  if (backOldBtn) map.set('backold', backOldBtn as HTMLElement);

  wrap.querySelectorAll(':scope > button.gear-item').forEach(btn => {
    if (btn.id === 'hoj-new-settings-btn' || btn.id === 'hoj-back-old-btn') return;
    for (const v of map.values()) if (v === btn) return;

    const textEl = btn.querySelector('.truncate');
    const text = textEl ? textEl.textContent.trim() : (btn.textContent || '').trim();

    for (const [key, label] of Object.entries(NEW_FRONT_TEXT_MAP)) {
      if (map.has(key)) continue;
      if (text.includes(label)) { map.set(key, btn as HTMLElement); break; }
    }
  });

  return map;
}

function applyNewFrontendLayout(config: Config): void {
  const wrap = _findNewNavContainer();
  if (!wrap) return;

  const layout = getNavbarLayout(config);
  const elMap = _collectNewFrontElements();
  if (!elMap.size) return;

  /* expected: ordered by layout */
  const expected = [];
  layout.forEach(item => {
    const el = elMap.get(item.key);
    if (el) expected.push({ el, visible: item.visible });
  });

  /* settings / backold not in layout, fixed at end */
  const tailEls = [elMap.get('settings'), elMap.get('backold')].filter(Boolean);
  const allEls  = new Set([...expected.map(x => x.el), ...tailEls]);
  if (!allEls.size) return;

  /* --- check if rebuild needed --- */
  let needsRebuild = false;
  const domOrder = [];
  for (const child of wrap.children) {
    if (allEls.has(child)) domOrder.push(child);
  }

  if (domOrder.length !== allEls.size) {
    needsRebuild = true;
  } else {
    for (let i = 0; i < expected.length; i++) {
      if (domOrder[i] !== expected[i].el) { needsRebuild = true; break; }
    }
    if (!needsRebuild) {
      for (let i = 0; i < tailEls.length; i++) {
        if (domOrder[expected.length + i] !== tailEls[i]) {
          needsRebuild = true; break;
        }
      }
    }
  }
  if (!needsRebuild) {
    for (const { el, visible } of expected) {
      const wantHidden = visible ? '0' : '1';
      const curHidden  = el.dataset.hojNavHidden || '0';
      if (wantHidden !== curHidden) { needsRebuild = true; break; }
    }
  }
  if (!needsRebuild) return;

  /* --- rebuild --- */
  allEls.forEach(el => {
    if (el.parentNode === wrap) wrap.removeChild(el);
  });

  expected.forEach(({ el, visible }) => {
    el.style.display = visible ? '' : 'none';
    el.dataset.hojNavHidden = visible ? '0' : '1';
    wrap.appendChild(el);
  });

  tailEls.forEach(el => {
    el.style.display = '';
    delete el.dataset.hojNavHidden;
    wrap.appendChild(el);
  });

  console.log('[NavbarLayout] /new 前端布局已应用');
}

// ---- Unified scheduler ----
let _navbarApplyTimer: number | null = null;
export function scheduleApplyNavbarLayout(delay = 200): void {
  if (_navbarApplyTimer) clearTimeout(_navbarApplyTimer);
  _navbarApplyTimer = window.setTimeout(() => {
    _navbarApplyTimer = null;
    try { applyNavbarLayoutInternal(config); } catch (e) { console.warn('[NavbarLayout] 旧前端:', e); }
    try { applyMobileDrawerLayout(config); } catch (e) { console.warn('[NavbarLayout] 移动端:', e); }
    try { applyNewFrontendLayout(config); } catch (e) { console.warn('[NavbarLayout] 新前端:', e); }
  }, delay);
}

// Need config from outside, so we use a module-level variable
let config: Config;

function setConfig(cfg: Config): void {
  config = cfg;
}

export function applyNavbarLayout(cfg: Config): void {
  setConfig(cfg);
  applyNavbarLayoutInternal(cfg);
  applyMobileDrawerLayout(cfg);
  applyNewFrontendLayout(cfg);
}

// ---- Dialog ----
let navbarDialogClose: (() => void) | null = null;

export function openNavbarLayoutDialog(cfg: Config): void {
  setConfig(cfg);
  if (navbarDialogClose) {
    navbarDialogClose();
    return;
  }

  let layout = getNavbarLayout(cfg);

  const wrap = document.createElement('div');
  wrap.className = 'hoj-navbar-layout';

  const hint = document.createElement('div');
  hint.className = 'hoj-navbar-hint';
  hint.textContent = t('navbar.hint');
  wrap.appendChild(hint);

  const list = document.createElement('ul');
  list.className = 'hoj-navbar-list';
  wrap.appendChild(list);

  const persist = () => {
    saveNavbarLayout(cfg, layout);
    scheduleApplyNavbarLayout(0);
  };

  const renderList = () => {
    list.innerHTML = '';
    layout.forEach((item, idx) => {
      const def = NAVBAR_ELEMENTS.find(e => e.key === item.key);
      const label = def ? t(def.labelKey) : item.key;

      const li = document.createElement('li');
      li.className = 'hoj-navbar-item';
      li.draggable = true;
      li.dataset.key = item.key;
      li.dataset.idx = String(idx);

      li.innerHTML = `
        <span class="hoj-navbar-drag">⋮⋮</span>
        <label class="hoj-navbar-check">
            <input type="checkbox" ${item.visible ? 'checked' : ''}>
        </label>
        <span class="hoj-navbar-label"></span>
        <span class="hoj-navbar-arrows">
            <button type="button" data-act="up"   ${idx === 0 ? 'disabled' : ''}>▲</button>
            <button type="button" data-act="down" ${idx === layout.length - 1 ? 'disabled' : ''}>▼</button>
        </span>
      `;
      // Use textContent to avoid injection issues
      li.querySelector('.hoj-navbar-label')!.textContent = label;

      li.querySelector('input[type="checkbox"]')!.addEventListener('change', (e) => {
        item.visible = (e.target as HTMLInputElement).checked;
        persist();
      });

      li.querySelector('[data-act="up"]')!.addEventListener('click', () => {
        if (idx === 0) return;
        [layout[idx - 1], layout[idx]] = [layout[idx], layout[idx - 1]];
        persist();
        renderList();
      });
      li.querySelector('[data-act="down"]')!.addEventListener('click', () => {
        if (idx === layout.length - 1) return;
        [layout[idx + 1], layout[idx]] = [layout[idx], layout[idx + 1]];
        persist();
        renderList();
      });

      list.appendChild(li);
    });
  };

  /* ---------- Drag & Drop ---------- */
  let dragSrcIdx: number | null = null;

  list.addEventListener('dragstart', (e) => {
    const li = e.target.closest('.hoj-navbar-item');
    if (!li) return;
    dragSrcIdx = Number(li.dataset.idx);
    li.classList.add('hoj-navbar-dragging');
    (e as DragEvent).dataTransfer!.effectAllowed = 'move';
    try { (e as DragEvent).dataTransfer!.setData('text/plain', li.dataset.key!); } catch (_) {}
  });

  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const li = e.target.closest('.hoj-navbar-item');
    if (!li || dragSrcIdx === null) return;
    if (Number(li.dataset.idx) === dragSrcIdx) return;
    list.querySelectorAll('.hoj-navbar-drop-before, .hoj-navbar-drop-after')
      .forEach(el => el.classList.remove('hoj-navbar-drop-before', 'hoj-navbar-drop-after'));
    const rect = li.getBoundingClientRect();
    const isAfter = (e.clientY - rect.top) > rect.height / 2;
    li.classList.add(isAfter ? 'hoj-navbar-drop-after' : 'hoj-navbar-drop-before');
  });

  list.addEventListener('drop', (e) => {
    e.preventDefault();
    if (dragSrcIdx === null) return;
    const li = e.target.closest('.hoj-navbar-item');
    if (!li) return;

    let targetIdx = Number(li.dataset.idx);
    const rect = li.getBoundingClientRect();
    if ((e.clientY - rect.top) > rect.height / 2) targetIdx++;

    const [moved] = layout.splice(dragSrcIdx, 1);
    let insertAt = targetIdx;
    if (dragSrcIdx < targetIdx) insertAt--;
    insertAt = Math.max(0, Math.min(insertAt, layout.length));
    layout.splice(insertAt, 0, moved);

    persist();
    renderList();
  });

  list.addEventListener('dragend', () => {
    list.querySelectorAll('.hoj-navbar-drop-before, .hoj-navbar-drop-after, .hoj-navbar-dragging')
      .forEach(el => el.classList.remove('hoj-navbar-drop-before', 'hoj-navbar-drop-after', 'hoj-navbar-dragging'));
  });

  const footer = document.createElement('div');
  footer.className = 'hoj-navbar-footer';
  const resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.className = 'hoj-snippet-btn';
  resetBtn.textContent = t('navbar.reset');
  resetBtn.addEventListener('click', async () => {
    const ok = await NewDialog({
      title: '@navbar.reset.confirm.title',
      content: '@navbar.reset.confirm.body',
      type: 'warning',
      confirmText: '@navbar.reset.confirm.ok'
    });
    if (ok) {
      layout = NAVBAR_ELEMENTS.map(e => ({ key: e.key, visible: true }));
      persist();
      renderList();
    }
  });
  footer.appendChild(resetBtn);
  wrap.appendChild(footer);

  renderList();

  navbarDialogClose = openCustomDialog({
    title: t('navbar.title'),
    bodyEl: wrap,
    width: '500px',
    maxHeight: '70vh',
    onClose: () => { navbarDialogClose = null; }
  });
}