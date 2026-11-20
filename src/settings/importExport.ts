/**
 * Import/Export Dialog for Settings
 */

import { openCustomDialog, NewAlert } from '../core/api.js';
import { WebI18n, t } from '../core/i18n.js';
import { escapeHtml, cmpVersion, fmtVal } from '../core/utils.js';
import { CONFIG_GROUPS, presetToKeys, presetIncludesFavorites, findGroupByKey, IE_SENSITIVE_KEYS } from '../core/config.js';
import { getFavorites, saveFavorites } from '../features/favorites.js';
import { getSnippets, saveSnippets, mergeSnippetsInto } from '../features/snippets.js';
import { loadConfig } from '../core/config.js';
import { injectCss, applyBackground, applySmoothClasses } from '../styles/index.ts';
import { saveConfig, loadConfig, Config, DEFAULT_CONFIG } from '../core/config.js';
import { VERSION_INFO } from '../version.js';

let importExportDialogClose: (() => void) | null = null;

export function openImportExportDialog(config: Config): void {
  if (importExportDialogClose) {
    importExportDialogClose();
    return;
  }

  const wrap = document.createElement('div');
  wrap.className = 'hoj-ie-panel';

  const tabs = document.createElement('div');
  tabs.className = 'hoj-ie-tabs';
  tabs.innerHTML = `
    <button type="button" class="hoj-ie-tab active" data-tab="export">${t('ie.tabExport')}</button>
    <button type="button" class="hoj-ie-tab" data-tab="import">${t('ie.tabImport')}</button>
  `;
  wrap.appendChild(tabs);

  const body = document.createElement('div');
  body.className = 'hoj-ie-body';
  wrap.appendChild(body);

  let activeTab = 'export';

  const render = () => {
    body.innerHTML = '';
    if (activeTab === 'export') renderExportPane(body, config);
    else renderImportPane(body, config);
  };

  tabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.hoj-ie-tab');
    if (!btn || btn.dataset.tab === activeTab) return;
    tabs.querySelectorAll('.hoj-ie-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTab = btn.dataset.tab!;
    render();
  });

  render();

  importExportDialogClose = openCustomDialog({
    title: t('ie.importTitle'),
    bodyEl: wrap,
    width: '640px',
    maxHeight: '80vh',
    onClose: () => { importExportDialogClose = null; }
  });
}

