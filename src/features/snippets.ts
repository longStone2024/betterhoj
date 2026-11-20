/**
 * Code Snippets Feature
 * Matches reference implementation exactly
 */

import { NewAlert, NewDialog, openCustomDialog } from '../core/api.js';
import { WebI18n } from '../core/i18n.js';
import { saveConfig } from '../core/config.js';
import type { Config } from '../core/config.js';

export interface Snippet {
  id: string;
  name: string;
  content: string;
  description?: string;
  category?: string;
  hotkey?: string;
}

const SNIPPET_STORAGE_KEY = 'hoj_snippets_v1';

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}


const HOJ_LANG_STORAGE_KEY = 'hojIndividualLanguageAndSetting';


// ============================================================
// Snippet System
// ============================================================

function insertSnippetText(text: string): boolean {
  if (typeof text !== 'string' || !text) return false;
  const el = document.activeElement;
  if (!el) return false;

  // CodeMirror 5
  const cmWrap = el.closest ? el.closest('.CodeMirror') : null;
  if (cmWrap && (cmWrap as any).CodeMirror) {
    try { (cmWrap as any).CodeMirror.focus(); } catch (_) {}
    (cmWrap as any).CodeMirror.replaceSelection(text);
    (cmWrap as any).CodeMirror.focus();
    return true;
  }

  // textarea / input
  if (el.tagName === 'TEXTAREA' ||
      (el.tagName === 'INPUT' &&
       !['checkbox','radio','submit','button','file','range','color'].includes((el.type || '').toLowerCase()))) {
    try { el.focus(); } catch (_) {}
    const s = el.selectionStart ?? el.value.length;
    const e2 = el.selectionEnd ?? s;
    try {
      el.setRangeText(text, s, e2, 'end');
    } catch {
      el.value = el.value.slice(0, s) + text + el.value.slice(e2);
      el.selectionStart = el.selectionEnd = s + text.length;
    }
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  // contenteditable
  if (el.isContentEditable) {
    try { el.focus(); } catch (_) {}
    document.execCommand('insertText', false, text);
    return true;
  }

  return false;
}

export function getSnippets(config: Config): Snippet[] {
  return Array.isArray(config.Snippets) ? config.Snippets : [];
}

export function mergeSnippetsInto(existing: Snippet[], incoming: Snippet[]): { list: Snippet[]; added: number; updated: number } {
  if (!Array.isArray(incoming)) return { list: existing, added: 0, updated: 0 };
  const map = new Map();
  existing.forEach(s => { if (s && s.id) map.set(s.id, s); });
  let added = 0, updated = 0;
  incoming.forEach(s => {
    if (!s || !s.id) return;
    if (map.has(s.id)) updated++;
    else               added++;
    map.set(s.id, s);
  });
  return { list: [...map.values()], added, updated };
}

export function saveSnippets(config: Config, list: Snippet[]): void {
  config.Snippets = Array.isArray(list) ? list : [];
  saveConfig(config);
}

function newSnippetId(): string {
  return 'snip_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

// ---------- Hotkey helpers ----------

function _normMainKey(e: KeyboardEvent): string | null {
  const k = e.key;
  if (['Control','Shift','Alt','Meta','OS'].includes(k)) return null;
  if (k === ' ') return 'Space';
  if (k === 'Enter') return 'Enter';
  if (k === 'Tab') return 'Tab';
  if (k === 'Backspace') return 'Backspace';
  if (k === 'Escape') return 'Escape';
  if (k.length === 1) return k.toUpperCase();
  return k;
}

function normalizeHotkey(e: KeyboardEvent): string | null {
  const main = _normMainKey(e);
  if (!main) return null;
  const parts: string[] = [];
  if (e.ctrlKey)  parts.push('Ctrl');
  if (e.altKey)   parts.push('Alt');
  if (e.shiftKey) parts.push('Shift');
  if (e.metaKey)  parts.push('Meta');
  // 没有修饰键时，仅允许 F1~F24
  if (parts.length === 0 && !/^F\d+$/.test(main)) return null;
  parts.push(main);
  return parts.join('+');
}

function formatHotkeyDisplay(hk: string): string {
  if (!hk) return '';
  return hk.split('+').map(p => HOTKEY_DISPLAY_MAP[p] || p).join(' + ');
}

const HOTKEY_DISPLAY_MAP: Record<string, string> = {
  'Ctrl': 'Ctrl', 'Alt': 'Alt', 'Shift': 'Shift', 'Meta': 'Meta',
  'Enter': 'Enter', 'Tab': 'Tab', 'Space': 'Space', 'Backspace': 'Backspace', 'Escape': 'Esc'
};

function matchHotkey(e: KeyboardEvent, hk: string): boolean {
  if (!hk) return false;
  return normalizeHotkey(e) === hk;
}

let _snippetHotkeyInstalled = false;

export function registerSnippetHotkeys(config: Config): void {
  if (_snippetHotkeyInstalled) return;
  _snippetHotkeyInstalled = true;

  const handler = (e: KeyboardEvent) => {
    if (e.repeat) return;
    if (['Control', 'Shift', 'Alt', 'Meta', 'OS'].includes(e.key)) return;

    const t = e.target as HTMLElement;
    const inOwnUI = t && t.closest &&
          t.closest('#hoj-settings-panel, .hoj-dialog, .hoj-dialog-mask, .hoj-tool, #hoj-like-box, #hoj-new-like-box');

    if (inOwnUI) return;

    /* ---------- 1) 唤出片段面板 ---------- */
    const panelHk = config.SnippetPanelHotkey;
    if (panelHk && matchHotkey(e, panelHk)) {
      e.preventDefault();
      e.stopPropagation();
      openSnippetPanel(config);
      return;
    }

    /* ---------- 2) 片段快捷键 ---------- */
    const list = getSnippets(config);
    for (const s of list) {
      if (!s.hotkey) continue;
      if (matchHotkey(e, s.hotkey)) {
        e.preventDefault();
        e.stopPropagation();
        const ok = insertSnippetText(s.content || '');
        if (ok) NewAlert(WebI18n.t('snippet.inserted', { name: s.name || '' }), 'success', 1200);
        else    NewAlert('@snippet.applyFailed', 'warning', 1200);
        return;
      }
    }
  };

  // 同时绑 window 和 document（capture 阶段），双保险
  window.addEventListener('keydown', handler, true);
  document.addEventListener('keydown', handler, true);

  // 可选：保存 handler 便于销毁
  (registerSnippetHotkeys as any)._handler = handler;
}

export function destroySnippetHotkeys(): void {
  const handler = (registerSnippetHotkeys as any)._handler;
  if (handler) {
    window.removeEventListener('keydown', handler, true);
    document.removeEventListener('keydown', handler, true);
    (registerSnippetHotkeys as any)._handler = null;
  }
  _snippetHotkeyInstalled = false;
}

// ---------- 片段管理 ----------

let _snippetPanelOpen = false;

// 快照：记录原焦点元素与选区（暂时保留以兼容）
export function openSnippetPanel(config: Config): void {
  if (_snippetPanelOpen) return;
  _snippetPanelOpen = true;

  const wrap = document.createElement('div');
  wrap.className = 'hoj-snippet-panel';

  const tabsEl = document.createElement('div');
  tabsEl.className = 'hoj-snippet-cats';

  const listEl = document.createElement('ul');
  listEl.className = 'hoj-snippet-list';

  const footer = document.createElement('div');
  footer.className = 'hoj-snippet-footer';
  footer.innerHTML = `<span class="hoj-snippet-tip">↑↓ 选择 · ←→ 切换分类 · Enter 插入 · Esc 关闭</span>
  <button type="button" class="hoj-snippet-btn" data-act="manage">${WebI18n.t('snippet.manage')}</button>`;

  wrap.append(tabsEl, listEl, footer);

  // 不抢焦点
  wrap.addEventListener('mousedown', (e) => {
    if (e.target.closest('input, textarea, [contenteditable]')) return;
    e.preventDefault();
  });

  const all = getSnippets(config);
  // 分类聚合
  const catSet = new Set();
  all.forEach(s => catSet.add((s.category || '').trim() || '未分类'));
  const cats = ['全部', ...[...catSet].sort()];

  let activeCat = '全部';
  let activeIdx = 0;
  let visible: Snippet[] = [];

  const computeVisible = () => {
    if (activeCat === '全部') visible = all.slice();
    else visible = all.filter(s => ((s.category || '').trim() || '未分类') === activeCat);
    if (activeIdx >= visible.length) activeIdx = Math.max(0, visible.length - 1);
  };

  const renderTabs = () => {
    tabsEl.innerHTML = cats.map(c =>
                                `<button type="button" tabindex="-1" class="hoj-snippet-cat${c === activeCat ? ' active' : ''}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`
                               ).join('');
  };

  const renderList = () => {
    if (!visible.length) {
      listEl.innerHTML = '<li class="hoj-snippet-empty">该分类下暂无片段</li>';
      return;
    }
    listEl.innerHTML = visible.map((s, i) => `
    <li class="hoj-snippet-item${i === activeIdx ? ' active' : ''}" data-idx="${i}">
        <div class="hoj-snippet-item-main">
            <div class="hoj-snippet-item-name">${escapeHtml(s.name || '(未命名)')}</div>
            ${s.description ? `<div class="hoj-snippet-item-desc">${escapeHtml(s.description)}</div>` : ''}
        </div>
        ${s.hotkey ? `<div class="hoj-snippet-item-hotkey">${escapeHtml(formatHotkeyDisplay(s.hotkey))}</div>` : ''}
    </li>
`).join('');
  };

  const refresh = () => {
    computeVisible();
    renderTabs();
    renderList();
  };

  const applySnippet = (s: Snippet) => {
    if (!s) return;
    const ok = insertSnippetText(s.content || '');
    if (ok) NewAlert(WebI18n.t('snippet.inserted', { name: s.name || '' }), 'success', 1200);
    else    NewAlert(WebI18n.t('snippet.applyFailed', { name: s.name || '' }), 'warning', 1200);
  };

  // 点击
  tabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.hoj-snippet-cat');
    if (!btn) return;
    activeCat = btn.dataset.cat!;
    activeIdx = 0;
    refresh();
  });
  listEl.addEventListener('click', (e) => {
    const li = e.target.closest('.hoj-snippet-item');
    if (!li) return;
    applySnippet(visible[Number(li.dataset.idx)]);
  });
  footer.addEventListener('click', (e) => {
    if (e.target.closest('[data-act="manage"]')) {
      closeDialog();
      setTimeout(() => openSnippetManager(config), 200);
    }
  });

  // 键盘导航（global keydown，但只在本面板打开时响应）
  const onKey = (e: KeyboardEvent) => {
    if (!_snippetPanelOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault(); e.stopPropagation();
      if (visible.length) { activeIdx = (activeIdx + 1) % visible.length; renderList(); }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); e.stopPropagation();
      if (visible.length) { activeIdx = (activeIdx - 1 + visible.length) % visible.length; renderList(); }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault(); e.stopPropagation();
      const i = cats.indexOf(activeCat);
      activeCat = cats[(i + 1) % cats.length];
      activeIdx = 0; refresh();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault(); e.stopPropagation();
      const i = cats.indexOf(activeCat);
      activeCat = cats[(i - 1 + cats.length) % cats.length];
      activeIdx = 0; refresh();
    } else if (e.key === 'Home') {
      e.preventDefault(); activeIdx = 0; renderList();
    } else if (e.key === 'End') {
      e.preventDefault(); activeIdx = visible.length - 1; renderList();
    } else if (e.key === 'Enter') {
      e.preventDefault(); e.stopPropagation();
      applySnippet(visible[activeIdx]);
    } else if (e.key === 'Escape') {
      e.preventDefault(); e.stopPropagation();
      closeDialog();
    }
  };
  document.addEventListener('keydown', onKey, true);

  refresh();

  let closeDialog: (() => void) | null = null;

  closeDialog = openCustomDialog({
    title: '代码片段',
    bodyEl: wrap,
    width: '560px',
    maxHeight: '70vh',
    onClose: () => {
      _snippetPanelOpen = false;
      document.removeEventListener('keydown', onKey, true);
    }
  });
}

