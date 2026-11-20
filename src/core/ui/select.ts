/**
 * Custom Select Component (Element UI style)
 * Upgrades native <select> to a styled dropdown
 */

import { escapeHtml } from '../../core/utils.js';

export function upgradeSelectToElSelect(selectEl: HTMLSelectElement): HTMLElement | null {
  if (!selectEl || selectEl.tagName !== 'SELECT') return null;
  if (selectEl.dataset.hojElSelect === '1') {
    return selectEl.nextElementSibling as HTMLElement;
  }
  selectEl.dataset.hojElSelect = '1';
  selectEl.style.display = 'none';

  const wrap = document.createElement('div');
  wrap.className = 'hoj-el-select-wrap';
  wrap.innerHTML = `
    <div class="el-select">
      <div class="el-input el-input--suffix">
        <input class="el-input__inner" readonly>
        <span class="el-input__suffix">
          <span class="el-input__suffix-inner">
            <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
          </span>
        </span>
      </div>
    </div>
  `;

  const dropdownEl = document.createElement('div');
  dropdownEl.className = 'el-select-dropdown hoj-el-select-dropdown';
  dropdownEl.style.display = 'none';
  dropdownEl.innerHTML = `
    <div class="el-scrollbar">
      <ul class="el-select-dropdown__list"></ul>
    </div>
  `;
  document.body.appendChild(dropdownEl);

  const inputEl = wrap.querySelector('.el-input__inner') as HTMLInputElement;
  const arrowEl = wrap.querySelector('.el-select__caret') as HTMLElement;
  const listEl = dropdownEl.querySelector('.el-select-dropdown__list') as HTMLUListElement;

  const getOptions = () =>
    Array.from(selectEl.options).map(o => ({
      value: o.value,
      label: o.textContent || ''
    }));

  const updateInputText = () => {
    const opts = getOptions();
    const cur = opts.find(o => o.value === selectEl.value);
    inputEl.value = cur ? cur.label : '';
  };

  const renderList = () => {
    listEl.innerHTML = getOptions().map(o => {
      const sel = o.value === selectEl.value ? ' selected' : '';
      return `<li class="el-select-dropdown__item${sel}" data-value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</li>`;
    }).join('');
  };

  const positionDropdown = () => {
    const r = wrap.getBoundingClientRect();
    const h = dropdownEl.offsetHeight || 200;
    const below = window.innerHeight - r.bottom;
    const above = r.top;
    dropdownEl.style.position = 'fixed';
    dropdownEl.style.left = r.left + 'px';
    dropdownEl.style.minWidth = r.width + 'px';
    dropdownEl.style.zIndex = '2147483650';
    if (below < h + 8 && above > below) {
      dropdownEl.style.top = 'auto';
      dropdownEl.style.bottom = (window.innerHeight - r.top + 4) + 'px';
    } else {
      dropdownEl.style.bottom = 'auto';
      dropdownEl.style.top = (r.bottom + 4) + 'px';
    }
  };

  let onScroll: (() => void) | null = null;
  const open = () => {
    renderList();
    dropdownEl.style.display = 'block';
    positionDropdown();
    arrowEl.classList.add('is-reverse');
    onScroll = () => positionDropdown();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll, true);
    document.addEventListener('mousedown', onDocClick, true);
    document.addEventListener('keydown', onEsc, true);
  };
  const close = () => {
    dropdownEl.style.display = 'none';
    arrowEl.classList.remove('is-reverse');
    if (onScroll) {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll, true);
      onScroll = null;
    }
    document.removeEventListener('mousedown', onDocClick, true);
    document.removeEventListener('keydown', onEsc, true);
  };
  const onDocClick = (e: MouseEvent) => {
    if (!wrap.contains(e.target as Node) && !dropdownEl.contains(e.target as Node)) close();
  };
  const onEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close();
  };

  wrap.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropdownEl.style.display === 'block') close();
    else open();
  });

  listEl.addEventListener('click', (e) => {
    const li = (e.target as HTMLElement).closest('.el-select-dropdown__item');
    if (!li) return;
    e.preventDefault();
    e.stopPropagation();
    selectEl.value = li.dataset.value || '';
    selectEl.dispatchEvent(new Event('change', { bubbles: true }));
    selectEl.dispatchEvent(new Event('input', { bubbles: true }));
    updateInputText();
    close();
  });

  selectEl.addEventListener('input', updateInputText);
  selectEl.addEventListener('change', updateInputText);

  selectEl.parentNode!.insertBefore(wrap, selectEl.nextSibling);
  updateInputText();

  wrap._hojRefresh = () => { updateInputText(); if (dropdownEl.style.display === 'block') renderList(); };

  return wrap;
}

/**
 * 同步所有 el-select 的显示文本与下拉选中态。
 * 面板被外部改动后重新打开时需要调用，否则显示的还是旧文本。
 */
export function refreshAllSelects(root?: Element): void {
  const scope = root || document;
  scope.querySelectorAll('select[data-hoj-el-select="1"]').forEach(selectEl => {
    const wrap = selectEl.nextElementSibling as any;
    if (wrap && typeof wrap._hojRefresh === 'function') {
      try { wrap._hojRefresh(); } catch (_) {}
    }
  });
}

export function upgradeAllSelects(root?: Element): void {
  const scope = root || document;
  scope.querySelectorAll('select:not([data-hoj-el-select])').forEach(selectEl => {
    if (selectEl.closest('#hoj-favorites-panel')) return;
    upgradeSelectToElSelect(selectEl as HTMLSelectElement);
  });
}