function renderExportPane(root: HTMLElement, config: Config): void {
  const state = {
    keys: new Set(Object.keys(DEFAULT_CONFIG) as (keyof Config)[]),
    favorites: true
  };

  const presetRow = document.createElement('div');
  presetRow.className = 'hoj-ie-presets';
  presetRow.innerHTML = `
    <button type="button" class="hoj-ie-preset active" data-preset="all">${t('ie.presetAll')}</button>
    <button type="button" class="hoj-ie-preset" data-preset="smart">${t('ie.presetSmart')}</button>
    <button type="button" class="hoj-ie-preset" data-preset="better">${t('ie.presetBetter')}</button>
    <button type="button" class="hoj-ie-preset" data-preset="favorites">${t('ie.presetFavorites')}</button>
    <button type="button" class="hoj-ie-preset" data-preset="snippet">${t('ie.presetSnippet')}</button>
  `;
  root.appendChild(presetRow);

  const listEl = document.createElement('div');
  listEl.className = 'hoj-ie-list';
  root.appendChild(listEl);

  const footer = document.createElement('div');
  footer.className = 'hoj-ie-footer';
  const exportBtn = document.createElement('button');
  exportBtn.type = 'button';
  exportBtn.className = 'hoj-snippet-btn hoj-snippet-btn--primary';
  exportBtn.textContent = t('ie.exportBtn');
  footer.appendChild(exportBtn);
  root.appendChild(footer);

  const renderList = () => {
    listEl.innerHTML = '';
    CONFIG_GROUPS.forEach(g => {
      const keys = g.keys.filter(k => Object.prototype.hasOwnProperty.call(DEFAULT_CONFIG, k));
      if (!keys.length) return;
      const groupTitle = t(g.name);
      listEl.appendChild(buildConfigGroup(groupTitle, keys, state.keys, renderList));
    });

    const favCount = getFavorites().length;
    const favEl = document.createElement('div');
    favEl.className = 'hoj-ie-group';
    favEl.innerHTML = `
      <div class="hoj-ie-group-header">
        <label class="hoj-ie-group-check"><input type="checkbox" ${state.favorites ? 'checked' : ''}></label>
        <span class="hoj-ie-group-name">${t('ie.favorites')}</span>
        <span class="hoj-ie-group-count">${t('ie.favCount', { n: favCount })}</span>
      </div>
    `;
    favEl.querySelector('input')!.addEventListener('change', (e) => {
      state.favorites = (e.target as HTMLInputElement).checked;
    });
    listEl.appendChild(favEl);
  };

  presetRow.addEventListener('click', (e) => {
    const btn = e.target.closest('.hoj-ie-preset');
    if (!btn) return;
    presetRow.querySelectorAll('.hoj-ie-preset').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.keys = presetToKeys(btn.dataset.preset as any, Object.keys(DEFAULT_CONFIG) as (keyof Config)[]);
    state.favorites = presetIncludesFavorites(btn.dataset.preset!);
    renderList();
  });

  exportBtn.addEventListener('click', () => {
    if (!state.keys.size && !state.favorites) {
      NewAlert('@ie.selectAtLeastOne', 'warning');
      return;
    }

    const payload = {
      type: 'hoj-settings',
      version: VERSION_INFO.version,
      exportedAt: new Date().toISOString(),
      config: {} as Record<string, any>,
      favorites: [] as any[]
    };

    state.keys.forEach(k => { payload.config[k] = config[k]; });
    if (state.favorites) payload.favorites = getFavorites();

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `hoj-backup-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const extra = state.favorites
      ? t('ie.exportedExtraFav', { n: payload.favorites.length })
      : '';
    NewAlert(t('ie.exportedSummary', { keys: state.keys.size, extra }), 'success', 2500);
  });

  renderList();
}

function renderImportPane(root: HTMLElement, config: Config): void {
  root.innerHTML = '';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'application/json,.json';
  fileInput.style.display = 'none';
  root.appendChild(fileInput);

  const stage = document.createElement('div');
  root.appendChild(stage);

  const showStage1 = () => {
    stage.innerHTML = `
      <div class="hoj-ie-hint">
        <div class="hoj-ie-hint-title">${t('ie.pickHintTitle')}</div>
        <div class="hoj-ie-hint-detail">${t('ie.pickHintDetail')}</div>
      </div>
    `;

    const btnRow = document.createElement('div');
    btnRow.className = 'hoj-ie-actions';

    const pickBtn = document.createElement('button');
    pickBtn.type = 'button';
    pickBtn.className = 'hoj-snippet-btn hoj-snippet-btn--primary';
    pickBtn.textContent = t('ie.pickFile');
    pickBtn.addEventListener('click', () => fileInput.click());

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'hoj-snippet-btn';
    resetBtn.textContent = t('ie.resetDefaults');
    resetBtn.addEventListener('click', () => {
      const defaultData = {
        type: 'hoj-settings',
        version: VERSION_INFO.version,
        exportedAt: new Date().toISOString(),
        config: { ...DEFAULT_CONFIG }
      };
      showStage2(defaultData, t('ie.fileKindDefaults'));
    });

    btnRow.append(pickBtn, resetBtn);
    stage.appendChild(btnRow);
  };

  const showStage2 = (data: any, fileName: string) => {
    const RESERVED = ['type', 'version', 'exportedAt', 'config', 'favorites', 'count', 'name'];

    let rawConfig: Record<string, any> = {};
    let incomingFavorites: any[] = [];
    let fileKind = 'unknown';

    if (data && typeof data === 'object') {
      const type = data.type;
      if (type === 'hoj-favorites') {
        incomingFavorites = Array.isArray(data.favorites) ? data.favorites : [];
        fileKind = 'favorites';
      } else if (type === 'hoj-settings') {
        rawConfig = data.config && typeof data.config === 'object' ? data.config : {};
        if (Array.isArray(data.favorites)) {
          incomingFavorites = data.favorites;
          fileKind = 'mixed';
        } else {
          fileKind = 'settings';
        }
      } else if (Array.isArray(data)) {
        incomingFavorites = data;
        fileKind = 'favorites';
      } else if (data.config && typeof data.config === 'object') {
        rawConfig = data.config;
        if (Array.isArray(data.favorites)) {
          incomingFavorites = data.favorites;
          fileKind = 'mixed';
        } else {
          fileKind = 'settings';
        }
      } else if (Array.isArray(data.favorites)) {
        incomingFavorites = data.favorites;
        fileKind = 'favorites';
      } else {
        rawConfig = data;
        fileKind = 'settings';
      }
    }

    const accepted: Record<string, any> = {};
    let ignored = 0;
    Object.keys(rawConfig).forEach(k => {
      if (RESERVED.includes(k)) return;
      if (!Object.prototype.hasOwnProperty.call(DEFAULT_CONFIG, k)) { ignored++; return; }
      if (typeof DEFAULT_CONFIG[k as keyof Config] !== typeof rawConfig[k]) { ignored++; return; }
      if (Array.isArray(DEFAULT_CONFIG[k as keyof Config]) !== Array.isArray(rawConfig[k])) { ignored++; return; }
      accepted[k] = rawConfig[k];
    });

    if (!Object.keys(accepted).length && !incomingFavorites.length) {
      NewAlert('@ie.noContent', 'warning');
      return;
    }

    stage.innerHTML = '';

    const topRow = document.createElement('div');
    topRow.className = 'hoj-ie-toprow';
    const backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'hoj-ie-back';
    backBtn.textContent = t('ie.backToPick');
    backBtn.addEventListener('click', () => { fileInput.value = ''; showStage1(); });

    const fnEl = document.createElement('div');
    fnEl.className = 'hoj-ie-filename';
    fnEl.textContent = t('ie.chosenFile', { name: fileName });
    topRow.append(backBtn, fnEl);
    stage.appendChild(topRow);

    const kindKey = {
      settings: fileName === t('ie.fileKindDefaults') ? 'ie.fileKindDefaults' : 'ie.fileKindSettings',
      favorites: 'ie.fileKindFavorites',
      mixed: 'ie.fileKindMixed',
      unknown: 'ie.fileKindUnknown'
    }[fileKind];
    if (kindKey) {
      const kindEl = document.createElement('div');
      kindEl.className = 'hoj-ie-version';
      kindEl.innerHTML = `<span style="font-size:12px;opacity:.7;">📄 ${escapeHtml(t(kindKey))}</span>`;
      stage.appendChild(kindEl);
    }

    const importVersion = data?.version || null;
    const myVersion = VERSION_INFO.version;
    if (importVersion) {
      const vEl = document.createElement('div');
      vEl.className = 'hoj-ie-version';
      let color, text;
      if (cmpVersion(importVersion, myVersion) < 0) {
        color = '#ED4014';
        text = t('ie.versionOld', { v: importVersion, cur: myVersion });
      } else if (cmpVersion(importVersion, myVersion) > 0) {
        color = '#E6A23C';
        text = t('ie.versionNew', { v: importVersion, cur: myVersion });
      } else {
        color = '#67C23A';
        text = t('ie.versionSame', { cur: myVersion });
      }
      vEl.innerHTML = `<span style="color:${color};font-size:12px;">${escapeHtml(text)}</span>`;
      stage.appendChild(vEl);
    }

    if (ignored > 0) {
      const iEl = document.createElement('div');
      iEl.className = 'hoj-ie-version';
      iEl.innerHTML = `<span style="font-size:12px;opacity:.6;">${escapeHtml(t('ie.ignoredCount', { n: ignored }))}</span>`;
      stage.appendChild(iEl);
    }

    const state = {
      keys: new Set(Object.keys(accepted) as (keyof Config)[]),
      favorites: incomingFavorites.length > 0
    };

    const presetRow = document.createElement('div');
    presetRow.className = 'hoj-ie-presets';
    presetRow.innerHTML = `
      <button type="button" class="hoj-ie-preset active" data-preset="all">${t('ie.presetAll')}</button>
      <button type="button" class="hoj-ie-preset" data-preset="smart">${t('ie.presetSmart')}</button>
      <button type="button" class="hoj-ie-preset" data-preset="better">${t('ie.presetBetter')}</button>
      <button type="button" class="hoj-ie-preset" data-preset="favorites">${t('ie.presetFavorites')}</button>
      <button type="button" class="hoj-ie-preset" data-preset="snippet">${t('ie.presetSnippet')}</button>
    `;
    stage.appendChild(presetRow);

    const listEl = document.createElement('div');
    listEl.className = 'hoj-ie-list';
    stage.appendChild(listEl);

    const footer = document.createElement('div');
    footer.className = 'hoj-ie-footer';
    const importBtn = document.createElement('button');
    importBtn.type = 'button';
    importBtn.className = 'hoj-snippet-btn hoj-snippet-btn--primary';
    importBtn.textContent = t('ie.importBtn');
    footer.appendChild(importBtn);
    stage.appendChild(footer);

    const renderList = () => {
      listEl.innerHTML = '';
      const acceptedKeys = Object.keys(accepted);

      const grouped = new Map<string, string[]>();
      const ungrouped: string[] = [];
      acceptedKeys.forEach(k => {
        const g = findGroupByKey(k as keyof Config);
        if (g) {
          if (!grouped.has(g.id)) grouped.set(g.id, []);
          grouped.get(g.id)!.push(k);
        } else ungrouped.push(k);
      });

      CONFIG_GROUPS.forEach(g => {
        const keys = grouped.get(g.id);
        if (!keys || !keys.length) return;

        if (g.id === 'snippet' && keys.includes('Snippets')) {
          const tipEl = document.createElement('div');
          tipEl.className = 'hoj-ie-note';
          const config = loadConfig();
          const existingCount = getSnippets(config).length;
          const incomingCount = Array.isArray(accepted.Snippets) ? accepted.Snippets.length : 0;
          const existingIds = new Set(getSnippets(config).map(s => s.id).filter(Boolean));
          const newCount = (accepted.Snippets || []).filter(s => s && s.id && !existingIds.has(s.id)).length;
          tipEl.textContent = t('ie.snippetMergeTip', { exist: existingCount, add: newCount, upd: incomingCount - newCount });
          listEl.appendChild(tipEl);
        }

        const groupTitle = t(g.name);
        listEl.appendChild(buildConfigGroup(groupTitle, keys, state.keys, renderList, accepted));
      });

      if (ungrouped.length) {
        listEl.appendChild(buildConfigGroup(t('group.other'), ungrouped, state.keys, renderList, accepted));
      }

      if (incomingFavorites.length) {
        const existingIds = new Set(getFavorites().map(f => String(f.problemId)));
        const newCount = incomingFavorites.filter(
          f => f && f.problemId !== undefined && f.problemId !== null && !existingIds.has(String(f.problemId))
        ).length;

        const favEl = document.createElement('div');
        favEl.className = 'hoj-ie-group';
        favEl.innerHTML = `
          <div class="hoj-ie-group-header">
            <label class="hoj-ie-group-check"><input type="checkbox" ${state.favorites ? 'checked' : ''}></label>
            <span class="hoj-ie-group-name">${t('ie.favorites')}</span>
            <span class="hoj-ie-group-count">${t('ie.favCountNew', { n: incomingFavorites.length, added: newCount })}</span>
          </div>
        `;
        favEl.querySelector('input')!.addEventListener('change', (e) => {
          state.favorites = (e.target as HTMLInputElement).checked;
        });
        listEl.appendChild(favEl);
      }
    };

    presetRow.addEventListener('click', (e) => {
      const btn = e.target.closest('.hoj-ie-preset');
      if (!btn) return;
      presetRow.querySelectorAll('.hoj-ie-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const preset = btn.dataset.preset!;
      state.keys = presetToKeys(preset as any, Object.keys(accepted) as (keyof Config)[]);
      state.favorites = presetIncludesFavorites(preset) && incomingFavorites.length > 0;
      renderList();
    });

    importBtn.addEventListener('click', async () => {
      if (!state.keys.size && !state.favorites) {
        NewAlert('@ie.selectAtLeastOne', 'warning');
        return;
      }

      let applied = 0;
      let snippetAdded = 0, snippetUpdated = 0;
      state.keys.forEach(k => {
        if (k === 'Snippets') {
          const r = mergeSnippetsInto(getSnippets(config), accepted[k]);
          config[k] = r.list;
          snippetAdded = r.added;
          snippetUpdated = r.updated;
        } else {
          config[k] = accepted[k];
        }
        applied++;
      });
      saveConfig(config);

      let favAdded = 0;
      if (state.favorites && incomingFavorites.length) {
        const cur = getFavorites();
        const existingIds = new Set(cur.map(f => String(f.problemId)));
        incomingFavorites.forEach(f => {
          if (!f || f.problemId === undefined || f.problemId === null) return;
          const pid = String(f.problemId).trim();
          if (!pid || existingIds.has(pid)) return;
          cur.push({
            problemId: pid,
            title: typeof f.title === 'string' ? f.title : pid,
            href: typeof f.href === 'string' ? f.href : `/problem/${pid}`,
            addedAt: typeof f.addedAt === 'number' ? f.addedAt : Date.now()
          });
          existingIds.add(pid);
          favAdded++;
        });
        saveFavorites(cur);
      }

      try {
        injectCss(config);
        applyBackground(config);
        applySmoothClasses(config);
        const { syncMemorizingFont } = await import('../styles/index.js');
        syncMemorizingFont(config);
        const { initCardGlow } = await import('../styles/index.js');
        initCardGlow(config);
        const { initAllTools } = await import('../features/tools.js');
        initAllTools(config);
      } catch (e) {
        console.warn('[Import] Apply config error:', e);
      }

      const settingsPanel = document.getElementById('hoj-settings-panel');
      if (settingsPanel) {
        settingsPanel.querySelectorAll('[data-key]').forEach(el => {
          const key = el.getAttribute('data-key')!;
          if ((el as HTMLInputElement).type === 'checkbox') (el as HTMLInputElement).checked = !!config[key as keyof Config];
          else (el as HTMLInputElement).value = config[key as keyof Config] ?? '';
          el.dispatchEvent(new Event('input'));
        });
      }

      const parts: string[] = [];
      parts.push(t('ie.importedKeysPart', { n: applied }));
      if (snippetAdded || snippetUpdated) {
        const seg: string[] = [];
        if (snippetAdded) seg.push(t('ie.importedSnippetAdd', { n: snippetAdded }));
        if (snippetUpdated) seg.push(t('ie.importedSnippetUpd', { n: snippetUpdated }));
        parts.push(t('ie.importedSnippetPart', { seg: seg.join(' / ') }));
      }
      if (favAdded > 0) parts.push(t('ie.importedFavPart', { n: favAdded }));

      NewAlert(t('ie.importedSummary', { parts: parts.join(', ') }), 'success', 3500);
      const { scheduleApplyNavbarLayout } = await import('../features/navbar.js');
      scheduleApplyNavbarLayout(100);
      const { getTagFromRemote } = await import('../features/customTag.js');
      getTagFromRemote(config);
      importExportDialogClose?.();
    });

    renderList();
  };

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    fileInput.value = '';
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      showStage2(data, file.name);
    } catch (e) {
      NewAlert(t('ie.parseFailed', { msg: (e as Error).message }), 'error');
    }
  });

  showStage1();
}

function buildConfigGroup(name: string, keys: (keyof Config)[], selected: Set<keyof Config>, rerender: () => void, valueSource?: Record<string, any>): HTMLElement {
  const groupEl = document.createElement('div');
  groupEl.className = 'hoj-ie-group';
  const src = valueSource || loadConfig();

  const allChecked = keys.every(k => selected.has(k));
  const someChecked = keys.some(k => selected.has(k));

  const header = document.createElement('div');
  header.className = 'hoj-ie-group-header';
  header.innerHTML = `
    <label class="hoj-ie-group-check"><input type="checkbox" ${allChecked ? 'checked' : ''}></label>
    <span class="hoj-ie-group-name">${escapeHtml(name)}</span>
    <span class="hoj-ie-group-count">${keys.filter(k => selected.has(k)).length}/${keys.length}</span>
    <span class="hoj-ie-group-toggle">▾</span>
  `;
  const cb = header.querySelector('input')!;
  if (someChecked && !allChecked) cb.indeterminate = true;
  cb.addEventListener('change', (e) => {
    if ((e.target as HTMLInputElement).checked) keys.forEach(k => selected.add(k));
    else keys.forEach(k => selected.delete(k));
    rerender();
  });
  groupEl.appendChild(header);

  const itemsEl = document.createElement('div');
  itemsEl.className = 'hoj-ie-items';
  keys.forEach(k => {
    const itemEl = document.createElement('label');
    itemEl.className = 'hoj-ie-item';

    const rawVal = src[k];
    const isSensitive = IE_SENSITIVE_KEYS.has(k);

    let val, title;
    if (isSensitive) {
      const hasValue = rawVal !== undefined && rawVal !== null && String(rawVal) !== '';
      val = hasValue ? '••••••••' : '';
      title = hasValue ? t('ie.sensitiveHidden') : t('ie.sensitiveEmpty');
    } else {
      val = fmtVal(rawVal);
      title = val;
    }

    const isNew = !!valueSource;
    itemEl.innerHTML = `
      <input type="checkbox" ${selected.has(k) ? 'checked' : ''}>
      <span class="hoj-ie-item-name">${escapeHtml(k)}</span>
      <span class="hoj-ie-item-value${isNew ? ' hoj-ie-item-value--new' : ''}${isSensitive ? ' hoj-ie-item-value--masked' : ''}" title="${escapeHtml(title)}">${escapeHtml(val)}</span>
    `;

    itemEl.querySelector('input')!.addEventListener('change', (e) => {
      if ((e.target as HTMLInputElement).checked) selected.add(k);
      else selected.delete(k);
      const countEl = header.querySelector('.hoj-ie-group-count');
      if (countEl) countEl.textContent = `${keys.filter(x => selected.has(x)).length}/${keys.length}`;
      const allC = keys.every(x => selected.has(x));
      const someC = keys.some(x => selected.has(x));
      cb.checked = allC;
      cb.indeterminate = someC && !allC;
    });
    itemsEl.appendChild(itemEl);
  });
  groupEl.appendChild(itemsEl);

  const toggle = header.querySelector('.hoj-ie-group-toggle')!;
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    itemsEl.classList.toggle('collapsed');
    toggle.textContent = itemsEl.classList.contains('collapsed') ? '▸' : '▾';
  });

  return groupEl;
}