export function openSnippetManager(config: Config): void {
  const wrap = document.createElement('div');
  wrap.className = 'hoj-snippet-mgr';

  const listEl = document.createElement('div');
  listEl.className = 'hoj-snippet-mgr-list';
  wrap.appendChild(listEl);

  const actions = document.createElement('div');
  actions.className = 'hoj-snippet-mgr-actions';
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'hoj-snippet-btn hoj-snippet-btn--primary';
  addBtn.textContent = '+ 新建片段';
  actions.appendChild(addBtn);
  wrap.appendChild(actions);

  const editor = document.createElement('div');
  editor.className = 'hoj-snippet-mgr-editor';
  editor.style.display = 'none';
  wrap.appendChild(editor);

  let editingSnippet: Snippet | null = null;

  /* ---------- 列表渲染 ---------- */
  const renderList = () => {
    const list = getSnippets(config);
    if (!list.length) {
      listEl.innerHTML = '<div class="hoj-snippet-mgr-empty">暂无片段</div>';
      return;
    }
    listEl.innerHTML = list.map(s => `
    <div class="hoj-snippet-mgr-item${s.id === editingSnippet?.id ? ' active' : ''}" data-id="${escapeHtml(s.id)}">
        <div class="hoj-snippet-mgr-item-main">
            <div class="hoj-snippet-mgr-item-name">${escapeHtml(s.name || '(未命名)')}</div>
            ${s.description ? `<div class="hoj-snippet-mgr-item-desc">${escapeHtml(s.description)}</div>` : ''}
        </div>
        <div class="hoj-snippet-mgr-item-right">
            ${s.category ? `<span class="hoj-snippet-mgr-item-cat">${escapeHtml(s.category)}</span>` : ''}
            ${s.hotkey ? `<span class="hoj-snippet-mgr-item-hotkey">${escapeHtml(formatHotkeyDisplay(s.hotkey))}</span>` : ''}
            <button type="button" class="hoj-snippet-mgr-del" data-del="${escapeHtml(s.id)}" title="删除">×</button>
        </div>
    </div>
`).join('');
  };

  /* ---------- 编辑器渲染 ---------- */
  const renderEditor = (snippet: Snippet | null) => {
    editingSnippet = snippet;
    editor.style.display = snippet ? 'block' : 'none';
    if (!snippet) return;

    const vName = escapeHtml(snippet.name || '');
    const vDesc = escapeHtml(snippet.description || '');
    const vCat  = escapeHtml(snippet.category || '');
    const vCont = escapeHtml(snippet.content || '');
    const vHot  = escapeHtml(snippet.hotkey ? formatHotkeyDisplay(snippet.hotkey) : '');

    editor.innerHTML = `
    <div class="hoj-snippet-field">
        <label>名称</label>
        <input type="text" class="hoj-snippet-input" data-field="name"
               placeholder="例如：快读模板" value="${vName}">
    </div>
    <div class="hoj-snippet-field">
        <label>介绍</label>
        <input type="text" class="hoj-snippet-input" data-field="desc"
               placeholder="简短说明（用于搜索）" value="${vDesc}">
    </div>
    <div class="hoj-snippet-field">
        <label>分类（可选，相同分类会归为一组）</label>
        <input type="text" class="hoj-snippet-input" data-field="category"
               placeholder="例如：算法模板" value="${vCat}">
    </div>
    <div class="hoj-snippet-field">
        <label>快捷键（点击后按下组合键；Esc / 退格清空）</label>
        <input type="text" class="hoj-snippet-input hoj-snippet-hotkey-input" data-field="hotkey" readonly
               placeholder="例如 Ctrl+Alt+1" value="${vHot}">
    </div>
    <div class="hoj-snippet-field">
        <label>内容</label>
        <textarea class="hoj-snippet-textarea" data-field="content" rows="8"
                  placeholder="插入的文本内容">${vCont}</textarea>
    </div>
    <div class="hoj-snippet-editor-actions">
        <button type="button" class="hoj-snippet-btn" data-act="cancel">取消</button>
        <button type="button" class="hoj-snippet-btn hoj-snippet-btn--primary" data-act="save">保存</button>
    </div>
`;

    const $f = (k: string) => editor.querySelector(`[data-field="${k}"]`);
    const hotkeyEl = $f('hotkey') as HTMLInputElement;
    let pendingHotkey = snippet.hotkey || '';

    hotkeyEl.addEventListener('keydown', (e: KeyboardEvent) => {
      if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) {
        e.preventDefault(); e.stopPropagation();
        return;
      }
      e.preventDefault(); e.stopPropagation();

      if (['Escape', 'Backspace', 'Delete'].includes(e.key)) {
        pendingHotkey = '';
        hotkeyEl.value = '';
        return;
      }

      const hk = normalizeHotkey(e);
      if (hk) {
        pendingHotkey = hk;
        hotkeyEl.value = formatHotkeyDisplay(hk);
      } else {
        hotkeyEl.value = '需包含 Ctrl/Alt/Win 修饰键';
        setTimeout(() => {
          hotkeyEl.value = pendingHotkey ? formatHotkeyDisplay(pendingHotkey) : '';
        }, 700);
      }
    });
    hotkeyEl.addEventListener('focus', () => hotkeyEl.select());

    editor.querySelector('[data-act="cancel"]').addEventListener('click', () => {
      editor.style.display = 'none';
      editingSnippet = null;
      renderList();
    });

    editor.querySelector('[data-act="save"]').addEventListener('click', () => {
      const name     = $f('name') as HTMLInputElement;
      const desc     = $f('desc') as HTMLInputElement;
      const category = $f('category') as HTMLInputElement;
      const content  = $f('content') as HTMLTextAreaElement;

      if (!name.value.trim())    return NewAlert('请填写名称', 'warning');
      if (!content.value) return NewAlert('请填写内容', 'warning');

      if (pendingHotkey) {
        const list = getSnippets(config);
        const conflict = list.find(x => x.id !== (snippet ? snippet.id : null) && x.hotkey === pendingHotkey);
        if (conflict) return NewAlert(`快捷键与「${conflict.name}」冲突`, 'error');
        if (config.SnippetPanelHotkey === pendingHotkey)
          return NewAlert('快捷键与「唤出面板」冲突', 'error');
      }

      const list = getSnippets(config);
      const updated: Snippet = {
        id: snippet.id,
        name: name.value.trim(),
        desc: desc.value.trim() || undefined,
        category: category.value.trim() || undefined,
        content: content.value,
        hotkey: pendingHotkey || undefined
      };

      if (snippet) {
        const idx = list.findIndex(x => x.id === snippet.id);
        if (idx >= 0) list[idx] = updated;
      } else {
        list.push({ id: newSnippetId(), ...updated });
      }
      saveSnippets(config, list);
      NewAlert('已保存', 'success', 1200);
      editor.style.display = 'none';
      editingSnippet = null;
      renderList();
    });
  };

  /* ---------- 列表点击：进入编辑 / 删除 ---------- */
  listEl.addEventListener('click', (e) => {
    const del = e.target.closest('[data-del]');
    if (del) {
      e.stopPropagation();
      const id = del.dataset.del!;
      const list = getSnippets(config);
      const s = list.find(x => x.id === id);
      if (!s) return;
      NewDialog({
        title: '@action.delete',
        content: WebI18n.t('snippet.deleteConfirm', { name: s.name }),
        type: 'warning'
      }).then(ok => {
        if (!ok) return;
        saveSnippets(config, list.filter(x => x.id !== id));
        if (editingSnippet?.id === id) { editor.style.display = 'none'; editingSnippet = null; }
        renderList();
      });
      return;
    }
    const item = e.target.closest('.hoj-snippet-mgr-item');
    if (!item) return;
    const list = getSnippets(config);
    const s = list.find(x => x.id === item.dataset.id);
    if (s) { renderEditor(s); renderList(); }
  });

  addBtn.addEventListener('click', () => { renderEditor(null); renderList(); });

  renderList();

  openCustomDialog({
    title: '片段管理',
    bodyEl: wrap,
    width: '620px',
    maxHeight: '80vh'
  });
}
